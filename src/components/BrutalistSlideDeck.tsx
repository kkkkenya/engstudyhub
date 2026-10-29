import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Layers,
  Plus,
  Wrench,
  ArrowUpRight,
  Cpu
} from "lucide-react";

export interface BuildSlide {
  id: string;
  plateCode: string;
  title: string;
  discipline: string;
  budgetKes: string;
  status: "SHIPPED" | "IN FABRICATION";
  imageUrl?: string;
  specs: string[];
  nairobiSource: string;
}

const BUILD_SLIDES: BuildSlide[] = [
  {
    id: "truss-bridge",
    plateCode: "PLATE 01 // STRUCTURAL",
    title: "500mm Span Warren Truss Bridge & Gusset Assembly",
    discipline: "Mechanical & Civil Engineering",
    budgetKes: "KES 1,850",
    status: "SHIPPED",
    imageUrl: "/images/plate-03-truss-bridge.jpg",
    specs: [
      "Pure Equilateral Zig-Zag Chord Geometry",
      "Steel Gusset Plate Joint Reinforcement",
      "Destructive Load-to-Failure Bench Tested"
    ],
    nairobiSource: "Kirinyaga Rd / Industrial Area Timber & Sheet Suppliers"
  },
  {
    id: "iot-irrigation",
    plateCode: "PLATE 02 // MECHATRONICS",
    title: "ESP32 Air-to-Water Smart Irrigation Controller",
    discipline: "Mechatronics & Biosystems",
    budgetKes: "KES 4,200",
    status: "IN FABRICATION",
    specs: [
      "Capacitive Soil Moisture Sensor Array",
      "Inline Hall-Effect Flow Meter Telemetry",
      "12V Solenoid Relay Switching with Watchdog"
    ],
    nairobiSource: "Nyamakima / Luthuli Ave Electronics & Ruiru Hardware"
  },
  {
    id: "shs-station",
    plateCode: "PLATE 03 // FABRICATION",
    title: "Modular SHS Steel Frame & Load Rig",
    discipline: "Mechanical Fabrication",
    budgetKes: "KES 6,500",
    status: "SHIPPED",
    imageUrl: "/images/plate-01-hub-workshop.jpg",
    specs: [
      "M35 HSS-Cobalt Drilled Structural Joints",
      "Inverter Arc Welded Corner Gussets",
      "Zero-Deflection Leveling Base"
    ],
    nairobiSource: "Grogan / Thika Rd Structural Steel Yards"
  }
];

