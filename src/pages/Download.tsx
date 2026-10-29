import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "@/assets/logo-new.jpeg";
import {
  Download,
  Terminal,
  Cpu,
  ScanLine,
  BookOpenCheck,
  HardDrive,
  ShieldCheck,
  Layers,
  FileCode2,
  CheckCircle2,
  Copy,
  ArrowUpRight,
  Sparkles,
  ExternalLink,
  Laptop,
  CheckSquare,
  Flame,
  ChevronRight,
  Mic,
  FileText,
  Calculator,
  RefreshCw,
  Zap,
  Lock,
  Globe,
  Award,
  Clock,
  Calendar,
  AlertTriangle,
  Github,
  Check,
  Monitor,
  Smartphone,
  ChevronDown,
  Layers2
} from "lucide-react";

const DISCORD_URL = "https://discord.gg/7yUz2rXumm";
const GITHUB_REPO = "https://github.com/kkkkenya/discord-sync-bot";
const CONTACT_EMAIL = "gregorykimemiah@gmail.com";

export const DownloadPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"hero" | "01" | "02" | "03" | "04">("hero");
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const copySampleCommand = () => {
    navigator.clipboard.writeText("/study link");
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const screenshots = {
    hero: "/screenshots/hero-app.png",
    "01": "/screenshots/band-01-today.png",
    "02": "/screenshots/band-02-radar.png",
    "03": "/screenshots/band-03-practise.png",
    "04": "/screenshots/band-04-review.png",
  };

  const faqs = [
    {
      q: "Is Study Desk really free and offline?",
      a: "Yes. Study Desk runs 100% locally on localhost:5190 from your laptop. All your course outlines, past papers, notes, checkpoints, and formula ladders run completely offline without consuming your mobile internet data bundles."
    },
    {
      q: "Do I need administrator privileges on my university laptop?",
      a: "No. Study Desk installs directly to your user profile directory (%LOCALAPPDATA%\\StudyDesk). It does not require administrative UAC passwords, registry edits, or elevated permissions, making it safe for campus laptops."
    },
    {
      q: "How does the Discord Companion pairing work?",
      a: "Join our community Discord and type /study link. The bot returns a single-use onboarding code. During setup.bat, paste that key to pair your desktop runtime with your phone, enabling daily practice questions (+2 attempt, +10 solve, streak roles)."
    },
    {
      q: "What engineering disciplines and universities are supported?",
      a: "EBK-aligned curricula for Mechanical, Civil, Electrical, Mechatronic, and Chemical engineering across Kenyatta University (KU), JKUAT, University of Nairobi (UoN), TUK, DeKUT, and Moi University."
    },
    {
      q: "Can I use my own Gemini or Claude API key?",
      a: "Yes. In Study Desk Settings, you can add your own free Google Gemini API key or Anthropic Claude key. Your API keys are stored strictly on your local disk and are never sent to third-party tracking servers."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#030712] text-[#030712] dark:text-white font-body antialiased selection:bg-[#10b981] selection:text-[#030712]">
      {/* Top Ticker Bar */}
      <div className="w-full bg-[#030712] text-[#10b981] font-mono text-xs uppercase tracking-widest py-1.5 border-b-2 border-[#030712] overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex">
              <span className="mx-4">★ STUDY DESK V2026.10 ACTIVE</span>
              <span className="mx-4">/// RUNS 100% LOCALHOST:5190</span>
              <span className="mx-4">/// ZERO ADMIN PRIVILEGES NEEDED</span>
              <span className="mx-4">/// EBK SYLLABUS GROUNDED</span>
              <span className="mx-4">/// 71 MB STANDALONE BINARY</span>
              <span className="mx-4">/// REAL PAST PAPERS INCLUDED</span>
            </span>
          ))}
        </div>
      </div>

      {/* 1. HEADER (Koodo-Style Navigation) */}
      <nav className="w-full bg-white/95 dark:bg-[#030712]/95 backdrop-blur-md border-b-4 border-[#030712] z-50 sticky top-0 px-4 md:px-8 py-3.5 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoImg} alt="Engineering Study Hub" className="h-9 md:h-10 w-auto border-2 border-[#030712]" />
          <div className="flex flex-col">
            <span className="font-display font-black text-base md:text-lg uppercase leading-none tracking-tight">
              Study Desk<span className="text-[#10b981]">.EXE</span>
            </span>
            <span className="font-mono text-[10px] text-slate-500 uppercase">ENGINEERING STUDY HUB</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-6 font-mono text-xs font-bold uppercase">
          <a href="#overview" className="hover:text-[#10b981] transition-colors">Overview</a>
          <a href="#showcase" className="hover:text-[#10b981] transition-colors">Features</a>
          <a href="#more-features" className="hover:text-[#10b981] transition-colors">Capabilities</a>
          <a href="#matrix" className="hover:text-[#10b981] transition-colors">Downloads</a>
          <a href="#setup" className="hover:text-[#10b981] transition-colors">Setup Guide</a>
          <a href="#faq" className="hover:text-[#10b981] transition-colors">FAQ</a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-[#0f172a] hover:bg-slate-200 dark:hover:bg-[#1e293b] font-mono text-xs font-bold border-2 border-[#030712] shadow-[2px_2px_0px_0px_#030712] transition-all"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <a
            href="/downloads/StudyDesk.exe"
            download
            className="flex items-center gap-2 px-4 py-2 bg-[#10b981] hover:bg-[#059669] text-[#030712] font-mono font-bold text-xs uppercase border-2 border-[#030712] shadow-[3px_3px_0px_0px_#030712] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>Download .EXE</span>
          </a>
        </div>
      </nav>

      {/* 2. HERO SECTION (Koodo-Style with Rotating Accent & Dual CTA) */}
      <section id="overview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-16 pb-12">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* GitHub Star Pill Banner */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f59e0b] text-[#030712] font-mono text-xs font-bold uppercase border-2 border-[#030712] shadow-[3px_3px_0px_0px_#030712]">
            <Terminal className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>OFFICIAL DESKTOP CLIENT // LOCALHOST:5190</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.95]">
            Engineering Study <br className="hidden sm:inline" />
            <span className="text-[#10b981] tracking-wide inline-block">Made Local.</span>
          </h1>

          <p className="font-body text-base sm:text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Flashcards don&apos;t pass engineering exams. Study Desk runs directly on your machine with real past papers, Breakpoint step-by-step diagnostics, and voice teach-back.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <a
              href="/downloads/StudyDesk.exe"
              download
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#10b981] hover:bg-[#059669] text-[#030712] font-display text-lg font-black uppercase tracking-wide border-4 border-[#030712] shadow-[6px_6px_0px_0px_#030712] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#030712] transition-all cursor-pointer"
            >
              <Download className="w-6 h-6 stroke-[2.5]" />
              <span>Download for Windows (.exe)</span>
            </a>

            <a
              href="#setup"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-[#0f172a] text-[#030712] dark:text-white font-mono text-sm font-bold uppercase border-4 border-[#030712] shadow-[6px_6px_0px_0px_#030712] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#030712] transition-all"
            >
              <span>Setup Guide</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* 3. TECHNICAL SPECIFICATION BLOCK (EXACT METRICS AS REQUESTED) */}
          <div className="pt-6">
            <div className="border-4 border-[#030712] bg-white dark:bg-[#090d16] shadow-[6px_6px_0px_0px_#030712] grid grid-cols-2 md:grid-cols-5 divide-y-2 md:divide-y-0 md:divide-x-2 divide-[#030712] text-left">
              <div className="p-4 space-y-1">
                <span className="font-mono text-[10px] text-slate-500 font-bold uppercase block">RELEASE BUILD</span>
                <span className="font-display font-black text-xl text-[#10b981]">Study Desk</span>
                <span className="font-mono text-xs text-slate-600 dark:text-slate-400 block font-bold">v2026.10</span>
              </div>
              <div className="p-4 space-y-1">
                <span className="font-mono text-[10px] text-slate-500 font-bold uppercase block">BINARY SIZE</span>
                <span className="font-display font-black text-xl">71 MB</span>
                <span className="font-mono text-xs text-slate-600 dark:text-slate-400 block">Standalone binary</span>
              </div>
              <div className="p-4 space-y-1">
                <span className="font-mono text-[10px] text-slate-500 font-bold uppercase block">SECURITY &amp; UAC</span>
                <span className="font-display font-black text-xl text-[#f59e0b]">0 Admin</span>
                <span className="font-mono text-xs text-slate-600 dark:text-slate-400 block">Installs to %LOCALAPPDATA%</span>
              </div>
              <div className="p-4 space-y-1">
                <span className="font-mono text-[10px] text-slate-500 font-bold uppercase block">SYLLABUS DATA</span>
                <span className="font-display font-black text-xl text-[#10b981]">100%</span>
                <span className="font-mono text-xs text-slate-600 dark:text-slate-400 block">Offline-first past papers</span>
              </div>
              <div className="p-4 space-y-1 col-span-2 md:col-span-1">
                <span className="font-mono text-[10px] text-slate-500 font-bold uppercase block">LOCAL SERVER</span>
                <span className="font-display font-black text-xl">5190</span>
                <span className="font-mono text-xs text-slate-600 dark:text-slate-400 block">Localhost port</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. HERO APP DEVICE FRAME (KOODO SIGNATURE WITH LIVE PLAYWRIGHT SCREENSHOTS) */}
        <div className="mt-12 md:mt-16 border-4 border-[#030712] bg-[#030712] shadow-[10px_10px_0px_0px_#10b981] overflow-hidden">
          {/* Window Chrome Title Bar */}
          <div className="bg-[#030712] text-white px-4 py-3 flex items-center justify-between border-b-4 border-[#030712]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ef4444] border border-[#030712] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#f59e0b] border border-[#030712] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#10b981] border border-[#030712] inline-block" />
              <span className="ml-3 font-mono text-xs font-bold text-[#10b981] uppercase hidden sm:inline">
                STUDY DESK // RUNTIME LOCALHOST:5190 // ACTUAL APP UI
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
              <span className="text-white font-bold">2X RETINA CAPTURE</span>
            </div>
          </div>

          {/* Workspace Band Selector Tabs */}
          <div className="bg-[#f1f5f9] dark:bg-[#090d16] p-3 sm:px-6 border-b-4 border-[#030712] flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono text-xs font-bold uppercase text-slate-500">
              /// SWITCH SCREEN VIEW:
            </span>
            <div className="flex flex-wrap gap-2 font-mono text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab("hero")}
                className={`px-3 py-1 uppercase border-2 border-[#030712] transition-all cursor-pointer ${
                  activeTab === "hero"
                    ? "bg-[#10b981] text-[#030712] shadow-[2px_2px_0px_0px_#030712] -translate-y-[1px]"
                    : "bg-white dark:bg-[#0f172a] hover:bg-[#f59e0b] hover:text-[#030712]"
                }`}
              >
                [ OVERVIEW ]
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("01")}
                className={`px-3 py-1 uppercase border-2 border-[#030712] transition-all cursor-pointer ${
                  activeTab === "01"
                    ? "bg-[#10b981] text-[#030712] shadow-[2px_2px_0px_0px_#030712] -translate-y-[1px]"
                    : "bg-white dark:bg-[#0f172a] hover:bg-[#f59e0b] hover:text-[#030712]"
                }`}
              >
                [ 01 / TODAY ]
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("02")}
                className={`px-3 py-1 uppercase border-2 border-[#030712] transition-all cursor-pointer ${
                  activeTab === "02"
                    ? "bg-[#10b981] text-[#030712] shadow-[2px_2px_0px_0px_#030712] -translate-y-[1px]"
                    : "bg-white dark:bg-[#0f172a] hover:bg-[#f59e0b] hover:text-[#030712]"
                }`}
              >
                [ 02 / PLAN ]
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("03")}
                className={`px-3 py-1 uppercase border-2 border-[#030712] transition-all cursor-pointer ${
                  activeTab === "03"
                    ? "bg-[#10b981] text-[#030712] shadow-[2px_2px_0px_0px_#030712] -translate-y-[1px]"
                    : "bg-white dark:bg-[#0f172a] hover:bg-[#f59e0b] hover:text-[#030712]"
                }`}
              >
                [ 03 / PRACTISE ]
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("04")}
                className={`px-3 py-1 uppercase border-2 border-[#030712] transition-all cursor-pointer ${
                  activeTab === "04"
                    ? "bg-[#10b981] text-[#030712] shadow-[2px_2px_0px_0px_#030712] -translate-y-[1px]"
                    : "bg-white dark:bg-[#0f172a] hover:bg-[#f59e0b] hover:text-[#030712]"
                }`}
              >
                [ 04 / REVIEW ]
              </button>
            </div>
          </div>

          {/* Real App Screenshot Render Frame */}
          <div className="bg-[#090d16] p-2 sm:p-4">
            <img
              src={screenshots[activeTab]}
              alt={`Study Desk actual UI screenshot - ${activeTab}`}
              className="w-full h-auto border-2 border-[#1e293b] shadow-2xl block transition-all"
            />
          </div>
        </div>
      </section>

      {/* 5. THREE PILLARS (POWER UP YOUR STUDY EXPERIENCE) */}
      <section className="py-16 md:py-20 border-t-4 border-[#030712] bg-white dark:bg-[#030712]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-mono text-xs font-bold uppercase px-3 py-1 bg-[#10b981] text-[#030712] border-2 border-[#030712]">
              /// THREE PILLARS
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight">
              Power Up Your Revision.
            </h2>
            <p className="font-body text-base text-slate-600 dark:text-slate-400">
              Engineered from the ground up for technical undergraduate curricula where flashcards fail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="border-4 border-[#030712] bg-[#f8fafc] dark:bg-[#0f172a] p-8 shadow-[6px_6px_0px_0px_#030712] space-y-4">
              <div className="w-12 h-12 bg-[#10b981] text-[#030712] border-2 border-[#030712] flex items-center justify-center shadow-[3px_3px_0px_0px_#030712]">
                <HardDrive className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="font-display text-2xl font-black uppercase">Local-First Engine</h3>
              <p className="font-body text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Runs 100% on your laptop at <code className="font-bold">localhost:5190</code>. Opens instantly in Edge Application Mode with zero latency and zero data bundle consumption.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="border-4 border-[#030712] bg-[#f8fafc] dark:bg-[#0f172a] p-8 shadow-[6px_6px_0px_0px_#f59e0b] space-y-4">
              <div className="w-12 h-12 bg-[#f59e0b] text-[#030712] border-2 border-[#030712] flex items-center justify-center shadow-[3px_3px_0px_0px_#030712]">
                <Cpu className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="font-display text-2xl font-black uppercase">Past Paper Radar</h3>
              <p className="font-body text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Trained on 10+ years of university examination patterns across KU, JKUAT, UoN, TUK, DeKUT, and Moi. 2.5× lecturer hint weighting highlights what will actually appear.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="border-4 border-[#030712] bg-[#f8fafc] dark:bg-[#0f172a] p-8 shadow-[6px_6px_0px_0px_#10b981] space-y-4">
              <div className="w-12 h-12 bg-[#10b981] text-[#030712] border-2 border-[#030712] flex items-center justify-center shadow-[3px_3px_0px_0px_#030712]">
                <ScanLine className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="font-display text-2xl font-black uppercase">Breakpoint Logic</h3>
              <p className="font-body text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Diagnostic step checkpoints instead of raw solution leaks. Pinpoints whether errors happen in setup, modulus choice, or basic algebra.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. OUR FEATURES (4 LARGE SHOWCASE ROWS WITH ACTUAL APP SCREENSHOTS) */}
      <section id="showcase" className="py-16 md:py-24 border-t-4 border-[#030712] bg-[#f1f5f9] dark:bg-[#090d16] space-y-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-mono text-xs font-bold uppercase px-3 py-1 bg-[#f59e0b] text-[#030712] border-2 border-[#030712]">
              /// PRODUCT SHOWCASE
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight">
              Inside the Real Study Desk.
            </h2>
            <p className="font-body text-base text-slate-600 dark:text-slate-400">
              Screenshots taken directly from the running software runtime on localhost:5190.
            </p>
          </div>

          {/* Row 1: Band 01 / Today (Image Left, Text Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 border-4 border-[#030712] bg-[#030712] shadow-[8px_8px_0px_0px_#10b981] overflow-hidden">
              <img
                src="/screenshots/band-01-today.png"
                alt="Study Desk Band 01 Today Mission actual UI screenshot"
                className="w-full h-auto block"
              />
            </div>
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase px-2.5 py-1 bg-[#10b981] text-[#030712] border border-[#030712]">
                BAND 01 // TODAY&apos;S MISSION
              </div>
              <h3 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight">
                Pass clean with structured daily focus.
              </h3>
              <p className="font-body text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Every morning, Study Desk analyzes your upcoming exam timetable and prepares your daily study mission. Keeps track of your active study streak, weekly study hours, and specific past-paper tasks.
              </p>
              <ul className="space-y-2 font-mono text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-2">✓ Dynamic 1-Week exam mode adjustment</li>
                <li className="flex items-center gap-2">✓ Active 5-day streak keeper telemetry</li>
                <li className="flex items-center gap-2">✓ Direct one-click task jump to Practice band</li>
              </ul>
            </div>
          </div>

          {/* Row 2: Band 02 / Plan (Text Left, Image Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase px-2.5 py-1 bg-[#f59e0b] text-[#030712] border border-[#030712]">
                BAND 02 // EXAM RADAR &amp; MATRIX
              </div>
              <h3 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight">
                Predictive past-paper frequency matrix.
              </h3>
              <p className="font-body text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Aggregates historical questions and marks across past papers. When your lecturer drops a hint, pin it in the matrix to apply a 2.5× weighting multiplier so your revision focuses on what counts.
              </p>
              <ul className="space-y-2 font-mono text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-2">✓ 10-year historical topic occurrence rates</li>
                <li className="flex items-center gap-2">✓ 2.5× lecturer hint weighting multiplier</li>
                <li className="flex items-center gap-2">✓ 1-Page A4 formula triage sheet generation</li>
              </ul>
            </div>
            <div className="lg:col-span-7 border-4 border-[#030712] bg-[#030712] shadow-[8px_8px_0px_0px_#f59e0b] overflow-hidden order-1 lg:order-2">
              <img
                src="/screenshots/band-02-radar.png"
                alt="Study Desk Band 02 Radar actual UI screenshot"
                className="w-full h-auto block"
              />
            </div>
          </div>

          {/* Row 3: Band 03 / Practise (Image Left, Text Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 border-4 border-[#030712] bg-[#030712] shadow-[8px_8px_0px_0px_#10b981] overflow-hidden">
              <img
                src="/screenshots/band-03-practise.png"
                alt="Study Desk Band 03 Practise actual UI screenshot"
                className="w-full h-auto block"
              />
            </div>
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase px-2.5 py-1 bg-[#10b981] text-[#030712] border border-[#030712]">
                BAND 03 // BREAKPOINT CHECKPOINTS
              </div>
              <h3 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight">
                Diagnostic checkpoints, not just answers.
              </h3>
              <p className="font-body text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                When you get an engineering problem wrong, Study Desk doesn&apos;t just spoil the solution. It walks you through intermediate checkpoints (Step 1 Te, Step 2 Zp, Step 3 Diameter) and logs whether the slip was conceptual or algebraic.
              </p>
              <ul className="space-y-2 font-mono text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-2">✓ Accepts any valid SI unit conversion (MPa, Pa, kNm)</li>
                <li className="flex items-center gap-2">✓ Clickable &quot;Broke Here&quot; telemetry tracking</li>
                <li className="flex items-center gap-2">✓ Differentiates Setup vs Modulus vs Sign errors</li>
              </ul>
            </div>
          </div>

          {/* Row 4: Band 04 / Review (Text Left, Image Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase px-2.5 py-1 bg-[#030712] text-[#10b981] border border-[#10b981]">
                BAND 04 // DEEP CONTEXT PACKS
              </div>
              <h3 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight">
                Zero-hallucination AI exam triage.
              </h3>
              <p className="font-body text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                One-click compilation of your syllabus notes, lecturer slides, identified student weakspots, and past-paper diagrams into a structured Markdown prompt pack (~24,500 tokens) ready for Claude or DeepSeek.
              </p>
              <ul className="space-y-2 font-mono text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-2">✓ Grounded in real Kenyan past papers and CATs</li>
                <li className="flex items-center gap-2">✓ One-click clipboard copy for LLM reasoning models</li>
                <li className="flex items-center gap-2">✓ Zero hallucinated references or formulas</li>
              </ul>
            </div>
            <div className="lg:col-span-7 border-4 border-[#030712] bg-[#030712] shadow-[8px_8px_0px_0px_#030712] overflow-hidden order-1 lg:order-2">
              <img
                src="/screenshots/band-04-review.png"
                alt="Study Desk Band 04 Review actual UI screenshot"
                className="w-full h-auto block"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. MORE FEATURES (6 SHORT CARDS MIRRORING KOODO READER) */}
      <section id="more-features" className="py-16 md:py-24 border-t-4 border-[#030712] bg-white dark:bg-[#030712]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-mono text-xs font-bold uppercase px-3 py-1 bg-[#10b981] text-[#030712] border-2 border-[#030712]">
              /// CAPABILITIES
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight">
              More Engineering Tools.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 border-4 border-[#030712] bg-[#f8fafc] dark:bg-[#0f172a] shadow-[4px_4px_0px_0px_#030712] space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#10b981]">
                <Layers className="w-4 h-4" />
                <span>WORKSPACE BAND SWITCHER</span>
              </div>
              <h4 className="font-display text-lg font-black uppercase">4-Band Focused Workflow</h4>
              <p className="font-body text-xs text-slate-600 dark:text-slate-400">
                Eliminates interface clutter by organizing 14 engineering subcomponents into four focused workspaces: Today, Plan, Practise, and Review.
              </p>
            </div>

            <div className="p-6 border-4 border-[#030712] bg-[#f8fafc] dark:bg-[#0f172a] shadow-[4px_4px_0px_0px_#030712] space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#f59e0b]">
                <Calculator className="w-4 h-4" />
                <span>INTERMEDIATE STEP VERIFICATION</span>
              </div>
              <h4 className="font-display text-lg font-black uppercase">Unit-Aware Checker</h4>
              <p className="font-body text-xs text-slate-600 dark:text-slate-400">
                Understands engineering units natively (MPa, GPa, rad, kNm, mm). Detects order-of-magnitude slipups without marking the entire concept wrong.
              </p>
            </div>

            <div className="p-6 border-4 border-[#030712] bg-[#f8fafc] dark:bg-[#0f172a] shadow-[4px_4px_0px_0px_#030712] space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#10b981]">
                <FileText className="w-4 h-4" />
                <span>A4 TRIAGE EXPORTS</span>
              </div>
              <h4 className="font-display text-lg font-black uppercase">1-Page Survival Kit</h4>
              <p className="font-body text-xs text-slate-600 dark:text-slate-400">
                Export worked formula ladders and personal calculation traps into a single printable A4 reference sheet for exam eve.
              </p>
            </div>

            <div className="p-6 border-4 border-[#030712] bg-[#f8fafc] dark:bg-[#0f172a] shadow-[4px_4px_0px_0px_#030712] space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#f59e0b]">
                <Mic className="w-4 h-4" />
                <span>VOICE TEACH-BACK</span>
              </div>
              <h4 className="font-display text-lg font-black uppercase">4-Min Feynman Evaluation</h4>
              <p className="font-body text-xs text-slate-600 dark:text-slate-400">
                Record a quick 4-minute verbal explanation of complex concepts (like epicyclic gear ratios or Macaulay notation) to catch conceptual blind spots.
              </p>
            </div>

            <div className="p-6 border-4 border-[#030712] bg-[#f8fafc] dark:bg-[#0f172a] shadow-[4px_4px_0px_0px_#030712] space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#10b981]">
                <Laptop className="w-4 h-4" />
                <span>CAMPUS LAB PORTABILITY</span>
              </div>
              <h4 className="font-display text-lg font-black uppercase">USB Lab Edition</h4>
              <p className="font-body text-xs text-slate-600 dark:text-slate-400">
                Runs directly from a flash drive in restricted university computer labs where installer execution is blocked.
              </p>
            </div>

            <div className="p-6 border-4 border-[#030712] bg-[#f8fafc] dark:bg-[#0f172a] shadow-[4px_4px_0px_0px_#030712] space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#f59e0b]">
                <Zap className="w-4 h-4" />
                <span>DAILY DRILLS &amp; STREAKS</span>
              </div>
              <h4 className="font-display text-lg font-black uppercase">Discord Companion</h4>
              <p className="font-body text-xs text-slate-600 dark:text-slate-400">
                Pulls daily engineering questions on Discord. Earn +2 pts for attempting, +10 for solving, and unlock 7-day streak roles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CAMPUS LABS & STUDENT MOBILE COMPANION */}
      <section className="py-16 md:py-24 border-t-4 border-[#030712] bg-[#030712] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="font-mono text-xs font-bold uppercase px-3 py-1 bg-[#10b981] text-[#030712] border border-white">
                MOBILE &amp; DISCORD COMPANION
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight leading-tight">
                Study in the lab, <br />
                <span className="text-[#10b981]">review on the bus.</span>
              </h2>
              <p className="font-body text-base text-slate-300 leading-relaxed">
                Study Desk connects your laptop runtime with your Discord phone app. While away from your desk, check your daily mission with <code className="font-bold text-[#10b981]">/study today</code> or attempt the daily practice problem for streak points.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 bg-[#5865F2] hover:bg-[#4752C4] text-white font-mono text-xs font-bold uppercase border-2 border-white shadow-[4px_4px_0px_0px_#ffffff] transition-all"
                >
                  Join Discord Community
                </a>
                <a
                  href="/downloads/StudyDesk.exe"
                  download
                  className="px-6 py-3.5 bg-[#10b981] hover:bg-[#059669] text-[#030712] font-mono text-xs font-bold uppercase border-2 border-white shadow-[4px_4px_0px_0px_#ffffff] transition-all cursor-pointer"
                >
                  Download .EXE (71 MB)
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="border-4 border-white bg-[#090d16] p-6 shadow-[8px_8px_0px_0px_#10b981] font-mono text-xs space-y-4">
                <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                  <span className="text-[#10b981] font-bold">DISCORD BOT // MOBILE COMPANION</span>
                  <span className="text-slate-400">STATUS: READY</span>
                </div>
                <div className="space-y-3">
                  <div className="bg-[#030712] p-3 border border-slate-700">
                    <span className="text-[#f59e0b] font-bold">&gt; /study today</span>
                    <p className="text-slate-300 mt-1">EMM 302 in 6 days. Target: 2024 CAT 2 Question 3 (Torsion of thin-walled tubes). 5-day streak active.</p>
                  </div>
                  <div className="bg-[#030712] p-3 border border-slate-700">
                    <span className="text-[#10b981] font-bold">&gt; Daily Problem Solve (+10 pts)</span>
                    <p className="text-slate-300 mt-1">Guest-Tresca equivalent torque verified: Te = 7.99 kNm. Diameter d = 81.6 mm. Streak Keeper role preserved!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. DISTRIBUTION PACKAGES MATRIX */}
      <section id="matrix" className="py-16 md:py-24 border-t-4 border-[#030712] bg-white dark:bg-[#030712]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-mono text-xs font-bold uppercase px-3 py-1 bg-[#10b981] text-[#030712] border-2 border-[#030712]">
              /// DISTRIBUTION PACKAGES
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight">
              Choose Your Deployment.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Package 1 */}
            <div className="border-4 border-[#030712] bg-[#f8fafc] dark:bg-[#0f172a] shadow-[8px_8px_0px_0px_#10b981] flex flex-col justify-between p-6 sm:p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase px-2.5 py-1 bg-[#10b981] text-[#030712] border-2 border-[#030712]">
                    RECOMMENDED
                  </span>
                  <HardDrive className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="font-display text-2xl font-black uppercase">Windows Installer (.EXE)</h3>
                <p className="font-body text-sm text-slate-700 dark:text-slate-300">
                  The complete 71 MB binary installer. Self-extracts to <code className="font-bold">%LOCALAPPDATA%\StudyDesk</code> and sets up Edge Application Mode.
                </p>
                <ul className="space-y-2 font-mono text-xs">
                  <li className="flex items-center gap-2">✓ Zero admin rights needed</li>
                  <li className="flex items-center gap-2">✓ Desktop shortcut creation</li>
                  <li className="flex items-center gap-2">✓ Local database in <code className="font-bold">study\data</code></li>
                  <li className="flex items-center gap-2">✓ Full offline past papers</li>
                </ul>
              </div>
              <a
                href="/downloads/StudyDesk.exe"
                download
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#10b981] hover:bg-[#059669] text-[#030712] font-display text-base font-black uppercase tracking-wide border-4 border-[#030712] shadow-[4px_4px_0px_0px_#030712] transition-all cursor-pointer"
              >
                <Download className="w-5 h-5 stroke-[2.5]" />
                <span>Download StudyDesk.exe</span>
              </a>
            </div>

            {/* Package 2 */}
            <div className="border-4 border-[#030712] bg-[#f8fafc] dark:bg-[#0f172a] shadow-[8px_8px_0px_0px_#f59e0b] flex flex-col justify-between p-6 sm:p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase px-2.5 py-1 bg-[#f59e0b] text-[#030712] border-2 border-[#030712]">
                    CAMPUS LAB EDITION
                  </span>
                  <Laptop className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="font-display text-2xl font-black uppercase">Portable USB Archive</h3>
                <p className="font-body text-sm text-slate-700 dark:text-slate-300">
                  Designed for university computer lab workstations where executing setup installers is restricted. Runs directly from any USB flash drive.
                </p>
                <ul className="space-y-2 font-mono text-xs">
                  <li className="flex items-center gap-2">✓ No installation required</li>
                  <li className="flex items-center gap-2">✓ Run directly from USB drive</li>
                  <li className="flex items-center gap-2">✓ Double-click <code className="font-bold">start.bat</code> to launch</li>
                  <li className="flex items-center gap-2">✓ Safe for campus lab sessions</li>
                </ul>
              </div>
              <a
                href="/downloads/StudyDesk.exe"
                download
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#f59e0b] hover:bg-[#d97706] text-[#030712] font-display text-base font-black uppercase tracking-wide border-4 border-[#030712] shadow-[4px_4px_0px_0px_#030712] transition-all cursor-pointer"
              >
                <Download className="w-5 h-5 stroke-[2.5]" />
                <span>Download Portable ZIP</span>
              </a>
            </div>

            {/* Package 3 */}
            <div className="border-4 border-[#030712] bg-[#f8fafc] dark:bg-[#0f172a] shadow-[8px_8px_0px_0px_#030712] flex flex-col justify-between p-6 sm:p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase px-2.5 py-1 bg-[#030712] text-white border-2 border-[#030712]">
                    MOBILE SYNC
                  </span>
                  <Zap className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="font-display text-2xl font-black uppercase">Discord Bot Companion</h3>
                <p className="font-body text-sm text-slate-700 dark:text-slate-300">
                  Take your study queue on the go. Interact with your running desktop Study Desk via Discord slash commands and complete daily problems.
                </p>
                <ul className="space-y-2 font-mono text-xs">
                  <li className="flex items-center gap-2">✓ <code className="font-bold">/study today</code> (morning plan)</li>
                  <li className="flex items-center gap-2">✓ <code className="font-bold">/study mark</code> (photo check)</li>
                  <li className="flex items-center gap-2">✓ <code className="font-bold">/study teach</code> (voice score)</li>
                  <li className="flex items-center gap-2">✓ Daily drills (+2 attempt, +10 solve)</li>
                </ul>
              </div>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#030712] text-white font-display text-base font-black uppercase tracking-wide border-4 border-[#030712] shadow-[4px_4px_0px_0px_#10b981] transition-all"
              >
                <span>Join Discord Community</span>
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 10. 3-STEP QUICK-START SETUP GUIDE */}
      <section id="setup" className="py-16 md:py-24 border-t-4 border-[#030712] bg-[#f8fafc] dark:bg-[#090d16]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="font-mono text-xs font-bold uppercase px-3 py-1 bg-[#f59e0b] text-[#030712] border-2 border-[#030712]">
              /// FIRST-TIME INITIALIZATION
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight">
              Get Started in 3 Steps.
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-white dark:bg-[#0f172a] border-4 border-[#030712] shadow-[6px_6px_0px_0px_#030712] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <span className="font-mono font-black text-3xl text-[#10b981] border-2 border-[#030712] px-3 py-1 bg-[#030712]">
                  01
                </span>
                <div>
                  <h3 className="font-display text-xl font-black uppercase">Download &amp; Extract StudyDesk.exe</h3>
                  <p className="font-body text-sm text-slate-600 dark:text-slate-300">
                    Double-click the binary. It self-extracts automatically to <code className="font-bold">%LOCALAPPDATA%\StudyDesk</code> without admin permissions.
                  </p>
                </div>
              </div>
              <a
                href="/downloads/StudyDesk.exe"
                download
                className="px-5 py-2.5 bg-[#10b981] text-[#030712] font-mono font-bold text-xs uppercase border-2 border-[#030712] whitespace-nowrap cursor-pointer"
              >
                Download (.exe)
              </a>
            </div>

            <div className="p-6 bg-white dark:bg-[#0f172a] border-4 border-[#030712] shadow-[6px_6px_0px_0px_#030712] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <span className="font-mono font-black text-3xl text-[#f59e0b] border-2 border-[#030712] px-3 py-1 bg-[#030712]">
                  02
                </span>
                <div>
                  <h3 className="font-display text-xl font-black uppercase">Get Your Key in Discord</h3>
                  <p className="font-body text-sm text-slate-600 dark:text-slate-300">
                    Open Discord and run <code className="font-bold bg-[#f59e0b] text-[#030712] px-1">/study link</code>. The bot returns your private onboarding code (e.g. <code className="font-bold">SD-7K2M-9QXA</code>).
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={copySampleCommand}
                className="px-4 py-2.5 bg-[#030712] text-[#10b981] font-mono font-bold text-xs uppercase border-2 border-[#030712] flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedKey ? "Copied /study link!" : "Copy /study link"}</span>
              </button>
            </div>

            <div className="p-6 bg-white dark:bg-[#0f172a] border-4 border-[#030712] shadow-[6px_6px_0px_0px_#030712] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <span className="font-mono font-black text-3xl text-[#10b981] border-2 border-[#030712] px-3 py-1 bg-[#030712]">
                  03
                </span>
                <div>
                  <h3 className="font-display text-xl font-black uppercase">Run setup.bat &amp; Study</h3>
                  <p className="font-body text-sm text-slate-600 dark:text-slate-300">
                    Paste your code, select your units, and Study Desk opens in Edge App mode at <code className="font-bold">localhost:5190</code>.
                  </p>
                </div>
              </div>
              <div className="px-4 py-2 bg-[#f8fafc] dark:bg-[#030712] border-2 border-[#030712] font-mono text-xs font-bold text-[#10b981]">
                PORT: 5190
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ ACCORDION (KOODO READER 5-QUESTION ARCHITECTURE) */}
      <section id="faq" className="py-16 md:py-24 border-t-4 border-[#030712] bg-white dark:bg-[#030712]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <span className="font-mono text-xs font-bold uppercase px-3 py-1 bg-[#10b981] text-[#030712] border-2 border-[#030712]">
              /// FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight">
              Got Questions?
            </h2>
          </div>

          <div className="border-4 border-[#030712] bg-[#f8fafc] dark:bg-[#0f172a] shadow-[6px_6px_0px_0px_#030712] divide-y-2 divide-[#030712]">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="p-5 space-y-2">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left font-display text-lg font-black uppercase tracking-tight cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <p className="font-body text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 12. CONTACT SECTION WITH COPY EMAIL */}
      <section className="py-16 border-t-4 border-[#030712] bg-[#f1f5f9] dark:bg-[#090d16] text-center">
        <div className="max-w-xl mx-auto px-4 space-y-4">
          <h3 className="font-display text-2xl font-black uppercase">Need support or syllabus help?</h3>
          <p className="font-body text-sm text-slate-600 dark:text-slate-400">
            Reach out directly to the Engineering Study Hub maintenance team.
          </p>
          <div className="flex items-center justify-center gap-3">
            <span className="font-mono font-bold text-sm bg-white dark:bg-[#030712] px-4 py-2 border-2 border-[#030712]">
              {CONTACT_EMAIL}
            </span>
            <button
              type="button"
              onClick={copyEmail}
              className="px-4 py-2 bg-[#10b981] hover:bg-[#059669] text-[#030712] font-mono text-xs font-bold uppercase border-2 border-[#030712] cursor-pointer"
            >
              {copiedEmail ? "Copied!" : "Copy Email"}
            </button>
          </div>
        </div>
      </section>

      {/* 13. FINAL CTA BAND & FOOTER */}
      <footer className="border-t-4 border-[#030712] bg-[#030712] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs font-bold uppercase">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Engineering Study Hub" className="h-8 w-auto border border-white" />
            <span>STUDY DESK // V2026.10 // 100% OFFLINE-FIRST // NAIROBI, KENYA</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-[#10b981] transition-colors">Home</Link>
            <a href={GITHUB_REPO} target="_blank" rel="noreferrer" className="hover:text-[#10b981] transition-colors">GitHub</a>
            <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="hover:text-[#10b981] transition-colors">Discord</a>
          </div>

          <a
            href="/downloads/StudyDesk.exe"
            download
            className="px-4 py-2 bg-[#10b981] text-[#030712] font-mono font-bold uppercase border border-white cursor-pointer"
          >
            Download .exe (71 MB)
          </a>
        </div>
      </footer>
    </div>
  );
};

export default DownloadPage;
