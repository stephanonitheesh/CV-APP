import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function generateCoverLetter(resumeText: string, jobDescriptionText: string, tone: string): Promise<string> {
  const model = "gemini-1.5-flash";
  
  const GEN_PROMPT = `
You are a Senior MRT Recruitment Manager. 
Create a cover letter using the CV and JD provided.
Focus on: Safety (ISO standards), Efficiency (KPIs), and Urban Mission.
Use a professional, vigilant tone. No fluff.
`;

  const CRITIC_PROMPT = `
Act as an MRT Auditor. Evaluate the following cover letter against the JD.
Return ONLY a valid JSON object matching this schema:
{
  "safety_score": <int 0-10 on safety protocol mentions>,
  "metric_score": <int 0-10 on quantifiable achievements>,
  "jargon_match": <boolean true if JD-specific technical terms are used>,
  "feedback": "<string specific instructions to improve the letter>",
  "passed": <boolean whether the letter meets MRT standards (safety+metric scores both > 7 and jargon_match true)>
}
`;

  const REFINEMENT_PROMPT = `
Refine the cover letter based on this auditor feedback.
Ensure the final output is professional and safety-centric.
Original Letter and Feedback are provided.
`;

  try {
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== '') {
      let currentLetter = '';
      
      // Step 1: Initial Generation
      const genResponse = await ai.models.generateContent({
        model,
        contents: `CANDIDATE CV:\n"""\n${resumeText}\n"""\n\nTARGET JD:\n"""\n${jobDescriptionText}\n"""`,
        config: { systemInstruction: GEN_PROMPT, temperature: 0.2 },
      });
      if (genResponse.text) {
        currentLetter = genResponse.text;
      }

      // Step 2: Recursive Loop
      const maxRetries = 2;
      for (let i = 0; i < maxRetries; i++) {
        const criticResponse = await ai.models.generateContent({
          model,
          contents: `Letter: """\n${currentLetter}\n"""\n\nJD: """\n${jobDescriptionText}\n"""`,
          config: { 
            systemInstruction: CRITIC_PROMPT, 
            temperature: 0.1,
            responseMimeType: "application/json"
          },
        });
        
        let scorecard: any = null;
        try {
          scorecard = JSON.parse(criticResponse.text || "{}");
        } catch (e) {
          console.error("Failed to parse scorecard JSON", e);
          break; 
        }
        
        console.log(`Attempt ${i+1} - Safety: ${scorecard?.safety_score}/10, Metrics: ${scorecard?.metric_score}/10, Passed: ${scorecard?.passed}`);
        
        if (scorecard?.passed) {
          return currentLetter;
        }
        
        // Refine if failed
        const refineResponse = await ai.models.generateContent({
          model,
          contents: `Original Letter: """\n${currentLetter}\n"""\n\nAuditor Feedback: """\n${scorecard?.feedback}\n"""`,
          config: { systemInstruction: REFINEMENT_PROMPT, temperature: 0.2 },
        });
        
        if (refineResponse.text) {
          currentLetter = refineResponse.text;
        }
      }
      
      return currentLetter;
    }
  } catch (error) {
    console.warn("API Error, falling back to mock:", error);
  }

  // Fallback Mock Logic — deeply parses CV and JD to build personalized letter
  return new Promise((resolve) => {
    setTimeout(() => {
      const cvLines = resumeText.split('\n').map((l: string) => l.trim()).filter((l: string) => l.length > 0);
      
      console.log('[CoverLetter Mock] CV text length:', resumeText.length, '| CV lines count:', cvLines.length);
      console.log('[CoverLetter Mock] First 5 CV lines:', cvLines.slice(0, 5));
      
      // 1. Extract candidate name (first non-header line with 2-4 words)
      let nameMatch = 'Applicant';
      for (let i = 0; i < Math.min(5, cvLines.length); i++) {
        const words = cvLines[i].split(' ');
        if (words.length >= 2 && words.length <= 4 && !cvLines[i].toLowerCase().includes('resume') && !cvLines[i].toLowerCase().includes('cv') && !cvLines[i].toLowerCase().includes('curriculum')) {
          nameMatch = cvLines[i];
          break;
        }
      }

      const cvLower = resumeText.toLowerCase();

      // 2. Extract job titles / roles from CV
      const titleKeywords = ['manager', 'engineer', 'developer', 'analyst', 'coordinator', 'specialist', 'director', 'officer', 'lead', 'supervisor', 'assistant', 'executive', 'consultant', 'administrator', 'head', 'associate', 'intern', 'trainee', 'senior', 'junior'];
      const cvTitles: string[] = [];
      cvLines.forEach(line => {
        const lower = line.toLowerCase();
        if (titleKeywords.some(kw => lower.includes(kw)) && line.length < 80 && line.length > 5) {
          cvTitles.push(line.replace(/^[-•*]\s*/, ''));
        }
      });

      // 3. Extract quantified achievements (lines with numbers/percentages)
      const achievements: string[] = [];
      cvLines.forEach(line => {
        if (/\d+/.test(line) && line.length > 20 && line.length < 250) {
          const lower = line.toLowerCase();
          if (lower.includes('%') || lower.includes('increase') || lower.includes('reduce') || lower.includes('manage') || lower.includes('led') || lower.includes('team') || lower.includes('budget') || lower.includes('revenue') || lower.includes('project') || lower.includes('client') || lower.includes('staff') || lower.includes('employee') || lower.includes('year') || lower.includes('train') || lower.includes('implement') || lower.includes('improv') || lower.includes('develop') || lower.includes('process') || lower.includes('deliver') || /\d+\s*(people|members|employees|staff|clients|projects|years)/.test(lower)) {
            achievements.push(line.replace(/^[-•*]\s*/, ''));
          }
        }
      });

      // 4. Extract skills mentioned in CV
      const skillPatterns = ['communication', 'leadership', 'management', 'recruitment', 'training', 'development', 'planning', 'budgeting', 'analysis', 'reporting', 'compliance', 'safety', 'performance', 'strategic', 'operations', 'customer service', 'project management', 'data analysis', 'microsoft', 'excel', 'powerpoint', 'sap', 'oracle', 'python', 'javascript', 'react', 'node', 'sql', 'java', 'html', 'css', 'agile', 'scrum', 'negotiation', 'policy', 'payroll', 'benefits', 'onboarding', 'talent acquisition', 'employee relations', 'conflict resolution', 'organizational', 'team building', 'stakeholder', 'hr', 'human resources', 'hiring', 'staffing', 'workforce', 'engagement', 'retention'];
      const cvSkills: string[] = [];
      skillPatterns.forEach(skill => {
        if (cvLower.includes(skill)) cvSkills.push(skill);
      });

      // 5. Extract experience descriptors (longer content lines)
      const experienceLines: string[] = [];
      cvLines.forEach(line => {
        if (line.length > 30 && line.length < 250 && !line.match(/^[A-Z\s]{4,}$/) && !line.includes('@') && !line.includes('http') && !line.match(/^\d{4}/) && !line.match(/^[A-Z][a-z]+\s\d{4}/)) {
          experienceLines.push(line.replace(/^[-•*]\s*/, ''));
        }
      });

      // 6. Extract key terms from Job Description
      const jdWords = jobDescriptionText.toLowerCase().split(/[\s,.;:()]+/).filter((w: string) => w.length > 4);
      const stopWords = ['about', 'their', 'there', 'which', 'would', 'could', 'should', 'these', 'those', 'other', 'company', 'years', 'looking', 'seeking', 'required', 'including', 'using', 'please', 'apply', 'position', 'based', 'ideal', 'offer', 'responsibilities', 'qualifications', 'candidate', 'ability'];
      const jdWordCounts: Record<string, number> = {};
      jdWords.forEach((w: string) => { if (!stopWords.includes(w)) jdWordCounts[w] = (jdWordCounts[w] || 0) + 1; });
      const jdKeywords = Object.entries(jdWordCounts).sort((a, b) => b[1] - a[1]).map(e => e[0]).slice(0, 15);

      // 7. Cross-reference: find CV terms that match JD keywords
      const matchedJDTerms = jdKeywords.filter(kw => cvLower.includes(kw));

      // 8. Build the cover letter dynamically from REAL CV data

      // Hook paragraph — reference the candidate's most recent role
      let hookParagraph = '';
      if (cvTitles.length > 0) {
        hookParagraph = `With a proven track record as ${cvTitles[0]}, I am writing to express my strong interest in the position outlined in your job posting. My professional background directly aligns with the core requirements you have described.`;
      } else {
        hookParagraph = `I am writing to express my strong interest in the position outlined in your job posting. My professional background directly aligns with the core requirements you have described.`;
      }

      // Technical value paragraph — use ACTUAL achievements from the CV
      let techParagraph = '';
      if (achievements.length > 0) {
        const topAchievements = achievements.slice(0, 3);
        const achievementText = topAchievements.map(a => `  - ${a}`).join('\n');
        techParagraph = `Throughout my career, I have delivered measurable results that speak directly to the competencies your role demands. Key highlights from my experience include:\n\n${achievementText}`;
      } else if (experienceLines.length > 0) {
        const topExp = experienceLines.slice(0, 3);
        const expText = topExp.map(e => `  - ${e}`).join('\n');
        techParagraph = `My professional experience has equipped me with the exact capabilities this role requires. Relevant highlights include:\n\n${expText}`;
      } else {
        techParagraph = `My professional experience has equipped me with a diverse skill set that directly addresses the requirements outlined in your job description.`;
      }

      // Skills alignment paragraph — cross-reference CV skills with JD
      let skillsParagraph = '';
      if (matchedJDTerms.length > 0) {
        const formattedSkills = matchedJDTerms.slice(0, 5).map(s => s.charAt(0).toUpperCase() + s.slice(1));
        const skillsList = formattedSkills.length > 1
          ? formattedSkills.slice(0, -1).join(', ') + ', and ' + formattedSkills[formattedSkills.length - 1]
          : formattedSkills[0];
        skillsParagraph = `What makes me particularly well-suited for this opportunity is my hands-on expertise in ${skillsList} — areas that are central to your job description and where I have consistently delivered strong outcomes.`;
      } else if (cvSkills.length > 0) {
        const formattedSkills = cvSkills.slice(0, 5).map(s => s.charAt(0).toUpperCase() + s.slice(1));
        const skillsList = formattedSkills.length > 1
          ? formattedSkills.slice(0, -1).join(', ') + ', and ' + formattedSkills[formattedSkills.length - 1]
          : formattedSkills[0];
        skillsParagraph = `My core competencies in ${skillsList} have been refined through years of professional application and would translate directly into value for your organization.`;
      } else {
        skillsParagraph = `My adaptable skill set and commitment to continuous professional development position me to contribute meaningfully from day one.`;
      }

      // Call to action
      const ctaParagraph = `I welcome the opportunity to discuss in detail how my qualifications and experience can contribute to your team's success. Thank you for your time and consideration.`;

      const mockLetter = `Dear Hiring Manager,

${hookParagraph}

${techParagraph}

${skillsParagraph}

${ctaParagraph}

Sincerely,
${nameMatch}`;
      resolve(mockLetter);
    }, 2500);
  });
}