export const BrutalistSlideDeck: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSpread, setIsSpread] = useState(false);
  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % BUILD_SLIDES.length);
  const prevSlide = () =>
    setActiveIndex((prev) => (prev - 1 + BUILD_SLIDES.length) % BUILD_SLIDES.length);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSpread) return;
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSpread]);

  const currentSlide = BUILD_SLIDES[activeIndex];

  return (
    <section
      id="builds-deck"
      className="py-20 px-4 sm:px-6 lg:px-8 border-t-4 border-[#030712] bg-white dark:bg-[#030712] text-[#030712] dark:text-white"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b-4 border-[#030712]">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase px-2.5 py-1 bg-[#030712] text-[#10b981] border-2 border-[#030712]">
              <Wrench className="w-3.5 h-3.5" />
              <span>VERIFIED STUDENT BUILDS // ZERO FAKE 3D RENDERS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight">
              We&apos;d Rather Show Blueprints Than a Fake Render.
            </h2>
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              type="button"
              onClick={() => setIsSpread(!isSpread)}
              className="inline-flex items-center gap-2 px-4 py-2.5 font-mono text-xs font-bold uppercase bg-[#f59e0b] text-[#030712] border-2 border-[#030712] shadow-[4px_4px_0px_0px_#030712] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#030712] transition-all cursor-pointer"
            >
              {isSpread ? (
                <>
                  <Layers className="w-4 h-4 stroke-[2.5]" />
                  <span>Collapse to Slide Deck</span>
                </>
              ) : (
                <>
                  <LayoutGrid className="w-4 h-4 stroke-[2.5]" />
                  <span>Spread the Deck ({BUILD_SLIDES.length})</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* MODE A: SINGLE INTERACTIVE SLIDE VIEWER */}
        {!isSpread ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 border-4 border-[#030712] bg-[#f8fafc] dark:bg-[#0f172a] shadow-[8px_8px_0px_0px_#030712]">
            {/* Left Visual Frame (7 Cols) */}
            <div className="lg:col-span-7 relative border-b-4 lg:border-b-0 lg:border-r-4 border-[#030712] aspect-[16/10] bg-[#090d16] overflow-hidden flex items-center justify-center">
              {currentSlide.imageUrl && !imgError[currentSlide.id] ? (
                <img
                  src={currentSlide.imageUrl}
                  alt={currentSlide.title}
                  onError={() =>
                    setImgError((prev) => ({ ...prev, [currentSlide.id]: true }))
                  }
                  className="w-full h-full object-cover"
                />
              ) : (
                /* Engineered Blueprint Fallback (Never leaks raw file paths) */
                <div
                  className="w-full h-full p-6 sm:p-8 flex flex-col justify-between text-[#10b981] font-mono relative"
                  style={{
                    backgroundImage:
                      "radial-gradient(#1e293b 1.5px, transparent 1.5px), linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)",
                    backgroundSize: "24px 24px"
                  }}
                >
                  <div className="flex justify-between items-center text-xs border-b border-[#10b981]/40 pb-2">
                    <span>CAD_SCHEMATIC // {currentSlide.plateCode}</span>
                    <span className="px-2 py-0.5 bg-[#f59e0b] text-[#030712] font-bold">
                      WORKSHOP BUILD ACTIVE
                    </span>
                  </div>

                  <div className="my-auto flex flex-col items-center justify-center text-center space-y-3 py-6">
                    <Cpu className="w-12 h-12 text-[#10b981] stroke-[1.5]" />
                    <p className="text-sm sm:text-base font-bold uppercase tracking-widest text-white max-w-md">
                      {currentSlide.title}
                    </p>
                    <p className="text-xs text-slate-400 max-w-md">
                      Benchtop assembly in progress. Verified workshop photograph publishes upon final load-test signoff.
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-slate-400 border-t border-[#10b981]/40 pt-2">
                    <span>SCALE: 1:1 BENCH</span>
                    <span>TOLERANCE: +/- 0.5MM</span>
                  </div>
                </div>
              )}

              <div className="absolute top-4 left-4 bg-[#030712] text-white font-mono text-xs font-bold px-3 py-1.5 border-2 border-white">
                SLIDE 0{activeIndex + 1} / 0{BUILD_SLIDES.length}
              </div>
            </div>

            {/* Right Spec Sheet & Controls (5 Cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold uppercase px-2.5 py-1 bg-[#10b981] text-[#030712] border-2 border-[#030712]">
                    {currentSlide.plateCode}
                  </span>
                  <span className="font-mono text-xs font-bold uppercase px-2.5 py-1 bg-white dark:bg-[#030712] border-2 border-[#030712]">
                    BOM: {currentSlide.budgetKes}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase leading-tight">
                  {currentSlide.title}
                </h3>

                <div className="space-y-2 pt-2">
                  <span className="font-mono text-xs uppercase text-slate-500 font-bold block">
                    VERIFIED BUILD SPECIFICATIONS:
                  </span>
                  <ul className="space-y-2">
                    {currentSlide.specs.map((spec, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold"
                      >
                        <span className="w-2 h-2 bg-[#10b981] border border-[#030712] shrink-0" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-white dark:bg-[#030712] border-2 border-[#030712] font-mono text-xs">
                  <span className="text-slate-500 block uppercase text-[10px] font-bold">
                    NAIROBI / KENYA SOURCING:
                  </span>
                  <span className="font-bold">{currentSlide.nairobiSource}</span>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-[#030712] flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Previous build slide"
                    className="p-3 bg-white dark:bg-[#030712] border-2 border-[#030712] shadow-[3px_3px_0px_0px_#030712] hover:bg-[#10b981] hover:text-[#030712] transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next build slide"
                    className="p-3 bg-white dark:bg-[#030712] border-2 border-[#030712] shadow-[3px_3px_0px_0px_#030712] hover:bg-[#10b981] hover:text-[#030712] transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                  </button>
                </div>

                <a
                  href="#/projects"
                  className="inline-flex items-center gap-1.5 px-4 py-3 bg-[#030712] text-white dark:bg-[#10b981] dark:text-[#030712] font-mono text-xs font-bold uppercase border-2 border-[#030712] shadow-[3px_3px_0px_0px_#10b981]"
                >
                  <span>Full Build Sheet</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* MODE B: SPREAD THE DECK (3-COLUMN GRID + SUBMISSION WALL CARD) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BUILD_SLIDES.map((slide, idx) => (
              <div
                key={slide.id}
                onClick={() => {
                  setActiveIndex(idx);
                  setIsSpread(false);
                }}
                className="cursor-pointer group border-4 border-[#030712] bg-[#f8fafc] dark:bg-[#0f172a] shadow-[6px_6px_0px_0px_#030712] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#030712] transition-all flex flex-col justify-between p-5 space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-xs font-bold">
                    <span className="px-2 py-0.5 bg-[#10b981] text-[#030712] border border-[#030712]">
                      {slide.plateCode}
                    </span>
                    <span>{slide.budgetKes}</span>
                  </div>
                  <h3 className="font-display text-xl font-black uppercase group-hover:text-[#10b981] transition-colors">
                    {slide.title}
                  </h3>
                  <p className="font-mono text-xs text-slate-600 dark:text-slate-300">
                    {slide.specs.join(" • ")}
                  </p>
                </div>
                <div className="pt-3 border-t-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-between font-mono text-xs font-bold">
                  <span>{slide.status}</span>
                  <span className="underline">INSPECT SLIDE -&gt;</span>
                </div>
              </div>
            ))}

            <a
              href="#/submit-build"
              className="border-4 border-dashed border-[#030712] dark:border-slate-500 bg-white dark:bg-[#090d16] p-6 flex flex-col items-center justify-center text-center space-y-3 hover:border-[#10b981] transition-colors"
            >
              <div className="w-12 h-12 bg-[#f59e0b] text-[#030712] border-2 border-[#030712] flex items-center justify-center shadow-[3px_3px_0px_0px_#030712]">
                <Plus className="w-6 h-6 stroke-[3]" />
              </div>
              <h4 className="font-display text-lg font-black uppercase">
                /// Your Turn. Put It On The Wall.
              </h4>
              <p className="font-mono text-xs text-slate-600 dark:text-slate-400 max-w-xs">
                One workshop photo and four answers. Takes 10 minutes, free, and helps the next student build.
              </p>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
