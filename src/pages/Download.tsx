import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Download,
  Terminal,
  Cpu,
  ScanLine,
  BookOpenCheck,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  Copy,
  Check,
  Smartphone,
  HardDrive,
  FileCode2,
  Mic,
  Compass,
  AlertTriangle,
  Award,
  Database,
  ArrowUpRight,
  Layers,
  Clock,
  ExternalLink,
  Laptop,
  CheckCircle2
} from "lucide-react";

type ReleaseChannel = "stable" | "early";

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: "What is the difference between the Web Hub and Study Desk (.exe)?",
    a: "The Web Hub (engineeringhub.site) gives you instant browser access to 2,571+ past papers and notes across 113 units. Study Desk runs locally on your Windows laptop (http://localhost:5190) and adds personal sub-topic weakspot tracking, step-by-step math checkpoint dissection, handwritten photo grading, voice teach-backs, and printable A4 study kits."
  },
  {
    q: "How do photo working checks and voice teach-backs work with AI keys?",
    a: "During setup.bat or in Settings, you can select Gemini, Claude, or DeepSeek. Gemini supports both handwritten working photos and spoken voice teach-backs; Claude supports photos; DeepSeek handles text/math checkpoints. Whenever a derivation is too heavy, Study Desk generates a 1-click 120k-token Context Pack (.md) for any external AI."
  },
  {
    q: "What if my CAT or exam dates are uncertain because of a strike?",
    a: "Every unit date in Study Desk supports a 1-click 'TBA' toggle (plus a global 'Mark them TBA' banner in the hero). Units marked TBA automatically enter Adequate Prep stage instead of triggering false 1-Week alarms from the default university calendar."
  },
  {
    q: "Why are there zero flashcards in Study Desk?",
    a: "Engineering exams aren't passed by flipping definition cards. Study Desk uses the Breakpoint Model—measuring your mastery across three links: Why (conceptual), How (procedural setup), and Do (execution with SI units). You only turn a topic Green when your 90% confidence floor (U_lo) reaches 60+ across real past-paper problems."
  },
  {
    q: "Where is my study data stored and does it require admin rights?",
    a: "Study Desk installs to %LOCALAPPDATA%\\StudyDesk with zero Windows administrator rights needed. All your units, attempts, hints, and synced text live locally in study/data/study.json and library.json, with automatic version backups in data/backups/."
  }
];