export async function humanizeText(text: string): Promise<string> {
  const model = "gemini-3-flash-preview";
  const systemInstruction = `
    You are an expert career coach and editor. 
    Your task is to rewrite robotic, LLM-generated CV bullet points into natural, human-sounding content.
    
    RULES:
    1. Remove common AI buzzwords: "delved", "spearheaded", "invaluable", "relentless", "seamlessly", "tapestry", "leverage", "comprehensive".
    2. Replace excessive em-dashes (—) with standard spacing and hyphens.
    3. Focus on active verbs and quantified impact.
    4. Maintain a professional yet authentic tone.
    5. Keep the length similar to the original.
  `;

  try {
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== '') {
      const response = await ai.models.generateContent({
        model,
        contents: `Humanize this CV bullet point: "${text}"`,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });
      if (response.text) return response.text;
    }
  } catch (error) {
    console.warn("API Error, falling back to mock:", error);
  }

  // Sophisticated Mock Logic
  return new Promise((resolve) => {
    setTimeout(() => {
      let mockText = text;
      mockText = mockText.replace(/Spearheaded/g, 'Led');
      mockText = mockText.replace(/Optimized/g, 'Improved');
      mockText = mockText.replace(/Collaborated with cross-functional teams to deliver/g, 'Partnered with multiple teams to launch');
      mockText = mockText.replace(/Implemented/g, 'Built');
      resolve(mockText);
    }, 1500);
  });
}

