import React from "react";
import {
  Terminal,
  Download,
  Cpu,
  ScanLine,
  BookOpenCheck,
  ArrowUpRight,
  HardDrive,
  ShieldCheck,
  Layers,
  FileCode2
} from "lucide-react";

export const StudyDeskShowcase: React.FC = () => {
  return (
    <section
      id="study-desk"
      className="py-20 px-4 sm:px-6 lg:px-8 border-t-4 border-[#030712] bg-[#f8fafc] dark:bg-[#090d16] text-[#030712] dark:text-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Industrial Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b-4 border-[#030712]">
          <div className="inline-flex items-center gap-2 bg-[#030712] text-[#10b981] px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-widest border-2 border-[#030712]">
            <Terminal className="w-4 h-4" />
            <span>FLAGSHIP DESKTOP ENGINE // LOCALHOST:5190 // NO FLASHCARDS</span>
          </div>
          <div className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 bg-[#f59e0b] text-[#030712] border-2 border-[#030712] shadow-[3px_3px_0px_0px_#030712]">
            FOR ENGINEERS, BY ENGINEERS
          </div>
        </div>

        {/* Main Headline & Architecture Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Title + 4 Real Shipped Pillars (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <h2 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tight leading-[1.05]">
                STUDY DESK<span className="text-[#10b981]">.EXE</span>
                <span className="block text-xl sm:text-2xl mt-2 bg-[#030712] text-white dark:bg-white dark:text-[#030712] inline-block px-3 py-1.5">
                  FIND THE EXACT STEP WHERE YOUR WORKING BROKE.
                </span>
              </h2>
              <p className="font-sans text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed font-medium">
                Flashcards don&apos;t pass engineering exams. Study Desk runs locally on your laptop, pairing real past papers with our{" "}
                <strong className="font-bold text-[#030712] dark:text-white underline decoration-[#10b981] decoration-2">
                  Breakpoint Understanding Engine
                </strong>{" "}
                to diagnose whether your weak link is conceptual (Why), setup (How), or execution (Do).
              </p>
            </div>

            {/* 4-Pillar Technical Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Pillar 1: Checkpoints & Breakpoint Model */}
              <div className="p-5 bg-white dark:bg-[#0f172a] border-4 border-[#030712] shadow-[6px_6px_0px_0px_#030712] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold uppercase px-2 py-0.5 bg-[#10b981] text-[#030712] border-2 border-[#030712]">
                      01 // BREAKPOINT ENGINE
                    </span>
                    <ScanLine className="w-5 h-5 text-[#030712] dark:text-[#10b981] stroke-[2.5]" />
                  </div>
                  <h3 className="font-display text-lg font-black uppercase mb-1.5">
                    Step-by-Step Checkpoint Dissection
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-snug">
                    Enter your final answer (any SI unit: <code className="font-mono font-bold">0.1425 GPa = 142.5 MPa</code>). If wrong, inspect numbered checkpoints, tap <strong className="font-mono text-xs">Broke here</strong>, and log the exact failure mode.
                  </p>
                </div>
              </div>

              {/* Pillar 2: Photo Working + Voice Teach-Back */}
              <div className="p-5 bg-white dark:bg-[#0f172a] border-4 border-[#030712] shadow-[6px_6px_0px_0px_#030712] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold uppercase px-2 py-0.5 bg-[#f59e0b] text-[#030712] border-2 border-[#030712]">
                      02 // PHOTO + VOICE AI
                    </span>
                    <Cpu className="w-5 h-5 text-[#030712] dark:text-[#f59e0b] stroke-[2.5]" />
                  </div>
                  <h3 className="font-display text-lg font-black uppercase mb-1.5">
                    Handwritten Photo Check &amp; Voice Teach-Back
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-snug">
                    Upload a photo of your notebook working via the app or Discord <code className="font-mono font-bold">mark</code> DM, or explain a theorem out loud to get scored out of 5 with missing assumptions flagged.
                  </p>
                </div>
              </div>

              {/* Pillar 3: Predictions, Hints & 4 Stages */}
              <div className="p-5 bg-white dark:bg-[#0f172a] border-4 border-[#030712] shadow-[6px_6px_0px_0px_#030712] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold uppercase px-2 py-0.5 bg-[#10b981] text-[#030712] border-2 border-[#030712]">
                      03 // EXAM RADAR + KITS
                    </span>
                    <BookOpenCheck className="w-5 h-5 text-[#030712] dark:text-[#10b981] stroke-[2.5]" />
                  </div>
                  <h3 className="font-display text-lg font-black uppercase mb-1.5">
                    Past-Paper Predictions &amp; A4 Survival Sheets
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-snug">
                    Ranks topics by past-paper mark weight + lecturer hints (<strong className="font-mono text-xs">2.5x</strong> boost). Generates worked ladders in Adequate Prep or printable 1-page A4 formula sheets on Exam-Eve.
                  </p>
                </div>
              </div>

              {/* Pillar 4: Deep Context Pack & Strike-Safe TBA */}
              <div className="p-5 bg-white dark:bg-[#0f172a] border-4 border-[#030712] shadow-[6px_6px_0px_0px_#030712] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold uppercase px-2 py-0.5 bg-[#f59e0b] text-[#030712] border-2 border-[#030712]">
                      04 // CONTEXT PACK + TBA
                    </span>
                    <FileCode2 className="w-5 h-5 text-[#030712] dark:text-[#f59e0b] stroke-[2.5]" />
                  </div>
                  <h3 className="font-display text-lg font-black uppercase mb-1.5">
                    1-Click <code className="font-mono text-sm">.md</code> Context Pack &amp; Offline Sync
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-snug">
                    Exports your synced notes, past papers, lecturer hints, and weakspots into a single <code className="font-mono font-bold">&lt;UNIT&gt;-context.md</code> pack for Claude/DeepSeek R1. Handles uncertain strike dates via TBA mode.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Brutalist Download & Telemetry Console (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-[#0f172a] border-4 border-[#030712] shadow-[8px_8px_0px_0px_#030712] overflow-hidden">
              {/* Console Title Bar */}
              <div className="bg-[#030712] text-white px-4 py-3 flex items-center justify-between border-b-4 border-[#030712]">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#10b981]">
                  <HardDrive className="w-4 h-4" />
                  <span>BINARY DISTRIBUTION // WIN_X64</span>
                </div>
                <span className="font-mono text-[11px] bg-[#10b981] text-[#030712] font-bold px-2 py-0.5">
                  71 MB INSTALLER
                </span>
              </div>

              {/* Spec Readout Body */}
              <div className="p-6 space-y-5">
                <div className="bg-[#f1f5f9] dark:bg-[#030712] border-2 border-[#030712] p-4 font-mono text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">PACKAGE:</span>
                    <span className="font-bold">StudyDesk.exe (v2026.10)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">RUNTIME:</span>
                    <span className="font-bold">Windows 10/11 (localhost:5190)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">INSTALL DIR:</span>
                    <span className="font-bold text-[#10b981]">%LOCALAPPDATA%\StudyDesk</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">PRIVILEGES:</span>
                    <span className="font-bold text-[#f59e0b]">ZERO ADMIN RIGHTS NEEDED</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">DISCORD BOT:</span>
                    <span className="font-bold">today, predict, weakspots, mark, teach</span>
                  </div>
                </div>

                {/* Live Breakpoint Layer Preview Strip */}
                <div className="p-3.5 border-2 border-[#030712] bg-[#f8fafc] dark:bg-[#090d16] space-y-2">
                  <div className="flex items-center justify-between font-mono text-[11px] font-bold uppercase">
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#10b981]" />
                      <span>BREAKPOINT MODEL TELEMETRY</span>
                    </span>
                    <span className="text-[#f59e0b]">BOTTLENECK: DO (UNITS)</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 font-mono text-[10px]">
                    <div className="p-2 border border-[#030712] bg-white dark:bg-[#0f172a]">
                      <span className="block text-slate-500">WHY (CONCEPT)</span>
                      <span className="font-black text-sm text-[#10b981]">78%</span>
                    </div>
                    <div className="p-2 border border-[#030712] bg-white dark:bg-[#0f172a]">
                      <span className="block text-slate-500">HOW (SETUP)</span>
                      <span className="font-black text-sm text-[#10b981]">70%</span>
                    </div>
                    <div className="p-2 border border-[#030712] bg-white dark:bg-[#0f172a]">
                      <span className="block text-slate-500">DO (EXECUTION)</span>
                      <span className="font-black text-sm text-[#f59e0b]">50%</span>
                    </div>
                  </div>
                </div>

                {/* Primary Download CTA */}
                <a
                  href="/downloads/StudyDesk.exe"
                  download
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#10b981] hover:bg-[#059669] text-[#030712] font-display text-lg font-black uppercase tracking-wide border-4 border-[#030712] shadow-[6px_6px_0px_0px_#030712] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#030712] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all"
                >
                  <Download className="w-6 h-6 stroke-[2.5]" />
                  <span>Download Study Desk (.exe)</span>
                </a>

                {/* Secondary Action Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href="/download"
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#f59e0b] text-[#030712] font-mono text-xs font-bold uppercase border-2 border-[#030712] shadow-[3px_3px_0px_0px_#030712] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#030712] transition-all"
                  >
                    <span>Full Setup Guide</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </a>

                  <a
                    href="https://discord.gg/7yUz2rXumm"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white dark:bg-[#1e293b] text-[#030712] dark:text-white font-mono text-xs font-bold uppercase border-2 border-[#030712] shadow-[3px_3px_0px_0px_#030712] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#030712] transition-all"
                  >
                    <span>Get Single-Use Key</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </a>
                </div>

                {/* Single-Use Verification Note */}
                <div className="pt-2 border-t-2 border-dashed border-slate-300 dark:border-slate-700 flex items-start gap-2.5 text-xs font-mono text-slate-600 dark:text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                  <p>
                    <strong>LOCAL-FIRST PRIVACY:</strong> All your study logs live in <code className="font-bold">study\data\study.json</code> on your own machine. Run <code className="font-bold">setup.bat</code> once to pair your Discord User ID and AI provider.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
