import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import heroLabImg from "@/assets/hero-lab.jpg";
import heroAboutImg from "@/assets/hero-about.jpg";
import trussBridgeImg from "@/assets/truss-bridge.jpg";
import avatarBrian from "@/assets/avatar-brian.jpg";
import avatarAisha from "@/assets/avatar-aisha.jpg";
import avatarDenis from "@/assets/avatar-denis.jpg";
import logoImg from "@/assets/logo-new.jpeg";
import { MessageCircle, Quote, Home, Info, FolderOpen, CreditCard, UserPlus, Wrench, Briefcase } from "lucide-react";

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


const FAQItem = ({ question, answer }: {question: string;answer: string;}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b-4 border-foreground group cursor-pointer last:border-b-0" onClick={() => setOpen(!open)}>
      <div className="p-4 md:p-6 flex justify-between items-center hover:bg-primary transition-colors">
        <h4 className="font-display text-lg md:text-xl font-bold uppercase">{question}</h4>
        <span className="font-mono text-2xl font-black">{open ? "−" : "+"}</span>
      </div>
      {open &&
      <div className="p-4 md:p-6 pt-0 border-t-2 border-dashed border-foreground bg-card font-body text-muted-foreground">
          {answer}
        </div>
      }
    </div>);

};

// Scroll-triggered fade-in hook
const useFadeIn = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {if (entry.isIntersecting) {setVisible(true);obs.unobserve(el);}},
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, className: `transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}` };
};

const FadeIn = ({ children, className = "" }: {children: React.ReactNode;className?: string;}) => {
  const fade = useFadeIn();
  return <div ref={fade.ref} className={`${fade.className} ${className}`}>{children}</div>;
};

const TESTIMONIALS = [
{ quote: "Passed my Materials Exam after joining a study squad here.", name: "Brian M.", uni: "KU", avatar: avatarBrian },
{ quote: "Got my first internship through the career pipeline. Worth every shilling.", name: "Aisha K.", uni: "KU", avatar: avatarAisha },
{ quote: "The notes and past papers alone are worth it. Saved my semester.", name: "Denis O.", uni: "KU", avatar: avatarDenis }];


const AutoplayVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {video.play().catch(() => {});} else
        {video.pause();}
      },
      { threshold: 0.3 }
    );
    obs.observe(video);
    return () => obs.disconnect();
  }, []);
  return (
    <video
      ref={videoRef}
      src="/videos/hub-intro.mp4"
      controls
      muted
      playsInline
      loop
      poster={heroAboutImg}
      className="w-full h-full object-contain border-2 border-foreground bg-foreground" />);


};
const PROJECTS = [
{ tag: "Hardware #1", techs: ["ARDUINO", "C++", "HARDWARE"], title: "Truss Bridge Build & Load Testing", desc: "Full truss bridge construction with structural analysis, load testing, and documentation. Completed by the structures squad.", accent: "primary", status: "Completed", timeline: "Jan 2026", img: trussBridgeImg },
{ tag: "IoT System #2", techs: ["ESP32", "PYTHON", "AWS"], title: "IoT Smart Irrigation System", desc: "Soil moisture telemetry transmitted to a custom dashboard via MQTT. Real-world Kenyan application.", accent: "accent", status: "Upcoming", timeline: "TBD", img: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80" },
{ tag: "Software #3", techs: ["REACT", "NODEJS", "DATA VIS"], title: "Engineering Metrics Dashboard", desc: "A full-stack application for visualizing structural stress data. Built by the software engineering sub-squad.", accent: "primary", status: "Upcoming", timeline: "TBD", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" },
{ tag: "Drone Simulation #4", techs: ["MATLAB", "SIMULINK"], title: "Basic UAV Drone Simulation", desc: "Mathematical modeling of quadcopter flight dynamics before moving to physical prototyping.", accent: "accent", status: "Upcoming", timeline: "TBD", img: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80" }];


const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showFloat, setShowFloat] = useState(false);

  useEffect(() => {
    document.title = "Engineering Hub — Study, Build & Launch";
  }, []);

  useEffect(() => {
    const handler = () => setShowFloat(window.scrollY > 500);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Smooth scroll handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="text-foreground font-body antialiased overflow-x-hidden">
      {/* Marquee ticker — hidden on mobile */}
      <div className="hidden sm:flex w-full bg-foreground text-primary font-mono text-xs uppercase tracking-widest py-1.5 border-b-2 border-foreground overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee">
          {[...Array(2)].map((_, i) =>
          <span key={i} className="flex">
              <span className="mx-4">★ NOW OPEN FOR NEW MEMBERS</span>
              <span className="mx-4">/// NAIROBI, KENYA</span>
              <span className="mx-4">/// 450+ ENGINEERS & COUNTING</span>
              <span className="mx-4">/// STUDY · BUILD · LAUNCH</span>
            </span>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="w-full bg-card/90 backdrop-blur-md border-b-4 border-foreground z-40 px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logoImg} alt="Engineering Study Hub" className="h-10 md:h-12 w-auto" />
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
          <a href="#join" onClick={(e) => handleNavClick(e, "#join")} className="btn-brutal inline-block bg-primary text-foreground border-2 border-foreground font-mono font-bold uppercase text-sm px-6 py-2 shadow-brutal-sm hover:-translate-y-1 transition-transform">
            Join Now
          </a>
        </div>
      </nav>


      <main className="pb-0">
        {/* HERO */}
        <section id="home" className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-20 lg:py-32">
          {/* BIG DISCORD CTA */}
          <FadeIn>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brutal group flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full border-4 border-foreground px-6 py-6 md:py-8 mb-6 md:mb-10 shadow-brutal hover:-translate-y-1 transition-transform text-white"
              style={{ backgroundColor: "#5865F2" }}
            >
              <svg width="56" height="56" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                <path d="M20.317 4.369A19.79 19.79 0 0 0 16.558 3.2a.075.075 0 0 0-.079.037c-.34.6-.717 1.382-.98 1.998a18.27 18.27 0 0 0-5.487 0 12.51 12.51 0 0 0-.995-1.998.078.078 0 0 0-.079-.037A19.736 19.736 0 0 0 5.18 4.369a.07.07 0 0 0-.032.027C2.62 8.157 1.95 11.853 2.28 15.505a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.992 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.105 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.128 12.3 12.3 0 0 1-1.873.891.077.077 0 0 0-.04.106c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-4.224-.838-7.89-3.548-11.11a.06.06 0 0 0-.031-.028zM8.02 13.331c-1.182 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.176 1.094 2.156 2.418 0 1.334-.955 2.42-2.156 2.42zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.094 2.156 2.418 0 1.334-.946 2.42-2.156 2.42z"/>
              </svg>
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <span className="font-mono text-xs uppercase tracking-widest opacity-80">/// Official Community</span>
                <span className="font-display text-2xl sm:text-3xl md:text-5xl font-bold uppercase tracking-tight leading-none mt-1">
                  Join the Discord
                </span>
                <span className="font-mono text-xs md:text-sm opacity-90 mt-1">450+ Kenyan engineering students · free · instant access</span>
              </div>
              <span className="hidden md:inline-block font-mono text-2xl ml-2">↗</span>
            </a>
          </FadeIn>

          <FadeIn>

            <div className="border-4 border-foreground bg-foreground p-4 md:p-12 shadow-brutal mb-8 md:mb-12 relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
              <div className="absolute top-4 right-4 md:top-6 md:right-6 font-mono text-xs text-primary/60 uppercase tracking-widest hidden md:block">[ 001 / HOME ]</div>
              <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 justify-between items-start md:items-end">
                <div className="w-full md:w-2/3">
                  <span className="inline-block font-mono text-xs font-bold text-foreground bg-primary px-3 py-1 mb-4 md:mb-6 border-2 border-primary">/// FOR ENGINEERS, BY ENGINEERS</span>
                  <h1 className="font-display text-2xl sm:text-5xl md:text-7xl lg:text-[8rem] font-bold leading-[0.88] tracking-tighter uppercase mb-4 text-card">
                    Study Smarter, <span className="text-primary">Build Reality.</span>
                  </h1>
                  {/* WhatsApp CTA — mobile first, before subtitle */}
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="sm:hidden btn-brutal flex items-center justify-center gap-2 w-full min-h-[56px] bg-whatsapp text-card border-4 border-foreground font-mono font-semibold text-base uppercase rounded-xl mb-4 shadow-brutal hover:-translate-y-1 transition-transform">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Chat on WhatsApp
                  </a>
                  <p className="font-body text-sm sm:text-base md:text-xl text-card/60 max-w-xl mt-2 md:mt-4 line-clamp-2 sm:line-clamp-none">
                    The structured Discord community where Kenyan engineering students study smarter, build real projects, and land opportunities — together.
                  </p>
                </div>
                <div className="hidden sm:flex w-full md:w-1/3 md:border-l-4 md:border-primary/30 md:pl-8 py-4 flex-col gap-4">
                  <a href="#join" onClick={(e) => handleNavClick(e, "#join")} className="btn-brutal bg-primary text-foreground border-4 border-primary font-mono font-bold text-base md:text-lg uppercase px-6 md:px-8 py-4 text-center shadow-brutal-primary hover:-translate-y-1 transition-transform w-full">
                    Join the Hub ↗
                  </a>
                  <a href="#about" onClick={(e) => handleNavClick(e, "#about")} className="bg-transparent text-card border-4 border-card/30 font-mono font-bold text-sm uppercase px-6 md:px-8 py-3 text-center hover:bg-card hover:text-foreground transition-colors w-full">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Stats strip */}
          <FadeIn>
            <div className="border-4 border-foreground bg-foreground text-card shadow-brutal-sm mb-8 md:mb-12 grid grid-cols-3 divide-x-4 divide-primary">
              {[
              { value: "450+", label: "Members" },
              { value: "4", label: "Universities" },
              { value: "20+", label: "Projects Shipped" }].
              map((stat) =>
              <div key={stat.label} className="flex-1 p-4 md:p-6 text-center">
                  <div className="font-mono text-3xl md:text-4xl font-black text-primary">{stat.value}</div>
                  <div className="font-mono text-xs uppercase tracking-wider text-card/70 mt-1">{stat.label}</div>
                </div>
              )}
            </div>
          </FadeIn>

          {/* Hero image grid */}
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
              <div className="md:col-span-4 border-4 border-foreground bg-primary p-2 shadow-brutal group relative h-[250px] md:h-[400px] overflow-hidden">
                <img src={heroLabImg} alt="Kenyan engineering students collaborating in a makerspace on a robotics project" className="w-full h-full object-cover border-2 border-foreground tech-img" />
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-12 md:py-20 border-y-4 border-foreground bg-card relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/3 h-full bg-background border-l-4 border-foreground -z-0 hidden md:block" />
          <FadeIn className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
              <div className="w-full md:w-1/3">
                <span className="font-mono text-primary font-bold text-sm mb-4 block">/// ABOUT US</span>
                <h2 className="font-display text-4xl md:text-6xl font-bold uppercase leading-none mb-6">
                  Inside <br /><span className="text-outline-dark">The Hub</span>
                </h2>
                <div className="w-16 h-1 bg-primary mb-6" />
                <p className="font-body text-base md:text-lg text-muted-foreground mb-8 border-l-4 border-primary pl-4">
                  A quick overview of who we are, why we exist, and how Kenyan engineering students use The Engineering Hub to study, build, and grow.
                </p>
              </div>
              <div className="w-full md:w-2/3">
                <div className="border-4 border-foreground bg-primary p-2 shadow-brutal group relative aspect-video">
                  <AutoplayVideo />
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* FEATURES */}
        <section id="features" className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24">
          <FadeIn className="mb-12 md:mb-16">
            <span className="font-mono text-primary font-bold text-sm mb-4 block">/// WHAT'S INSIDE</span>
            <h2 className="font-display text-4xl md:text-7xl font-bold uppercase leading-none">
              What You Get <br /><span className="text-outline-dark">Inside</span>
            </h2>
            <div className="w-16 h-1 bg-primary mt-4" />
          </FadeIn>

          <div className="border-t-4 border-foreground flex flex-col">
            {[
            { num: "01", tag: "///", title: "Organized Channels", desc: "Discord architecture separated by university, year, and unit. No clutter. Just the signal.", hoverBg: "hover:bg-primary" },
            { num: "02", tag: "[+]", title: "Live Study Rooms", desc: "Pomodoro-timed voice channels. Lock in with others. Silence the noise. Execute your study block.", hoverBg: "hover:bg-accent" },
            { num: "03", tag: "DOC", title: "Curated Archives", desc: "A centralized database of categorized notes and past papers. No more begging in WhatsApp groups.", hoverBg: "hover:bg-card" },
            { num: "04", tag: "EXE", title: "Software Support", desc: "Dedicated help for MATLAB, Python, SolidWorks, AutoCAD, and C++.", hoverBg: "hover:bg-primary" },
            { num: "05", tag: "CHK", title: "Daily Accountability", desc: "Automated question threads and check-ins. Report progress. State blockers. Move forward.", hoverBg: "hover:bg-accent" }].
            map((item) =>
            <FadeIn key={item.num}>
                <div className={`group border-b-4 border-foreground flex flex-col md:flex-row items-start md:items-center ${item.hoverBg} transition-colors p-4 md:p-8 cursor-default`}>
                  <div className="hidden md:block font-mono text-4xl md:text-5xl font-black text-outline-dark md:w-32 mb-2 md:mb-0 group-hover:text-foreground transition-all">{item.num}</div>
                  <div className="md:w-1/3 pr-4 md:pr-8 mb-2 md:mb-0">
                    <div className="font-mono text-xs font-bold border-2 border-foreground inline-block px-2 py-1 mb-2 md:mb-3 group-hover:bg-foreground group-hover:text-primary transition-colors">{item.tag}</div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold uppercase">{item.title}</h3>
                  </div>
                  <div className="md:w-auto flex-1 font-body text-base md:text-lg text-muted-foreground group-hover:text-foreground font-medium border-l-0 md:border-l-4 border-foreground md:pl-8 transition-colors">
                    {item.desc}
                  </div>
                </div>
              </FadeIn>
            )}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-12 md:py-24 bg-foreground text-card border-y-4 border-foreground">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <FadeIn className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 md:gap-8">
              <div className="max-w-2xl">
                <span className="font-mono text-primary font-bold text-sm mb-4 block">/// OUR PROJECTS</span>
                <h2 className="font-display text-4xl md:text-7xl font-bold uppercase leading-none mb-4 md:mb-6">
                  We Don't Just Study.<br /><span className="text-primary">We Build.</span>
                </h2>
                <div className="w-16 h-1 bg-primary mb-4" />
                <p className="font-body text-base md:text-lg text-gray-400">
                  Theory is useless without execution. We form squads to build feasible, realistic projects on student budgets.
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {PROJECTS.map((project, i) =>
              <FadeIn key={i}>
                  <div className="border-4 border-gray-700 bg-gray-900 group hover:border-primary transition-colors duration-300 relative flex flex-col h-full">
                    {/* Status + Timeline badges */}
                    <div className="absolute top-0 left-0 right-0 flex justify-between items-start z-10">
                      <span className={`font-mono text-xs font-bold px-3 py-1.5 ${project.status === "Completed" ? "bg-primary text-foreground" : project.status === "In Progress" ? "bg-accent text-foreground" : "bg-gray-700 text-card"}`}>
                        {project.status}
                      </span>
                      <span className="bg-foreground/80 text-card font-mono text-xs px-3 py-1.5 font-bold">
                        {project.timeline}
                      </span>
                    </div>
                    <div className="h-36 md:h-64 border-b-4 border-gray-700 group-hover:border-primary overflow-hidden relative transition-colors">
                      <img src={project.img} alt={project.title} loading="lazy" className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" />
                    </div>
                    <div className="p-5 md:p-8 flex-1 flex flex-col">
                      <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                        {project.techs.map((t) =>
                      <span key={t} className="border border-gray-600 font-mono text-xs px-2 py-1 text-primary">{t}</span>
                      )}
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl font-bold uppercase mb-3 md:mb-4 text-card group-hover:text-primary transition-colors">{project.title}</h3>
                      <p className="font-body text-sm md:text-base text-gray-400 flex-1">{project.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              )}
            </div>
          </div>
        </section>

        {/* CHALLENGE PROJECTS */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24">
          <FadeIn className="mb-10 md:mb-14">
            <span className="font-mono text-primary font-bold text-sm mb-4 block">/// CHALLENGE YOURSELF</span>
            <h2 className="font-display text-4xl md:text-7xl font-bold uppercase leading-none mb-4">
              Think You've Got <br /><span className="text-outline-dark">What It Takes?</span>
            </h2>
            <div className="w-16 h-1 bg-primary mt-2 mb-4" />
            <p className="font-body text-base md:text-lg text-muted-foreground max-w-2xl">
              Real engineering projects with real budgets. Pick one, form a squad, and prove your skills.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
            {[
              { title: "Pipe flow pressure drop experiment", discipline: "Fluid Mechanics", difficulty: "Beginner" as const, budget: "KES 800" },
              { title: "Truss bridge load testing", discipline: "Structural Engineering", difficulty: "Intermediate" as const, budget: "KES 2,500" },
              { title: "Arduino traffic light controller", discipline: "Control Systems", difficulty: "Beginner" as const, budget: "KES 1,200" },
            ].map((p, i) => (
              <FadeIn key={i}>
                <div className="border-4 border-foreground bg-card p-6 shadow-brutal hover:shadow-brutal-primary transition-shadow h-full flex flex-col">
                  <span className={`font-mono text-xs font-bold px-3 py-1 border-2 border-foreground self-start mb-4 ${
                    p.difficulty === "Beginner" ? "bg-primary text-foreground" : p.difficulty === "Intermediate" ? "bg-accent text-foreground" : "bg-foreground text-card"
                  }`}>{p.difficulty}</span>
                  <h3 className="font-display text-xl md:text-2xl font-bold uppercase mb-2">{p.title}</h3>
                  <p className="font-mono text-xs text-muted-foreground mb-1">{p.discipline}</p>
                  <p className="font-mono text-sm font-bold text-primary mt-auto pt-4">{p.budget}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center">
            <Link to="/projects" className="btn-brutal inline-block bg-primary text-foreground border-4 border-foreground font-mono font-bold text-base md:text-lg uppercase px-8 py-4 shadow-brutal hover:-translate-y-1 transition-transform">
              Browse All Projects →
            </Link>
          </FadeIn>
        </section>

        {/* JOBS TEASER */}
        <section className="py-12 md:py-24 bg-foreground text-card border-y-4 border-foreground">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <FadeIn className="mb-10 md:mb-14">
              <span className="font-mono text-primary font-bold text-sm mb-4 block">/// OPPORTUNITIES</span>
              <h2 className="font-display text-4xl md:text-7xl font-bold uppercase leading-none mb-4">
                Engineering Roles. <br /><span className="text-primary">Real Companies.</span>
              </h2>
              <div className="w-16 h-1 bg-primary mt-2 mb-4" />
              <p className="font-body text-base md:text-lg text-gray-400 max-w-2xl">
                Live engineering jobs in Kenya and remote — updated in real time from top employers.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
              {[
                { company: "Safaricom PLC", role: "Graduate Network Engineer", location: "Nairobi, KE" },
                { company: "Toyota Kenya", role: "Mechanical Engineering Intern", location: "Nairobi, KE" },
                { company: "Microsoft", role: "Software Engineer (Remote)", location: "Remote" },
              ].map((j, i) => (
                <FadeIn key={i}>
                  <div className="border-4 border-gray-700 bg-gray-900 p-6 hover:border-primary transition-colors h-full flex flex-col">
                    <div className="w-10 h-10 bg-primary/20 border-2 border-primary flex items-center justify-center font-mono font-bold text-primary text-lg mb-4">
                      {j.company[0]}
                    </div>
                    <h3 className="font-display text-lg md:text-xl font-bold uppercase mb-1 text-card">{j.role}</h3>
                    <p className="font-mono text-xs text-gray-400 mb-1">{j.company}</p>
                    <p className="font-mono text-xs text-primary mt-auto pt-4">{j.location}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn className="text-center">
              <Link to="/jobs" className="btn-brutal inline-block bg-primary text-foreground border-4 border-primary font-mono font-bold text-base md:text-lg uppercase px-8 py-4 shadow-brutal-primary hover:-translate-y-1 transition-transform">
                View All Jobs →
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* VISION */}
        <section className="py-20 md:py-32 bg-primary border-b-4 border-foreground overflow-hidden relative">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 10px)" }} />
          <FadeIn className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
            <span className="font-mono text-foreground font-bold text-sm mb-6 inline-block border-2 border-foreground px-4 py-1 bg-card">/// THE VISION</span>
            <h2 className="font-display text-5xl md:text-8xl font-black uppercase leading-none mb-8 md:mb-10 text-foreground">
              The Bigger <br /><span className="text-outline-light">Dream</span>
            </h2>
            <p className="font-body text-xl md:text-2xl text-foreground font-medium leading-relaxed">
              Beyond exams. We are building the next generation of Kenyan technical founders. Expect semester mega-competitions, physical hack nights, alumni mentorship, and direct pipelines to local internships.
            </p>
          </FadeIn>
        </section>

        {/* TESTIMONIALS */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24">
          <FadeIn className="text-center mb-12 md:mb-16">
            <span className="font-mono text-primary font-bold text-sm mb-4 block">/// WHAT STUDENTS SAY</span>
            <h2 className="font-display text-4xl md:text-7xl font-bold uppercase leading-none">
              Real <span className="text-outline-dark">Results</span>
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-4" />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {TESTIMONIALS.map((t, i) =>
            <FadeIn key={i}>
                <div className="border-4 border-foreground bg-card p-6 md:p-8 shadow-brutal hover:shadow-brutal-primary transition-shadow h-full flex flex-col">
                  <Quote className="text-primary mb-4" size={32} />
                  <p className="font-body text-base md:text-lg text-foreground font-medium mb-6 flex-1 leading-relaxed">"{t.quote}"</p>
                  <div className="flex items-center gap-3 border-t-4 border-foreground pt-4">
                    <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full border-2 border-foreground object-cover" />
                    <div className="flex-1">
                      <span className="font-display font-bold text-sm uppercase block">— {t.name}</span>
                    </div>
                    <span className="font-mono text-xs bg-primary text-foreground border-2 border-foreground px-3 py-1 font-bold">{t.uni}</span>
                  </div>
                </div>
              </FadeIn>
            )}
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24">
          <FadeIn className="text-center mb-12 md:mb-16">
            <span className="font-mono text-primary font-bold text-sm mb-4 block">/// PRICING</span>
            <h2 className="font-display text-4xl md:text-7xl font-bold uppercase leading-none">
              Choose Your <span className="text-outline-dark">Plan</span>
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-4" />
          </FadeIn>

          <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-12 max-w-5xl mx-auto">
            {/* Premium — appears FIRST on mobile */}
            <FadeIn className="order-1 md:order-2">
              <div className="border-4 border-foreground bg-foreground text-card p-6 md:p-12 shadow-brutal-primary relative flex flex-col h-full transform md:-translate-y-4">
                <div className="absolute -top-5 left-6 md:left-8 bg-primary text-foreground font-mono font-black text-sm px-4 py-1 border-4 border-foreground">LIFETIME ACCESS</div>
                <div className="border-b-4 border-muted-foreground/30 pb-6 md:pb-8 mb-6 md:mb-8 mt-4">
                  <h3 className="font-display text-3xl md:text-4xl font-bold uppercase mb-4 text-primary">Premium Access</h3>
                  <div className="flex items-baseline gap-3 md:gap-4 mb-2">
                    <span className="font-mono text-5xl font-black text-card">KES 800</span>
                    <span className="font-mono text-lg text-primary font-bold">/ LIFETIME</span>
                  </div>
                  <div className="font-body text-sm text-muted-foreground border-l-4 border-primary pl-3 mt-3">Pay once. Access everything. Forever.</div>
                </div>
                <ul className="font-mono text-sm space-y-3 md:space-y-4 mb-8 md:mb-12 flex-1">
                  <li className="flex items-center gap-3"><span className="text-primary font-black text-lg">✓</span>Everything in Basic</li>
                  <li className="flex items-center gap-3"><span className="text-primary font-black text-lg">✓</span>Live Pomodoro study rooms</li>
                  <li className="flex items-center gap-3"><span className="text-primary font-black text-lg">✓</span>Project build squads (per semester)</li>
                  <li className="flex items-center gap-3"><span className="text-primary font-black text-lg">✓</span>Daily homework & CAT support</li>
                  <li className="flex items-center gap-3"><span className="text-primary font-black text-lg">✓</span>Career & internship pipeline</li>
                  <li className="flex items-center gap-3"><span className="text-primary font-black text-lg">✓</span>Priority Discord channels</li>
                  <li className="flex items-center gap-3"><span className="text-primary font-black text-lg">✓</span>Direct access to project leads</li>
                </ul>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-brutal flex items-center justify-center gap-2 w-full min-h-[56px] text-center border-4 border-accent bg-accent text-foreground font-mono font-bold text-lg uppercase py-4 hover:bg-card hover:border-card transition-colors">
                  <MessageCircle size={20} />
                  Join Premium — KES 800 once
                </a>
                <p className="font-mono text-xs text-muted-foreground text-center border-t-2 border-muted-foreground/30 pt-3 mt-4">Pay via M-Pesa • One payment. Lifetime access.</p>
              </div>
            </FadeIn>

            {/* Basic */}
            <FadeIn className="order-2 md:order-1">
              <div className="border-4 border-foreground bg-card p-6 md:p-12 shadow-brutal flex flex-col h-full">
                <div className="border-b-4 border-foreground pb-6 md:pb-8 mb-6 md:mb-8">
                  <h3 className="font-display text-3xl md:text-4xl font-bold uppercase mb-4">Basic Access</h3>
                  <div className="flex items-baseline gap-3 md:gap-4 mb-2">
                    <span className="font-mono text-5xl font-black">KES 50</span>
                    <span className="font-mono text-lg text-muted-foreground">/ semester</span>
                  </div>
                  <div className="font-body text-sm text-muted-foreground border-l-4 border-primary pl-3 mt-3">Renew each semester. Cancel anytime.</div>
                </div>
                <ul className="font-mono text-sm space-y-3 md:space-y-4 mb-8 md:mb-12 flex-1">
                  <li className="flex items-center gap-3"><span className="text-primary font-black text-lg">✓</span>All university channels</li>
                  <li className="flex items-center gap-3"><span className="text-primary font-black text-lg">✓</span>Notes & past papers archive</li>
                  <li className="flex items-center gap-3"><span className="text-primary font-black text-lg">✓</span>Past exam papers (sorted by unit & year)</li>
                  <li className="flex items-center gap-3"><span className="text-primary font-black text-lg">✓</span>PDF resource library</li>
                  <li className="flex items-center gap-3 opacity-40"><span className="text-muted-foreground font-black text-lg">✗</span>Live study rooms</li>
                  <li className="flex items-center gap-3 opacity-40"><span className="text-muted-foreground font-black text-lg">✗</span>Project build squads</li>
                  <li className="flex items-center gap-3 opacity-40"><span className="text-muted-foreground font-black text-lg">✗</span>Homework & CAT support</li>
                  <li className="flex items-center gap-3 opacity-40"><span className="text-muted-foreground font-black text-lg">✗</span>Career pipeline</li>
                </ul>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-brutal flex items-center justify-center gap-2 w-full text-center border-4 border-foreground bg-card hover:bg-primary hover:text-foreground text-foreground font-mono font-bold text-lg uppercase py-4 transition-colors">
                  Join Basic — KES 50
                </a>
                <p className="font-mono text-xs text-muted-foreground text-center border-t-2 border-foreground pt-3 mt-4">Pay via M-Pesa • Renews every semester</p>
              </div>
            </FadeIn>
          </div>

          {/* Value breakdown */}
          <FadeIn>
            <div className="border-4 border-foreground bg-foreground text-card p-6 mt-8 max-w-5xl mx-auto">
              <p className="font-body text-base text-card/70 text-center mb-4">
                A Kenyan engineering degree takes 4 years. Premium costs less than one textbook — and lasts the whole degree.
              </p>
              <div className="flex divide-x-4 divide-primary">
                <div className="flex-1 text-center px-2">
                  <div className="font-mono text-2xl font-black text-primary">8 semesters</div>
                  <div className="font-mono text-xs text-card/60 uppercase mt-1">Basic would cost KES 400 total</div>
                </div>
                <div className="flex-1 text-center px-2">
                  <div className="font-mono text-2xl font-black text-primary">KES 800</div>
                  <div className="font-mono text-xs text-card/60 uppercase mt-1">Premium costs this. Once. Ever.</div>
                </div>
                <div className="flex-1 text-center px-2">
                  <div className="font-mono text-2xl font-black text-primary">KES 400 saved</div>
                  <div className="font-mono text-xs text-card/60 uppercase mt-1">By going Premium from day one</div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Trust signals */}
          <FadeIn>
            <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-6 md:gap-10">
              <span className="text-xs text-muted-foreground font-mono">🔒 Secure payment via M-Pesa</span>
              <span className="text-xs text-muted-foreground font-mono">📱 WhatsApp onboarding</span>
              <span className="text-xs text-muted-foreground font-mono">✅ 200+ active members</span>
            </div>
          </FadeIn>
        </section>

        {/* JOIN + RECRUIT */}
        <section id="join" className="border-t-4 border-foreground">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <FadeIn className="p-8 md:p-24 bg-card border-b-4 md:border-b-0 md:border-r-4 border-foreground">
              <span className="font-mono text-primary font-bold text-sm mb-4 block">/// HOW TO JOIN</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase leading-none mb-2">
                Get <br /><span className="text-outline-dark">Started</span>
              </h2>
              <div className="w-16 h-1 bg-primary mb-8 md:mb-12" />

              <div className="space-y-6 md:space-y-8 mb-8 md:mb-12 relative border-l-4 border-foreground ml-4 pl-6 md:pl-8">
                <div className="relative">
                  <div className="absolute -left-[38px] md:-left-[44px] top-1 w-6 h-6 bg-primary border-4 border-foreground rounded-full" />
                  <h3 className="font-display text-xl md:text-2xl font-bold uppercase mb-2">Reach Out</h3>
                  <p className="font-body text-muted-foreground">Click the WhatsApp button below to message us directly.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[38px] md:-left-[44px] top-1 w-6 h-6 bg-card border-4 border-foreground rounded-full" />
                  <h3 className="font-display text-xl md:text-2xl font-bold uppercase mb-2">Share Your Details</h3>
                  <p className="font-body text-muted-foreground">Tell us your university, year, and chosen tier (Basic or Premium).</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[38px] md:-left-[44px] top-1 w-6 h-6 bg-foreground border-4 border-foreground rounded-full" />
                  <h3 className="font-display text-xl md:text-2xl font-bold uppercase mb-2">Pay &amp; Get Access</h3>
                  <p className="font-body text-muted-foreground">Complete the M-Pesa transaction to receive your Discord invite link.</p>
                </div>
              </div>

              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-brutal inline-flex items-center gap-3 border-4 border-foreground bg-[#25D366] text-foreground font-mono font-bold text-base md:text-lg uppercase px-6 md:px-8 py-4 shadow-brutal hover:-translate-y-1 transition-transform w-full md:w-auto justify-center">
                <MessageCircle size={22} />
                Chat on WhatsApp
              </a>
            </FadeIn>

            <FadeIn className="p-8 md:p-24 bg-foreground text-card relative overflow-hidden">
              <div className="absolute -right-20 -top-20 font-mono text-[15rem] font-black text-card/5 pointer-events-none leading-none">*</div>
              <span className="font-mono text-accent font-bold text-sm mb-4 block">/// JOIN THE TEAM</span>
              <h3 className="font-display text-3xl md:text-4xl font-bold uppercase leading-none mb-6">Join The Core Team</h3>
              <p className="font-body text-gray-400 mb-8 md:mb-10 text-base md:text-lg">
                We are actively looking for ambitious engineering students to help run the community. Gain leadership experience, build your portfolio, and impact the Kenyan engineering ecosystem.
              </p>
              <div className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-12">
                {["Moderators", "Study Hosts", "Project Leads", "Comms Coordinators"].map((role) =>
                <span key={role} className="border-2 border-gray-700 bg-gray-800 font-mono text-sm px-3 py-1 text-card">{role}</span>
                )}
              </div>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-brutal inline-block border-4 border-accent text-accent bg-transparent font-mono font-bold text-base md:text-lg uppercase px-6 md:px-8 py-4 shadow-brutal-accent hover:bg-accent hover:text-foreground transition-colors w-full md:w-auto text-center">
                Apply to Join ↗
              </a>
            </FadeIn>
          </div>
        </section>
      </main>

      {showFloat && (
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="fixed bottom-4 right-4 z-50 md:hidden flex items-center gap-2 bg-[#25D366] text-white border-4 border-foreground font-mono font-bold text-xs uppercase px-4 py-3.5 shadow-brutal animate-in slide-in-from-bottom-2">
          <MessageCircle size={16} /> Join — KES 50
        </a>
      )}

      {/* FOOTER / FAQ */}
      <footer id="faq" className="bg-background border-t-4 border-foreground pt-16 md:pt-24 pb-20 md:pb-12">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <FadeIn className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase">
              Frequently <span className="text-outline-dark">Asked</span>
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-4" />
          </FadeIn>

          <FadeIn>
            <div className="border-4 border-foreground bg-card shadow-brutal mb-16 md:mb-24">
              <FAQItem question="Who can join?" answer="Any engineering student enrolled in a Kenyan university (JKUAT, UoN, KU, TUK, etc.). The hub is optimized for undergraduates seeking structure." />
              <FAQItem question="Is the community entirely online?" answer="The primary hub operates on Discord. However, project squads often organize physical meetups for hardware fabrication and hackathons depending on geographic proximity." />
              <FAQItem question="Can I upgrade from Basic to Premium?" answer="Yes. Upgrades are processed within 24 hours of clearing the tier difference via our WhatsApp channel." />
              <FAQItem question="What's the refund policy?" answer="We offer a 7-day evaluation period. If the hub doesn't meet your needs, we'll issue a full refund and revoke access." />
            </div>
          </FadeIn>

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
            <a href="#join" onClick={(e) => handleNavClick(e, "#join")} className="btn-brutal bg-primary text-foreground border-2 border-foreground px-6 py-2 shadow-brutal-sm hover:-translate-y-1 transition-transform">
              Join Now
            </a>
          </div>
        </div>
      </footer>
    </div>);

};

export default Index;