import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { ArrowRight, ArrowUpRight, Copy, Check, Github, Linkedin, Mail, Send, Terminal, Loader2, AlertCircle, Phone } from 'lucide-react';
import { ScrollReveal as FadeContainer } from '../ui/ScrollReveal';
import ScrollReveal from '../ScrollReveal';

export const ContactSection: React.FC = () => {
  const p = PORTFOLIO_DATA.personal;
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(p.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      return;
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setErrorMessage(
        'Web3Forms access key is missing. Please set VITE_WEB3FORMS_ACCESS_KEY in your environment variables (.env or Vercel Settings).'
      );
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formState.name.trim(),
          email: formState.email.trim(),
          subject: formState.subject.trim() || 'Portfolio Contact Transmission',
          message: formState.message.trim(),
          from_name: formState.name.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
        setErrorMessage(null);
        setFormState({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.message || 'Failed to submit dispatch. Please try again.');
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Network error occurred while transmitting your message. Please try again.';
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
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
          <FadeContainer direction="up" distance={25} className="flex items-center gap-2 text-xs font-mono-tech text-[#E10600] tracking-widest uppercase mb-4">
            <span>SOCIAL NETWORK ARCHITECTURE</span>
            <span>//</span>
            <span>FIND ME ONLINE →</span>
          </FadeContainer>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {socials.map((soc, idx) => (
              <FadeContainer
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
              </FadeContainer>
            ))}
          </div>
        </div>

        {/* SECTION 26: FINAL CTA (LET'S BUILD SOMETHING GREAT) with FadeContainer */}
        <FadeContainer
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

            {/* Closing Message with ScrollReveal */}
            <ScrollReveal
              baseOpacity={0.1}
              enableBlur={true}
              baseRotation={2}
              blurStrength={4}
              rotationEnd="bottom bottom"
              wordAnimationEnd="bottom bottom"
              containerClassName="max-w-xl"
              textClassName="text-base sm:text-lg text-[#B8B8B8] leading-relaxed"
            >
              Open to internships, collaborations, hackathons and opportunities to build meaningful technology.
            </ScrollReveal>

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
        </FadeContainer>

        {/* SECTION 27: CONTACT & FORM INTERACTION with ScrollReveal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-white/10 pt-16">
          
          {/* Left Column: Direct Info */}
          <FadeContainer direction="up" distance={30} className="lg:col-span-5 space-y-6">
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

            {/* Phone direct channel from Resume */}
            <div className="p-4 bg-[#090909] border border-white/10 space-y-2">
              <div className="text-[10px] font-mono-tech text-[#777777] uppercase flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-[#E10600]" />
                DIRECT VOICE / WHATSAPP
              </div>
              <div className="flex items-center justify-between gap-3">
                <a
                  href={`tel:${p.phone?.replace(/\s+/g, '')}`}
                  className="font-mono-tech text-sm sm:text-base text-white font-bold hover:text-[#FF1717] transition-colors"
                >
                  {p.phone}
                </a>
                <span className="text-[10px] font-mono-tech text-emerald-400 bg-emerald-950/60 px-2 py-0.5 border border-emerald-800">
                  AVAILABLE
                </span>
              </div>
            </div>

            {/* Verification details */}
            <div className="text-xs font-mono-tech text-[#666666] space-y-1">
              <div>LOCATION: {p.location}</div>
              <div>TIMEZONE: IST (UTC +5:30)</div>
              <div>TYPICAL RESPONSE: &lt;24 HOURS</div>
            </div>
          </FadeContainer>

          {/* Right Column: Interactive Contact Form */}
          <FadeContainer direction="up" distance={35} delay={0.15} className="lg:col-span-7 bg-[#090909] border border-white/10 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2 text-xs font-mono-tech text-white">
                <Terminal className="w-4 h-4 text-[#E10600]" />
                <span>DIRECT_TRANSMISSION // FORM</span>
              </div>
              <span className="text-[11px] font-mono-tech text-[#777777]">ENCRYPTED DISPATCH</span>
            </div>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 bg-[#120606] border border-[#E10600] mx-auto flex items-center justify-center text-[#FF1717]">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-display text-xl font-bold text-white">Message Transmitted</h4>
                <p className="text-xs font-mono-tech text-[#B8B8B8] max-w-sm mx-auto leading-relaxed">
                  Thank you! Your dispatch has been securely transmitted. Sakthi will review and respond shortly via email.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setErrorMessage(null);
                  }}
                  className="mt-3 px-5 py-2.5 bg-[#141414] hover:bg-[#E10600] text-white text-xs font-mono-tech transition-colors border border-white/10 cursor-pointer uppercase tracking-wider inline-block"
                >
                  TRANSMIT ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-3.5 bg-[#170505] border border-[#E10600] text-xs font-mono-tech text-white flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-[#E10600] shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <div className="font-bold text-[#FF4D4D] uppercase">TRANSMISSION ERROR</div>
                      <div className="text-white/80 text-[11px] leading-relaxed">{errorMessage}</div>
                    </div>
                  </div>
                )}

                {/* Honeypot for spam bot prevention */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-tech text-[#888888] mb-1.5 uppercase">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      disabled={isLoading}
                      placeholder="e.g. Alex Johnson"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-[#121212] border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#E10600] focus:outline-none transition-colors disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tech text-[#888888] mb-1.5 uppercase">
                      YOUR EMAIL *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      disabled={isLoading}
                      placeholder="alex@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-[#121212] border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#E10600] focus:outline-none transition-colors disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-tech text-[#888888] mb-1.5 uppercase">
                    SUBJECT / INTENT *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    disabled={isLoading}
                    list="contact-subject-presets"
                    placeholder="e.g. Internship Opportunity / Collaboration / AI Project"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full bg-[#121212] border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#E10600] focus:outline-none transition-colors disabled:opacity-50 font-mono-tech"
                  />
                  <datalist id="contact-subject-presets">
                    <option value="Internship Opportunity" />
                    <option value="Project Collaboration / Hackathon" />
                    <option value="General AI / Technical Inquiry" />
                    <option value="Research & Development" />
                  </datalist>
                </div>

                <div>
                  <label className="block text-xs font-mono-tech text-[#888888] mb-1.5 uppercase">
                    MESSAGE CONTENT *
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    required
                    disabled={isLoading}
                    placeholder="Briefly describe your team, role, or proposal..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-[#121212] border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#E10600] focus:outline-none transition-colors disabled:opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-[#E10600] hover:bg-[#FF1717] disabled:bg-[#4a0808] disabled:cursor-not-allowed text-white font-mono-tech text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 red-glow-subtle cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>TRANSMITTING DISPATCH...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>TRANSMIT MESSAGE →</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </FadeContainer>

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
