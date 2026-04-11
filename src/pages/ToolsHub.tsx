import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logoImg from "@/assets/logo-new.jpeg";
import { Home, Info, FolderOpen, CreditCard, UserPlus, Wrench, Briefcase } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/254745947704";
const DISCORD_URL = "https://discord.gg/7yUz2rXumm";
const EMAIL = "gregorykimemiah@gmail.com";

const NAV_LINKS = [
  { href: "#home", label: "Home", icon: Home },
  { href: "#about", label: "About", icon: Info },
  { href: "/projects", label: "Projects", icon: FolderOpen, isRoute: true },
  { href: "/tools", label: "Tools", icon: Wrench, isRoute: true },
  { href: "/jobs", label: "Jobs", icon: Briefcase, isRoute: true },
  { href: "#pricing", label: "Pricing", icon: CreditCard },
  { href: "#join", label: "Join", icon: UserPlus },
];

const useFadeIn = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, className: `transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}` };
};

const FadeIn = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const fade = useFadeIn();
  return <div ref={fade.ref} className={`${fade.className} ${className}`}>{children}</div>;
};

const ToolsHub = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="text-foreground font-body antialiased overflow-x-hidden">
      {/* Marquee ticker — hidden on mobile */}
      <div className="hidden sm:flex w-full bg-foreground text-primary font-mono text-xs uppercase tracking-widest py-1.5 border-b-2 border-foreground overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex">
              <span className="mx-4">★ ENGINEERING TOOLS</span>
              <span className="mx-4">/// FREE · NO SIGNUP · JUST USE</span>
              <span className="mx-4">/// AI-POWERED FORMULAS</span>
              <span className="mx-4">/// CLASS TIMETABLE</span>
              <span className="mx-4">/// STUDY · BUILD · LAUNCH</span>
            </span>
          ))}
        </div>
      </div>

      {/* Nav */}
      <nav className="w-full bg-card/90 backdrop-blur-md border-b-4 border-foreground z-40 px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <img src={logoImg} alt="Engineering Study Hub" className="h-8 md:h-10 w-auto filter grayscale" />
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-6 font-mono text-sm font-bold uppercase">
          {NAV_LINKS.map((link) =>
            link.isRoute ? (
              <Link key={link.href} to={link.href} className="hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary pb-1">
                {link.label}
              </Link>
            ) : (
              <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary pb-1">
                {link.label}
              </a>
            )
          )}
        </div>
        <div className="hidden md:block">
          <Link to="/#join" className="btn-brutal inline-block bg-primary text-foreground border-2 border-foreground font-mono font-bold uppercase text-sm px-6 py-2 shadow-brutal-sm hover:-translate-y-1 transition-transform">
            Join Now
          </Link>
        </div>
      </nav>

      <main className="pb-0">
        {/* HERO */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-20 lg:py-32">
          <FadeIn>
            <div className="border-4 border-foreground bg-foreground p-6 md:p-12 shadow-brutal mb-8 md:mb-12 relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
              <div className="absolute top-4 right-4 md:top-6 md:right-6 font-mono text-xs text-primary/60 uppercase tracking-widest hidden md:block">[ 005 / TOOLS ]</div>
              <div className="relative z-10">
                <span className="inline-block font-mono text-xs font-bold text-foreground bg-primary px-3 py-1 mb-4 md:mb-6 border-2 border-primary">/// ENGINEERING TOOLS</span>
                <h1 className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-[8rem] font-bold leading-[0.85] tracking-tighter uppercase mb-4 text-card">
                  Your Engineering <br /><span className="text-primary">Toolkit.</span>
                </h1>
                <p className="font-body text-sm sm:text-base md:text-xl text-card/60 max-w-xl mt-2 md:mt-4">
                  Two tools built for Kenyan engineering students. Free. No signup. Just open and use.
                </p>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* TOOL CARDS */}
        <section className="max-w-5xl mx-auto px-4 md:px-6 mt-8 pb-12 md:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Formula Directory */}
            <FadeIn>
              <Link to="/formulas" className="block group">
                <div className="border-4 border-foreground bg-card shadow-brutal p-8 hover:shadow-brutal-primary transition-shadow cursor-pointer h-full flex flex-col">
                  <span className="font-mono text-xs border-2 border-foreground px-2 py-1 bg-foreground text-card inline-block mb-4 self-start">/// AI POWERED</span>
                  <h2 className="font-display text-3xl md:text-4xl font-bold uppercase mb-3">Formula Directory</h2>
                  <p className="font-body text-muted-foreground text-base mb-6">
                    Search any engineering formula and get the full breakdown — variables, derivation, worked example, textbook references, and exam tips for Kenyan university students.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["60+ formulas", "Textbook refs", "Worked examples", "Exam tips", "AI powered"].map(pill => (
                      <span key={pill} className="font-mono text-xs border-2 border-foreground px-2 py-1 bg-card">{pill}</span>
                    ))}
                  </div>
                  <div className="mt-auto border-4 border-foreground bg-primary text-foreground font-mono font-bold uppercase px-6 py-4 w-full text-center hover:bg-foreground hover:text-primary transition-colors group-hover:-translate-y-1 transform">
                    Open Formula Directory ↗
                  </div>
                </div>
              </Link>
            </FadeIn>

            {/* Timetable */}
            <FadeIn>
              <Link to="/timetable" className="block group">
                <div className="border-4 border-foreground bg-foreground text-card shadow-brutal p-8 hover:shadow-brutal-primary transition-shadow cursor-pointer h-full flex flex-col">
                  <span className="font-mono text-xs border-2 border-primary px-2 py-1 bg-primary text-foreground inline-block mb-4 self-start">/// MOBILE FIRST</span>
                  <h2 className="font-display text-3xl md:text-4xl font-bold uppercase mb-3 text-primary">Class Timetable</h2>
                  <p className="font-body text-card/70 text-base mb-6">
                    Your full weekly class schedule — with a live 'next class' countdown, day and week view, stats, and shareable as an image. Pre-loaded for Mech, Elec, Civil and Mechatronics.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Day & week view", "Next class timer", "Export image", "Add & edit classes", "Works offline"].map(pill => (
                      <span key={pill} className="font-mono text-xs border-2 border-card/30 px-2 py-1 bg-card/10 text-card">{pill}</span>
                    ))}
                  </div>
                  <div className="mt-auto border-4 border-primary bg-primary text-foreground font-mono font-bold uppercase px-6 py-4 w-full text-center hover:bg-card hover:text-foreground transition-colors group-hover:-translate-y-1 transform">
                    Open Timetable ↗
                  </div>
                </div>
              </Link>
            </FadeIn>
          </div>

          {/* Coming soon strip */}
          <FadeIn>
            <div className="border-4 border-foreground bg-foreground text-card p-4 text-center font-mono text-xs text-card/50 mt-8">
              More tools coming — CAT planner, unit converter, engineering calculators. Suggest one on Discord.
            </div>
          </FadeIn>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-background border-t-4 border-foreground pt-16 md:pt-24 pb-20 md:pb-12">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 border-t-4 border-foreground pt-8 font-mono text-sm font-bold uppercase">
            <div className="text-center md:text-left">
              <div className="text-foreground mb-1">THE ENGINEERING HUB // 2024</div>
              <div className="text-muted-foreground">Building Kenya's Technical Future</div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="hover:bg-foreground hover:text-card border-2 border-transparent hover:border-foreground px-2 py-1 transition-all">Discord</a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:bg-foreground hover:text-card border-2 border-transparent hover:border-foreground px-2 py-1 transition-all">WhatsApp</a>
              <a href={`mailto:${EMAIL}`} className="hover:bg-foreground hover:text-card border-2 border-transparent hover:border-foreground px-2 py-1 transition-all">Email</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ToolsHub;
