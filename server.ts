import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';

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
  const PORT = 3000;

  app.use(express.json());

  // API Routes
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
    const result = db.prepare('INSERT INTO applications (job_title, company, description, url, status) VALUES (?, ?, ?, ?, ?)')
      .run(job_title, company, description, url, 'pending');
    res.json({ id: result.lastInsertRowid });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
      optimizeDeps: { force: true }, // Force Vite to ignore cached deps and rebuild pdfjs-dist 3.x
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
