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
  AlertTriangle
} from "lucide-react";

const DISCORD_URL = "https://discord.gg/7yUz2rXumm";
const WHATSAPP_URL = "https://wa.me/254745947704";

export const DownloadPage: React.FC = () => {
  const [activeBand, setActiveBand] = useState<"01" | "02" | "03" | "04">("03");
  const [copiedKey, setCopiedKey] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("142.5 MPa");
  const [demoBrokenStep, setDemoBrokenStep] = useState<number | null>(2);

  const copySampleCommand = () => {
    navigator.clipboard.writeText("/study link");
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#030712] text-[#030712] dark:text-white font-body antialiased selection:bg-[#10b981] selection:text-[#030712]">
      {/* Top Ticker */}
      <div className="w-full bg-[#030712] text-[#10b981] font-mono text-xs uppercase tracking-widest py-1.5 border-b-2 border-[#030712] overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex">
              <span className="mx-4">★ STUDY DESK V2026.10 ACTIVE</span>
              <span className="mx-4">/// RUNS 100% LOCALHOST:5190</span>
              <span className="mx-4">/// ZERO ADMIN PRIVILEGES NEEDED</span>
              <span className="mx-4">/// EBK SYLLABUS GROUNDED</span>
              <span className="mx-4">/// UPDATED WORKSPACE BAND SELECTOR</span>
            </span>
          ))}
        </div>
      </div>

      {/* Nav */}
      <nav className="w-full bg-white/90 dark:bg-[#030712]/90 backdrop-blur-md border-b-4 border-[#030712] z-40 px-4 md:px-8 py-3.5 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoImg} alt="Engineering Study Hub" className="h-9 md:h-11 w-auto border-2 border-[#030712]" />
          <div className="flex flex-col">
            <span className="font-display font-black text-base md:text-lg uppercase leading-none tracking-tight">
              Study Desk<span className="text-[#10b981]">.EXE</span>
            </span>
            <span className="font-mono text-[10px] text-slate-500 uppercase">ENGINEERING STUDY HUB</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6 font-mono text-xs font-bold uppercase">
          <Link to="/" className="hover:text-[#10b981] transition-colors">Home</Link>
          <Link to="/projects" className="hover:text-[#10b981] transition-colors">Projects</Link>
          <Link to="/tools" className="hover:text-[#10b981] transition-colors">Tools</Link>
          <Link to="/jobs" className="hover:text-[#10b981] transition-colors">Jobs</Link>
          <a href="#features" className="hover:text-[#10b981] transition-colors">Features</a>
          <a href="#matrix" className="hover:text-[#10b981] transition-colors">Downloads</a>
          <a href="#setup" className="hover:text-[#10b981] transition-colors">Setup Guide</a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/downloads/StudyDesk.exe"
            download
            className="flex items-center gap-2 px-4 py-2 bg-[#10b981] hover:bg-[#059669] text-[#030712] font-mono font-bold text-xs uppercase border-2 border-[#030712] shadow-[3px_3px_0px_0px_#030712] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">Download (.exe)</span>
            <span className="sm:hidden">.EXE</span>
          </a>
        </div>
      </nav>

      {/* HERO SECTION (KOODO-READER STYLE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-16 pb-12">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f59e0b] text-[#030712] font-mono text-xs font-bold uppercase border-2 border-[#030712] shadow-[3px_3px_0px_0px_#030712]">
            <Terminal className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>OFFICIAL DESKTOP CLIENT // LOCALHOST:5190</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.95]">
            The Local-First Engineering Study Engine.
          </h1>

          <p className="font-body text-base sm:text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Flashcards don&apos;t pass engineering exams. Study Desk runs directly on your machine with real past papers, Breakpoint step-by-step diagnostics, and voice teach-back.
          </p>

          {/* Primary CTA Buttons */}
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
              <span>Quick-Start Guide</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Platform Spec Readout */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 font-mono text-xs text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5 font-bold text-[#030712] dark:text-white">
              <Laptop className="w-4 h-4 text-[#10b981]" />
              Windows 10 / 11 (64-bit)
            </span>
            <span>•</span>
            <span className="font-bold text-[#030712] dark:text-white">71 MB Self-Extracting</span>
            <span>•</span>
            <span className="text-[#f59e0b] font-black uppercase">Zero Admin Rights Needed</span>
            <span>•</span>
            <span>Localhost:5190</span>
          </div>
        </div>

        {/* INTERACTIVE SOFTWARE WINDOW FRAME (KOODO SIGNATURE MOCKUP) */}
        <div className="mt-12 md:mt-16 border-4 border-[#030712] bg-[#030712] shadow-[10px_10px_0px_0px_#10b981] overflow-hidden">
          {/* Window Chrome Title Bar */}
          <div className="bg-[#030712] text-white px-4 py-3 flex items-center justify-between border-b-4 border-[#030712]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ef4444] border border-[#030712] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#f59e0b] border border-[#030712] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#10b981] border border-[#030712] inline-block" />
              <span className="ml-3 font-mono text-xs font-bold text-[#10b981] uppercase hidden sm:inline">
                STUDY DESK // LOCAL HOST RUNTIME // PORT 5190
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
              <span className="text-white font-bold">LIVE SYNCED</span>
            </div>
          </div>

          {/* Interactive Workspace Band Selector Bar (Reflecting Updated UI) */}
          <div className="bg-[#f1f5f9] dark:bg-[#090d16] p-3 sm:px-6 border-b-4 border-[#030712] flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono text-xs font-bold uppercase text-slate-500">
              /// WORKSPACE BAND FILTER:
            </span>
            <div className="flex flex-wrap gap-2 font-mono text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveBand("01")}
                className={`px-3 py-1 uppercase border-2 border-[#030712] transition-all cursor-pointer ${
                  activeBand === "01"
                    ? "bg-[#10b981] text-[#030712] shadow-[2px_2px_0px_0px_#030712] -translate-y-[1px]"
                    : "bg-white dark:bg-[#0f172a] hover:bg-[#f59e0b] hover:text-[#030712]"
                }`}
              >
                [ 01 / TODAY ]
              </button>
              <button
                type="button"
                onClick={() => setActiveBand("02")}
                className={`px-3 py-1 uppercase border-2 border-[#030712] transition-all cursor-pointer ${
                  activeBand === "02"
                    ? "bg-[#10b981] text-[#030712] shadow-[2px_2px_0px_0px_#030712] -translate-y-[1px]"
                    : "bg-white dark:bg-[#0f172a] hover:bg-[#f59e0b] hover:text-[#030712]"
                }`}
              >
                [ 02 / PLAN ]
              </button>
              <button
                type="button"
                onClick={() => setActiveBand("03")}
                className={`px-3 py-1 uppercase border-2 border-[#030712] transition-all cursor-pointer ${
                  activeBand === "03"
                    ? "bg-[#10b981] text-[#030712] shadow-[2px_2px_0px_0px_#030712] -translate-y-[1px]"
                    : "bg-white dark:bg-[#0f172a] hover:bg-[#f59e0b] hover:text-[#030712]"
                }`}
              >
                [ 03 / PRACTISE ]
              </button>
              <button
                type="button"
                onClick={() => setActiveBand("04")}
                className={`px-3 py-1 uppercase border-2 border-[#030712] transition-all cursor-pointer ${
                  activeBand === "04"
                    ? "bg-[#10b981] text-[#030712] shadow-[2px_2px_0px_0px_#030712] -translate-y-[1px]"
                    : "bg-white dark:bg-[#0f172a] hover:bg-[#f59e0b] hover:text-[#030712]"
                }`}
              >
                [ 04 / REVIEW ]
              </button>
            </div>
          </div>

          {/* Window Body Screen Switcher (1:1 with Updated Study Desk) */}
          <div className="bg-[#f8fafc] dark:bg-[#0f172a] text-[#030712] dark:text-white p-5 sm:p-8 min-h-[440px]">
            {/* Screen 01: Band 01 / Today */}
            {activeBand === "01" && (
              <div className="space-y-6 animate-in fade-in-50 duration-300">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-slate-300 dark:border-slate-700 pb-3 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-[#030712] text-[#10b981] font-bold">BAND 01 // TODAY&apos;S MISSION</span>
                    <span className="text-slate-500 font-bold">STAGE: 1-WEEK MODE (KU EXAM TIMETABLE)</span>
                  </div>
                  <span className="px-2 py-0.5 bg-[#f59e0b] text-[#030712] font-black uppercase">
                    🔥 5-DAY STUDY STREAK
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Hero Card */}
                  <div className="md:col-span-5 p-5 bg-white dark:bg-[#030712] border-4 border-[#030712] shadow-[4px_4px_0px_0px_#030712] space-y-3">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#10b981] text-[#030712] inline-block border border-[#030712]">
                      [ 01 / TODAY ]
                    </span>
                    <h3 className="font-display text-2xl font-black uppercase">
                      Study Smarter, <br /><span className="text-[#10b981]">Pass Clean.</span>
                    </h3>
                    <p className="font-body text-xs text-slate-600 dark:text-slate-400">
                      Next exam: <strong>EMM 302 (Solid Mechanics II)</strong> in 6 days. Your weakest link is currently execution units in combined loading.
                    </p>
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between font-mono text-xs">
                      <span>HOURS THIS WEEK:</span>
                      <strong className="text-[#10b981]">14.5 HRS</strong>
                    </div>
                  </div>

                  {/* Today's Tasks */}
                  <div className="md:col-span-7 space-y-3">
                    <span className="font-mono text-xs font-bold uppercase text-slate-500 block">
                      SCHEDULED TASKS FOR TODAY:
                    </span>

                    <div className="p-3.5 bg-white dark:bg-[#030712] border-2 border-[#030712] flex items-center justify-between font-mono text-xs shadow-[2px_2px_0px_0px_#030712]">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-[#10b981]" />
                          <strong className="text-sm">EMM 302: Check answer on 2024 CAT 2</strong>
                        </div>
                        <p className="text-slate-500 mt-0.5">Torsion of thin-walled tubes &amp; shear flow</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveBand("03")}
                        className="px-3 py-1.5 bg-[#10b981] text-[#030712] font-black uppercase border border-[#030712] cursor-pointer"
                      >
                        Start →
                      </button>
                    </div>

                    <div className="p-3.5 bg-white dark:bg-[#030712] border-2 border-[#030712] flex items-center justify-between font-mono text-xs shadow-[2px_2px_0px_0px_#030712]">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-[#f59e0b]" />
                          <strong className="text-sm">EMM 318: 4-min voice teach-back</strong>
                        </div>
                        <p className="text-slate-500 mt-0.5">Explain epicyclic gear trains and velocity ratios</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveBand("03")}
                        className="px-3 py-1.5 bg-[#f59e0b] text-[#030712] font-black uppercase border border-[#030712] cursor-pointer"
                      >
                        Record →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Screen 02: Band 02 / Plan */}
            {activeBand === "02" && (
              <div className="space-y-6 animate-in fade-in-50 duration-300">
                <div className="flex items-center justify-between border-b-2 border-slate-300 dark:border-slate-700 pb-3 font-mono text-xs">
                  <span className="font-bold uppercase text-[#10b981]">BAND 02 // EXAM RADAR &amp; PREDICTION MATRIX</span>
                  <span className="font-bold">2.5X LECTURER HINT WEIGHTING APPLIED</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white dark:bg-[#030712] border-2 border-[#030712] space-y-2 shadow-[3px_3px_0px_0px_#030712]">
                    <span className="px-2 py-0.5 bg-[#f59e0b] text-[#030712] font-mono text-[10px] font-black uppercase">
                      RANK #1 // 2.5X PINNED
                    </span>
                    <h4 className="font-display font-black text-lg uppercase">Mohr&apos;s Stress Circle &amp; Rosettes</h4>
                    <p className="font-mono text-xs text-slate-500">Historical frequency: 92% • Weight: 25 marks</p>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 mt-2">
                      <div className="bg-[#10b981] h-2 w-[92%]" />
                    </div>
                  </div>

                  <div className="p-4 bg-white dark:bg-[#030712] border-2 border-[#030712] space-y-2 shadow-[3px_3px_0px_0px_#030712]">
                    <span className="px-2 py-0.5 bg-[#030712] text-[#10b981] font-mono text-[10px] font-black uppercase">
                      RANK #2 // CRITICAL
                    </span>
                    <h4 className="font-display font-black text-lg uppercase">Combined Torsion &amp; Bending (Shafts)</h4>
                    <p className="font-mono text-xs text-slate-500">Historical frequency: 80% • Weight: 15 marks</p>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 mt-2">
                      <div className="bg-[#10b981] h-2 w-[80%]" />
                    </div>
                  </div>

                  <div className="p-4 bg-white dark:bg-[#030712] border-2 border-[#030712] space-y-2 shadow-[3px_3px_0px_0px_#030712]">
                    <span className="px-2 py-0.5 bg-slate-200 text-slate-800 font-mono text-[10px] font-black uppercase">
                      RANK #3 // 1-WEEK
                    </span>
                    <h4 className="font-display font-black text-lg uppercase">Deflection of Beams (Macaulay)</h4>
                    <p className="font-mono text-xs text-slate-500">Historical frequency: 65% • Weight: 15 marks</p>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 mt-2">
                      <div className="bg-[#f59e0b] h-2 w-[65%]" />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-[#030712] border-2 border-[#030712] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-display text-base font-black uppercase">Need the printable 1-page A4 survival kit?</h4>
                    <p className="font-mono text-xs text-slate-500">Auto-generates worked formula ladders for exam-eve triage.</p>
                  </div>
                  <button type="button" className="px-4 py-2 bg-[#10b981] text-[#030712] font-mono text-xs font-black uppercase border-2 border-[#030712]">
                    Export 1-Page A4 Sheet
                  </button>
                </div>
              </div>
            )}

            {/* Screen 03: Band 03 / Practise (Flagship Breakpoint Checkpoints) */}
            {activeBand === "03" && (
              <div className="space-y-6 animate-in fade-in-50 duration-300">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-slate-300 dark:border-slate-700 pb-3 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#030712] text-[#10b981] font-bold">EMM 302 // SOLID MECHANICS</span>
                    <span className="text-slate-500 font-bold">KU CAT 2 PAST QUESTION (2025)</span>
                  </div>
                  <span className="px-2 py-0.5 bg-[#f59e0b] text-[#030712] font-black uppercase">
                    QUESTION WEIGHT: 15 MARKS
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-xl sm:text-2xl font-black uppercase">
                    Solid circular shaft subjected to combined bending moment M = 4.2 kNm and torque T = 6.8 kNm.
                  </h3>
                  <p className="font-body text-sm text-slate-700 dark:text-slate-300">
                    If the allowable shear stress for the steel is <code className="font-mono font-bold">75 MPa</code>, calculate the minimum permissible diameter <code className="font-mono font-bold">d</code> under Guest-Tresca maximum shear stress theory.
                  </p>
                </div>

                {/* Input & Unit Evaluator Strip */}
                <div className="p-4 bg-white dark:bg-[#030712] border-2 border-[#030712] space-y-3 font-mono text-xs shadow-[2px_2px_0px_0px_#030712]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="font-bold text-slate-500">YOUR ANSWER (ANY VALID SI UNIT):</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={selectedAnswer}
                        onChange={(e) => setSelectedAnswer(e.target.value)}
                        className="px-3 py-1.5 border-2 border-[#030712] bg-[#f8fafc] dark:bg-[#090d16] font-mono text-xs font-bold"
                      />
                      <button
                        type="button"
                        className="px-4 py-1.5 bg-[#10b981] text-[#030712] font-black uppercase border border-[#030712]"
                      >
                        Check
                      </button>
                    </div>
                  </div>
                </div>

                {/* Numbered Step Checkpoints */}
                <div className="space-y-3">
                  <span className="font-mono text-xs font-bold uppercase text-slate-500 block">
                    STEP-BY-STEP CHECKPOINT BREAKDOWN:
                  </span>

                  <div className="grid grid-cols-1 gap-2.5">
                    <div className="p-3 border-2 border-[#10b981] bg-[#10b981]/10 flex items-center justify-between font-mono text-xs">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0" />
                        <span><strong>STEP 1:</strong> Equivalent torque calculation: <code className="font-bold">Te = √(M² + T²) = 7.99 kNm</code></span>
                      </div>
                      <span className="text-[#10b981] font-bold">PASSED</span>
                    </div>

                    <div className={`p-3 border-2 ${demoBrokenStep === 2 ? "border-[#ef4444] bg-[#fee2e2] dark:bg-[#3b1219]" : "border-[#030712] bg-white dark:bg-[#030712]"} flex items-center justify-between font-mono text-xs`}>
                      <div className="flex items-center gap-3">
                        <span className="w-4 h-4 bg-[#ef4444] text-white flex items-center justify-center font-bold text-[10px]">!</span>
                        <span><strong>STEP 2:</strong> Torsional section modulus: <code className="font-bold">Zp = (π · d³) / 16</code></span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setDemoBrokenStep(demoBrokenStep === 2 ? null : 2)}
                        className="px-2.5 py-1 bg-[#ef4444] text-white font-bold uppercase text-[10px] cursor-pointer"
                      >
                        {demoBrokenStep === 2 ? "BROKE HERE (LOGGED)" : "BROKE HERE"}
                      </button>
                    </div>

                    <div className="p-3 border-2 border-slate-300 dark:border-slate-800 opacity-60 flex items-center justify-between font-mono text-xs">
                      <div className="flex items-center gap-3">
                        <span className="w-4 h-4 bg-slate-300 text-slate-700 flex items-center justify-center font-bold text-[10px]">3</span>
                        <span><strong>STEP 3:</strong> Final diameter calculation: <code className="font-bold">d ≥ 81.6 mm</code></span>
                      </div>
                      <span className="text-slate-500 font-bold">UNREACHED</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 border-2 border-[#f59e0b] bg-[#f59e0b]/10 font-mono text-xs flex items-center justify-between">
                  <span className="font-bold text-[#f59e0b]">DIAGNOSTIC TELEMETRY:</span>
                  <span>Weakness logged: <strong className="underline">HOW (Setup &amp; Modulus Selection)</strong></span>
                </div>
              </div>
            )}

            {/* Screen 04: Band 04 / Review */}
            {activeBand === "04" && (
              <div className="space-y-4 animate-in fade-in-50 duration-300">
                <div className="flex items-center justify-between border-b-2 border-slate-300 dark:border-slate-700 pb-2 font-mono text-xs">
                  <span className="font-bold uppercase text-[#10b981]">BAND 04 // DEEP CONTEXT PACK BUILDER</span>
                  <span className="font-bold text-slate-500">EST. TOKEN BUDGET: ~24,500 TOKENS</span>
                </div>

                <div className="bg-[#030712] text-[#10b981] p-4 border-2 border-[#030712] font-mono text-xs space-y-2 overflow-x-auto max-h-[260px]">
                  <p className="text-white"># UNIT: EMM 302 // TOPIC: TORSION OF THIN-WALLED TUBES</p>
                  <p className="text-slate-400">## SYNCED NOTES &amp; LECTURER SLIDES (2025 SEMESTER 1)</p>
                  <p className="text-slate-400">- Bredt-Batho shear flow equation q = T / (2*Am)</p>
                  <p className="text-slate-400">- Angle of twist per unit length θ = (T*S) / (4*Am²*G*t)</p>
                  <p className="text-white">## WEAKSPOTS IDENTIFIED</p>
                  <p className="text-[#f59e0b]">- Frequent failure calculating enclosed area Am for non-circular cross-sections.</p>
                  <p className="text-white">## 3 PAST-PAPER QUESTIONS ATTACHED</p>
                  <p className="text-slate-400">- KU 2024 Question 3 (12 marks)</p>
                  <p className="text-slate-400">- JKUAT 2023 Equivalent Question 4 (15 marks)</p>
                </div>

                <div className="flex justify-between items-center font-mono text-xs">
                  <span className="text-slate-500">One-click copy for Claude 3.7 Sonnet / DeepSeek R1</span>
                  <button type="button" className="px-4 py-2 bg-[#10b981] text-[#030712] font-bold uppercase border-2 border-[#030712]">
                    Copy Full Pack
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CORE FEATURES SHOWCASE & UI SCREENSHOTS */}
      <section id="features" className="py-16 md:py-24 border-t-4 border-[#030712] bg-[#f1f5f9] dark:bg-[#090d16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-mono text-xs font-bold uppercase px-3 py-1 bg-[#f59e0b] text-[#030712] border-2 border-[#030712]">
              /// ARCHITECTURE &amp; WORKSPACE CAPABILITIES
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight">
              Inside the Updated Study Desk UI.
            </h2>
            <p className="font-body text-base text-slate-600 dark:text-slate-400">
              Built specifically for engineering undergraduates facing EBK-accredited curricula. Every pixel serves deliberate, high-retention exam prep.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="border-4 border-[#030712] bg-white dark:bg-[#030712] p-6 space-y-4 shadow-[6px_6px_0px_0px_#030712]">
              <div className="flex items-center justify-between border-b-2 border-slate-200 dark:border-slate-800 pb-3">
                <span className="font-mono text-xs font-bold uppercase px-2 py-0.5 bg-[#10b981] text-[#030712]">
                  UI WORKSPACE FILTER
                </span>
                <span className="font-mono text-xs text-slate-500 font-bold">BAND SELECTOR</span>
              </div>
              <h3 className="font-display text-xl font-black uppercase">
                4-Band Focused Workflow (Zero Clutter)
              </h3>
              <p className="font-body text-sm text-slate-600 dark:text-slate-400">
                Instead of overwhelming students with 14 components at once, Study Desk groups operations into four distinct bands: Today&apos;s Mission, Exam Radar, Practice Breakpoints, and Deep Markdown Review.
              </p>
              <div className="p-3 bg-[#030712] text-[#10b981] font-mono text-xs space-y-1 border-2 border-[#030712]">
                <div className="text-white font-bold">WORKSPACE BAND SELECTOR:</div>
                <div className="flex flex-wrap gap-1.5 pt-1 text-[11px]">
                  <span className="px-2 py-0.5 bg-[#10b981] text-[#030712] font-bold">[ 01 / TODAY ]</span>
                  <span className="px-2 py-0.5 bg-slate-800 text-white">[ 02 / PLAN ]</span>
                  <span className="px-2 py-0.5 bg-slate-800 text-white">[ 03 / PRACTISE ]</span>
                  <span className="px-2 py-0.5 bg-slate-800 text-white">[ 04 / REVIEW ]</span>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="border-4 border-[#030712] bg-white dark:bg-[#030712] p-6 space-y-4 shadow-[6px_6px_0px_0px_#030712]">
              <div className="flex items-center justify-between border-b-2 border-slate-200 dark:border-slate-800 pb-3">
                <span className="font-mono text-xs font-bold uppercase px-2 py-0.5 bg-[#f59e0b] text-[#030712]">
                  DIAGNOSTIC ENGINE
                </span>
                <span className="font-mono text-xs text-slate-500 font-bold">STEP-BY-STEP</span>
              </div>
              <h3 className="font-display text-xl font-black uppercase">
                Breakpoint Diagnostic Checkpoints
              </h3>
              <p className="font-body text-sm text-slate-600 dark:text-slate-400">
                When you get an answer wrong, Study Desk doesn&apos;t just reveal the solution. It walks through intermediate steps and logs whether the slip occurred in Setup (Why), Modulus (How), or Algebra (Arithmetic).
              </p>
              <div className="p-3 bg-[#f8fafc] dark:bg-[#0f172a] border-2 border-[#030712] font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-[#10b981]">
                  <span>✓ STEP 1: Te = √(M² + T²)</span>
                  <span className="font-bold">PASSED</span>
                </div>
                <div className="flex items-center justify-between text-[#ef4444] bg-[#fee2e2] dark:bg-[#3b1219] p-1">
                  <span>✗ STEP 2: Zp = (π · d³) / 16</span>
                  <span className="font-bold">BROKE HERE</span>
                </div>
                <div className="text-slate-500">○ STEP 3: d ≥ 81.6 mm (UNREACHED)</div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="border-4 border-[#030712] bg-white dark:bg-[#030712] p-6 space-y-4 shadow-[6px_6px_0px_0px_#030712]">
              <div className="flex items-center justify-between border-b-2 border-slate-200 dark:border-slate-800 pb-3">
                <span className="font-mono text-xs font-bold uppercase px-2 py-0.5 bg-[#10b981] text-[#030712]">
                  SYLLABUS GROUNDING
                </span>
                <span className="font-mono text-xs text-slate-500 font-bold">EXAM RADAR</span>
              </div>
              <h3 className="font-display text-xl font-black uppercase">
                Predictive Past-Paper Weighting
              </h3>
              <p className="font-body text-sm text-slate-600 dark:text-slate-400">
                Aggregates 10+ years of engineering past exams across KU, JKUAT, UoN, TUK, DeKUT, and Moi. Lecturer emphasis pins get a 2.5x multiplier so you prepare for what actually counts.
              </p>
              <div className="p-3 bg-[#030712] text-white font-mono text-xs space-y-2 border-2 border-[#030712]">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#f59e0b] font-bold">MOHR&apos;S STRESS CIRCLE:</span>
                  <span className="text-[#10b981] font-bold">92% FREQ (25 MARKS)</span>
                </div>
                <div className="w-full bg-slate-800 h-2">
                  <div className="bg-[#10b981] h-2 w-[92%]" />
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="border-4 border-[#030712] bg-white dark:bg-[#030712] p-6 space-y-4 shadow-[6px_6px_0px_0px_#030712]">
              <div className="flex items-center justify-between border-b-2 border-slate-200 dark:border-slate-800 pb-3">
                <span className="font-mono text-xs font-bold uppercase px-2 py-0.5 bg-[#f59e0b] text-[#030712]">
                  DAILY DRILLS &amp; STREAKS
                </span>
                <span className="font-mono text-xs text-slate-500 font-bold">DISCORD BOT</span>
              </div>
              <h3 className="font-display text-xl font-black uppercase">
                Daily Engineering Question Engine
              </h3>
              <p className="font-body text-sm text-slate-600 dark:text-slate-400">
                Pulls real past questions with engineered distractors. Earn +2 pts for attempting, +10 pts for solving, and unlock 7-day and 30-day streak roles on the community leaderboard.
              </p>
              <div className="p-3 bg-[#f8fafc] dark:bg-[#0f172a] border-2 border-[#030712] font-mono text-xs space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-bold">SCORING RULES:</span>
                  <span className="text-[#10b981] font-black">+12 TOTAL PTS / DAY</span>
                </div>
                <div className="text-slate-500 text-[11px] flex items-center justify-between">
                  <span>• 7-Day Consistency Role</span>
                  <span className="text-[#f59e0b] font-bold">🔥 STREAK KEEPER</span>
                </div>
                <div className="text-slate-500 text-[11px] flex items-center justify-between">
                  <span>• 30-Day Master Role</span>
                  <span className="text-[#10b981] font-bold">★ FOUNDRY ELITE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOWNLOAD PACKAGES MATRIX */}
      <section id="matrix" className="py-16 md:py-24 border-t-4 border-[#030712] bg-white dark:bg-[#030712]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-mono text-xs font-bold uppercase px-3 py-1 bg-[#10b981] text-[#030712] border-2 border-[#030712]">
              /// DISTRIBUTION RELEASES
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight">
              Choose Your Deployment.
            </h2>
            <p className="font-body text-base text-slate-600 dark:text-slate-400">
              Download the official Windows installer or use the portable lab edition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Package 1: Official Windows Installer (Flagship) */}
            <div className="border-4 border-[#030712] bg-[#f8fafc] dark:bg-[#0f172a] shadow-[8px_8px_0px_0px_#10b981] flex flex-col justify-between p-6 sm:p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase px-2.5 py-1 bg-[#10b981] text-[#030712] border-2 border-[#030712]">
                    RECOMMENDED
                  </span>
                  <HardDrive className="w-6 h-6 stroke-[2.5]" />
                </div>

                <h3 className="font-display text-2xl font-black uppercase">
                  Windows Installer (.EXE)
                </h3>

                <p className="font-body text-sm text-slate-700 dark:text-slate-300">
                  The complete 71 MB binary installer. Automatically extracts to <code className="font-bold">%LOCALAPPDATA%\StudyDesk</code> and sets up Edge Application Mode.
                </p>

                <ul className="space-y-2 font-mono text-xs">
                  <li className="flex items-center gap-2">✓ Zero admin rights needed</li>
                  <li className="flex items-center gap-2">✓ Auto desktop shortcut creation</li>
                  <li className="flex items-center gap-2">✓ Local database in <code className="font-bold">study\data\study.json</code></li>
                  <li className="flex items-center gap-2">✓ Includes full offline past papers</li>
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

            {/* Package 2: Portable Lab ZIP */}
            <div className="border-4 border-[#030712] bg-[#f8fafc] dark:bg-[#0f172a] shadow-[8px_8px_0px_0px_#f59e0b] flex flex-col justify-between p-6 sm:p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase px-2.5 py-1 bg-[#f59e0b] text-[#030712] border-2 border-[#030712]">
                    CAMPUS LAB EDITION
                  </span>
                  <Laptop className="w-6 h-6 stroke-[2.5]" />
                </div>

                <h3 className="font-display text-2xl font-black uppercase">
                  Portable ZIP Archive
                </h3>

                <p className="font-body text-sm text-slate-700 dark:text-slate-300">
                  Ideal for university computer lab workstations where executing setup installers is restricted. Runs directly from any USB flash drive.
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

            {/* Package 3: Discord Mobile Sync */}
            <div className="border-4 border-[#030712] bg-[#f8fafc] dark:bg-[#0f172a] shadow-[8px_8px_0px_0px_#030712] flex flex-col justify-between p-6 sm:p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase px-2.5 py-1 bg-[#030712] text-white border-2 border-[#030712]">
                    MOBILE SYNC
                  </span>
                  <Zap className="w-6 h-6 stroke-[2.5]" />
                </div>

                <h3 className="font-display text-2xl font-black uppercase">
                  Discord Bot Companion
                </h3>

                <p className="font-body text-sm text-slate-700 dark:text-slate-300">
                  Take your study queue on the go. When away from your laptop, interact with your running Study Desk via Discord slash commands.
                </p>

                <ul className="space-y-2 font-mono text-xs">
                  <li className="flex items-center gap-2">✓ <code className="font-bold">/study today</code> (morning plan)</li>
                  <li className="flex items-center gap-2">✓ <code className="font-bold">/study mark</code> (photo check)</li>
                  <li className="flex items-center gap-2">✓ <code className="font-bold">/study teach</code> (voice note score)</li>
                  <li className="flex items-center gap-2">✓ <strong>Daily practice drills</strong> (+2 attempt, +10 solve, 7-day streaks)</li>
                  <li className="flex items-center gap-2">✓ Evening reminder nudges</li>
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

      {/* 3-STEP QUICK-START SETUP (WITH DISCORD KEY INTEGRATION) */}
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
            {/* Step 1 */}
            <div className="p-6 bg-white dark:bg-[#0f172a] border-4 border-[#030712] shadow-[6px_6px_0px_0px_#030712] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <span className="font-mono font-black text-3xl text-[#10b981] border-2 border-[#030712] px-3 py-1 bg-[#030712]">
                  01
                </span>
                <div>
                  <h3 className="font-display text-xl font-black uppercase">Download &amp; Extract StudyDesk.exe</h3>
                  <p className="font-body text-sm text-slate-600 dark:text-slate-300">
                    Double-click the downloaded binary. It automatically extracts the local server and web client to <code className="font-bold">%LOCALAPPDATA%\StudyDesk</code>.
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

            {/* Step 2 */}
            <div className="p-6 bg-white dark:bg-[#0f172a] border-4 border-[#030712] shadow-[6px_6px_0px_0px_#030712] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <span className="font-mono font-black text-3xl text-[#f59e0b] border-2 border-[#030712] px-3 py-1 bg-[#030712]">
                  02
                </span>
                <div>
                  <h3 className="font-display text-xl font-black uppercase">Get Your Single-Use Key in Discord</h3>
                  <p className="font-body text-sm text-slate-600 dark:text-slate-300">
                    Open Discord and type <code className="font-bold bg-[#f59e0b] text-[#030712] px-1">/study link</code>. The bot returns your private onboarding code (e.g. <code className="font-bold">SD-7K2M-9QXA</code>).
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={copySampleCommand}
                  className="px-4 py-2.5 bg-[#030712] text-[#10b981] font-mono font-bold text-xs uppercase border-2 border-[#030712] flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedKey ? "Copied /study link!" : "Copy Command"}</span>
                </button>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 bg-white dark:bg-[#0f172a] border-4 border-[#030712] shadow-[6px_6px_0px_0px_#030712] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <span className="font-mono font-black text-3xl text-[#10b981] border-2 border-[#030712] px-3 py-1 bg-[#030712]">
                  03
                </span>
                <div>
                  <h3 className="font-display text-xl font-black uppercase">Run setup.bat &amp; Start Studying</h3>
                  <p className="font-body text-sm text-slate-600 dark:text-slate-300">
                    Run <code className="font-bold">setup.bat</code>, paste your code, and choose your units. Study Desk opens in Edge App mode at <code className="font-bold">localhost:5190</code>.
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

      {/* DESKTOP FAQ ACCORDION */}
      <section className="py-16 md:py-24 border-t-4 border-[#030712] bg-white dark:bg-[#030712]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight">
              Frequently Asked Questions.
            </h2>
          </div>

          <div className="border-4 border-[#030712] bg-[#f8fafc] dark:bg-[#0f172a] shadow-[6px_6px_0px_0px_#030712] divide-y-2 divide-[#030712]">
            <div className="p-5 space-y-2">
              <h4 className="font-display text-lg font-bold uppercase">Do I need administrator privileges on my laptop?</h4>
              <p className="font-body text-sm text-slate-700 dark:text-slate-300">
                No. Study Desk installs directly to your user folder (<code className="font-bold">%LOCALAPPDATA%\StudyDesk</code>). It does not alter system directories or require administrative UAC approval.
              </p>
            </div>

            <div className="p-5 space-y-2">
              <h4 className="font-display text-lg font-bold uppercase">Does Study Desk work without an internet connection?</h4>
              <p className="font-body text-sm text-slate-700 dark:text-slate-300">
                Yes. All your course outlines, past papers, notes, checkpoints, and formulas run completely offline. Internet is only used when querying the central AI vision/voice model or syncing with Discord.
              </p>
            </div>

            <div className="p-5 space-y-2">
              <h4 className="font-display text-lg font-bold uppercase">How do I get my Discord single-use key?</h4>
              <p className="font-body text-sm text-slate-700 dark:text-slate-300">
                Join our Discord community and run the <code className="font-bold">/study link</code> slash command. Premium members receive their code instantly in a private ephemeral message.
              </p>
            </div>

            <div className="p-5 space-y-2">
              <h4 className="font-display text-lg font-bold uppercase">Can I use my own free Google Gemini API key?</h4>
              <p className="font-body text-sm text-slate-700 dark:text-slate-300">
                Yes. You can paste your own Gemini API key inside Study Desk Settings. This gives you unlimited AI grading without counting against community gateway limits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t-4 border-[#030712] bg-[#030712] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs font-bold uppercase">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Engineering Study Hub" className="h-8 w-auto border border-white" />
            <span>STUDY DESK // REV 2026.10 // WIN_X64</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-[#10b981] transition-colors">Home</Link>
            <Link to="/projects" className="hover:text-[#10b981] transition-colors">Projects</Link>
            <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="hover:text-[#10b981] transition-colors">Discord</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="hover:text-[#10b981] transition-colors">WhatsApp</a>
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
