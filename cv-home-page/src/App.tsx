import React from 'react';

const TemplatePreview = ({ type }: { type: string }) => {
  const baseClasses = "w-full h-[400px] bg-white rounded-lg mb-4 overflow-hidden flex grayscale group-hover:grayscale-0 transition-all duration-500 border border-slate-200 shadow-sm relative text-left";
  
  switch (type) {
    case 'executive':
      return (
        <div className={`${baseClasses} flex-col`}>
          <div className="bg-slate-900 text-white p-4 flex items-center gap-4">
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150&h=150" alt="Executive" className="w-16 h-16 rounded-full border-2 border-slate-500 object-cover" referrerPolicy="no-referrer" />
            <div>
              <h3 className="text-lg font-bold font-serif">James Sterling</h3>
              <p className="text-xs text-slate-300 tracking-widest uppercase">Chief Financial Officer</p>
            </div>
          </div>
          <div className="p-4 flex gap-4 text-[8px] text-slate-800 flex-1">
            <div className="w-2/3 space-y-3">
              <div>
                <h4 className="font-bold text-[9px] border-b border-slate-300 pb-1 mb-1 uppercase text-slate-900">Executive Summary</h4>
                <p className="leading-relaxed">Visionary financial executive with 15+ years of experience driving growth, optimizing capital structures, and leading M&A activities for Fortune 500 companies. Proven track record of increasing shareholder value by 40%.</p>
              </div>
              <div>
                <h4 className="font-bold text-[9px] border-b border-slate-300 pb-1 mb-1 uppercase text-slate-900">Professional Experience</h4>
                <div className="mb-2">
                  <p className="font-bold text-slate-900">CFO | Global Tech Industries</p>
                  <p className="text-slate-500 mb-1">2018 - Present</p>
                  <ul className="list-disc pl-3 space-y-0.5">
                    <li>Spearheaded a $2B merger, resulting in a 25% market share increase.</li>
                    <li>Reduced operational costs by $150M through strategic restructuring.</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-1/3 space-y-3 bg-slate-50 p-2 rounded">
              <div>
                <h4 className="font-bold text-[9px] border-b border-slate-300 pb-1 mb-1 uppercase text-slate-900">Core Competencies</h4>
                <ul className="space-y-1">
                  <li>Financial Strategy</li>
                  <li>Mergers & Acquisitions</li>
                  <li>Risk Management</li>
                  <li>Investor Relations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    case 'creative':
      return (
        <div className={baseClasses}>
          <div className="w-1/3 bg-rose-50 p-4 flex flex-col items-center border-r border-rose-100 text-center">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150" alt="Creative" className="w-20 h-20 rounded-full mb-3 object-cover shadow-md" referrerPolicy="no-referrer" />
            <h3 className="text-sm font-bold text-rose-900 mb-1">Mia Rossi</h3>
            <p className="text-[8px] text-rose-600 uppercase tracking-widest mb-4">Art Director</p>
            <div className="w-full text-left space-y-2 text-[7px] text-rose-800">
              <p><strong>E:</strong> mia@studio.design</p>
              <p><strong>P:</strong> +1 234 567 890</p>
              <p><strong>W:</strong> miarossi.com</p>
            </div>
          </div>
          <div className="w-2/3 p-5 space-y-4 text-[8px] text-slate-700">
            <div>
              <h4 className="font-bold text-[10px] text-rose-500 mb-1 uppercase tracking-wider">About Me</h4>
              <p className="leading-relaxed">Award-winning Art Director passionate about visual storytelling and brand identity. I blend strategic thinking with bold aesthetics to create memorable digital experiences.</p>
            </div>
            <div>
              <h4 className="font-bold text-[10px] text-rose-500 mb-1 uppercase tracking-wider">Experience</h4>
              <div className="relative pl-3 border-l-2 border-rose-200 space-y-3">
                <div className="relative">
                  <div className="absolute -left-[15px] top-1 w-2 h-2 rounded-full bg-rose-400"></div>
                  <p className="font-bold text-slate-900">Senior Art Director <span className="font-normal text-slate-500">| Pixel & Co.</span></p>
                  <p className="text-rose-400 mb-0.5">2020 - Present</p>
                  <p>Led global rebranding campaigns for top-tier lifestyle brands.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[15px] top-1 w-2 h-2 rounded-full bg-rose-400"></div>
                  <p className="font-bold text-slate-900">UI/UX Designer <span className="font-normal text-slate-500">| WebFlow Agency</span></p>
                  <p className="text-rose-400 mb-0.5">2017 - 2020</p>
                  <p>Designed intuitive interfaces for award-winning mobile apps.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case 'minimal':
      return (
        <div className={`${baseClasses} flex-col p-6`}>
          <div className="flex flex-col items-center border-b border-slate-200 pb-4 mb-4">
            <h3 className="text-2xl font-light tracking-widest text-slate-900 mb-1">ELENA VANCE</h3>
            <p className="text-[9px] text-slate-500 uppercase tracking-[0.3em] mb-3">Architectural Designer</p>
            <div className="flex gap-4 text-[7px] text-slate-400">
              <span>elena.vance@email.com</span>
              <span>•</span>
              <span>+44 7700 900077</span>
              <span>•</span>
              <span>London, UK</span>
            </div>
          </div>
          <div className="space-y-4 text-[8px] text-slate-600">
            <div className="flex gap-4">
              <div className="w-1/4 text-right"><h4 className="font-medium text-slate-900 uppercase tracking-wider">Profile</h4></div>
              <div className="w-3/4"><p className="leading-relaxed">Detail-oriented architectural designer with a focus on sustainable urban development. Proficient in Revit, AutoCAD, and Rhino, with a portfolio of award-winning eco-friendly residential projects.</p></div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/4 text-right"><h4 className="font-medium text-slate-900 uppercase tracking-wider">Experience</h4></div>
              <div className="w-3/4 space-y-3">
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <p className="font-medium text-slate-900">Lead Designer, Studio Arch</p>
                    <p className="text-slate-400">2021 - Present</p>
                  </div>
                  <p>Directed the design phase of a 50-unit sustainable housing complex.</p>
                </div>
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <p className="font-medium text-slate-900">Junior Architect, BuildCo</p>
                    <p className="text-slate-400">2018 - 2021</p>
                  </div>
                  <p>Assisted in drafting and 3D modeling for commercial spaces.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case 'tech':
      return (
        <div className={`${baseClasses} flex-col bg-[#0d1117] border-slate-700 text-slate-300 font-mono`}>
          <div className="h-8 border-b border-slate-800 flex items-center px-4 gap-2 bg-[#161b22]">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            <span className="ml-2 text-[8px] text-slate-500">david_kim_resume.md</span>
          </div>
          <div className="p-5 space-y-4 text-[8px]">
            <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
              <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=150&h=150" alt="Tech" className="w-14 h-14 rounded border border-slate-600 object-cover grayscale" referrerPolicy="no-referrer" />
              <div>
                <h3 className="text-lg font-bold text-neon-blue">David Kim</h3>
                <p className="text-neon-purple">&gt; Senior DevOps Engineer</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-slate-500">## SKILLS</p>
              <div className="flex flex-wrap gap-2 text-[7px]">
                <span className="bg-slate-800 px-1.5 py-0.5 rounded text-green-400">Kubernetes</span>
                <span className="bg-slate-800 px-1.5 py-0.5 rounded text-blue-400">AWS</span>
                <span className="bg-slate-800 px-1.5 py-0.5 rounded text-yellow-400">Terraform</span>
                <span className="bg-slate-800 px-1.5 py-0.5 rounded text-red-400">CI/CD</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-slate-500">## EXPERIENCE</p>
              <div>
                <p className="text-slate-200">### Cloud Infrastructure Lead @ TechNova</p>
                <p className="text-slate-500 mb-1">2020 - Present</p>
                <p className="leading-relaxed">- Migrated legacy monolith to K8s, reducing deployment time by 80%.</p>
                <p className="leading-relaxed">- Implemented GitOps workflow using ArgoCD.</p>
              </div>
            </div>
          </div>
        </div>
      );
    case 'modern':
      return (
        <div className={baseClasses}>
          <div className="w-1/3 bg-slate-100 p-5 flex flex-col">
            <h3 className="text-xl font-bold text-slate-900 leading-tight mb-1">Sarah<br/>Jenkins</h3>
            <p className="text-[8px] text-slate-500 uppercase tracking-widest mb-6">Marketing Director</p>
            <div className="space-y-4 text-[7px] text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900 uppercase mb-1">Contact</h4>
                <p>sarah.j@email.com</p>
                <p>555-019-8273</p>
                <p>New York, NY</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 uppercase mb-1">Expertise</h4>
                <p>Brand Strategy</p>
                <p>Digital Marketing</p>
                <p>Team Leadership</p>
                <p>Market Research</p>
              </div>
            </div>
          </div>
          <div className="w-2/3 p-6 space-y-5 text-[8px] text-slate-600">
            <div>
              <h4 className="font-bold text-[10px] text-slate-900 uppercase tracking-wider mb-2">Summary</h4>
              <p className="leading-relaxed">Results-driven Marketing Director with 10+ years of experience in developing and executing comprehensive marketing strategies that drive brand awareness and revenue growth.</p>
            </div>
            <div>
              <h4 className="font-bold text-[10px] text-slate-900 uppercase tracking-wider mb-2">Experience</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <p className="font-bold text-slate-900">Director of Marketing</p>
                    <p className="text-slate-400">2019 - Present</p>
                  </div>
                  <p className="text-slate-500 italic mb-1">Apex Brands Inc.</p>
                  <p className="leading-relaxed">Managed a $5M annual marketing budget and led a team of 15. Increased inbound leads by 45% YoY.</p>
                </div>
                <div>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <p className="font-bold text-slate-900">Marketing Manager</p>
                    <p className="text-slate-400">2015 - 2019</p>
                  </div>
                  <p className="text-slate-500 italic mb-1">Global Retail Corp</p>
                  <p className="leading-relaxed">Developed multi-channel campaigns resulting in a 20% boost in online sales.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case 'classic':
      return (
        <div className={`${baseClasses} flex-col p-6 font-serif`}>
          <div className="text-center mb-5 border-b-2 border-slate-800 pb-4">
            <h3 className="text-3xl font-bold text-slate-900 mb-1 tracking-tight">William Thorne</h3>
            <p className="text-[9px] text-slate-600 uppercase tracking-widest">Senior Legal Counsel</p>
            <p className="text-[7px] text-slate-500 mt-2">1200 Legal Ave, Suite 400, Washington DC | w.thorne@law.com | (202) 555-0198</p>
          </div>
          <div className="space-y-4 text-[8px] text-slate-800">
            <div>
              <h4 className="font-bold text-[10px] uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-2">Professional Summary</h4>
              <p className="leading-relaxed">Accomplished corporate attorney with extensive experience in mergers and acquisitions, intellectual property, and corporate governance. Proven ability to navigate complex legal landscapes and mitigate risk for multinational corporations.</p>
            </div>
            <div>
              <h4 className="font-bold text-[10px] uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-2">Legal Experience</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between font-bold text-slate-900 mb-0.5">
                    <p>Partner, Thorne & Associates</p>
                    <p>2016 - Present</p>
                  </div>
                  <p className="italic text-slate-600 mb-1">Washington, DC</p>
                  <ul className="list-disc pl-4 space-y-0.5">
                    <li>Lead counsel for $500M acquisition in the tech sector.</li>
                    <li>Advise board of directors on corporate compliance and ethics.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case 'startup':
      return (
        <div className={`${baseClasses} flex-col bg-slate-50`}>
          <div className="h-20 bg-indigo-600 p-5 flex items-center gap-4 text-white">
            <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=150&h=150" alt="Startup" className="w-12 h-12 rounded-xl object-cover border-2 border-indigo-400" referrerPolicy="no-referrer" />
            <div>
              <h3 className="text-xl font-bold">Chloe Chen</h3>
              <p className="text-[10px] text-indigo-200 font-medium">Product Manager</p>
            </div>
          </div>
          <div className="flex flex-1 p-5 gap-5 text-[8px] text-slate-700">
            <div className="w-2/3 space-y-4">
              <div>
                <h4 className="font-bold text-[10px] text-indigo-600 mb-1">About Me</h4>
                <p className="leading-relaxed">Data-driven PM passionate about building products users love. I thrive in fast-paced startup environments, turning ambiguous problems into clear roadmaps and shipped features.</p>
              </div>
              <div>
                <h4 className="font-bold text-[10px] text-indigo-600 mb-2">Experience</h4>
                <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-slate-900 text-[9px]">Senior PM @ FinTech Startup</p>
                    <span className="bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded text-[6px] font-bold">2021 - NOW</span>
                  </div>
                  <p className="leading-relaxed">Launched a new mobile payment feature that increased user retention by 25% within the first quarter. Led a cross-functional team of 8 engineers and designers.</p>
                </div>
              </div>
            </div>
            <div className="w-1/3 space-y-4">
              <div>
                <h4 className="font-bold text-[10px] text-indigo-600 mb-2">Superpowers</h4>
                <div className="flex flex-wrap gap-1.5 text-[7px]">
                  <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">Agile</span>
                  <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">Data Analysis</span>
                  <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">UX Design</span>
                  <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">Strategy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case 'designer':
      return (
        <div className={`${baseClasses} flex-col p-6 bg-[#f8f9fa]`}>
          <div className="flex justify-between items-end mb-6 border-b-2 border-slate-900 pb-4">
            <div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Marcus<br/>Tate</h3>
              <p className="text-[10px] text-amber-500 font-bold tracking-widest uppercase mt-1">UX/UI Designer</p>
            </div>
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150" alt="Designer" className="w-16 h-16 rounded-full object-cover grayscale border-2 border-slate-900" referrerPolicy="no-referrer" />
          </div>
          <div className="columns-2 gap-4 space-y-4 text-[8px] text-slate-700">
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm break-inside-avoid">
              <h4 className="font-black text-[9px] text-slate-900 uppercase mb-1">Profile</h4>
              <p className="leading-relaxed">I craft digital experiences that are both beautiful and functional. Obsessed with micro-interactions and user-centric design principles.</p>
            </div>
            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 shadow-sm break-inside-avoid">
              <h4 className="font-black text-[9px] text-amber-700 uppercase mb-1">Skills</h4>
              <p className="leading-relaxed font-medium text-amber-900">Figma • Prototyping • User Research • Design Systems • Framer</p>
            </div>
            <div className="bg-slate-900 text-slate-300 p-3 rounded-xl shadow-sm break-inside-avoid">
              <h4 className="font-black text-[9px] text-white uppercase mb-1">Experience</h4>
              <p className="font-bold text-amber-400 mb-0.5">Lead Designer @ Studio X</p>
              <p className="text-[7px] text-slate-400 mb-1">2020 - Present</p>
              <p className="leading-relaxed">Redesigned the core e-commerce platform, boosting conversion rates by 18%.</p>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default function App() {
  return (
    <div className="bg-dark-slate text-on-surface font-body selection:bg-neon-blue selection:text-black min-h-screen relative">
      {/* Global Electronic Wave Dots Background */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-electronic-dots animate-wave-dots"></div>
        {/* Subtle gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-slate/40 via-transparent to-dark-slate/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark-slate/40 via-transparent to-dark-slate/40"></div>
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative flex items-center overflow-hidden px-4 sm:px-8 py-16 lg:py-24">

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">
            <div className="z-10">
              <div className="mb-8 lg:mb-10 overflow-hidden rounded-2xl shadow-2xl border border-neon-blue/20 group relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-dark-slate/60 via-transparent to-neon-blue/10 mix-blend-overlay z-10 pointer-events-none transition-opacity duration-700 group-hover:opacity-75"></div>
                <img
                  alt="Candidate handing over a professional resume in an interview"
                  className="w-full h-[250px] md:h-[300px] object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  src="https://lh3.googleusercontent.com/aida/ADBb0ujCan6Pl-tOA58emy08O4v1DTsLAppZWqN03QRa3P4BaGsp281xMolAUU6gaYD_HKhjyWhzm816px81r7grMpKmgvlkvpTUmwPDx_7gf7FKO-r1ibcqP0puS7sibmUlPgEIG3SQjdBnXYdj9kaMA73IYD2F9jCbKHOVf3KO_vozPIqKicYEfefyaCmuFR_JX17w87vOtmJaCUYDzcP9WmyhkjaR-yDHwdnPHY5oEe87R_M6eqcCtyJvr6CHzxpIpYDgBgBzfdMsCWU"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface tracking-tight leading-[1.1] mb-4 lg:mb-6">
                Stop Applying. <span className="text-neon-blue neon-glow">Start Getting Hired.</span>
              </h1>
              <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed mb-8 lg:mb-10 text-justify">
                Fast-track your career with a professional CV built in minutes. Our platform leverages expert-engineered, ATS-optimized templates to elevate your professional narrative, capture recruiter attention, and accelerate your path to the executive suite. Build your high-impact resume today.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-neon-blue text-black px-6 py-3 md:px-8 md:py-4 rounded-xl text-base md:text-lg font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(0,243,255,0.4)]">
                  Build My CV Now
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
            {/* Fan-out Animation Container */}
            <div className="relative flex justify-center items-center h-[350px] sm:h-[400px] md:h-[500px] mt-8 lg:mt-0 group perspective-1000 scale-[0.85] sm:scale-100">
              {/* Card 1: The Director (Classic Executive) */}
              <div className="card-1 cv-card-fan absolute w-64 h-[360px] bg-white rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col transform -rotate-6 -translate-x-8 group-hover:-rotate-12 group-hover:-translate-x-32 z-10 border border-slate-200 transition-all duration-700 ease-out">
                {/* Premium Badge */}
                <div className="absolute top-3 right-3 z-20 bg-gradient-to-r from-amber-200 to-yellow-400 text-yellow-900 text-[7px] font-bold px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.6)] animate-pulse border border-yellow-100">
                  PRO
                </div>
                <div className="flex flex-1 h-full pb-10">
                  {/* Sidebar */}
                  <div className="w-[35%] bg-emerald-900 p-3 text-white flex flex-col items-center">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100" alt="Laura" className="w-12 h-12 rounded-full border-2 border-white/20 mb-2 object-cover" referrerPolicy="no-referrer" />
                    <h3 className="text-[9px] font-bold text-center leading-tight">Laura Heeley</h3>
                    <p className="text-[6px] text-emerald-200 text-center mb-3">Operations Director</p>
                    <div className="w-full space-y-2">
                      <div>
                        <p className="text-[5px] font-bold uppercase text-emerald-300 mb-0.5">Details</p>
                        <p className="text-[5px] text-emerald-100/80 leading-tight">London, UK<br/>laura@example.com<br/>+44 20 7946</p>
                      </div>
                      <div>
                        <p className="text-[5px] font-bold uppercase text-emerald-300 mb-0.5">Skills</p>
                        <p className="text-[5px] text-emerald-100/80 leading-tight">Leadership<br/>Strategy<br/>Operations<br/>P&L Management</p>
                      </div>
                    </div>
                  </div>
                  {/* Main Content */}
                  <div className="w-[65%] p-3 bg-white text-slate-800">
                    <div className="mb-3">
                      <h4 className="text-[7px] font-bold border-b border-slate-200 pb-0.5 mb-1 uppercase tracking-wider text-slate-900">Profile</h4>
                      <p className="text-[5px] leading-[1.4] text-slate-600">Experienced and driven Operations Director with a background of managing multi-million dollar budgets and providing analysis and account support across departments. Worked to reduce business costs by 15%.</p>
                    </div>
                    <div>
                      <h4 className="text-[7px] font-bold border-b border-slate-200 pb-0.5 mb-1 uppercase tracking-wider text-slate-900">Employment</h4>
                      <div className="mb-2">
                        <p className="text-[6px] font-bold leading-tight">Operations Director <span className="font-normal text-slate-500">at GEO Corp</span></p>
                        <p className="text-[4px] text-slate-400 mb-0.5">Oct 2019 - Present</p>
                        <ul className="text-[5px] leading-[1.3] text-slate-600 list-disc pl-2 space-y-0.5">
                          <li>Created budgets and ensured costs decreased by 15%.</li>
                          <li>Generated financial state reports and balance sheets.</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-[6px] font-bold leading-tight">Senior Manager <span className="font-normal text-slate-500">at TechFlow</span></p>
                        <p className="text-[4px] text-slate-400 mb-0.5">Sep 2015 - Oct 2019</p>
                        <ul className="text-[5px] leading-[1.3] text-slate-600 list-disc pl-2 space-y-0.5">
                          <li>Provided reports on monthly cash flow.</li>
                          <li>Analyzed supply chain budgets.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Glass Label */}
                <div className="absolute bottom-0 left-0 w-full p-3 bg-slate-900/90 backdrop-blur-sm border-t border-white/10 flex justify-between items-center z-30">
                  <span className="text-[10px] font-bold tracking-widest text-white uppercase">The Director</span>
                  <span className="material-symbols-outlined text-neon-blue scale-75">star</span>
                </div>
              </div>

              {/* Card 2: The Curator (Modern Minimalist) */}
              <div className="card-2 cv-card-fan absolute w-64 h-[360px] bg-[#faf9f6] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col transform translate-y-0 group-hover:-translate-y-6 z-20 border border-stone-200 transition-all duration-700 ease-out group/curator">
                <div className="p-4 flex flex-col h-full pb-10">
                  {/* Header */}
                  <div className="flex items-center gap-3 border-b border-stone-300 pb-3 mb-3">
                    <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100" alt="Beth" className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                    <div>
                      <h3 className="text-[11px] font-serif font-bold text-stone-800 relative inline-block">
                        Beth Traynor
                        {/* Subtle hover effect on name */}
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-stone-800 transition-all duration-300 group-hover/curator:w-full"></span>
                      </h3>
                      <p className="text-[6px] text-stone-500 uppercase tracking-widest mt-0.5">Restaurant Owner</p>
                    </div>
                  </div>
                  {/* Body */}
                  <div className="flex gap-3">
                    {/* Left Col */}
                    <div className="w-1/3 space-y-3">
                      <div>
                        <h4 className="text-[5px] font-bold uppercase tracking-wider text-stone-800 mb-1">Info</h4>
                        <p className="text-[4.5px] text-stone-600 leading-tight">592 West 56th St<br/>Houston, TX<br/>+1 928-555-7024<br/>beth@example.com</p>
                      </div>
                      <div>
                        <h4 className="text-[5px] font-bold uppercase tracking-wider text-stone-800 mb-1">Skills</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center"><span className="text-[4.5px] text-stone-600">Management</span><div className="flex gap-0.5"><div className="w-1 h-1 rounded-full bg-stone-800"></div><div className="w-1 h-1 rounded-full bg-stone-800"></div><div className="w-1 h-1 rounded-full bg-stone-800"></div><div className="w-1 h-1 rounded-full bg-stone-300"></div></div></div>
                          <div className="flex justify-between items-center"><span className="text-[4.5px] text-stone-600">Operations</span><div className="flex gap-0.5"><div className="w-1 h-1 rounded-full bg-stone-800"></div><div className="w-1 h-1 rounded-full bg-stone-800"></div><div className="w-1 h-1 rounded-full bg-stone-800"></div><div className="w-1 h-1 rounded-full bg-stone-800"></div></div></div>
                        </div>
                      </div>
                    </div>
                    {/* Right Col */}
                    <div className="w-2/3 space-y-3">
                      <div>
                        <h4 className="text-[5px] font-bold uppercase tracking-wider text-stone-800 mb-1">Profile</h4>
                        <p className="text-[4.5px] text-stone-600 leading-[1.4]">Restaurant owner and manager with a wealth of experience in both strategic and operational hands-on running of busy restaurants. Exemplary cooking, food safety and people management skills.</p>
                      </div>
                      <div>
                        <h4 className="text-[5px] font-bold uppercase tracking-wider text-stone-800 mb-1">Experience</h4>
                        <div className="mb-1.5">
                          <p className="text-[5px] font-bold text-stone-800">Owner/Manager, Racks</p>
                          <p className="text-[4px] text-stone-500 mb-0.5">Dec 2010 - Present</p>
                          <p className="text-[4.5px] text-stone-600 leading-[1.3]">Manage restaurant operations and develop ongoing strategy. Maintain exceptional levels of customer service. Recruit, manage, train and develop team.</p>
                        </div>
                        <div>
                          <p className="text-[5px] font-bold text-stone-800">Head Chef, BBQ Smokehouse</p>
                          <p className="text-[4px] text-stone-500 mb-0.5">Mar 2004 - Dec 2010</p>
                          <p className="text-[4.5px] text-stone-600 leading-[1.3]">Responsible for smooth running of busy restaurant serving BBQ dishes in addition to providing cooking services.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Glass Label */}
                <div className="absolute bottom-0 left-0 w-full p-3 bg-slate-900/90 backdrop-blur-sm border-t border-neon-blue/30 flex justify-between items-center z-30">
                  <span className="text-[10px] font-bold tracking-widest text-white uppercase">The Curator</span>
                  <span className="material-symbols-outlined text-neon-blue scale-75">edit_note</span>
                </div>
              </div>

              {/* Card 3: The Vanguard (Dark Tech) */}
              <div className="card-3 cv-card-fan absolute w-64 h-[360px] bg-[#0d1117] rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col transform rotate-6 translate-x-8 group-hover:rotate-12 group-hover:translate-x-32 z-10 border border-slate-700 transition-all duration-700 ease-out">
                {/* CV Header */}
                <div className="p-4 border-b border-slate-800 relative flex items-center gap-3">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-neon-blue"></div>
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100" alt="Alex" className="w-10 h-10 rounded-md border border-slate-700 object-cover grayscale opacity-80" referrerPolicy="no-referrer" />
                  <div>
                    <h3 className="text-[10px] font-mono font-bold text-slate-200">Alex.Chen</h3>
                    <p className="text-[6px] font-mono text-neon-blue mt-0.5">&lt;FullStack_Engineer /&gt;</p>
                  </div>
                </div>
                {/* CV Body */}
                <div className="p-4 flex flex-col gap-3 flex-1 pb-10">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-900/50 rounded border border-slate-800 p-2">
                      <p className="text-[5px] font-mono text-slate-500 mb-1">// CORE_TECH</p>
                      <div className="flex flex-wrap gap-1">
                        <span className="text-[4.5px] font-mono text-neon-blue bg-neon-blue/10 px-1 py-0.5 rounded">React</span>
                        <span className="text-[4.5px] font-mono text-neon-purple bg-neon-purple/10 px-1 py-0.5 rounded">Node.js</span>
                        <span className="text-[4.5px] font-mono text-yellow-400 bg-yellow-400/10 px-1 py-0.5 rounded">Python</span>
                        <span className="text-[4.5px] font-mono text-blue-400 bg-blue-400/10 px-1 py-0.5 rounded">Docker</span>
                      </div>
                    </div>
                    <div className="bg-slate-900/50 rounded border border-slate-800 p-2">
                      <p className="text-[5px] font-mono text-slate-500 mb-1">// METRICS</p>
                      <p className="text-[5px] font-mono text-slate-300 leading-tight"><span className="text-green-400">Uptime:</span> 99.99%<br/><span className="text-green-400">Commits:</span> 4,201<br/><span className="text-green-400">Coffee:</span> NaN</p>
                    </div>
                  </div>
                  
                  {/* Terminal Area */}
                  <div className="mt-1 bg-black rounded-md border border-slate-800 p-2.5 flex-1 font-mono text-[5px] leading-[1.6] text-slate-300 relative overflow-hidden">
                    <div className="flex gap-1 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500/80"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/80"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500/80"></div>
                    </div>
                    <p><span className="text-neon-pink">alex@sys</span>:<span className="text-neon-blue">~/exp</span>$ cat current_role.md</p>
                    <p className="text-slate-400 mt-1"># Lead Developer @ CyberDyne</p>
                    <p className="text-slate-500">- Architected microservices</p>
                    <p className="text-slate-500">- Reduced latency by 40%</p>
                    <p className="mt-1"><span className="text-neon-pink">alex@sys</span>:<span className="text-neon-blue">~/exp</span>$ ./execute_skills.sh</p>
                    <p className="text-green-400">Loading modules... [OK]</p>
                    <p className="mt-1 flex items-center">
                      <span className="text-neon-pink">alex@sys</span>:<span className="text-neon-blue">~</span>$ <span className="w-1.5 h-2 bg-slate-300 ml-1 animate-pulse inline-block"></span>
                    </p>
                  </div>
                </div>
                {/* Glass Label */}
                <div className="absolute bottom-0 left-0 w-full p-3 bg-slate-900/90 backdrop-blur-sm border-t border-white/10 flex justify-between items-center z-30">
                  <span className="text-[10px] font-bold tracking-widest text-white uppercase">The Vanguard</span>
                  <span className="material-symbols-outlined text-neon-blue scale-75">bolt</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Template Gallery Section */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div className="relative z-10 px-4 sm:px-8 max-w-7xl mx-auto mb-12 lg:mb-20 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark-slate/80 border border-neon-blue/30 mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(0,243,255,0.2)]">
              <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse shadow-[0_0_8px_#00f3ff]"></span>
              <span className="font-label text-neon-blue font-bold tracking-[0.25em] text-[10px] uppercase">Portfolio</span>
            </div>
            <h2 className="font-headline text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 lg:mb-6 text-transparent bg-clip-text bg-gradient-to-br from-neon-blue via-white to-neon-purple pb-2">
              50+ Resume Templates
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-on-surface-variant font-light tracking-wide">
              Build with <span className="text-white font-semibold relative inline-block">
                confidence
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-neon-pink shadow-[0_0_10px_#ff00e5]"></span>
              </span>.
            </p>
          </div>
          <div className="carousel-3d-scene h-[450px] md:h-[550px] lg:h-[600px] relative w-full flex items-center justify-center z-10 overflow-hidden">
            <div className="carousel-3d-track w-full h-full relative scale-[0.85] sm:scale-100 md:scale-110 lg:scale-125 origin-center">
              {/* 8 Items */}
              <div className="carousel-item w-[350px]" style={{ transform: 'rotateY(0deg) translateZ(450px)' }}>
                <div className="bg-dark-slate rounded-xl p-5 shadow-2xl border border-white/10 group">
                  <TemplatePreview type="minimal" />
                  <h3 className="font-headline font-bold text-lg mb-1">Architectural Minimal</h3>
                  <p className="text-neon-blue text-sm">Design & Tech</p>
                </div>
              </div>
              <div className="carousel-item w-[350px]" style={{ transform: 'rotateY(45deg) translateZ(450px)' }}>
                <div className="bg-dark-slate rounded-xl p-5 shadow-2xl border border-white/10 group">
                  <TemplatePreview type="executive" />
                  <h3 className="font-headline font-bold text-lg mb-1">The Boardroom</h3>
                  <p className="text-neon-blue text-sm">Executives</p>
                </div>
              </div>
              <div className="carousel-item w-[350px]" style={{ transform: 'rotateY(90deg) translateZ(450px)' }}>
                <div className="bg-dark-slate rounded-xl p-5 shadow-2xl border border-white/10 group">
                  <TemplatePreview type="startup" />
                  <h3 className="font-headline font-bold text-lg mb-1">Digital Native</h3>
                  <p className="text-neon-blue text-sm">Startups</p>
                </div>
              </div>
              <div className="carousel-item w-[350px]" style={{ transform: 'rotateY(135deg) translateZ(450px)' }}>
                <div className="bg-dark-slate rounded-xl p-5 shadow-2xl border border-white/10 group">
                  <TemplatePreview type="classic" />
                  <h3 className="font-headline font-bold text-lg mb-1">Editorial Flow</h3>
                  <p className="text-neon-blue text-sm">Journalism</p>
                </div>
              </div>
              <div className="carousel-item w-[350px]" style={{ transform: 'rotateY(180deg) translateZ(450px)' }}>
                <div className="bg-dark-slate rounded-xl p-5 shadow-2xl border border-white/10 group">
                  <TemplatePreview type="modern" />
                  <h3 className="font-headline font-bold text-lg mb-1">Modern Elite</h3>
                  <p className="text-neon-blue text-sm">Business Leaders</p>
                </div>
              </div>
              <div className="carousel-item w-[350px]" style={{ transform: 'rotateY(225deg) translateZ(450px)' }}>
                <div className="bg-dark-slate rounded-xl p-5 shadow-2xl border border-white/10 group">
                  <TemplatePreview type="creative" />
                  <h3 className="font-headline font-bold text-lg mb-1">The Curator</h3>
                  <p className="text-neon-blue text-sm">Creative Heads</p>
                </div>
              </div>
              <div className="carousel-item w-[350px]" style={{ transform: 'rotateY(270deg) translateZ(450px)' }}>
                <div className="bg-dark-slate rounded-xl p-5 shadow-2xl border border-white/10 group">
                  <TemplatePreview type="tech" />
                  <h3 className="font-headline font-bold text-lg mb-1">Minimal Core</h3>
                  <p className="text-neon-blue text-sm">Product Managers</p>
                </div>
              </div>
              <div className="carousel-item w-[350px]" style={{ transform: 'rotateY(315deg) translateZ(450px)' }}>
                <div className="bg-dark-slate rounded-xl p-5 shadow-2xl border border-white/10 group">
                  <TemplatePreview type="designer" />
                  <h3 className="font-headline font-bold text-lg mb-1">Executive Slate</h3>
                  <p className="text-neon-blue text-sm">VPs & Directors</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ATS Optimization Section */}
        <section className="py-16 lg:py-32 px-4 sm:px-8 border-t border-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative group overflow-hidden rounded-2xl">
              <div className="absolute -inset-4 bg-neon-blue/10 rounded-3xl blur-2xl group-hover:bg-neon-blue/20 transition-all duration-700"></div>
              <div className="relative bg-cool-gray/50 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,243,255,0.15)] w-full aspect-square overflow-hidden flex items-center justify-center p-4 sm:p-8">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                {/* Scanning Elements */}
                <div className="scan-line"></div>
                <div className="scan-pulse-overlay"></div>

                {/* Mock Resume Document */}
                <div className="relative w-[80%] h-[110%] bg-white rounded-t-xl shadow-2xl p-6 flex flex-col gap-3 transform -rotate-2 translate-y-8 z-10 font-body">
                  {/* Resume Header */}
                  <div className="flex gap-4 items-center border-b border-gray-200 pb-3">
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150" 
                        alt="Alex Chen Profile" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 leading-tight">Alex Chen</h3>
                      <p className="text-xs text-neon-blue font-semibold uppercase tracking-wider">Cloud Solutions Architect</p>
                    </div>
                  </div>
                  {/* Resume Body */}
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-bold text-gray-800 uppercase tracking-wider">Summary</h4>
                    <p className="text-[9px] text-gray-600 leading-relaxed">
                      Results-driven Cloud Solutions Architect with 6+ years of experience designing scalable AWS infrastructure. Proven track record in reducing operational costs by 30% through containerization and CI/CD pipeline optimization.
                    </p>
                  </div>
                  <div className="space-y-1.5 mt-1">
                    <h4 className="text-[10px] font-bold text-gray-800 uppercase tracking-wider border-b border-gray-100 pb-1">Experience</h4>
                    <div>
                      <div className="flex justify-between items-baseline">
                        <h5 className="text-[10px] font-bold text-gray-900">Senior Cloud Engineer</h5>
                        <span className="text-[8px] text-gray-500 font-medium">2021 - Present</span>
                      </div>
                      <p className="text-[9px] text-neon-purple font-medium mb-0.5">Tech Solutions Inc.</p>
                      <ul className="text-[8px] text-gray-600 list-disc pl-3 space-y-0.5">
                        <li>Architected serverless microservices using AWS Lambda and API Gateway.</li>
                        <li>Migrated legacy monolithic applications to Docker containers orchestrated by Kubernetes.</li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-1 mt-1">
                    <h4 className="text-[10px] font-bold text-gray-800 uppercase tracking-wider border-b border-gray-100 pb-1">Core Competencies</h4>
                    <p className="text-[8px] text-gray-600 leading-relaxed">
                      <span className="font-semibold text-gray-800">Cloud:</span> AWS (EC2, S3, RDS, Lambda), Azure<br/>
                      <span className="font-semibold text-gray-800">DevOps:</span> Docker, Kubernetes, CI/CD, Terraform<br/>
                      <span className="font-semibold text-gray-800">Languages:</span> Python, JavaScript, Go
                    </p>
                  </div>
                </div>

                {/* Floating Score Card */}
                <div className="absolute top-4 sm:top-12 right-2 sm:right-6 bg-dark-slate/90 backdrop-blur-md border border-white/10 p-3 sm:p-4 rounded-xl shadow-2xl rotate-6 z-20 animate-[float_6s_ease-in-out_infinite]">
                  <div className="text-[8px] sm:text-[10px] text-neon-purple font-bold tracking-wider uppercase mb-1">Overall ATS Score</div>
                  <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">88<span className="text-xl sm:text-2xl text-on-surface-variant">/100</span></div>
                </div>

                {/* Floating Keywords Card */}
                <div className="absolute bottom-16 sm:bottom-24 left-2 sm:left-6 bg-dark-slate/90 backdrop-blur-md border border-white/10 p-3 sm:p-4 rounded-xl shadow-2xl -rotate-3 z-20 animate-[float_7s_ease-in-out_infinite]" style={{ animationDelay: '1s' }}>
                  <div className="text-[8px] sm:text-[10px] text-neon-blue font-bold tracking-wider uppercase mb-2 sm:mb-3">Keywords Match</div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 max-w-[140px] sm:max-w-[180px]">
                    <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-neon-blue/10 text-neon-blue text-[10px] sm:text-xs rounded border border-neon-blue/30">AWS</span>
                    <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-neon-blue/10 text-neon-blue text-[10px] sm:text-xs rounded border border-neon-blue/30">Python</span>
                    <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-neon-purple/10 text-neon-purple text-[10px] sm:text-xs rounded border border-neon-purple/30">Docker</span>
                    <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-neon-pink/10 text-neon-pink text-[10px] sm:text-xs rounded border border-neon-pink/30">CI/CD</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6 lg:space-y-8">
              <span className="font-label text-neon-purple font-bold tracking-[0.2em] text-xs uppercase block">Technology</span>
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-on-surface leading-tight">
                AI-Driven <br /><span className="text-neon-blue neon-glow">ATS Optimization</span>
              </h2>
              <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed">
                Modern recruitment systems filter out 75% of applicants before a human even sees them. Our proprietary AI evaluates your CV against real-world ATS benchmarks to ensure maximum scan fidelity.
              </p>
              <div className="space-y-4 lg:space-y-6">
                <div className="flex items-start gap-4">
                  <div className="relative group cursor-help">
                    <span className="material-symbols-outlined text-neon-blue">analytics</span>
                    {/* Tooltip */}
                    <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 bottom-full mb-3 w-64 p-4 bg-dark-slate/95 backdrop-blur-md border border-neon-blue/30 rounded-xl shadow-[0_10px_30px_rgba(0,243,255,0.2)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 translate-y-2 group-hover:translate-y-0">
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        <strong className="text-neon-blue block mb-1">Data Stream Fidelity</strong>
                        Ensures your resume's formatting, tables, and columns are perfectly parsed by both older and modern Applicant Tracking Systems without data loss.
                      </p>
                      {/* Tooltip Arrow */}
                      <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-neon-blue/30"></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-lg text-on-surface">Data Stream Fidelity</h4>
                    <p className="text-on-surface-variant text-sm">We ensure your CV structure remains intact across diverse scanning engines.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="relative group cursor-help">
                    <span className="material-symbols-outlined text-neon-purple">query_stats</span>
                    {/* Tooltip */}
                    <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 bottom-full mb-3 w-64 p-4 bg-dark-slate/95 backdrop-blur-md border border-neon-purple/30 rounded-xl shadow-[0_10px_30px_rgba(188,19,254,0.2)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 translate-y-2 group-hover:translate-y-0">
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        <strong className="text-neon-purple block mb-1">Keyword-Experience Mapping</strong>
                        Intelligently distributes industry-specific keywords naturally throughout your work history, avoiding spam filters while maximizing match rates.
                      </p>
                      {/* Tooltip Arrow */}
                      <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-neon-purple/30"></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-lg text-on-surface">Keyword-Experience Mapping</h4>
                    <p className="text-on-surface-variant text-sm">Contextual keyword matching that boosts relevance without "stuffing".</p>
                  </div>
                </div>
              </div>
              <button className="px-6 py-3 md:px-8 md:py-4 rounded-xl text-base md:text-lg font-semibold text-neon-blue hover:bg-neon-blue/10 border border-neon-blue/30 transition-all duration-300">
                Analyze My Current CV
              </button>
            </div>
          </div>
        </section>

        {/* Cover Letter Section */}
        <section className="py-16 lg:py-32 px-4 sm:px-8 border-t border-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute -inset-2 bg-gradient-to-tr from-neon-blue to-neon-purple opacity-20 blur-xl rounded-2xl group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative rounded-2xl border border-white/10 shadow-2xl overflow-hidden aspect-square">
                <img
                  alt="Young creative professional working on laptop"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800&h=800"
                  referrerPolicy="no-referrer"
                />
                {/* Subtle color overlay to match the dark/neon theme */}
                <div className="absolute inset-0 bg-gradient-to-tr from-dark-slate/60 via-transparent to-neon-blue/10 mix-blend-overlay"></div>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6 lg:space-y-8">
              <span className="font-label text-neon-pink font-bold tracking-[0.2em] text-xs uppercase block">Customization</span>
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-on-surface leading-tight">
                Personalized <br /><span className="text-neon-blue neon-glow">Cover Letters</span>
              </h2>
              <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed">
                We generate cover letters based on your resume. We factor in your experience and skill set, tailoring it to the job offer to ensure you come across as the perfect fit.
              </p>
              <div className="pt-2 lg:pt-4">
                <button className="flex items-center gap-3 text-neon-blue font-bold group">
                  <span className="h-px w-8 bg-neon-blue group-hover:w-12 transition-all"></span>
                  Start Writing
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative py-16 lg:py-32 px-4 sm:px-8 border-t border-white/5">

          <div className="relative z-10 max-w-5xl mx-auto neon-gradient-cta rounded-3xl lg:rounded-[2.5rem] p-8 md:p-12 lg:p-20 text-center shadow-[0_20px_50px_rgba(0,243,255,0.3)]">
            <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-extrabold text-black mb-6 lg:mb-8">Ready to define your professional legacy?</h2>
            <p className="text-lg md:text-xl text-black/80 mb-8 lg:mb-12 max-w-2xl mx-auto font-medium">Join 50,000+ executives who transformed their careers with the experience.</p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <button className="bg-black text-neon-blue px-8 py-4 md:px-10 md:py-5 rounded-2xl text-lg md:text-xl font-bold hover:scale-105 transition-all shadow-xl">Sign In</button>
              <button className="border-2 border-black/20 text-black px-8 py-4 md:px-10 md:py-5 rounded-2xl text-lg md:text-xl font-bold hover:bg-black/5 transition-all">
                View Pricing
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
