import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import heroLabImg from "@/assets/hero-lab.jpg";
import heroAboutImg from "@/assets/hero-about.jpg";
import trussBridgeImg from "@/assets/truss-bridge.jpg";
import avatarBrian from "@/assets/avatar-brian.jpg";
import avatarAisha from "@/assets/avatar-aisha.jpg";
import avatarDenis from "@/assets/avatar-denis.jpg";
import logoImg from "@/assets/logo.png";
import { MessageCircle, Quote, Home, Info, FolderOpen, CreditCard, UserPlus, Wrench } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/254745947704";
const DISCORD_URL = "https://discord.gg/7yUz2rXumm";
const EMAIL = "gregorykimemiah@gmail.com";

const NAV_LINKS = [
{ href: "#home", label: "Home", icon: Home },
{ href: "#about", label: "About", icon: Info },
{ href: "#projects", label: "Projects", icon: FolderOpen },
{ href: "#pricing", label: "Pricing", icon: CreditCard },
{ href: "#join", label: "Join", icon: UserPlus }];


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

  // Smooth scroll handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="text-foreground font-body antialiased overflow-x-hidden">
      {/* Marquee ticker */}
      <div className="w-full bg-foreground text-primary font-mono text-xs uppercase tracking-widest py-1.5 border-b-2 border-foreground overflow-hidden flex whitespace-nowrap">
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
          <img src={logoImg} alt="Student Engineering Hub" className="h-10 md:h-12 w-auto" />
        </div>
        <div className="hidden md:flex items-center gap-6 font-mono text-sm font-bold uppercase">
          {NAV_LINKS.map((link) =>
          <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary pb-1">
              {link.label}
            </a>
          )}
        </div>
        <div className="hidden md:block">
          <a href="#join" onClick={(e) => handleNavClick(e, "#join")} className="btn-brutal inline-block bg-primary text-foreground border-2 border-foreground font-mono font-bold uppercase text-sm px-6 py-2 shadow-brutal-sm hover:-translate-y-1 transition-transform">
            Join Now
          </a>
        </div>
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          <span className={`block w-6 h-0.5 bg-foreground transition-transform ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition-transform ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileMenuOpen &&
      <div className="fixed inset-0 z-30 md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute inset-0 bg-foreground/50" />
          <div className="absolute top-0 right-0 w-72 bg-card border-l-4 border-foreground h-full p-6 pt-20 flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
            {NAV_LINKS.map((link) =>
          <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="font-mono text-lg font-bold uppercase py-3 px-4 border-2 border-foreground hover:bg-primary transition-colors">
                {link.label}
              </a>
          )}
            <a href="#join" onClick={(e) => handleNavClick(e, "#join")} className="btn-brutal mt-4 bg-primary text-foreground border-2 border-foreground font-mono font-bold uppercase text-lg px-6 py-4 shadow-brutal-sm text-center">
              Join Now
            </a>
          </div>
        </div>
      }


      <main className="pb-0">
        {/* HERO */}
        <section id="home" className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-24">
          <FadeIn>
            <div className="border-4 border-foreground bg-foreground p-6 md:p-12 shadow-brutal mb-8 md:mb-12 relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
              <div className="absolute top-4 right-4 md:top-6 md:right-6 font-mono text-xs text-primary/60 uppercase tracking-widest hidden md:block">[ 001 / HOME ]</div>
              <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 justify-between items-start md:items-end">
                <div className="w-full md:w-2/3">
                  <span className="inline-block font-mono text-xs font-bold text-foreground bg-primary px-3 py-1 mb-4 md:mb-6 border-2 border-primary">/// FOR ENGINEERS, BY ENGINEERS</span>
                  <h1 className="font-display text-5xl md:text-7xl lg:text-[8rem] font-bold leading-[0.85] tracking-tighter uppercase mb-4 text-card">
                    Study Smarter, <span className="text-primary">Build Reality.</span>
                  </h1>
                  <p className="font-body text-lg md:text-xl text-card/60 max-w-xl mt-4">
                    The structured Discord community where Kenyan engineering students study smarter, build real projects, and land opportunities — together.
                  </p>
                </div>
                <div className="w-full md:w-1/3 md:border-l-4 md:border-primary/30 md:pl-8 py-4 flex flex-col gap-4">
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
            <div className="border-4 border-foreground bg-foreground text-card shadow-brutal-sm mb-8 md:mb-12 flex flex-col sm:flex-row divide-y-4 sm:divide-y-0 sm:divide-x-4 divide-primary">
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
                  <div className="font-mono text-4xl md:text-5xl font-black text-outline-dark md:w-32 mb-2 md:mb-0 group-hover:text-foreground transition-all">{item.num}</div>
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
                    <div className="h-48 md:h-64 border-b-4 border-gray-700 group-hover:border-primary overflow-hidden relative transition-colors">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 max-w-5xl mx-auto">
            {/* Basic */}
            <FadeIn>
              <div className="border-4 border-foreground bg-card p-6 md:p-12 shadow-brutal flex flex-col h-full">
                <div className="border-b-4 border-foreground pb-6 md:pb-8 mb-6 md:mb-8">
                  <h3 className="font-display text-3xl md:text-4xl font-bold uppercase mb-4">Basic Access</h3>
                  <div className="flex items-baseline gap-3 md:gap-4 mb-2">
                    <span className="font-mono text-4xl md:text-5xl font-black">KSH 50  </span>
                    <span className="font-mono text-base md:text-lg text-muted-foreground font-bold">/ semester</span>
                  </div>
                  <div className="font-mono text-lg md:text-xl text-destructive line-through font-bold">KES 300</div>
                </div>
                <ul className="font-mono text-sm space-y-3 md:space-y-4 mb-8 md:mb-12 flex-1">
                  <li className="flex items-center gap-3"><span className="text-primary font-black text-lg">&gt;</span>All university channels</li>
                  <li className="flex items-center gap-3"><span className="text-primary font-black text-lg">&gt;</span>Notes &amp; past papers archive</li>
                  <li className="flex items-center gap-3 text-muted-foreground opacity-50"><span className="font-black text-lg">x</span>Live study rooms</li>
                  <li className="flex items-center gap-3 text-muted-foreground opacity-50"><span className="font-black text-lg">x</span>Project build squads</li>
                  <li className="flex items-center gap-3 text-muted-foreground opacity-50"><span className="font-black text-lg">x</span>Career pipeline</li>
                </ul>
                <a href="#join" onClick={(e) => handleNavClick(e, "#join")} className="btn-brutal block w-full text-center border-4 border-foreground bg-card hover:bg-primary hover:text-foreground text-foreground font-mono font-bold text-lg uppercase py-4 transition-colors">
                  Select Basic
                </a>
              </div>
            </FadeIn>

            {/* Premium */}
            <FadeIn>
              <div className="border-4 border-foreground bg-foreground text-card p-6 md:p-12 shadow-brutal-primary relative flex flex-col h-full transform md:-translate-y-4">
                <div className="absolute -top-5 left-6 md:left-8 bg-primary text-foreground font-mono font-bold text-sm px-4 py-1 border-4 border-foreground">RECOMMENDED</div>
                <div className="border-b-4 border-gray-700 pb-6 md:pb-8 mb-6 md:mb-8 mt-2">
                  <h3 className="font-display text-3xl md:text-4xl font-bold uppercase mb-4 text-primary">Premium Access</h3>
                  <div className="flex items-baseline gap-3 md:gap-4 mb-2">
                    <span className="font-mono text-4xl md:text-5xl font-black text-card">  KSH 800</span>
                    <span className="font-mono text-base md:text-lg text-gray-400 font-bold">/ semester</span>
                  </div>
                  <div className="font-mono text-lg md:text-xl text-destructive line-through font-bold">KES 1000</div>
                </div>
                <ul className="font-mono text-sm space-y-3 md:space-y-4 mb-8 md:mb-12 flex-1">
                  {["All university channels", "Notes & past papers archive", "Live Pomodoro study rooms"].map((item) =>
                  <li key={item} className="flex items-center gap-3"><span className="text-primary font-black text-lg">&gt;</span>{item}</li>
                  )}
                  <li className="flex items-center gap-3 bg-primary/10 p-2 -mx-2 border border-primary/30">
                    <span className="text-primary font-black text-lg">&gt;</span>
                    <strong className="text-primary">Join project build squads</strong>
                  </li>
                  {["Daily Q&A syntax/logic help", "Career & internship pipeline"].map((item) =>
                  <li key={item} className="flex items-center gap-3"><span className="text-primary font-black text-lg">&gt;</span>{item}</li>
                  )}
                </ul>
                <a href="#join" onClick={(e) => handleNavClick(e, "#join")} className="btn-brutal block w-full text-center border-4 border-primary bg-primary text-foreground font-mono font-bold text-lg uppercase py-4 hover:bg-card hover:border-card transition-colors">
                  Select Premium
                </a>
              </div>
            </FadeIn>
          </div>

          <FadeIn>
            <div className="mt-8 md:mt-12 max-w-2xl mx-auto text-center font-mono text-sm bg-foreground text-card p-4 md:p-6 border-4 border-foreground shadow-brutal-sm">
              <span className="text-accent font-bold">NOTE:</span> Basic is for self-study access. Premium is the full community experience — study rooms, build squads, career pipeline, and more.
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