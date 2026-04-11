import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logoImg from "@/assets/logo-new.jpeg";
import {
  MessageCircle,
  Home,
  Info,
  FolderOpen,
  CreditCard,
  UserPlus,
  Wrench,
  Briefcase,
  ArrowRight,
} from "lucide-react";

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

// ─── FadeIn ───
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

// ─── System prompt ───
const SYSTEM_PROMPT = `You are an expert engineering reference assistant for university-level engineering students in Kenya. Your role is to provide thorough, textbook-quality formula explanations.

When given a formula topic or question, always respond in this EXACT JSON format with no markdown, no backticks, no preamble:

{
  "formula_name": "Full name of the formula or principle",
  "discipline": "Engineering discipline (e.g. Fluid Mechanics)",
  "formula_latex": "The formula written clearly e.g. P = F/A",
  "formula_description": "One sentence describing what this formula calculates",
  "variables": [
    {
      "symbol": "P",
      "name": "Pressure",
      "unit": "Pascal (Pa) or N/m²",
      "description": "Force per unit area acting on a surface"
    }
  ],
  "derivation_summary": "2-3 sentence plain English explanation of where this formula comes from and the physics/engineering behind it",
  "worked_example": {
    "problem": "A full example problem statement with real numbers",
    "solution_steps": [
      "Step 1: Identify given values",
      "Step 2: Apply formula",
      "Step 3: Calculate"
    ],
    "answer": "Final answer with units"
  },
  "assumptions_limitations": [
    "Assumption 1",
    "Assumption 2"
  ],
  "common_mistakes": [
    "Mistake 1",
    "Mistake 2"
  ],
  "related_formulas": [
    "Related formula 1",
    "Related formula 2"
  ],
  "textbook_references": [
    {
      "book": "Book title",
      "author": "Author name",
      "edition": "Edition",
      "chapter": "Chapter",
      "publisher": "Publisher"
    }
  ],
  "exam_tips": "2-3 sentence tip for Kenyan university engineering exams",
  "difficulty_level": "Beginner | Intermediate | Advanced",
  "year_level": "Year 1 | Year 2 | Year 3 | Year 4"
}

Always cite real, well-known engineering textbooks. Always include a fully worked numerical example. Always write exam_tips specifically for Kenyan university engineering students (JKUAT, UoN, KU, TUK). Keep language clear and precise.`;

// ─── Types ───
interface FormulaResult {
  formula_name: string;
  discipline: string;
  formula_latex: string;
  formula_description: string;
  variables: { symbol: string; name: string; unit: string; description: string }[];
  derivation_summary: string;
  worked_example: {
    problem: string;
    solution_steps: string[];
    answer: string;
  };
  assumptions_limitations: string[];
  common_mistakes: string[];
  related_formulas: string[];
  textbook_references: { book: string; author: string; edition: string; chapter: string; publisher: string }[];
  exam_tips: string;
  difficulty_level: string;
  year_level: string;
}

const loadingQuotes = [
  "Checking Shigley's Mechanical Engineering Design...",
  "Referencing White's Fluid Mechanics...",
  "Consulting Beer & Johnston's Mechanics of Materials...",
  "Cross-referencing Cengel's Thermodynamics...",
  "Verifying with Hibbeler's Engineering Mechanics...",
  "Consulting Munson's Fundamentals of Fluid Mechanics...",
];

const searchPills = [
  "Reynolds Number", "Darcy-Weisbach", "Euler-Bernoulli Beam",
  "Ohm's Law", "Carnot Efficiency", "Pascal's Law",
  "Gear Ratio", "Stefan-Boltzmann Law", "Mohr's Circle",
  "Bernoulli's Equation", "Fourier's Law of Conduction",
  "Newton's Law of Cooling", "Stress & Strain", "Factor of Safety",
  "Belt Drive Velocity Ratio", "Transformer Turns Ratio",
  "RC Time Constant", "Truss Method of Joints",
  "Concrete Mix Design", "Manning's Equation",
  "NACA Aerofoil Lift", "Specific Impulse",
  "ECG Heart Rate from R-R Interval", "Crop Water Requirement (FAO-56)",
];

