import React, { useState, useEffect } from "react";
import {
  Flame,
  Lock,
  Unlock,
  Share2,
  CheckCircle2,
  Terminal,
  Copy,
  Sparkles,
  Users
} from "lucide-react";

/**
 * EDIT THIS CONFIG OBJECT ANYTIME YOU LAUNCH A NEW SECRET TOOL OR HARDWARE DROP
 */
const DROP_CONFIG = {
  codename: "PROJECT ARGON // LAB-01",
  badgeText: "CLASSIFIED ALPHA DROP // 19 SEATS REMAINING IN BATCH 01",
  headline: "Be The First To Test What We're Building Next.",
  subheadline:
    "We are opening early sandbox access to our next-generation engineering build & simulation engine for 100 founding students across Kenya before public release.",
  totalSeats: 100,
  initialClaimed: 81,
  visibleSpecs: [
    "Real-time CAD & equation breakpoint co-pilot grounded in EBK university syllabi",
    "Instant Bill-of-Materials (BOM) pricer linked to live Nairobi hardware shops",
    "Zero-setup local + mobile companion sync with Founding Builder badge in Discord"
  ],
  redactedSpec: "Autonomous [REDACTED // UNLOCKS FOR BATCH 01 TESTERS] hardware telemetry bridge"
};

const UNIVERSITIES = [
  { code: "KU", name: "Kenyatta University (KU)", count: 38 },
  { code: "JKUAT", name: "JKUAT (Juja)", count: 19 },
  { code: "UON", name: "University of Nairobi (UoN)", count: 11 },
  { code: "TUK", name: "Technical Univ. of Kenya (TUK)", count: 7 },
  { code: "DEKUT", name: "Dedan Kimathi (DeKUT)", count: 4 },
  { code: "MOI", name: "Moi / Egerton / MMUST / Other", count: 2 }
];

interface SavedPass {
  serialNumber: number;
  handle: string;
  university: string;
  yearOfStudy: string;
  referralCode: string;
  claimedAt: string;
}

const STORAGE_KEY = "engstudyhub_foundry_pass_v1";

