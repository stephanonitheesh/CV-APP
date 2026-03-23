import React from 'react';
import { motion } from 'motion/react';

export interface CVData {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  skills: string[];
  experience: {
    company: string;
    role: string;
    periodStart: string;
    periodEnd: string;
    bullets?: string[];
  }[];
  education: {
    school: string;
    degree: string;
    year: string;
  }[];
  projects: {
    name: string;
    description: string;
  }[];
  photo?: string;
}

interface CVTemplatesProps {
  templateId: string;
  data: CVData;
}

export const CVTemplates: React.FC<CVTemplatesProps> = ({ templateId, data }) => {
  const renderTemplate = () => {
    switch (templateId) {
      case 'modern':
        return (
          <div className="p-16 flex flex-col h-full font-sans">
            <div className="flex justify-between items-start border-b-4 border-indigo-600 pb-10 mb-10 gap-8">
              <div className="flex gap-8 items-start">
                {data.photo && (
                  <div className="size-28 rounded-2xl overflow-hidden border-2 border-indigo-100 shadow-lg shrink-0">
                    <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                )}
                <div>
                  <h1 className="text-5xl font-display font-black tracking-tighter text-slate-900 uppercase leading-none">{data.fullName}</h1>
                  <p className="text-2xl font-display font-black text-indigo-600 mt-2 uppercase tracking-tight">{data.jobTitle}</p>
                </div>
              </div>
              <div className="text-right space-y-1.5">
                <p className="text-[13px] font-bold flex items-center justify-end gap-2.5 text-slate-500"><span className="material-symbols-outlined text-base text-indigo-400">alternate_email</span> {data.email}</p>
                <p className="text-[13px] font-bold flex items-center justify-end gap-2.5 text-slate-500"><span className="material-symbols-outlined text-base text-indigo-400">smartphone</span> {data.phone}</p>
                <p className="text-[13px] font-bold flex items-center justify-end gap-2.5 text-slate-500"><span className="material-symbols-outlined text-base text-indigo-400">map</span> {data.location}</p>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-12 flex-1">
              <div className="col-span-8 space-y-10">
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <h3 className="text-[13px] font-display font-black text-slate-900 uppercase tracking-[0.2em]">Professional Summary</h3>
                    <div className="h-px bg-slate-100 flex-1"></div>
                  </div>
                  <p className="text-[13px] text-slate-700 leading-relaxed font-medium">
                    {data.summary}
                  </p>
                </section>
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <h3 className="text-[13px] font-display font-black text-slate-900 uppercase tracking-[0.2em]">Career Milestones</h3>
                    <div className="h-px bg-slate-100 flex-1"></div>
                  </div>
                  <div className="space-y-8">
                    {data.experience.map((exp, i) => (
                      <div key={i} className="relative pl-6 border-l-2 border-indigo-50">
                        <div className="absolute left-[-5px] top-1.5 size-2 rounded-full bg-indigo-600"></div>
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="font-display font-black text-slate-900 text-[15px]">{exp.role}</h4>
                          <span className="text-[11px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase">{exp.periodStart} — {exp.periodEnd}</span>
                        </div>
                        <p className="text-[13px] font-black text-slate-400 mb-3">{exp.company}</p>
                        <ul className="space-y-2 text-[13px] text-slate-600 list-none leading-relaxed">
                          {(exp.bullets || []).map((bullet, bIdx) => (
                            <li key={bIdx} className="flex gap-3">
                              <span className="text-indigo-400 font-black">/</span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
              <div className="col-span-4 space-y-10">
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <h3 className="text-[13px] font-display font-black text-slate-900 uppercase tracking-[0.2em]">Expertise</h3>
                    <div className="h-px bg-slate-100 flex-1"></div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-white text-slate-900 border border-slate-200 text-[11px] font-black rounded-lg uppercase tracking-wider">{skill}</span>
                    ))}
                  </div>
                </section>
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <h3 className="text-[13px] font-display font-black text-slate-900 uppercase tracking-[0.2em]">Academic</h3>
                    <div className="h-px bg-slate-100 flex-1"></div>
                  </div>
                  <div className="space-y-6">
                    {data.education.map((edu, i) => (
                      <div key={i}>
                        <h4 className="text-[13px] font-black text-slate-900 leading-tight uppercase">{edu.degree}</h4>
                        <p className="text-[12px] font-bold text-slate-400 mt-1">{edu.school}</p>
                        <p className="text-[11px] font-black text-indigo-600 mt-0.5 uppercase tracking-tighter">Class of {edu.year}</p>
                      </div>
                    ))}
                  </div>
                </section>
                {data.projects.length > 0 && (
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-[0.2em]">Key Projects</h3>
                      <div className="h-px bg-slate-100 flex-1"></div>
                    </div>
                    <div className="space-y-6">
                      {data.projects.map((proj, i) => (
                        <div key={i}>
                          <h4 className="text-[13px] font-black text-slate-900 leading-tight uppercase">{proj.name}</h4>
                          <p className="text-[12px] text-slate-500 leading-relaxed mt-1 font-medium">{proj.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
            <div className="mt-auto pt-10 border-t-2 border-slate-50 text-center">
              <p className="text-[11px] text-slate-300 uppercase tracking-[0.3em] font-black">Generated via CareerSwipe Intelligence Suite</p>
            </div>
          </div>
        );

      case 'professional':
        return (
          <div className="p-16 flex flex-col h-full font-serif text-slate-900">
            <div className="text-center border-b-2 border-slate-900 pb-8 mb-8">
              <h1 className="text-4xl font-bold tracking-wide uppercase mb-2">{data.fullName}</h1>
              <p className="text-lg italic text-slate-700 mb-4">{data.jobTitle}</p>
              <div className="flex items-center justify-center gap-4 text-[12px] text-slate-600">
                <span>{data.email}</span>
                <span>•</span>
                <span>{data.phone}</span>
                <span>•</span>
                <span>{data.location}</span>
              </div>
            </div>

            <div className="flex-1 space-y-8">
              <section>
                <h3 className="text-[14px] font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-4">Professional Summary</h3>
                <p className="text-[13px] leading-relaxed text-slate-800 text-justify">
                  {data.summary}
                </p>
              </section>

              <section>
                <h3 className="text-[14px] font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-4">Professional Experience</h3>
                <div className="space-y-6">
                  {data.experience.map((exp, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-bold text-[14px]">{exp.role}</h4>
                        <span className="text-[12px] italic">{exp.periodStart} — {exp.periodEnd}</span>
                      </div>
                      <p className="text-[13px] font-semibold mb-2">{exp.company}</p>
                      <ul className="list-disc pl-5 space-y-1 text-[13px] text-slate-800 text-justify">
                        {(exp.bullets || []).map((bullet, bIdx) => (
                          <li key={bIdx}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-[14px] font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-4">Education</h3>
                <div className="space-y-4">
                  {data.education.map((edu, i) => (
                    <div key={i} className="flex justify-between items-baseline">
                      <div>
                        <h4 className="font-bold text-[13px]">{edu.degree}</h4>
                        <p className="text-[13px]">{edu.school}</p>
                      </div>
                      <span className="text-[12px] italic">{edu.year}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-[14px] font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-4">Core Competencies</h3>
                <p className="text-[13px] leading-relaxed text-slate-800">
                  {data.skills.join(' • ')}
                </p>
              </section>
            </div>
          </div>
        );

      case 'creative':
        return (
          <div className="flex h-full font-sans text-slate-800">
            {/* Left Sidebar */}
            <div className="w-1/3 bg-slate-900 text-white p-10 flex flex-col">
              <div className="mb-12">
                <div className="size-32 bg-slate-800 rounded-full border-4 border-slate-700 mx-auto mb-6 overflow-hidden flex items-center justify-center">
                  {data.photo ? (
                    <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl font-bold text-slate-500">{data.fullName.charAt(0)}</span>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-center leading-tight mb-2">{data.fullName}</h1>
                <p className="text-sm text-indigo-400 text-center font-medium uppercase tracking-wider">{data.jobTitle}</p>
              </div>

              <div className="space-y-8 flex-1">
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Contact</h3>
                  <div className="space-y-3 text-sm">
                    <p className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-400 text-lg">mail</span> {data.email}</p>
                    <p className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-400 text-lg">call</span> {data.phone}</p>
                    <p className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-400 text-lg">location_on</span> {data.location}</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-800 text-slate-200 text-xs rounded-full">{skill}</span>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Education</h3>
                  <div className="space-y-4">
                    {data.education.map((edu, i) => (
                      <div key={i}>
                        <h4 className="text-sm font-bold text-white">{edu.degree}</h4>
                        <p className="text-xs text-slate-400 mt-1">{edu.school}</p>
                        <p className="text-xs text-indigo-400 mt-0.5">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* Right Content */}
            <div className="w-2/3 p-12 bg-slate-50 flex flex-col">
              <section className="mb-10">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-1 bg-indigo-600 rounded-full"></span>
                  Profile
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {data.summary}
                </p>
              </section>

              <section className="mb-10">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-indigo-600 rounded-full"></span>
                  Experience
                </h3>
                <div className="space-y-8">
                  {data.experience.map((exp, i) => (
                    <div key={i} className="relative">
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-bold text-lg text-slate-900">{exp.role}</h4>
                        <span className="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded-md">{exp.periodStart} — {exp.periodEnd}</span>
                      </div>
                      <p className="text-sm font-bold text-slate-500 mb-3">{exp.company}</p>
                      <ul className="space-y-2 text-sm text-slate-600 list-none">
                        {(exp.bullets || []).map((bullet, bIdx) => (
                          <li key={bIdx} className="flex gap-3">
                            <span className="text-indigo-600">•</span>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {data.projects.length > 0 && (
                <section>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <span className="w-8 h-1 bg-indigo-600 rounded-full"></span>
                    Projects
                  </h3>
                  <div className="space-y-6">
                    {data.projects.map((proj, i) => (
                      <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
                        <h4 className="font-bold text-slate-900 mb-1">{proj.name}</h4>
                        <p className="text-sm text-slate-600">{proj.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        );

      case 'executive':
        return (
          <div className="p-16 flex flex-col h-full font-serif bg-slate-50">
            <div className="bg-slate-900 text-white p-12 -mx-16 -mt-16 mb-12 flex justify-between items-end">
              <div>
                <h1 className="text-5xl font-bold tracking-tight mb-2">{data.fullName}</h1>
                <p className="text-2xl text-slate-400 font-medium tracking-wide">{data.jobTitle}</p>
              </div>
              <div className="text-right text-sm space-y-1">
                <p>{data.email}</p>
                <p>{data.phone}</p>
                <p>{data.location}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-12 flex-1">
              <div className="col-span-2 space-y-10">
                <section>
                  <h3 className="text-lg font-bold border-b-2 border-slate-900 pb-2 mb-6 uppercase tracking-widest">Executive Profile</h3>
                  <p className="text-slate-700 leading-relaxed italic text-lg">{data.summary}</p>
                </section>
                
                <section>
                  <h3 className="text-lg font-bold border-b-2 border-slate-900 pb-2 mb-6 uppercase tracking-widest">Leadership Record</h3>
                  <div className="space-y-8">
                    {data.experience.map((exp, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-baseline mb-2">
                          <h4 className="text-xl font-bold text-slate-900">{exp.role}</h4>
                          <span className="text-sm font-bold text-slate-500 uppercase">{exp.periodStart} — {exp.periodEnd}</span>
                        </div>
                        <p className="text-md font-bold text-indigo-600 mb-4 uppercase tracking-tighter">{exp.company}</p>
                        <ul className="space-y-2 list-none border-l-2 border-slate-200 pl-6">
                          {(exp.bullets || []).map((bullet, bIdx) => (
                            <li key={bIdx} className="text-slate-600 text-sm leading-relaxed">{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
              
              <div className="space-y-10">
                <section>
                  <h3 className="text-lg font-bold border-b-2 border-slate-900 pb-2 mb-6 uppercase tracking-widest">Expertise</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {data.skills.map((skill, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-indigo-600"></div>
                        <span className="text-sm font-bold text-slate-700">{skill}</span>
                      </div>
                    ))}
                  </div>
                </section>
                
                <section>
                  <h3 className="text-lg font-bold border-b-2 border-slate-900 pb-2 mb-6 uppercase tracking-widest">Education</h3>
                  <div className="space-y-6">
                    {data.education.map((edu, i) => (
                      <div key={i}>
                        <h4 className="font-bold text-slate-900">{edu.degree}</h4>
                        <p className="text-sm text-slate-500">{edu.school}</p>
                        <p className="text-xs font-bold text-indigo-600 mt-1">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        );

      case 'minimal-pure':
        return (
          <div className="p-20 flex flex-col h-full font-sans bg-white text-zinc-800">
            <header className="mb-16">
              <h1 className="text-6xl font-light tracking-tighter mb-4">{data.fullName}</h1>
              <p className="text-xl text-zinc-400 font-light">{data.jobTitle} &bull; {data.location}</p>
              <div className="mt-6 flex gap-6 text-sm text-zinc-400">
                <span>{data.email}</span>
                <span>{data.phone}</span>
              </div>
            </header>
            
            <div className="space-y-16 flex-1">
              <section className="grid grid-cols-4 gap-8">
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-300">Profile</h3>
                <p className="col-span-3 text-lg font-light leading-relaxed text-zinc-500">{data.summary}</p>
              </section>
              
              <section className="grid grid-cols-4 gap-8">
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-300">Work</h3>
                <div className="col-span-3 space-y-12">
                  {data.experience.map((exp, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-baseline mb-4">
                        <h4 className="text-xl font-medium">{exp.role}</h4>
                        <span className="text-sm text-zinc-300">{exp.periodStart} &mdash; {exp.periodEnd}</span>
                      </div>
                      <p className="text-sm font-bold text-zinc-900 mb-4">{exp.company}</p>
                      <div className="space-y-3">
                        {(exp.bullets || []).map((bullet, bIdx) => (
                          <p key={bIdx} className="text-md text-zinc-500 font-light leading-relaxed">{bullet}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              
              <section className="grid grid-cols-4 gap-8">
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-300">Capabilities</h3>
                <div className="col-span-3 flex flex-wrap gap-x-8 gap-y-2">
                  {data.skills.map((skill, i) => (
                    <span key={i} className="text-zinc-500 font-light">{skill}</span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        );

      case 'tech-dark':
        return (
          <div className="flex h-full font-mono bg-[#0f172a] text-[#94a3b8]">
            <div className="w-1/4 bg-[#1e293b] border-r border-[#334155] p-10 flex flex-col">
              <div className="mb-12">
                {data.photo && (
                  <div className="size-20 bg-[#1e293b] rounded-lg border border-indigo-500/30 overflow-hidden mb-6 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                    <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="text-indigo-400 font-bold mb-4">{"<user>"}</div>
                <h1 className="text-white text-2xl font-bold leading-tight mb-2">{data.fullName}</h1>
                <p className="text-indigo-400 text-sm">{"const role = '"}{data.jobTitle}{"';"}</p>
              </div>
              
              <div className="space-y-10 flex-1">
                <section>
                  <div className="text-xs text-[#475569] mb-4 uppercase tracking-widest">{"// Contact"}</div>
                  <div className="space-y-2 text-xs">
                    <p className="text-[#cbd5e1]">{data.email}</p>
                    <p>{data.phone}</p>
                    <p>{data.location}</p>
                  </div>
                </section>
                
                <section>
                  <div className="text-xs text-[#475569] mb-4 uppercase tracking-widest">{"// Stack"}</div>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-[#334155] text-indigo-300 text-[10px] rounded">"{skill}"</span>
                    ))}
                  </div>
                </section>
              </div>
            </div>
            
            <div className="flex-1 p-16 overflow-y-auto">
              <section className="mb-12">
                <div className="text-indigo-500 mb-4 italic">{"/** @summary */"}</div>
                <p className="text-sm leading-loose text-[#cbd5e1]">{data.summary}</p>
              </section>
              
              <section className="mb-12">
                <div className="text-indigo-500 mb-6 italic">{"/** @experience */"}</div>
                <div className="space-y-12">
                  {data.experience.map((exp, i) => (
                    <div key={i} className="relative pl-6 border-l border-[#334155]">
                      <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-indigo-500"></div>
                      <div className="flex justify-between mb-2">
                        <h4 className="text-lg text-white font-bold">{exp.role}</h4>
                        <span className="text-xs text-indigo-400">{exp.periodStart} {"=>"} {exp.periodEnd}</span>
                      </div>
                      <p className="text-sm text-indigo-300 mb-4">{exp.company}</p>
                      <ul className="space-y-2 text-xs">
                        {(exp.bullets || []).map((bullet, bIdx) => (
                          <li key={bIdx} className="flex gap-2">
                            <span className="text-indigo-500">{"*"}</span>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        );

      case 'swiss-clean':
        return (
          <div className="p-16 flex flex-col h-full font-sans bg-[#f3f4f6] text-slate-900 uppercase">
            <div className="grid grid-cols-12 gap-0 border-b-[20px] border-slate-900 pb-12 mb-12">
              <div className="col-span-8">
                <h1 className="text-8xl font-black leading-none -ml-2 tracking-tighter">{data.fullName.split(' ')[0]}<br/>{data.fullName.split(' ')[1]}</h1>
              </div>
              <div className="col-span-4 flex flex-col justify-end text-right">
                <p className="text-2xl font-black mb-4 leading-tight">{data.jobTitle}</p>
                <div className="space-y-1 text-xs font-bold tracking-widest text-slate-500">
                  <p>{data.email}</p>
                  <p>{data.phone}</p>
                  <p>{data.location}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-12 gap-12 flex-1">
              <div className="col-span-4">
                <h3 className="text-4xl font-black border-t-8 border-slate-900 pt-4 mb-12">Profile</h3>
                <p className="text-sm font-bold leading-relaxed lowercase normal-case">{data.summary}</p>
                
                <h3 className="text-4xl font-black border-t-8 border-slate-900 pt-4 mt-20 mb-8">Skillset</h3>
                <div className="space-y-2">
                  {data.skills.map((skill, i) => (
                    <p key={i} className="text-lg font-black">{skill}</p>
                  ))}
                </div>
              </div>
              
              <div className="col-span-8">
                <h3 className="text-4xl font-black border-t-8 border-slate-900 pt-4 mb-12">Experience</h3>
                <div className="space-y-16">
                  {data.experience.map((exp, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-baseline mb-4">
                        <h4 className="text-2xl font-black">{exp.role}</h4>
                        <span className="text-sm font-black text-slate-400">{exp.periodStart}/{exp.periodEnd}</span>
                      </div>
                      <p className="text-md font-black text-indigo-600 mb-6">{exp.company}</p>
                      <div className="space-y-4">
                        {(exp.bullets || []).map((bullet, bIdx) => (
                          <div key={bIdx} className="flex gap-4">
                            <div className="w-4 h-4 bg-slate-900 shrink-0 mt-1"></div>
                            <p className="text-xs font-bold leading-relaxed lowercase normal-case">{bullet}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'pastel-dream':
        return (
          <div className="p-16 flex flex-col h-full font-sans bg-[#fffcf9]">
            <header className="bg-indigo-50 p-16 rounded-[40px] mb-12 flex justify-between items-center">
              <div>
                <h1 className="text-5xl font-bold text-indigo-900 mb-2">{data.fullName}</h1>
                <p className="text-xl text-indigo-400 font-medium">{data.jobTitle}</p>
              </div>
              <div className="flex flex-col items-end gap-2 text-indigo-300 text-sm font-bold">
                <span className="bg-white px-4 py-2 rounded-full shadow-sm">{data.email}</span>
                <span className="bg-white px-4 py-2 rounded-full shadow-sm">{data.phone}</span>
              </div>
            </header>
            
            <div className="grid grid-cols-5 gap-12 flex-1">
              <div className="col-span-2 space-y-12">
                <section className="bg-rose-50 p-10 rounded-[40px]">
                  <h3 className="text-rose-400 font-black uppercase tracking-widest text-xs mb-6">About Me</h3>
                  <p className="text-rose-900/70 text-sm leading-relaxed font-medium">{data.summary}</p>
                </section>
                
                <section className="bg-amber-50 p-10 rounded-[40px]">
                  <h3 className="text-amber-400 font-black uppercase tracking-widest text-xs mb-6">Skills</h3>
                  <div className="flex flex-wrap gap-3">
                    {data.skills.map((skill, i) => (
                      <span key={i} className="px-4 py-2 bg-white text-amber-600 text-xs font-bold rounded-2xl shadow-sm">{skill}</span>
                    ))}
                  </div>
                </section>
              </div>
              
              <div className="col-span-3 space-y-12">
                <section className="bg-indigo-50/50 p-10 rounded-[40px] flex-1">
                  <h3 className="text-indigo-400 font-black uppercase tracking-widest text-xs mb-8">Work History</h3>
                  <div className="space-y-10">
                    {data.experience.map((exp, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-baseline mb-2">
                          <h4 className="text-lg font-bold text-indigo-900">{exp.role}</h4>
                          <span className="text-xs font-black text-indigo-300 bg-white px-3 py-1 rounded-full">{exp.periodStart}–{exp.periodEnd}</span>
                        </div>
                        <p className="text-sm font-bold text-rose-300 mb-4">{exp.company}</p>
                        <ul className="space-y-3">
                          {(exp.bullets || []).map((bullet, bIdx) => (
                            <li key={bIdx} className="text-sm text-indigo-900/60 flex gap-3">
                              <span className="text-rose-200 mt-1">•</span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        );

      case 'platinum-executive':
        return (
          <div className="p-16 flex flex-col h-full font-serif bg-white text-[#1a1c1e]">
            <div className="border-y-[12px] border-[#c5a059] py-12 mb-12 flex justify-between items-center">
              <div className="max-w-2xl text-center flex-1">
                <h1 className="text-6xl font-light tracking-[0.2em] uppercase mb-4 text-[#c5a059]">{data.fullName}</h1>
                <div className="h-px bg-[#e2e2e2] w-24 mx-auto mb-4"></div>
                <p className="text-xl tracking-[0.34em] font-medium uppercase text-[#616161]">{data.jobTitle}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-12 gap-16 flex-1">
              <div className="col-span-4 space-y-12 border-r border-[#f0f0f0] pr-12">
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#c5a059] mb-8">Communication</h3>
                  <div className="space-y-4 text-sm text-[#7a7a7a] leading-loose italic">
                    <p>{data.email}</p>
                    <p>{data.phone}</p>
                    <p>{data.location}</p>
                  </div>
                </section>
                
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#c5a059] mb-8">Core Assets</h3>
                  <div className="space-y-4">
                    {data.skills.map((skill, i) => (
                      <p key={i} className="text-sm font-medium tracking-wide uppercase text-[#424242] border-b border-[#f5f5f5] pb-2">{skill}</p>
                    ))}
                  </div>
                </section>
              </div>
              
              <div className="col-span-8 space-y-12">
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#c5a059] mb-10">Strategic Narrative</h3>
                  <p className="text-lg leading-[1.8] text-[#333333] text-justify font-light italic">{data.summary}</p>
                </section>
                
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#c5a059] mb-10">Professional Trajectory</h3>
                  <div className="space-y-12">
                    {data.experience.map((exp, i) => (
                      <div key={i} className="group">
                        <div className="flex justify-between items-end mb-4">
                          <h4 className="text-2xl font-light tracking-tight text-[#1a1c1e]">{exp.role}</h4>
                          <span className="text-[10px] font-bold tracking-[0.2em] text-[#9c9c9c] uppercase mb-1">{exp.periodStart} / {exp.periodEnd}</span>
                        </div>
                        <p className="text-sm font-bold text-[#c5a059] uppercase tracking-[0.15em] mb-6">{exp.company}</p>
                        <div className="space-y-4 border-l-2 border-[#f0f0f0] pl-8 group-hover:border-[#c5a059] transition-colors">
                          {(exp.bullets || []).map((bullet, bIdx) => (
                            <p key={bIdx} className="text-sm text-[#666666] leading-relaxed italic">{bullet}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        );

      case 'corporate-sharp':
        return (
          <div className="p-16 flex flex-col h-full font-sans bg-white border-[1px] border-slate-200">
            <div className="flex gap-12 items-stretch mb-12">
              <div className="w-1/4 bg-slate-900 p-8 flex flex-col justify-center items-center text-white rounded-2xl">
                <div className="text-4xl font-black mb-2">{data.fullName.split(' ').map(n => n[0]).join('')}</div>
                <div className="h-px w-8 bg-indigo-500 mb-4"></div>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-50 text-center">{data.location}</p>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase mb-2">{data.fullName}</h1>
                <p className="text-xl font-bold text-indigo-600 tracking-wide uppercase">{data.jobTitle}</p>
                <div className="mt-4 flex gap-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  <span>{data.email}</span>
                  <span>{data.phone}</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 grid grid-cols-12 gap-12">
              <div className="col-span-1 border-r-2 border-slate-100 flex flex-col items-center py-4">
                <span className="[writing-mode:vertical-lr] rotate-180 text-[10px] font-black tracking-[0.5em] text-slate-300 uppercase">Career Journey</span>
              </div>
              <div className="col-span-11 space-y-12">
                <section>
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] mb-6 flex items-center gap-4">Summary <span className="h-px bg-slate-100 flex-1"></span></h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">{data.summary}</p>
                </section>
                
                <section>
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] mb-8 flex items-center gap-4">Exp <span className="h-px bg-slate-100 flex-1"></span></h3>
                  <div className="space-y-10">
                    {data.experience.map((exp, i) => (
                      <div key={i} className="group">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase">{exp.role}</h4>
                            <p className="text-xs font-black text-slate-400 mt-1 uppercase tracking-tighter">{exp.company}</p>
                          </div>
                          <span className="text-[10px] font-black bg-slate-50 border border-slate-100 px-3 py-1 rounded-full uppercase tracking-widest">{exp.periodStart} &mdash; {exp.periodEnd}</span>
                        </div>
                        <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3">
                          {(exp.bullets || []).map((bullet, bIdx) => (
                            <li key={bIdx} className="text-[12px] text-slate-500 flex gap-3 lowercase normal-case italic border-l border-slate-100 pl-4">{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        );

      case 'saas-builder':
        return (
          <div className="p-16 flex flex-col h-full font-sans bg-[#f8fafc]">
            <div className="bg-white border border-slate-200 rounded-3xl p-12 shadow-sm mb-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 bg-indigo-50 border-bl rounded-bl-3xl">
                <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none">Developer Status</div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-sm font-bold text-slate-900">Available for Hire</span>
                </div>
              </div>
              <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-2">{data.fullName}</h1>
              <p className="text-xl font-medium text-slate-500">{data.jobTitle}</p>
              <div className="mt-8 flex gap-4">
                <span className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl">{data.email}</span>
                <span className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl">{data.location}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-10 flex-1">
              <div className="col-span-2 space-y-10">
                <section className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm transition-all hover:shadow-md">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Brief</h3>
                  <p className="text-md text-slate-600 leading-relaxed font-medium">{data.summary}</p>
                </section>
                
                <section className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm transition-all hover:shadow-md">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Ship List</h3>
                  <div className="space-y-12">
                    {data.experience.map((exp, i) => (
                      <div key={i} className="relative">
                        <div className="flex justify-between items-baseline mb-4">
                          <div>
                            <h4 className="text-xl font-black text-slate-900 mb-1">{exp.role}</h4>
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-tighter">{exp.company}</p>
                          </div>
                          <span className="text-[11px] font-black text-slate-400 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">{exp.periodStart} / {exp.periodEnd}</span>
                        </div>
                        <div className="space-y-3">
                          {(exp.bullets || []).map((bullet, bIdx) => (
                            <div key={bIdx} className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-600 font-medium">
                              {bullet}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
              
              <div className="space-y-10">
                <section className="bg-[#1e293b] text-white rounded-3xl p-10 shadow-xl overflow-hidden relative">
                  <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-8 relative z-10">Tech Stack</h3>
                  <div className="grid grid-cols-2 gap-2 relative z-10">
                    {data.skills.map((skill, i) => (
                      <div key={i} className="px-3 py-2 bg-slate-800 text-[10px] font-bold rounded-lg border border-slate-700 text-slate-300">
                        {skill}
                      </div>
                    ))}
                  </div>
                </section>
                
                <section className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm flex-1">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Education</h3>
                  <div className="space-y-6">
                    {data.education.map((edu, i) => (
                      <div key={i}>
                        <h4 className="text-sm font-black text-slate-900 mb-1 leading-tight">{edu.degree}</h4>
                        <p className="text-xs text-slate-400 font-bold mb-2">{edu.school}</p>
                        <div className="text-[10px] font-black text-indigo-600 inline-block px-2 py-0.5 bg-indigo-50 rounded uppercase">Class of {edu.year}</div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        );

      case 'ai-engineer':
        return (
          <div className="p-16 flex flex-col h-full font-mono bg-white text-zinc-900">
            <div className="border border-zinc-900 p-12 mb-10 flex justify-between items-start ring-[12px] ring-zinc-50 relative overflow-hidden">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '10px 10px' }}></div>
               <div>
                 <div className="text-[10px] font-black text-zinc-400 mb-2">{"> system_user_v1.0"}</div>
                 <h1 className="text-5xl font-black tracking-tighter uppercase mb-4">{data.fullName}</h1>
                 <div className="flex items-center gap-4">
                    <span className="text-md font-bold text-zinc-400"># rank:</span>
                    <span className="text-md font-bold bg-zinc-900 text-white px-3 py-1 rounded lowercase">{data.jobTitle}</span>
                 </div>
               </div>
               <div className="text-right space-y-1">
                 <p className="text-xs font-black">{"{"}</p>
                 <p className="text-xs font-black pl-4">email: "{data.email}",</p>
                 <p className="text-xs font-black pl-4">tel: "{data.phone}",</p>
                 <p className="text-xs font-black pl-4">geo: "{data.location}"</p>
                 <p className="text-xs font-black">{"}"}</p>
               </div>
            </div>
            
            <div className="grid grid-cols-4 gap-12 flex-1">
              <div className="space-y-12">
                <section>
                   <h3 className="text-xs font-black border-b-2 border-zinc-900 pb-2 mb-6 uppercase tracking-widest text-zinc-400">Core Params</h3>
                   <div className="space-y-3">
                     {data.skills.map((skill, i) => (
                       <div key={i} className="flex justify-between items-center text-xs">
                         <span className="font-bold lowercase">.{skill}</span>
                         <span className="text-[10px] text-zinc-300">verified</span>
                       </div>
                     ))}
                   </div>
                </section>
                
                <section>
                   <h3 className="text-xs font-black border-b-2 border-zinc-900 pb-2 mb-6 uppercase tracking-widest text-zinc-400">Training</h3>
                   <div className="space-y-6">
                      {data.education.map((edu, i) => (
                        <div key={i}>
                          <p className="text-[10px] font-black uppercase mb-1">{edu.degree}</p>
                          <p className="text-[10px] text-zinc-400 mb-2">{edu.school}</p>
                          <p className="text-[10px] font-black text-zinc-300">[{edu.year}]</p>
                        </div>
                      ))}
                   </div>
                </section>
              </div>
              
              <div className="col-span-3 space-y-12">
                <section>
                  <h3 className="text-xs font-black border-b-2 border-zinc-900 pb-2 mb-6 uppercase tracking-widest text-zinc-400">Inference Mode</h3>
                  <p className="text-sm leading-relaxed text-zinc-600 italic">" {data.summary} "</p>
                </section>
                
                <section>
                  <h3 className="text-xs font-black border-b-2 border-zinc-900 pb-2 mb-6 uppercase tracking-widest text-zinc-400">Logical Operations</h3>
                  <div className="space-y-10">
                    {data.experience.map((exp, i) => (
                      <div key={i} className="relative pl-8">
                        <div className="absolute left-0 top-1 text-[10px] font-black text-zinc-300">0{i+1}</div>
                        <div className="flex justify-between items-baseline mb-2">
                           <h4 className="text-xl font-black uppercase text-zinc-900 tracking-tight">{exp.role}</h4>
                           <span className="text-[10px] font-bold text-zinc-400">{exp.periodStart} &mdash; {exp.periodEnd}</span>
                        </div>
                        <p className="text-xs font-black text-zinc-400 mb-4 tracking-widest uppercase">{exp.company}</p>
                        <div className="space-y-3">
                           {(exp.bullets || []).map((bullet, bIdx) => (
                             <div key={bIdx} className="flex gap-4">
                               <div className="w-px h-auto bg-zinc-100 shrink-0"></div>
                               <p className="text-xs text-zinc-500 font-medium leading-relaxed lowercase normal-case">{bullet}</p>
                             </div>
                           ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        );

      case 'cyber-clean':
        return (
          <div className="p-16 flex flex-col h-full font-sans bg-[#0a0a0a] text-[#ededed]">
            <div className="flex justify-between items-start mb-20 border-l-[12px] border-[#00ff41] pl-10">
              <div>
                <h1 className="text-6xl font-black tracking-tight mb-2 uppercase">{data.fullName}</h1>
                <p className="text-2xl font-black text-[#00ff41] lowercase tracking-[0.2em]">{data.jobTitle}</p>
              </div>
              <div className="text-right text-[10px] font-black space-y-1 text-[#666] tracking-[0.2em] uppercase">
                <p>{data.email}</p>
                <p>{data.phone}</p>
                <p>{data.location}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-12 gap-16 flex-1">
              <div className="col-span-8 space-y-16">
                 <section>
                   <div className="text-[10px] font-black text-[#666] mb-6 uppercase tracking-[0.5em]">Overview</div>
                   <p className="text-lg leading-relaxed text-[#aaa] font-medium">{data.summary}</p>
                 </section>
                 
                 <section>
                   <div className="text-[10px] font-black text-[#666] mb-10 uppercase tracking-[0.5em]">Experience Log</div>
                   <div className="space-y-12">
                     {data.experience.map((exp, i) => (
                       <div key={i} className="relative group">
                         <div className="absolute -left-10 top-2 w-[2px] h-0 group-hover:h-full bg-[#00ff41] transition-all duration-500 opacity-30"></div>
                         <div className="flex justify-between items-baseline mb-2">
                           <h4 className="text-2xl font-black text-[#ededed] uppercase">{exp.role}</h4>
                           <span className="text-[10px] font-black text-[#555] tracking-widest italic">{exp.periodStart} // {exp.periodEnd}</span>
                         </div>
                         <p className="text-sm font-black text-[#00ff41] mb-6 uppercase tracking-tighter opacity-80">{exp.company}</p>
                         <div className="space-y-4">
                            {(exp.bullets || []).map((bullet, bIdx) => (
                              <div key={bIdx} className="flex gap-4 p-4 bg-[#111] border border-[#222] rounded-lg">
                                <span className="text-[#00ff41] font-black text-xs">$</span>
                                <p className="text-xs text-[#888] font-medium leading-relaxed lowercase normal-case">{bullet}</p>
                              </div>
                            ))}
                         </div>
                       </div>
                     ))}
                   </div>
                 </section>
              </div>
              
              <div className="col-span-4 space-y-16">
                 <section>
                    <div className="text-[10px] font-black text-[#666] mb-8 uppercase tracking-[0.5em]">Inventory</div>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1.5 bg-[#1a1a1a] text-[#00ff41] text-[10px] font-black rounded border border-[#333] tracking-widest uppercase">{skill}</span>
                      ))}
                    </div>
                 </section>
                 
                 <section className="bg-[#111] p-8 rounded-2xl border border-[#222]">
                    <div className="text-[10px] font-black text-[#666] mb-6 uppercase tracking-[0.5em]">Credentials</div>
                    <div className="space-y-6">
                      {data.education.map((edu, i) => (
                        <div key={i}>
                          <h4 className="text-xs font-black text-[#ededed] leading-tight mb-2 uppercase">{edu.degree}</h4>
                          <p className="text-[10px] font-black text-[#555] uppercase">{edu.school}</p>
                          <p className="text-[10px] font-black text-[#00ff41] mt-1 italic">Issued: {edu.year}</p>
                        </div>
                      ))}
                    </div>
                 </section>
              </div>
            </div>
          </div>
        );

      case 'portfolio-grid':
        return (
          <div className="p-16 flex flex-col h-full font-display bg-white uppercase">
            <div className="grid grid-cols-4 gap-4 mb-20">
               <div className="col-span-3 bg-zinc-900 text-white p-12 flex flex-col justify-end">
                  <h1 className="text-8xl font-black leading-none tracking-tighter mb-4">{data.fullName}</h1>
                  <p className="text-2xl font-black text-zinc-500 tracking-widest">{data.jobTitle}</p>
               </div>
               <div className="bg-indigo-600 text-white p-10 flex flex-col justify-between items-end text-right">
                  <div className="w-12 h-12 border-2 border-white rounded-full"></div>
                  <div className="space-y-1 text-[10px] font-black tracking-widest opacity-80">
                    <p>{data.email}</p>
                    <p>{data.phone}</p>
                    <p>{data.location}</p>
                  </div>
               </div>
            </div>
            
            <div className="grid grid-cols-4 gap-8 flex-1">
              <section className="col-span-1">
                 <h3 className="text-xs font-black border-b-4 border-zinc-900 pb-2 mb-6">Capabilities</h3>
                 <div className="space-y-2">
                   {data.skills.map((skill, i) => (
                     <p key={i} className="text-sm font-black hover:text-indigo-600 cursor-default transition-colors">{skill}</p>
                   ))}
                 </div>
                 
                 <h3 className="text-xs font-black border-b-4 border-zinc-900 pb-2 mt-12 mb-6">Education</h3>
                 <div className="space-y-6">
                    {data.education.map((edu, i) => (
                      <div key={i}>
                        <p className="text-xs font-black leading-tight mb-1">{edu.degree}</p>
                        <p className="text-[10px] font-black text-zinc-400">{edu.school}</p>
                        <p className="text-[10px] font-black text-indigo-600 mt-1">{edu.year}</p>
                      </div>
                    ))}
                 </div>
              </section>
              
              <div className="col-span-3 space-y-12">
                <section>
                   <h3 className="text-xs font-black border-b-4 border-zinc-900 pb-2 mb-6 text-zinc-400">Strategy</h3>
                   <p className="text-2xl font-black leading-tight lowercase normal-case tracking-tight">{data.summary}</p>
                </section>
                
                <section>
                   <h3 className="text-xs font-black border-b-4 border-zinc-900 pb-2 mb-10 text-zinc-400">Experience</h3>
                   <div className="grid grid-cols-2 gap-x-12 gap-y-16">
                     {data.experience.map((exp, i) => (
                       <div key={i} className="relative">
                          <div className="flex justify-between items-baseline mb-4">
                            <h4 className="text-xl font-black tracking-tighter">{exp.role}</h4>
                            <span className="text-[10px] font-black text-indigo-600">{exp.periodStart}-{exp.periodEnd}</span>
                          </div>
                          <p className="text-xs font-black text-zinc-400 mb-6 border-l-2 border-indigo-600 pl-4">{exp.company}</p>
                          <ul className="space-y-3">
                            {(exp.bullets || []).map((bullet, bIdx) => (
                              <li key={bIdx} className="text-[11px] font-black leading-relaxed flex gap-3 lowercase normal-case text-zinc-600">
                                <span className="text-indigo-600 shrink-0">·</span>
                                {bullet}
                              </li>
                            ))}
                          </ul>
                       </div>
                     ))}
                   </div>
                </section>
              </div>
            </div>
          </div>
        );

      case 'artistic-flow':
        return (
          <div className="p-16 flex flex-col h-full font-serif bg-[#faf9f6] text-[#2c1810]">
            <div className="flex justify-between items-center mb-24 relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-rose-100 rounded-full blur-[80px] opacity-60"></div>
              <div className="relative z-10">
                <h1 className="text-7xl font-bold tracking-tighter mb-4 italic">{data.fullName}</h1>
                <p className="text-2xl font-medium text-rose-400 tracking-widest uppercase italic">{data.jobTitle}</p>
              </div>
              <div className="text-right space-y-2 relative z-10">
                <p className="text-sm font-medium border-b border-[#2c1810]/10 pb-1 italic">{data.email}</p>
                <p className="text-sm font-medium border-b border-[#2c1810]/10 pb-1 italic">{data.phone}</p>
                <p className="text-sm font-medium italic">{data.location}</p>
              </div>
            </div>
            
            <div className="flex-1 space-y-24">
               <section className="flex gap-20 items-start">
                 <div className="w-48 shrink-0 text-xs font-bold uppercase tracking-[0.4em] text-rose-300 pt-2 italic">The Essence</div>
                 <p className="text-3xl leading-[1.4] tracking-tight font-medium italic text-[#4a3a30]">{data.summary}</p>
               </section>
               
               <section className="flex gap-20 items-start">
                 <div className="w-48 shrink-0 text-xs font-bold uppercase tracking-[0.4em] text-rose-300 pt-2 italic">The Journey</div>
                 <div className="flex-1 space-y-20">
                    {data.experience.map((exp, i) => (
                      <div key={i} className="flex gap-12 group">
                        <div className="w-32 shrink-0 text-xs font-bold text-[#bcaaa4] pt-2">{exp.periodStart} &mdash; {exp.periodEnd}</div>
                        <div className="flex-1">
                          <h4 className="text-2xl font-bold mb-2 group-hover:text-rose-400 transition-colors uppercase italic">{exp.role}</h4>
                          <p className="text-sm font-medium text-[#8d6e63] mb-6 italic">{exp.company}</p>
                          <ul className="space-y-4">
                             {(exp.bullets || []).map((bullet, bIdx) => (
                               <li key={bIdx} className="text-md leading-relaxed text-[#5d4037] italic font-medium relative pl-8 lowercase normal-case">
                                 <span className="absolute left-0 top-3 w-4 h-[1px] bg-rose-200"></span>
                                 {bullet}
                               </li>
                             ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                 </div>
               </section>
               
               <div className="grid grid-cols-2 gap-20">
                  <section className="flex gap-12 items-start">
                    <div className="w-24 shrink-0 text-xs font-bold uppercase tracking-[0.4em] text-rose-300 pt-2 italic">Skills</div>
                    <div className="flex flex-wrap gap-x-6 gap-y-4">
                      {data.skills.map((skill, i) => (
                        <span key={i} className="text-lg font-bold italic text-[#8d6e63] hover:text-rose-400 cursor-default transition-colors">#{skill}</span>
                      ))}
                    </div>
                  </section>
                  
                  <section className="flex gap-12 items-start">
                    <div className="w-24 shrink-0 text-xs font-bold uppercase tracking-[0.4em] text-rose-300 pt-2 italic">Study</div>
                    <div className="space-y-6">
                       {data.education.map((edu, i) => (
                         <div key={i}>
                           <h4 className="text-md font-bold uppercase italic">{edu.degree}</h4>
                           <p className="text-sm text-[#8d6e63] italic">{edu.school} &bull; {edu.year}</p>
                         </div>
                       ))}
                    </div>
                  </section>
               </div>
            </div>
          </div>
        );

      case 'neon-bold':
        return (
          <div className="p-16 flex flex-col h-full font-sans bg-[#050505] text-white">
            <div className="relative mb-24 group">
               <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-3xl opacity-20 blur-xl group-hover:opacity-40 transition duration-1000"></div>
               <div className="relative bg-zinc-900 border border-zinc-800 p-16 rounded-3xl flex justify-between items-center overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-[80px]"></div>
                  <div>
                    <h1 className="text-7xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400 uppercase">{data.fullName}</h1>
                    <div className="inline-block px-4 py-1.5 bg-zinc-800 rounded-full border border-zinc-700">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">{data.jobTitle}</p>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="text-sm font-bold text-zinc-500 hover:text-cyan-400 transition-colors cursor-pointer">{data.email}</p>
                    <p className="text-sm font-bold text-zinc-500 hover:text-fuchsia-400 transition-colors cursor-pointer">{data.phone}</p>
                    <p className="text-sm font-bold text-zinc-400 italic">@{data.location.replace(/\s+/g, '').toLowerCase()}</p>
                  </div>
               </div>
            </div>
            
            <div className="grid grid-cols-12 gap-16 flex-1">
               <div className="col-span-8 space-y-20">
                  <section>
                    <h3 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.5em] mb-10 flex items-center gap-6"><span className="w-12 h-px bg-cyan-500/30"></span> Mission Control</h3>
                    <p className="text-xl font-medium leading-relaxed text-zinc-300 italic">" {data.summary} "</p>
                  </section>
                  
                  <section>
                    <h3 className="text-[10px] font-black text-fuchsia-500 uppercase tracking-[0.5em] mb-12 flex items-center gap-6"><span className="w-12 h-px bg-fuchsia-500/30"></span> Deployment Log</h3>
                    <div className="space-y-16">
                       {data.experience.map((exp, i) => (
                         <div key={i} className="relative pl-12 group">
                           <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-fuchsia-500/50 to-transparent"></div>
                           <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.8)] group-hover:scale-150 transition-transform"></div>
                           <div className="flex justify-between items-baseline mb-2">
                              <h4 className="text-3xl font-black tracking-tight text-white group-hover:text-fuchsia-400 transition-colors uppercase">{exp.role}</h4>
                              <span className="text-[10px] font-black text-zinc-600 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full uppercase tracking-widest">{exp.periodStart} // {exp.periodEnd}</span>
                           </div>
                           <p className="text-md font-bold text-cyan-400 mb-8 uppercase tracking-widest">{exp.company}</p>
                           <div className="grid grid-cols-1 gap-4">
                              {(exp.bullets || []).map((bullet, bIdx) => (
                                <div key={bIdx} className="p-5 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-colors">
                                  <p className="text-sm text-zinc-400 font-medium leading-relaxed lowercase normal-case">{bullet}</p>
                                </div>
                              ))}
                           </div>
                         </div>
                       ))}
                    </div>
                  </section>
               </div>
               
               <div className="col-span-4 space-y-20">
                  <section>
                    <h3 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.5em] mb-10 flex items-center gap-6"><span className="w-12 h-px bg-cyan-500/30"></span> Arsenal</h3>
                    <div className="grid grid-cols-2 gap-3">
                       {data.skills.map((skill, i) => (
                         <div key={i} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl text-center hover:bg-zinc-800 transition-colors group">
                           <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-cyan-400 transition-colors">{skill}</span>
                         </div>
                       ))}
                    </div>
                  </section>
                  
                  <section className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 p-10 rounded-[40px] relative overflow-hidden">
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl"></div>
                    <h3 className="text-[10px] font-black text-fuchsia-500 uppercase tracking-[0.5em] mb-10">Academy</h3>
                    <div className="space-y-8">
                       {data.education.map((edu, i) => (
                         <div key={i} className="relative">
                            <h4 className="text-sm font-black text-white leading-tight mb-2 uppercase tracking-wide">{edu.degree}</h4>
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">{edu.school}</p>
                            <p className="text-[10px] font-black text-cyan-400 uppercase italic">GRAD_{edu.year}</p>
                         </div>
                       ))}
                    </div>
                  </section>
               </div>
            </div>
          </div>
        );

      case 'ultra-minimal':
        return (
          <div className="p-24 flex flex-col h-full font-serif bg-white text-black">
            <header className="mb-24 flex justify-between items-end border-b border-black pb-12">
               <h1 className="text-8xl font-light tracking-tighter">{data.fullName}</h1>
               <div className="text-right text-xs font-medium tracking-[0.2em] uppercase space-y-1">
                 <p>{data.email}</p>
                 <p>{data.phone}</p>
                 <p>{data.location}</p>
               </div>
            </header>
            
            <div className="space-y-24 flex-1 max-w-5xl">
               <section className="grid grid-cols-12 gap-12">
                  <div className="col-span-4 text-[10px] font-bold uppercase tracking-[0.4em] pt-2">The Scope</div>
                  <div className="col-span-8 text-2xl font-light leading-relaxed italic opacity-70 border-l border-zinc-100 pl-12">{data.summary}</div>
               </section>
               
               <section className="grid grid-cols-12 gap-12">
                  <div className="col-span-4 text-[10px] font-bold uppercase tracking-[0.4em] pt-2">The Record</div>
                  <div className="col-span-8 space-y-16 border-l border-zinc-100 pl-12">
                    {data.experience.map((exp, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-baseline mb-6">
                           <h4 className="text-3xl font-light tracking-tight">{exp.role}</h4>
                           <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{exp.periodStart} &bull; {exp.periodEnd}</span>
                        </div>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] mb-8 text-zinc-400">{exp.company}</p>
                        <div className="space-y-4">
                           {(exp.bullets || []).map((bullet, bIdx) => (
                             <p key={bIdx} className="text-md leading-relaxed font-light text-zinc-500 italic lowercase normal-case">{bullet}</p>
                           ))}
                        </div>
                      </div>
                    ))}
                  </div>
               </section>
               
               <section className="grid grid-cols-12 gap-12">
                  <div className="col-span-4 text-[10px] font-bold uppercase tracking-[0.4em] pt-2">The Details</div>
                  <div className="col-span-8 grid grid-cols-2 gap-12 border-l border-zinc-100 pl-12">
                     <div>
                        <h5 className="text-[9px] font-bold uppercase tracking-[0.3em] mb-6 text-zinc-300">Proficiency</h5>
                        <div className="flex flex-wrap gap-x-8 gap-y-4 text-xs font-medium opacity-60">
                          {data.skills.map((skill, i) => (
                            <span key={i} className="uppercase tracking-widest leading-loose border-b border-zinc-50">{skill}</span>
                          ))}
                        </div>
                     </div>
                     <div>
                        <h5 className="text-[9px] font-bold uppercase tracking-[0.3em] mb-6 text-zinc-300">Foundation</h5>
                        <div className="space-y-6">
                           {data.education.map((edu, i) => (
                             <div key={i}>
                               <p className="text-xs font-bold leading-tight uppercase tracking-wider mb-1">{edu.degree}</p>
                               <p className="text-[10px] font-medium opacity-50 uppercase tracking-widest">{edu.year} // {edu.school}</p>
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </section>
            </div>
          </div>
        );

      case 'architecture-line':
        return (
          <div className="p-16 flex flex-col h-full font-sans bg-[#fbfbfb] text-[#1D1D1F]">
            <div className="relative mb-24 grid grid-cols-12 gap-0 border-t border-black pt-12">
               <div className="col-span-9">
                  <h1 className="text-7xl font-bold tracking-tight mb-4">{data.fullName}</h1>
                  <p className="text-lg font-medium opacity-40 uppercase tracking-[0.4em]">{data.jobTitle} &nbsp; / &nbsp; {data.location}</p>
               </div>
               <div className="col-span-3 text-right flex flex-col justify-between items-end h-full">
                  <div className="w-8 h-8 bg-black"></div>
                  <div className="text-[10px] font-bold leading-relaxed opacity-40 uppercase tracking-[0.2em] pr-2 border-r-2 border-black/5">
                    <p>{data.email}</p>
                    <p>{data.phone}</p>
                  </div>
               </div>
            </div>
            
            <div className="grid grid-cols-12 gap-0 flex-1 border-t border-black/10">
               <div className="col-span-4 border-r border-black/10 p-12 pl-0">
                  <section className="mb-20">
                     <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-12">Statement</h3>
                     <p className="text-sm font-medium leading-[1.8] opacity-60 normal-case lowercase">{data.summary}</p>
                  </section>
                  
                  <section className="mb-20">
                     <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-12">System</h3>
                     <div className="grid grid-cols-1 gap-2">
                        {data.skills.map((skill, i) => (
                          <div key={i} className="group flex justify-between items-center py-2 border-b border-black/5 hover:border-black/20 transition-colors">
                            <span className="text-xs font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">{skill}</span>
                            <span className="text-[8px] font-black opacity-10">/0{i+1}</span>
                          </div>
                        ))}
                     </div>
                  </section>
                  
                  <section>
                     <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-12">History</h3>
                     <div className="space-y-8">
                        {data.education.map((edu, i) => (
                           <div key={i}>
                              <p className="text-xs font-bold leading-tight uppercase mb-2 tracking-wide">{edu.degree}</p>
                              <p className="text-[9px] font-bold opacity-30 uppercase tracking-[0.2em]">{edu.school} &nbsp; // &nbsp; {edu.year}</p>
                           </div>
                        ))}
                     </div>
                  </section>
               </div>
               
               <div className="col-span-8 p-12 pr-0">
                  <section>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-12 flex justify-between">Experience <span>#_LIST_V2</span></h3>
                    <div className="space-y-16">
                       {data.experience.map((exp, i) => (
                         <div key={i} className="group">
                           <div className="flex justify-between items-start mb-6 border-b border-black/5 pb-4 group-hover:border-black transition-colors duration-500">
                              <div>
                                 <h4 className="text-2xl font-bold tracking-tight mb-2">{exp.role}</h4>
                                 <p className="text-xs font-bold opacity-30 uppercase tracking-[0.3em]">{exp.company}</p>
                              </div>
                              <span className="text-[9px] font-black opacity-40 group-hover:opacity-100 transition-opacity uppercase tracking-widest">{exp.periodStart} . {exp.periodEnd}</span>
                           </div>
                           <div className="grid grid-cols-1 gap-4">
                              {(exp.bullets || []).map((bullet, bIdx) => (
                                <div key={bIdx} className="flex gap-8 group/item">
                                   <div className="text-[9px] font-bold opacity-20 group-hover/item:opacity-100 transition-opacity">.{bIdx+1}</div>
                                   <p className="text-xs font-medium leading-[1.8] opacity-50 group-hover/item:opacity-100 transition-opacity hover:italic lowercase normal-case">{bullet}</p>
                                </div>
                              ))}
                           </div>
                         </div>
                       ))}
                    </div>
                  </section>
               </div>
            </div>
          </div>
        );

      case 'typo-pure':
        return (
          <div className="p-20 flex flex-col h-full font-serif bg-white text-zinc-900 leading-normal">
            <header className="mb-24 flex flex-col items-center text-center">
               <h1 className="text-[100px] font-bold leading-none tracking-tighter mb-8 -ml-1 uppercase">{data.fullName.split(' ')[1] || data.fullName}</h1>
               <div className="flex items-center gap-12 text-sm font-bold uppercase tracking-[0.4em] text-zinc-300">
                  <span>{data.jobTitle}</span>
                  <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                  <span>{data.location}</span>
               </div>
               <div className="mt-8 flex gap-8 text-[11px] font-bold text-zinc-400 normal-case italic">
                  <span>{data.email}</span>
                  <span>{data.phone}</span>
               </div>
            </header>
            
            <div className="grid grid-cols-12 gap-16 flex-1">
               <section className="col-span-12 border-y border-zinc-100 py-12 mb-12">
                  <div className="max-w-4xl mx-auto text-4xl font-medium tracking-tight leading-[1.3] text-zinc-800 text-center italic opacity-80">
                    "{data.summary}"
                  </div>
               </section>
               
               <div className="col-span-8 space-y-24 border-r border-zinc-50 pr-16">
                  <section>
                     <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-200 mb-12">Employment Record</h3>
                     <div className="space-y-20">
                        {data.experience.map((exp, i) => (
                          <div key={i}>
                             <div className="flex justify-between items-baseline mb-6 border-b border-zinc-50 pb-4">
                               <h4 className="text-3xl font-bold tracking-tight">{exp.role}</h4>
                               <span className="text-xs font-bold text-zinc-300 italic">{exp.periodStart}—{exp.periodEnd}</span>
                             </div>
                             <p className="text-sm font-bold uppercase tracking-[0.3em] text-indigo-600 mb-8">{exp.company}</p>
                             <div className="space-y-6">
                                {(exp.bullets || []).map((bullet, bIdx) => (
                                  <p key={bIdx} className="text-lg leading-relaxed font-serif italic text-zinc-500 max-w-2xl lowercase normal-case">{bullet}</p>
                                ))}
                             </div>
                          </div>
                        ))}
                     </div>
                  </section>
               </div>
               
               <div className="col-span-4 space-y-20">
                  <section>
                     <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-200 mb-10">Competencies</h3>
                     <div className="grid grid-cols-1 gap-4">
                        {data.skills.map((skill, i) => (
                          <p key={i} className="text-sm font-bold uppercase tracking-[0.1em] text-zinc-700 hover:text-indigo-600 cursor-default transition-colors">{skill}</p>
                        ))}
                     </div>
                  </section>
                  
                  <section>
                     <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-200 mb-10">Academy</h3>
                     <div className="space-y-10">
                        {data.education.map((edu, i) => (
                          <div key={i} className="border-l-2 border-indigo-50 pl-6">
                             <h4 className="text-md font-bold leading-tight mb-2 italic">{edu.degree}</h4>
                             <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">{edu.school}</p>
                             <p className="text-[10px] font-black text-indigo-400 uppercase tracking-tighter">Graduated {edu.year}</p>
                          </div>
                        ))}
                     </div>
                  </section>
               </div>
            </div>
          </div>
        );

      case 'marketing-bold':
        return (
          <div className="p-16 flex flex-col h-full font-sans bg-white border-8 border-[#ff4e50]">
            <div className="bg-[#ff4e50] text-white p-12 -mx-16 -mt-16 mb-12 flex justify-between items-center rounded-b-[40px] shadow-lg">
              <div className="flex items-center gap-8">
                {data.photo && (
                  <div className="size-28 rounded-full border-4 border-white shadow-xl overflow-hidden shrink-0">
                    <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                )}
                <div>
                  <h1 className="text-5xl font-black uppercase tracking-tight mb-2 drop-shadow-md">{data.fullName}</h1>
                  <p className="text-2xl font-bold text-[#ffd3d4] tracking-wider">{data.jobTitle}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-12 flex-1">
              <div className="col-span-2 space-y-10">
                <section>
                  <h3 className="text-2xl font-black text-[#ff4e50] mb-4 uppercase tracking-widest flex items-center gap-3">
                    <span className="w-8 h-2 bg-[#ff4e50]"></span> Impact
                  </h3>
                  <p className="text-lg text-slate-700 leading-relaxed font-medium">{data.summary}</p>
                </section>
                
                <section>
                  <h3 className="text-2xl font-black text-[#ff4e50] mb-6 uppercase tracking-widest flex items-center gap-3">
                    <span className="w-8 h-2 bg-[#ff4e50]"></span> Experience
                  </h3>
                  <div className="space-y-10">
                    {data.experience.map((exp, i) => (
                      <div key={i} className="relative p-6 bg-slate-50 border-l-4 border-[#ff4e50] rounded-r-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-baseline mb-2">
                          <h4 className="text-xl font-black text-slate-900">{exp.role}</h4>
                          <span className="text-xs font-bold text-white bg-[#ff4e50] px-3 py-1 rounded-full">{exp.periodStart} - {exp.periodEnd}</span>
                        </div>
                        <p className="text-md font-bold text-[#ff4e50] mb-4">{exp.company}</p>
                        <ul className="space-y-2 mt-3">
                          {(exp.bullets || []).map((bullet, bIdx) => (
                            <li key={bIdx} className="text-sm text-slate-600 font-medium flex gap-3 items-start">
                              <span className="text-[#ff4e50] mt-1 text-lg leading-none">&bull;</span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="space-y-10 border-l-2 border-slate-100 pl-8">
                <section>
                  <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-widest">Connect</h3>
                  <div className="space-y-4 text-sm font-bold text-slate-600">
                    <p className="flex items-center gap-3"><span className="w-6 h-6 rounded bg-[#ff4e50]/20 text-[#ff4e50] flex items-center justify-center material-symbols-outlined text-[14px]">mail</span> {data.email}</p>
                    <p className="flex items-center gap-3"><span className="w-6 h-6 rounded bg-[#ff4e50]/20 text-[#ff4e50] flex items-center justify-center material-symbols-outlined text-[14px]">call</span> {data.phone}</p>
                    <p className="flex items-center gap-3"><span className="w-6 h-6 rounded bg-[#ff4e50]/20 text-[#ff4e50] flex items-center justify-center material-symbols-outlined text-[14px]">location_on</span> {data.location}</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-widest">Toolkit</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg uppercase tracking-wider hover:bg-[#ff4e50] transition-colors">{skill}</span>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-widest">Education</h3>
                  <div className="space-y-6">
                    {data.education.map((edu, i) => (
                      <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <h4 className="font-black text-slate-900 leading-tight uppercase mb-1">{edu.degree}</h4>
                        <p className="text-sm font-bold text-[#ff4e50]">{edu.school}</p>
                        <p className="text-xs font-bold text-slate-400 mt-2 bg-white inline-block px-2 py-0.5 rounded border border-slate-200">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        );

      case 'sales-closer':
        return (
          <div className="p-16 flex flex-col h-full font-sans bg-[#f4f7f6] text-[#2c3e50]">
            <header className="mb-12 border-b-4 border-[#3498db] pb-8 flex justify-between items-end">
              <div>
                <h1 className="text-6xl font-black tracking-tighter uppercase mb-2 text-[#2c3e50]">{data.fullName}</h1>
                <p className="text-3xl font-bold text-[#3498db] uppercase tracking-wide">{data.jobTitle}</p>
              </div>
            </header>
            
            <div className="flex bg-white shadow-xl rounded-2xl overflow-hidden mb-8 border border-slate-200">
              <div className="w-1/3 bg-[#3498db] p-8 text-white flex flex-col justify-center">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] opacity-80 mb-2">Executive Summary</h3>
                <p className="text-lg font-medium leading-relaxed italic">"{data.summary}"</p>
              </div>
              <div className="w-2/3 p-8 flex flex-col justify-center space-y-4 bg-slate-900 text-white">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="block text-[10px] font-black tracking-widest text-slate-400 uppercase mb-1">Email</span>
                    <span className="text-sm font-bold">{data.email}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-black tracking-widest text-slate-400 uppercase mb-1">Phone</span>
                    <span className="text-sm font-bold">{data.phone}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-black tracking-widest text-slate-400 uppercase mb-1">Location</span>
                    <span className="text-sm font-bold">{data.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-2xl font-black uppercase tracking-widest mb-8 border-b-2 border-slate-200 pb-2 flex items-center gap-3">
                 Experience
              </h3>
              <div className="space-y-10">
                {data.experience.map((exp, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-2xl font-black text-[#2c3e50]">{exp.role}</h4>
                      <span className="text-sm font-black text-[#3498db] bg-[#3498db]/10 px-3 py-1 rounded uppercase tracking-wider">{exp.periodStart} - {exp.periodEnd}</span>
                    </div>
                    <p className="text-lg font-bold text-[#7f8c8d] mb-4 uppercase tracking-wide">{exp.company}</p>
                    <div className="grid grid-cols-1 gap-3">
                      {(exp.bullets || []).map((bullet, bIdx) => (
                        <div key={bIdx} className="flex gap-4 p-4 bg-white rounded-lg shadow-sm border border-slate-100 items-start">
                          <span className="text-[#3498db] text-xl font-black mt-[-4px]">&rarr;</span>
                          <p className="text-sm font-medium text-slate-700">{bullet}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-12 mt-12">
                <section>
                  <h3 className="text-xl font-black uppercase tracking-widest mb-6 border-b-2 border-slate-200 pb-2">Core Competencies</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill, i) => (
                      <span key={i} className="px-4 py-2 bg-white text-[#2c3e50] border border-[#3498db] text-xs font-black rounded-lg shadow-sm hover:bg-[#3498db] hover:text-white transition-colors">{skill}</span>
                    ))}
                  </div>
                </section>
                <section>
                  <h3 className="text-xl font-black uppercase tracking-widest mb-6 border-b-2 border-slate-200 pb-2">Education</h3>
                  <div className="space-y-4">
                    {data.education.map((edu, i) => (
                      <div key={i} className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm border border-slate-100">
                        <div>
                          <h4 className="font-black text-[#2c3e50] uppercase tracking-wide">{edu.degree}</h4>
                          <p className="text-sm font-bold text-[#7f8c8d]">{edu.school}</p>
                        </div>
                        <span className="text-sm font-black text-white bg-[#3498db] px-3 py-1 rounded">{edu.year}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        );

      case 'brand-strategist':
        return (
          <div className="flex flex-col h-full font-serif bg-[#fdfaf6] text-[#333333] p-16">
            <header className="mb-16 text-center max-w-3xl mx-auto">
              {data.photo && (
                <div className="size-32 mx-auto rounded-full overflow-hidden mb-8 shadow-2xl ring-4 ring-offset-4 ring-[#d4af37]">
                  <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
                </div>
              )}
              <h1 className="text-5xl font-light tracking-[0.2em] uppercase mb-4 text-[#111111]">{data.fullName}</h1>
              <p className="text-xl italic text-[#777777] mb-8">{data.jobTitle}</p>
              <div className="flex items-center justify-center gap-6 text-xs font-bold tracking-widest uppercase text-[#555555]">
                <span className="border-b border-[#333333] pb-1">{data.email}</span>
                <span className="border-b border-[#333333] pb-1">{data.phone}</span>
                <span className="border-b border-[#333333] pb-1">{data.location}</span>
              </div>
            </header>

            <div className="grid grid-cols-12 gap-16 flex-1">
              <div className="col-span-4 space-y-16">
                <section>
                  <h3 className="text-sm font-bold uppercase tracking-[0.3em] mb-6 text-[#111111]">Vision</h3>
                  <p className="text-md leading-loose text-justify italic text-[#555555]">{data.summary}</p>
                </section>
                <section>
                  <h3 className="text-sm font-bold uppercase tracking-[0.3em] mb-6 text-[#111111]">Expertise</h3>
                  <div className="space-y-4">
                    {data.skills.map((skill, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="h-px w-6 bg-[#d4af37]"></div>
                        <span className="text-sm font-medium tracking-wide uppercase">{skill}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="col-span-8 space-y-12 border-l border-[#eaeaea] pl-16">
                <section>
                  <h3 className="text-sm font-bold uppercase tracking-[0.3em] mb-10 text-[#111111]">Professional Journey</h3>
                  <div className="space-y-12">
                    {data.experience.map((exp, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-baseline mb-2">
                          <h4 className="text-2xl font-light text-[#111111]">{exp.role}</h4>
                          <span className="text-xs font-bold tracking-widest text-[#999999] uppercase">{exp.periodStart} - {exp.periodEnd}</span>
                        </div>
                        <p className="text-sm font-bold tracking-widest uppercase text-[#d4af37] mb-6">{exp.company}</p>
                        <div className="space-y-4">
                          {(exp.bullets || []).map((bullet, bIdx) => (
                            <p key={bIdx} className="text-sm leading-loose text-[#555555] text-justify">{bullet}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        );

      case 'startup-pitch':
        return (
          <div className="p-16 flex flex-col h-full font-sans bg-white">
            <header className="mb-12 flex justify-between items-center pb-8 border-b-[6px] border-[#6c5ce7]">
              <div>
                <h1 className="text-7xl font-black tracking-tighter text-slate-900 mb-2">{data.fullName}</h1>
                <div className="inline-block bg-[#6c5ce7] text-white px-4 py-2 rounded-xl text-xl font-bold tracking-wide shadow-lg shadow-indigo-200">
                  {data.jobTitle}
                </div>
              </div>
              <div className="text-right space-y-2 text-sm font-bold text-slate-500">
                <p className="flex items-center justify-end gap-2"><span className="material-symbols-outlined text-lg text-[#6c5ce7]">alternate_email</span> {data.email}</p>
                <p className="flex items-center justify-end gap-2"><span className="material-symbols-outlined text-lg text-[#6c5ce7]">phone_iphone</span> {data.phone}</p>
                <p className="flex items-center justify-end gap-2"><span className="material-symbols-outlined text-lg text-[#6c5ce7]">pin_drop</span> {data.location}</p>
              </div>
            </header>

            <section className="mb-12 bg-slate-50 p-8 rounded-3xl border border-slate-200">
              <h3 className="text-sm font-black uppercase tracking-widest text-[#6c5ce7] mb-4">Elevator Pitch</h3>
              <p className="text-xl font-medium leading-relaxed text-slate-700">{data.summary}</p>
            </section>

            <div className="grid grid-cols-12 gap-12 flex-1">
              <div className="col-span-8 space-y-12">
                <section>
                  <h3 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-4">
                    <span className="bg-[#6c5ce7] w-10 h-10 rounded-full flex items-center justify-center text-white text-lg">💡</span>
                    Traction & Experience
                  </h3>
                  <div className="space-y-8">
                    {data.experience.map((exp, i) => (
                      <div key={i} className="pl-6 border-l-[3px] border-slate-200 relative">
                        <div className="absolute w-4 h-4 rounded-full bg-white border-4 border-[#6c5ce7] left-[-9.5px] top-2"></div>
                        <div className="flex justify-between items-baseline mb-2">
                          <h4 className="text-2xl font-black text-slate-900">{exp.role}</h4>
                          <span className="text-xs font-black bg-slate-100 text-slate-500 px-3 py-1 rounded-full">{exp.periodStart} &mdash; {exp.periodEnd}</span>
                        </div>
                        <p className="text-lg font-bold text-[#6c5ce7] mb-4">{exp.company}</p>
                        <ul className="space-y-3">
                          {(exp.bullets || []).map((bullet, bIdx) => (
                            <li key={bIdx} className="text-md text-slate-600 font-medium flex gap-3">
                              <span className="text-slate-300 mt-1">►</span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="col-span-4 space-y-12">
                <section>
                  <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                    <span className="bg-[#00cec9] w-8 h-8 rounded-full flex items-center justify-center text-white text-sm">⚡</span>
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill, i) => (
                      <span key={i} className="px-4 py-2 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm">{skill}</span>
                    ))}
                  </div>
                </section>
                
                <section>
                  <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                    <span className="bg-[#fdcb6e] w-8 h-8 rounded-full flex items-center justify-center text-white text-sm">🎓</span>
                    Education
                  </h3>
                  <div className="space-y-4">
                    {data.education.map((edu, i) => (
                      <div key={i} className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                        <h4 className="font-black text-slate-900">{edu.degree}</h4>
                        <p className="text-sm font-bold text-slate-500 my-1">{edu.school}</p>
                        <span className="text-xs font-black text-white bg-[#6c5ce7] px-2 py-1 rounded-md">{edu.year}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        );

      case 'developer-terminal':
        return (
          <div className="p-12 flex flex-col h-full font-mono bg-[#0d1117] text-[#c9d1d9] border-12 border-[#161b22]">
            <div className="flex items-center gap-2 mb-6 px-4 py-2 bg-[#161b22] rounded-t-lg">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              <span className="ml-4 text-xs font-bold text-[#8b949e]">bash - {data.fullName.toLowerCase().replace(' ', '_')} - 80x24</span>
            </div>
            
            <div className="flex-1 overflow-auto px-4 space-y-6">
              <div className="mb-8">
                <span className="text-[#7ee787] font-bold">➜</span> <span className="text-[#79c0ff] font-bold">~</span> <span className="text-white">whoami</span>
                <div className="mt-2 text-[#58a6ff] text-xl font-bold">{data.fullName}</div>
                <div className="text-[#8b949e]">{data.jobTitle}</div>
                <div className="text-[#8b949e]">{data.location} | {data.email} | {data.phone}</div>
              </div>

              <div className="mb-8">
                <span className="text-[#7ee787] font-bold">➜</span> <span className="text-[#79c0ff] font-bold">~</span> <span className="text-white">cat profile.txt</span>
                <div className="mt-2 text-[#c9d1d9] leading-relaxed">
                  "{data.summary}"
                </div>
              </div>

              <div className="mb-8">
                <span className="text-[#7ee787] font-bold">➜</span> <span className="text-[#79c0ff] font-bold">~</span> <span className="text-white">ls -la experience/</span>
                <div className="mt-4 space-y-6">
                  {data.experience.map((exp, i) => (
                    <div key={i} className="border-l-2 border-[#30363d] pl-4">
                      <div className="text-[#a5d6ff] font-bold">{exp.role} @ <span className="text-[#ff7b72]">{exp.company}</span></div>
                      <div className="text-[#8b949e] text-xs mb-2">[{exp.periodStart} - {exp.periodEnd}]</div>
                      <div className="space-y-1">
                        {(exp.bullets || []).map((bullet, bIdx) => (
                          <div key={bIdx} className="flex gap-2">
                            <span className="text-[#d2a8ff]">-</span>
                            <span className="text-[#c9d1d9] text-sm">{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[#7ee787] font-bold">➜</span> <span className="text-[#79c0ff] font-bold">~</span> <span className="text-white">echo $SKILLS</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {data.skills.map((skill, i) => (
                    <span key={i} className="text-[#3fb950] bg-[#238636]/10 px-2 py-1 rounded text-sm font-bold border border-[#238636]/30">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center">
                <span className="text-[#7ee787] font-bold">➜</span> <span className="text-[#79c0ff] font-bold">~</span> <span className="ml-2 w-2 h-5 bg-white animate-pulse"></span>
              </div>
            </div>
          </div>
        );

      case 'product-manager':
        return (
          <div className="p-16 flex flex-col h-full font-sans bg-white text-slate-800">
            <header className="flex justify-between items-center pb-8 border-b-2 border-slate-200 mb-10">
              <div className="flex gap-8 items-center">
                {data.photo && (
                  <div className="size-24 rounded-2xl overflow-hidden shadow-md shrink-0">
                    <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                )}
                <div>
                  <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-1">{data.fullName}</h1>
                  <h2 className="text-xl font-bold text-emerald-600">{data.jobTitle}</h2>
                </div>
              </div>
              <div className="flex flex-col gap-2 scale-90 origin-right">
                <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl text-sm font-bold border border-slate-100">
                  <span className="text-emerald-500 material-symbols-outlined text-[18px]">email</span> {data.email}
                </div>
                <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl text-sm font-bold border border-slate-100">
                  <span className="text-emerald-500 material-symbols-outlined text-[18px]">phone</span> {data.phone}
                </div>
              </div>
            </header>

            <div className="grid grid-cols-12 gap-12 flex-1">
              <div className="col-span-8 flex flex-col gap-10">
                <section>
                  <h3 className="text-lg font-black uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-2 h-6 bg-emerald-500 rounded-full"></div> Product Vision
                  </h3>
                  <p className="text-md leading-relaxed text-slate-600 font-medium bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">{data.summary}</p>
                </section>
                
                <section>
                  <h3 className="text-lg font-black uppercase tracking-widest text-slate-900 mb-6 flex items-center gap-2">
                    <div className="w-2 h-6 bg-emerald-500 rounded-full"></div> Execution & Impact
                  </h3>
                  <div className="space-y-8">
                    {data.experience.map((exp, i) => (
                      <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-xl font-black text-slate-900">{exp.role}</h4>
                            <p className="text-md font-bold text-emerald-600 mt-1">{exp.company}</p>
                          </div>
                          <span className="text-xs font-black uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">{exp.periodStart} - {exp.periodEnd}</span>
                        </div>
                        <ul className="space-y-3">
                          {(exp.bullets || []).map((bullet, bIdx) => (
                            <li key={bIdx} className="flex gap-3 text-sm text-slate-600 font-medium">
                              <span className="text-emerald-500 mt-1">✓</span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="col-span-4 flex flex-col gap-10">
                <section>
                  <h3 className="text-lg font-black uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-2 h-6 bg-emerald-500 rounded-full"></div> Product Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-sm">{skill}</span>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-black uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-2 h-6 bg-emerald-500 rounded-full"></div> Education
                  </h3>
                  <div className="space-y-4">
                    {data.education.map((edu, i) => (
                      <div key={i} className="relative pl-4 border-l-2 border-slate-200">
                        <div className="absolute w-2 h-2 rounded-full bg-emerald-500 -left-[5px] top-1.5"></div>
                        <h4 className="font-black text-slate-900">{edu.degree}</h4>
                        <p className="text-sm text-slate-600 font-medium my-1">{edu.school}</p>
                        <p className="text-xs font-bold text-emerald-600">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </section>
                
                {data.projects && data.projects.length > 0 && (
                  <section>
                    <h3 className="text-lg font-black uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-2">
                      <div className="w-2 h-6 bg-emerald-500 rounded-full"></div> Key Features
                    </h3>
                    <div className="space-y-4">
                      {data.projects.map((proj, i) => (
                        <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <h4 className="font-black text-slate-900 mb-1">{proj.name}</h4>
                          <p className="text-sm font-medium text-slate-600 line-clamp-3">{proj.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        );

      case 'data-storyteller':
        return (
          <div className="p-16 flex flex-col h-full font-serif bg-[#fbfbfb] text-[#1a1a1a]">
            <header className="border-b-[1px] border-[#1a1a1a] pb-10 mb-12 flex justify-between items-baseline">
              <div>
                <h1 className="text-6xl font-light tracking-tight mb-2">{data.fullName}</h1>
                <p className="text-2xl italic font-serif text-[#0066cc]">{data.jobTitle}</p>
              </div>
              <div className="text-right text-sm space-y-2 font-sans font-medium tracking-wide text-[#4a4a4a]">
                <p>{data.location}</p>
                <p>{data.email}</p>
                <p>{data.phone}</p>
              </div>
            </header>

            <div className="grid grid-cols-12 gap-16 flex-1">
              <div className="col-span-5 space-y-12 pr-8 border-r-[1px] border-[#e0e0e0]">
                <section>
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-4 text-[#1a1a1a]">
                    <span className="w-full h-px bg-[#e0e0e0] flex-1"></span>
                    Summary
                  </h3>
                  <p className="text-lg leading-[1.8] text-justify font-serif text-[#333] drop-cap">{data.summary}</p>
                </section>

                <section>
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-4 text-[#1a1a1a]">
                    <span className="w-full h-px bg-[#e0e0e0] flex-1"></span>
                    Skills Matrix
                  </h3>
                  <div className="flex flex-wrap gap-x-6 gap-y-3 font-sans">
                    {data.skills.map((skill, i) => (
                      <span key={i} className="text-sm font-bold bg-[#f0f5ff] text-[#0066cc] px-3 py-1 rounded-full">{skill}</span>
                    ))}
                  </div>
                </section>
              </div>

              <div className="col-span-7 space-y-12">
                <section>
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 text-[#1a1a1a] border-b-[1px] border-[#1a1a1a] pb-2 inline-block">
                    Professional Timeline
                  </h3>
                  <div className="space-y-12">
                    {data.experience.map((exp, i) => (
                      <div key={i} className="relative">
                        <div className="flex justify-between items-baseline mb-2">
                          <h4 className="text-2xl font-medium text-[#1a1a1a]">{exp.role}</h4>
                          <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#777]">{exp.periodStart} &mdash; {exp.periodEnd}</span>
                        </div>
                        <p className="text-md font-sans font-bold text-[#0066cc] uppercase tracking-wider mb-4">{exp.company}</p>
                        <ol className="list-decimal pl-5 space-y-3 font-serif text-[15px] leading-relaxed text-[#333] marker:text-[#0066cc] marker:font-bold">
                          {(exp.bullets || []).map((bullet, bIdx) => (
                            <li key={bIdx} className="pl-2">{bullet}</li>
                          ))}
                        </ol>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        );

      case 'engineering-blueprint':
        return (
          <div className="p-16 flex flex-col h-full font-mono bg-[#0c182a] text-[#71b4e1] border-[12px] border-[#182845] relative overflow-hidden">
            {/* Blueprint Grid Background */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#396191 1px, transparent 1px), linear-gradient(90deg, #396191 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <header className="border-4 border-[#396191] p-8 mb-8 flex justify-between items-center bg-[#0c182a]/80 backdrop-blur-sm">
                <div>
                  <h2 className="text-sm font-bold tracking-[0.3em] mb-2 uppercase text-[#aaddff]">Prj: ENG-RESUME-01</h2>
                  <h1 className="text-5xl font-black uppercase tracking-tighter text-white mb-2">{data.fullName}</h1>
                  <p className="text-2xl font-bold">{data.jobTitle}</p>
                </div>
                <div className="text-right border-l-2 border-[#396191] pl-8 space-y-2 font-bold text-sm tracking-widest uppercase">
                  <p>LOC: {data.location}</p>
                  <p>COM: {data.email}</p>
                  <p>TEL: {data.phone}</p>
                </div>
              </header>

              <div className="grid grid-cols-2 gap-8 flex-1">
                <div className="space-y-8 flex flex-col">
                  <section className="border-2 border-[#396191] p-6 bg-[#0c182a]/80 backdrop-blur-sm">
                    <h3 className="text-lg font-black uppercase tracking-[0.2em] mb-4 text-white border-b-2 border-[#396191] pb-2">Specification</h3>
                    <p className="leading-relaxed text-justify">{data.summary}</p>
                  </section>
                  
                  <section className="border-2 border-[#396191] p-6 bg-[#0c182a]/80 backdrop-blur-sm flex-1">
                    <h3 className="text-lg font-black uppercase tracking-[0.2em] mb-6 text-white border-b-2 border-[#396191] pb-2">Technical Execution</h3>
                    <div className="space-y-8">
                      {data.experience.map((exp, i) => (
                        <div key={i}>
                          <div className="flex justify-between mb-1">
                            <h4 className="text-xl font-black text-white">{exp.role}</h4>
                            <span className="text-sm font-bold bg-[#396191] text-white px-2 py-1">[{exp.periodStart}-{exp.periodEnd}]</span>
                          </div>
                          <p className="text-md font-bold mb-3 uppercase tracking-wider">{exp.company}</p>
                          <ul className="space-y-2 pl-4 border-l-2 border-[#396191]">
                            {(exp.bullets || []).map((bullet, bIdx) => (
                              <li key={bIdx} className="text-sm leading-relaxed before:content-['>_'] before:mr-2 before:font-black">
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <div className="space-y-8 flex flex-col">
                  <section className="border-2 border-[#396191] p-6 bg-[#0c182a]/80 backdrop-blur-sm">
                    <h3 className="text-lg font-black uppercase tracking-[0.2em] mb-6 text-white border-b-2 border-[#396191] pb-2">Component Stack</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {data.skills.map((skill, i) => (
                        <div key={i} className="border border-[#396191] p-2 text-center text-sm font-bold uppercase truncate hover:bg-[#396191] hover:text-white transition-colors">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </section>
                  
                  <section className="border-2 border-[#396191] p-6 bg-[#0c182a]/80 backdrop-blur-sm flex-1">
                    <h3 className="text-lg font-black uppercase tracking-[0.2em] mb-6 text-white border-b-2 border-[#396191] pb-2">Academic Foundation</h3>
                    <div className="space-y-6">
                      {data.education.map((edu, i) => (
                        <div key={i} className="space-y-1">
                          <h4 className="font-black text-white text-lg uppercase">{edu.degree}</h4>
                          <div className="flex justify-between items-center border-b border-dashed border-[#396191] pb-2">
                            <p className="font-bold">{edu.school}</p>
                            <span className="font-bold">[{edu.year}]</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        );

      case 'app-developer':
        return (
          <div className="p-10 flex justify-center items-center h-full bg-[#e2e8f0]">
            {/* iPhone Frame Simulator */}
            <div className="w-[450px] h-[900px] bg-white rounded-[50px] shadow-2xl overflow-hidden border-[12px] border-slate-900 relative flex flex-col font-sans mb-8">
              {/* Notch */}
              <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50">
                <div className="w-32 h-6 bg-slate-900 rounded-b-3xl"></div>
              </div>
              
              <div className="flex-1 overflow-y-auto w-full scrollbar-hide pt-12 pb-8 bg-slate-50">
                <div className="px-6 mb-8 text-center">
                  {data.photo && (
                    <div className="size-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-white shadow-xl">
                      <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">{data.fullName}</h1>
                  <p className="text-sm font-bold text-blue-500 mt-1 uppercase tracking-widest">{data.jobTitle}</p>
                </div>

                <div className="px-6 mb-8 flex justify-center gap-4">
                  <div className="flex flex-col items-center gap-1 w-16">
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-500"><span className="material-symbols-outlined">mail</span></div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Email</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 w-16">
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-emerald-500"><span className="material-symbols-outlined">call</span></div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Call</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 w-16">
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-rose-500"><span className="material-symbols-outlined">map</span></div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Loc</span>
                  </div>
                </div>

                <div className="px-6 space-y-8">
                  <section className="bg-white p-6 rounded-3xl shadow-sm">
                    <h3 className="text-lg font-black text-slate-900 mb-3">About</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{data.summary}</p>
                  </section>

                  <section>
                    <h3 className="text-xl font-black text-slate-900 mb-4 px-2">Experience</h3>
                    <div className="space-y-4">
                      {data.experience.map((exp, i) => (
                        <div key={i} className="bg-white p-5 rounded-3xl shadow-sm">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="font-black text-slate-900 text-md truncate pr-2">{exp.role}</h4>
                            <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-2 py-1 rounded-full shrink-0">{exp.periodEnd}</span>
                          </div>
                          <p className="text-xs font-bold text-blue-500 mb-3">{exp.company}</p>
                          <ul className="space-y-2 text-xs text-slate-600 font-medium">
                            {(exp.bullets || []).map((bullet, bIdx) => (
                              <li key={bIdx} className="flex gap-2">
                                <span className="text-blue-500 mt-[2px]">•</span>
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>
                  
                  <section>
                    <h3 className="text-xl font-black text-slate-900 mb-4 px-2">Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.map((skill, i) => (
                        <span key={i} className="bg-white border border-slate-100 px-4 py-2 text-xs font-bold text-slate-700 rounded-2xl shadow-sm">{skill}</span>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
            {/* Prevent it from taking entire space so PDF render doesn't break, keep height auto inside */}
          </div>
        );

      case 'cyber-neon':
        return (
          <div className="p-16 flex flex-col h-full font-mono bg-[#0b0c10] text-[#c5c6c7]">
            <header className="border-b-[4px] border-[#66fcf1] pb-10 mb-12 flex justify-between items-end relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#66fcf1] blur-[100px] opacity-20 pointer-events-none"></div>
              <div>
                <h1 className="text-6xl font-black uppercase tracking-widest text-white mb-2 drop-shadow-[0_0_10px_rgba(102,252,241,0.5)]">{data.fullName}</h1>
                <p className="text-2xl font-bold text-[#66fcf1] uppercase tracking-[0.3em]">{data.jobTitle}</p>
              </div>
              <div className="text-right space-y-2 text-sm font-bold uppercase tracking-widest text-[#45a29e]">
                <p>{data.email}</p>
                <p>{data.phone}</p>
                <p>{data.location}</p>
              </div>
            </header>

            <div className="grid grid-cols-12 gap-12 flex-1">
              <div className="col-span-4 space-y-12">
                <section>
                  <h3 className="text-xl font-black uppercase tracking-widest text-[#66fcf1] mb-6 flex items-center gap-4">
                    <span className="w-12 h-[2px] bg-[#66fcf1] shadow-[0_0_5px_#66fcf1]"></span> Profile
                  </h3>
                  <p className="text-md leading-loose font-medium text-justify">{data.summary}</p>
                </section>

                <section>
                  <h3 className="text-xl font-black uppercase tracking-widest text-[#66fcf1] mb-6 flex items-center gap-4">
                    <span className="w-12 h-[2px] bg-[#66fcf1] shadow-[0_0_5px_#66fcf1]"></span> Skills
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {data.skills.map((skill, i) => (
                      <div key={i} className="flex items-center gap-3 bg-[#1f2833] p-3 border-l-4 border-[#66fcf1]">
                        <span className="text-sm font-bold uppercase tracking-widest text-white">{skill}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="col-span-8 space-y-12 border-l border-[#1f2833] pl-12 relative">
                <div className="absolute bottom-0 left-0 w-32 h-64 bg-[#45a29e] blur-[120px] opacity-10 pointer-events-none"></div>
                <section>
                  <h3 className="text-xl font-black uppercase tracking-widest text-[#66fcf1] mb-8 flex items-center gap-4">
                    <span className="w-12 h-[2px] bg-[#66fcf1] shadow-[0_0_5px_#66fcf1]"></span> Experience Logs
                  </h3>
                  <div className="space-y-10">
                    {data.experience.map((exp, i) => (
                      <div key={i} className="group relative">
                        <div className="absolute -left-14 top-2 w-3 h-3 bg-[#1f2833] border-2 border-[#66fcf1] rounded-full group-hover:bg-[#66fcf1] group-hover:shadow-[0_0_10px_#66fcf1] transition-all"></div>
                        <div className="flex justify-between items-end mb-2">
                          <h4 className="text-2xl font-black text-white uppercase">{exp.role}</h4>
                          <span className="text-sm font-bold text-[#45a29e] uppercase tracking-widest">[{exp.periodStart} // {exp.periodEnd}]</span>
                        </div>
                        <p className="text-md font-bold text-[#66fcf1] uppercase tracking-widest mb-4">sys.{exp.company.replace(' ', '_').toLowerCase()}</p>
                        <div className="space-y-3 bg-[#1f2833]/50 p-6 border border-[#1f2833]">
                          {(exp.bullets || []).map((bullet, bIdx) => (
                            <p key={bIdx} className="text-sm leading-relaxed flex gap-3">
                              <span className="text-[#66fcf1] font-black">{">"}</span>
                              {bullet}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        );

      case 'vibrant-gradient':
        return (
          <div className="p-16 flex flex-col h-full font-sans bg-white relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[60%] rounded-full bg-gradient-to-br from-fuchsia-500 via-purple-600 to-indigo-600 opacity-20 blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[50%] rounded-full bg-gradient-to-tr from-pink-500 to-orange-400 opacity-20 blur-[100px] pointer-events-none"></div>
            
            <header className="mb-16 relative z-10 flex gap-10 items-center bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-xl shadow-purple-500/5">
              {data.photo && (
                <div className="size-36 rounded-2xl overflow-hidden shrink-0 shadow-lg shadow-purple-500/20 transform rotate-[-3deg] hover:rotate-0 transition-transform">
                  <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1">
                <h1 className="text-6xl font-black tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-indigo-600 inline-block">{data.fullName}</h1>
                <p className="text-2xl font-bold text-slate-700 mb-6">{data.jobTitle}</p>
                <div className="flex flex-wrap gap-4 text-sm font-bold text-slate-500">
                  <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm"><span className="material-symbols-outlined text-[16px] text-fuchsia-500">mail</span> {data.email}</span>
                  <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm"><span className="material-symbols-outlined text-[16px] text-purple-500">phone</span> {data.phone}</span>
                  <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm"><span className="material-symbols-outlined text-[16px] text-indigo-500">location_on</span> {data.location}</span>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-12 gap-12 flex-1 relative z-10">
              <div className="col-span-8 flex flex-col gap-10">
                <section>
                  <h3 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-white material-symbols-outlined text-[16px]">person</span> Profile
                  </h3>
                  <p className="text-lg leading-relaxed text-slate-600 font-medium">{data.summary}</p>
                </section>

                <section>
                  <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white material-symbols-outlined text-[16px]">work</span> Experience
                  </h3>
                  <div className="space-y-8">
                    {data.experience.map((exp, i) => (
                      <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-fuchsia-500 to-indigo-600 hidden group-hover:block"></div>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-2xl font-black text-slate-800">{exp.role}</h4>
                          <span className="text-xs font-black uppercase text-purple-600 bg-purple-50 px-3 py-1 rounded-full">{exp.periodStart} - {exp.periodEnd}</span>
                        </div>
                        <p className="text-md font-bold text-fuchsia-600 mb-4">{exp.company}</p>
                        <ul className="space-y-2">
                          {(exp.bullets || []).map((bullet, bIdx) => (
                            <li key={bIdx} className="flex gap-3 text-sm text-slate-600 font-medium">
                              <span className="text-indigo-400 mt-[2px]">&rarr;</span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="col-span-4 flex flex-col gap-10">
                <section>
                  <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center text-white material-symbols-outlined text-[16px]">bolt</span> Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill, i) => (
                      <span key={i} className="px-4 py-2 bg-gradient-to-r from-slate-800 to-slate-900 text-white text-xs font-bold rounded-xl shadow-sm hover:scale-105 transition-transform cursor-default">{skill}</span>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white material-symbols-outlined text-[16px]">school</span> Education
                  </h3>
                  <div className="space-y-4">
                    {data.education.map((edu, i) => (
                      <div key={i} className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm relative pl-6">
                        <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-pink-400 to-orange-400 rounded-l-2xl"></div>
                        <h4 className="font-black text-slate-800 mb-1">{edu.degree}</h4>
                        <p className="text-sm font-medium text-slate-500 mb-2">{edu.school}</p>
                        <span className="text-[10px] font-black uppercase text-orange-600 bg-orange-50 px-2 py-1 rounded-lg">{edu.year}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        );

      case 'glassmorphism-pro':
        return (
          <div className="p-16 flex flex-col h-full font-sans bg-slate-900 text-white relative overflow-hidden z-0">
            {/* Ambient Background Lights */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-blob"></div>
            <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-emerald-500 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-blob animation-delay-4000"></div>

            <div className="relative z-10 flex flex-col h-full">
              <header className="mb-12 flex items-center justify-between p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
                <div className="flex items-center gap-8">
                  {data.photo && (
                    <div className="size-28 rounded-full overflow-hidden shrink-0 border-4 border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                      <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div>
                    <h1 className="text-5xl font-black tracking-tight mb-2 text-white">{data.fullName}</h1>
                    <p className="text-2xl font-medium text-white/80">{data.jobTitle}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 font-medium text-sm text-white/90 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                  <p className="flex items-center gap-3"><span className="material-symbols-outlined text-[18px] text-white/50">mail</span> {data.email}</p>
                  <p className="flex items-center gap-3"><span className="material-symbols-outlined text-[18px] text-white/50">phone</span> {data.phone}</p>
                  <p className="flex items-center gap-3"><span className="material-symbols-outlined text-[18px] text-white/50">location_on</span> {data.location}</p>
                </div>
              </header>

              <div className="grid grid-cols-12 gap-8 flex-1">
                <div className="col-span-8 flex flex-col gap-8">
                  <section className="p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl text-white/90">
                    <h3 className="text-xl font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                       Profile
                    </h3>
                    <p className="text-md leading-relaxed font-medium">{data.summary}</p>
                  </section>

                  <section className="flex-1 p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl text-white">
                    <h3 className="text-xl font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                       Experience
                    </h3>
                    <div className="space-y-8">
                      {data.experience.map((exp, i) => (
                        <div key={i} className="relative pl-6 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-[2px] before:bg-white/20">
                          <div className="absolute w-3 h-3 rounded-full bg-white/80 left-[-5px] top-2 shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                          <div className="flex justify-between items-baseline mb-1">
                            <h4 className="text-2xl font-bold">{exp.role}</h4>
                            <span className="text-xs font-bold tracking-wider text-white/60 bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">{exp.periodStart} - {exp.periodEnd}</span>
                          </div>
                          <p className="text-md font-medium text-purple-300 mb-4">{exp.company}</p>
                          <ul className="space-y-3">
                            {(exp.bullets || []).map((bullet, bIdx) => (
                              <li key={bIdx} className="text-sm font-medium text-white/80 flex gap-3">
                                <span className="text-white/40 mt-[2px]">&bull;</span>
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <div className="col-span-4 flex flex-col gap-8">
                  <section className="p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
                    <h3 className="text-xl font-bold uppercase tracking-widest mb-6 text-white text-center">Skills</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {data.skills.map((skill, i) => (
                        <span key={i} className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md border border-white/20 text-white text-xs font-bold rounded-2xl">{skill}</span>
                      ))}
                    </div>
                  </section>

                  <section className="flex-1 p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl text-white">
                    <h3 className="text-xl font-bold uppercase tracking-widest mb-6 text-center">Education</h3>
                    <div className="space-y-6">
                      {data.education.map((edu, i) => (
                        <div key={i} className="text-center bg-white/5 p-4 rounded-2xl border border-white/10">
                          <h4 className="font-bold mb-1">{edu.degree}</h4>
                          <p className="text-sm text-white/70 mb-3">{edu.school}</p>
                          <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full inline-block">{edu.year}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        );

      case 'neo-brutalism':
        return (
          <div className="p-16 flex flex-col h-full font-sans bg-[#f7f2eb] text-[#111111]">
            <header className="mb-12 border-4 border-[#111111] p-8 bg-[#ff5e5b] shadow-[12px_12px_0px_0px_#111111] flex justify-between items-center transform -rotate-1">
              <div className="flex items-center gap-8">
                {data.photo && (
                  <div className="size-32 shrink-0 border-4 border-[#111111] shadow-[8px_8px_0px_0px_#111111] overflow-hidden bg-white">
                    <img src={data.photo} alt="Profile" className="w-full h-full object-cover grayscale contrast-125" />
                  </div>
                )}
                <div className="text-white">
                  <h1 className="text-7xl font-black uppercase tracking-tighter mb-2" style={{ WebkitTextStroke: '2px #111111', color: '#ff5e5b', textShadow: '4px 4px 0px #111111' }}>{data.fullName}</h1>
                  <p className="text-3xl font-black uppercase bg-[#111111] text-white inline-block px-4 py-2 mt-2">{data.jobTitle}</p>
                </div>
              </div>
            </header>

            <div className="flex gap-4 mb-12 transform rotate-1">
              <div className="flex-1 bg-[#00cecb] border-4 border-[#111111] shadow-[8px_8px_0px_0px_#111111] p-4 text-center font-black uppercase text-sm">
                {data.email}
              </div>
              <div className="flex-1 bg-[#ffed66] border-4 border-[#111111] shadow-[8px_8px_0px_0px_#111111] p-4 text-center font-black uppercase text-sm">
                {data.phone}
              </div>
              <div className="flex-1 bg-[#00cecb] border-4 border-[#111111] shadow-[8px_8px_0px_0px_#111111] p-4 text-center font-black uppercase text-sm">
                {data.location}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-12 flex-1">
              <div className="col-span-8 flex flex-col gap-12">
                <section className="bg-white border-4 border-[#111111] shadow-[12px_12px_0px_0px_#111111] p-8">
                  <h3 className="inline-block bg-[#111111] text-white text-2xl font-black uppercase px-4 py-2 mb-6 -mt-12">Who am I?</h3>
                  <p className="text-xl font-bold leading-relaxed">{data.summary}</p>
                </section>

                <section className="bg-white border-4 border-[#111111] shadow-[12px_12px_0px_0px_#111111] p-8 flex-1">
                  <h3 className="inline-block bg-[#111111] text-[#ffed66] text-2xl font-black uppercase px-4 py-2 mb-8 -mt-12 transform -rotate-2">The Work</h3>
                  <div className="space-y-10">
                    {data.experience.map((exp, i) => (
                      <div key={i} className="border-b-4 border-dashed border-[#111111] pb-8 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-3xl font-black uppercase tracking-tight bg-[#ffed66] inline-block px-2">{exp.role}</h4>
                          <span className="text-sm font-black uppercase border-2 border-[#111111] px-2 py-1 bg-white">{exp.periodStart} - {exp.periodEnd}</span>
                        </div>
                        <p className="text-xl font-black text-[#00cecb] uppercase tracking-widest mb-4" style={{ WebkitTextStroke: '1px #111111' }}>{exp.company}</p>
                        <ul className="space-y-3 font-bold text-lg pl-6 list-square marker:text-[#ff5e5b]">
                          {(exp.bullets || []).map((bullet, bIdx) => (
                            <li key={bIdx}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="col-span-4 flex flex-col gap-12">
                <section className="bg-[#ffed66] border-4 border-[#111111] shadow-[8px_8px_0px_0px_#111111] p-8">
                  <h3 className="text-2xl font-black uppercase mb-6 border-b-4 border-[#111111] pb-2">Skills</h3>
                  <div className="flex flex-wrap gap-3">
                    {data.skills.map((skill, i) => (
                      <span key={i} className="bg-white border-4 border-[#111111] px-3 py-2 text-sm font-black uppercase shadow-[4px_4px_0px_0px_#00cecb]">{skill}</span>
                    ))}
                  </div>
                </section>

                <section className="bg-white border-4 border-[#111111] shadow-[8px_8px_0px_0px_#111111] p-8 flex-1">
                  <h3 className="text-2xl font-black uppercase mb-6 border-b-4 border-[#111111] pb-2">School</h3>
                  <div className="space-y-6">
                    {data.education.map((edu, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-4 top-1 w-0 h-0 border-t-8 border-t-transparent border-l-[12px] border-l-[#ff5e5b] border-b-8 border-b-transparent"></div>
                        <h4 className="text-xl font-black uppercase leading-none mb-2">{edu.degree}</h4>
                        <p className="font-bold mb-2">{edu.school}</p>
                        <span className="inline-block bg-[#111111] text-white text-xs font-black uppercase px-2 py-1">{edu.year}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        );

      case 'freelance-pop':
        return (
          <div className="p-16 flex flex-col h-full font-sans bg-[#ffe227] text-slate-900 border-[16px] border-white ring-[4px] ring-slate-900">
            <header className="mb-10 text-center relative border-b-4 border-slate-900 pb-8 border-dashed">
              <div className="absolute top-0 left-0 text-7xl font-black text-[#ff4b4b] opacity-20 transform -rotate-12 italic">HELLO!</div>
              <div className="absolute top-0 right-0 text-7xl font-black text-[#4b7bff] opacity-20 transform rotate-12 italic">HI!</div>
              
              {data.photo && (
                <div className="size-40 mx-auto rounded-full overflow-hidden border-[6px] border-white ring-[4px] ring-slate-900 shadow-2xl mb-6 relative z-10 bg-[#ff4b4b]">
                  <img src={data.photo} alt="Profile" className="w-full h-full object-cover mix-blend-multiply grayscale contrast-150 brightness-110" />
                </div>
              )}
              
              <h1 className="text-6xl font-black uppercase tracking-tight text-white mb-2" style={{ WebkitTextStroke: '2px #0f172a', textShadow: '6px 6px 0px #ff4b4b' }}>
                {data.fullName}
              </h1>
              <div className="inline-block mt-4 bg-slate-900 text-[#ffe227] text-2xl font-black uppercase px-6 py-2 transform -rotate-2 shadow-[8px_8px_0px_0px_#4b7bff]">
                {data.jobTitle}
              </div>
            </header>

            <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm font-black uppercase">
              <span className="bg-white border-2 border-slate-900 px-4 py-2 -rotate-1">{data.email}</span>
              <span className="bg-white border-2 border-slate-900 px-4 py-2 rotate-2">{data.phone}</span>
              <span className="bg-white border-2 border-slate-900 px-4 py-2 -rotate-1">{data.location}</span>
            </div>

            <div className="grid grid-cols-1 gap-10 flex-1 bg-white border-[4px] border-slate-900 p-10 relative shadow-[16px_16px_0px_0px_#ff4b4b]">
              <div className="absolute top-[-24px] right-10 bg-[#4b7bff] text-white border-4 border-slate-900 font-black uppercase text-xl px-6 py-2 rotate-3">
                Profile
              </div>
              <p className="text-2xl font-bold leading-snug text-center">{data.summary}</p>
              
              <div className="h-4 w-full border-t-4 border-b-4 border-slate-900 border-dashed my-2"></div>

              <div className="grid grid-cols-2 gap-12">
                <section>
                  <h3 className="text-3xl font-black uppercase text-slate-900 mb-8 inline-block bg-[#ffe227] px-4 -ml-4 border-r-4 border-y-4 border-slate-900 shadow-[4px_4px_0px_0px_#ff4b4b]">Experience</h3>
                  <div className="space-y-8">
                    {data.experience.map((exp, i) => (
                      <div key={i} className="relative pl-6">
                        <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-[#ff4b4b] border-2 border-slate-900"></div>
                        <h4 className="text-xl font-black uppercase">{exp.role}</h4>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-lg font-bold text-[#4b7bff]">{exp.company}</span>
                          <span className="text-xs font-black uppercase bg-slate-100 border border-slate-900 px-2 py-1">{exp.periodStart} - {exp.periodEnd}</span>
                        </div>
                        <ul className="text-sm font-bold text-slate-700 space-y-1 list-disc pl-4 marker:text-[#ffe227]">
                          {(exp.bullets || []).map((b, bIdx) => <li key={bIdx}>{b}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="space-y-12">
                  <section>
                    <h3 className="text-3xl font-black uppercase text-slate-900 mb-8 inline-block bg-[#ffe227] px-4 -ml-4 border-r-4 border-y-4 border-slate-900 shadow-[4px_4px_0px_0px_#4b7bff]">Superpowers</h3>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.map((skill, i) => (
                        <span key={i} className="bg-white border-2 border-slate-900 text-slate-900 text-sm font-black uppercase px-3 py-1 hover:bg-[#ffe227] hover:shadow-[4px_4px_0px_0px_#ff4b4b] transition-all cursor-crosshair">{skill}</span>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-3xl font-black uppercase text-slate-900 mb-8 inline-block bg-[#ffe227] px-4 -ml-4 border-r-4 border-y-4 border-slate-900 shadow-[4px_4px_0px_0px_#00cecb]">Education</h3>
                    <div className="space-y-6">
                      {data.education.map((edu, i) => (
                        <div key={i} className="bg-slate-50 border-2 border-slate-900 p-4 relative">
                          <div className="absolute top-[-10px] right-[-10px] bg-[#00cecb] w-6 h-6 border-2 border-slate-900 rounded-full flex items-center justify-center font-black text-white text-xs">!</div>
                          <h4 className="text-lg font-black uppercase leading-tight mb-1">{edu.degree}</h4>
                          <p className="font-bold text-[#4b7bff]">{edu.school}</p>
                          <p className="text-xs font-black mt-2 inline-block border-b-2 border-slate-900">{edu.year}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        );

      case 'creative-director':
        return (
          <div className="p-16 flex flex-col h-full font-serif bg-[#1a1a1a] text-[#f4f4f4]">
            <div className="grid grid-cols-12 gap-8 h-full">
              {/* Left Column - highly visual */}
              <div className="col-span-5 h-full flex flex-col">
                <header className="mb-12">
                  <h1 className="text-7xl font-light tracking-tighter leading-[0.8] mb-6 uppercase break-words">
                    {data.fullName.split(' ').map((name, i) => (
                      <span key={i} className="block">{name}</span>
                    ))}
                  </h1>
                  <h2 className="text-sm font-sans font-bold uppercase tracking-[0.4em] text-[#a0a0a0] mb-8 relative before:content-[''] before:absolute before:w-12 before:h-[2px] before:bg-white before:left-0 before:-top-4">
                    {data.jobTitle}
                  </h2>
                  <div className="space-y-1 font-sans text-xs tracking-widest text-[#808080] uppercase">
                    <p>{data.email}</p>
                    <p>{data.phone}</p>
                    <p>{data.location}</p>
                  </div>
                </header>

                {data.photo && (
                  <div className="w-full flex-1 min-h-[300px] bg-[#2a2a2a] relative overflow-hidden group">
                    <img src={data.photo} alt="Profile" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 opacity-80" />
                    <div className="absolute inset-0 border border-white/20 m-4 pointer-events-none"></div>
                  </div>
                )}
                
                {!data.photo && (
                  <div className="w-full flex-1 min-h-[300px] border border-[#333] flex items-center justify-center p-8">
                    <p className="text-2xl font-light italic leading-loose text-center text-[#999]">{data.summary}</p>
                  </div>
                )}
              </div>

              {/* Right Column - content heavy */}
              <div className="col-span-7 h-full flex flex-col pl-8">
                {data.photo && (
                  <section className="mb-12">
                     <p className="text-2xl font-light italic leading-loose text-[#ccc] border-l-2 border-[#ff3366] pl-6 py-2">{data.summary}</p>
                  </section>
                )}

                <section className="mb-12 flex-1 relative">
                  <div className="absolute top-0 right-0 text-[120px] font-black text-[#2a2a2a] leading-none opacity-50 z-0 pointer-events-none">EXP</div>
                  <h3 className="text-sm font-sans font-bold uppercase tracking-[0.3em] mb-8 relative z-10">Selected Work</h3>
                  <div className="space-y-12 relative z-10">
                    {data.experience.map((exp, i) => (
                      <div key={i} className="group">
                        <div className="flex justify-between items-baseline mb-2">
                          <h4 className="text-3xl font-normal group-hover:text-[#ff3366] transition-colors cursor-default">{exp.role}</h4>
                          <span className="text-xs font-sans tracking-widest text-[#666]">{exp.periodStart} &mdash; {exp.periodEnd}</span>
                        </div>
                        <p className="text-sm font-sans font-bold uppercase tracking-widest text-[#a0a0a0] mb-4">{exp.company}</p>
                        <div className="space-y-2">
                          {(exp.bullets || []).map((bullet, bIdx) => (
                             <p key={bIdx} className="text-sm font-sans text-[#999] leading-relaxed pl-4 border-l border-[#333] hover:border-[#ff3366] transition-colors">{bullet}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-[#333]">
                  <section>
                    <h3 className="text-sm font-sans font-bold uppercase tracking-[0.3em] mb-6 text-[#666]">Expertise</h3>
                    <ul className="space-y-2 font-sans text-sm text-[#ccc] uppercase tracking-wider">
                      {data.skills.map((skill, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 bg-[#ff3366] rounded-full"></span>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </section>
                  
                  <section>
                    <h3 className="text-sm font-sans font-bold uppercase tracking-[0.3em] mb-6 text-[#666]">Education</h3>
                    <div className="space-y-6">
                      {data.education.map((edu, i) => (
                        <div key={i}>
                          <h4 className="font-sans font-bold uppercase tracking-widest text-sm mb-1">{edu.degree}</h4>
                          <p className="text-sm italic text-[#999] mb-1">{edu.school}</p>
                          <span className="text-xs font-sans text-[#666]">{edu.year}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        );

      case 'abstract-shapes':
        return (
          <div className="p-16 flex flex-col h-full font-sans bg-white relative overflow-hidden z-0">
            {/* Background Shapes */}
            <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-[#fdf2e9] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] -z-10 transform rotate-45"></div>
            <div className="absolute bottom-[-150px] right-[-100px] w-[600px] h-[600px] bg-[#e9f2fa] rounded-[50%_50%_30%_70%/50%_50%_70%_70%] -z-10 transform -rotate-12"></div>
            <div className="absolute top-[30%] right-[10%] w-[100px] h-[100px] bg-[#fce4ec] rounded-full -z-10 blur-xl"></div>
            
            <header className="mb-16 pb-10 border-b-2 border-slate-100 flex justify-between items-center text-slate-800 relative">
              <div className="absolute -left-8 top-1/2 w-4 h-16 bg-[#3b82f6] rounded-r-lg transform -translate-y-1/2"></div>
              <div>
                <h1 className="text-6xl font-black tracking-tight mb-2 text-slate-900">{data.fullName}</h1>
                <p className="text-2xl font-bold text-[#f97316] uppercase tracking-widest">{data.jobTitle}</p>
              </div>
              <div className="flex flex-col gap-2 text-sm font-bold text-slate-600 bg-white/80 p-4 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] backdrop-blur-sm">
                <span className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center material-symbols-outlined text-[14px]">mail</span> {data.email}</span>
                <span className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center material-symbols-outlined text-[14px]">phone</span> {data.phone}</span>
                <span className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center material-symbols-outlined text-[14px]">map</span> {data.location}</span>
              </div>
            </header>

            <div className="grid grid-cols-12 gap-16 flex-1">
              <div className="col-span-4 flex flex-col gap-12">
                <section>
                  <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                    <span className="text-[#ec4899] material-symbols-outlined text-[24px]">change_history</span> About
                  </h3>
                  <p className="text-lg leading-relaxed text-slate-700 font-medium">{data.summary}</p>
                </section>

                <section>
                  <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                    <span className="text-[#3b82f6] material-symbols-outlined text-[24px]">square</span> Expertise
                  </h3>
                  <div className="flex flex-col gap-3">
                    {data.skills.map((skill, i) => (
                      <div key={i} className="bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#f97316]"></div>
                        <span className="text-sm font-bold text-slate-800">{skill}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="col-span-8 flex flex-col gap-12 relative">
                <div className="absolute left-[-2rem] top-0 bottom-0 w-[2px] bg-slate-100 hidden sm:block"></div>
                
                <section className="flex-1">
                  <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                    <span className="text-[#f97316] material-symbols-outlined text-[24px]">circle</span> Experience
                  </h3>
                  <div className="space-y-12">
                    {data.experience.map((exp, i) => (
                      <div key={i} className="relative">
                        <div className="absolute left-[-2.3rem] top-2 w-3 h-3 rounded-full bg-[#3b82f6] shadow-[0_0_0_4px_rgba(59,130,246,0.2)] hidden sm:block"></div>
                        <div className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-slate-50 relative overflow-hidden group hover:border-[#3b82f6]/20 transition-colors">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                          
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-2xl font-black text-slate-900">{exp.role}</h4>
                            <span className="text-xs font-bold text-[#ec4899] bg-pink-50 px-3 py-1 rounded-full uppercase tracking-wider">{exp.periodStart} - {exp.periodEnd}</span>
                          </div>
                          <p className="text-md font-bold text-[#3b82f6] mb-5">{exp.company}</p>
                          <ul className="space-y-3">
                            {(exp.bullets || []).map((bullet, bIdx) => (
                              <li key={bIdx} className="flex gap-4 text-sm text-slate-600 font-medium">
                                <span className="text-[#f97316] mt-[-2px] text-lg">&bull;</span>
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
                
                <section>
                  <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                    <span className="text-[#8b5cf6] material-symbols-outlined text-[24px]">school</span> Education
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    {data.education.map((edu, i) => (
                      <div key={i} className="bg-white p-6 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-slate-50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-orange-50 rounded-bl-full -z-10"></div>
                        <h4 className="text-lg font-black text-slate-900 mb-1">{edu.degree}</h4>
                        <p className="text-sm font-medium text-slate-500 mb-3">{edu.school}</p>
                        <span className="text-xs font-bold text-white bg-slate-900 px-3 py-1 rounded-full">{edu.year}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        );

      case 'copywriter-pro':
        return (
          <div className="p-16 flex flex-col h-full font-serif bg-[#fdfbf7] text-[#111]">
            <header className="mb-20 text-center max-w-4xl mx-auto">
              <h1 className="text-8xl font-black tracking-tighter leading-[0.9] text-slate-900 mb-6" style={{ fontFeatureSettings: '"kern" 1, "liga" 1' }}>{data.fullName}</h1>
              <p className="text-3xl font-medium italic text-slate-600 mb-10 pb-10 border-b border-slate-200">"{data.jobTitle}"</p>
              <div className="flex justify-center gap-8 font-sans text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                <span>{data.email}</span>
                <span className="text-slate-300">&bull;</span>
                <span>{data.phone}</span>
                <span className="text-slate-300">&bull;</span>
                <span>{data.location}</span>
              </div>
            </header>

            <div className="flex-1 max-w-5xl mx-auto space-y-20">
              <section className="text-center px-12">
                <p className="text-3xl leading-[1.6] text-slate-800 font-medium">
                  {data.summary}
                </p>
              </section>

              <div className="w-16 h-px bg-slate-300 mx-auto"></div>

              <section className="max-w-4xl mx-auto">
                <h3 className="font-sans text-sm font-bold uppercase tracking-[0.3em] text-slate-400 mb-12 text-center">Selected Work</h3>
                <div className="space-y-16">
                  {data.experience.map((exp, i) => (
                    <div key={i} className="relative">
                      <div className="flex justify-between items-baseline mb-4">
                        <h4 className="text-4xl font-black text-slate-900 tracking-tight">{exp.role}</h4>
                        <span className="font-sans text-sm font-bold text-slate-500 uppercase tracking-widest">{exp.periodStart} - {exp.periodEnd}</span>
                      </div>
                      <p className="text-xl font-medium italic text-slate-500 mb-6">{exp.company}</p>
                      <div className="space-y-4 pl-6 border-l-2 border-slate-200 text-lg leading-relaxed text-slate-700">
                        {(exp.bullets || []).map((bullet, bIdx) => (
                          <p key={bIdx}>{bullet}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div className="w-16 h-px bg-slate-300 mx-auto"></div>

              <div className="grid grid-cols-2 gap-16 max-w-4xl mx-auto pb-10">
                <section>
                  <h3 className="font-sans text-sm font-bold uppercase tracking-[0.3em] text-slate-400 mb-8">Lexicon</h3>
                  <div className="flex flex-wrap gap-x-6 gap-y-4 text-xl font-medium text-slate-800">
                    {data.skills.map((skill, i) => (
                      <span key={i} className="hover:text-black hover:italic transition-all cursor-crosshair">{skill}</span>
                    ))}
                  </div>
                </section>
                
                <section>
                  <h3 className="font-sans text-sm font-bold uppercase tracking-[0.3em] text-slate-400 mb-8">Pedigree</h3>
                  <div className="space-y-8 text-lg text-slate-800">
                    {data.education.map((edu, i) => (
                      <div key={i}>
                        <h4 className="font-black mb-1">{edu.degree}</h4>
                        <p className="italic text-slate-600">
                          {edu.school}, <span className="font-sans text-sm font-bold text-slate-400 not-italic ml-2">{edu.year}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        );

      case 'finance-trust':
        return (
          <div className="p-16 flex flex-col h-full font-serif bg-white text-[#1e2a38]">
            <header className="border-b-4 border-[#1e2a38] pb-10 mb-10 flex justify-between items-end">
              <div>
                <h1 className="text-6xl font-bold tracking-tight mb-2 text-[#0f172a]">{data.fullName}</h1>
                <p className="text-2xl italic text-[#b89151] font-medium">{data.jobTitle}</p>
              </div>
              <div className="text-right font-sans text-xs font-bold tracking-widest text-[#475569] uppercase space-y-2">
                <p>{data.location}</p>
                <p>{data.email}</p>
                <p>{data.phone}</p>
              </div>
            </header>

            <section className="mb-12 bg-[#f8fafc] p-8 border border-[#e2e8f0]">
              <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-[#1e2a38] mb-4">Executive Summary</h3>
              <p className="text-lg leading-relaxed text-[#334155]">{data.summary}</p>
            </section>

            <div className="grid grid-cols-1 gap-12 flex-1">
              <section>
                <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-[#b89151] mb-6 border-b border-[#cbd5e1] pb-2">Professional Experience</h3>
                <div className="space-y-10">
                  {data.experience.map((exp, i) => (
                    <div key={i} className="flex justify-between items-start gap-8">
                       <div className="w-1/4 shrink-0 font-sans mt-1">
                         <span className="text-sm font-bold text-[#b89151]">{exp.periodStart} &mdash; {exp.periodEnd}</span>
                       </div>
                       <div className="flex-1 border-l-2 border-[#e2e8f0] pl-8">
                         <h4 className="text-2xl font-bold text-[#0f172a] mb-1">{exp.role}</h4>
                         <p className="text-lg font-medium text-[#475569] mb-4 font-sans uppercase tracking-wide">{exp.company}</p>
                         <ul className="space-y-2 list-disc pl-5 marker:text-[#b89151]">
                           {(exp.bullets || []).map((bullet, bIdx) => (
                             <li key={bIdx} className="text-[#334155] text-md leading-relaxed">{bullet}</li>
                           ))}
                         </ul>
                       </div>
                    </div>
                  ))}
                </div>
              </section>

              <div className="grid grid-cols-2 gap-12 pt-8 border-t border-[#cbd5e1]">
                <section>
                  <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-[#b89151] mb-6 border-b border-[#cbd5e1] pb-2">Core Competencies</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-sans font-medium text-sm text-[#334155]">
                    {data.skills.map((skill, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#1e2a38] rounded-full"></div>
                        {skill}
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-[#b89151] mb-6 border-b border-[#cbd5e1] pb-2">Education & Credentials</h3>
                  <div className="space-y-6">
                    {data.education.map((edu, i) => (
                      <div key={i}>
                        <h4 className="text-lg font-bold text-[#0f172a] mb-1">{edu.degree}</h4>
                        <div className="flex justify-between items-center font-sans text-sm">
                          <p className="text-[#475569] font-medium">{edu.school}</p>
                          <span className="font-bold text-[#b89151]">{edu.year}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        );

      case 'elegant-serif':
        return (
          <div className="p-16 flex flex-col h-full font-serif bg-[#f9f9f9] text-[#222]">
            <header className="mb-14 text-center">
              <h1 className="text-6xl font-normal tracking-[0.1em] uppercase mb-4 text-[#111]">{data.fullName}</h1>
              <p className="text-xl italic text-[#555] mb-8">{data.jobTitle}</p>
              <div className="w-24 h-px bg-[#222] mx-auto mb-8"></div>
              <div className="flex justify-center gap-12 font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-[#777]">
                <span>{data.email}</span>
                <span>{data.phone}</span>
                <span>{data.location}</span>
              </div>
            </header>

            <section className="mb-16">
              <p className="text-lg leading-[2] text-center text-[#444] max-w-4xl mx-auto italic">
                {data.summary}
              </p>
            </section>

            <div className="flex-1 max-w-5xl mx-auto w-full">
              <div className="grid grid-cols-12 gap-16">
                <div className="col-span-8">
                  <h3 className="text-sm font-sans font-bold uppercase tracking-[0.4em] mb-10 text-[#111] border-b border-[#ddd] pb-4">Experience</h3>
                  <div className="space-y-12">
                    {data.experience.map((exp, i) => (
                      <div key={i}>
                        <h4 className="text-2xl font-normal mb-1">{exp.role}</h4>
                        <div className="flex justify-between items-baseline mb-4 font-sans text-xs font-bold uppercase tracking-widest text-[#777]">
                          <span>{exp.company}</span>
                          <span>{exp.periodStart} &mdash; {exp.periodEnd}</span>
                        </div>
                        <p className="text-[#555] leading-[1.8] text-sm text-justify">
                          {(exp.bullets || []).join(' ')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-span-4 space-y-16">
                  <section>
                    <h3 className="text-sm font-sans font-bold uppercase tracking-[0.4em] mb-10 text-[#111] border-b border-[#ddd] pb-4">Skills</h3>
                    <ul className="space-y-4">
                      {data.skills.map((skill, i) => (
                        <li key={i} className="text-sm font-sans text-[#444] uppercase tracking-widest">{skill}</li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-sm font-sans font-bold uppercase tracking-[0.4em] mb-10 text-[#111] border-b border-[#ddd] pb-4">Education</h3>
                    <div className="space-y-8">
                      {data.education.map((edu, i) => (
                        <div key={i}>
                          <h4 className="font-normal text-lg mb-2">{edu.degree}</h4>
                          <p className="text-[#777] italic text-sm mb-2">{edu.school}</p>
                          <span className="font-sans text-[10px] uppercase tracking-widest text-[#999]">{edu.year}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        );

      case 'ocean-blue':
        return (
          <div className="flex flex-col h-full font-sans bg-white">
            <header className="bg-[#0f4c75] text-white p-16 pb-24">
              <div className="flex justify-between items-center max-w-5xl mx-auto">
                <div>
                  <h1 className="text-6xl font-black mb-3">{data.fullName}</h1>
                  <h2 className="text-2xl font-light text-[#bbe1fa]">{data.jobTitle}</h2>
                </div>
                <div className="text-right space-y-3 text-sm font-medium text-[#bbe1fa]">
                  <p className="flex items-center justify-end gap-3"><span className="material-symbols-outlined text-[18px]">email</span> {data.email}</p>
                  <p className="flex items-center justify-end gap-3"><span className="material-symbols-outlined text-[18px]">phone</span> {data.phone}</p>
                  <p className="flex items-center justify-end gap-3"><span className="material-symbols-outlined text-[18px]">location_on</span> {data.location}</p>
                </div>
              </div>
            </header>

            <div className="max-w-5xl mx-auto w-full px-16 -mt-12 flex-1 relative z-10 grid grid-cols-3 gap-12">
              <div className="col-span-2 space-y-10 bg-white p-10 rounded-xl shadow-[0_10px_30px_rgba(15,76,117,0.1)] border border-slate-100">
                <section>
                  <h3 className="text-2xl font-black text-[#3282b8] mb-4 border-b-2 border-slate-100 pb-2">Profile</h3>
                  <p className="text-slate-600 leading-relaxed font-medium">{data.summary}</p>
                </section>

                <section>
                  <h3 className="text-2xl font-black text-[#3282b8] mb-6 border-b-2 border-slate-100 pb-2">Experience</h3>
                  <div className="space-y-8">
                    {data.experience.map((exp, i) => (
                      <div key={i}>
                         <div className="flex items-center justify-between mb-1">
                           <h4 className="text-xl font-bold text-slate-800">{exp.role}</h4>
                           <span className="text-sm font-bold text-white bg-[#3282b8] px-3 py-1 rounded-full">{exp.periodStart} - {exp.periodEnd}</span>
                         </div>
                         <p className="text-md font-bold text-[#0f4c75] mb-3">{exp.company}</p>
                         <ul className="space-y-2">
                           {(exp.bullets || []).map((bullet, bIdx) => (
                             <li key={bIdx} className="text-md text-slate-600 font-medium pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-[#bbe1fa] before:rounded-full">
                               {bullet}
                             </li>
                           ))}
                         </ul>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="col-span-1 space-y-8">
                 <section className="bg-[#f0f5f9] p-8 rounded-xl shadow-inner border border-slate-200">
                    <h3 className="text-xl font-black text-[#3282b8] mb-6">Skills</h3>
                    <div className="flex flex-col gap-3">
                      {data.skills.map((skill, i) => (
                        <div key={i} className="flex items-center gap-3">
                           <div className="flex-1 font-bold text-slate-700 text-sm">{skill}</div>
                           <div className="w-1/2 h-2 bg-slate-200 rounded-full overflow-hidden">
                             <div className="h-full bg-[#3282b8] w-[85%] rounded-full"></div>
                           </div>
                        </div>
                      ))}
                    </div>
                 </section>

                 <section className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-xl font-black text-[#3282b8] mb-6">Education</h3>
                    <div className="space-y-6">
                      {data.education.map((edu, i) => (
                        <div key={i} className="border-l-4 border-[#bbe1fa] pl-4">
                           <h4 className="font-black text-slate-800 leading-snug">{edu.degree}</h4>
                           <p className="text-sm font-medium text-slate-500 my-1">{edu.school}</p>
                           <span className="text-xs font-bold text-[#3282b8]">{edu.year}</span>
                        </div>
                      ))}
                    </div>
                 </section>
              </div>
            </div>
            {/* Bottom spacer */}
            <div className="h-16"></div>
          </div>
        );

      case 'executive-suite':
        return (
          <div className="p-16 flex flex-col h-full font-serif bg-white text-slate-900 border-8 border-slate-900">
            <header className="flex justify-between items-end border-b-4 border-slate-900 pb-10 mb-12">
              <div>
                <h1 className="text-5xl font-bold uppercase tracking-widest text-slate-900 mb-4">{data.fullName}</h1>
                <h2 className="text-2xl italic tracking-wider text-slate-600">{data.jobTitle}</h2>
              </div>
              <div className="text-right font-sans text-sm font-medium tracking-widest uppercase text-slate-500 space-y-2">
                <p>{data.email}</p>
                <p>{data.phone}</p>
                <p>{data.location}</p>
              </div>
            </header>

            <div className="grid grid-cols-12 gap-16 flex-1">
              <div className="col-span-8 flex flex-col gap-12">
                <section>
                  <h3 className="flex items-center gap-4 text-xl font-bold uppercase tracking-widest mb-6 text-slate-900">
                    <span className="w-8 h-px bg-slate-900"></span>
                    Executive Summary
                  </h3>
                  <p className="text-lg leading-relaxed text-justify text-slate-700 font-medium">
                    {data.summary}
                  </p>
                </section>

                <section>
                   <h3 className="flex items-center gap-4 text-xl font-bold uppercase tracking-widest mb-8 text-slate-900">
                    <span className="w-8 h-px bg-slate-900"></span>
                    Professional Experience
                  </h3>
                  <div className="space-y-12">
                    {data.experience.map((exp, i) => (
                      <div key={i} className="relative pl-8">
                        <div className="absolute left-0 top-2 w-2 h-2 bg-slate-900 rounded-full"></div>
                        <div className="absolute left-[3px] top-4 bottom-[-2rem] w-[2px] bg-slate-200 last:hidden"></div>
                        <div className="flex justify-between items-baseline mb-2">
                          <h4 className="text-2xl font-bold text-slate-900">{exp.role}</h4>
                          <span className="font-sans text-sm font-bold uppercase tracking-widest text-slate-500">{exp.periodStart} - {exp.periodEnd}</span>
                        </div>
                        <p className="text-xl italic text-slate-600 mb-4">{exp.company}</p>
                        <ul className="space-y-3 font-sans text-sm font-medium text-slate-700 leading-relaxed list-disc pl-5 marker:text-slate-400">
                          {(exp.bullets || []).map((bullet, bIdx) => (
                            <li key={bIdx}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="col-span-4 flex flex-col gap-12 border-l border-slate-200 pl-12 relative">
                <section>
                  <h3 className="flex items-center gap-4 text-xl font-bold uppercase tracking-widest mb-6 text-slate-900">
                    <span className="w-8 h-px bg-slate-900"></span>
                    Core Areas
                  </h3>
                  <ul className="space-y-4 font-sans text-sm font-bold uppercase tracking-widest text-slate-700">
                    {data.skills.map((skill, i) => (
                      <li key={i} className="flex justify-between items-center border-b border-slate-100 pb-2">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="flex items-center gap-4 text-xl font-bold uppercase tracking-widest mb-6 text-slate-900">
                    <span className="w-8 h-px bg-slate-900"></span>
                    Education
                  </h3>
                  <div className="space-y-8">
                    {data.education.map((edu, i) => (
                      <div key={i}>
                        <h4 className="font-bold text-lg mb-1">{edu.degree}</h4>
                        <p className="italic text-slate-600 mb-2">{edu.school}</p>
                        <span className="font-sans text-xs font-bold uppercase tracking-widest text-slate-400">{edu.year}</span>
                      </div>
                    ))}
                  </div>
                </section>
                
                {data.photo && (
                  <div className="mt-auto pt-12">
                     <div className="w-full aspect-square border-4 border-slate-900 p-2 filter grayscale">
                       <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
                     </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'minimalist-grid':
        return (
          <div className="p-16 flex flex-col h-full font-sans bg-[#fcfcfc] text-[#333]">
            <header className="grid grid-cols-4 gap-8 mb-16 items-start">
              <div className="col-span-2">
                <h1 className="text-5xl font-medium tracking-tight mb-2 text-black">{data.fullName}</h1>
                <p className="text-xl text-gray-500 font-light">{data.jobTitle}</p>
              </div>
              <div className="col-span-2 text-xs text-gray-400 space-y-1 mt-3">
                <p className="flex items-center gap-2"><span className="w-4 h-px bg-gray-300 inline-block"></span> {data.email}</p>
                <p className="flex items-center gap-2"><span className="w-4 h-px bg-gray-300 inline-block"></span> {data.phone}</p>
                <p className="flex items-center gap-2"><span className="w-4 h-px bg-gray-300 inline-block"></span> {data.location}</p>
              </div>
            </header>

            <div className="flex-1 grid grid-cols-4 gap-x-8 gap-y-16">
              <div className="col-span-4 border-t border-gray-200 pt-8 grid grid-cols-4 gap-8">
                <div className="col-span-1">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-black">Profile</h3>
                </div>
                <div className="col-span-3">
                  <p className="text-lg font-light leading-relaxed text-gray-700">{data.summary}</p>
                </div>
              </div>

              <div className="col-span-4 border-t border-gray-200 pt-8 grid grid-cols-4 gap-8">
                <div className="col-span-1">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-black mb-8">Experience</h3>
                </div>
                <div className="col-span-3 space-y-12">
                  {data.experience.map((exp, i) => (
                    <div key={i} className="grid grid-cols-3 gap-8">
                      <div className="col-span-1">
                        <p className="text-sm font-medium text-black">{exp.company}</p>
                        <p className="text-xs text-gray-400 mt-1">{exp.periodStart} &mdash; {exp.periodEnd}</p>
                      </div>
                      <div className="col-span-2">
                        <h4 className="text-md font-bold text-black mb-3">{exp.role}</h4>
                        <ul className="space-y-2 text-sm text-gray-600 font-light">
                          {(exp.bullets || []).map((bullet, bIdx) => (
                            <li key={bIdx} className="relative pl-3 before:absolute before:left-0 before:top-2 before:w-1 before:h-px before:bg-gray-400">{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-4 border-t border-gray-200 pt-8 grid grid-cols-4 gap-8">
                <div className="col-span-1">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-black">Skills</h3>
                </div>
                <div className="col-span-3">
                  <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm text-gray-700 font-light">
                    {data.skills.map((skill, i) => (
                      <span key={i}>{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="col-span-4 border-t border-gray-200 pt-8 grid grid-cols-4 gap-8">
                <div className="col-span-1">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-black">Education</h3>
                </div>
                <div className="col-span-3 grid grid-cols-2 gap-8">
                  {data.education.map((edu, i) => (
                    <div key={i}>
                      <h4 className="text-sm font-bold text-black">{edu.degree}</h4>
                      <p className="text-sm text-gray-500 my-1">{edu.school}</p>
                      <span className="text-xs text-gray-400">{edu.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'startup-founder':
        return (
          <div className="p-16 flex flex-col h-full font-sans bg-white text-slate-800">
            <header className="mb-12 flex items-center justify-between">
               <div className="flex items-center gap-8">
                  {data.photo && (
                    <div className="size-24 rounded-[30px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 ring-4 ring-indigo-50">
                      <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div>
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-1">{data.fullName}</h1>
                    <p className="text-xl font-bold text-indigo-600">{data.jobTitle}</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex flex-col justify-center shadow-sm">
                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Contact</span>
                    <span className="text-sm font-bold text-slate-700">{data.email}</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex flex-col justify-center shadow-sm">
                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Phone</span>
                    <span className="text-sm font-bold text-slate-700">{data.phone}</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex flex-col justify-center shadow-sm">
                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Base</span>
                    <span className="text-sm font-bold text-slate-700">{data.location}</span>
                  </div>
               </div>
            </header>

            <section className="mb-12">
              <div className="bg-indigo-50 border-l-4 border-indigo-600 p-8 rounded-r-2xl">
                 <p className="text-lg text-slate-700 leading-relaxed font-medium">{data.summary}</p>
              </div>
            </section>

            <div className="grid grid-cols-3 gap-12 flex-1">
              <div className="col-span-2 space-y-10">
                <section>
                  <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                    <div className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center material-symbols-outlined text-[14px]">rocket_launch</div>
                    Journey
                  </h3>
                  <div className="space-y-8">
                    {data.experience.map((exp, i) => (
                      <div key={i} className="relative pl-8 before:absolute before:left-2 before:top-2 before:bottom-[-2rem] before:w-[2px] before:bg-slate-100 last:before:hidden">
                        <div className="absolute left-[3px] top-2 width-3 h-3 rounded-full border-2 border-indigo-600 bg-white z-10"></div>
                        <div className="flex justify-between items-start mb-2">
                           <h4 className="text-xl font-bold text-slate-900">{exp.role}</h4>
                           <span className="text-xs font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{exp.periodStart} - {exp.periodEnd}</span>
                        </div>
                        <p className="text-md font-bold text-slate-500 mb-4">{exp.company}</p>
                        <ul className="space-y-2">
                          {(exp.bullets || []).map((bullet, bIdx) => (
                             <li key={bIdx} className="text-sm text-slate-600 font-medium leading-relaxed flex gap-3">
                               <span className="text-indigo-400 mt-[2px]">&rarr;</span>
                               {bullet}
                             </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="col-span-1 space-y-10">
                <section>
                  <h3 className="text-xl font-black text-slate-900 mb-6 border-b-2 border-slate-100 pb-2">Stack</h3>
                  <div className="flex flex-col gap-3">
                    {data.skills.map((skill, i) => (
                      <div key={i} className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm flex items-center justify-between group hover:border-indigo-600 hover:shadow-md transition-all cursor-crosshair">
                        <span className="font-bold text-sm text-slate-700 group-hover:text-indigo-600">{skill}</span>
                        <div className="w-2 h-2 rounded-full bg-slate-200 group-hover:bg-indigo-600 transition-colors"></div>
                      </div>
                    ))}
                  </div>
                </section>
                
                <section>
                  <h3 className="text-xl font-black text-slate-900 mb-6 border-b-2 border-slate-100 pb-2">Education</h3>
                  <div className="space-y-6">
                    {data.education.map((edu, i) => (
                      <div key={i} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <h4 className="font-bold text-sm text-slate-900 mb-1">{edu.degree}</h4>
                        <p className="text-xs text-slate-500 mb-2">{edu.school}</p>
                        <span className="text-[10px] font-black uppercase text-slate-400 bg-white border border-slate-200 px-2 py-1 rounded">{edu.year}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        );

      case 'designer-portfolio':
        return (
          <div className="p-16 flex flex-col h-full font-sans bg-[#f4f4f5] text-[#18181b]">
            <header className="mb-16 flex gap-12 items-center">
              {data.photo && (
                <div className="size-48 shrink-0 rounded-[40px] overflow-hidden filter hover:contrast-125 transition-all duration-500 shadow-2xl shadow-indigo-500/20">
                  <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1">
                <h1 className="text-7xl font-black tracking-tighter text-[#18181b] mb-4">{data.fullName}</h1>
                <div className="inline-block bg-[#18181b] text-white px-6 py-2 text-2xl font-bold rounded-full mb-6">
                  {data.jobTitle}
                </div>
                <div className="flex gap-6 text-sm font-medium text-[#71717a]">
                  <p className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#f43f5e]"></div> {data.email}</p>
                  <p className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#8b5cf6]"></div> {data.phone}</p>
                  <p className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#10b981]"></div> {data.location}</p>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-12 gap-12 flex-1">
              <div className="col-span-7 flex flex-col gap-12">
                <section>
                  <h3 className="text-3xl font-black text-[#18181b] mb-6">Experience</h3>
                  <div className="space-y-8">
                    {data.experience.map((exp, i) => (
                      <div key={i} className="bg-white p-8 rounded-[32px] shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-2xl font-bold text-[#18181b]">{exp.role}</h4>
                          <span className="text-xs font-bold px-4 py-2 bg-[#f4f4f5] rounded-full text-[#71717a]">{exp.periodStart} &mdash; {exp.periodEnd}</span>
                        </div>
                        <p className="text-lg font-medium text-[#a1a1aa] mb-6">{exp.company}</p>
                        <div className="space-y-3">
                          {(exp.bullets || []).map((bullet, bIdx) => (
                            <p key={bIdx} className="text-[#52525b] text-md leading-relaxed">{bullet}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="col-span-5 flex flex-col gap-12">
                <section>
                  <div className="bg-[#18181b] text-white p-10 rounded-[40px] shadow-xl relative overflow-hidden">
                    <div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] bg-gradient-to-br from-[#8b5cf6] to-[#f43f5e] blur-[60px] opacity-50"></div>
                    <h3 className="text-2xl font-black mb-6 relative z-10">About</h3>
                    <p className="text-lg leading-relaxed text-[#a1a1aa] font-medium relative z-10">{data.summary}</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-3xl font-black text-[#18181b] mb-6 pl-4">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill, i) => (
                      <span key={i} className="px-5 py-3 bg-white text-[#3f3f46] text-sm font-bold rounded-2xl shadow-sm border border-[#e4e4e7] hover:-translate-y-1 transition-transform cursor-pointer">{skill}</span>
                    ))}
                  </div>
                </section>
                
                <section>
                  <h3 className="text-3xl font-black text-[#18181b] mb-6 pl-4">Education</h3>
                  <div className="bg-white p-8 rounded-[32px] shadow-sm space-y-6">
                    {data.education.map((edu, i) => (
                      <div key={i} className="border-b border-[#f4f4f5] pb-6 last:border-0 last:pb-0">
                        <h4 className="font-bold text-[#18181b] text-lg mb-1">{edu.degree}</h4>
                        <p className="text-[#71717a] font-medium mb-2">{edu.school}</p>
                        <span className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider">{edu.year}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        );

      case 'tech-lead':
        return (
          <div className="p-16 flex flex-col h-full font-mono bg-[#1e1e1e] text-[#d4d4d4] border-l-4 border-[#007acc]">
            <header className="mb-12 border-b border-[#333] pb-10 flex justify-between items-end">
              <div>
                <p className="text-[#c586c0] text-sm mb-2">{'/* Senior Tech Professional */'}</p>
                <h1 className="text-5xl font-bold text-[#4fc1ff] mb-2">{data.fullName}</h1>
                <h2 className="text-xl text-[#4ec9b0]">{data.jobTitle}</h2>
              </div>
              <div className="text-right text-sm space-y-1">
                 <p><span className="text-[#569cd6]">const</span> email <span className="text-[#d4d4d4]">=</span> <span className="text-[#ce9178]">'{data.email}'</span>;</p>
                 <p><span className="text-[#569cd6]">const</span> phone <span className="text-[#d4d4d4]">=</span> <span className="text-[#ce9178]">'{data.phone}'</span>;</p>
                 <p><span className="text-[#569cd6]">const</span> base <span className="text-[#d4d4d4]">=</span> <span className="text-[#ce9178]">'{data.location}'</span>;</p>
              </div>
            </header>

            <div className="grid grid-cols-12 gap-12 flex-1">
              <div className="col-span-8 space-y-10">
                <section>
                  <h3 className="text-2xl font-bold text-[#dcdcaa] mb-4 flex items-center gap-2">
                    <span className="text-[#569cd6]">function</span> getSummary() {'{'}
                  </h3>
                  <p className="pl-8 text-md leading-relaxed text-[#9cdcfe] border-l border-[#404040]">
                    <span className="text-[#c586c0]">return</span> <span className="text-[#ce9178] border-[#333] p-2 bg-[#2d2d2d] rounded inline-block">`{data.summary}`</span>;
                  </p>
                  <p className="text-[#dcdcaa] mt-2">{'}'}</p>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-[#dcdcaa] mb-4 flex items-center gap-2">
                    <span className="text-[#4ec9b0]">interface</span> Experience {'{'}
                  </h3>
                  <div className="pl-8 border-l border-[#404040] space-y-8">
                    {data.experience.map((exp, i) => (
                      <div key={i} className="bg-[#252526] p-6 rounded border border-[#333]">
                        <div className="flex justify-between items-baseline mb-2">
                          <h4 className="text-xl font-bold text-[#4fc1ff]">{exp.role}</h4>
                          <span className="text-xs text-[#6a9955]">// {exp.periodStart} - {exp.periodEnd}</span>
                        </div>
                        <p className="text-md font-bold text-[#4ec9b0] mb-4">@{exp.company}</p>
                        <div className="space-y-2">
                          {(exp.bullets || []).map((bullet, bIdx) => (
                            <p key={bIdx} className="text-sm font-medium flex gap-2">
                              <span className="text-[#569cd6]">-</span>
                              <span>{bullet}</span>
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-[#dcdcaa] mt-4">{'}'}</p>
                </section>
              </div>

              <div className="col-span-4 space-y-10">
                <section>
                  <h3 className="text-xl font-bold text-[#dcdcaa] mb-4 flex items-center gap-2">
                    <span className="text-[#569cd6]">const</span> skills <span className="text-[#d4d4d4]">=</span> [
                  </h3>
                  <div className="pl-8 border-l border-[#404040]">
                    <div className="flex flex-col gap-2">
                      {data.skills.map((skill, i) => (
                        <div key={i} className="text-sm">
                          <span className="text-[#ce9178]">'{skill}'</span>{i < data.skills.length - 1 ? ',' : ''}
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-[#dcdcaa] mt-2">];</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#dcdcaa] mb-4 flex items-center gap-2">
                    <span className="text-[#569cd6]">const</span> education <span className="text-[#d4d4d4]">=</span> [
                  </h3>
                  <div className="pl-8 border-l border-[#404040] space-y-4">
                    {data.education.map((edu, i) => (
                      <div key={i} className="bg-[#252526] p-4 rounded border border-[#333]">
                        <div className="text-[#9cdcfe] font-bold mb-1">{edu.degree}</div>
                        <div className="text-[#ce9178] text-sm mb-2">'{edu.school}'</div>
                        <div className="text-[#b5cea8] text-xs">/* {edu.year} */</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-[#dcdcaa] mt-4">];</p>
                </section>
              </div>
            </div>
          </div>
        );

      case 'marketing-playbook':
        return (
          <div className="p-16 flex flex-col h-full font-sans bg-[#faeee5] text-[#2c2c2c]">
            <header className="mb-12 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff6b6b] rounded-full mix-blend-multiply blur-2xl opacity-40"></div>
              <div className="absolute top-10 right-20 w-24 h-24 bg-[#fca311] rounded-full mix-blend-multiply blur-2xl opacity-40"></div>
              
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <h1 className="text-6xl font-black uppercase tracking-tight text-[#ff6b6b] mb-2">{data.fullName}</h1>
                  <h2 className="text-2xl font-bold text-[#2c2c2c] bg-white px-4 py-1 inline-block border-2 border-[#2c2c2c] shadow-[4px_4px_0px_0px_#2c2c2c] transform -rotate-2">{data.jobTitle}</h2>
                </div>
                {data.photo && (
                  <div className="size-32 rounded-full border-4 border-[#2c2c2c] overflow-hidden shadow-[8px_8px_0px_0px_#fca311] bg-white transform rotate-3">
                    <img src={data.photo} alt="Profile" className="w-full h-full object-cover grayscale" />
                  </div>
                )}
              </div>
            </header>

            <div className="grid grid-cols-12 gap-8 mb-12">
               <div className="col-span-4 bg-white border-2 border-[#2c2c2c] p-4 shadow-[4px_4px_0px_0px_#ff6b6b] flex flex-col items-center justify-center text-center">
                 <span className="material-symbols-outlined text-[#ff6b6b] text-[24px] mb-1">alternate_email</span>
                 <span className="text-sm font-bold">{data.email}</span>
               </div>
               <div className="col-span-4 bg-white border-2 border-[#2c2c2c] p-4 shadow-[4px_4px_0px_0px_#fca311] flex flex-col items-center justify-center text-center">
                 <span className="material-symbols-outlined text-[#fca311] text-[24px] mb-1">phone_iphone</span>
                 <span className="text-sm font-bold">{data.phone}</span>
               </div>
               <div className="col-span-4 bg-white border-2 border-[#2c2c2c] p-4 shadow-[4px_4px_0px_0px_#4ecdc4] flex flex-col items-center justify-center text-center">
                 <span className="material-symbols-outlined text-[#4ecdc4] text-[24px] mb-1">push_pin</span>
                 <span className="text-sm font-bold">{data.location}</span>
               </div>
            </div>

            <div className="grid grid-cols-12 gap-12 flex-1">
              <div className="col-span-8 flex flex-col gap-12">
                <section>
                  <h3 className="text-3xl font-black uppercase tracking-tight text-[#2c2c2c] mb-6 flex items-center gap-4">
                    <span className="w-8 h-8 flex items-center justify-center bg-[#ff6b6b] text-white rounded transform -rotate-6 material-symbols-outlined">auto_awesome</span>
                    The Pitch
                  </h3>
                  <p className="text-lg leading-relaxed font-medium bg-white p-6 border-l-8 border-[#ff6b6b] shadow-sm">{data.summary}</p>
                </section>

                <section>
                  <h3 className="text-3xl font-black uppercase tracking-tight text-[#2c2c2c] mb-8 flex items-center gap-4">
                    <span className="w-8 h-8 flex items-center justify-center bg-[#fca311] text-white rounded transform rotate-6 material-symbols-outlined">trending_up</span>
                    Campaigns & Roles
                  </h3>
                  <div className="space-y-10">
                    {data.experience.map((exp, i) => (
                      <div key={i} className="relative">
                         <div className="absolute left-[-24px] top-2 w-4 h-4 rounded-full border-4 border-[#faeee5] bg-[#2c2c2c] shadow-[0_0_0_2px_#2c2c2c]"></div>
                         <div className="absolute left-[-18px] top-6 bottom-[-24px] w-[4px] bg-[#2c2c2c]"></div>
                         
                         <div className="bg-white border-2 border-[#2c2c2c] p-6 shadow-[8px_8px_0px_0px_rgba(44,44,44,0.1)] relative">
                           <div className="absolute top-[-15px] right-6 bg-[#4ecdc4] border-2 border-[#2c2c2c] px-3 py-1 text-xs font-black uppercase transform rotate-2">{exp.periodStart} - {exp.periodEnd}</div>
                           <h4 className="text-2xl font-black text-[#ff6b6b] mb-1">{exp.role}</h4>
                           <p className="text-lg font-bold text-[#2c2c2c] mb-4 uppercase">{exp.company}</p>
                           <ul className="space-y-2">
                             {(exp.bullets || []).map((bullet, bIdx) => (
                               <li key={bIdx} className="font-medium text-sm flex gap-3">
                                 <span className="text-[#fca311] mt-1 material-symbols-outlined text-[16px]">arrow_right</span>
                                 {bullet}
                               </li>
                             ))}
                           </ul>
                         </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="col-span-4 flex flex-col gap-12">
                <section>
                  <h3 className="text-3xl font-black uppercase tracking-tight text-[#2c2c2c] mb-6 flex items-center gap-4">
                    <span className="w-8 h-8 flex items-center justify-center bg-[#4ecdc4] text-white rounded transform -rotate-3 material-symbols-outlined">build</span>
                    Toolkit
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {data.skills.map((skill, i) => (
                      <span key={i} className="bg-white border-2 border-[#2c2c2c] text-[#2c2c2c] text-sm font-bold px-3 py-2 shadow-[4px_4px_0px_0px_#4ecdc4] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer">{skill}</span>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-3xl font-black uppercase tracking-tight text-[#2c2c2c] mb-6 flex items-center gap-4">
                    <span className="w-8 h-8 flex items-center justify-center bg-[#ff6b6b] text-white rounded transform rotate-3 material-symbols-outlined">school</span>
                    Education
                  </h3>
                  <div className="space-y-6">
                    {data.education.map((edu, i) => (
                      <div key={i} className="bg-white border-2 border-[#2c2c2c] p-5 shadow-[4px_4px_0px_0px_rgba(44,44,44,0.2)]">
                        <h4 className="font-black text-[#fca311] leading-tight mb-2">{edu.degree}</h4>
                        <p className="font-bold text-sm mb-2">{edu.school}</p>
                        <span className="inline-block bg-[#2c2c2c] text-white text-xs font-bold px-2 py-1">{edu.year}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        );

      case 'culinary-artist':
        return (
          <div className="p-16 flex flex-col h-full font-serif bg-[#fdfaf6] text-[#3a352e]">
             <header className="text-center mb-16 relative">
               <div className="absolute left-1/2 top-4 w-32 h-px bg-[#d4c5b0] -translate-x-[150%]"></div>
               <div className="absolute right-1/2 top-4 w-32 h-px bg-[#d4c5b0] translate-x-[150%]"></div>
               
               <h1 className="text-6xl font-light tracking-widest uppercase mb-4 text-[#2a2520]">{data.fullName}</h1>
               <p className="text-xl italic text-[#8a7d6d] drop-shadow-sm mb-6">{data.jobTitle}</p>
               
               <div className="flex justify-center items-center gap-6 text-sm font-sans tracking-widest text-[#5a5043] uppercase">
                 <span>{data.email}</span>
                 <span className="w-1.5 h-1.5 bg-[#d4c5b0] rounded-full transform rotate-45"></span>
                 <span>{data.phone}</span>
                 <span className="w-1.5 h-1.5 bg-[#d4c5b0] rounded-full transform rotate-45"></span>
                 <span>{data.location}</span>
               </div>
             </header>

             <div className="flex-1 max-w-4xl mx-auto w-full">
               <section className="mb-16 pb-12 border-b border-[#eaddc9] relative">
                 <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[#d4c5b0] material-symbols-outlined">restaurant_menu</div>
                 <h3 className="text-center font-sans text-xs font-bold uppercase tracking-[0.3em] text-[#8a7d6d] mb-6">Culinary Philosophy</h3>
                 <p className="text-xl leading-[1.8] text-center italic text-[#4a4036]">"{data.summary}"</p>
               </section>

               <div className="grid grid-cols-12 gap-16">
                 <div className="col-span-8">
                   <h3 className="font-sans text-sm font-bold uppercase tracking-[0.3em] text-[#2a2520] mb-8 pb-3 border-b-2 border-[#d4c5b0] inline-block">Service Highlights</h3>
                   <div className="space-y-12">
                     {data.experience.map((exp, i) => (
                       <div key={i}>
                         <div className="flex justify-between items-baseline mb-2">
                           <h4 className="text-2xl font-normal text-[#2a2520]">{exp.role}</h4>
                           <span className="font-sans text-xs font-bold tracking-widest text-[#8a7d6d]">{exp.periodStart} &mdash; {exp.periodEnd}</span>
                         </div>
                         <p className="text-md font-sans uppercase tracking-widest text-[#a89070] mb-4">{exp.company}</p>
                         <ul className="space-y-3">
                           {(exp.bullets || []).map((bullet, bIdx) => (
                             <li key={bIdx} className="flex gap-4 text-[#4a4036] leading-relaxed">
                               <span className="text-[#d4c5b0] mt-1">&rarr;</span>
                               <span className="italic">{bullet}</span>
                             </li>
                           ))}
                         </ul>
                       </div>
                     ))}
                   </div>
                 </div>

                 <div className="col-span-4 space-y-12">
                   <section>
                      <h3 className="font-sans text-sm font-bold uppercase tracking-[0.3em] text-[#2a2520] mb-8 pb-3 border-b-2 border-[#d4c5b0] inline-block">Techniques</h3>
                      <ul className="space-y-4 font-sans text-sm tracking-widest text-[#4a4036] uppercase">
                        {data.skills.map((skill, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <span className="w-1 h-1 bg-[#2a2520] rotate-45"></span>
                            {skill}
                          </li>
                        ))}
                      </ul>
                   </section>

                   <section>
                      <h3 className="font-sans text-sm font-bold uppercase tracking-[0.3em] text-[#2a2520] mb-8 pb-3 border-b-2 border-[#d4c5b0] inline-block">Training</h3>
                      <div className="space-y-6">
                        {data.education.map((edu, i) => (
                          <div key={i} className="border-l border-[#d4c5b0] pl-4">
                            <h4 className="font-normal text-[#2a2520] text-lg mb-1">{edu.degree}</h4>
                            <p className="text-sm font-sans text-[#8a7d6d] uppercase tracking-wider mb-1">{edu.school}</p>
                            <span className="text-xs italic text-[#a89070]">{edu.year}</span>
                          </div>
                        ))}
                      </div>
                   </section>
                 </div>
               </div>
             </div>
          </div>
        );

      case 'legal-counsel':
        return (
          <div className="p-16 flex flex-col h-full font-serif bg-white text-[#1a1c20] border-12 border-[#1a1c20]">
            <header className="border-b-4 border-[#1a1c20] pb-8 mb-12 flex justify-between items-end">
              <div>
                <h1 className="text-5xl font-black uppercase tracking-widest mb-2" style={{ fontFeatureSettings: '"smcp" 1' }}>{data.fullName}</h1>
                <p className="text-2xl italic text-[#4a5568]">{data.jobTitle}</p>
              </div>
              <div className="text-right font-sans text-sm font-bold tracking-widest uppercase text-[#718096] space-y-1 border-l-2 border-[#e2e8f0] pl-6">
                <p>{data.email}</p>
                <p>{data.phone}</p>
                <p>{data.location}</p>
              </div>
            </header>

            <section className="mb-12 columns-1">
              <p className="text-lg leading-relaxed text-justify first-letter:text-5xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:mt-[-4px]">
                {data.summary}
              </p>
            </section>

            <div className="grid grid-cols-12 gap-16 flex-1 relative">
               <div className="absolute left-[65%] top-0 bottom-0 w-px bg-[#cbd5e1] hidden lg:block"></div>
               
               <div className="col-span-8 flex flex-col gap-10">
                 <section>
                   <h3 className="font-sans text-lg font-black uppercase tracking-[0.2em] mb-8 text-[#1a1c20] flex items-center">
                     <span className="material-symbols-outlined mr-3 text-2xl">balance</span>
                     Legal Experience
                   </h3>
                   <div className="space-y-10">
                     {data.experience.map((exp, i) => (
                       <div key={i}>
                         <h4 className="text-2xl font-bold mb-1">{exp.role}</h4>
                         <div className="flex justify-between items-center mb-4 border-b border-[#e2e8f0] pb-2">
                           <span className="font-sans font-bold uppercase tracking-widest text-[#4a5568]">{exp.company}</span>
                           <span className="font-sans text-sm font-bold tracking-widest text-[#718096]">{exp.periodStart} &mdash; {exp.periodEnd}</span>
                         </div>
                         <p className="text-md leading-relaxed text-[#2d3748] whitespace-pre-line text-justify">
                           {(exp.bullets || []).join(' ')}
                         </p>
                       </div>
                     ))}
                   </div>
                 </section>
               </div>

               <div className="col-span-4 flex flex-col gap-10 pl-4">
                 <section>
                   <h3 className="font-sans text-lg font-black uppercase tracking-[0.2em] mb-8 text-[#1a1c20] flex items-center">
                     <span className="material-symbols-outlined mr-3 text-2xl">gavel</span>
                     Practice Areas
                   </h3>
                   <ul className="space-y-3 font-sans text-sm font-bold uppercase tracking-wider text-[#4a5568]">
                     {data.skills.map((skill, i) => (
                       <li key={i} className="flex items-start gap-2">
                         <span className="mt-1 w-1.5 h-1.5 bg-[#1a1c20]"></span>
                         {skill}
                       </li>
                     ))}
                   </ul>
                 </section>

                 <section>
                   <h3 className="font-sans text-lg font-black uppercase tracking-[0.2em] mb-8 text-[#1a1c20] flex items-center">
                     <span className="material-symbols-outlined mr-3 text-2xl">school</span>
                     Education
                   </h3>
                   <div className="space-y-6">
                     {data.education.map((edu, i) => (
                       <div key={i}>
                         <h4 className="font-bold text-lg mb-1">{edu.degree}</h4>
                         <p className="italic text-[#4a5568] mb-1">{edu.school}</p>
                         <p className="font-sans text-sm font-bold text-[#718096]">Class of {edu.year}</p>
                       </div>
                     ))}
                   </div>
                 </section>
               </div>
            </div>
          </div>
        );

      case 'real-estate-pro':
        return (
          <div className="p-16 flex flex-col h-full font-sans bg-[#f3f4f6] text-[#1f2937]">
            <header className="bg-white rounded-3xl p-10 shadow-lg shadow-blue-900/5 mb-10 flex items-center gap-10">
              {data.photo && (
                <div className="size-40 rounded-full border-8 border-white shadow-xl overflow-hidden shrink-0 relative">
                  <div className="absolute inset-0 ring-1 ring-black/5 rounded-full z-10"></div>
                  <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1">
                <h1 className="text-5xl font-black text-[#111827] tracking-tight mb-2">{data.fullName}</h1>
                <p className="text-2xl font-medium text-[#2563eb] mb-6">{data.jobTitle}</p>
                <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold text-[#6b7280]">
                  <span className="flex items-center gap-2"><div className="p-1.5 rounded-lg bg-blue-50 text-[#2563eb]"><span className="material-symbols-outlined text-[16px]">call</span></div> {data.phone}</span>
                  <span className="flex items-center gap-2"><div className="p-1.5 rounded-lg bg-blue-50 text-[#2563eb]"><span className="material-symbols-outlined text-[16px]">mail</span></div> {data.email}</span>
                  <span className="flex items-center gap-2"><div className="p-1.5 rounded-lg bg-blue-50 text-[#2563eb]"><span className="material-symbols-outlined text-[16px]">location_on</span></div> {data.location}</span>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-3 gap-10 flex-1">
              <div className="col-span-2 flex flex-col gap-10">
                <section className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-black text-[#111827] mb-4 uppercase tracking-wider flex items-center gap-2">
                    <span className="text-[#2563eb] material-symbols-outlined">person</span> About Me
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-medium text-lg">{data.summary}</p>
                </section>

                <section className="flex-1 bg-white p-10 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5 text-[#2563eb] material-symbols-outlined !text-9xl pointer-events-none">real_estate_agent</div>
                  <h3 className="text-xl font-black text-[#111827] mb-8 uppercase tracking-wider flex items-center gap-2 relative z-10">
                    <span className="text-[#2563eb] material-symbols-outlined">work_history</span> Experience
                  </h3>
                  <div className="space-y-10 relative z-10">
                    {data.experience.map((exp, i) => (
                      <div key={i} className="relative pl-6">
                        <div className="absolute left-[-5px] top-2 bottom-[-2.5rem] w-[2px] bg-blue-100 last:hidden"></div>
                        <div className="absolute left-[-10px] top-1.5 w-3 h-3 rounded-full bg-[#2563eb] border-2 border-white shadow-sm"></div>
                        
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-xl font-bold text-[#111827]">{exp.role}</h4>
                          <span className="text-xs font-bold text-[#2563eb] bg-blue-50 px-3 py-1 rounded-full">{exp.periodStart} - {exp.periodEnd}</span>
                        </div>
                        <p className="text-md font-bold text-gray-500 mb-4">{exp.company}</p>
                        <ul className="space-y-2">
                          {(exp.bullets || []).map((bullet, bIdx) => (
                            <li key={bIdx} className="text-sm font-medium text-gray-600 flex gap-3">
                              <span className="text-[#2563eb]">&bull;</span> {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="col-span-1 flex flex-col gap-10">
                 <section className="bg-blue-600 text-white p-10 rounded-3xl shadow-xl shadow-blue-900/20">
                    <h3 className="text-xl font-black mb-6 uppercase tracking-wider flex items-center gap-2">
                      <span className="material-symbols-outlined">verified</span> Expertise
                    </h3>
                    <div className="flex flex-col gap-4 text-sm font-semibold">
                      {data.skills.map((skill, i) => (
                        <div key={i} className="flex justify-between items-center border-b border-blue-500/50 pb-2">
                          <span>{skill}</span>
                          <span className="material-symbols-outlined text-[16px] text-blue-300">check_circle</span>
                        </div>
                      ))}
                    </div>
                 </section>

                 <section className="flex-1 bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-black text-[#111827] mb-6 uppercase tracking-wider flex items-center gap-2">
                      <span className="text-[#2563eb] material-symbols-outlined">school</span> Credentials
                    </h3>
                    <div className="space-y-6">
                      {data.education.map((edu, i) => (
                        <div key={i} className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                          <h4 className="font-bold text-[#111827] mb-1">{edu.degree}</h4>
                          <p className="text-sm text-gray-500 mb-2">{edu.school}</p>
                          <span className="inline-block bg-white border border-gray-200 text-gray-400 text-xs font-bold px-2 py-1 rounded-lg">{edu.year}</span>
                        </div>
                      ))}
                    </div>
                 </section>
              </div>
            </div>
          </div>
        );

      case 'elegant-simple':
        return (
          <div className="p-16 flex flex-col h-full font-serif bg-white text-gray-800">
             <header className="text-center border-b border-gray-300 pb-8 mb-10">
               <h1 className="text-5xl font-normal tracking-wide text-gray-900 mb-3">{data.fullName}</h1>
               <h2 className="text-xl text-gray-600 italic tracking-wider mb-6">{data.jobTitle}</h2>
               
               <div className="flex justify-center items-center gap-4 text-sm font-sans tracking-wide text-gray-500 uppercase">
                 <span>{data.email}</span>
                 <span className="text-gray-300">|</span>
                 <span>{data.phone}</span>
                 <span className="text-gray-300">|</span>
                 <span>{data.location}</span>
               </div>
             </header>

             <div className="flex-1 w-full max-w-4xl mx-auto">
               <section className="mb-10 text-center">
                 <p className="text-lg leading-relaxed text-gray-700 italic">"{data.summary}"</p>
               </section>

               <div className="grid grid-cols-12 gap-12">
                 <div className="col-span-8">
                   <section className="mb-10">
                     <h3 className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-gray-900 mb-6 pb-2 border-b border-gray-200">Experience</h3>
                     <div className="space-y-8">
                       {data.experience.map((exp, i) => (
                         <div key={i}>
                           <div className="flex justify-between items-baseline mb-1">
                             <h4 className="text-xl font-medium text-gray-900">{exp.role}</h4>
                             <span className="font-sans text-xs tracking-wider text-gray-500">{exp.periodStart} - {exp.periodEnd}</span>
                           </div>
                           <p className="text-md font-sans text-gray-600 mb-3">{exp.company}</p>
                           <ul className="space-y-2">
                             {(exp.bullets || []).map((bullet, bIdx) => (
                               <li key={bIdx} className="flex gap-3 text-gray-700 leading-relaxed text-sm">
                                 <span className="text-gray-400 mt-0.5">•</span>
                                 <span>{bullet}</span>
                               </li>
                             ))}
                           </ul>
                         </div>
                       ))}
                     </div>
                   </section>
                 </div>

                 <div className="col-span-4">
                   <section className="mb-10">
                      <h3 className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-gray-900 mb-6 pb-2 border-b border-gray-200">Skills</h3>
                      <ul className="space-y-3 font-sans text-sm text-gray-700">
                        {data.skills.map((skill, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                            {skill}
                          </li>
                        ))}
                      </ul>
                   </section>

                   <section>
                      <h3 className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-gray-900 mb-6 pb-2 border-b border-gray-200">Education</h3>
                      <div className="space-y-6">
                        {data.education.map((edu, i) => (
                          <div key={i}>
                            <h4 className="font-medium text-gray-900 mb-1">{edu.degree}</h4>
                            <p className="text-sm text-gray-600 mb-1">{edu.school}</p>
                            <span className="font-sans text-xs text-gray-500">{edu.year}</span>
                          </div>
                        ))}
                      </div>
                   </section>
                 </div>
               </div>
             </div>
          </div>
        );

      case 'luxury-brand':
        return (
          <div className="p-16 flex flex-col h-full font-serif bg-[#111] text-[#fff] border-[12px] border-[#000]">
            <header className="mb-16 text-center">
              <h1 className="text-5xl font-light tracking-[0.3em] uppercase text-[#d4af37] mb-4">{data.fullName}</h1>
              <div className="w-16 h-px bg-[#d4af37] mx-auto mb-4"></div>
              <p className="text-lg tracking-widest uppercase text-[#888]">{data.jobTitle}</p>
            </header>

            <div className="grid grid-cols-12 gap-16 flex-1">
              <div className="col-span-12 flex justify-center gap-12 text-sm font-sans tracking-[0.2em] uppercase text-[#666] mb-12 border-y border-[#333] py-4">
                <span>{data.email}</span>
                <span>{data.phone}</span>
                <span>{data.location}</span>
              </div>

              <div className="col-span-8 flex flex-col gap-12">
                <section>
                  <h3 className="text-[#d4af37] font-sans text-xs font-bold tracking-[0.3em] uppercase mb-8">Profile</h3>
                  <p className="text-[#aaa] text-lg leading-[1.8] italic font-light">"{data.summary}"</p>
                </section>

                <section>
                  <h3 className="text-[#d4af37] font-sans text-xs font-bold tracking-[0.3em] uppercase mb-8">Experience</h3>
                  <div className="space-y-12">
                    {data.experience.map((exp, i) => (
                      <div key={i} className="border-l border-[#333] pl-6">
                        <div className="flex justify-between items-baseline mb-2">
                          <h4 className="text-2xl font-normal text-[#fff]">{exp.role}</h4>
                          <span className="font-sans text-[10px] tracking-[0.2em] text-[#666] uppercase">{exp.periodStart} - {exp.periodEnd}</span>
                        </div>
                        <p className="text-[#d4af37] uppercase tracking-widest text-sm mb-4">{exp.company}</p>
                        <ul className="space-y-2">
                          {(exp.bullets || []).map((bullet, bIdx) => (
                            <li key={bIdx} className="text-[#888] font-light leading-relaxed text-sm flex gap-3">
                              <span className="text-[#444]">—</span> {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="col-span-4 flex flex-col gap-12">
                <section>
                  <h3 className="text-[#d4af37] font-sans text-xs font-bold tracking-[0.3em] uppercase mb-8">Expertise</h3>
                  <ul className="space-y-4">
                    {data.skills.map((skill, i) => (
                      <li key={i} className="text-[#bbb] font-sans text-sm tracking-[0.1em] uppercase border-b border-[#222] pb-2">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="text-[#d4af37] font-sans text-xs font-bold tracking-[0.3em] uppercase mb-8">Education</h3>
                  <div className="space-y-8">
                    {data.education.map((edu, i) => (
                      <div key={i}>
                        <h4 className="text-[#fff] font-normal mb-1">{edu.degree}</h4>
                        <p className="text-[#888] text-sm italic mb-1">{edu.school}</p>
                        <span className="text-[#666] font-sans text-[10px] tracking-[0.2em]">{edu.year}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        );

      case 'monochrome-bold':
        return (
          <div className="p-16 flex flex-col h-full font-sans bg-white text-black">
            <header className="mb-16 border-b-8 border-black pb-8 flex flex-col gap-4">
              <h1 className="text-8xl font-black uppercase tracking-tighter leading-none">{data.fullName}</h1>
              <div className="flex justify-between items-end">
                <h2 className="text-3xl font-bold bg-black text-white px-4 py-2 uppercase tracking-tight inline-block">{data.jobTitle}</h2>
                <div className="text-right text-sm font-bold uppercase tracking-wider space-y-1">
                  <p>{data.email}</p>
                  <p>{data.phone}</p>
                  <p>{data.location}</p>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-12 gap-12 flex-1">
              <div className="col-span-4 flex flex-col gap-12">
                 <section className="bg-black text-white p-8">
                   <h3 className="text-2xl font-black uppercase mb-6 tracking-tight">Focus</h3>
                   <div className="flex flex-col gap-3">
                     {data.skills.map((skill, i) => (
                       <span key={i} className="font-bold border border-white/30 px-3 py-2 text-sm uppercase">{skill}</span>
                     ))}
                   </div>
                 </section>

                 <section>
                   <h3 className="text-2xl font-black uppercase mb-6 tracking-tight border-b-4 border-black pb-2">Education</h3>
                   <div className="space-y-6">
                     {data.education.map((edu, i) => (
                       <div key={i}>
                         <h4 className="font-black text-lg uppercase leading-tight">{edu.degree}</h4>
                         <p className="font-bold text-gray-500">{edu.school}</p>
                         <p className="font-black text-sm bg-gray-200 inline-block px-2 mt-1">{edu.year}</p>
                       </div>
                     ))}
                   </div>
                 </section>
              </div>

              <div className="col-span-8 flex flex-col gap-12 pl-8 border-l-4 border-black">
                 <section>
                   <h3 className="text-2xl font-black uppercase mb-6 tracking-tight">Summary</h3>
                   <p className="text-xl font-bold leading-relaxed text-gray-800">{data.summary}</p>
                 </section>

                 <section>
                   <h3 className="text-2xl font-black uppercase mb-8 tracking-tight">Experience</h3>
                   <div className="space-y-12">
                     {data.experience.map((exp, i) => (
                       <div key={i} className="relative">
                         <div className="flex flex-col mb-4">
                           <div className="flex justify-between items-center mb-1">
                             <h4 className="text-3xl font-black uppercase tracking-tight">{exp.role}</h4>
                             <span className="font-black text-sm bg-black text-white px-3 py-1 uppercase">{exp.periodStart}—{exp.periodEnd}</span>
                           </div>
                           <h5 className="text-xl font-bold text-gray-500 uppercase">{exp.company}</h5>
                         </div>
                         <div className="space-y-3 pl-4 border-l-4 border-gray-200">
                           {(exp.bullets || []).map((bullet, bIdx) => (
                             <p key={bIdx} className="font-medium text-lg leading-snug">{bullet}</p>
                           ))}
                         </div>
                       </div>
                     ))}
                   </div>
                 </section>
              </div>
            </div>
          </div>
        );

      case 'nature-calm':
        return (
          <div className="p-16 flex flex-col h-full font-serif bg-[#f4f1eb] text-[#4a5342]">
            <header className="mb-12 flex gap-12 items-center">
              {data.photo && (
                <div className="size-40 rounded-full overflow-hidden border-4 border-[#8e9d80] shadow-xl shrink-0">
                  <img src={data.photo} alt="Profile" className="w-full h-full object-cover grayscale opacity-90 sepia-[.3]" />
                </div>
              )}
              <div>
                <h1 className="text-6xl font-light text-[#303829] tracking-wide mb-3">{data.fullName}</h1>
                <p className="text-2xl italic text-[#728263] mb-6">{data.jobTitle}</p>
                <div className="flex gap-6 font-sans text-sm font-bold tracking-widest uppercase text-[#8e9d80]">
                  <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#8e9d80]"></div> {data.email}</span>
                  <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#8e9d80]"></div> {data.phone}</span>
                  <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#8e9d80]"></div> {data.location}</span>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-12 gap-16 flex-1">
              <div className="col-span-4 flex flex-col gap-10 border-r border-[#d3dacb] pr-10">
                 <section>
                   <h3 className="text-xl font-bold uppercase tracking-widest text-[#303829] mb-6 flex items-center gap-3">
                     <span className="material-symbols-outlined text-[#728263]">spa</span>
                     About
                   </h3>
                   <p className="text-md leading-relaxed text-[#5c6652] italic">{data.summary}</p>
                 </section>

                 <section>
                   <h3 className="text-xl font-bold uppercase tracking-widest text-[#303829] mb-6 flex items-center gap-3">
                     <span className="material-symbols-outlined text-[#728263]">grass</span>
                     Skills
                   </h3>
                   <div className="flex flex-col gap-3">
                     {data.skills.map((skill, i) => (
                       <span key={i} className="font-sans text-sm font-bold text-[#4a5342] bg-[#e8eada] px-4 py-2 rounded-full border border-[#d3dacb]">{skill}</span>
                     ))}
                   </div>
                 </section>
              </div>

              <div className="col-span-8 flex flex-col gap-10">
                 <section>
                   <h3 className="text-xl font-bold uppercase tracking-widest text-[#303829] mb-8 flex items-center gap-3">
                     <span className="material-symbols-outlined text-[#728263]">nature_people</span>
                     Experience
                   </h3>
                   <div className="space-y-10">
                     {data.experience.map((exp, i) => (
                       <div key={i} className="relative">
                         <div className="flex justify-between items-baseline mb-2">
                           <h4 className="text-2xl font-normal text-[#303829]">{exp.role}</h4>
                           <span className="font-sans text-xs font-bold tracking-widest text-[#8e9d80] uppercase">{exp.periodStart} - {exp.periodEnd}</span>
                         </div>
                         <h5 className="text-lg italic text-[#728263] mb-4">{exp.company}</h5>
                         <ul className="space-y-3 font-sans text-sm">
                           {(exp.bullets || []).map((bullet, bIdx) => (
                             <li key={bIdx} className="text-[#5c6652] leading-relaxed flex items-start gap-3">
                               <span className="material-symbols-outlined text-[16px] text-[#a4b395] mt-0.5">psychiatry</span>
                               {bullet}
                             </li>
                           ))}
                         </ul>
                       </div>
                     ))}
                   </div>
                 </section>

                 <section>
                   <h3 className="text-xl font-bold uppercase tracking-widest text-[#303829] mb-6 flex items-center gap-3 mt-6">
                     <span className="material-symbols-outlined text-[#728263]">eco</span>
                     Education
                   </h3>
                   <div className="grid grid-cols-2 gap-8">
                     {data.education.map((edu, i) => (
                       <div key={i} className="bg-[#e8eada] p-6 rounded-2xl border border-[#d3dacb]">
                         <h4 className="font-bold text-lg text-[#303829] mb-1">{edu.degree}</h4>
                         <p className="text-[#5c6652] italic mb-3">{edu.school}</p>
                         <span className="font-sans text-xs font-bold tracking-widest text-[#8e9d80] uppercase">{edu.year}</span>
                       </div>
                     ))}
                   </div>
                 </section>
              </div>
            </div>
          </div>
        );

      case 'sunset-glow':
        return (
          <div className="p-16 flex flex-col h-full font-sans bg-[#fffcf9] text-[#4a3b32]">
            <header className="relative mb-16 pb-12 border-b-2 border-[#ffe8d6]">
              <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-br from-[#ffb4a2] to-[#e5989b] rounded-full blur-[80px] opacity-40 mix-blend-multiply pointer-events-none"></div>
              
              <h1 className="text-6xl font-black tracking-tight text-[#b5838d] mb-4">{data.fullName}</h1>
              <h2 className="text-2xl font-bold text-[#ffae5c]">{data.jobTitle}</h2>
              
              <div className="flex gap-8 mt-8 text-sm font-semibold text-[#6d6875] uppercase tracking-wider">
                 <p className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#ffb4a2]"></span> {data.email}</p>
                 <p className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#e5989b]"></span> {data.phone}</p>
                 <p className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#b5838d]"></span> {data.location}</p>
              </div>
            </header>

            <div className="grid grid-cols-12 gap-16 flex-1 z-10">
              <div className="col-span-8 space-y-12">
                <section>
                   <h3 className="text-2xl font-black text-[#6d6875] mb-6 flex items-center gap-4">
                     Overview <div className="h-[2px] w-12 bg-gradient-to-r from-[#ffae5c] to-transparent"></div>
                   </h3>
                   <p className="text-lg leading-relaxed text-[#4a3b32]">{data.summary}</p>
                </section>

                <section>
                   <h3 className="text-2xl font-black text-[#6d6875] mb-8 flex items-center gap-4">
                     Experience <div className="h-[2px] w-12 bg-gradient-to-r from-[#e5989b] to-transparent"></div>
                   </h3>
                   <div className="space-y-10">
                     {data.experience.map((exp, i) => (
                       <div key={i} className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(255,180,162,0.12)] border border-[#ffe8d6]">
                         <div className="flex justify-between items-start mb-2">
                           <h4 className="text-xl font-bold text-[#b5838d]">{exp.role}</h4>
                           <span className="text-xs font-bold text-[#ffae5c] bg-[#fff0ea] px-3 py-1 rounded-full">{exp.periodStart} - {exp.periodEnd}</span>
                         </div>
                         <p className="font-semibold text-[#6d6875] mb-5">{exp.company}</p>
                         <ul className="space-y-2">
                           {(exp.bullets || []).map((bullet, bIdx) => (
                              <li key={bIdx} className="text-[#4a3b32] text-sm leading-relaxed flex gap-3">
                                <span className="text-[#e5989b] material-symbols-outlined text-[16px]">wb_sunny</span>
                                {bullet}
                              </li>
                           ))}
                         </ul>
                       </div>
                     ))}
                   </div>
                </section>
              </div>

              <div className="col-span-4 space-y-12">
                <section>
                   <h3 className="text-2xl font-black text-[#6d6875] mb-6 flex items-center gap-4">
                     Skills <div className="h-[2px] w-12 bg-gradient-to-r from-[#b5838d] to-transparent"></div>
                   </h3>
                   <div className="flex flex-wrap gap-3">
                     {data.skills.map((skill, i) => (
                       <span key={i} className="bg-gradient-to-r from-[#ffb4a2] to-[#e5989b] text-white font-bold text-sm px-4 py-2 rounded-2xl">{skill}</span>
                     ))}
                   </div>
                </section>

                <section>
                   <h3 className="text-2xl font-black text-[#6d6875] mb-6 flex items-center gap-4">
                     Education <div className="h-[2px] w-12 bg-gradient-to-r from-[#ffb4a2] to-transparent"></div>
                   </h3>
                   <div className="space-y-6">
                     {data.education.map((edu, i) => (
                       <div key={i}>
                         <h4 className="font-bold text-[#b5838d] text-lg mb-1">{edu.degree}</h4>
                         <p className="text-sm font-semibold text-[#6d6875] mb-2">{edu.school}</p>
                         <span className="text-xs font-bold text-[#ffae5c]">{edu.year}</span>
                       </div>
                     ))}
                   </div>
                </section>
                
                {data.photo && (
                  <div className="pt-8">
                     <div className="aspect-square rounded-[3rem] overflow-hidden border-8 border-white shadow-[0_20px_40px_rgb(255,180,162,0.3)]">
                       <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
                     </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'healthcare-clean':
        return (
          <div className="p-16 flex flex-col h-full font-sans bg-[#f8fafc] text-[#334155]">
            <header className="mb-12 flex items-center justify-between border-b-4 border-[#0ea5e9] pb-8 bg-white p-8 rounded-3xl shadow-sm">
              <div>
                <h1 className="text-5xl font-black text-[#0f172a] tracking-tight mb-2">{data.fullName}</h1>
                <p className="text-xl font-bold text-[#0ea5e9] mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined">health_and_safety</span>
                  {data.jobTitle}
                </p>
                <div className="flex gap-6 text-sm font-semibold text-[#64748b]">
                  <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">email</span> {data.email}</span>
                  <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">call</span> {data.phone}</span>
                  <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">location_on</span> {data.location}</span>
                </div>
              </div>
              {data.photo && (
                <div className="size-32 rounded-3xl overflow-hidden border-4 border-[#e0f2fe] bg-white p-1">
                  <div className="w-full h-full rounded-2xl overflow-hidden">
                    <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                </div>
              )}
            </header>

            <div className="grid grid-cols-12 gap-10 flex-1">
              <div className="col-span-4 flex flex-col gap-8">
                <section className="bg-white p-8 rounded-3xl shadow-sm border border-[#f1f5f9]">
                  <h3 className="text-lg font-black text-[#0f172a] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#0ea5e9]">clinical_notes</span> Summary
                  </h3>
                  <p className="text-[#475569] leading-relaxed text-sm font-medium">{data.summary}</p>
                </section>

                <section className="bg-white p-8 rounded-3xl shadow-sm border border-[#f1f5f9]">
                  <h3 className="text-lg font-black text-[#0f172a] uppercase tracking-wider mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#0ea5e9]">fact_check</span> Competencies
                  </h3>
                  <div className="flex flex-col gap-3">
                    {data.skills.map((skill, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#38bdf8]"></div>
                        <span className="font-semibold text-sm text-[#334155]">{skill}</span>
                      </div>
                    ))}
                  </div>
                </section>
                
                <section className="bg-white p-8 rounded-3xl shadow-sm border border-[#f1f5f9] mt-auto">
                  <h3 className="text-lg font-black text-[#0f172a] uppercase tracking-wider mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#0ea5e9]">school</span> Credentials
                  </h3>
                  <div className="space-y-5">
                    {data.education.map((edu, i) => (
                      <div key={i}>
                        <h4 className="font-bold text-[#0f172a] mb-1 leading-tight text-sm">{edu.degree}</h4>
                        <p className="text-xs text-[#64748b] mb-1">{edu.school}</p>
                        <span className="text-[10px] font-bold uppercase bg-[#e0f2fe] text-[#0284c7] px-2 py-0.5 rounded">{edu.year}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="col-span-8 flex flex-col gap-8">
                <section className="bg-white p-10 rounded-3xl shadow-sm border border-[#f1f5f9] flex-1">
                  <h3 className="text-xl font-black text-[#0f172a] uppercase tracking-wider mb-8 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#0ea5e9]">work</span> Clinical Experience
                  </h3>
                  <div className="space-y-10">
                    {data.experience.map((exp, i) => (
                      <div key={i} className="relative pl-6">
                        <div className="absolute left-[-2px] inset-y-1 w-1 bg-[#bae6fd] rounded-full"></div>
                        <div className="flex flex-col mb-4 bg-[#f8fafc] p-4 rounded-2xl">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="text-lg font-bold text-[#0f172a]">{exp.role}</h4>
                            <span className="text-xs font-bold text-[#0284c7] px-2 py-1 bg-[#e0f2fe] rounded">{exp.periodStart} - {exp.periodEnd}</span>
                          </div>
                          <p className="font-semibold text-[#0ea5e9] text-sm">{exp.company}</p>
                        </div>
                        <ul className="space-y-3 px-4">
                          {(exp.bullets || []).map((bullet, bIdx) => (
                            <li key={bIdx} className="text-sm text-[#475569] font-medium leading-relaxed flex items-start gap-3">
                               <span className="material-symbols-outlined text-[16px] text-[#7dd3fc] mt-0.5">check_circle</span>
                               {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        );

      case 'education-pro':
        return (
          <div className="p-16 flex flex-col h-full font-serif bg-white text-[#2a2a2a]">
             <header className="mb-12 border-y-4 border-[#1e3a8a] py-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 flex px-4">
                  <div className="w-1 h-full bg-[#bfdbfe] mx-8"></div>
                  <div className="w-px h-full bg-[#e0e7ff] mx-8"></div>
                </div>
                
                <div className="relative z-10 bg-white/90 py-4 px-12 inline-block rounded-xl">
                  <h1 className="text-5xl font-bold tracking-tight text-[#1e3a8a] mb-2">{data.fullName}</h1>
                  <h2 className="text-2xl italic text-[#3b82f6] font-medium">{data.jobTitle}</h2>
                </div>
             </header>

             <div className="flex justify-center gap-10 font-sans text-sm font-bold tracking-widest uppercase text-[#4b5563] mb-12">
               <span className="pb-1 border-b-2 border-[#60a5fa]">{data.email}</span>
               <span className="pb-1 border-b-2 border-[#60a5fa]">{data.phone}</span>
               <span className="pb-1 border-b-2 border-[#60a5fa]">{data.location}</span>
             </div>

             <div className="max-w-4xl mx-auto w-full flex flex-col gap-12 flex-1">
               <section>
                 <h3 className="font-sans text-lg font-black uppercase tracking-widest text-[#1e3a8a] mb-6 flex items-center gap-4">
                   <div className="w-8 h-8 rounded bg-[#dbeafe] text-[#2563eb] flex items-center justify-center material-symbols-outlined">menu_book</div>
                   Teaching Philosophy
                 </h3>
                 <p className="text-lg leading-relaxed text-[#374151] italic pl-12 border-l-4 border-[#93c5fd]">
                   "{data.summary}"
                 </p>
               </section>

               <section>
                 <h3 className="font-sans text-lg font-black uppercase tracking-widest text-[#1e3a8a] mb-8 flex items-center gap-4">
                   <div className="w-8 h-8 rounded bg-[#dbeafe] text-[#2563eb] flex items-center justify-center material-symbols-outlined">work</div>
                   Professional Experience
                 </h3>
                 <div className="space-y-12 pl-12">
                   {data.experience.map((exp, i) => (
                     <div key={i} className="relative">
                        <div className="absolute left-[-2rem] top-2 w-3 h-3 rounded-full bg-[#2563eb] ring-4 ring-[#dbeafe]"></div>
                        <div className="absolute left-[-21px] top-6 bottom-[-2rem] w-0.5 bg-[#e0e7ff] last:hidden"></div>
                        <div className="flex justify-between items-baseline mb-2">
                          <h4 className="text-2xl font-bold text-[#1e3a8a]">{exp.role}</h4>
                          <span className="font-sans text-sm font-bold uppercase tracking-wider text-[#3b82f6]">{exp.periodStart} - {exp.periodEnd}</span>
                        </div>
                        <h5 className="font-sans text-md font-bold text-[#6b7280] uppercase tracking-widest mb-4">{exp.company}</h5>
                        <ul className="space-y-2 list-disc pl-5 marker:text-[#93c5fd]">
                          {(exp.bullets || []).map((bullet, bIdx) => (
                            <li key={bIdx} className="text-[#4b5563] font-medium leading-relaxed">{bullet}</li>
                          ))}
                        </ul>
                     </div>
                   ))}
                 </div>
               </section>

               <div className="grid grid-cols-2 gap-12 pt-12 border-t-2 border-[#e0e7ff]">
                 <section>
                   <h3 className="font-sans text-lg font-black uppercase tracking-widest text-[#1e3a8a] mb-6 flex items-center gap-4">
                     <div className="w-8 h-8 rounded bg-[#dbeafe] text-[#2563eb] flex items-center justify-center material-symbols-outlined">psychology</div>
                     Core Competencies
                   </h3>
                   <div className="flex flex-wrap gap-2 pl-4">
                     {data.skills.map((skill, i) => (
                       <span key={i} className="bg-white border-2 border-[#dbeafe] text-[#1e3a8a] font-sans text-sm font-bold px-3 py-1.5 rounded shadow-sm">{skill}</span>
                     ))}
                   </div>
                 </section>

                 <section>
                   <h3 className="font-sans text-lg font-black uppercase tracking-widest text-[#1e3a8a] mb-6 flex items-center gap-4">
                     <div className="w-8 h-8 rounded bg-[#dbeafe] text-[#2563eb] flex items-center justify-center material-symbols-outlined">school</div>
                     Education & Credentials
                   </h3>
                   <div className="space-y-6 pl-4">
                     {data.education.map((edu, i) => (
                       <div key={i} className="flex gap-4">
                         <div className="font-sans font-bold text-[#3b82f6] mt-1 text-sm">{edu.year}</div>
                         <div>
                           <div className="font-bold text-[#1e3a8a]">{edu.degree}</div>
                           <div className="text-sm text-[#4b5563] italic">{edu.school}</div>
                         </div>
                       </div>
                     ))}
                   </div>
                 </section>
               </div>
             </div>
          </div>
        );

      case 'eco-friendly':
        return (
          <div className="p-16 flex flex-col h-full font-sans bg-[#f7faf6] text-[#2d3a2b]">
            <header className="mb-16 grid grid-cols-12 gap-10 items-center">
              <div className="col-span-8 bg-white p-10 rounded-[3rem] shadow-[0_10px_40px_rgba(74,103,65,0.08)] rounded-tr-none">
                <h1 className="text-6xl font-black text-[#1f4a22] tracking-tight mb-4">{data.fullName}</h1>
                <p className="text-2xl font-bold text-[#65a30d] mb-6">{data.jobTitle}</p>
                <div className="flex flex-col gap-3 font-semibold text-[#4a6741]">
                  <span className="flex items-center gap-3"><div className="p-2 bg-[#f0fdf4] rounded-full text-[#16a34a]"><span className="material-symbols-outlined text-[16px]">email</span></div> {data.email}</span>
                  <span className="flex items-center gap-3"><div className="p-2 bg-[#f0fdf4] rounded-full text-[#16a34a]"><span className="material-symbols-outlined text-[16px]">phone</span></div> {data.phone}</span>
                  <span className="flex items-center gap-3"><div className="p-2 bg-[#f0fdf4] rounded-full text-[#16a34a]"><span className="material-symbols-outlined text-[16px]">location_on</span></div> {data.location}</span>
                </div>
              </div>
              
              <div className="col-span-4 h-full relative">
                <div className="absolute inset-0 bg-[#dcfce7] rounded-[3rem] rounded-tl-none transform rotate-3"></div>
                <div className="absolute inset-0 bg-white rounded-[3rem] rounded-tl-none overflow-hidden border-8 border-white shadow-lg">
                  {data.photo ? (
                    <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#f0fdf4] flex items-center justify-center text-[#16a34a] material-symbols-outlined !text-6xl">eco</div>
                  )}
                </div>
              </div>
            </header>

            <div className="grid grid-cols-12 gap-12 flex-1">
              <div className="col-span-4 space-y-10">
                <section>
                  <h3 className="text-xl font-black text-[#1f4a22] mb-6 uppercase tracking-wider flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#65a30d]">energy_savings_leaf</span> Focus
                  </h3>
                  <div className="flex flex-col gap-3">
                    {data.skills.map((skill, i) => (
                      <div key={i} className="bg-white px-4 py-3 rounded-2xl border border-[#dcfce7] shadow-sm font-bold text-sm text-[#2d3a2b] flex items-center justify-between">
                        {skill}
                        <div className="w-2 h-2 rounded-full bg-[#84cc16]"></div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-black text-[#1f4a22] mb-6 uppercase tracking-wider flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#65a30d]">history_edu</span> Education
                  </h3>
                  <div className="space-y-4">
                    {data.education.map((edu, i) => (
                      <div key={i} className="bg-white p-5 rounded-3xl border border-[#dcfce7] shadow-sm">
                        <h4 className="font-bold text-[#1f4a22] mb-1 leading-tight">{edu.degree}</h4>
                        <p className="text-[#4a6741] text-sm mb-3">{edu.school}</p>
                        <span className="text-[10px] font-black uppercase text-[#16a34a] bg-[#f0fdf4] px-2 py-1 rounded-lg inline-block">{edu.year}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="col-span-8 flex flex-col gap-10">
                <section className="bg-white p-8 rounded-[3rem] shadow-sm border border-[#dcfce7]">
                  <p className="text-lg leading-relaxed text-[#4a6741] font-medium italic relative">
                    <span className="absolute top-[-10px] left-[-10px] text-4xl text-[#dcfce7]">"</span>
                    <span className="relative z-10">{data.summary}</span>
                  </p>
                </section>

                <section className="bg-white p-10 rounded-[3rem] shadow-sm border border-[#dcfce7] flex-1">
                  <h3 className="text-xl font-black text-[#1f4a22] mb-8 uppercase tracking-wider flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#65a30d]">public</span> Experience
                  </h3>
                  <div className="space-y-10 pl-4">
                    {data.experience.map((exp, i) => (
                      <div key={i} className="relative border-l-2 border-[#dcfce7] pl-8 pb-4">
                         <div className="absolute left-[-11px] top-0 w-5 h-5 rounded-full bg-white border-4 border-[#84cc16]"></div>
                         <div className="flex justify-between items-start mb-2">
                           <h4 className="text-xl font-black text-[#1f4a22]">{exp.role}</h4>
                           <span className="text-xs font-bold text-[#16a34a] bg-[#f0fdf4] px-3 py-1 rounded-full">{exp.periodStart} - {exp.periodEnd}</span>
                         </div>
                         <p className="font-bold text-[#65a30d] mb-4">{exp.company}</p>
                         <ul className="space-y-3">
                           {(exp.bullets || []).map((bullet, bIdx) => (
                             <li key={bIdx} className="text-[#4a6741] font-medium leading-relaxed text-sm flex gap-3">
                               <span className="text-[#a3e635] mt-0.5">•</span>
                               {bullet}
                             </li>
                           ))}
                         </ul>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        );

      case 'hospitality-warm':
        return (
          <div className="p-16 flex flex-col h-full font-serif bg-[#fffaf0] text-[#5c4033]">
            <header className="mb-14 text-center">
              <h1 className="text-5xl font-medium tracking-wide text-[#8b4513] mb-4 capitalize">{data.fullName}</h1>
              <div className="inline-block border-y border-[#d2b48c] py-2 px-12 mb-6">
                <span className="text-xl font-sans font-bold tracking-[0.2em] uppercase text-[#cd853f]">{data.jobTitle}</span>
              </div>
              <div className="flex justify-center gap-8 font-sans text-sm font-semibold text-[#8b4513]">
                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">room_service</span> {data.phone}</span>
                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">local_cafe</span> {data.email}</span>
                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">storefront</span> {data.location}</span>
              </div>
            </header>

            <div className="grid grid-cols-12 gap-12 flex-1">
              <div className="col-span-8 flex flex-col gap-10">
                <section className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(139,69,19,0.05)] border border-[#faebd7]">
                  <h3 className="text-lg font-sans font-bold tracking-[0.2em] uppercase text-[#8b4513] mb-4 text-center">Welcome Statement</h3>
                  <p className="text-[#6b4423] leading-relaxed text-justify italic font-medium">"{data.summary}"</p>
                </section>

                <section>
                  <h3 className="text-lg font-sans font-bold tracking-[0.2em] uppercase text-[#8b4513] mb-8 pb-4 border-b-2 border-[#f5deb3] inline-block">Professional Journey</h3>
                  <div className="space-y-8">
                    {data.experience.map((exp, i) => (
                      <div key={i} className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(139,69,19,0.05)] border border-[#faebd7]">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="text-2xl font-medium text-[#8b4513]">{exp.role}</h4>
                          <span className="font-sans text-xs font-bold tracking-widest text-[#cd853f]">{exp.periodStart} &mdash; {exp.periodEnd}</span>
                        </div>
                        <p className="font-sans font-bold uppercase tracking-wider text-[#a0522d] mb-4">{exp.company}</p>
                        <ul className="space-y-2">
                          {(exp.bullets || []).map((bullet, bIdx) => (
                            <li key={bIdx} className="text-[#6b4423] font-medium text-sm flex gap-3">
                              <span className="text-[#deb887]">•</span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="col-span-4 flex flex-col gap-10">
                {data.photo && (
                  <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-xl border-4 border-white mb-2">
                    <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                )}

                <section className="bg-[#8b4513] text-white p-8 rounded-2xl shadow-lg">
                  <h3 className="text-sm font-sans font-bold tracking-[0.2em] uppercase mb-6 text-center text-[#faebd7]">Service Expertise</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {data.skills.map((skill, i) => (
                      <span key={i} className="bg-white/10 px-4 py-2 rounded-lg font-sans text-sm font-semibold">{skill}</span>
                    ))}
                  </div>
                </section>

                <section className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(139,69,19,0.05)] border border-[#faebd7]">
                  <h3 className="text-sm font-sans font-bold tracking-[0.2em] uppercase text-[#8b4513] mb-6 text-center">Education</h3>
                  <div className="space-y-6">
                    {data.education.map((edu, i) => (
                      <div key={i} className="text-center">
                        <h4 className="font-medium text-[#a0522d] text-lg mb-1">{edu.degree}</h4>
                        <p className="font-sans text-sm font-bold text-[#cd853f] mb-2">{edu.school}</p>
                        <span className="font-sans text-xs font-bold tracking-widest text-[#deb887]">{edu.year}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-16 flex items-center justify-center h-full bg-slate-50">
            <div className="text-center">
              <h2 className="text-2xl font-black text-slate-300 mb-2">Template Under Construction</h2>
              <p className="text-slate-400">Selecting a specialized layout for {templateId}...</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full relative group">
      {renderTemplate()}
    </div>
  );
};

export const TEMPLATE_LIST = [
  { id: 'modern', name: 'Modern Elite', category: 'Corporate', description: 'Sharp, enterprise-ready look', hasPhoto: true, columns: 2 },
  { id: 'professional', name: 'Classic Pro', category: 'Corporate', description: 'Academic and traditional', hasPhoto: false, columns: 1 },
  { id: 'executive', name: 'Executive Gold', category: 'Corporate', description: 'Bold leadership statement', hasPhoto: false, columns: 1 },
  { id: 'platinum-executive', name: 'Platinum Standard', category: 'Corporate', description: 'Ultra-luxurious minimalist', hasPhoto: false, columns: 2 },
  { id: 'corporate-sharp', name: 'Corporate Sharp', category: 'Corporate', description: 'Modern professional design', hasPhoto: true, columns: 2 },
  { id: 'tech-dark', name: 'Code Terminal', category: 'Tech', description: 'Dark mode for developers', hasPhoto: false, columns: 1 },
  { id: 'saas-builder', name: 'SaaS Builder', category: 'Tech', description: 'Product-focused layout', hasPhoto: false, columns: 2 },
  { id: 'ai-engineer', name: 'AI Engineer', category: 'Tech', description: 'Mono font for data roles', hasPhoto: false, columns: 2 },
  { id: 'cyber-clean', name: 'Cyber Clean', category: 'Tech', description: 'High-contrast dark tech', hasPhoto: false, columns: 2 },
  { id: 'portfolio-grid', name: 'Portfolio Grid', category: 'Creative', description: 'Bold grids and typography', hasPhoto: true, columns: 2 },
  { id: 'creative', name: 'Creative Studio', category: 'Creative', description: 'Side-bar creative layout', hasPhoto: true, columns: 2 },
  { id: 'artistic-flow', name: 'Artistic Flow', category: 'Creative', description: 'Elegant serif themes', hasPhoto: false, columns: 2 },
  { id: 'neon-bold', name: 'Neon Bold', category: 'Creative', description: 'High-energy modern design', hasPhoto: false, columns: 2 },
  { id: 'pastel-dream', name: 'Soft Pastel', category: 'Creative', description: 'Colorful and friendly', hasPhoto: true, columns: 2 },
  { id: 'swiss-clean', name: 'Swiss International', category: 'Creative', description: 'Swiss design principles', hasPhoto: false, columns: 2 },
  { id: 'minimal-pure', name: 'Zen White', category: 'Minimalist', description: 'Clean, whitespace-focused', hasPhoto: false, columns: 1 },
  { id: 'ultra-minimal', name: 'Ultra Minimal', category: 'Minimalist', description: 'Focus on pure typography', hasPhoto: false, columns: 1 },
  { id: 'architecture-line', name: 'Architecture Line', category: 'Minimalist', description: 'Clean lines and grid', hasPhoto: false, columns: 2 },
  { id: 'typo-pure', name: 'Typographic Pure', category: 'Minimalist', description: 'Serif-driven content', hasPhoto: false, columns: 2 },
  { id: 'elegant-simple', name: 'Simple Elegance', category: 'Minimalist', description: 'Basic but perfectly balanced', hasPhoto: false, columns: 1 },
  { id: 'marketing-bold', name: 'Marketing Bold', category: 'Creative', description: 'Dynamic colors, modern layout', hasPhoto: true, columns: 2 },
  { id: 'sales-closer', name: 'Sales Closer', category: 'Corporate', description: 'Action-oriented, clear metrics', hasPhoto: false, columns: 1 },
  { id: 'brand-strategist', name: 'Brand Strategist', category: 'Creative', description: 'Editorial, high-end', hasPhoto: true, columns: 2 },
  { id: 'startup-pitch', name: 'Startup Pitch', category: 'Tech', description: 'Clean, tech-savvy', hasPhoto: false, columns: 2 },
  { id: 'retro-tech', name: 'Retro Tech', category: 'Tech', description: 'Monospace, nostalgic', hasPhoto: false, columns: 1 },
  { id: 'developer-terminal', name: 'Developer Terminal', category: 'Tech', description: 'Terminal vibe but clean', hasPhoto: false, columns: 1 },
  { id: 'product-manager', name: 'Product Manager', category: 'Tech', description: 'Balanced tech/business layout', hasPhoto: true, columns: 2 },
  { id: 'data-storyteller', name: 'Data Storyteller', category: 'Tech', description: 'Analytical, numbered lists', hasPhoto: false, columns: 2 },
  { id: 'engineering-blueprint', name: 'Blueprint', category: 'Tech', description: 'Technical, precise', hasPhoto: false, columns: 2 },
  { id: 'app-developer', name: 'App Developer', category: 'Tech', description: 'Mobile app inspired UI', hasPhoto: true, columns: 2 },
  { id: 'cyber-neon', name: 'Cyber Neon', category: 'Tech', description: 'Dark mode with bright neon', hasPhoto: false, columns: 2 },
  { id: 'vibrant-gradient', name: 'Vibrant Gradient', category: 'Creative', description: 'Color gradients, modern', hasPhoto: true, columns: 2 },
  { id: 'glassmorphism-pro', name: 'Glassmorphism Pro', category: 'Creative', description: 'Glassmorphic effects', hasPhoto: true, columns: 2 },
  { id: 'neo-brutalism', name: 'Neo Brutalism', category: 'Creative', description: 'High contrast, bold borders', hasPhoto: true, columns: 2 },
  { id: 'freelance-pop', name: 'Freelance Pop', category: 'Creative', description: 'Pop-art inspired, colorful', hasPhoto: true, columns: 2 },
  { id: 'creative-director', name: 'Creative Director', category: 'Creative', description: 'Asymmetric, bold type', hasPhoto: true, columns: 2 },
  { id: 'abstract-shapes', name: 'Abstract Shapes', category: 'Creative', description: 'Background abstract elements', hasPhoto: false, columns: 2 },
  { id: 'copywriter-pro', name: 'Copywriter Pro', category: 'Creative', description: 'Focus on reading flow', hasPhoto: false, columns: 1 },
  { id: 'finance-trust', name: 'Finance Trust', category: 'Corporate', description: 'Navy blue and gold', hasPhoto: false, columns: 1 },
  { id: 'elegant-serif', name: 'Elegant Serif', category: 'Corporate', description: 'High-end magazine look', hasPhoto: false, columns: 1 },
  { id: 'ocean-blue', name: 'Ocean Blue', category: 'Corporate', description: 'Corporate, clean, professional blue', hasPhoto: false, columns: 2 },
  { id: 'startup-founder', name: 'Startup Founder', category: 'Corporate', description: 'Visionary, impactful', hasPhoto: true, columns: 2 },
  { id: 'luxury-brand', name: 'Luxury Brand', category: 'Corporate', description: 'Gold and black, premium', hasPhoto: false, columns: 1 },
  { id: 'monochrome-bold', name: 'Monochrome Bold', category: 'Corporate', description: 'Black and white, high contrast', hasPhoto: false, columns: 2 },
  { id: 'nature-calm', name: 'Nature Calm', category: 'Minimalist', description: 'Earthy tones, soft', hasPhoto: false, columns: 2 },
  { id: 'sunset-glow', name: 'Sunset Glow', category: 'Minimalist', description: 'Warm orange/pink accents', hasPhoto: false, columns: 2 },
  { id: 'healthcare-clean', name: 'Healthcare Clean', category: 'Minimalist', description: 'Soft greens/blues', hasPhoto: false, columns: 2 },
  { id: 'education-pro', name: 'Education Pro', category: 'Minimalist', description: 'Academic but lively', hasPhoto: false, columns: 1 },
  { id: 'eco-friendly', name: 'Eco Friendly', category: 'Minimalist', description: 'Green, sustainable aesthetic', hasPhoto: false, columns: 2 },
  { id: 'hospitality-warm', name: 'Hospitality Warm', category: 'Minimalist', description: 'Welcoming, friendly colors', hasPhoto: true, columns: 2 },
  { id: 'executive-suite', name: 'Executive Suite', category: 'Corporate', description: 'Top-tier executive profile', hasPhoto: true, columns: 2 },
  { id: 'minimalist-grid', name: 'Minimalist Grid', category: 'Minimalist', description: 'Structured, clean grid design', hasPhoto: false, columns: 2 },
  { id: 'designer-portfolio', name: 'Designer Portfolio', category: 'Creative', description: 'Vibrant, visual showcase', hasPhoto: true, columns: 2 },
  { id: 'tech-lead', name: 'Tech Lead', category: 'Tech', description: 'Senior developer / architect', hasPhoto: false, columns: 2 },
  { id: 'marketing-playbook', name: 'Marketing Playbook', category: 'Creative', description: 'Bold marketing layout', hasPhoto: true, columns: 2 },
  { id: 'culinary-artist', name: 'Culinary Artist', category: 'Creative', description: 'Elegant food industry resume', hasPhoto: false, columns: 2 },
  { id: 'legal-counsel', name: 'Legal Counsel', category: 'Corporate', description: 'Traditional serif legal format', hasPhoto: false, columns: 2 },
  { id: 'real-estate-pro', name: 'Real Estate Pro', category: 'Corporate', description: 'Professional agent profile', hasPhoto: true, columns: 2 }
];
