import React, { useState } from "react";
import { CheckSquare, Copy, X, ShieldCheck, ArrowUpRight } from "lucide-react";

export const MinimalistPricingBar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<"SEMESTER" | "LIFETIME">("SEMESTER");
  const [copiedPhone, setCopiedPhone] = useState(false);

  const MPESA_NUMBER = "0745947704";

  const copyNumber = () => {
    navigator.clipboard.writeText(MPESA_NUMBER);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <>
      <section
        id="pricing"
        className="py-10 px-4 sm:px-6 lg:px-8 border-t-4 border-[#030712] bg-white dark:bg-[#030712]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="border-4 border-[#030712] bg-[#f8fafc] dark:bg-[#0f172a] shadow-[6px_6px_0px_0px_#030712] p-5 sm:p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Left: Spec Identity */}
            <div className="space-y-1.5 max-w-xl">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase text-[#030712] bg-[#10b981] px-2 py-0.5 border-2 border-[#030712]">
                <CheckSquare className="w-3.5 h-3.5" />
                <span>COMMUNITY INFRASTRUCTURE PASS // 7-DAY BASELINE TRIAL INCLUDED</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-[#030712] dark:text-white">
                Full Archive, Study Desk Sync &amp; AI Diagnostics
              </h3>
              <p className="text-xs sm:text-sm font-sans text-slate-600 dark:text-slate-300">
                Sustains server compute, 2,571+ indexed engineering files, and Breakpoint AI grading. Every new member starts with 7 days of unrestricted access automatically.
              </p>
            </div>

            {/* Right: Compact Rate Tiles + Modal Trigger */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto justify-start lg:justify-end">
              <button
                type="button"
                onClick={() => {
                  setSelectedTier("SEMESTER");
                  setIsModalOpen(true);
                }}
                className="px-4 py-2.5 bg-white dark:bg-[#030712] border-2 border-[#030712] font-mono text-left hover:border-[#10b981] transition-colors cursor-pointer"
              >
                <span className="block text-[10px] uppercase text-slate-500 font-bold">
                  SEMESTER PASS
                </span>
                <span className="text-lg font-black text-[#030712] dark:text-white">
                  KES 50<span className="text-xs font-normal">/sem</span>
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedTier("LIFETIME");
                  setIsModalOpen(true);
                }}
                className="px-4 py-2.5 bg-[#f59e0b] text-[#030712] border-2 border-[#030712] font-mono text-left cursor-pointer"
              >
                <span className="block text-[10px] uppercase font-bold">
                  5-YEAR / LIFETIME
                </span>
                <span className="text-lg font-black">
                  KES 800<span className="text-xs font-bold">/once</span>
                </span>
              </button>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="px-5 py-3.5 bg-[#030712] text-white dark:bg-[#10b981] dark:text-[#030712] font-mono text-xs font-bold uppercase tracking-wider border-2 border-[#030712] shadow-[4px_4px_0px_0px_#10b981] dark:shadow-[4px_4px_0px_0px_#030712] hover:translate-x-[1px] hover:translate-y-[1px] transition-all whitespace-nowrap cursor-pointer"
              >
                Initialize Pass -&gt;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ON-DEMAND M-PESA ACTIVATION MODAL (ELIMINATES PAGE-WIDE REPETITION) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#030712]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0f172a] text-[#030712] dark:text-white border-4 border-[#030712] shadow-[10px_10px_0px_0px_#10b981] max-w-lg w-full p-6 space-y-5 relative">
            <div className="flex items-center justify-between border-b-4 border-[#030712] pb-3">
              <div className="font-mono text-xs font-black uppercase bg-[#10b981] text-[#030712] px-2.5 py-1 border-2 border-[#030712]">
                INSTANT M-PESA PASS ACTIVATION
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
                className="p-1.5 border-2 border-[#030712] bg-[#f59e0b] text-[#030712] cursor-pointer"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Tier Selector Tabs */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <button
                type="button"
                onClick={() => setSelectedTier("SEMESTER")}
                className={`p-3 border-2 border-[#030712] text-left cursor-pointer ${
                  selectedTier === "SEMESTER"
                    ? "bg-[#10b981] text-[#030712] font-black shadow-[3px_3px_0px_0px_#030712]"
                    : "bg-[#f8fafc] dark:bg-[#030712]"
                }`}
              >
                <span className="block text-[10px] uppercase">SEMESTER PASS</span>
                <span className="text-base font-black">KES 50</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedTier("LIFETIME")}
                className={`p-3 border-2 border-[#030712] text-left cursor-pointer ${
                  selectedTier === "LIFETIME"
                    ? "bg-[#f59e0b] text-[#030712] font-black shadow-[3px_3px_0px_0px_#030712]"
                    : "bg-[#f8fafc] dark:bg-[#030712]"
                }`}
              >
                <span className="block text-[10px] uppercase">5-YEAR LIFETIME PASS</span>
                <span className="text-base font-black">KES 800</span>
              </button>
            </div>

            {/* Clean 3-Step Verification */}
            <div className="space-y-3 font-mono text-xs bg-[#f8fafc] dark:bg-[#030712] p-4 border-2 border-[#030712]">
              <p className="font-bold">
                1. Join the Discord server first (unlocks your free 7-day baseline trial automatically).
              </p>
              <div className="flex items-center justify-between gap-2 p-2.5 bg-white dark:bg-[#0f172a] border-2 border-[#030712]">
                <div>
                  <span className="text-[10px] text-slate-500 block">
                    2. SEND {selectedTier === "SEMESTER" ? "KES 50" : "KES 800"} VIA M-PESA TO:
                  </span>
                  <span className="font-black text-sm">{MPESA_NUMBER} (Peter Mwangi)</span>
                </div>
                <button
                  type="button"
                  onClick={copyNumber}
                  className="px-3 py-1.5 bg-[#030712] text-[#10b981] font-bold uppercase text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedPhone ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <p className="font-bold">
                3. Open <code className="bg-[#f59e0b] text-[#030712] px-1">#upgrade-to-premium</code> in Discord, tap <strong>&quot;I&apos;ve paid&quot;</strong>, and paste your M-Pesa confirmation message.
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-[#10b981]" />
                <span>7-Day No-Questions Refund Policy</span>
              </div>

              <a
                href="https://discord.gg/7yUz2rXumm"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-3 bg-[#10b981] text-[#030712] font-mono text-xs font-black uppercase border-2 border-[#030712] shadow-[4px_4px_0px_0px_#030712]"
              >
                <span>Open Discord Server</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
