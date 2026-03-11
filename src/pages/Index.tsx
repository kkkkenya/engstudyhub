import { useState } from "react";
import heroLabImg from "@/assets/hero-lab.jpg";
import heroAboutImg from "@/assets/hero-about.jpg";

const WHATSAPP_URL = "https://wa.me/254XXXXXXXXX";

const NAV_LINKS = [
{ href: "#about", label: "About" },
{ href: "#features", label: "Inside the Hub" },
{ href: "#projects", label: "Projects" },
{ href: "#pricing", label: "Pricing" },
{ href: "#join", label: "How to Join" },
{ href: "#faq", label: "FAQ" }];


const FAQItem = ({ question, answer }: {question: string;answer: string;}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b-4 border-foreground group cursor-pointer last:border-b-0" onClick={() => setOpen(!open)}>
      <div className="p-6 flex justify-between items-center hover:bg-primary transition-colors">
        <h4 className="font-display text-xl font-bold uppercase">{question}</h4>
        <span className="font-mono text-2xl font-black">{open ? "−" : "+"}</span>
      </div>
      {open &&
      <div className="p-6 pt-0 border-t-2 border-dashed border-foreground bg-card font-body text-muted-foreground">
          {answer}
        </div>
      }
    </div>);

};

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="text-foreground font-body antialiased overflow-x-hidden">
      {/* Marquee ticker */}
      <div className="fixed top-0 left-0 w-full bg-foreground text-primary font-mono text-xs uppercase tracking-widest py-1.5 border-b-2 border-foreground z-50 overflow-hidden flex whitespace-nowrap">
        <div className="flex animate-marquee">
          {[...Array(2)].map((_, i) =>
          <span key={i} className="flex">
              <span className="mx-4">/// SYS.STATE: ONLINE</span>
              
              <span className="mx-4">/// LOC: 01.2921° S, 36.8219° E</span>
              <span className="mx-4">/// VERSION: 2.1.0</span>
              
            </span>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="fixed top-[28px] left-0 w-full bg-card/90 backdrop-blur-md border-b-4 border-foreground z-40 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary border-2 border-foreground shadow-brutal-sm flex items-center justify-center font-bold font-mono text-xl">
            EH
          </div>
          <span className="font-display font-bold text-xl uppercase tracking-tight hidden md:block">The Engineering Hub</span>
        </div>

        <div className="hidden md:flex items-center gap-8 font-mono text-sm font-bold uppercase">
          {NAV_LINKS.map((link) =>
          <a key={link.href} href={link.href} className="hover:text-primary transition-colors">{link.label}</a>
          )}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a href="#join" className="btn-brutal inline-block bg-accent text-foreground border-2 border-foreground font-mono font-bold uppercase text-sm px-6 py-2 shadow-brutal-sm hover:-translate-y-1 transition-transform">
            Join Now
          </a>
        </div>

        {/* Mobile hamburger */}
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
          <div className="absolute top-[76px] right-0 w-72 bg-card border-l-4 border-foreground h-[calc(100vh-76px)] p-8 flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
            {NAV_LINKS.map((link) =>
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMobileMenuOpen(false)}
            className="font-mono text-lg font-bold uppercase py-3 px-4 border-2 border-foreground hover:bg-primary transition-colors">
            
                {link.label}
              </a>
          )}
            <a
            href="#join"
            onClick={() => setMobileMenuOpen(false)}
            className="btn-brutal mt-4 bg-accent text-foreground border-2 border-foreground font-mono font-bold uppercase text-lg px-6 py-4 shadow-brutal-sm text-center">
            
              Join Now
            </a>
          </div>
        </div>
      }

      <main className="pt-[100px]">
        {/* HERO */}
        <section className="max-w-7xl mx-auto px-6 py-12 md:py-24">
          <div className="border-4 border-foreground bg-card p-8 md:p-12 shadow-brutal mb-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-between items-end">
              <div className="w-full md:w-2/3">
                

                
                <h1 className="font-display text-6xl md:text-8xl lg:text-[9rem] font-bold leading-[0.85] tracking-tighter uppercase mb-4">
                  Study <br />
                  <span className="text-primary">Smarter.</span><br />
                  <span className="text-outline-dark">Build</span> <br />
                  Reality.
                </h1>
              </div>
              <div className="w-full md:w-1/3 border-l-4 border-foreground pl-6 md:pl-8 py-4">
                <p className="font-body text-lg md:text-xl font-medium text-muted-foreground mb-8 leading-snug">
                  A structured Discord hub for Kenyan engineering students (JKUAT, UoN, KU, TUK) who want to pass exams, build serious projects, and stop doing engineering alone.
                </p>
                <div className="flex flex-col gap-4">
                  <a href="#join" className="btn-brutal bg-primary text-foreground border-4 border-foreground font-mono font-bold text-lg uppercase px-8 py-4 text-center shadow-brutal hover:-translate-y-1 transition-transform w-full">
                    Join the Hub ↗
                  </a>
                  <a href="#about" className="bg-transparent text-foreground border-4 border-foreground font-mono font-bold text-sm uppercase px-8 py-3 text-center hover:bg-foreground hover:text-card transition-colors w-full">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Hero image grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-3 border-4 border-foreground bg-primary p-2 shadow-brutal group relative h-[400px] overflow-hidden">
              <img src={heroLabImg} alt="Kenyan engineering students collaborating in a lab" className="w-full h-full object-cover border-2 border-foreground tech-img" />
              <div className="absolute bottom-6 left-6 bg-foreground text-primary font-mono text-sm px-4 py-2 border-2 border-primary">
                LIVE: CAMPUS LAB
              </div>
            </div>
            <div className="md:col-span-1 flex flex-col gap-6">
              <div className="border-4 border-foreground bg-card p-6 shadow-brutal-sm flex-1 flex flex-col justify-center">
                <div className="font-mono text-xs text-muted-foreground mb-1">MEMBERS ONLINE</div>
                <div className="font-display text-5xl font-bold text-foreground">450<span className="text-primary">+</span></div>
              </div>
              <div className="border-4 border-foreground bg-foreground text-card p-6 shadow-brutal-sm flex-1 flex flex-col justify-center">
                <div className="font-mono text-xs text-primary mb-1">SYSTEM STATUS</div>
                <div className="font-display text-2xl font-bold uppercase flex items-center gap-3">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                  Optimal
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-20 border-y-4 border-foreground bg-card relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/3 h-full bg-background border-l-4 border-foreground -z-0" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/3">
                <span className="font-mono text-primary font-bold text-sm mb-4 block">/// ABOUT US</span>
                <h2 className="font-display text-5xl md:text-6xl font-bold uppercase leading-none mb-6">
                  Inside <br /><span className="text-outline-dark">The Hub</span>
                </h2>
                <p className="font-body text-lg text-muted-foreground mb-8 border-l-4 border-primary pl-4">
                  A quick overview of who we are, why we exist, and how Kenyan engineering students use The Engineering Hub to study, build, and grow.
                </p>
              </div>
              <div className="w-full md:w-2/3">
                <div className="border-4 border-foreground bg-primary p-2 shadow-brutal group relative aspect-video cursor-pointer">
                  <img src={heroAboutImg} alt="Students collaborating on hardware projects" className="w-full h-full object-cover border-2 border-foreground tech-img" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-foreground border-4 border-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-brutal-sm">
                      <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[24px] border-l-primary border-b-[15px] border-b-transparent ml-2" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-foreground text-card font-mono text-xs px-3 py-1 border border-primary">
                    INTRO VIDEO
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-16">
            <span className="font-mono text-primary font-bold text-sm mb-4 block">/// WHAT'S INSIDE</span>
            <h2 className="font-display text-5xl md:text-7xl font-bold uppercase leading-none">
              What You Get <br /><span className="text-outline-dark">Inside</span>
            </h2>
          </div>

          <div className="border-t-4 border-foreground flex flex-col">
            {[
            { num: "01", tag: "///", title: "Organized Channels", desc: "Discord architecture separated rigidly by university, year, and specific unit. No clutter. Just the signal.", hoverBg: "hover:bg-primary" },
            { num: "02", tag: "[+]", title: "Live Study Rooms", desc: "Pomodoro-timed voice channels. Lock in with others. Silence the noise. Execute your study block.", hoverBg: "hover:bg-accent" },
            { num: "03", tag: "DOC", title: "Curated Archives", desc: "A centralized database of categorized notes and past papers. No more begging in WhatsApp groups.", hoverBg: "hover:bg-card" },
            { num: "04", tag: "EXE", title: "Software Support", desc: "Dedicated syntax and logic help for MATLAB, Python, SolidWorks, AutoCAD, and C++.", hoverBg: "hover:bg-primary" },
            { num: "05", tag: "CHK", title: "Daily Accountability", desc: "Automated question threads and check-ins. Report your progress. State your blockers. Move forward.", hoverBg: "hover:bg-accent" }].
            map((item) =>
            <div key={item.num} className={`group border-b-4 border-foreground flex flex-col md:flex-row items-start md:items-center ${item.hoverBg} transition-colors p-6 md:p-8 cursor-default`}>
                <div className="font-mono text-5xl font-black text-outline-dark md:w-32 mb-4 md:mb-0 group-hover:text-foreground transition-all">{item.num}</div>
                <div className="md:w-1/3 pr-8 mb-4 md:mb-0">
                  <div className="font-mono text-xs font-bold border-2 border-foreground inline-block px-2 py-1 mb-3 group-hover:bg-foreground group-hover:text-primary transition-colors">{item.tag}</div>
                  <h3 className="font-display text-3xl font-bold uppercase">{item.title}</h3>
                </div>
                <div className="md:w-auto flex-1 font-body text-lg text-muted-foreground group-hover:text-foreground font-medium border-l-4 border-transparent md:border-foreground md:pl-8 transition-colors">
                  {item.desc}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-24 bg-foreground text-card border-y-4 border-foreground">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-2xl">
                <span className="font-mono text-primary font-bold text-sm mb-4 block">/// OUR PROJECTS</span>
                <h2 className="font-display text-5xl md:text-7xl font-bold uppercase leading-none mb-6">
                  We Don't Just Study.<br /><span className="text-primary">We Build.</span>
                </h2>
                <p className="font-body text-lg text-gray-400">
                  Theory is useless without execution. We form squads to build feasible, realistic projects on student budgets. We document on GitHub, build portfolios, and ship.
                </p>
              </div>
              <div className="hidden md:block">
                <div className="w-32 h-32 border-4 border-primary rounded-full flex items-center justify-center relative animate-[spin_10s_linear_infinite]">
                  <div className="absolute w-full h-1 bg-primary" />
                  <div className="absolute h-full w-1 bg-primary" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
              { tag: "Hardware Project #1", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80", techs: ["ARDUINO", "C++", "HARDWARE"], title: "Autonomous Line-Following Robot", desc: "Squad-based build focusing on PID control systems, sensor calibration, and chassis fabrication.", accent: "primary" },
              { tag: "IoT System #2", img: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80", techs: ["ESP32", "PYTHON", "AWS"], title: "IoT Smart Irrigation System", desc: "Soil moisture telemetry transmitted to a custom dashboard via MQTT. Real-world Kenyan application.", accent: "accent" },
              { tag: "Software Dashboard #3", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80", techs: ["REACT", "NODEJS", "DATA VIS"], title: "Engineering Metrics Dashboard", desc: "A full-stack application for visualizing structural stress data. Built by the software engineering sub-squad.", accent: "white" },
              { tag: "Drone Simulation #4", img: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80", techs: ["MATLAB", "SIMULINK"], title: "Basic UAV Drone Simulation", desc: "Mathematical modeling of quadcopter flight dynamics before moving to physical prototyping.", accent: "primary" }].
              map((project, i) =>
              <div key={i} className={`border-4 border-gray-700 bg-gray-900 group hover:border-${project.accent} transition-colors duration-300 relative flex flex-col h-full`}>
                  <div className={`absolute top-0 right-0 bg-gray-700 group-hover:bg-${project.accent} text-card group-hover:text-foreground font-mono text-xs px-3 py-1 font-bold transition-colors z-10`}>
                    {project.tag}
                  </div>
                  <div className={`h-64 border-b-4 border-gray-700 group-hover:border-${project.accent} overflow-hidden relative transition-colors`}>
                    <img src={project.img} alt={project.title} className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" />
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techs.map((t) =>
                    <span key={t} className={`border border-gray-600 font-mono text-xs px-2 py-1 text-${project.accent === "white" ? "card" : project.accent}`}>{t}</span>
                    )}
                    </div>
                    <h3 className={`font-display text-3xl font-bold uppercase mb-4 text-card group-hover:text-${project.accent} transition-colors`}>{project.title}</h3>
                    <p className="font-body text-gray-400 mb-6 flex-1">{project.desc}</p>
                    <a href="#" className={`inline-flex items-center gap-2 font-mono text-sm font-bold uppercase text-card hover:text-${project.accent} transition-colors mt-auto`}>
                      View Documentation <span className={`text-${project.accent}`}>→</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* VISION */}
        <section className="py-32 bg-primary border-b-4 border-foreground overflow-hidden relative">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 10px)" }} />
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <span className="font-mono text-foreground font-bold text-sm mb-6 inline-block border-2 border-foreground px-4 py-1 bg-card">/// THE VISION</span>
            <h2 className="font-display text-6xl md:text-8xl font-black uppercase leading-none mb-10 text-foreground">
              The Bigger <br /><span className="text-outline-light">Dream</span>
            </h2>
            <p className="font-body text-2xl text-foreground font-medium leading-relaxed">
              Beyond exams. We are building the next generation of Kenyan technical founders. Expect semester mega-competitions, physical hack nights, alumni mentorship, and direct pipelines to local hardware and software internships. The Hub is just the launchpad.
            </p>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <span className="font-mono text-primary font-bold text-sm mb-4 block">/// PRICING</span>
            <h2 className="font-display text-5xl md:text-7xl font-bold uppercase leading-none">
              Choose Your <span className="text-outline-dark">Plan</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
            {/* Basic */}
            <div className="border-4 border-foreground bg-card p-8 md:p-12 shadow-brutal flex flex-col h-full">
              <div className="border-b-4 border-foreground pb-8 mb-8">
                <h3 className="font-display text-4xl font-bold uppercase mb-4">Basic Access</h3>
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="font-mono text-5xl font-black">KES 200</span>
                  <span className="font-mono text-lg text-muted-foreground font-bold">/ semester</span>
                </div>
                <div className="font-mono text-xl text-destructive line-through font-bold">KES 300</div>
              </div>
              <ul className="font-mono text-sm space-y-4 mb-12 flex-1">
                <li className="flex items-center gap-3"><span className="text-foreground font-black text-lg">&gt;</span>Access to all university channels</li>
                <li className="flex items-center gap-3"><span className="text-foreground font-black text-lg">&gt;</span>Curated notes &amp; past papers archive</li>
                <li className="flex items-center gap-3 text-muted-foreground opacity-50"><span className="font-black text-lg">x</span>Live Pomodoro study rooms</li>
                <li className="flex items-center gap-3 text-muted-foreground opacity-50"><span className="font-black text-lg">x</span>Project build squads</li>
                <li className="flex items-center gap-3 text-muted-foreground opacity-50"><span className="font-black text-lg">x</span>Career &amp; Internship pipeline</li>
              </ul>
              <a href="#join" className="btn-brutal block w-full text-center border-4 border-foreground bg-card hover:bg-foreground hover:text-card text-foreground font-mono font-bold text-lg uppercase py-4 transition-colors">
                Select Basic
              </a>
            </div>

            {/* Premium */}
            <div className="border-4 border-foreground bg-foreground text-card p-8 md:p-12 shadow-brutal-primary relative flex flex-col h-full transform md:-translate-y-4">
              <div className="absolute -top-5 left-8 bg-primary text-foreground font-mono font-bold text-sm px-4 py-1 border-4 border-foreground">
                RECOMMENDED
              </div>
              <div className="border-b-4 border-gray-700 pb-8 mb-8 mt-2">
                <h3 className="font-display text-4xl font-bold uppercase mb-4 text-primary">Premium Access</h3>
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="font-mono text-5xl font-black text-card">KES 800</span>
                  <span className="font-mono text-lg text-gray-400 font-bold">/ semester</span>
                </div>
                <div className="font-mono text-xl text-destructive line-through font-bold">KES 1000</div>
              </div>
              <ul className="font-mono text-sm space-y-4 mb-12 flex-1">
                {["Access to all university channels", "Curated notes & past papers archive", "Live Pomodoro study rooms"].map((item) =>
                <li key={item} className="flex items-center gap-3"><span className="text-primary font-black text-lg">&gt;</span>{item}</li>
                )}
                <li className="flex items-center gap-3 bg-primary/10 p-2 -mx-2 border border-primary/30">
                  <span className="text-primary font-black text-lg">&gt;</span>
                  <strong className="text-primary">Join project build squads</strong>
                </li>
                {["Daily Q&A syntax/logic help", "Career, portfolio & internship pipeline"].map((item) =>
                <li key={item} className="flex items-center gap-3"><span className="text-primary font-black text-lg">&gt;</span>{item}</li>
                )}
              </ul>
              <a href="#join" className="btn-brutal block w-full text-center border-4 border-primary bg-primary text-foreground font-mono font-bold text-lg uppercase py-4 hover:bg-card hover:border-card transition-colors">
                Select Premium
              </a>
            </div>
          </div>

          <div className="mt-12 max-w-2xl mx-auto text-center font-mono text-sm bg-foreground text-card p-6 border-4 border-foreground shadow-brutal-sm">
            <span className="text-accent font-bold">NOTE:</span> Basic is for self-study access. Premium is the full community experience — study rooms, build squads, career pipeline, and more.
          </div>
        </section>

        {/* JOIN + RECRUIT */}
        <section id="join" className="border-t-4 border-foreground">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Join steps */}
            <div className="p-12 md:p-24 bg-card border-b-4 md:border-b-0 md:border-r-4 border-foreground">
              <span className="font-mono text-primary font-bold text-sm mb-4 block">/// HOW TO JOIN</span>
              <h2 className="font-display text-5xl font-bold uppercase leading-none mb-12">
                Get <br /><span className="text-outline-dark">Started</span>
              </h2>

              <div className="space-y-8 mb-12 relative border-l-4 border-foreground ml-4 pl-8">
                <div className="relative">
                  <div className="absolute -left-[44px] top-1 w-6 h-6 bg-primary border-4 border-foreground rounded-full" />
                  <h3 className="font-display text-2xl font-bold uppercase mb-2">Reach Out</h3>
                  <p className="font-body text-muted-foreground">Click the WhatsApp button below to message us directly.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[44px] top-1 w-6 h-6 bg-card border-4 border-foreground rounded-full" />
                  <h3 className="font-display text-2xl font-bold uppercase mb-2">Share Your Details</h3>
                  <p className="font-body text-muted-foreground">Tell us your university, year, and chosen tier (Basic or Premium).</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[44px] top-1 w-6 h-6 bg-foreground border-4 border-foreground rounded-full" />
                  <h3 className="font-display text-2xl font-bold uppercase mb-2">Pay &amp; Get Access</h3>
                  <p className="font-body text-muted-foreground">Complete the M-Pesa transaction to receive your Discord invite link.</p>
                </div>
              </div>

              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-brutal inline-flex items-center gap-3 border-4 border-foreground bg-whatsapp text-card font-mono font-bold text-lg uppercase px-8 py-4 shadow-brutal hover:-translate-y-1 transition-transform w-full md:w-auto justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
                Chat on WhatsApp
              </a>
            </div>

            {/* Recruit */}
            <div className="p-12 md:p-24 bg-foreground text-card relative overflow-hidden">
              <div className="absolute -right-20 -top-20 font-mono text-[15rem] font-black text-card/5 pointer-events-none leading-none">*</div>
              <span className="font-mono text-accent font-bold text-sm mb-4 block">/// JOIN THE TEAM</span>
              <h3 className="font-display text-4xl font-bold uppercase leading-none mb-6">Join The Core Team</h3>
              <p className="font-body text-gray-400 mb-10 text-lg">
                We are actively looking for ambitious engineering students to help run the community. Gain leadership experience, build your portfolio, and impact the Kenyan engineering ecosystem.
              </p>
              <div className="flex flex-wrap gap-3 mb-12">
                {["Moderators", "Study Hosts", "Project Leads", "Comms Coordinators"].map((role) =>
                <span key={role} className="border-2 border-gray-700 bg-gray-800 font-mono text-sm px-3 py-1 text-card">{role}</span>
                )}
              </div>
              <a href="#" className="btn-brutal inline-block border-4 border-accent text-accent bg-transparent font-mono font-bold text-lg uppercase px-8 py-4 shadow-brutal-accent hover:bg-accent hover:text-foreground transition-colors w-full md:w-auto text-center">
                Apply to Join ↗
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER / FAQ */}
      <footer id="faq" className="bg-background border-t-4 border-foreground pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl font-bold uppercase">
              Frequently <span className="text-outline-dark">Asked</span>
            </h2>
          </div>

          <div className="border-4 border-foreground bg-card shadow-brutal mb-24">
            <FAQItem question="Who can join?" answer="Any engineering student enrolled in a Kenyan university (JKUAT, UoN, KU, TUK, etc.). The hub is optimized for undergraduates seeking structure." />
            <FAQItem question="Is the community entirely online?" answer="The primary hub operates on Discord. However, project squads often organize physical meetups for hardware fabrication and hackathons depending on geographic proximity." />
            <FAQItem question="Can I upgrade from Basic to Premium?" answer="Yes. Upgrades are processed within 24 hours of clearing the tier difference via our WhatsApp channel." />
            <FAQItem question="What's the refund policy?" answer="We offer a 7-day evaluation period. If the hub doesn't meet your needs, we'll issue a full refund and revoke access." />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t-4 border-foreground pt-8 font-mono text-sm font-bold uppercase">
            <div className="text-center md:text-left">
              <div className="text-foreground mb-1">THE ENGINEERING HUB // 2024</div>
              <div className="text-muted-foreground">Building Kenya's Technical Future</div>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="hover:bg-foreground hover:text-card border-2 border-transparent hover:border-foreground px-2 py-1 transition-all">Discord</a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:bg-foreground hover:text-card border-2 border-transparent hover:border-foreground px-2 py-1 transition-all">WhatsApp</a>
              <a href="#" className="hover:bg-foreground hover:text-card border-2 border-transparent hover:border-foreground px-2 py-1 transition-all">Email</a>
            </div>
            <a href="#join" className="btn-brutal bg-foreground text-card border-2 border-foreground px-6 py-2 shadow-brutal-sm hover:-translate-y-1 transition-transform">
              Join Now
            </a>
          </div>
        </div>
      </footer>
    </div>);

};

export default Index;