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
                  <a href="#search-section" onClick={e => { e.preventDefault(); document.getElementById("search-section")?.scrollIntoView({ behavior: "smooth" }); }} className="bg-transparent text-card border-4 border-card/30 font-mono font-bold text-sm uppercase px-6 py-3 text-center hover:bg-card hover:text-foreground transition-colors">
                    See Example Searches ↓
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
                  <span className={`font-mono text-xs border-2 border-foreground px-2 py-0.5 font-bold bg-primary/20 text-foreground`}>
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
