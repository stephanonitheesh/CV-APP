import React from 'react';
import { TemplatePreview } from './TemplatePreview';

interface HomeProps {
  onBuildCV: () => void;
}

export const Home: React.FC<HomeProps> = ({ onBuildCV }) => {
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
                <button 
                  onClick={onBuildCV}
                  className="bg-neon-blue text-black px-6 py-3 md:px-8 md:py-4 rounded-xl text-base md:text-lg font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(0,243,255,0.4)] cursor-pointer"
                >
                  Build My CV Now
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
            {/* Fan-out Animation Container */}
            <div className="relative flex justify-center items-center h-[350px] sm:h-[400px] md:h-[500px] mt-8 lg:mt-0 group perspective-1000 scale-[0.85] sm:scale-100">
              {/* Card 1: The Director (Classic Executive) */}
              <div className="card-1 cv-card-fan absolute w-64 h-[360px] bg-white rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col transform -rotate-6 -translate-x-8 group-hover:-rotate-12 group-hover:-translate-x-32 z-10 border border-slate-200 transition-all duration-700 ease-out">
                <div className="absolute top-3 right-3 z-20 bg-gradient-to-r from-amber-200 to-yellow-400 text-yellow-900 text-[7px] font-bold px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.6)] animate-pulse border border-yellow-100">
                  PRO
                </div>
                <div className="flex flex-1 h-full pb-10">
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
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-3 bg-slate-900/90 backdrop-blur-sm border-t border-white/10 flex justify-between items-center z-30">
                  <span className="text-[10px] font-bold tracking-widest text-white uppercase">The Director</span>
                  <span className="material-symbols-outlined text-neon-blue scale-75">star</span>
                </div>
              </div>

              {/* Card 2: The Curator (Modern Minimalist) */}
              <div className="card-2 cv-card-fan absolute w-64 h-[360px] bg-[#faf9f6] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col transform translate-y-0 group-hover:-translate-y-6 z-20 border border-stone-200 transition-all duration-700 ease-out group/curator">
                <div className="p-4 flex flex-col h-full pb-10">
                  <div className="flex items-center gap-3 border-b border-stone-300 pb-3 mb-3">
                    <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100" alt="Beth" className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                    <div>
                      <h3 className="text-[11px] font-serif font-bold text-stone-800 relative inline-block">
                        Beth Traynor
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-stone-800 transition-all duration-300 group-hover/curator:w-full"></span>
                      </h3>
                      <p className="text-[6px] text-stone-500 uppercase tracking-widest mt-0.5">Restaurant Owner</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1/3 space-y-3">
                      <div>
                        <h4 className="text-[5px] font-bold uppercase tracking-wider text-stone-800 mb-1">Info</h4>
                        <p className="text-[4.5px] text-stone-600 leading-tight">592 West 56th St<br/>Houston, TX<br/>+1 928-555-7024<br/>beth@example.com</p>
                      </div>
                    </div>
                    <div className="w-2/3 space-y-3">
                      <div>
                        <h4 className="text-[5px] font-bold uppercase tracking-wider text-stone-800 mb-1">Profile</h4>
                        <p className="text-[4.5px] text-stone-600 leading-[1.4]">Restaurant owner and manager with a wealth of experience in both strategic and operational hands-on running of busy restaurants.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-3 bg-slate-900/90 backdrop-blur-sm border-t border-neon-blue/30 flex justify-between items-center z-30">
                  <span className="text-[10px] font-bold tracking-widest text-white uppercase">The Curator</span>
                  <span className="material-symbols-outlined text-neon-blue scale-75">edit_note</span>
                </div>
              </div>

              {/* Card 3: The Vanguard (Dark Tech) */}
              <div className="card-3 cv-card-fan absolute w-64 h-[360px] bg-[#0d1117] rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col transform rotate-6 translate-x-8 group-hover:rotate-12 group-hover:translate-x-32 z-10 border border-slate-700 transition-all duration-700 ease-out">
                <div className="p-4 border-b border-slate-800 relative flex items-center gap-3">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-neon-blue"></div>
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100" alt="Alex" className="w-10 h-10 rounded-md border border-slate-700 object-cover grayscale opacity-80" referrerPolicy="no-referrer" />
                  <div>
                    <h3 className="text-[10px] font-mono font-bold text-slate-200">Alex.Chen</h3>
                    <p className="text-[6px] font-mono text-neon-blue mt-0.5">&lt;FullStack_Engineer /&gt;</p>
                  </div>
                </div>
                <div className="p-4 flex flex-col gap-3 flex-1 pb-10">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-900/50 rounded border border-slate-800 p-2">
                      <p className="text-[5px] font-mono text-slate-500 mb-1">// CORE_TECH</p>
                      <div className="flex flex-wrap gap-1">
                        <span className="text-[4.5px] font-mono text-neon-blue bg-neon-blue/10 px-1 py-0.5 rounded">React</span>
                        <span className="text-[4.5px] font-mono text-neon-purple bg-neon-purple/10 px-1 py-0.5 rounded">Node.js</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-1 bg-black rounded-md border border-slate-800 p-2.5 flex-1 font-mono text-[5px] leading-[1.6] text-slate-300 relative overflow-hidden">
                    <p><span className="text-neon-pink">alex@sys</span>:<span className="text-neon-blue">~/exp</span>$ cat current_role.md</p>
                    <p className="text-slate-400 mt-1"># Lead Developer @ CyberDyne</p>
                  </div>
                </div>
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
              {[
                { type: 'minimal', title: 'Architectural Minimal', group: 'Design & Tech' },
                { type: 'executive', title: 'The Boardroom', group: 'Executives' },
                { type: 'startup', title: 'Digital Native', group: 'Startups' },
                { type: 'classic', title: 'Editorial Flow', group: 'Journalism' },
                { type: 'modern', title: 'Modern Elite', group: 'Business Leaders' },
                { type: 'creative', title: 'The Curator', group: 'Creative Heads' },
                { type: 'tech', title: 'Minimal Core', group: 'Product Managers' },
                { type: 'designer', title: 'Executive Slate', group: 'VPs & Directors' }
              ].map((item, index) => (
                <div key={index} className="carousel-item w-[350px]" style={{ transform: `rotateY(${index * 45}deg) translateZ(450px)` }}>
                  <div className="bg-dark-slate rounded-xl p-5 shadow-2xl border border-white/10 group">
                    <TemplatePreview type={item.type} />
                    <h3 className="font-headline font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-neon-blue text-sm">{item.group}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ATS Optimization Section */}
        <section className="py-16 lg:py-32 px-4 sm:px-8 border-t border-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative group overflow-hidden rounded-2xl">
              <div className="absolute -inset-4 bg-neon-blue/10 rounded-3xl blur-2xl group-hover:bg-neon-blue/20 transition-all duration-700"></div>
              <div className="relative bg-cool-gray/50 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,243,255,0.15)] w-full aspect-square overflow-hidden flex items-center justify-center p-4 sm:p-8">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="scan-line"></div>
                <div className="scan-pulse-overlay"></div>
                <div className="relative w-[80%] h-[110%] bg-white rounded-t-xl shadow-2xl p-6 flex flex-col gap-3 transform -rotate-2 translate-y-8 z-10 font-body">
                  <div className="flex gap-4 items-center border-b border-gray-200 pb-3">
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden shrink-0">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150" alt="Alex Chen Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 leading-tight">Alex Chen</h3>
                      <p className="text-xs text-neon-blue font-semibold uppercase tracking-wider">Cloud Solutions Architect</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-bold text-gray-800 uppercase tracking-wider">Summary</h4>
                    <p className="text-[9px] text-gray-600 leading-relaxed">Results-driven Cloud Solutions Architect with 6+ years of experience.</p>
                  </div>
                </div>
                <div className="absolute top-4 sm:top-12 right-2 sm:right-6 bg-dark-slate/90 backdrop-blur-md border border-white/10 p-3 sm:p-4 rounded-xl shadow-2xl rotate-6 z-20 animate-[float_6s_ease-in-out_infinite]">
                  <div className="text-[8px] sm:text-[10px] text-neon-purple font-bold tracking-wider uppercase mb-1">Overall ATS Score</div>
                  <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">88<span className="text-xl sm:text-2xl text-on-surface-variant">/100</span></div>
                </div>
              </div>
            </div>
            <div className="space-y-6 lg:space-y-8">
              <span className="font-label text-neon-purple font-bold tracking-[0.2em] text-xs uppercase block">Technology</span>
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-on-surface leading-tight">AI-Driven <br /><span className="text-neon-blue neon-glow">ATS Optimization</span></h2>
              <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed">Modern recruitment systems filter out 75% of applicants. Our AI ensures maximum scan fidelity.</p>
              <button 
                onClick={onBuildCV}
                className="px-6 py-3 md:px-8 md:py-4 rounded-xl text-base md:text-lg font-semibold text-neon-blue hover:bg-neon-blue/10 border border-neon-blue/30 transition-all duration-300 cursor-pointer"
              >
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
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800&h=800" alt="Professional working" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6 lg:space-y-8">
              <span className="font-label text-neon-pink font-bold tracking-[0.2em] text-xs uppercase block">Customization</span>
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-on-surface leading-tight">Personalized <br /><span className="text-neon-blue neon-glow">Cover Letters</span></h2>
              <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed">We generate cover letters based on your resume, tailoring it to the job offer.</p>
              <div className="pt-2 lg:pt-4">
                <button 
                  onClick={onBuildCV}
                  className="flex items-center gap-3 text-neon-blue font-bold group cursor-pointer"
                >
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
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <button 
                onClick={onBuildCV}
                className="bg-black text-neon-blue px-8 py-4 md:px-10 md:py-5 rounded-2xl text-lg md:text-xl font-bold hover:scale-105 transition-all shadow-xl cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
