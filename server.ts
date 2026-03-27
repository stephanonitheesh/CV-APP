import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';
import { generateCoverLetter, humanizeText, tailorResume } from './src/services/aiService.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database('database.db');

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    name TEXT
  );

  CREATE TABLE IF NOT EXISTS resumes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    title TEXT,
    content TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS bullet_points (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    category TEXT
  );

  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    job_title TEXT,
    company TEXT,
    description TEXT,
    url TEXT,
    status TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
`);

// Seed some initial bullet points if empty
const count = db.prepare('SELECT COUNT(*) as count FROM bullet_points').get() as { count: number };
if (count.count === 0) {
  const insert = db.prepare('INSERT INTO bullet_points (content, category) VALUES (?, ?)');
  insert.run('Spearheaded the development of a high-traffic e-commerce platform using React and Node.js.', 'Experience');
  insert.run('Optimized database queries, resulting in a 40% reduction in page load times.', 'Experience');
  insert.run('Collaborated with cross-functional teams to deliver a mobile-first application for 1M+ users.', 'Experience');
  insert.run('Implemented automated testing suites, increasing code coverage by 25%.', 'Experience');
  insert.run('Designed and maintained scalable microservices architecture on AWS.', 'Experience');
}

const appCount = db.prepare('SELECT COUNT(*) as count FROM applications').get() as { count: number };
if (appCount.count === 0) {
  const insertApp = db.prepare('INSERT INTO applications (job_title, company, description, url, status) VALUES (?, ?, ?, ?, ?)');
  insertApp.run('Senior Software Engineer', 'Google', 'Looking for an experienced React/Node.js engineer to build scalable web apps.', 'https://careers.google.com/', 'applied');
  insertApp.run('Frontend Developer', 'Stripe', 'Join our core platform team to build the next generation of Stripe Dashboard.', 'https://stripe.com/jobs', 'interviewing');
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // Security headers
  app.use(helmet({
    contentSecurityPolicy: false, // Let Vite handle CSP in dev
  }));

  // CORS
  app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }));

  // Body parser with size limit
  app.use(express.json({ limit: '2mb' }));

  // Rate limiting for API routes
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per window per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests, please try again later.' },
  });

  // Stricter rate limit for AI routes (expensive calls)
  const aiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20, // 20 AI requests per 15 minutes per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many AI requests, please try again later.' },
  });

  // Apply general rate limit to all /api routes
  app.use('/api', apiLimiter);

  // --- Database API Routes ---

  app.get('/api/bullets', (req, res) => {
    const bullets = db.prepare('SELECT * FROM bullet_points ORDER BY RANDOM() LIMIT 10').all();
    res.json(bullets);
  });

  app.get('/api/applications', (req, res) => {
    const apps = db.prepare('SELECT * FROM applications ORDER BY id DESC').all();
    res.json(apps);
  });

  app.post('/api/applications', (req, res) => {
    const { job_title, company, description, url } = req.body;

    // Input validation
    if (!job_title || typeof job_title !== 'string' || job_title.trim().length === 0) {
      return res.status(400).json({ error: 'job_title is required and must be a non-empty string.' });
    }
    if (!company || typeof company !== 'string' || company.trim().length === 0) {
      return res.status(400).json({ error: 'company is required and must be a non-empty string.' });
    }
    if (job_title.length > 200) {
      return res.status(400).json({ error: 'job_title must be 200 characters or fewer.' });
    }
    if (company.length > 200) {
      return res.status(400).json({ error: 'company must be 200 characters or fewer.' });
    }
    if (description && description.length > 5000) {
      return res.status(400).json({ error: 'description must be 5000 characters or fewer.' });
    }
    if (url && url.length > 2000) {
      return res.status(400).json({ error: 'url must be 2000 characters or fewer.' });
    }

    const result = db.prepare('INSERT INTO applications (job_title, company, description, url, status) VALUES (?, ?, ?, ?, ?)')
      .run(job_title.trim(), company.trim(), description?.trim() || '', url?.trim() || '', 'pending');
    res.json({ id: result.lastInsertRowid });
  });

  // --- AI API Routes (server-side only, key never exposed to client) ---

  app.post('/api/cover-letter', aiLimiter, async (req, res) => {
    const { resumeText, jobDescription, tone } = req.body;

    // Input validation
    if (!resumeText || typeof resumeText !== 'string' || resumeText.trim().length === 0) {
      return res.status(400).json({ error: 'resumeText is required.' });
    }
    if (!jobDescription || typeof jobDescription !== 'string' || jobDescription.trim().length === 0) {
      return res.status(400).json({ error: 'jobDescription is required.' });
    }
    if (resumeText.length > 50000) {
      return res.status(400).json({ error: 'resumeText must be 50,000 characters or fewer.' });
    }
    if (jobDescription.length > 20000) {
      return res.status(400).json({ error: 'jobDescription must be 20,000 characters or fewer.' });
    }

    try {
      const result = await generateCoverLetter(resumeText, jobDescription, tone || 'professional');
      res.json({ coverLetter: result });
    } catch (error) {
      console.error('Cover letter generation failed:', error);
      res.status(500).json({ error: 'Failed to generate cover letter.' });
    }
  });

  app.post('/api/humanize', aiLimiter, async (req, res) => {
    const { text } = req.body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({ error: 'text is required.' });
    }
    if (text.length > 10000) {
      return res.status(400).json({ error: 'text must be 10,000 characters or fewer.' });
    }

    try {
      const result = await humanizeText(text);
      res.json({ humanizedText: result });
    } catch (error) {
      console.error('Humanize text failed:', error);
      res.status(500).json({ error: 'Failed to humanize text.' });
    }
  });

  app.post('/api/tailor-resume', aiLimiter, async (req, res) => {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || typeof resumeText !== 'string' || resumeText.trim().length === 0) {
      return res.status(400).json({ error: 'resumeText is required.' });
    }
    if (!jobDescription || typeof jobDescription !== 'string' || jobDescription.trim().length === 0) {
      return res.status(400).json({ error: 'jobDescription is required.' });
    }
    if (resumeText.length > 50000) {
      return res.status(400).json({ error: 'resumeText must be 50,000 characters or fewer.' });
    }
    if (jobDescription.length > 20000) {
      return res.status(400).json({ error: 'jobDescription must be 20,000 characters or fewer.' });
    }

    try {
      const result = await tailorResume(resumeText, jobDescription);
      res.json({ tailoredResume: result });
    } catch (error) {
      console.error('Tailor resume failed:', error);
      res.status(500).json({ error: 'Failed to tailor resume.' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
      optimizeDeps: { force: true },
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