export const DownloadPage: React.FC = () => {
  const [channel, setChannel] = useState<ReleaseChannel>("stable");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeShot, setActiveShot] = useState<"today" | "plan" | "practise" | "review" | "menu">("today");

  const releaseMeta =
    channel === "stable"
      ? {
          version: "v1.1.0",
          date: "28 Oct 2026",
          badge: "STABLE RELEASE",
          exeUrl: "/downloads/StudyDesk.exe",
          size: "70.6 MB",
          notes: "Includes Breakpoint understanding model, photo working checker, voice teach-backs, and 4-band sorted UI."
        }
      : {
          version: "v1.2.0-beta",
          date: "Foundry Preview",
          badge: "EARLY ACCESS",
          exeUrl: "/downloads/StudyDesk.exe",
          size: "72.4 MB",
          notes: "Early access build with multi-university unit equivalency mapping and experimental OCR batch parsing."
        };

  const handleCopySupport = () => {
    navigator.clipboard.writeText("support@engineeringhub.site");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const screenshots = {
    today: {
      url: "/screenshots/band-01-today.png",
      title: "01 / Today",
      desc: "Countdown to nearest CAT, 4-stat metrics & today's priority tasks"
    },
    plan: {
      url: "/screenshots/band-02-radar.png",
      title: "02 / Plan & Milestones",
      desc: "Course units with Bayesian confidence ratings, predicted CAT topics & sub-topic audits"
    },
    practise: {
      url: "/screenshots/band-03-practise.png",
      title: "03 / Practise & Radar",
      desc: "Study kits, worked ladders, unit-aware checkpoint checking & Feynman teach-backs"
    },
    review: {
      url: "/screenshots/band-04-review.png",
      title: "04 / Review & Weakspots",
      desc: "120k-token Deep Context Pack builder and 7-day study consistency trend"
    },
    menu: {
      url: "/screenshots/dropdown-compact.png",
      title: "Quick-Switch Navigation",
      desc: "Compact popover menu with zero SVG clutter for instant navigation between sections"
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#090d16] text-[#0b0f14] dark:text-[#f8fafc] font-sans antialiased selection:bg-blue-600 selection:text-white pb-20">
      {/* ===================================================================
          1. FLOATING LIQUID-GLASS NAVBAR (KOODO & APPLE AESTHETIC)
         =================================================================== */}
      <div className="sticky top-4 z-50 w-full px-4 sm:px-6 pointer-events-none">
        <header className="max-w-6xl mx-auto h-14 rounded-full border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-slate-900/5 px-4 sm:px-6 flex items-center justify-between pointer-events-auto transition-all hover:bg-white dark:hover:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-xl bg-[#f2c200] text-[#0b0f14] font-black text-xs flex items-center justify-center border border-[#0b0f14]/20 shadow-sm group-hover:scale-105 transition-transform">
              EH
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-xs sm:text-sm leading-tight text-slate-900 dark:text-white tracking-tight">
                Engineering Hub
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono tracking-wider uppercase">
                Study Desk · v1.1.0
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <a
              href="#guide"
              className="px-3 py-1.5 rounded-full hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              User Guide
            </a>
            <a
              href="#features"
              className="px-3 py-1.5 rounded-full hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              Breakpoint Model
            </a>
            <a
              href="#more-features"
              className="px-3 py-1.5 rounded-full hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              Context Pack
            </a>
            <a
              href="#faq"
              className="px-3 py-1.5 rounded-full hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              to="/"
              className="hidden sm:inline-flex px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              Web Archive
            </Link>
            <a
              href={releaseMeta.exeUrl}
              download="StudyDesk.exe"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download (.exe)</span>
            </a>
          </div>
        </header>
      </div>

      {/* ===================================================================
          2. HERO SECTION + KOODO CHANNEL SWITCHER & PLATFORM CARDS
         =================================================================== */}
      <main id="guide" className="pt-16 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50/80 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Zero flashcards ever · Built on the 3-Link Breakpoint Model</span>
          </div>

          {/* Clean Modern Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.08]">
              Engineering Exam Prep, <br className="hidden sm:inline" />
              <span className="text-blue-600 dark:text-blue-400">Made Exact.</span>
            </h1>

            <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Study Desk is a local-first Windows workbench designed to diagnose where your math working broke, predict KU exam topics, and sync daily plans via Discord.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={releaseMeta.exeUrl}
              download="StudyDesk.exe"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download for Windows ({releaseMeta.version})</span>
            </a>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-6 py-3.5 rounded-xl font-semibold text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 shadow-sm transition-all"
            >
              <span>Open Web Hub</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>

          {/* ===============================================================
              CHANNEL SWITCHER + 3 PLATFORM CARDS
             =============================================================== */}
          <div className="pt-10 max-w-4xl mx-auto space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Download For Your Workbench
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose Stable or Early Access below. Installs to %LOCALAPPDATA% with zero administrator privileges required.
              </p>
            </div>

            {/* Segmented Channel Switcher */}
            <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/60 shadow-inner">
              <button
                type="button"
                onClick={() => setChannel("stable")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  channel === "stable"
                    ? "bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
                }`}
              >
                Stable Version <span className="ml-1 opacity-70 text-[11px]">v1.1.0</span>
              </button>
              <button
                type="button"
                onClick={() => setChannel("early")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  channel === "early"
                    ? "bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
                }`}
              >
                Early Access <span className="ml-1 opacity-70 text-[11px]">v1.2.0-beta</span>
              </button>
            </div>

            {/* 3 Download Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left pt-2">
              {/* Card 1: Windows Installer */}
              <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60">
                      Windows 10 / 11 (64-bit)
                    </span>
                    <HardDrive className="w-4 h-4 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Windows Installer (.exe)
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    71 MB standalone binary. Installs to <code className="font-mono text-slate-800 dark:text-slate-200">%LOCALAPPDATA%\StudyDesk</code> with <strong>zero admin rights</strong> needed.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                  <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                    <span>{releaseMeta.version}</span>
                    <span>{releaseMeta.size}</span>
                  </div>
                  <a
                    href={releaseMeta.exeUrl}
                    download="StudyDesk.exe"
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .exe</span>
                  </a>
                </div>
              </div>

              {/* Card 2: Localhost CLI */}
              <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60">
                      Localhost:5190
                    </span>
                    <Terminal className="w-4 h-4 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Localhost CLI / Portable
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Node.js LTS runtime with <code className="font-mono text-slate-800 dark:text-slate-200">start.bat</code>. Stores all data locally in <code className="font-mono text-slate-800 dark:text-slate-200">study/data/store.json</code>.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                  <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                    <span>PORT: 5190</span>
                    <span>JSON STORE</span>
                  </div>
                  <a
                    href={releaseMeta.exeUrl}
                    download="StudyDesk.exe"
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Portable</span>
                  </a>
                </div>
              </div>

              {/* Card 3: Web Platform & Archive */}
              <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60">
                      Browser Access
                    </span>
                    <BookOpenCheck className="w-4 h-4 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Web Platform &amp; Archive
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    2,571+ KU Past Papers &amp; Lecture Notes across 113 engineering units with instant search and browser preview.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                  <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                    <span>2,571+ PAPERS</span>
                    <span>FREE ACCESS</span>
                  </div>
                  <Link
                    to="/"
                    className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Browse Web Archive</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-500 dark:text-slate-400">
              <span>{releaseMeta.notes}</span>{" "}
              <a href="#faq" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline ml-1">
                View Release Notes &amp; Setup Guide →
              </a>
            </div>
          </div>

          {/* ===============================================================
              INTERACTIVE SCREENSHOT SHOWCASE VIEWER (APPLE / KOODO FRAME)
             =============================================================== */}
          <div className="pt-8 max-w-5xl mx-auto">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden p-3 sm:p-5 space-y-4">
              {/* Window Title Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2">
                    Study Desk · localhost:5190
                  </span>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-1.5">
                  {(["today", "plan", "practise", "review", "menu"] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveShot(tab)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                        activeShot === tab
                          ? "bg-blue-600 text-white shadow-sm"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Screenshot Frame */}
              <div className="overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                <img
                  src={screenshots[activeShot].url}
                  alt={screenshots[activeShot].title}
                  className="w-full h-auto object-cover max-h-[640px]"
                />
              </div>

              {/* Caption */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 px-1">
                <span className="font-semibold text-slate-900 dark:text-white">
                  {screenshots[activeShot].title}
                </span>
                <span>{screenshots[activeShot].desc}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ===================================================================
          3. SECTION 1: "POWER UP YOUR ENGINEERING PREP" (3 PILLARS)
         =================================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/30">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              System Architecture
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Power Up Your Engineering Prep
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <HardDrive className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Local-First + Discord Sync
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Runs locally on Windows (<code className="font-mono text-slate-800 dark:text-slate-200">localhost:5190</code>) with zero cloud latency while syncing 07:00 morning plans and 20:30 nudges to your phone via Discord DMs.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                4-Stage Adaptive Planning
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Automatically shifts your daily tasks between <strong>Adequate Prep</strong>, <strong>1-Week Mode</strong>, <strong>Last-Minute Mode</strong>, and <strong>Exam-Eve Triage</strong> (with full <strong>TBA</strong> strike-date support).
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Multimodal AI &amp; Deep Context
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Supports Gemini, Claude, and DeepSeek for handwritten photo grading, spoken Feynman teach-backs, and 1-click 120k-token <code className="font-mono text-slate-800 dark:text-slate-200">.md</code> context packs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          4. SECTION 2: "OUR FEATURES" (4 ALTERNATING BLOCKS)
         =================================================================== */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Built for Engineering Exams
            </h2>
          </div>

          <div className="space-y-10">
            {/* Feature 1: Checkpoints */}
            <div className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm overflow-hidden">
              <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-center space-y-4 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800/80">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Feature 01 · Checkpoint &amp; Photo Dissection
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Find the Exact Line Where Your Math Working Broke
                </h3>
                <p className="text-sm sm:text-[15px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Type a final answer (<code className="font-mono font-semibold">142.5 MPa</code> = <code className="font-mono font-semibold">0.1425 GPa</code> unit-aware) or upload a photo of handwritten working. Dissects wrong answers into 3–6 numbered checkpoints so you click <strong>Broke here ❌</strong> on the exact diverging step.
                </p>
              </div>
              <div className="lg:col-span-6 bg-[#090d16] p-6 sm:p-8 font-mono text-xs text-white flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-blue-400 font-semibold">CHECK_ANSWER · EMM 318 (2023 Q3)</span>
                  <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[10px] font-semibold">UNIT-AWARE ±1%</span>
                </div>
                <div className="space-y-2.5 my-4">
                  <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-950/20 flex justify-between">
                    <span>STEP 1: Torque T = (60 × P) / (2πN) = 477.46 N·m</span>
                    <span className="text-emerald-400 font-semibold">HELD ✓</span>
                  </div>
                  <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-950/20 flex justify-between">
                    <span>STEP 2: Polar Moment J = (π/32) × d⁴</span>
                    <span className="text-emerald-400 font-semibold">HELD ✓</span>
                  </div>
                  <div className="p-3 rounded-lg border border-red-500/40 bg-red-950/30 flex justify-between items-center">
                    <span>STEP 3: Convert N·m to N·mm before solving d</span>
                    <span className="px-2 py-0.5 rounded bg-red-500 text-white font-semibold text-[10px]">BROKE HERE ❌ (UNITS)</span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400">
                  Next action prescribed automatically: 1 timed past-paper question checking units at every line.
                </div>
              </div>
            </div>

            {/* Feature 2: Breakpoint Model */}
            <div className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm overflow-hidden">
              <div className="lg:col-span-6 bg-[#090d16] p-6 sm:p-8 font-mono text-xs text-white flex flex-col justify-between order-2 lg:order-1 border-t lg:border-t-0 lg:border-r border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-amber-400 font-semibold">BAYESIAN FLOOR · U_lo ≥ 0.60</span>
                  <span className="text-slate-400">90% CONFIDENCE</span>
                </div>
                <div className="space-y-2.5 my-4">
                  <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/50 flex justify-between">
                    <span>1. WHY (Concept &amp; Assumptions)</span>
                    <span className="text-emerald-400 font-semibold">U_lo = 0.74 (GREEN)</span>
                  </div>
                  <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-950/20 flex justify-between">
                    <span>2. HOW (Equation Setup &amp; Free-Body)</span>
                    <span className="text-amber-400 font-semibold">U_lo = 0.52 (AMBER)</span>
                  </div>
                  <div className="p-3 rounded-lg border border-red-500/30 bg-red-950/20 flex justify-between">
                    <span>3. DO (Algebra, Calculator &amp; Units)</span>
                    <span className="text-red-400 font-semibold">U_lo = 0.38 (RED)</span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400">
                  Requires 2 clean attempts with zero broken steps to promote topic from Amber to Green.
                </div>
              </div>
              <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-center space-y-4 order-1 lg:order-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Feature 02 · The Breakpoint Model (Why / How / Do)
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Replaces Flashcards with 3-Layer Mastery
                </h3>
                <p className="text-sm sm:text-[15px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Replaces useless flashcards with a 3-layer Bayesian chain (<strong>Why</strong> conceptual, <strong>How</strong> procedural setup, <strong>Do</strong> execution). Topic colors reflect your 90% confidence floor (<code className="font-mono font-semibold">U_lo ≥ 0.60</code>).
                </p>
              </div>
            </div>

            {/* Feature 3: Predictions & Hints */}
            <div className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm overflow-hidden">
              <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-center space-y-4 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800/80">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Feature 03 · Past-Paper Frequency × Hints
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Past-Paper Frequency × Classroom Hints
                </h3>
                <p className="text-sm sm:text-[15px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Parses synced KU past papers and CATs by mark frequency and boosts classroom hints (<strong>2.5x</strong> weight with a <strong>&quot;Pinned by Lecturer&quot;</strong> badge) to generate 65%-coverage predicted mocks.
                </p>
              </div>
              <div className="lg:col-span-6 bg-[#090d16] p-6 sm:p-8 font-mono text-xs text-white flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-blue-400 font-semibold">PREDICTIONS · RANKED BY EXAM WEIGHT</span>
                  <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[10px] font-semibold">2.5× HINT BOOST</span>
                </div>
                <div className="space-y-2.5 my-4">
                  <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-950/20 flex items-center justify-between">
                    <div>
                      <span className="font-semibold block">#1 Beta &amp; Gamma Functions</span>
                      <span className="text-[11px] text-slate-400">Appeared 5 of 6 yrs · Avg 14 marks</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-semibold text-[10px]">
                      PINNED BY LECTURER
                    </span>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="font-semibold block">#2 Laplace Transforms (PDEs)</span>
                      <span className="text-[11px] text-slate-400">Appeared 4 of 6 yrs · Avg 12 marks</span>
                    </div>
                    <span className="text-emerald-400 font-semibold">HIGH YIELD</span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400">
                  Calculates optimal study sequence so you secure 40+ marks first before touching low-yield topics.
                </div>
              </div>
            </div>

            {/* Feature 4: Stage-Matched Study Kits */}
            <div className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm overflow-hidden">
              <div className="lg:col-span-6 bg-[#090d16] p-6 sm:p-8 font-mono text-xs text-white flex flex-col justify-between order-2 lg:order-1 border-t lg:border-t-0 lg:border-r border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-emerald-400 font-semibold">STAGE-MATCHED ASSETS</span>
                  <span className="text-slate-400">A4 PRINT-READY</span>
                </div>
                <div className="space-y-2.5 my-4">
                  <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/50 flex justify-between">
                    <span>ADEQUATE PREP: 3-Step Worked Ladders</span>
                    <span className="text-blue-400 font-semibold">FOUNDATIONAL</span>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/50 flex justify-between">
                    <span>1-WEEK MODE: 5 Solving Recipes</span>
                    <span className="text-amber-400 font-semibold">FAST-TRACK</span>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/50 flex justify-between">
                    <span>LAST-MINUTE: 1-Page Formula &amp; Trap Sheet</span>
                    <span className="text-emerald-400 font-semibold">PRINT A4</span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400">
                  Export directly to PDF or print out double-sided before walking into your exam hall.
                </div>
              </div>
              <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-center space-y-4 order-1 lg:order-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Feature 04 · Stage-Matched Study Kits
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Stage-Matched Study Kits &amp; Printable Formula Sheets
                </h3>
                <p className="text-sm sm:text-[15px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Generates 3-step worked ladders for <strong>Adequate Prep</strong>, solving recipes for <strong>1-Week Mode</strong>, and 1-page printable A4 Formula &amp; Trap Sheets for <strong>Last-Minute</strong> / <strong>Exam-Eve</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          5. SECTION 3: "MORE FEATURES" (6-CARD BENTO GRID)
         =================================================================== */}
      <section id="more-features" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/30">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Extended Toolset
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              More Features
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <FileCode2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                120k-Token Prompt Builder
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Export full unit syllabus, exam breakdown, lecture notes, formula sheets, and your personal weakspot history into a clean markdown pack.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Mic className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Feynman Teach-Back Audio Mode
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Record a 2-minute voice explanation of a core theorem. Gemini/Claude scores conceptual precision out of 5 and flags missing boundary assumptions.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Year &amp; Cohort Auto-Sorting
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Enter your department (Mechanical, Electrical, Civil, Mechatronics) and semester to auto-load syllabus codes, credit weights, and prerequisites.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Error Radar &amp; Trap Index
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Aggregates recurring marks lost across units (e.g. forgot radian mode on torque, flipped shear signs, missed non-zero boundary condition).
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Interactive Tutorial Quests
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                5-minute interactive onboarding walkthrough guiding you through a sample beam bending problem and diagnosing your first breakpoint.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                100% Local JSON Store
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                No third-party trackers or telemetry. All attempts, notes, formulas, and history stay inside <code className="font-mono text-slate-800 dark:text-slate-200">study/data/store.json</code>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          6. SECTION 4: MOBILE COMPANION VIA DISCORD DMS
         =================================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-slate-950 text-white p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Discord DM Companion</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Study Desk on Your Phone via Discord DMs
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                While the dashboard runs on your laptop, the Study Hub Discord bot DMs you at <strong>07:00</strong> and <strong>20:30</strong> Nairobi time and accepts mobile commands (<code className="text-blue-300 font-mono">today</code>, <code className="text-blue-300 font-mono">predict EMM 302</code>, <code className="text-blue-300 font-mono">mark 142.5 MPa</code>, photo uploads of handwritten working, and voice messages for teach-backs).
              </p>
              <div className="pt-2">
                <a
                  href={releaseMeta.exeUrl}
                  download="StudyDesk.exe"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Study Desk &amp; Link Discord</span>
                </a>
              </div>
            </div>

            {/* Right: Phone Terminal Mockup */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-800 bg-[#090d16] p-4 font-mono text-xs space-y-3 shadow-inner">
                <div className="border-b border-slate-800 pb-2 flex justify-between text-[11px] text-slate-400">
                  <span>DISCORD DM · @StudyDeskBot</span>
                  <span className="text-emerald-400">● ONLINE</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                  <span className="text-amber-400 font-semibold">You:</span> mark EMM 318
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-slate-200">
                  <span className="text-emerald-400 font-semibold">StudyDesk:</span> [2023 Exam Q3 · 10m] A solid shaft transmits 30 kW at 600 rpm... Reply with <code className="text-white">mark &lt;ans&gt;</code> or attach photo.
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                  <span className="text-amber-400 font-semibold">You:</span> [Attached working_photo.jpg]
                </div>
                <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/30 text-slate-200">
                  <span className="text-amber-400 font-semibold">StudyDesk:</span> Read final answer 32.3 mm. Steps 1 &amp; 2 held ✓. Step 3 broke on <code className="text-white">units</code>. Reply <code className="text-white">mark broke 3 units</code> to confirm.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          7. SECTION 5: FAQ ACCORDION + SUPPORT EMAIL COPY BOX
         =================================================================== */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/30">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Documentation &amp; Support
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-900 dark:text-white"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 text-slate-400 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Support Copy Box */}
          <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Have Any Other Questions or Need Setup Help?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Reach out in the Engineering Study Hub Discord or email our engineering team directly:
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopySupport}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-semibold transition-all shrink-0 cursor-pointer"
            >
              <span>support@engineeringhub.site</span>
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            </button>
          </div>
        </div>
      </section>

      {/* ===================================================================
          8. FOOTER CTA + LEGAL LINKS
         =================================================================== */}
      <footer className="pt-16 px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Get Started in Under 5 Minutes
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Ready to upgrade your engineering exam prep? Launch the Web Hub or install Study Desk now.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="px-6 py-3 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold text-xs border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 shadow-sm transition-all"
            >
              Web Hub Version
            </Link>
            <a
              href={releaseMeta.exeUrl}
              download="StudyDesk.exe"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs inline-flex items-center gap-2 shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Study Desk (.exe)</span>
            </a>
          </div>

          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:underline">
                Terms of Service
              </Link>
              <Link to="/refund" className="hover:underline">
                Refund Policy
              </Link>
            </div>
            <div>© 2026 Engineering Study Hub (engineeringhub.site)</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const StudyDeskDownloadPage = DownloadPage;
export default DownloadPage;