export async function tailorResume(resumeText: string, jobDescription: string): Promise<string> {
  const model = "gemini-3.1-pro-preview";
  const systemInstruction = `You are an elite career strategist. Your task is to rewrite a candidate's resume to perfectly align with a specific job description.

RULES:
1. QUANTIFIED ACHIEVEMENTS: Emphasize accomplishments that use numbers (e.g., "Increased revenue by 20%").
2. KEYWORD OPTIMIZATION: Seamlessly integrate top keywords from the job description.
3. STRUCTURE: Maintain the original structure but rewrite the content for maximum impact.
4. NO HALLUCINATIONS: Do not add skills or experience not present in the original resume.
5. TONE: Professional, high-energy, and achievement-oriented.
6. OUTPUT: Return the full rewritten resume in plain text format.`;

  try {
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== '') {
      const response = await ai.models.generateContent({
        model,
        contents: `ORIGINAL RESUME:\n${resumeText}\n\nTARGET JOB DESCRIPTION:\n${jobDescription}`,
        config: { systemInstruction, temperature: 0.6 },
      });
      if (response.text) return response.text;
    }
  } catch (error) {
    console.warn("API Error, falling back to mock:", error);
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(resumeText + "\n\n[Note: This is a mock tailored version. In production, this would be rewritten by AI to match the job description.]");
    }, 2000);
  });
}