export const FoundryDropWaitlist: React.FC = () => {
  const [handle, setHandle] = useState("");
  const [university, setUniversity] = useState("KU");
  const [yearOfStudy, setYearOfStudy] = useState("Year 3");
  const [savedPass, setSavedPass] = useState<SavedPass | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setSavedPass(JSON.parse(raw));
      }
    } catch {
      // Ignore storage errors in private browsing
    }
  }, []);

  const handleClaimSpot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle.trim()) return;

    const serialNumber = DROP_CONFIG.initialClaimed + 1;
    const cleanHandle = handle.trim().replace(/[^a-zA-Z0-9]/g, "").slice(0, 6).toUpperCase() || "ENG";
    const referralCode = `${university}-${cleanHandle}-${serialNumber}`;

    const newPass: SavedPass = {
      serialNumber,
      handle: handle.trim(),
      university,
      yearOfStudy,
      referralCode,
      claimedAt: new Date().toLocaleDateString("en-KE", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      })
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPass));
    } catch {
      // Continue even if localStorage is blocked
    }
    setSavedPass(newPass);
  };

  const getShareText = () => {
    if (!savedPass) return "";
    return `I just locked Founding Pass #00${savedPass.serialNumber}/0100 for Engineering Study Hub's ${DROP_CONFIG.codename} (${savedPass.university}). Only ${
      DROP_CONFIG.totalSeats - savedPass.serialNumber
    } Batch 01 spots left: https://www.engineeringhub.site/?ref=${savedPass.referralCode}`;
  };

  const handleCopyInvite = () => {
    navigator.clipboard.writeText(getShareText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const seatsClaimed = savedPass ? savedPass.serialNumber : DROP_CONFIG.initialClaimed;
  const seatsLeft = Math.max(1, DROP_CONFIG.totalSeats - seatsClaimed);
  const fillPercent = Math.min(100, Math.round((seatsClaimed / DROP_CONFIG.totalSeats) * 100));

  return (
    <section
      id="foundry-drop"
      className="py-20 px-4 sm:px-6 lg:px-8 border-t-4 border-[#030712] bg-[#030712] text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Scarcity & Telemetry Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b-4 border-white/20">
          <div className="inline-flex items-center gap-2 bg-[#f59e0b] text-[#030712] px-3 py-1.5 font-mono text-xs font-black uppercase tracking-widest border-2 border-white">
            <Flame className="w-4 h-4 fill-current" />
            <span>{DROP_CONFIG.badgeText}</span>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="inline-flex items-center gap-1.5 text-[#10b981] font-bold">
              <span className="w-2.5 h-2.5 bg-[#10b981] inline-block animate-ping" />
              <span>LIVE COHORT QUEUE OPEN</span>
            </span>
            <span className="text-slate-400">|</span>
            <span className="font-bold text-white">
              {seatsClaimed}/{DROP_CONFIG.totalSeats} CLAIMED
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Secret Project Pitch + Redacted Specs + Campus FOMO Bar (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#10b981]">
                /// {DROP_CONFIG.codename}
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tight leading-[1.05] text-white">
                {DROP_CONFIG.headline}
              </h2>
              <p className="font-sans text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                {DROP_CONFIG.subheadline}
              </p>
            </div>

            {/* Batch Capacity Meter */}
            <div className="p-5 bg-[#0f172a] border-4 border-white shadow-[6px_6px_0px_0px_#10b981] space-y-3">
              <div className="flex items-center justify-between font-mono text-xs font-bold uppercase">
                <span className="text-[#10b981]">BATCH 01 COMPUTE ALLOCATION</span>
                <span className="bg-[#f59e0b] text-[#030712] px-2 py-0.5 font-black">
                  ONLY {seatsLeft} SPOTS LEFT
                </span>
              </div>
              <div className="w-full h-5 bg-[#030712] border-2 border-white p-0.5">
                <div
                  className="h-full bg-[#10b981] transition-all duration-500"
                  style={{ width: `${fillPercent}%` }}
                />
              </div>
              <p className="font-mono text-[11px] text-slate-300">
                Once Batch 01 hits 100/100, registration locks until public release. Batch 01 testers keep permanent Founding Engineer status.
              </p>
            </div>

            {/* Declassified + Redacted Spec List */}
            <div className="space-y-2.5 pt-2">
              <div className="font-mono text-xs uppercase font-bold text-slate-400">
                DECLASSIFIED SPECIFICATION MANIFEST:
              </div>
              {DROP_CONFIG.visibleSpecs.map((spec, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-[#090d16] border-2 border-slate-700 font-mono text-xs sm:text-sm text-slate-200"
                >
                  <Unlock className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                  <span>{spec}</span>
                </div>
              ))}

              {/* Redacted FOMO Teaser Line */}
              <div className="flex items-start gap-3 p-3 bg-[#090d16] border-2 border-dashed border-[#f59e0b] font-mono text-xs sm:text-sm text-[#f59e0b]">
                <Lock className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{DROP_CONFIG.redactedSpec}</span>
              </div>
            </div>

            {/* Live Campus Representation Leaderboard */}
            <div className="pt-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-slate-400 mb-3">
                <Users className="w-4 h-4 text-[#10b981]" />
                <span>BATCH 01 SEATS CLAIMED BY CAMPUS:</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono text-xs">
                {UNIVERSITIES.map((uni) => {
                  const isUserUni = savedPass?.university === uni.code;
                  const count = isUserUni ? uni.count + 1 : uni.count;
                  return (
                    <div
                      key={uni.code}
                      className={`p-2.5 border-2 ${
                        isUserUni
                          ? "border-[#10b981] bg-[#10b981]/10 text-white"
                          : "border-slate-700 bg-[#090d16] text-slate-300"
                      } flex items-center justify-between`}
                    >
                      <span className="font-bold">{uni.code}</span>
                      <span className="px-1.5 py-0.5 bg-white/10 text-[11px] font-black text-[#f59e0b]">
                        {count} SEATS
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Foundry Pass Claim Box OR Issued Serialized Pass (5 Cols) */}
          <div className="lg:col-span-5">
            {!savedPass ? (
              <div className="bg-white text-[#030712] border-4 border-white shadow-[8px_8px_0px_0px_#f59e0b] p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b-4 border-[#030712] pb-4">
                  <div>
                    <span className="font-mono text-[11px] font-bold uppercase bg-[#030712] text-[#10b981] px-2 py-0.5">
                      FOUNDRY ACCESS TERMINAL
                    </span>
                    <h3 className="font-display text-2xl font-black uppercase mt-1">
                      Lock Your Founding Pass
                    </h3>
                  </div>
                  <Terminal className="w-7 h-7 stroke-[2.5]" />
                </div>

                <form onSubmit={handleClaimSpot} className="space-y-4">
                  <div>
                    <label
                      htmlFor="foundry-handle"
                      className="block font-mono text-xs font-bold uppercase mb-1.5"
                    >
                      1. Discord Username or WhatsApp Number *
                    </label>
                    <input
                      id="foundry-handle"
                      type="text"
                      required
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      placeholder="e.g. @kiprop_eng or 0712 345 678"
                      className="w-full px-3.5 py-3 bg-[#f8fafc] border-2 border-[#030712] font-mono text-sm focus:outline-none focus:bg-[#f59e0b]/10"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="foundry-uni"
                        className="block font-mono text-xs font-bold uppercase mb-1.5"
                      >
                        2. University *
                      </label>
                      <select
                        id="foundry-uni"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        className="w-full px-3 py-3 bg-[#f8fafc] border-2 border-[#030712] font-mono text-xs font-bold uppercase focus:outline-none"
                      >
                        {UNIVERSITIES.map((u) => (
                          <option key={u.code} value={u.code}>
                            {u.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="foundry-year"
                        className="block font-mono text-xs font-bold uppercase mb-1.5"
                      >
                        3. Year of Study *
                      </label>
                      <select
                        id="foundry-year"
                        value={yearOfStudy}
                        onChange={(e) => setYearOfStudy(e.target.value)}
                        className="w-full px-3 py-3 bg-[#f8fafc] border-2 border-[#030712] font-mono text-xs font-bold uppercase focus:outline-none"
                      >
                        <option value="Year 1">Year 1</option>
                        <option value="Year 2">Year 2</option>
                        <option value="Year 3">Year 3</option>
                        <option value="Year 4">Year 4</option>
                        <option value="Year 5">Year 5 / Finalist</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 bg-[#10b981] hover:bg-[#059669] text-[#030712] font-display text-lg font-black uppercase tracking-wide border-4 border-[#030712] shadow-[6px_6px_0px_0px_#030712] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#030712] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-5 h-5 stroke-[2.5]" />
                    <span>Claim Pass #00{DROP_CONFIG.initialClaimed + 1} Now</span>
                  </button>
                </form>

                <p className="font-mono text-[11px] text-slate-600 border-t-2 border-dashed border-slate-300 pt-3">
                  Zero spam. You receive an instant serialized Foundry Pass and priority invite link when Batch 01 unlocks.
                </p>
              </div>
            ) : (
              /* SERIALIZED FOUNDRY BOARDING PASS (POST-SIGNUP VIRAL LOOP) */
              <div className="bg-[#10b981] text-[#030712] border-4 border-white shadow-[8px_8px_0px_0px_#f59e0b] p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b-4 border-[#030712] pb-4">
                  <div>
                    <span className="font-mono text-xs font-black uppercase bg-[#030712] text-[#f59e0b] px-2.5 py-1">
                      VERIFIED FOUNDING COHORT
                    </span>
                    <h3 className="font-display text-3xl font-black uppercase mt-2">
                      PASS #00{savedPass.serialNumber} / 0100
                    </h3>
                  </div>
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                </div>

                <div className="bg-white border-4 border-[#030712] p-4 font-mono text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">ENGINEER HANDLE:</span>
                    <span className="font-black">{savedPass.handle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">CAMPUS COHORT:</span>
                    <span className="font-black">
                      {savedPass.university} // {savedPass.yearOfStudy}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">PRIORITY CODE:</span>
                    <span className="font-black bg-[#f59e0b] px-1.5">
                      {savedPass.referralCode}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">ISSUED DATE:</span>
                    <span className="font-bold">{savedPass.claimedAt}</span>
                  </div>
                </div>

                {/* Viral Queue-Jumper Action */}
                <div className="space-y-3">
                  <div className="font-mono text-xs font-black uppercase">
                    /// WANT DAY-1 ACCESS BEFORE THE QUEUE?
                  </div>
                  <p className="font-sans text-xs font-semibold leading-relaxed">
                    Share your pass in your class WhatsApp group or verify your code in Discord. Every classmate who joins with your code bumps your pass to the front of Batch 01.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <button
                      type="button"
                      onClick={handleCopyInvite}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-[#030712] text-white font-mono text-xs font-bold uppercase border-2 border-[#030712] shadow-[4px_4px_0px_0px_#ffffff] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer"
                    >
                      <Copy className="w-4 h-4" />
                      <span>{copied ? "Copied Invite!" : "Copy Class Invite"}</span>
                    </button>

                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(getShareText())}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-[#f59e0b] text-[#030712] font-mono text-xs font-black uppercase border-2 border-[#030712] shadow-[4px_4px_0px_0px_#030712] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                    >
                      <Share2 className="w-4 h-4 stroke-[2.5]" />
                      <span>Share on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
