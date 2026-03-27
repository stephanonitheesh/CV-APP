import React from 'react';

export const TemplatePreview = ({ type }: { type: string }) => {
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
