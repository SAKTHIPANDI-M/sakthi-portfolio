import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { ArrowRight, ArrowUpRight, Copy, Check, Github, Linkedin, Mail, Send, Terminal } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

export const ContactSection: React.FC = () => {
  const p = PORTFOLIO_DATA.personal;
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '', role: 'Internship' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(p.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: '', email: '', message: '', role: 'Internship' });
    }, 4000);
  };

  const socials = [
    { name: 'GITHUB', url: p.github, id: 'github' },
    { name: 'LINKEDIN', url: p.linkedin, id: 'linkedin' },
    { name: 'GMAIL', url: `mailto:${p.email}`, id: 'gmail' },
  ];

  return (
    <section id="contact" className="relative pt-24 sm:pt-32 pb-16 bg-[#050505]">
      
      {/* Background Red Glow Accent */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#E10600]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* SECTION 25: SOCIAL / CONNECT SECTION (FIND ME ONLINE →) */}
        <div className="border-b border-white/10 pb-16">
          <ScrollReveal direction="up" distance={25} className="flex items-center gap-2 text-xs font-mono-tech text-[#E10600] tracking-widest uppercase mb-4">
            <span>SOCIAL NETWORK ARCHITECTURE</span>
            <span>//</span>
            <span>FIND ME ONLINE →</span>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {socials.map((soc, idx) => (
              <ScrollReveal
                key={soc.id}
                direction="up"
                distance={35}
                delay={idx * 0.1}
              >
                <a
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-8 bg-[#090909] border border-white/10 hover:border-[#E10600] transition-all duration-300 flex items-center justify-between red-glow-subtle block"
                >
                  <div>
                    <div className="text-[10px] font-mono-tech text-[#777777] uppercase">
                      CONNECT // PROTOCOL
                    </div>
                    <div className="font-display text-2xl sm:text-3xl font-black text-white group-hover:text-[#FF1717] transition-colors mt-1 relative inline-block">
                      {soc.name}
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#E10600] transition-all duration-300 group-hover:w-full" />
                    </div>
                  </div>

                  <div className="w-10 h-10 border border-white/15 flex items-center justify-center text-white/40 group-hover:border-[#E10600] group-hover:text-[#E10600] transition-all group-hover:translate-x-1 group-hover:-translate-y-1">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* SECTION 26: FINAL CTA (LET'S BUILD SOMETHING GREAT) with ScrollReveal */}
        <ScrollReveal
          direction="up"
          distance={40}
          delay={0.1}
          className="relative p-8 sm:p-16 bg-[#080808] border-2 border-white/15 overflow-hidden group"
        >
          {/* Subtle Halftone & Grid overlay */}
          <div className="absolute inset-0 opacity-15 tech-grid-pattern pointer-events-none" />
          
          {/* Red decorative plus marks */}
          <div className="absolute top-4 left-4 text-[#E10600] font-mono-tech text-lg select-none">+</div>
          <div className="absolute top-4 right-4 text-[#E10600] font-mono-tech text-lg select-none">+</div>
          <div className="absolute bottom-4 left-4 text-[#E10600] font-mono-tech text-lg select-none">+</div>
          <div className="absolute bottom-4 right-4 text-[#E10600] font-mono-tech text-lg select-none">+</div>

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#160606] border border-[#E10600]/40 text-xs font-mono-tech text-white">
              <span className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse" />
              <span>OPPORTUNITIES & COLLABORATIONS</span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[0.95]">
              LET'S BUILD <br />
              <span className="text-[#E10600]">SOMETHING GREAT.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#B8B8B8] leading-relaxed max-w-xl">
              Open to internships, collaborations, hackathons and opportunities to build meaningful technology.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={`mailto:${p.email}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#E10600] hover:bg-[#FF1717] text-white font-mono-tech text-xs sm:text-sm uppercase tracking-wider font-bold transition-all red-glow cursor-pointer"
              >
                <span>GET IN TOUCH</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#121212] hover:bg-white hover:text-black text-white font-mono-tech text-xs sm:text-sm uppercase tracking-wider border border-white/20 transition-all cursor-pointer"
              >
                <Github className="w-4 h-4" />
                <span>VIEW GITHUB ↗</span>
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* SECTION 27: CONTACT & FORM INTERACTION with ScrollReveal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-white/10 pt-16">
          
          {/* Left Column: Direct Info */}
          <ScrollReveal direction="up" distance={30} className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-mono-tech text-[#E10600] tracking-widest uppercase mb-1">
                CONTACT CHANNELS
              </div>
              <h3 className="font-display text-3xl font-extrabold text-white">
                {p.name}
              </h3>
              <p className="font-editorial text-lg text-[#E10600] font-bold">
                {p.title}
              </p>
            </div>

            <p className="text-sm text-[#888888] leading-relaxed">
              Have an internship opening, research project, hackathon invitation, or question about my ML projects? Send a message or reach out directly.
            </p>

            {/* Email with 1-click clipboard copy */}
            <div className="p-4 bg-[#090909] border border-white/10 space-y-2">
              <div className="text-[10px] font-mono-tech text-[#777777] uppercase">
                PRIMARY INBOX
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono-tech text-sm sm:text-base text-white font-bold truncate">
                  {p.email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 bg-[#141414] hover:bg-[#E10600] text-white text-xs font-mono-tech transition-colors flex items-center gap-1.5 shrink-0 border border-white/10 cursor-pointer"
                  title="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Verification details */}
            <div className="text-xs font-mono-tech text-[#666666] space-y-1">
              <div>LOCATION: {p.location}</div>
              <div>TIMEZONE: IST (UTC +5:30)</div>
              <div>TYPICAL RESPONSE: &lt;24 HOURS</div>
            </div>
          </ScrollReveal>

          {/* Right Column: Interactive Contact Form */}
          <ScrollReveal direction="up" distance={35} delay={0.15} className="lg:col-span-7 bg-[#090909] border border-white/10 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2 text-xs font-mono-tech text-white">
                <Terminal className="w-4 h-4 text-[#E10600]" />
                <span>DIRECT_TRANSMISSION // FORM</span>
              </div>
              <span className="text-[11px] font-mono-tech text-[#777777]">ENCRYPTED DISPATCH</span>
            </div>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 bg-[#120606] border border-[#E10600] mx-auto flex items-center justify-center text-[#FF1717]">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-display text-xl font-bold text-white">Message Transmitted</h4>
                <p className="text-xs font-mono-tech text-[#B8B8B8] max-w-sm mx-auto">
                  Thank you! Your dispatch has been queued. Sakthi will respond shortly via email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-tech text-[#888888] mb-1.5 uppercase">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Johnson"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-[#121212] border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#E10600] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tech text-[#888888] mb-1.5 uppercase">
                      YOUR EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-[#121212] border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#E10600] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-tech text-[#888888] mb-1.5 uppercase">
                    SUBJECT / INTENT
                  </label>
                  <select
                    value={formState.role}
                    onChange={(e) => setFormState({ ...formState, role: e.target.value })}
                    className="w-full bg-[#121212] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:border-[#E10600] focus:outline-none transition-colors font-mono-tech"
                  >
                    <option value="Internship">Internship Opportunity</option>
                    <option value="Collaboration">Project Collaboration / Hackathon</option>
                    <option value="Inquiry">General AI / Technical Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono-tech text-[#888888] mb-1.5 uppercase">
                    MESSAGE CONTENT *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Briefly describe your team, role, or proposal..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-[#121212] border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#E10600] focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#E10600] hover:bg-[#FF1717] text-white font-mono-tech text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 red-glow-subtle cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>TRANSMIT MESSAGE →</span>
                </button>
              </form>
            )}
          </ScrollReveal>

        </div>

        {/* SECTION 28: FOOTER */}
        <footer className="pt-12 border-t border-white/10 text-xs font-mono-tech space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left - Geometric Sci-Fi Tech Wordmark */}
            <div className="group inline-flex items-center select-none cursor-default py-1">
              {/* Subtle red indicator */}
              <span className="w-1 h-3.5 bg-[#E10600] mr-2.5 inline-block shrink-0 rounded-[1px]" aria-hidden="true" />
              
              <span className="font-wordmark font-black text-lg sm:text-xl md:text-[22px] tracking-[0.16em] uppercase text-white leading-none">
                SAKTHIPANDI
                <span className="text-[#E10600] ml-2 font-black">
                  M
                </span>
              </span>
            </div>

            {/* Center */}
            <div className="text-[#888888] text-center tracking-wider">
              {p.title} • {p.secondaryTitle}
            </div>

            {/* Right */}
            <div className="text-[#888888]">
              © {p.year}
            </div>
          </div>

          {/* Bottom */}
          <div className="text-center pt-2 text-[11px] text-[#555555] tracking-widest uppercase">
            BUILT WITH CODE + CURIOSITY
          </div>
        </footer>

      </div>
    </section>
  );
};