export async function generateSummary(resumeText: string, jobDescription: string): Promise<string> {
  const model = "gemini-3.1-pro-preview";
  const systemInstruction = `Generate a punchy, 3-sentence professional summary for a resume based on the candidate's experience and a specific job description. Focus on unique value propositions.`;

  try {
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== '') {
      const response = await ai.models.generateContent({
        model,
        contents: `RESUME:\n${resumeText}\n\nJOB DESCRIPTION:\n${jobDescription}`,
        config: { systemInstruction, temperature: 0.7 },
      });
      if (response.text) return response.text;
    }
  } catch (error) {
    console.warn("API Error, falling back to mock:", error);
  }

  return "Experienced professional with a strong track record of success in high-impact roles. Proven ability to lead teams and deliver complex projects on time. Expert in driving innovation and operational excellence.";
}

export async function extractSkills(resumeText: string): Promise<string[]> {
  const model = "gemini-3.1-pro-preview";
  const systemInstruction = `Extract a list of top 10 technical and soft skills from the following resume. Return ONLY a comma-separated list.`;

  try {
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== '') {
      const response = await ai.models.generateContent({
        model,
        contents: resumeText,
        config: { systemInstruction, temperature: 0.2 },
      });
      if (response.text) return response.text.split(',').map(s => s.trim());
    }
  } catch (error) {
    console.warn("API Error, falling back to mock:", error);
  }

  return ['Project Management', 'Team Leadership', 'Strategic Planning', 'Data Analysis', 'Conflict Resolution'];
}

export async function highlightStrengths(resumeText: string): Promise<string[]> {
  const model = "gemini-3.1-pro-preview";
  const systemInstruction = `Identify the top 3 core strengths/competitive advantages of this candidate based on their resume. Return each strength as a short, punchy sentence. Return as a JSON array of strings.`;

  try {
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== '') {
      const response = await ai.models.generateContent({
        model,
        contents: resumeText,
        config: { systemInstruction, temperature: 0.5 },
      });
      if (response.text) {
        try {
          return JSON.parse(response.text);
        } catch (e) {
          return response.text.split('\n').filter(l => l.trim()).slice(0, 3);
        }
      }
    }
  } catch (error) {
    console.warn("API Error, falling back to mock:", error);
  }

  return [
    "Proven track record of scaling high-growth engineering teams.",
    "Expertise in cloud-native architecture and distributed systems.",
    "Deep commitment to operational excellence and automated workflows."
  ];
}
