/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, X, Briefcase, User, FileText, Share2, Plus, Search, ArrowRight, Lock, Home, Settings, ArrowLeft, Copy, ChevronDown } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
// Use CDN for worker to avoid Vite bundling issues with pdfjs-dist
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import mammoth from 'mammoth/mammoth.browser.js';
import { CVTemplates, TEMPLATE_LIST } from './components/CVTemplates';
import Cropper from 'react-easy-crop';
import getCroppedImg from './utils/imageCrop';
import { Home as HomeView } from './components/Home';

// PDF.js worker is already set up above.

interface BulletPoint {
  id: number;
  content: string;
  category: string;
}

export default function App() {
  const [bullets, setBullets] = useState<BulletPoint[]>([]);
  const [savedBullets, setSavedBullets] = useState<BulletPoint[]>([]);
  const [view, setView] = useState<'home' | 'cover-letter' | 'resume' | 'ats-check' | 'profile'>('home');
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [atsResult, setAtsResult] = useState<any>(null);
  const [realTimeScore, setRealTimeScore] = useState<number>(0);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [cvData, setCvData] = useState({
    fullName: 'Alex Rivera',
    jobTitle: 'Senior Software Engineer',
    email: 'alex.rivera@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    summary: 'Innovative Software Engineer with 8+ years of experience in building scalable web applications. Expert in React, Node.js, and Cloud Architecture. Proven track record of leading development teams to deliver high-quality software solutions for global enterprise clients.',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    experience: [
      { company: 'TechNova Solutions', role: 'Lead Frontend Engineer', periodStart: '2020', periodEnd: 'Present', bullets: ['Spearheaded the migration from legacy monolithic architecture to React-based micro-frontends.', 'Reduced page load times by 40% through advanced optimization.'] },
      { company: 'CloudStream Inc.', role: 'Software Developer', periodStart: '2016', periodEnd: '2020', bullets: ['Developed and maintained core features for a cloud-based streaming platform.', 'Implemented automated CI/CD pipelines using GitHub Actions and AWS.'] }
    ],
    education: [
      { school: 'Stanford University', degree: 'M.S. Computer Science', year: '2016' },
      { school: 'UC Berkeley', degree: 'B.S. Software Engineering', year: '2014' }
    ],
    projects: [
      { name: 'Open Source UI Library', description: 'Built a highly accessible UI component library used by 500+ developers.' }
    ],
    photo: null as string | null
  });
  const [currentAtsResult, setCurrentAtsResult] = useState<any>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [coverLetterTone, setCoverLetterTone] = useState('Professional');
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState('');
  const [isGeneratingCoverLetter, setIsGeneratingCoverLetter] = useState(false);
  const [copied, setCopied] = useState(false);
  const [coverLetterStep, setCoverLetterStep] = useState<1 | 2 | 3>(1);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [coverLetterText, setCoverLetterText] = useState<string>('');
  const [isExtractingText, setIsExtractingText] = useState(false);
  const [showCvDownloadMenu, setShowCvDownloadMenu] = useState(false);
  const [showCoverLetterDownloadMenu, setShowCoverLetterDownloadMenu] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('modern');
  const [activeCvSection, setActiveCvSection] = useState<'profile' | 'experience' | 'education' | 'skills' | 'projects'>('profile');
  const [cvViewMode, setCvViewMode] = useState<'editor' | 'preview' | 'history'>('editor');
  const [cvBuilderStep, setCvBuilderStep] = useState<'select-template' | 'editor'>('select-template');
  const [photoFilter, setPhotoFilter] = useState<'All' | 'Photo' | 'No Photo'>('All');
  const [columnsFilter, setColumnsFilter] = useState<'All' | 'Single' | 'Double'>('All');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [pageViewMode, setPageViewMode] = useState<'single' | 'grid'>('single');
  const [cvHistory, setCvHistory] = useState<Array<{ timestamp: number; data: typeof cvData; label: string }>>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success');
  const [atsJobDescription, setAtsJobDescription] = useState('');

  // Cropper State
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isCropping, setIsCropping] = useState(false);

  useEffect(() => {
    fetch('/api/bullets')
      .then(res => res.json())
      .then(data => setBullets(data));
  }, []);

  // Real-time score calculation for the "Resume" view
  useEffect(() => {
    const calculateScore = async () => {
      const { analyzeResume } = await import('./services/atsService');
      const result = analyzeResume(
        { text: JSON.stringify(cvData) },
        { title: 'General', description: 'software engineer developer manager leader project product design code python javascript react node' }
      );
      setRealTimeScore(result.score);
    };
    calculateScore();
  }, [cvData]);

  // Load CV Draft on Mount
  useEffect(() => {
    const saved = localStorage.getItem('careerswipe_cv_draft');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCvData(parsed);
      } catch (e) {
        console.error("Failed to load CV draft", e);
      }
    }
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToastMessage(message);
    setToastType(type);
  };

  // Auto-dismiss toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const saveCvDraft = () => {
    setIsSaving(true);
    localStorage.setItem('careerswipe_cv_draft', JSON.stringify(cvData));
    // Save to history
    setCvHistory(prev => [
      { timestamp: Date.now(), data: JSON.parse(JSON.stringify(cvData)), label: `Version ${prev.length + 1}` },
      ...prev
    ]);
    setTimeout(() => {
      setIsSaving(false);
      showToast('Draft saved successfully!', 'success');
    }, 1200);
  };

  const handlePrint = async () => {
    const cvEl = document.getElementById('cv-document');
    if (!cvEl) return;

    // Collect all <link rel="stylesheet"> hrefs
    const linkHrefs = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
      .map(l => (l as HTMLLinkElement).href)
      .filter(Boolean);

    // Collect all <style> tag contents
    const inlineStyles = Array.from(document.querySelectorAll('style'))
      .map(s => s.textContent || '')
      .join('\n');

    // Clone the CV element
    const clone = cvEl.cloneNode(true) as HTMLElement;
    clone.style.transform = 'none';
    clone.style.boxShadow = 'none';
    clone.style.borderRadius = '0';
    clone.style.margin = '0 auto';
    clone.style.width = '850px';

    const linkTags = linkHrefs.map(h => `<link rel="stylesheet" href="${h}">`).join('\n');

    const popup = window.open('', '_blank', 'width=900,height=1100');
    if (!popup) {
      showToast('Could not open print window — check popup blocker', 'error');
      return;
    }

    popup.document.write(`<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
${linkTags}
<style>
${inlineStyles}
@media print {
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  @page { size: A4 portrait; margin: 0; }
  body { margin: 0; padding: 0; background: white; }
  #cv-root { width: 210mm; margin: 0 auto; }
}
body { margin: 0; padding: 0; background: #e5e7eb; display: flex; justify-content: center; padding: 20px 0; }
#cv-root { background: white; width: 850px; }
</style>
</head>
<body>
<div id="cv-root">${clone.outerHTML}</div>
</body>
</html>`);

    popup.document.close();

    // Wait for all resources (fonts, images) to load before printing
    popup.onload = async () => {
      await popup.document.fonts.ready;
      setTimeout(() => {
        popup.focus();
        popup.print();
        setTimeout(() => popup.close(), 2000);
      }, 600);
    };
  };

  const cycleSection = (e: React.KeyboardEvent | KeyboardEvent) => {
    const sections: Array<typeof activeCvSection> = ['profile', 'experience', 'education', 'skills', 'projects'];
    const currentIndex = sections.indexOf(activeCvSection);
    const nextIndex = (currentIndex + 1) % sections.length;
    setActiveCvSection(sections[nextIndex]);
  };

  // Global Keyboard Shortcuts — use refs to avoid stale closures
  const saveCvDraftRef = React.useRef(saveCvDraft);
  saveCvDraftRef.current = saveCvDraft;
  const cycleSectionRef = React.useRef(cycleSection);
  cycleSectionRef.current = cycleSection;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        saveCvDraftRef.current();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'p') {
        e.preventDefault();
        handlePrint();
      }
      if (e.key === 'Tab' && document.activeElement === document.body) {
        e.preventDefault();
        cycleSectionRef.current(e);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 10, 150));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 10, 50));

  const restoreHistoryVersion = (index: number) => {
    const version = cvHistory[index];
    if (version) {
      setCvData(JSON.parse(JSON.stringify(version.data)));
      showToast(`Restored to ${version.label}`, 'info');
    }
  };

  const handleAiSmartEnhance = (bulletIndex?: number, expIndex?: number) => {
    setIsEnhancing(true);
    
    setTimeout(() => {
      const data = {...cvData};
      
      const enhancements = [
        "Spearheaded end-to-end development of microservice architecture, resulting in a 35% increase in system reliability.",
        "Optimized frontend performance metrics, achieving a 50% reduction in TTI and enhancing core web vitals.",
        "Led cross-functional teams to deliver enterprise-grade features 20% ahead of schedule.",
        "Implemented automated testing suites that improved code coverage by 45% and reduced production bugs.",
        "Mentored junior developers and established modern coding standards across the department."
      ];

      if (expIndex !== undefined && bulletIndex !== undefined) {
        // Enhance specific bullet
        data.experience[expIndex].bullets![bulletIndex] = enhancements[Math.floor(Math.random() * enhancements.length)];
      } else {
        // General enhancement for the whole active section
        if (activeCvSection === 'experience') {
          data.experience = data.experience.map(exp => ({
            ...exp,
            bullets: exp.bullets?.map(() => enhancements[Math.floor(Math.random() * enhancements.length)])
          }));
        } else if (activeCvSection === 'profile') {
          data.summary = "Strategic senior leader with over a decade of high-impact software engineering experience. Proven track record of delivering scalable architectures and leading high-performing teams to drive business value and technical excellence.";
        }
      }
      
      setCvData(data);
      setIsEnhancing(false);
      showToast('AI enhancement applied!', 'success');
    }, 1500);
  };

  const extractTextFromFile = async (file: File): Promise<string> => {
    try {
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as ArrayBuffer);
          reader.onerror = reject;
          reader.readAsArrayBuffer(file);
        });
        // Safari fix: Pass Uint8Array directly instead of ArrayBuffer to avoid pdf.js ReadableStream errors
        const typedArray = new Uint8Array(arrayBuffer);
        const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item: any) => item.str).join(' ');
          fullText += pageText + '\n';
        }
        return fullText;
      } else if (file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
        const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as ArrayBuffer);
          reader.onerror = reject;
          reader.readAsArrayBuffer(file);
        });
        const result = await mammoth.extractRawText({ arrayBuffer });
        return result.value;
      } else {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = (e) => reject(e);
          reader.readAsText(file);
        });
      }
    } catch (err: any) {
      console.error("Detailed Extraction error:", err);
      throw new Error(err.message || 'File parsing failed.');
    }
  };

  const handleFileUpload = async (file: File) => {
    // Validate file type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'text/plain'];
    if (!validTypes.includes(file.type) && !file.name.endsWith('.docx') && !file.name.endsWith('.doc')) {
      setUploadError('Please upload a valid PDF or Word document.');
      return;
    }

    setUploadError(null);
    setUploadedFile(file);
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    let progressInterval: any;
    
    try {
      // Simulate progress
      progressInterval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 15;
        });
      }, 400);

      const text = await extractTextFromFile(file);
      
      if (!text || text.trim().length < 50) {
        throw new Error('Could not extract enough text from the file. Please ensure the document is not empty or encrypted.');
      }

      const { analyzeResume } = await import('./services/atsService');
      
      const result = analyzeResume(
        { text },
        { title: 'Target Role', description: atsJobDescription || 'software engineer developer manager leader project product design code python javascript react node' }
      );
      
      clearInterval(progressInterval);
      setAnalysisProgress(100);
      
      // Small delay to show 100% completion
      setTimeout(() => {
        setAtsResult(result);
        setIsAnalyzing(false);
      }, 500);

    } catch (error) {
      if (progressInterval) clearInterval(progressInterval);
      console.error('Error parsing file:', error);
      setUploadError(error instanceof Error ? error.message : 'An unexpected error occurred while parsing your CV.');
      setIsAnalyzing(false);
    }
  };

  const runAnalysis = async (app: any) => {
    const { analyzeResume } = await import('./services/atsService');
    const result = analyzeResume(
      { text: savedBullets.map(b => b.content).join('\n') },
      { title: app.job_title, description: app.description }
    );
    setAtsResult(result);
    setSelectedApp(app);
  };

  const addBullet = (bullet: BulletPoint) => {
    if (!savedBullets.find(b => b.id === bullet.id)) {
      setSavedBullets([...savedBullets, bullet]);
      
      // Also add to the first experience entry in cvData
      const newExp = [...cvData.experience];
      if (newExp.length > 0) {
        newExp[0].bullets = [...(newExp[0].bullets || []), bullet.content];
        setCvData({ ...cvData, experience: newExp });
      }
    }
    setBullets(bullets.filter(b => b.id !== bullet.id));
  };

  const skipBullet = (bullet: BulletPoint) => {
    setBullets(bullets.filter(b => b.id !== bullet.id));
  };

  const handleGenerateCoverLetter = async () => {
    if (!jobDescription.trim()) return;
    setIsGeneratingCoverLetter(true);
    setCoverLetterStep(3);
    try {
      if (!coverLetterText) {
        throw new Error("No resume text found. Please upload your CV first.");
      }

      // Call server API (API key stays server-side, never in the browser)
      const response = await fetch('/api/cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText: coverLetterText,
          jobDescription,
          tone: coverLetterTone
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      const result = data.coverLetter || '';
      // Safely format — escape HTML entities to prevent XSS
      const escapeHtml = (str: string) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      const formattedResult = result.split('\n').map((line: string) => line.trim() ? `<p>${escapeHtml(line)}</p>` : '<br/>').join('');
      setGeneratedCoverLetter(formattedResult);
    } catch (error) {
      console.error('Failed to generate cover letter:', error);
      setGeneratedCoverLetter('<p>An error occurred while generating the cover letter. Please try again.</p>');
    } finally {
      setIsGeneratingCoverLetter(false);
    }
  };

  const handleCopy = () => {
    // Extract plain text from the Quill editor directly (avoids innerHTML XSS)
    const editor = document.querySelector('.ql-editor');
    const textContent = editor?.textContent || '';
    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Derive a name from the uploaded cover letter text for filenames
  const coverLetterUserName = (() => {
    if (!coverLetterText) return 'Cover_Letter';
    const lines = coverLetterText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    for (let i = 0; i < Math.min(5, lines.length); i++) {
      const words = lines[i].split(' ');
      if (words.length >= 2 && words.length <= 4 && !lines[i].toLowerCase().includes('resume') && !lines[i].toLowerCase().includes('cv')) {
        return lines[i].replace(/\s+/g, '_');
      }
    }
    return 'Cover_Letter';
  })();

  const downloadTXT = () => {
    // Extract text directly from the Quill editor (avoids innerHTML XSS)
    const editor = document.querySelector('.ql-editor');
    let textContent = editor?.textContent || '';
    textContent = textContent.replace(/\n{3,}/g, '\n\n').trim();

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${coverLetterUserName}_Cover_Letter.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setShowCoverLetterDownloadMenu(false);
  };

  const downloadDOCX = async () => {
    // Get content from Quill editor (already sanitized by Quill's own parser)
    const editor = document.querySelector('.ql-editor');
    const content = editor ? editor.innerHTML : generatedCoverLetter;

    if (!content || content.trim() === '' || content === '<p><br></p>') {
      showToast("No content found to download.", 'error');
      return;
    }

    // Quill editor content is already sanitized — it strips script tags and event handlers
    const cleanHtml = `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head><meta charset='utf-8'><title>Cover Letter</title>
<style>body{font-family:"Times New Roman",serif;font-size:12pt;padding:1in;}p{margin-bottom:12pt;line-height:1.5;}</style>
</head><body>${content}</body></html>`;

    const blob = new Blob(['\ufeff', cleanHtml], { type: 'application/msword' });
    saveAs(blob, `${coverLetterUserName}_Cover_Letter.doc`);
    setShowCoverLetterDownloadMenu(false);
  };

  const downloadPDF = () => {
    const editor = document.querySelector('.ql-editor');
    const content = editor ? editor.innerHTML : generatedCoverLetter;

    if (!content || content.trim() === '' || content === '<p><br></p>') {
      showToast("No content found to download.", 'error');
      return;
    }

    // Quill sanitizes content — script tags and event handlers are stripped
    const pureHtmlString = `
      <div style="font-family: 'Times New Roman', serif; font-size: 12pt; color: black; line-height: 1.5; padding: 40px; background: white;">
        ${content.replace(/<p>/g, '<p style="margin-bottom: 12pt; margin-top: 0;">')}
      </div>
    `;

    const opt = {
      margin:       [0.5, 0.5, 0.5, 0.5],
      filename:     `${coverLetterUserName}_Cover_Letter.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, logging: false, letterRendering: true },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' as const }
    };

    html2pdf().set(opt).from(pureHtmlString).save().then(() => {
      setShowCoverLetterDownloadMenu(false);
      showToast('Cover letter PDF downloaded!', 'success');
    }).catch((e: Error) => {
      console.error("PDF generation failed:", e);
      showToast("PDF generation failed. Try Word or TXT format.", 'error');
    });
  };

  const downloadCVPDF = async () => {
    const cvEl = document.getElementById('cv-document');
    if (!cvEl) return;

    const btnText = document.getElementById('btn-download-pdf-text');
    if (btnText) btnText.innerText = 'Generating...';
    setShowCvDownloadMenu(false);

    // Off-screen container - isolated from any parent clips/transforms
    const offScreen = document.createElement('div');
    offScreen.style.cssText = [
      'position:fixed',
      'left:-10000px',
      'top:0',
      'width:850px',
      'background:white',
      'z-index:-9999',
      'overflow:visible',
      'pointer-events:none',
    ].join(';');
    document.body.appendChild(offScreen);

    try {
      // Deep clone - strip Framer Motion attributes and all transforms
      const clone = cvEl.cloneNode(true) as HTMLElement;
      clone.removeAttribute('data-projection-id');
      clone.removeAttribute('data-motion-id');
      clone.style.cssText = [
        'width:850px',
        'min-height:1201px',
        'transform:none',
        'box-shadow:none',
        'border-radius:0',
        'position:relative',
        'overflow:visible',
        'margin:0',
      ].join(';');
      offScreen.appendChild(clone);

      // Wait for fonts (Material Symbols, Google Fonts) and layout reflow
      await document.fonts.ready;
      await new Promise<void>(r => setTimeout(r, 400));

      // Sanitise oklch() colors that html2canvas cannot parse.
      // Walk every element, inline computed rgb values for color/background props.
      const colorProps = ['color', 'background-color', 'border-color', 'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color', 'outline-color'] as const;
      clone.querySelectorAll('*').forEach(el => {
        const cs = getComputedStyle(el);
        const st = (el as HTMLElement).style;
        for (const prop of colorProps) {
          const val = cs.getPropertyValue(prop);
          if (val && val.includes('oklch')) {
            // getComputedStyle returns resolved rgb in most browsers; if it still
            // contains oklch, replace with a fallback transparent
            st.setProperty(prop, val.replace(/oklch\([^)]*\)/gi, 'transparent'));
          }
        }
      });

      const opt = {
        margin: 0,
        filename: `${cvData.fullName.replace(/\s+/g, '_')}_CV.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          letterRendering: true,
          width: 850,
          windowWidth: 850,  // ← KEY: tells html2canvas the viewport is 850px so CSS Grid works
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait' as const,
          compress: true,
        },
      };

      await html2pdf().set(opt).from(clone).save();
      showToast('PDF downloaded successfully!', 'success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      console.error('PDF generation error:', err);
      showToast(`PDF failed: ${msg}`, 'error');
    } finally {
      document.body.removeChild(offScreen);
      if (btnText) btnText.innerText = 'Download PDF';
    }
  };

  const downloadCVDOCX = async () => {
    const cvEl = document.getElementById('cv-document');
    if (!cvEl) return;

    const btnText = document.getElementById('btn-download-word-text');
    if (btnText) btnText.innerText = 'Generating...';
    setShowCvDownloadMenu(false);

    try {
      // Render the CV exactly as it appears on screen using html2canvas
      const offScreen = document.createElement('div');
      offScreen.style.cssText = 'position:fixed;left:-10000px;top:0;width:850px;background:white;z-index:-9999;overflow:visible;pointer-events:none;';
      document.body.appendChild(offScreen);

      const clone = cvEl.cloneNode(true) as HTMLElement;
      clone.removeAttribute('data-projection-id');
      clone.removeAttribute('data-motion-id');
      clone.style.cssText = 'width:850px;min-height:1201px;transform:none;box-shadow:none;border-radius:0;position:relative;overflow:visible;margin:0;';
      offScreen.appendChild(clone);

      await document.fonts.ready;
      await new Promise<void>(r => setTimeout(r, 400));

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: false,
        letterRendering: true,
        width: 850,
        windowWidth: 850,
      });

      document.body.removeChild(offScreen);

      // Convert canvas to base64 image
      const imgDataUrl = canvas.toDataURL('image/png');
      const imgWidthPx = canvas.width;
      const imgHeightPx = canvas.height;

      // A4 page in Word: ~595pt wide (8.27in × 72). Scale image to fit A4 width.
      const a4WidthPt = 595;
      const scaledHeightPt = Math.round((imgHeightPx / imgWidthPx) * a4WidthPt);

      const wordHtml = `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset='utf-8'>
<title>${cvData.fullName.replace(/[<>&"]/g, '')} CV</title>
<!--[if gte mso 9]>
<xml>
  <w:WordDocument>
    <w:View>Print</w:View>
    <w:Zoom>100</w:Zoom>
    <w:DoNotOptimizeForBrowser/>
  </w:WordDocument>
</xml>
<![endif]-->
<style>
  @page { size: A4; margin: 0; }
  body { margin: 0; padding: 0; }
  .cv-page { page-break-after: always; }
  img { display: block; }
</style>
</head>
<body style="margin:0;padding:0;">
<div class="cv-page">
  <img src="${imgDataUrl}" width="${a4WidthPt}" height="${scaledHeightPt}" style="width:${a4WidthPt}pt;height:${scaledHeightPt}pt;display:block;" />
</div>
</body>
</html>`;

      const blob = new Blob(['\ufeff', wordHtml], { type: 'application/msword' });
      saveAs(blob, `${cvData.fullName.replace(/\s+/g, '_')}_CV.doc`);
      showToast('Word document downloaded!', 'success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      console.error('Word generation error:', err);
      showToast(`Word failed: ${msg}`, 'error');
    } finally {
      if (btnText) btnText.innerText = 'Download Word';
    }
  };

  const handleCoverLetterUpload = async (file: File) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'text/plain'];
    if (!validTypes.includes(file.type) && !file.name.endsWith('.docx') && !file.name.endsWith('.doc')) {
      alert('Please upload a valid PDF or Word document.');
      return;
    }

    setCoverLetterFile(file);
    setIsExtractingText(true);
    try {
      const text = await extractTextFromFile(file);
      if (!text || text.trim().length < 50) {
        throw new Error('Could not extract enough text from the file.');
      }
      setCoverLetterText(text);
      setCoverLetterStep(2);
    } catch (error: any) {
      console.error('Error extracting text:', error);
      alert(`Failed to extract text from the resume: ${error.message}. Please try a different PDF or DOCX file.`);
      setCoverLetterFile(null);
    } finally {
      setIsExtractingText(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-slate text-on-surface font-body selection:bg-neon-blue selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-dark-slate/60 backdrop-blur-xl border-b border-white/5 z-50 flex items-center justify-between px-6">
        <button 
          onClick={() => setView('home')}
          className="group flex items-center gap-2 px-1 rounded-xl transition-all duration-300 transform active:scale-95 cursor-pointer"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-neon-blue to-neon-purple rounded-xl flex items-center justify-center text-black shadow-[0_0_15px_rgba(0,243,255,0.4)] group-hover:shadow-[0_0_25px_rgba(0,243,255,0.6)] group-hover:scale-105 transition-all">
            <Sparkles size={22} className="group-hover:rotate-12 transition-transform" />
          </div>
          <div className="flex flex-col items-start leading-tight">
            <span className="font-headline font-black text-xl tracking-tighter text-white group-hover:text-neon-blue transition-colors">CareerSwipe</span>
            <span className="text-[10px] font-bold text-neon-blue/60 uppercase tracking-[0.2em] group-hover:text-neon-blue transition-colors">Home</span>
          </div>
        </button>
        <div className="flex gap-1.5 p-1.5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
          <button 
            onClick={() => setView('resume')}
            className={`px-4 py-2.5 rounded-xl transition-all duration-300 text-sm font-bold flex items-center gap-2 cursor-pointer ${view === 'resume' ? 'bg-neon-blue text-black shadow-[0_0_15px_rgba(0,243,255,0.4)]' : 'text-on-surface-variant hover:text-white hover:bg-white/10'}`}
          >
            <FileText size={18} />
            <span className="hidden sm:inline">Resume</span>
          </button>
          <button 
            onClick={() => setView('cover-letter')}
            className={`px-4 py-2.5 rounded-xl transition-all duration-300 text-sm font-bold flex items-center gap-2 cursor-pointer ${view === 'cover-letter' ? 'bg-neon-blue text-black shadow-[0_0_15px_rgba(0,243,255,0.4)]' : 'text-on-surface-variant hover:text-white hover:bg-white/10'}`}
          >
            <FileText size={18} />
            <span className="hidden sm:inline">Cover Letter</span>
          </button>
          <button 
            onClick={() => setView('ats-check')}
            className={`px-4 py-2.5 rounded-xl transition-all duration-300 text-sm font-bold flex items-center gap-2 cursor-pointer ${view === 'ats-check' ? 'bg-neon-blue text-black shadow-[0_0_15px_rgba(0,243,255,0.4)]' : 'text-on-surface-variant hover:text-white hover:bg-white/10'}`}
          >
            <Sparkles size={18} />
            <span className="hidden sm:inline">ATS Check</span>
          </button>
          <div className="w-[1px] h-4 bg-white/10 self-center mx-1" />
          <button 
            onClick={() => setView('profile')}
            className={`px-4 py-2.5 rounded-xl transition-all duration-300 text-sm font-bold flex items-center gap-2 cursor-pointer ${view === 'profile' ? 'bg-neon-blue text-black shadow-[0_0_15px_rgba(0,243,255,0.4)]' : 'text-on-surface-variant hover:text-white hover:bg-white/10'}`}
          >
            <User size={18} />
            <span className="hidden sm:inline">Profile</span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {showBreakdown && currentAtsResult && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBreakdown(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="relative w-full max-w-lg bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 bg-indigo-600 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-indigo-100 text-xs font-bold uppercase tracking-widest mb-1">ATS Analysis</h2>
                      <div className="text-4xl font-black">Score: {realTimeScore}%</div>
                    </div>
                    <button 
                      onClick={() => setShowBreakdown(false)}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${realTimeScore}%` }}
                      className="h-full bg-white"
                    />
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 text-white/10">
                  <Sparkles size={120} fill="currentColor" />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {/* Category Progress Bars in Modal */}
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { label: 'Design', key: 'design', total: 25, color: 'bg-indigo-500' },
                    { label: 'Structure', key: 'structure', total: 50, color: 'bg-emerald-500' },
                    { label: 'Content', key: 'content', total: 25, color: 'bg-amber-500' },
                  ].map((cat, i) => {
                    const score = currentAtsResult.categories[cat.key as keyof typeof currentAtsResult.categories];
                    const percentage = (score / cat.total) * 100;
                    
                    return (
                      <div key={i} className="space-y-1.5">
                        <div className="flex justify-between items-end">
                          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{cat.label}</span>
                          <span className="text-[10px] font-bold text-zinc-900">{score}/{cat.total}</span>
                        </div>
                        <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1, delay: 0.2 + (i * 0.1) }}
                            className={`h-full rounded-full ${cat.color}`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div>
                  <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">Detailed Factors</h3>
                  <div className="space-y-3">
                    {currentAtsResult.factors.map((f: any, i: number) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                        <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${f.passed ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                          {f.passed ? <Check size={12} strokeWidth={3} /> : <X size={12} strokeWidth={3} />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-sm">{f.name}</span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${f.impact === 'high' ? 'bg-rose-50 text-rose-600' : f.impact === 'medium' ? 'bg-amber-50 text-amber-600' : 'bg-zinc-100 text-zinc-500'}`}>
                              {f.impact} Impact
                            </span>
                          </div>
                          <p className="text-xs text-zinc-500 leading-relaxed">{f.feedback}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-zinc-100 bg-zinc-50">
                <button 
                  onClick={() => setShowBreakdown(false)}
                  className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                >
                  Got it, thanks!
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {view === 'home' ? (
        <HomeView onBuildCV={() => setView('resume')} />
      ) : (
      <main className={`pt-24 pb-12 px-6 mx-auto h-[calc(100vh-4rem)] flex flex-col ${view === 'ats-check' ? 'max-w-7xl' : view === 'cover-letter' || view === 'profile' ? 'max-w-4xl' : 'max-w-lg'}`}>
        {view === 'profile' ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col items-center justify-center text-center"
          >
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-6 shadow-xl shadow-indigo-100/50">
              <User size={48} />
            </div>
            <h1 className="text-4xl font-serif text-zinc-900 mb-4">My Profile</h1>
            <p className="text-zinc-500 max-w-md text-lg leading-relaxed mb-8">
              Manage your personal information, career preferences, and account settings. Import details directly from your resume to quick-start your profile.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-zinc-900 text-white font-bold rounded-xl shadow-lg hover:scaling-105 transition-all">
                Coming Soon
              </button>
            </div>
          </motion.div>
        ) : view === 'ats-check' ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 top-16 bg-dot-pattern flex flex-col z-40 overflow-y-auto custom-scrollbar"
          >
            {/* Ambient animated background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-300/20 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] bg-blue-300/20 rounded-full blur-[120px] pointer-events-none" style={{ animation: 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
            
            <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 relative z-10 flex flex-col justify-center min-h-[calc(100vh-8rem)]">
              <div className="glass-card bg-white/60 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_32px_rgba(0,0,0,0.04)] w-full p-8 md:p-12 border border-white/60 relative overflow-hidden">
                {/* Inner ambient glow for glass effect */}
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-100/50 rounded-full blur-[80px] pointer-events-none"></div>
                
                <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
              {/* Left Side: Content & Upload */}
              <div className="space-y-8">
                <div>
                  <div className="text-zinc-400 font-bold text-xs uppercase tracking-[0.2em] mb-4">ATS CV Checker</div>
                  <h1 className="text-5xl font-serif text-zinc-900 leading-[1.1] mb-6">
                    Optimize your CV <br /> for ATS scanners.
                  </h1>
                  <p className="text-zinc-500 text-lg leading-relaxed max-w-md">
                    Do you want to get invited to more job interviews? Simulate an applicant tracking system scan with our ATS CV Checker and ensure that your CV always gets into the hands of a human recruiter.
                  </p>
                </div>

                {!atsResult && !isAnalyzing ? (
                  <div className="space-y-6">
                    {/* Job Description Input */}
                    <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
                      <label className="text-sm font-bold text-zinc-700 mb-2 block">Target Job Description <span className="text-zinc-400 font-normal">(optional but recommended)</span></label>
                      <textarea
                        value={atsJobDescription}
                        onChange={(e) => setAtsJobDescription(e.target.value)}
                        className="w-full h-32 p-4 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 text-sm text-zinc-700 resize-none"
                        placeholder="Paste the job description or key requirements here to get a more accurate, targeted ATS score..."
                      />
                    </div>

                    <div 
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        const file = e.dataTransfer.files[0];
                        if (file) handleFileUpload(file);
                      }}
                      className={`p-16 border-2 border-dashed rounded-[2.5rem] text-center relative group transition-all duration-300 ${
                        isDragging 
                          ? 'border-indigo-500 bg-indigo-50/50 scale-[1.02]' 
                          : 'border-zinc-200 bg-zinc-50/50 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 mb-8 relative">
                          <div className={`absolute inset-0 bg-indigo-100 rounded-2xl transition-transform duration-300 ${isDragging ? 'rotate-12 scale-110' : 'rotate-6 group-hover:rotate-12'}`} />
                          <div className="absolute inset-0 bg-white border border-zinc-200 rounded-2xl flex items-center justify-center shadow-sm">
                            <FileText size={32} className={isDragging ? 'text-indigo-600 animate-bounce' : 'text-indigo-600'} />
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-zinc-900 mb-2">
                          {isDragging ? 'Drop your CV here' : 'Upload your CV'}
                        </h3>
                        <p className="text-zinc-500 text-sm mb-8 max-w-xs mx-auto">
                          Drag and drop your CV here, or click the button below to browse your files.
                        </p>

                        <button 
                          onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = '.pdf,.doc,.docx';
                            input.onchange = (e) => {
                              const file = (e.target as HTMLInputElement).files?.[0];
                              if (file) handleFileUpload(file);
                            };
                            input.click();
                          }}
                          className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-200 hover:scale-105 transition-transform mb-6"
                        >
                          Select File
                        </button>
                        
                        <div className="flex items-center justify-center gap-2 text-zinc-400 text-xs">
                          <Lock size={12} />
                          <span>Secure & Private • PDF, DOCX supported</span>
                        </div>
                      </div>

                      {isDragging && (
                        <div className="absolute inset-0 bg-indigo-600/5 rounded-[2.5rem] pointer-events-none" />
                      )}
                    </div>

                    {uploadError && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3 text-rose-600"
                      >
                        <X size={18} className="shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-bold mb-0.5">Upload Failed</p>
                          <p className="opacity-80">{uploadError}</p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ) : isAnalyzing ? (
                  <div className="p-16 bg-white rounded-[2.5rem] border border-zinc-100 shadow-xl shadow-zinc-200/50 text-center">
                    <div className="relative w-24 h-24 mx-auto mb-8">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-4 border-indigo-100 border-t-indigo-600 rounded-full"
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-indigo-600">
                        <FileText size={32} />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-zinc-900 mb-2">Analyzing CV</h3>
                    <p className="text-zinc-500 text-sm mb-8">Scanning for 15+ critical ATS factors...</p>
                    
                    <div className="max-w-xs mx-auto">
                      <div className="flex justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
                        <span>Progress</span>
                        <span>{Math.round(analysisProgress)}%</span>
                      </div>
                      <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-indigo-600"
                          initial={{ width: 0 }}
                          animate={{ width: `${analysisProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <button 
                      onClick={() => {
                        setAtsResult(null);
                        setUploadedFile(null);
                        setUploadError(null);
                      }}
                      className="flex items-center gap-2 text-indigo-600 font-bold hover:underline"
                    >
                      <ArrowRight size={18} className="rotate-180" />
                      Upload another CV
                    </button>
                    {uploadedFile && (
                      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6 space-y-4">
                        <label className="text-sm font-bold text-zinc-700 mb-2 block">Refine with a different job description</label>
                        <textarea
                          value={atsJobDescription}
                          onChange={(e) => setAtsJobDescription(e.target.value)}
                          className="w-full h-24 p-4 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 text-sm text-zinc-700 resize-none"
                          placeholder="Paste a new job description to re-analyze your CV..."
                        />
                        <button
                          onClick={() => handleFileUpload(uploadedFile)}
                          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:scale-105 transition-transform text-sm"
                        >
                          Re-Analyze CV
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Side: Visual Score Card */}
              <div className="relative flex justify-center lg:justify-end">
                {/* Background decorative elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-50/50 rounded-full blur-3xl -z-10" />
                
                <div className="relative w-full max-w-md">
                  {/* CV Previews (Stacked) */}
                  <div className="absolute -top-12 -left-8 w-48 h-64 bg-white rounded-2xl shadow-lg border border-zinc-100 -rotate-6 z-0 overflow-hidden p-4">
                    <div className="w-12 h-3 bg-indigo-600 mb-2" />
                    <div className="w-20 h-4 bg-indigo-600 mb-4" />
                    <div className="space-y-2">
                      <div className="w-full h-1 bg-zinc-100" />
                      <div className="w-full h-1 bg-zinc-100" />
                      <div className="w-3/4 h-1 bg-zinc-100" />
                    </div>
                  </div>
                  
                  <div className="absolute -top-6 -right-4 w-48 h-64 bg-white rounded-2xl shadow-lg border border-zinc-100 rotate-3 z-10 overflow-hidden p-4">
                    <div className="flex gap-2 mb-4">
                      <div className="w-8 h-8 bg-zinc-100 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <div className="w-1/2 h-2 bg-zinc-100" />
                        <div className="w-3/4 h-2 bg-zinc-100" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-1 bg-zinc-100" />
                      <div className="w-full h-1 bg-zinc-100" />
                      <div className="w-full h-1 bg-zinc-100" />
                      <div className="w-1/2 h-1 bg-zinc-100" />
                    </div>
                  </div>

                  {/* Main Score Card */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative z-20 bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-200/50 border border-zinc-100 p-8 overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                      {/* Donut Chart */}
                      <div className="relative w-40 h-40 shrink-0">
                        <PieChart width={160} height={160}>
                          <Pie
                              data={[
                                { value: isAnalyzing ? 0 : atsResult ? atsResult.score : 0 },
                                { value: 100 - (isAnalyzing ? 0 : atsResult ? atsResult.score : 0) }
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={0}
                              dataKey="value"
                              startAngle={90}
                              endAngle={-270}
                            >
                              <Cell fill="url(#scoreGradient)" />
                              <Cell fill="#f4f4f5" />
                            </Pie>
                            <defs>
                              <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#818cf8" />
                                <stop offset="100%" stopColor="#4f46e5" />
                              </linearGradient>
                            </defs>
                          </PieChart>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl font-black text-zinc-900">
                            {isAnalyzing ? '--' : atsResult ? atsResult.score : '--'}
                          </span>
                          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Score</span>
                        </div>
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        <div className="text-zinc-400 font-bold text-xs uppercase tracking-widest mb-1">Hireability Status</div>
                        <h3 className="text-2xl font-black text-zinc-900 mb-2">
                          {isAnalyzing ? 'Analyzing...' : atsResult ? (atsResult.score >= 80 ? 'Highly Competitive' : 'Needs Improvement') : 'Upload Your CV'}
                        </h3>
                        <p className="text-sm text-zinc-500 leading-relaxed">
                          {isAnalyzing 
                            ? 'Our AI is scanning your CV for 15+ critical ATS factors...' 
                            : atsResult 
                              ? (atsResult.score >= 80 
                                ? 'Your CV is in the top 10% of candidates. Minor tweaks could make it perfect.' 
                                : 'We found some critical gaps that might prevent your CV from reaching recruiters.')
                              : 'Upload your CV and optionally provide a job description to get your personalized ATS score.'}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      {[
                        { label: 'Design', key: 'design', total: 25, color: 'bg-indigo-500' },
                        { label: 'Structure', key: 'structure', total: 50, color: 'bg-emerald-500' },
                        { label: 'Content', key: 'content', total: 25, color: 'bg-amber-500' },
                      ].map((cat, i) => {
                        const score = isAnalyzing ? 0 : atsResult ? atsResult.categories[cat.key as keyof typeof atsResult.categories] : 0;
                        const percentage = (score / cat.total) * 100;
                        
                        return (
                          <div key={i} className="space-y-2">
                            <div className="flex justify-between items-end">
                              <span className="text-sm font-bold text-zinc-900">{cat.label}</span>
                              <span className="text-xs font-bold text-zinc-500">{score}/{cat.total}</span>
                            </div>
                            <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                className={`h-full rounded-full ${cat.color}`}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Floating Sparkle */}
                    <div className="absolute -top-4 -right-4 text-indigo-600/20 animate-pulse">
                      <Sparkles size={80} fill="currentColor" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Detailed Breakdown Section */}
            {atsResult && !isAnalyzing && (
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-20 space-y-12 pb-12"
              >
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-zinc-200" />
                  <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-[0.2em]">Detailed 15-Factor Breakdown</h2>
                  <div className="h-px flex-1 bg-zinc-200" />
                </div>

                <div className="space-y-12">
                  {[
                    { id: 'content', label: 'Content & Keywords', icon: <FileText size={20} /> },
                    { id: 'structure', label: 'Structure & Parsing', icon: <Briefcase size={20} /> },
                    { id: 'design', label: 'Design & Readability', icon: <User size={20} /> },
                  ].map((section) => {
                    const sectionFactors = atsResult.factors.filter((f: any) => f.category === section.id);
                    if (sectionFactors.length === 0) return null;

                    return (
                      <div key={section.id} className="space-y-6">
                        <div className="flex items-center gap-3 text-zinc-900">
                          <div className="p-2 bg-zinc-100 rounded-lg">
                            {section.icon}
                          </div>
                          <h3 className="text-lg font-bold">{section.label}</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          {sectionFactors.map((f: any, i: number) => (
                            <div key={i} className="p-6 bg-white rounded-3xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
                              <div className="flex items-start gap-4">
                                <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${f.passed ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                                  {f.passed ? <Check size={14} strokeWidth={3} /> : <X size={14} strokeWidth={3} />}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-bold text-zinc-900">{f.name}</span>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                      f.impact === 'high' ? 'bg-rose-50 text-rose-600' : 
                                      f.impact === 'medium' ? 'bg-amber-50 text-amber-600' : 
                                      'bg-zinc-100 text-zinc-500'
                                    }`}>
                                      {f.impact} Impact
                                    </span>
                                  </div>
                                  <p className="text-sm text-zinc-500 leading-relaxed">{f.feedback}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
              </div>
            </div>
          </motion.div>
        ) : view === 'cover-letter' ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 top-16 bg-dot-pattern flex flex-col z-40 overflow-y-auto custom-scrollbar"
          >
            {/* Ambient animated background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-300/20 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] bg-blue-300/20 rounded-full blur-[120px] pointer-events-none" style={{ animation: 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
            
            <div className="w-full max-w-4xl mx-auto px-6 md:px-12 py-12 relative z-10 flex flex-col items-center">
            {/* Header */}
            <div className="mb-12 text-center w-full">
               <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight mb-2">Cover Letter Generator</h1>
               <p className="text-slate-500 font-medium">Generate as many cover letters as you need</p>
            </div>

            {/* Main Card */}
            <div className="glass-card bg-white/60 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_32px_rgba(0,0,0,0.04)] w-full p-8 md:p-12 border border-white/60 relative overflow-hidden">
               {/* Inner ambient glow for glass effect */}
               <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-100/50 rounded-full blur-[80px] pointer-events-none"></div>
              {/* Step Indicator */}
              <div className="flex items-center justify-center mb-12">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${coverLetterStep >= 1 ? 'bg-[#20b2aa]' : 'bg-zinc-200 text-zinc-500'}`}>
                  {coverLetterStep > 1 ? <Check size={20} /> : '1'}
                </div>
                <div className={`w-16 sm:w-24 h-1 ${coverLetterStep >= 2 ? 'bg-[#20b2aa]' : 'bg-zinc-100'}`}></div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${coverLetterStep >= 2 ? 'bg-[#20b2aa]' : 'bg-indigo-200 text-indigo-500'}`}>
                  {coverLetterStep > 2 ? <Check size={20} /> : '2'}
                </div>
                <div className={`w-16 sm:w-24 h-1 ${coverLetterStep >= 3 ? 'bg-[#20b2aa]' : 'bg-zinc-100'}`}></div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${coverLetterStep >= 3 ? 'bg-[#20b2aa]' : 'bg-indigo-200 text-indigo-500'}`}>
                  3
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-center text-zinc-800 mb-10">Free AI Cover Letter Generator</h1>

              {coverLetterStep === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto">
                  <p className="text-lg text-zinc-700 mb-6 text-center">First, <strong>upload your resume</strong> in order to fully customize your cover letter.</p>
                  
                  <div 
                    className="border-2 border-dashed border-[#20b2aa] rounded-2xl p-12 text-center hover:bg-teal-50/50 transition-colors cursor-pointer relative"
                    onClick={() => document.getElementById('coverLetterFileInput')?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files[0];
                      if (file) handleCoverLetterUpload(file);
                    }}
                  >
                    <input 
                      type="file" 
                      id="coverLetterFileInput" 
                      className="hidden" 
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleCoverLetterUpload(file);
                      }}
                    />
                    <p className="text-zinc-700 mb-2">Drop your resume here or choose a file.</p>
                    <p className="text-zinc-500 text-sm mb-8">PDF & DOCX only. Max 2MB file size.</p>
                    
                    <button disabled={isExtractingText} className="bg-[#20b2aa] hover:bg-teal-500 text-white px-8 py-3 rounded-lg font-bold transition-colors disabled:opacity-70">
                      {isExtractingText ? 'Uploading...' : 'Upload Your Resume'}
                    </button>
                    
                    <div className="flex items-center justify-center gap-2 mt-8 text-zinc-500 text-sm font-medium">
                      <Lock size={14} />
                      We will never share your data with 3rd parties or use it for AI model training.
                    </div>
                  </div>
                </motion.div>
              )}

              {coverLetterStep === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto">
                  <p className="text-lg text-zinc-700 mb-6">Now, paste the <strong>job description</strong> or the entire job ad for the job you are applying for.</p>
                  
                  <div className="border border-zinc-200 rounded-2xl overflow-hidden flex flex-col mb-8">
                    <textarea 
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      className="w-full h-64 p-6 resize-none focus:outline-none text-zinc-700"
                      placeholder="Paste job description here..."
                    ></textarea>
                    <div className="bg-zinc-50 border-t border-zinc-200 p-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-zinc-600 font-medium cursor-pointer hover:text-zinc-900">
                        <Settings size={18} />
                        SETTINGS
                      </div>
                      <select 
                        value={coverLetterTone}
                        onChange={(e) => setCoverLetterTone(e.target.value)}
                        className="bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#20b2aa]"
                      >
                        <option value="Professional">Professional Tone</option>
                        <option value="Confident">Confident Tone</option>
                        <option value="Enthusiastic">Enthusiastic Tone</option>
                        <option value="Direct">Direct Tone</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-zinc-500 text-sm bg-zinc-100 px-3 py-1.5 rounded-lg">
                      <FileText size={16} />
                      <span className="truncate max-w-[200px]">{coverLetterFile?.name || 'Resume.pdf'}</span>
                      <button onClick={() => { setCoverLetterStep(1); setCoverLetterText(''); setCoverLetterFile(null); setJobDescription(''); setGeneratedCoverLetter(''); }} className="hover:text-zinc-800 ml-2"><X size={14} /></button>
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <button 
                        onClick={() => { setCoverLetterStep(1); setCoverLetterText(''); setCoverLetterFile(null); setJobDescription(''); setGeneratedCoverLetter(''); }}
                        className="px-6 py-3 border-2 border-zinc-800 text-zinc-800 rounded-lg font-bold hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2 flex-1 sm:flex-none"
                      >
                        <ArrowLeft size={18} /> Back
                      </button>
                      <button 
                        onClick={handleGenerateCoverLetter}
                        disabled={!jobDescription.trim() || isGeneratingCoverLetter}
                        className="px-8 py-3 bg-[#20b2aa] text-white rounded-lg font-bold hover:bg-teal-500 transition-colors disabled:opacity-50 flex-1 sm:flex-none"
                      >
                        Generate
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {coverLetterStep === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto">
                  <div className="border border-zinc-200 rounded-2xl overflow-hidden flex flex-col mb-8 relative">
                    {isGeneratingCoverLetter ? (
                      <div className="h-96 flex flex-col items-center justify-center text-zinc-500">
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-10 h-10 border-4 border-teal-100 border-t-[#20b2aa] rounded-full mb-4"
                        />
                        <p>Crafting your perfect cover letter...</p>
                      </div>
                    ) : (
                      <>
                        <div className="bg-zinc-50 border-b border-zinc-200 p-4 flex items-center justify-between">
                          <h3 className="font-semibold text-zinc-800">Your Cover Letter</h3>
                          <div className="flex items-center gap-3">
                            <button onClick={handleCopy} className="text-zinc-500 hover:text-zinc-800 transition-colors p-1.5 rounded-md hover:bg-zinc-200 bg-white shadow-sm border border-zinc-200" title="Copy to Clipboard">
                              {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                            </button>
                            <div className="relative">
                              <button 
                                onClick={() => setShowCoverLetterDownloadMenu(!showCoverLetterDownloadMenu)}
                                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                              >
                                Download <ChevronDown size={16} />
                              </button>
                              {showCoverLetterDownloadMenu && (
                                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-zinc-100 overflow-hidden z-50">
                                  <button onClick={downloadPDF} className="w-full text-left px-4 py-3 hover:bg-zinc-50 text-sm font-medium text-zinc-700 flex items-center gap-2 border-b border-zinc-100">
                                    <FileText size={16} className="text-rose-500" /> Download as PDF
                                  </button>
                                  <button onClick={downloadDOCX} className="w-full text-left px-4 py-3 hover:bg-zinc-50 text-sm font-medium text-zinc-700 flex items-center gap-2 border-b border-zinc-100">
                                    <FileText size={16} className="text-blue-500" /> Download as Word
                                  </button>
                                  <button onClick={downloadTXT} className="w-full text-left px-4 py-3 hover:bg-zinc-50 text-sm font-medium text-zinc-700 flex items-center gap-2">
                                    <FileText size={16} className="text-zinc-500" /> Download as Text
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="bg-white">
                          <ReactQuill 
                            theme="snow" 
                            value={generatedCoverLetter} 
                            onChange={setGeneratedCoverLetter}
                            className="h-[500px] pb-12"
                            modules={{
                              toolbar: [
                                [{ 'header': [1, 2, 3, false] }],
                                ['bold', 'italic', 'underline', 'strike'],
                                [{'list': 'ordered'}, {'list': 'bullet'}],
                                [{ 'align': [] }],
                                ['clean']
                              ]
                            }}
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-zinc-500 text-sm bg-zinc-100 px-3 py-1.5 rounded-lg">
                      <FileText size={16} />
                      <span className="truncate max-w-[200px]">{coverLetterFile?.name || 'Resume.pdf'}</span>
                      <button onClick={() => { setCoverLetterStep(1); setCoverLetterText(''); setCoverLetterFile(null); setJobDescription(''); setGeneratedCoverLetter(''); }} className="hover:text-zinc-800 ml-2"><X size={14} /></button>
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <button 
                        onClick={() => setCoverLetterStep(2)}
                        className="px-6 py-3 border-2 border-zinc-800 text-zinc-800 rounded-lg font-bold hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2 flex-1 sm:flex-none"
                      >
                        <ArrowLeft size={18} /> Back
                      </button>
                      <button 
                        onClick={handleGenerateCoverLetter}
                        disabled={isGeneratingCoverLetter}
                        className="px-8 py-3 bg-[#20b2aa] text-white rounded-lg font-bold hover:bg-teal-500 transition-colors disabled:opacity-50 flex-1 sm:flex-none"
                      >
                        Generate
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            </div>
          </motion.div>
        ) : cvBuilderStep === 'select-template' ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 top-16 bg-dot-pattern flex flex-col z-40 overflow-y-auto custom-scrollbar"
          >
            {/* Ambient animated background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-300/20 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] bg-blue-300/20 rounded-full blur-[120px] pointer-events-none" style={{ animation: 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
            
            <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-12 relative z-10">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                 <div>
                   <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight mb-2">Choose your Template</h1>
                   <p className="text-slate-500 font-medium">20+ professional designs optimized for every industry</p>
                 </div>
                 
                 <div className="flex flex-wrap items-center gap-6">
                   <div className="flex items-center gap-2">
                     <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Photo</span>
                     <div className="flex items-center glass-panel p-1 rounded-full border border-white/40">
                       <button onClick={() => setPhotoFilter('All')} className={`px-4 py-1.5 text-[13px] font-bold rounded-full transition-all ${photoFilter === 'All' ? 'bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] text-indigo-600' : 'text-slate-500 hover:text-indigo-600 hover:bg-white/40'}`}>All</button>
                       <button onClick={() => setPhotoFilter('Photo')} className={`px-4 py-1.5 text-[13px] font-bold rounded-full transition-all flex items-center gap-1 ${photoFilter === 'Photo' ? 'bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] text-indigo-600' : 'text-slate-500 hover:text-indigo-600 hover:bg-white/40'}`}>Photo</button>
                       <button onClick={() => setPhotoFilter('No Photo')} className={`px-4 py-1.5 text-[13px] font-bold rounded-full transition-all ${photoFilter === 'No Photo' ? 'bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] text-indigo-600' : 'text-slate-500 hover:text-indigo-600 hover:bg-white/40'}`}>No Photo</button>
                     </div>
                   </div>
                   <div className="flex items-center gap-2">
                     <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Columns</span>
                     <div className="flex items-center glass-panel p-1 rounded-full border border-white/40">
                       <button onClick={() => setColumnsFilter('All')} className={`px-4 py-1.5 text-[13px] font-bold rounded-full transition-all ${columnsFilter === 'All' ? 'bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] text-indigo-600' : 'text-slate-500 hover:text-indigo-600 hover:bg-white/40'}`}>All</button>
                       <button onClick={() => setColumnsFilter('Single')} className={`px-4 py-1.5 text-[13px] font-bold rounded-full transition-all ${columnsFilter === 'Single' ? 'bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] text-indigo-600' : 'text-slate-500 hover:text-indigo-600 hover:bg-white/40'}`}>Single</button>
                       <button onClick={() => setColumnsFilter('Double')} className={`px-4 py-1.5 text-[13px] font-bold rounded-full transition-all ${columnsFilter === 'Double' ? 'bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] text-indigo-600' : 'text-slate-500 hover:text-indigo-600 hover:bg-white/40'}`}>Double</button>
                     </div>
                   </div>
                 </div>
               </div>
               
               <div className="space-y-16 pb-24">
                 {['Corporate', 'Tech', 'Creative', 'Minimalist'].map(category => {
                   const templates = TEMPLATE_LIST.filter(t => {
                     if (t.category !== category) return false;
                     if (photoFilter === 'Photo' && !t.hasPhoto) return false;
                     if (photoFilter === 'No Photo' && t.hasPhoto) return false;
                     if (columnsFilter === 'Single' && t.columns !== 1) return false;
                     if (columnsFilter === 'Double' && t.columns !== 2) return false;
                     return true;
                   });
                   
                   if (templates.length === 0) return null;
                   
                   return (
                     <div key={category}>
                       <h2 className="text-xl font-display font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-4">
                         {category} 
                         <div className="h-px bg-slate-200 flex-1"></div>
                       </h2>
                       <motion.div 
                         variants={{
                           show: { transition: { staggerChildren: 0.1 } },
                           hidden: {}
                         }}
                         initial="hidden"
                         animate="show"
                         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-8"
                       >
                         {templates.map((template, idx) => (
                           <motion.button 
                             key={template.id}
                             variants={{
                               hidden: { opacity: 0, y: 40, scale: 0.95 },
                               show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } }
                             }}
                             whileHover={{ scale: 1.03, y: -5 }}
                             whileTap={{ scale: 0.98 }}
                             onClick={() => { setSelectedTemplate(template.id); setCvBuilderStep('editor'); }} 
                             className="group flex flex-col items-start text-left outline-none glass-card p-5 rounded-[2rem]"
                           >
                             <div className="w-full aspect-[1/1.414] bg-white/80 rounded-2xl shadow-inner border border-white/50 overflow-hidden relative mb-5 group-hover:shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] transition-all duration-500">
                                <div className="absolute top-0 left-0 w-[400%] h-[400%] origin-top-left scale-[0.25] pointer-events-none bg-white/90">
                                  <CVTemplates templateId={template.id} data={cvData} />
                                </div>
                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-[4px]">
                                  <div className="bg-white/90 backdrop-blur-md border border-white/50 text-indigo-600 font-bold px-6 py-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[20px]">magic_button</span>
                                    Use Template
                                  </div>
                                </div>
                             </div>
                             <h3 className="font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                               {template.name}
                               {template.hasPhoto && <span className="material-symbols-outlined text-[16px] text-slate-400" title="Includes Photo">portrait</span>}
                             </h3>
                             <p className="text-sm text-slate-500 line-clamp-2 mt-1">{template.description}</p>
                           </motion.button>
                         ))}
                       </motion.div>
                     </div>
                   );
                 })}
               </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 top-16 bg-slate-50 flex flex-col z-40"
          >
            {/* Sub-header: High Contrast & Clean */}
            <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-slate-200 dark:border-slate-800 shrink-0 z-20 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="size-10 bg-indigo-600 flex items-center justify-center rounded-xl text-white shadow-lg shadow-indigo-200 dark:shadow-none">
                  <span className="material-symbols-outlined text-2xl">edit_document</span>
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    CV Builder Professional 
                    <span className="text-[10px] font-black bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full uppercase tracking-tighter">Enterprise</span>
                  </h2>
                  <p className="text-[10px] text-slate-500 font-medium mt-0.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">folder_open</span>
                    {cvData.fullName.replace(' ', '_').toLowerCase()}_cv_2026.pdf
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">

                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                  <button onClick={() => setCvViewMode('preview')} className={`px-4 py-1.5 text-[11px] font-bold rounded-lg transition-all ${cvViewMode === 'preview' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-indigo-600'}`}>Preview</button>
                  <button onClick={() => setCvViewMode('editor')} className={`px-4 py-1.5 text-[11px] font-bold rounded-lg transition-all ${cvViewMode === 'editor' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-indigo-600'}`}>Editor</button>
                  <button onClick={() => setCvViewMode('history')} className={`px-4 py-1.5 text-[11px] font-bold rounded-lg transition-all ${cvViewMode === 'history' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-indigo-600'}`}>History</button>
                </div>
                <div className="h-8 w-px bg-slate-200"></div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <button 
                      onClick={() => setShowCvDownloadMenu(!showCvDownloadMenu)}
                      className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold rounded-xl shadow-lg shadow-indigo-100 dark:shadow-none transition-all active:scale-95"
                    >
                      <span className="material-symbols-outlined text-sm">download</span>
                      DOWNLOAD
                    </button>
                    {showCvDownloadMenu && (
                      <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50">
                        <button onClick={downloadCVPDF} className="w-full text-left px-4 py-3 hover:bg-slate-50 text-[11px] font-bold text-slate-700 flex items-center gap-2 border-b border-slate-100">
                          <span className="material-symbols-outlined text-sm text-rose-500">picture_as_pdf</span>
                          <span id="btn-download-pdf-text">Download PDF</span>
                        </button>
                        <button onClick={downloadCVDOCX} className="w-full text-left px-4 py-3 hover:bg-slate-50 text-[11px] font-bold text-slate-700 flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm text-blue-500">description</span>
                          <span id="btn-download-word-text">Download Word</span>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="size-9 rounded-full border-2 border-white dark:border-slate-700 shadow-md overflow-hidden ring-2 ring-indigo-50 dark:ring-indigo-900/20">
                    <img alt="User" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZtPlK4_HJcmBdXc8rpLtAlCR_whwWfjyCfwksmP3_94iCGgrAMxMfBy6fRHoKlh-ST3sAFEhpaeuEOZLCdxsuvhPgvFYZsVRpTrbr7eGSpadVIJYTqb2ps2Tul0q19pzSSDOXOPFa0MuLdW12lE_R6oKwpW3D-yReOFLuNaLHtuiyliVFzmONCf2eYJUbth-4a82alIrO_H6gZ-KHNMa_0TJABy-rP5XSEHLdDncPqar2f-gjJpGw4vtI9l7eEH7Br1FC-tqKhKo"/>
                  </div>
                </div>
              </div>
            </header>

            <main className="flex flex-1 overflow-hidden min-h-0">
              {/* Left Nav: Modular & Minimal */}
              {cvViewMode !== 'preview' && (
              <nav className="w-24 flex flex-col items-center py-6 bg-white border-r border-slate-200 dark:border-slate-800 shrink-0">
                <div className="flex flex-col gap-4 w-full px-2">
                  <button 
                    onClick={() => { setActiveCvSection('profile'); setCvViewMode('editor'); }}
                    className={`w-full flex flex-col items-center justify-center py-3 rounded-2xl transition-all group ${activeCvSection === 'profile' && cvViewMode === 'editor' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none' : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'}`} 
                    title="Personal Info"
                  >
                    <span className="material-symbols-outlined mb-1">person</span>
                    <span className="text-[9px] font-black uppercase tracking-tighter">Profile</span>
                  </button>
                  <button 
                    onClick={() => { setActiveCvSection('experience'); setCvViewMode('editor'); }}
                    className={`w-full flex flex-col items-center justify-center py-3 rounded-2xl transition-all group ${activeCvSection === 'experience' && cvViewMode === 'editor' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none' : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'}`} 
                    title="Experience"
                  >
                    <span className="material-symbols-outlined mb-1">work</span>
                    <span className="text-[9px] font-black uppercase tracking-tighter">Work</span>
                  </button>
                  <button 
                    onClick={() => { setActiveCvSection('education'); setCvViewMode('editor'); }}
                    className={`w-full flex flex-col items-center justify-center py-3 rounded-2xl transition-all group ${activeCvSection === 'education' && cvViewMode === 'editor' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none' : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'}`} 
                    title="Education"
                  >
                    <span className="material-symbols-outlined mb-1">school</span>
                    <span className="text-[9px] font-black uppercase tracking-tighter">Studies</span>
                  </button>
                  <button 
                    onClick={() => { setActiveCvSection('skills'); setCvViewMode('editor'); }}
                    className={`w-full flex flex-col items-center justify-center py-3 rounded-2xl transition-all group ${activeCvSection === 'skills' && cvViewMode === 'editor' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none' : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'}`} 
                    title="Skills"
                  >
                    <span className="material-symbols-outlined mb-1">construction</span>
                    <span className="text-[9px] font-black uppercase tracking-tighter">Skills</span>
                  </button>
                  <button 
                    onClick={() => { setActiveCvSection('projects'); setCvViewMode('editor'); }}
                    className={`w-full flex flex-col items-center justify-center py-3 rounded-2xl transition-all group ${activeCvSection === 'projects' && cvViewMode === 'editor' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none' : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'}`} 
                    title="Projects"
                  >
                    <span className="material-symbols-outlined mb-1">folder</span>
                    <span className="text-[9px] font-black uppercase tracking-tighter">Projects</span>
                  </button>
                  <div className="w-10 h-px bg-slate-100 my-2 mx-auto"></div>
                  <button className="w-full flex flex-col items-center justify-center py-3 rounded-2xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all group" title="Add Section">
                    <span className="material-symbols-outlined mb-1">add_circle</span>
                    <span className="text-[9px] font-black uppercase tracking-tighter">Add</span>
                  </button>
                </div>
                <div className="mt-auto flex flex-col gap-6">
                  <button className="size-12 flex items-center justify-center rounded-2xl text-slate-400 hover:text-indigo-600 transition-all" title="Settings">
                    <span className="material-symbols-outlined">settings</span>
                  </button>
                </div>
              </nav>
              )}

              {/* Editor Sidebar / History Panel */}
              {cvViewMode !== 'preview' && (
              <aside className="w-[550px] flex flex-col glass-panel border-r border-slate-200 dark:border-slate-800 z-10">
                <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="size-8 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <span className="material-symbols-outlined text-xl">
                        {activeCvSection === 'profile' ? 'account_circle' : 
                         activeCvSection === 'experience' ? 'business' : 
                         activeCvSection === 'education' ? 'school' : 
                         activeCvSection === 'skills' ? 'construction' : 'folder'}
                      </span>
                    </div>
                    <h3 className="font-black text-[11px] uppercase tracking-[0.15em] text-slate-900 dark:text-white">
                      {activeCvSection.replace('_', ' ')}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded">
                      {activeCvSection === 'profile' ? '100%' : 
                       activeCvSection === 'experience' ? '75%' : 
                       activeCvSection === 'education' ? '90%' : 
                       activeCvSection === 'skills' ? '80%' : '60%'} COMPLETE
                    </span>
                    <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: activeCvSection === 'profile' ? '100%' : activeCvSection === 'experience' ? '75%' : '90%' }}
                         className="h-full bg-indigo-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  {cvViewMode === 'history' ? (
                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="size-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                          <span className="material-symbols-outlined text-xl">history</span>
                        </div>
                        <h3 className="font-black text-[11px] uppercase tracking-[0.15em] text-slate-900">Version History</h3>
                      </div>
                      {cvHistory.length === 0 ? (
                        <div className="text-center py-16">
                          <span className="material-symbols-outlined text-5xl text-slate-200 mb-4 block">history</span>
                          <p className="text-sm text-slate-400 font-medium">No saved versions yet.</p>
                          <p className="text-xs text-slate-400 mt-1">Click "Save Changes" to create your first version.</p>
                        </div>
                      ) : (
                        cvHistory.map((version, idx) => (
                          <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-indigo-300 transition-all group">
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm text-indigo-400">save</span>
                                <span className="text-sm font-bold text-slate-900">{version.label}</span>
                              </div>
                              <span className="text-[10px] text-slate-400 font-mono">
                                {new Date(version.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mb-3">{version.data.fullName} • {version.data.experience.length} positions • {version.data.skills.length} skills</p>
                            <button
                              onClick={() => restoreHistoryVersion(idx)}
                              className="w-full py-2 bg-indigo-50 text-indigo-600 text-[11px] font-bold rounded-xl hover:bg-indigo-100 transition-colors opacity-0 group-hover:opacity-100"
                            >
                              RESTORE THIS VERSION
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  ) : (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCvSection}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      className="p-6 space-y-8"
                    >
                      {activeCvSection === 'profile' && (
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-8">
                          {/* Profile Photo Upload */}
                          <div className="flex flex-col items-center gap-4 py-6 border-b border-slate-50 dark:border-slate-800/50 mb-4">
                            <div className="group relative">
                              <div className="size-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center transition-all group-hover:shadow-indigo-100 dark:group-hover:shadow-none">
                                {cvData.photo ? (
                                  <img src={cvData.photo} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                  <span className="material-symbols-outlined text-6xl text-slate-200">account_circle</span>
                                )}
                              </div>
                              <label className="absolute bottom-0 right-0 size-10 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-indigo-700 transition-all active:scale-90 border-4 border-white dark:border-slate-900 group-hover:scale-110">
                                <span className="material-symbols-outlined text-xl">photo_camera</span>
                                <input 
                                  type="file" 
                                  className="hidden" 
                                  accept="image/png, image/jpeg, image/webp"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = () => {
                                        setImageToCrop(reader.result as string);
                                        setZoom(1);
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                              </label>
                              {cvData.photo && (
                                <button 
                                  onClick={() => setCvData({ ...cvData, photo: null })}
                                  className="absolute top-0 right-0 size-8 bg-white dark:bg-slate-800 text-rose-500 rounded-full flex items-center justify-center shadow-md hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all border border-slate-100 dark:border-slate-700"
                                >
                                  <span className="material-symbols-outlined text-sm">delete</span>
                                </button>
                              )}
                            </div>
                            <div className="text-center">
                              <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">Profile Photo</h3>
                              <p className="text-[10px] text-slate-500 font-medium mt-1 uppercase tracking-tighter">PNG, JPG or WEBP • High Resolution</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-1">
                              <label className="text-indigo-600 dark:text-indigo-400">Full Name</label>
                              <input 
                                className="w-full h-10 px-3 rounded-xl border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium" 
                                type="text" 
                                value={cvData.fullName}
                                onChange={(e) => setCvData({...cvData, fullName: e.target.value})}
                              />
                            </div>
                            <div className="col-span-1">
                              <label className="text-indigo-600 dark:text-indigo-400">Target Role</label>
                              <input 
                                className="w-full h-10 px-3 rounded-xl border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium" 
                                type="text" 
                                value={cvData.jobTitle}
                                onChange={(e) => setCvData({...cvData, jobTitle: e.target.value})}
                              />
                            </div>
                            <div className="col-span-1">
                              <label className="text-indigo-600 dark:text-indigo-400">Email Address</label>
                              <input 
                                className="w-full h-10 px-3 rounded-xl border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium" 
                                type="email" 
                                value={cvData.email}
                                onChange={(e) => setCvData({...cvData, email: e.target.value})}
                              />
                            </div>
                            <div className="col-span-1">
                              <label className="text-indigo-600 dark:text-indigo-400">Phone</label>
                              <input 
                                className="w-full h-10 px-3 rounded-xl border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium" 
                                type="text" 
                                value={cvData.phone}
                                onChange={(e) => setCvData({...cvData, phone: e.target.value})}
                              />
                            </div>
                            <div className="col-span-2">
                              <label className="text-indigo-600 dark:text-indigo-400">Location</label>
                              <input 
                                className="w-full h-10 px-3 rounded-xl border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium" 
                                type="text" 
                                value={cvData.location}
                                onChange={(e) => setCvData({...cvData, location: e.target.value})}
                              />
                            </div>
                            <div className="col-span-2">
                              <label className="text-indigo-600 dark:text-indigo-400">Professional Summary</label>
                              <textarea 
                                className="w-full p-4 rounded-xl border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500/20 text-[13px] leading-relaxed font-sans" 
                                rows={6}
                                value={cvData.summary}
                                onChange={(e) => setCvData({...cvData, summary: e.target.value})}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {activeCvSection === 'experience' && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between px-2">
                            <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-widest">Work Experience</h4>
                            <button 
                              onClick={() => setCvData({...cvData, experience: [{ company: '', role: '', periodStart: '', periodEnd: '', bullets: [''] }, ...cvData.experience]})}
                              className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 px-3 py-1 rounded-lg transition-all"
                            >
                              <span className="material-symbols-outlined text-sm">add_circle</span> 
                              ADD POSITION
                            </button>
                          </div>
                          
                          <div className="space-y-4">
                            {cvData.experience.map((exp, idx) => (
                              <div key={idx} className="group bg-white p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all">
                                <div className="flex justify-between items-start mb-4">
                                  <div className="flex items-center gap-3">
                                    <div className="size-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors">
                                      <span className="material-symbols-outlined">business</span>
                                    </div>
                                    <div>
                                      <h5 className="text-sm font-bold text-slate-900 dark:text-white">{exp.company || 'New Company'}</h5>
                                      <p className="text-xs text-slate-500 font-medium">{exp.role || 'New Role'}</p>
                                    </div>
                                  </div>
                                  <button 
                                    onClick={() => {
                                      const newExp = [...cvData.experience];
                                      newExp.splice(idx, 1);
                                      setCvData({...cvData, experience: newExp});
                                    }}
                                    className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg"
                                  >
                                    <span className="material-symbols-outlined text-sm">delete</span>
                                  </button>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <input className="w-full h-9 px-3 rounded-lg bg-slate-50 text-xs" placeholder="Company" value={exp.company} onChange={(e) => { const x = [...cvData.experience]; x[idx].company = e.target.value; setCvData({...cvData, experience: x}); }} />
                                  <input className="w-full h-9 px-3 rounded-lg bg-slate-50 text-xs" placeholder="Role" value={exp.role} onChange={(e) => { const x = [...cvData.experience]; x[idx].role = e.target.value; setCvData({...cvData, experience: x}); }} />
                                  <input className="w-full h-9 px-3 rounded-lg bg-slate-50 text-xs" placeholder="Start Year" value={exp.periodStart} onChange={(e) => { const x = [...cvData.experience]; x[idx].periodStart = e.target.value; setCvData({...cvData, experience: x}); }} />
                                  <input className="w-full h-9 px-3 rounded-lg bg-slate-50 text-xs" placeholder="End Year" value={exp.periodEnd} onChange={(e) => { const x = [...cvData.experience]; x[idx].periodEnd = e.target.value; setCvData({...cvData, experience: x}); }} />
                                </div>
                                <div className="mt-4 space-y-2">
                                  <div className="flex items-center justify-between">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Key Accomplishments</label>
                                    <button 
                                      className="text-[9px] font-black text-indigo-600 flex items-center gap-1 hover:bg-indigo-50 px-2 py-0.5 rounded transition-all"
                                      onClick={() => {
                                        // Logic for AI Smart Enhance on this specific position
                                        handleAiSmartEnhance(undefined, idx);
                                      }}
                                    >
                                      <span className="material-symbols-outlined text-xs">auto_awesome</span>
                                      AI SUGGESTIONS
                                    </button>
                                  </div>
                                  {(exp.bullets || []).map((bullet, bIdx) => (
                                    <div key={bIdx} className="flex gap-2">
                                      <textarea 
                                        className="flex-1 p-2 bg-slate-50 border border-transparent focus:border-indigo-200 focus:bg-white rounded-lg text-xs transition-all" 
                                        rows={2} 
                                        value={bullet} 
                                        onChange={(e) => {
                                          const x = [...cvData.experience];
                                          x[idx].bullets![bIdx] = e.target.value;
                                          setCvData({...cvData, experience: x});
                                        }}
                                      />
                                      <div className="flex flex-col gap-1">
                                        <button 
                                          className="p-1 text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                          onClick={() => handleAiSmartEnhance(bIdx, idx)}
                                          title="AI Smart Enhance"
                                        >
                                          <span className="material-symbols-outlined text-sm">auto_awesome</span>
                                        </button>
                                        <button className="p-1 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all" onClick={() => { const x = [...cvData.experience]; x[idx].bullets = x[idx].bullets!.filter((_,i)=>i!==bIdx); setCvData({...cvData, experience: x}); }}><span className="material-symbols-outlined text-sm">close</span></button>
                                      </div>
                                    </div>
                                  ))}
                                  <button onClick={() => { const x = [...cvData.experience]; x[idx].bullets = [...(x[idx].bullets||[]), '']; setCvData({...cvData, experience: x}); }} className="w-full py-2 border border-dashed border-slate-200 rounded-lg text-[10px] font-black text-slate-400 hover:border-indigo-300 hover:text-indigo-600 transition-all">+ ADD ACHIEVEMENT</button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeCvSection === 'education' && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between px-2">
                            <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-widest">Education</h4>
                            <button 
                              onClick={() => setCvData({...cvData, education: [{ school: '', degree: '', year: '' }, ...cvData.education]})}
                              className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 px-3 py-1 rounded-lg transition-all"
                            >
                              <span className="material-symbols-outlined text-sm">add_circle</span> 
                              ADD EDUCATION
                            </button>
                          </div>
                          <div className="space-y-4">
                            {cvData.education.map((edu, idx) => (
                              <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                                <div className="flex justify-between mb-4">
                                  <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-slate-400">school</span>
                                    <div>
                                      <h5 className="text-sm font-bold">{edu.school || 'New School'}</h5>
                                      <p className="text-xs text-slate-500">{edu.degree}</p>
                                    </div>
                                  </div>
                                  <button onClick={() => { const x = [...cvData.education]; x.splice(idx,1); setCvData({...cvData, education: x}); }} className="text-rose-500"><span className="material-symbols-outlined text-sm">delete</span></button>
                                </div>
                                <div className="space-y-3">
                                  <input className="w-full h-9 px-3 rounded-lg bg-slate-50 text-xs" placeholder="School" value={edu.school} onChange={(e) => { const x = [...cvData.education]; x[idx].school = e.target.value; setCvData({...cvData, education: x}); }} />
                                  <input className="w-full h-9 px-3 rounded-lg bg-slate-50 text-xs" placeholder="Degree" value={edu.degree} onChange={(e) => { const x = [...cvData.education]; x[idx].degree = e.target.value; setCvData({...cvData, education: x}); }} />
                                  <input className="w-full h-9 px-3 rounded-lg bg-slate-50 text-xs" placeholder="Year" value={edu.year} onChange={(e) => { const x = [...cvData.education]; x[idx].year = e.target.value; setCvData({...cvData, education: x}); }} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeCvSection === 'skills' && (
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                          <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-widest mb-6">Technical Skills</h4>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {cvData.skills.map((skill, idx) => (
                              <span key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-xl text-[11px] font-bold border border-indigo-100">
                                {skill}
                                <button onClick={() => setCvData({...cvData, skills: cvData.skills.filter((_, i) => i !== idx)})} className="text-indigo-300 hover:text-rose-500">
                                  <span className="material-symbols-outlined text-xs">cancel</span>
                                </button>
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <input id="skill-input" className="flex-1 h-10 px-4 rounded-xl border-slate-200 text-sm" placeholder="Add a skill (e.g. React)..." onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                const val = (e.target as HTMLInputElement).value;
                                if (val) {
                                  setCvData({...cvData, skills: [...cvData.skills, val]});
                                  (e.target as HTMLInputElement).value = '';
                                }
                              }
                            }} />
                            <button 
                              onClick={() => {
                                const input = document.getElementById('skill-input') as HTMLInputElement;
                                if (input.value) {
                                  setCvData({...cvData, skills: [...cvData.skills, input.value]});
                                  input.value = '';
                                }
                              }}
                              className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                            >
                              ADD
                            </button>
                          </div>
                        </div>
                      )}

                      {activeCvSection === 'projects' && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between px-2">
                            <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-widest">Featured Projects</h4>
                            <button 
                              onClick={() => setCvData({...cvData, projects: [{ name: '', description: '' }, ...cvData.projects]})}
                              className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 px-3 py-1 rounded-lg transition-all"
                            >
                              <span className="material-symbols-outlined text-sm">add_circle</span> 
                              ADD PROJECT
                            </button>
                          </div>
                          <div className="space-y-4">
                            {cvData.projects.map((proj, idx) => (
                              <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                                <div className="flex justify-between mb-4">
                                  <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-slate-400">folder</span>
                                    <h5 className="text-sm font-bold">{proj.name || 'New Project'}</h5>
                                  </div>
                                  <button onClick={() => { const x = [...cvData.projects]; x.splice(idx,1); setCvData({...cvData, projects: x}); }} className="text-rose-500"><span className="material-symbols-outlined text-sm">delete</span></button>
                                </div>
                                <input className="w-full h-9 px-3 rounded-lg bg-slate-50 text-xs mb-3" placeholder="Project Name" value={proj.name} onChange={(e) => { const x = [...cvData.projects]; x[idx].name = e.target.value; setCvData({...cvData, projects: x}); }} />
                                <textarea className="w-full p-3 bg-slate-50 rounded-lg text-xs" placeholder="Description" rows={3} value={proj.description} onChange={(e) => { const x = [...cvData.projects]; x[idx].description = e.target.value; setCvData({...cvData, projects: x}); }} />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="p-4 bg-white border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <button 
                    onClick={() => handleAiSmartEnhance()}
                    disabled={isEnhancing}
                    className="flex items-center gap-2 px-4 py-2 text-[11px] font-black text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all disabled:opacity-50"
                  >
                    {isEnhancing ? (
                      <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <span className="material-symbols-outlined text-lg">auto_awesome</span>
                    )}
                    {isEnhancing ? 'ENHANCING...' : 'AI SMART ENHANCE'}
                  </button>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        if (confirm('Are you sure you want to discard unsaved changes?')) {
                          const saved = localStorage.getItem('careerswipe_cv_draft');
                          if (saved) {
                            setCvData(JSON.parse(saved));
                            showToast('Changes discarded', 'info');
                          } else {
                            showToast('No saved draft to restore', 'error');
                          }
                        }
                      }}
                      className="px-5 py-2 text-slate-500 dark:text-slate-400 text-[11px] font-bold hover:bg-slate-50 rounded-xl transition-all"
                    >
                      DISCARD
                    </button>
                    <button 
                      onClick={saveCvDraft}
                      disabled={isSaving}
                      className="px-6 py-2 bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50 text-[11px] font-bold rounded-xl shadow-sm transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center min-w-[120px]"
                    >
                      {isSaving ? (
                        <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        'SAVE CHANGES'
                      )}
                    </button>
                  </div>
                </div>
              </aside>
              )}

              {/* Preview Section: Immersive & Eye-Catching */}
              <section id="cv-document-wrapper" className="flex-1 bg-slate-50 subtle-grid p-10 overflow-y-auto flex flex-col items-center custom-scrollbar relative min-h-0">
                {/* Background Atmosphere */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/5 blur-[120px] rounded-full"></div>
                  <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/5 blur-[100px] rounded-full"></div>
                </div>

                <div className="mb-8 bg-white/80 backdrop-blur-xl border border-slate-200 px-6 py-2.5 rounded-2xl shadow-sm flex items-center gap-8 z-10 sticky top-0">
                  <div className="flex items-center gap-4 border-r border-slate-200 pr-8">
                    <button onClick={handleZoomOut} className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"><span className="material-symbols-outlined text-xl">zoom_out</span></button>
                    <span className="text-[12px] font-mono font-black text-slate-900 w-12 text-center tracking-tighter">{zoomLevel}%</span>
                    <button onClick={handleZoomIn} className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"><span className="material-symbols-outlined text-xl">zoom_in</span></button>
                  </div>
                  <div className="flex items-center gap-3 border-r border-slate-200 pr-8">
                    <button onClick={() => setPageViewMode('single')} className={`p-2 rounded-xl transition-all ${pageViewMode === 'single' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'}`}><span className="material-symbols-outlined text-xl block">description</span></button>
                    <button onClick={() => setPageViewMode('grid')} className={`p-2 rounded-xl transition-all ${pageViewMode === 'grid' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'}`}><span className="material-symbols-outlined text-xl block">grid_view</span></button>
                  </div>
                  <div>
                    <button 
                      onClick={() => setCvBuilderStep('select-template')}
                      className="flex items-center gap-2 px-4 py-1.5 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl text-[11px] font-black shadow-lg shadow-indigo-200 transition-all active:scale-95"
                    >
                      CHANGE TEMPLATE
                      <span className="material-symbols-outlined text-sm">palette</span>
                    </button>
                  </div>
                </div>

                {/* CV Document Wrapper for Scroll Functionality */}
                <div 
                  className="mb-24 flex justify-center origin-top transition-all duration-300 pointer-events-none"
                  style={{ 
                    width: pageViewMode === 'grid' ? 500 * (zoomLevel / 100) : 850 * (zoomLevel / 100),
                    height: (pageViewMode === 'grid' ? 707 : 1201) * (zoomLevel / 100) + 100 // Extra bottom space
                  }}
                >
                  <motion.div 
                    id="cv-document"
                    layoutId="cv-document"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: zoomLevel / 100 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={`bg-white text-slate-900 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] rounded-sm flex flex-col relative overflow-hidden origin-top-left flex-shrink-0 pointer-events-auto ${pageViewMode === 'grid' ? 'w-[500px] h-[707px]' : 'w-[850px] h-[1201px]'}`}
                  >
                    <CVTemplates templateId={selectedTemplate} data={cvData} />
                  </motion.div>
                </div>

                {/* Floating Command Bar */}
                <div className="fixed bottom-10 flex items-center gap-6 px-6 py-3.5 bg-white/90 backdrop-blur-2xl text-slate-900 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] text-[11px] font-black tracking-[0.1em] z-50 border border-slate-200">
                  <span onClick={saveCvDraft} className="flex items-center gap-3 hover:text-indigo-600 cursor-pointer transition-colors"><kbd className="px-2 py-1 bg-slate-100 border border-slate-200 rounded-lg text-[10px]">⌘ S</kbd> SAVE DRAFT</span>
                  <span className="w-px h-5 bg-slate-200"></span>
                  <span onClick={handlePrint} className="flex items-center gap-3 hover:text-indigo-600 cursor-pointer transition-colors"><kbd className="px-2 py-1 bg-slate-100 border border-slate-200 rounded-lg text-[10px]">⌘ P</kbd> PRINT CV</span>
                  <span className="w-px h-5 bg-slate-200"></span>
                  <span onClick={() => cycleSection({} as any)} className="flex items-center gap-3 hover:text-indigo-600 cursor-pointer transition-colors"><kbd className="px-2 py-1 bg-slate-100 border border-slate-200 rounded-lg text-[10px]">TAB</kbd> NAVIGATION</span>
                </div>
              </section>
            </main>
          </motion.div>
        )}
      </main>
      )}

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-xl text-sm font-bold border ${
              toastType === 'success'
                ? 'bg-emerald-50/90 text-emerald-700 border-emerald-200'
                : toastType === 'error'
                ? 'bg-rose-50/90 text-rose-700 border-rose-200'
                : 'bg-indigo-50/90 text-indigo-700 border-indigo-200'
            }`}
          >
            <span className="material-symbols-outlined text-lg">
              {toastType === 'success' ? 'check_circle' : toastType === 'error' ? 'error' : 'info'}
            </span>
            {toastMessage}
            <button
              onClick={() => setToastMessage(null)}
              className="ml-2 opacity-50 hover:opacity-100 transition-opacity"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Photo Editor Modal */}
      <AnimatePresence>
        {imageToCrop && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-display font-black text-slate-900 dark:text-white">Edit Photo</h3>
                  <p className="text-xs text-slate-500 font-medium">Crop and position your profile picture</p>
                </div>
                <button 
                  onClick={() => setImageToCrop(null)}
                  className="size-10 flex items-center justify-center bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-rose-500 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="relative h-[400px] bg-slate-100 dark:bg-slate-950">
                <Cropper
                  image={imageToCrop}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
                  onZoomChange={setZoom}
                  cropShape="round"
                  showGrid={false}
                />
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-black text-slate-400 uppercase tracking-widest">
                    <span>Zoom</span>
                    <span>{Math.round(zoom * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => setImageToCrop(null)}
                    className="flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={async () => {
                      setIsCropping(true);
                      try {
                        const croppedImage = await getCroppedImg(imageToCrop, croppedAreaPixels);
                        if (croppedImage) {
                          setCvData({ ...cvData, photo: croppedImage });
                          setImageToCrop(null);
                          setToastMessage('Photo updated successfully!');
                          setToastType('success');
                        }
                      } catch (e) {
                        console.error(e);
                        setToastMessage('Failed to crop image');
                        setToastType('error');
                      }
                      setIsCropping(false);
                    }}
                    disabled={isCropping}
                    className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 dark:shadow-none transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isCropping ? (
                      <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <Check size={18} />
                    )}
                    Save Photo
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