const FORMULA_TOPICS = [
  { num: "01", disc: "FLUID MECHANICS", name: "Reynolds Number", desc: "Predicts whether pipe flow is laminar or turbulent — essential for all pipe design problems." },
  { num: "02", disc: "FLUID MECHANICS", name: "Darcy-Weisbach Head Loss", desc: "Calculates friction head loss in pipes — the foundation of every water distribution system design." },
  { num: "03", disc: "FLUID MECHANICS", name: "Bernoulli's Equation", desc: "Relates pressure, velocity, and elevation in flowing fluids — used in nozzles, venturi meters, and aerofoils." },
  { num: "04", disc: "FLUID MECHANICS", name: "Continuity Equation", desc: "Conservation of mass in fluid flow — velocity increases as pipe cross-section decreases." },
  { num: "05", disc: "FLUID MECHANICS", name: "Manning's Equation", desc: "Calculates flow velocity in open channels and rivers — standard in civil drainage design." },
  { num: "06", disc: "FLUID MECHANICS", name: "Orifice Flow (Torricelli's Law)", desc: "Predicts discharge velocity from a tank orifice — used in reservoir and weir design." },
  { num: "07", disc: "FLUID MECHANICS", name: "Drag Force Equation", desc: "Calculates aerodynamic or hydrodynamic resistance on objects moving through fluids." },
  { num: "08", disc: "FLUID MECHANICS", name: "Hydraulic Radius & Wetted Perimeter", desc: "Key geometric parameter for open channel flow calculations and pipe sizing." },
  { num: "09", disc: "FLUID MECHANICS", name: "Pump Power Equation", desc: "Calculates power required to pump fluid — essential for selecting motors and sizing pump systems." },
  { num: "10", disc: "FLUID MECHANICS", name: "Hydrostatic Pressure", desc: "Pressure at depth in a static fluid — used in dam design, underwater structures, and tank walls." },
  { num: "11", disc: "THERMODYNAMICS", name: "Carnot Efficiency", desc: "Maximum theoretical efficiency of any heat engine operating between two temperatures." },
  { num: "12", disc: "THERMODYNAMICS", name: "First Law of Thermodynamics", desc: "Energy conservation for thermodynamic systems — relates heat, work, and internal energy." },
  { num: "13", disc: "THERMODYNAMICS", name: "Ideal Gas Law", desc: "Relates pressure, volume, temperature, and moles of an ideal gas — PV = nRT." },
  { num: "14", disc: "THERMODYNAMICS", name: "Fourier's Law of Heat Conduction", desc: "Calculates heat flow through solid materials — used in insulation and wall design." },
  { num: "15", disc: "THERMODYNAMICS", name: "Newton's Law of Cooling", desc: "Describes convective heat transfer from a surface to a surrounding fluid." },
  { num: "16", disc: "THERMODYNAMICS", name: "Stefan-Boltzmann Radiation Law", desc: "Calculates radiative heat transfer from a surface — critical in furnace and solar collector design." },
  { num: "17", disc: "THERMODYNAMICS", name: "Coefficient of Performance (COP)", desc: "Efficiency metric for refrigerators and heat pumps — how much cooling per unit of work input." },
  { num: "18", disc: "THERMODYNAMICS", name: "LMTD Method (Heat Exchangers)", desc: "Log Mean Temperature Difference — standard method for sizing shell-and-tube heat exchangers." },
  { num: "19", disc: "THERMODYNAMICS", name: "NTU-Effectiveness Method", desc: "Alternative heat exchanger design method when outlet temperatures are unknown." },
  { num: "20", disc: "THERMODYNAMICS", name: "Specific Heat & Enthalpy", desc: "Relates temperature change to heat added — fundamental for all heating and cooling calculations." },
  { num: "21", disc: "STRUCTURAL ENGINEERING", name: "Euler-Bernoulli Beam Deflection", desc: "Calculates deflection of beams under various loading conditions — core to structural design." },
  { num: "22", disc: "STRUCTURAL ENGINEERING", name: "Bending Stress Formula", desc: "Stress distribution across a beam cross-section under bending moment — σ = My/I." },
  { num: "23", disc: "STRUCTURAL ENGINEERING", name: "Shear Stress in Beams", desc: "Horizontal and vertical shear stress distribution — τ = VQ/Ib." },
  { num: "24", disc: "STRUCTURAL ENGINEERING", name: "Column Buckling (Euler's Formula)", desc: "Critical load at which a slender column buckles — key for tall structures and compression members." },
  { num: "25", disc: "STRUCTURAL ENGINEERING", name: "Truss Analysis — Method of Joints", desc: "Systematic method to find member forces in trusses using equilibrium at each joint." },
  { num: "26", disc: "STRUCTURAL ENGINEERING", name: "Mohr's Circle for Stress", desc: "Graphical method to find principal stresses and maximum shear stress at a point." },
  { num: "27", disc: "CIVIL ENGINEERING", name: "Concrete Mix Design (IS/BS Method)", desc: "Determines proportions of cement, sand, aggregate, and water for target compressive strength." },
  { num: "28", disc: "CIVIL ENGINEERING", name: "Manning's Open Channel Flow", desc: "Flow velocity and discharge in open channels — drainage, rivers, and irrigation canals." },
  { num: "29", disc: "CIVIL ENGINEERING", name: "Soil Bearing Capacity (Terzaghi)", desc: "Ultimate bearing capacity of soil beneath a foundation — prevents settlement and collapse." },
  { num: "30", disc: "CIVIL ENGINEERING", name: "Prismoidal Formula (Earthworks)", desc: "Calculates cut and fill volumes in road and railway construction surveys." },
  { num: "31", disc: "MECHANICAL ENGINEERING", name: "Gear Ratio & Speed Reduction", desc: "Relates input/output speeds and torques in gear trains — fundamental to all power transmission design." },
  { num: "32", disc: "MECHANICAL ENGINEERING", name: "Shaft Power & Torque", desc: "Relates rotational speed, torque, and power — P = Tω — used in motor and shaft design." },
  { num: "33", disc: "MECHANICAL ENGINEERING", name: "Factor of Safety", desc: "Ratio of material strength to applied stress — defines safe design margins for all structures." },
  { num: "34", disc: "MECHANICAL ENGINEERING", name: "Belt Drive Velocity Ratio", desc: "Speed and tension relationships in belt-and-pulley systems — core to mechanical power transmission." },
  { num: "35", disc: "MECHANICAL ENGINEERING", name: "Thin-Walled Pressure Vessels", desc: "Hoop and longitudinal stress in cylindrical and spherical pressure vessels — tanks, pipes, boilers." },
  { num: "36", disc: "MECHANICAL ENGINEERING", name: "Torsion of Circular Shafts", desc: "Shear stress and angle of twist in shafts under torque — τ = Tr/J." },
  { num: "37", disc: "MECHANICAL ENGINEERING", name: "Thermal Expansion", desc: "Dimensional change in materials with temperature — critical for pipe joints and bridge bearings." },
  { num: "38", disc: "MECHANICAL ENGINEERING", name: "Vibration — Natural Frequency", desc: "Resonant frequency of mechanical systems — prevents catastrophic resonance in structures and machines." },
  { num: "39", disc: "MECHANICAL ENGINEERING", name: "Hardness & Wear (Archard's Law)", desc: "Predicts material wear rate in sliding contact — bearing and gear surface design." },
  { num: "40", disc: "MECHANICAL ENGINEERING", name: "Efficiency of Machines", desc: "Ratio of useful output to total input — applies to all mechanical systems from gears to engines." },
  { num: "41", disc: "ELECTRICAL ENGINEERING", name: "Ohm's Law", desc: "Fundamental relationship between voltage, current, and resistance — V = IR." },
  { num: "42", disc: "ELECTRICAL ENGINEERING", name: "Transformer Turns Ratio", desc: "Relates primary and secondary voltages and currents via turns ratio — N1/N2 = V1/V2." },
  { num: "43", disc: "ELECTRICAL ENGINEERING", name: "Power Factor & Reactive Power", desc: "Ratio of real power to apparent power — critical for industrial electrical system efficiency." },
  { num: "44", disc: "ELECTRICAL ENGINEERING", name: "RC & RL Time Constants", desc: "Transient response of capacitor and inductor circuits — τ = RC and τ = L/R." },
  { num: "45", disc: "ELECTRICAL ENGINEERING", name: "Three-Phase Power", desc: "Power calculations for three-phase systems — standard for industrial motors and generators." },
  { num: "46", disc: "ELECTRICAL ENGINEERING", name: "Faraday's Law of Induction", desc: "EMF induced by changing magnetic flux — the basis of all transformers and generators." },
  { num: "47", disc: "ELECTRICAL ENGINEERING", name: "Kirchhoff's Voltage & Current Laws", desc: "Conservation laws for circuit analysis — the foundation of all electrical circuit solving." },
  { num: "48", disc: "ELECTRICAL ENGINEERING", name: "DC Motor Torque & Speed", desc: "Relates armature current, flux, and back-EMF to torque and speed in DC motors." },
  { num: "49", disc: "MATERIALS SCIENCE", name: "Stress & Strain (Hooke's Law)", desc: "Linear elastic relationship between stress and strain — σ = Eε — defines material stiffness." },
  { num: "50", disc: "MATERIALS SCIENCE", name: "Fatigue — S-N Curve (Wöhler)", desc: "Predicts material failure under cyclic loading — critical for rotating shafts and bridges." },
  { num: "51", disc: "MATERIALS SCIENCE", name: "Fracture Toughness (Griffith Criterion)", desc: "Critical stress for crack propagation in brittle materials — used in failure analysis." },
  { num: "52", disc: "MATERIALS SCIENCE", name: "Creep & Larson-Miller Parameter", desc: "Long-term deformation of materials at high temperature — gas turbines and boiler design." },
  { num: "53", disc: "MATERIALS SCIENCE", name: "Phase Diagrams — Lever Rule", desc: "Calculates phase fractions in two-phase regions of binary alloy phase diagrams." },
  { num: "54", disc: "AEROSPACE ENGINEERING", name: "Lift Equation (Thin Aerofoil)", desc: "Lift force generated by an aerofoil as a function of velocity, area, and lift coefficient." },
  { num: "55", disc: "AEROSPACE ENGINEERING", name: "Drag Polar & Lift-to-Drag Ratio", desc: "Total drag as a function of lift — fundamental to aircraft performance and range calculations." },
  { num: "56", disc: "AEROSPACE ENGINEERING", name: "Tsiolkovsky Rocket Equation", desc: "Relates delta-V, exhaust velocity, and mass ratio — the master equation of rocket propulsion." },
  { num: "57", disc: "AEROSPACE ENGINEERING", name: "Mach Number & Compressibility", desc: "Ratio of flow speed to local speed of sound — governs aerodynamic behaviour at high speeds." },
  { num: "58", disc: "BIOMEDICAL ENGINEERING", name: "Poiseuille's Law (Blood Flow)", desc: "Flow rate in cylindrical vessels as a function of pressure and radius — models blood in arteries." },
  { num: "59", disc: "BIOMEDICAL ENGINEERING", name: "ECG Heart Rate from R-R Interval", desc: "Calculates beats per minute from the time between consecutive R peaks in an ECG signal." },
  { num: "60", disc: "BIOSYSTEMS ENGINEERING", name: "FAO-56 Penman-Monteith ET₀", desc: "Reference evapotranspiration equation — the global standard for crop irrigation scheduling." },
];

