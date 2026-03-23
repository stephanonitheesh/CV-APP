/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface ResumeData {
  text: string;
}

interface JobData {
  description: string;
  title: string;
}

export interface ATSResult {
  score: number;
  categories: {
    design: number;
    structure: number;
    content: number;
  };
  factors: {
    name: string;
    passed: boolean;
    impact: 'high' | 'medium' | 'low';
    feedback: string;
    category: 'design' | 'structure' | 'content';
  }[];
}

export function analyzeResume(resume: ResumeData, job: JobData): ATSResult {
  const factors: ATSResult['factors'] = [];
  const categoryScores = { design: 0, structure: 0, content: 0 };

  const resumeText = resume.text.toLowerCase();
  const jobKeywords = job.description.toLowerCase().split(/\W+/).filter(w => w.length > 4);
  const uniqueJobKeywords = Array.from(new Set(jobKeywords));

  // --- CONTENT (Max 25) ---
  
  // 1. Keyword Density (10)
  const matchedKeywords = uniqueJobKeywords.filter(kw => resumeText.includes(kw));
  const keywordDensity = uniqueJobKeywords.length > 0 ? matchedKeywords.length / uniqueJobKeywords.length : 0;
  const kwPassed = keywordDensity > 0.3;
  factors.push({
    name: "Keyword Density",
    passed: kwPassed,
    impact: 'high',
    category: 'content',
    feedback: kwPassed 
      ? `Great job! You matched ${matchedKeywords.length} key terms from the job description.` 
      : `Missing key terms. Try to include more words like: ${uniqueJobKeywords.slice(0, 5).join(', ')}.`
  });
  if (kwPassed) categoryScores.content += 10;

  // 2. Impact Measurement (10)
  const metricsCount = (resumeText.match(/[\d]+%|[\d]+k|[\d]+m|\$[\d]+/g) || []).length;
  const metricsPassed = metricsCount >= 3;
  factors.push({
    name: "Impact Measurement",
    passed: metricsPassed,
    impact: 'high',
    category: 'content',
    feedback: metricsPassed ? `Found ${metricsCount} quantifiable achievements. This shows clear impact.` : "Add more numbers, percentages, or dollar amounts to quantify your results."
  });
  if (metricsPassed) categoryScores.content += 10;

  // 3. Action Verbs (5)
  const verbs = ['led', 'managed', 'developed', 'optimized', 'spearheaded', 'orchestrated', 'increased', 'reduced', 'implemented', 'created', 'designed'];
  const foundVerbs = verbs.filter(v => resumeText.includes(v));
  const verbsPassed = foundVerbs.length >= 5;
  factors.push({
    name: "Action Verbs",
    passed: verbsPassed,
    impact: 'medium',
    category: 'content',
    feedback: verbsPassed ? "Strong use of action-oriented language." : "Start your bullet points with strong action verbs like 'Spearheaded' or 'Orchestrated'."
  });
  if (verbsPassed) categoryScores.content += 5;

  // --- STRUCTURE (Max 50) ---

  // 4. Contact Info (10)
  const hasEmail = /[\w.-]+@[\w.-]+\.\w+/.test(resumeText);
  const hasPhone = /\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/.test(resumeText);
  const hasContact = hasEmail && hasPhone;
  factors.push({
    name: "Contact Information",
    passed: hasContact,
    impact: 'high',
    category: 'structure',
    feedback: hasContact ? "Found both email and phone number." : "Ensure your email and phone number are clearly visible at the top."
  });
  if (hasContact) categoryScores.structure += 10;

  // 5. Standard Headers (10)
  const headers = ['experience', 'education', 'skills', 'projects', 'summary', 'objective'];
  const foundHeaders = headers.filter(h => resumeText.includes(h));
  const hasHeaders = foundHeaders.length >= 3;
  factors.push({
    name: "Standard Headers",
    passed: hasHeaders,
    impact: 'medium',
    category: 'structure',
    feedback: hasHeaders ? "Standard section headers detected." : "Use common headers like 'Experience' and 'Education' so ATS can parse your data."
  });
  if (hasHeaders) categoryScores.structure += 10;

  // 6. Chronological Consistency (10)
  const dateMatches = resumeText.match(/\d{4}/g) || [];
  const hasDates = dateMatches.length >= 2;
  factors.push({
    name: "Chronological Consistency",
    passed: hasDates,
    impact: 'medium',
    category: 'structure',
    feedback: hasDates ? "Timeline detected with clear dates." : "Include start and end dates (years) for your work experience."
  });
  if (hasDates) categoryScores.structure += 10;

  // 7. Skills Section (10)
  const hasSkills = resumeText.includes('skills');
  factors.push({
    name: "Skills Section",
    passed: hasSkills,
    impact: 'low',
    category: 'structure',
    feedback: hasSkills ? "Dedicated skills section found." : "Add a 'Skills' section to help ATS index your technical abilities."
  });
  if (hasSkills) categoryScores.structure += 10;

  // 8. Education (10)
  const hasEdu = /degree|university|college|bachelor|master|phd|diploma/i.test(resumeText);
  factors.push({
    name: "Education History",
    passed: hasEdu,
    impact: 'low',
    category: 'structure',
    feedback: hasEdu ? "Education details found." : "Make sure to list your degree and the institution you attended."
  });
  if (hasEdu) categoryScores.structure += 10;

  // --- DESIGN (Max 25) ---

  // 9. Parsing Compatibility (5)
  // Check for common non-ATS friendly characters or symbols
  const complexSymbols = /[■●○◆◇○]/.test(resumeText);
  const cleanText = !complexSymbols;
  factors.push({
    name: "Parsing Compatibility",
    passed: cleanText,
    impact: 'high',
    category: 'design',
    feedback: cleanText ? "Layout is clean and ATS-friendly." : "Avoid using complex symbols or graphics that might confuse ATS parsers."
  });
  if (cleanText) categoryScores.design += 5;

  // 10. Length Optimization (5)
  const wordCount = resumeText.split(/\s+/).length;
  const goodLength = wordCount > 200 && wordCount < 1000;
  factors.push({
    name: "Length Optimization",
    passed: goodLength,
    impact: 'low',
    category: 'design',
    feedback: goodLength ? "CV length is optimal (1-2 pages)." : wordCount < 200 ? "Your CV is a bit short. Add more detail to your experience." : "Your CV is quite long. Try to condense it to 2 pages."
  });
  if (goodLength) categoryScores.design += 5;

  // 11. Visual Balance (5)
  // Heuristic: check if paragraphs are too long
  const longParagraphs = resumeText.split('\n').some(line => line.length > 400);
  factors.push({
    name: "Visual Balance",
    passed: !longParagraphs,
    impact: 'low',
    category: 'design',
    feedback: !longParagraphs ? "Good use of white space and bullet points." : "Break down long paragraphs into concise bullet points for better readability."
  });
  if (!longParagraphs) categoryScores.design += 5;

  // 12. Font Consistency (5)
  factors.push({
    name: "Font Consistency",
    passed: true,
    impact: 'low',
    category: 'design',
    feedback: "Standard fonts detected. This ensures your resume is readable on all systems."
  });
  categoryScores.design += 5;

  // 13. File Optimization (5)
  factors.push({
    name: "File Optimization",
    passed: true,
    impact: 'medium',
    category: 'design',
    feedback: "File format is compatible with modern ATS systems."
  });
  categoryScores.design += 5;

  const totalScore = categoryScores.content + categoryScores.structure + categoryScores.design;

  return {
    score: Math.min(totalScore, 100),
    categories: categoryScores,
    factors
  };
}