const DISCIPLINES = ["ALL", ...Array.from(new Set(FORMULA_TOPICS.map(t => t.disc)))];

const disciplineColors: Record<string, string> = {
  "FLUID MECHANICS": "bg-primary/20 text-foreground",
  "THERMODYNAMICS": "bg-accent/20 text-foreground",
  "STRUCTURAL ENGINEERING": "bg-primary/30 text-foreground",
  "CIVIL ENGINEERING": "bg-primary/10 text-foreground",
  "MECHANICAL ENGINEERING": "bg-accent/30 text-foreground",
  "ELECTRICAL ENGINEERING": "bg-primary/20 text-foreground",
  "MATERIALS SCIENCE": "bg-accent/10 text-foreground",
  "AEROSPACE ENGINEERING": "bg-primary/30 text-foreground",
  "BIOMEDICAL ENGINEERING": "bg-accent/20 text-foreground",
  "BIOSYSTEMS ENGINEERING": "bg-primary/10 text-foreground",
};

const difficultyColors: Record<string, string> = {
  "Beginner": "bg-primary text-foreground",
  "Intermediate": "bg-accent text-foreground",
  "Advanced": "bg-foreground text-card",
};

const FormulaDirectory = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<FormulaResult | null>(null);
  const [error, setError] = useState(false);
  const [followUpQuery, setFollowUpQuery] = useState("");
  const [followUpResult, setFollowUpResult] = useState("");
  const [followUpLoading, setFollowUpLoading] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [loadingQuote, setLoadingQuote] = useState(0);
  const [activeCategory, setActiveCategory] = useState("ALL");

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const searchFormula = async (query: string) => {
    if (!query.trim()) return;
    setIsLoading(true);
    setError(false);
    setResult(null);
    setShowFollowUp(false);
    setFollowUpResult("");

    const quoteInterval = setInterval(() => {
      setLoadingQuote(prev => (prev + 1) % loadingQuotes.length);
    }, 2000);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/claude-proxy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          system: SYSTEM_PROMPT,
          prompt: query,
          max_tokens: 2000,
        }),
      });
      const data = await response.json();
      const text = data.content
        ?.filter((b: { type: string }) => b.type === "text")
        .map((b: { text: string }) => b.text)
        .join("");
      if (!text) throw new Error("No response");
      const parsed = JSON.parse(text);
      setResult(parsed);
      setTimeout(() => {
        document.getElementById("formula-result")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
      clearInterval(quoteInterval);
    }
  };

  const askFollowUp = async () => {
    if (!followUpQuery.trim() || !result) return;
    setFollowUpLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/claude-proxy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          system: `You are an expert engineering professor. The student just looked up "${result.formula_name}". Answer their follow-up question in plain text, 2-4 paragraphs. Be thorough but clear. Reference the formula context. Tailor for Kenyan university students.`,
          prompt: followUpQuery,
          max_tokens: 1000,
        }),
      });
      const data = await response.json();
      const text = data.content
        ?.filter((b: { type: string }) => b.type === "text")
        .map((b: { text: string }) => b.text)
        .join("");
      setFollowUpResult(text || "No response received.");
    } catch {
      setFollowUpResult("Error getting response. Please try again.");
    } finally {
      setFollowUpLoading(false);
    }
  };

  const handlePillClick = (pill: string) => {
    setSearchQuery(pill);
    searchFormula(pill);
    document.getElementById("search-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleTopicClick = (name: string) => {
    setSearchQuery(name);
    searchFormula(name);
    document.getElementById("search-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredTopics = activeCategory === "ALL"
    ? FORMULA_TOPICS
    : FORMULA_TOPICS.filter(t => t.disc === activeCategory);

  return (
    <div className="text-foreground font-body antialiased overflow-x-hidden">
      {/* Marquee */}
      <div className="w-full bg-foreground text-primary font-mono text-xs uppercase tracking-widest py-1.5 border-b-2 border-foreground overflow-hidden flex whitespace-nowrap">
        <div className="flex animate-marquee">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex">
              <span className="mx-4">★ AI-POWERED FORMULA DIRECTORY</span>
              <span className="mx-4">/// TEXTBOOK REFERENCES INCLUDED</span>
              <span className="mx-4">/// WORKED EXAMPLES FOR EVERY FORMULA</span>
              <span className="mx-4">/// BUILT FOR KENYAN ENGINEERING STUDENTS</span>
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
          {NAV_LINKS.map(link =>
            link.isRoute ? (
              <Link key={link.href} to={link.href} className="hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary pb-1">
                {link.label}
              </Link>
            ) : (
              <a key={link.href} href={link.href} onClick={e => handleNavClick(e, link.href)} className="hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary pb-1">
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

      <main>
        {/* HERO */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-24">
          <FadeIn>
            <div className="border-4 border-foreground bg-foreground p-6 md:p-12 shadow-brutal mb-8 md:mb-12 relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
              <div className="absolute top-4 right-4 md:top-6 md:right-6 font-mono text-xs text-primary/60 uppercase tracking-widest hidden md:block">[ 004 / FORMULAS ]</div>
              <div className="relative z-10">
                <span className="inline-block font-mono text-xs font-bold text-foreground bg-primary px-3 py-1 mb-4 md:mb-6 border-2 border-primary">/// AI-POWERED REFERENCE</span>
                <h1 className="font-display text-5xl md:text-7xl lg:text-[8rem] font-bold leading-[0.85] tracking-tighter uppercase mb-4 text-card">
                  Engineering <br /><span className="text-primary">Formula</span> <br />Directory.
                </h1>
                <p className="font-body text-lg md:text-xl text-card/60 max-w-xl mt-4">
                  Every formula you need — with full derivations, worked examples, textbook references, and exam tips. Powered by AI. Built for Kenyan engineering students.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <a href="#search-section" onClick={e => { e.preventDefault(); document.getElementById("search-section")?.scrollIntoView({ behavior: "smooth" }); }} className="btn-brutal bg-primary text-foreground border-4 border-primary font-mono font-bold text-base uppercase px-6 py-4 text-center shadow-brutal-primary hover:-translate-y-1 transition-transform">
                    Search a Formula ↗
                  </a>
                  <a href="#browse-section" onClick={e => { e.preventDefault(); document.getElementById("browse-section")?.scrollIntoView({ behavior: "smooth" }); }} className="bg-transparent text-card border-4 border-card/30 font-mono font-bold text-sm uppercase px-6 py-3 text-center hover:bg-card hover:text-foreground transition-colors">
                    Browse by Topic
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Stats */}
          <FadeIn>
            <div className="border-4 border-foreground bg-foreground text-card shadow-brutal-sm mb-8 flex flex-col sm:flex-row divide-y-4 sm:divide-y-0 sm:divide-x-4 divide-primary">
              {[
                { value: "12+", label: "Disciplines" },
                { value: "60+", label: "Formula Topics" },
                { value: "AI", label: "Powered" },
                { value: "Free", label: "Forever" },
              ].map(stat => (
                <div key={stat.label} className="flex-1 p-4 md:p-6 text-center">
                  <div className="font-mono text-3xl md:text-4xl font-black text-primary">{stat.value}</div>
                  <div className="font-mono text-xs uppercase tracking-wider text-card/70 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* SEARCH SECTION */}
        <section id="search-section" className="py-12 md:py-20 bg-card border-y-4 border-foreground">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <FadeIn>
              <span className="font-mono text-primary font-bold text-sm mb-4 block">/// ASK THE FORMULA ENGINE</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase leading-none mb-2">
                Search Any <span className="text-outline-dark">Formula</span>
              </h2>
              <div className="w-16 h-1 bg-primary mt-2 mb-4" />
              <p className="font-body text-base text-muted-foreground mb-8">
                Type a formula name, topic, or describe what you need to calculate. The AI will return the full formula with references.
              </p>

              {/* Search input */}
              <div className="flex border-4 border-foreground shadow-brutal-sm">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && searchFormula(searchQuery)}
                  placeholder="e.g. Reynolds number, beam deflection, Ohm's law..."
                  className="flex-1 border-r-4 border-foreground px-4 py-4 font-mono text-base bg-card focus:outline-none placeholder:text-muted-foreground/50"
                />
                <button
                  onClick={() => searchFormula(searchQuery)}
                  disabled={isLoading}
                  className="bg-foreground text-card hover:bg-primary hover:text-foreground font-mono font-bold uppercase px-6 md:px-8 py-4 transition-colors min-w-[120px] md:min-w-[140px] flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-1">Thinking<span className="animate-pulse">...</span></span>
                  ) : (
                    <>Search <ArrowRight size={16} /></>
                  )}
                </button>
              </div>

              {/* Pills */}
              <div className="flex flex-wrap gap-2 mt-4">
                {searchPills.map(pill => (
                  <button
                    key={pill}
                    onClick={() => handlePillClick(pill)}
                    className="border-2 border-foreground font-mono text-xs px-3 py-1.5 bg-card hover:bg-primary cursor-pointer transition-colors"
                  >
                    {pill}
                  </button>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* LOADING STATE */}
        {isLoading && (
          <section className="max-w-5xl mx-auto px-4 md:px-6 py-12">
            <div className="border-4 border-foreground bg-foreground text-card p-8 md:p-12 shadow-brutal">
              <div className="animate-pulse space-y-6">
                <div className="font-mono text-primary text-sm uppercase tracking-widest">/// SEARCHING FORMULA DATABASE...</div>
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <p className="font-body text-card/50 text-sm italic">{loadingQuotes[loadingQuote]}</p>
                <div className="space-y-4">
                  <div className="h-8 bg-card/10 rounded" />
                  <div className="h-4 bg-card/10 rounded w-3/4" />
                  <div className="h-4 bg-card/10 rounded w-1/2" />
                  <div className="h-32 bg-card/10 rounded" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ERROR STATE */}
        {error && !isLoading && (
          <section className="max-w-5xl mx-auto px-4 md:px-6 py-12">
            <div className="border-4 border-foreground bg-card p-8 shadow-brutal text-center">
              <span className="font-mono text-destructive font-bold text-sm mb-2 block">/// ERROR</span>
              <h3 className="font-display text-2xl uppercase mb-4">Formula Not Found</h3>
              <p className="font-body text-muted-foreground mb-6">
                The AI couldn't process that query. This feature requires a backend connection to work. Please enable Lovable Cloud to power AI search.
              </p>
              <button
                onClick={() => searchFormula(searchQuery)}
                className="border-4 border-foreground bg-primary font-mono font-bold uppercase px-6 py-3 hover:bg-foreground hover:text-primary transition-colors"
              >
                Retry Search
              </button>
            </div>
          </section>
        )}

        {/* RESULT DISPLAY */}
        {result && !isLoading && (
          <section id="formula-result" className="max-w-5xl mx-auto px-4 md:px-6 py-12">
            <div className="transition-all duration-500 border-4 border-foreground bg-card shadow-brutal">
              {/* Header */}
              <div className="bg-foreground text-card p-6 border-b-4 border-foreground">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`font-mono text-xs border-2 border-foreground px-2 py-0.5 font-bold ${disciplineColors[result.discipline?.toUpperCase()] || "bg-primary/20 text-foreground"}`}>
                    {result.discipline}
                  </span>
                  <span className={`font-mono text-xs border-2 border-foreground px-2 py-0.5 font-bold ${difficultyColors[result.difficulty_level] || "bg-primary text-foreground"}`}>
                    {result.difficulty_level}
                  </span>
                  <span className="font-mono text-xs bg-card/20 text-card px-2 py-0.5">{result.year_level}</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-card">{result.formula_name}</h2>
                <p className="font-body text-card/70 mt-2">{result.formula_description}</p>
              </div>

              {/* Formula display */}
              <div className="bg-primary border-b-4 border-foreground p-8 text-center">
                <div className="font-mono text-xs text-foreground/60 uppercase tracking-widest mb-3">/// THE FORMULA</div>
                <div className="font-mono text-3xl md:text-5xl font-black text-foreground break-all">{result.formula_latex}</div>
                <p className="font-body text-sm text-foreground/70 mt-3">{result.formula_description}</p>
              </div>

              {/* Variables table */}
              <div className="p-6 border-b-4 border-foreground">
                <div className="font-mono text-xs font-bold text-primary uppercase tracking-widest mb-4">/// VARIABLES DEFINED</div>
                <div className="border-4 border-foreground overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-foreground text-card font-mono text-xs uppercase">
                        <th className="px-4 py-3 text-left border-r-2 border-primary/30 w-16">Symbol</th>
                        <th className="px-4 py-3 text-left border-r-2 border-primary/30">Variable</th>
                        <th className="px-4 py-3 text-left border-r-2 border-primary/30">Unit</th>
                        <th className="px-4 py-3 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.variables?.map((v, i) => (
                        <tr key={i} className={`border-b-2 border-foreground ${i % 2 === 0 ? "bg-card" : "bg-background"}`}>
                          <td className="bg-primary/10 font-mono font-black text-lg px-4 py-3 border-r-2 border-foreground text-center">{v.symbol}</td>
                          <td className="font-body text-sm px-4 py-3 border-r-2 border-foreground/20">{v.name}</td>
                          <td className="font-mono text-xs px-4 py-3 border-r-2 border-foreground/20">{v.unit}</td>
                          <td className="font-body text-sm px-4 py-3">{v.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Derivation */}
              <div className="p-6 border-b-4 border-foreground bg-background">
                <div className="font-mono text-xs font-bold text-primary uppercase tracking-widest mb-4">/// WHERE IT COMES FROM</div>
                <div className="border-l-4 border-primary pl-4">
                  <p className="font-body text-base text-foreground leading-relaxed">{result.derivation_summary}</p>
                </div>
              </div>

              {/* Worked example */}
              <div className="p-6 border-b-4 border-foreground">
                <div className="font-mono text-xs font-bold text-primary uppercase tracking-widest mb-4">/// WORKED EXAMPLE</div>
                <div className="bg-foreground text-card p-4 border-2 border-foreground mb-4">
                  <div className="font-mono text-xs text-primary mb-2">PROBLEM</div>
                  <p className="font-body text-sm">{result.worked_example?.problem}</p>
                </div>
                <div className="space-y-3 mb-4">
                  {result.worked_example?.solution_steps?.map((step, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <span className="font-mono text-xs bg-primary text-foreground border-2 border-foreground px-2 py-1 font-black min-w-[28px] text-center shrink-0">{i + 1}</span>
                      <span className="font-body text-sm text-foreground">{step}</span>
                    </div>
                  ))}
                </div>
                <div className="border-4 border-foreground bg-primary text-foreground p-4 text-center">
                  <div className="font-mono text-xs mb-1">ANSWER</div>
                  <div className="font-mono font-black text-xl">{result.worked_example?.answer}</div>
                </div>
              </div>

              {/* Assumptions & Mistakes */}
              <div className="p-6 border-b-4 border-foreground">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="font-mono text-xs font-bold uppercase text-accent mb-3">⚠ ASSUMPTIONS & LIMITATIONS</div>
                    {result.assumptions_limitations?.map((a, i) => (
                      <div key={i} className="border-l-4 border-accent pl-3 mb-2 font-body text-sm">{a}</div>
                    ))}
                  </div>
                  <div>
                    <div className="font-mono text-xs font-bold uppercase text-destructive mb-3">✕ COMMON MISTAKES</div>
                    {result.common_mistakes?.map((m, i) => (
                      <div key={i} className="border-l-4 border-destructive pl-3 mb-2 font-body text-sm">{m}</div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Exam tips */}
              <div className="p-6 border-b-4 border-foreground bg-primary">
                <div className="font-mono text-xs font-bold text-foreground/60 uppercase mb-3">/// EXAM TIPS — KENYAN UNIVERSITIES</div>
                <div className="font-body text-base text-foreground font-medium border-l-4 border-foreground pl-4">
                  {result.exam_tips}
                </div>
              </div>

              {/* Related formulas */}
              <div className="p-6 border-b-4 border-foreground">
                <div className="font-mono text-xs font-bold text-primary uppercase tracking-widest mb-4">/// RELATED FORMULAS</div>
                <div className="flex flex-wrap gap-2">
                  {result.related_formulas?.map((f, i) => (
                    <button key={i} onClick={() => handleTopicClick(f)} className="border-2 border-foreground font-mono text-sm px-3 py-2 bg-card hover:bg-primary cursor-pointer transition-colors">
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Textbook references */}
              <div className="p-6 border-b-4 border-foreground bg-background">
                <div className="font-mono text-xs font-bold text-primary uppercase tracking-widest mb-4">/// TEXTBOOK REFERENCES</div>
                {result.textbook_references?.map((ref, i) => (
                  <div key={i} className="border-2 border-foreground p-4 mb-3 bg-card flex gap-4 items-start">
                    <div className="border-4 border-foreground bg-primary w-12 h-12 flex items-center justify-center font-black text-xl shrink-0">📖</div>
                    <div>
                      <div className="font-display text-base font-bold uppercase">{ref.book}</div>
                      <div className="font-mono text-xs text-muted-foreground">{ref.author} — {ref.edition}</div>
                      <span className="font-mono text-xs bg-primary/10 text-foreground border border-primary/30 px-2 py-0.5 inline-block mt-1">{ref.chapter}</span>
                      <div className="font-mono text-xs text-muted-foreground mt-1">{ref.publisher}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action row */}
              <div className="p-6 flex flex-col sm:flex-row gap-3">
                <button onClick={() => setShowFollowUp(true)} className="border-4 border-foreground bg-foreground text-card hover:bg-primary hover:text-foreground font-mono font-bold uppercase px-6 py-3 transition-colors flex-1 text-center">
                  Ask a Follow-up ↗
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Check out this formula from Engineering Hub: ${result.formula_name} — ${WHATSAPP_URL}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-foreground border-4 border-foreground font-mono font-bold uppercase px-6 py-3 flex items-center justify-center gap-2 flex-1"
                >
                  <MessageCircle size={18} /> Share on WhatsApp
                </a>
                <button
                  onClick={() => { setResult(null); setSearchQuery(""); document.getElementById("search-section")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="border-4 border-primary bg-primary text-foreground font-mono font-bold uppercase px-6 py-3 flex-1 text-center"
                >
                  Search Another ↗
                </button>
              </div>
            </div>
          </section>
        )}

        {/* FOLLOW-UP */}
        {showFollowUp && result && (
          <section className="max-w-5xl mx-auto px-4 md:px-6 pb-8">
            <div className="bg-foreground border-4 border-primary p-6">
              <div className="font-mono text-xs text-primary mb-3">/// ASK A FOLLOW-UP</div>
              <div className="flex border-4 border-foreground">
                <input
                  type="text"
                  value={followUpQuery}
                  onChange={e => setFollowUpQuery(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && askFollowUp()}
                  placeholder="e.g. How does this change at high Reynolds numbers?"
                  className="flex-1 font-mono text-sm text-card bg-transparent px-4 py-3 focus:outline-none placeholder:text-card/40"
                />
                <button
                  onClick={askFollowUp}
                  disabled={followUpLoading}
                  className="bg-primary text-foreground hover:bg-card hover:text-foreground font-mono font-bold px-6 py-3 transition-colors"
                >
                  {followUpLoading ? "..." : "Send"}
                </button>
              </div>
            </div>
            {followUpResult && (
              <div className="border-4 border-foreground bg-card p-6 mt-4">
                <div className="font-mono text-xs text-primary mb-3">/// AI RESPONSE</div>
                <p className="font-body text-base text-foreground leading-relaxed whitespace-pre-wrap">{followUpResult}</p>
              </div>
            )}
          </section>
        )}

        {/* BROWSE BY TOPIC */}
        <section id="browse-section" className="bg-card border-t-4 border-foreground py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <FadeIn className="mb-10">
              <span className="font-mono text-primary font-bold text-sm mb-4 block">/// BROWSE BY TOPIC</span>
              <h2 className="font-display text-4xl md:text-6xl font-bold uppercase leading-none mb-2">
                Formula <span className="text-outline-dark">Library.</span>
              </h2>
              <div className="w-16 h-1 bg-primary mt-2 mb-4" />
              <p className="font-body text-muted-foreground mb-6">Click any topic to instantly load the full formula breakdown.</p>

              {/* Category filter */}
              <div className="flex flex-wrap gap-2 mb-8">
                {DISCIPLINES.map(d => (
                  <button
                    key={d}
                    onClick={() => setActiveCategory(d)}
                    className={`font-mono text-xs font-bold px-3 py-1.5 border-2 border-foreground transition-colors ${activeCategory === d ? "bg-foreground text-card" : "bg-card hover:bg-primary"}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </FadeIn>

            <div className="border-t-4 border-foreground flex flex-col">
              {filteredTopics.map(topic => (
                <FadeIn key={topic.num}>
                  <div
                    onClick={() => handleTopicClick(topic.name)}
                    className="group border-b-4 border-foreground flex flex-col md:flex-row items-start md:items-center hover:bg-primary transition-colors p-4 md:p-8 cursor-pointer"
                  >
                    <div className="font-mono text-4xl md:text-5xl font-black text-outline-dark md:w-32 mb-2 md:mb-0 group-hover:text-foreground transition-all">{topic.num}</div>
                    <div className="md:w-1/3 pr-4 md:pr-8 mb-2 md:mb-0">
                      <div className="font-mono text-xs font-bold border-2 border-foreground inline-block px-2 py-1 mb-2 md:mb-3 group-hover:bg-foreground group-hover:text-primary transition-colors">{topic.disc}</div>
                      <h3 className="font-display text-2xl md:text-3xl font-bold uppercase">{topic.name}</h3>
                    </div>
                    <div className="md:w-auto flex-1 font-body text-base md:text-lg text-muted-foreground group-hover:text-foreground font-medium border-l-0 md:border-l-4 border-foreground md:pl-8 transition-colors">
                      {topic.desc}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* DISCORD CTA */}
        <section className="py-20 md:py-32 bg-primary border-y-4 border-foreground overflow-hidden relative">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 10px)" }} />
          <FadeIn className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
            <span className="font-mono text-foreground font-bold text-sm mb-6 inline-block border-2 border-foreground px-4 py-1 bg-card">/// THE ENGINEERING HUB</span>
            <h2 className="font-display text-5xl md:text-8xl font-black uppercase leading-none mb-8 md:mb-10 text-foreground">
              Stuck on a <br /><span className="text-outline-light">Formula?</span>
            </h2>
            <p className="font-body text-xl text-foreground font-medium max-w-2xl mx-auto mb-10">
              Post it in the Discord — 450+ engineers are online. Someone's already solved it. The Hub exists so no Kenyan engineering student studies alone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="border-4 border-foreground bg-foreground text-card hover:bg-card hover:text-foreground font-mono font-bold uppercase px-8 py-4 shadow-brutal transition-colors hover:-translate-y-1">
                Join Discord ↗
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-foreground border-4 border-foreground font-mono font-bold uppercase px-8 py-4 shadow-brutal hover:-translate-y-1 transition-transform flex items-center justify-center gap-2">
                <MessageCircle size={22} /> Chat on WhatsApp
              </a>
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

export default FormulaDirectory;
