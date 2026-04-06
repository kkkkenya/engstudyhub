import { useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "@/assets/logo.png";
import { ArrowLeft, MessageCircle } from "lucide-react";

const DISCORD_URL = "https://discord.gg/7yUz2rXumm";
const WHATSAPP_URL = "https://wa.me/254745947704";

const projects = [
  {
    id: 1,
    title: "Pipe flow pressure drop experiment",
    discipline: "Fluid Mechanics",
    difficulty: "Beginner" as const,
    year: "Year 2",
    duration: "1–2 weeks",
    budget: "KES 800",
    desc: "Measure pressure losses in pipe systems using a simple manometer rig. Validates the Darcy-Weisbach equation experimentally with real data.",
    topics: ["Bernoulli's equation", "Pipe flow", "Pressure measurement", "Reynolds number"],
    steps: [
      "Assemble PVC pipe circuit with varying diameters and fittings",
      "Connect U-tube manometers at inlet and outlet points",
      "Run water at different flow rates using a bucket and stopwatch",
      "Record pressure readings and calculate head loss at each point",
      "Compare results to theoretical Darcy-Weisbach predictions",
      "Write lab report with error analysis and percentage deviation",
    ],
    tools: [
      { name: "PVC pipes", type: "Material" },
      { name: "U-tube manometer", type: "Instrument" },
      { name: "Stopwatch", type: "Equipment" },
      { name: "Excel / Python", type: "Software" },
    ],
    resources: [
      { item: "PVC pipes & fittings", source: "Kiambu Rd hardware", cost: "KES 350" },
      { item: "Rubber tubing (manometer)", source: "Gikomba market", cost: "KES 200" },
      { item: "Water bucket & tap", source: "Campus lab", cost: "KES 0" },
    ],
    squadReady: true,
  },
  {
    id: 2,
    title: "Truss bridge load testing",
    discipline: "Structural Engineering",
    difficulty: "Intermediate" as const,
    year: "Year 2",
    duration: "3–4 weeks",
    budget: "KES 2,500",
    desc: "Design, build and load-test a balsa wood or mild steel truss bridge. Calculate theoretical vs actual failure loads and document failure modes.",
    topics: ["Statics", "Method of joints", "Beam theory", "Material properties", "Factor of safety"],
    steps: [
      "Select span length and calculate design load using statics",
      "Draw truss geometry and identify tension/compression members",
      "Cut and assemble members using balsa wood or mild steel",
      "Apply incremental loads using water containers as weights",
      "Record midspan deflection using a ruler or dial gauge",
      "Compare experimental vs theoretical results and document failure mode",
    ],
    tools: [
      { name: "Balsa wood / mild steel", type: "Material" },
      { name: "Vernier caliper", type: "Instrument" },
      { name: "MATLAB / Excel", type: "Software" },
      { name: "Hot glue / welding", type: "Equipment" },
    ],
    resources: [
      { item: "Balsa wood sheets", source: "Westlands craft shops", cost: "KES 600" },
      { item: "Weights (water bottles)", source: "Any supermarket", cost: "KES 150" },
      { item: "Dial gauge (borrow)", source: "Campus structures lab", cost: "KES 0" },
    ],
    squadReady: true,
  },
  {
    id: 3,
    title: "IoT smart irrigation controller",
    discipline: "Mechatronics",
    difficulty: "Advanced" as const,
    year: "Year 3",
    duration: "1 semester",
    budget: "KES 4,500",
    desc: "Build an Arduino-based irrigation system that reads soil moisture and controls a water pump automatically via relay. Real-world IoT project.",
    topics: ["Embedded systems", "Sensor integration", "Control systems", "IoT", "Power electronics"],
    steps: [
      "Select and wire soil moisture sensor to Arduino analog pin",
      "Program threshold logic — pump activates below 30% moisture",
      "Wire relay module to control 12V submersible water pump",
      "Add LCD display for real-time moisture and pump status readout",
      "Deploy in a plant pot and test continuously for one week",
      "Document code, circuit diagram, and performance data in report",
    ],
    tools: [
      { name: "Arduino Uno", type: "Hardware" },
      { name: "Soil moisture sensor", type: "Sensor" },
      { name: "5V relay module", type: "Hardware" },
      { name: "Arduino IDE", type: "Software" },
      { name: "Tinkercad", type: "Software" },
    ],
    resources: [
      { item: "Arduino Uno clone", source: "Jumia Kenya", cost: "KES 1,200" },
      { item: "Soil moisture sensor", source: "Jumia / Kampala Rd", cost: "KES 350" },
      { item: "Relay + pump kit", source: "Kampala Road electronics", cost: "KES 1,800" },
      { item: "Jumper wires & breadboard", source: "Kampala Road", cost: "KES 400" },
    ],
    squadReady: true,
  },
  {
    id: 4,
    title: "Heat exchanger efficiency analysis",
    discipline: "Thermodynamics",
    difficulty: "Intermediate" as const,
    year: "Year 3",
    duration: "3–4 weeks",
    budget: "KES 1,200",
    desc: "Build a simple double-pipe heat exchanger and measure effectiveness using hot and cold water streams with NTU and LMTD methods.",
    topics: ["Heat transfer", "NTU method", "Energy balance", "Thermodynamic efficiency", "LMTD"],
    steps: [
      "Construct double-pipe exchanger using copper and PVC pipes",
      "Instrument inlet/outlet ports with K-type thermocouples",
      "Run parallel and counter-flow configurations separately",
      "Record temperatures at steady state for 5 flow rate combinations",
      "Calculate effectiveness using the NTU method for each case",
      "Compare parallel vs counter-flow results and plot on a graph",
    ],
    tools: [
      { name: "Copper pipe", type: "Material" },
      { name: "K-type thermocouple", type: "Instrument" },
      { name: "Digital thermometer", type: "Instrument" },
      { name: "Excel / Python", type: "Software" },
    ],
    resources: [
      { item: "Copper pipe (1m)", source: "Kiambu Rd plumbing shops", cost: "KES 550" },
      { item: "Digital thermometer x2", source: "Jumia Kenya", cost: "KES 500" },
      { item: "Insulation tape & fittings", source: "Hardware store", cost: "KES 200" },
    ],
    squadReady: false,
  },
  {
    id: 5,
    title: "Traffic light controller with Arduino",
    discipline: "Electrical Engineering",
    difficulty: "Beginner" as const,
    year: "Year 1",
    duration: "1–2 weeks",
    budget: "KES 700",
    desc: "Program a realistic traffic light sequence with pedestrian crossing using Arduino and LEDs. Perfect intro to embedded systems and digital logic.",
    topics: ["Digital electronics", "Timing circuits", "Embedded C", "GPIO control", "Circuit design"],
    steps: [
      "Wire 6 LEDs (R/Y/G x2) on breadboard with 220Ω resistors",
      "Write state machine in Arduino IDE for normal traffic cycle",
      "Add push button to trigger pedestrian crossing mode",
      "Implement buzzer for audible pedestrian signal output",
      "Test all states and edge cases thoroughly",
      "Draw circuit schematic in Tinkercad and write documentation",
    ],
    tools: [
      { name: "Arduino Uno", type: "Hardware" },
      { name: "LEDs & resistors", type: "Component" },
      { name: "Arduino IDE", type: "Software" },
      { name: "Tinkercad", type: "Software" },
      { name: "Breadboard", type: "Hardware" },
    ],
    resources: [
      { item: "Arduino Uno clone", source: "Jumia Kenya", cost: "KES 1,200" },
      { item: "LED + resistor kit", source: "Kampala Road", cost: "KES 200" },
      { item: "Breadboard + wires", source: "Kampala Road", cost: "KES 300" },
    ],
    squadReady: false,
  },
  {
    id: 6,
    title: "Water quality monitoring dashboard",
    discipline: "Environmental Engineering",
    difficulty: "Intermediate" as const,
    year: "Year 3",
    duration: "3–4 weeks",
    budget: "KES 3,000",
    desc: "Build a sensor array to measure pH, turbidity, and temperature of water samples and display live readings on a web dashboard.",
    topics: ["Environmental monitoring", "Sensor systems", "Data logging", "IoT", "Water treatment"],
    steps: [
      "Connect pH, turbidity, and DS18B20 temperature sensors to Arduino",
      "Log readings every 30 seconds to SD card module",
      "Upload data to Google Sheets via ESP8266 WiFi module",
      "Build a live dashboard using ThingSpeak or Google Data Studio",
      "Test with tap water, river water, and controlled lab samples",
      "Write a report comparing your data to WHO water quality standards",
    ],
    tools: [
      { name: "Arduino + ESP8266", type: "Hardware" },
      { name: "pH sensor", type: "Sensor" },
      { name: "Turbidity sensor", type: "Sensor" },
      { name: "ThingSpeak", type: "Platform" },
      { name: "Google Sheets", type: "Software" },
    ],
    resources: [
      { item: "pH sensor module", source: "Jumia Kenya", cost: "KES 1,400" },
      { item: "ESP8266 WiFi module", source: "Kampala Road", cost: "KES 400" },
      { item: "Turbidity sensor", source: "Jumia Kenya", cost: "KES 600" },
      { item: "SD card module", source: "Kampala Road", cost: "KES 300" },
    ],
    squadReady: true,
  },
  {
    id: 7,
    title: "Bernoulli's theorem demonstration rig",
    discipline: "Fluid Mechanics",
    difficulty: "Beginner" as const,
    year: "Year 1",
    duration: "1–2 weeks",
    budget: "KES 600",
    desc: "Build a venturi tube demonstration rig to verify Bernoulli's theorem using manometer readings at varying cross-sections of flow.",
    topics: ["Bernoulli's equation", "Fluid statics", "Continuity equation", "Pressure measurement"],
    steps: [
      "Cut and shape clear PVC pipe into a converging-diverging section",
      "Drill ports at 4 points along the tube and fit manometer tubes",
      "Connect to water source and measure static head at each point",
      "Calculate velocity at each section using continuity equation",
      "Verify Bernoulli's equation — total head should remain constant",
      "Tabulate results and compute percentage error from theory",
    ],
    tools: [
      { name: "Clear PVC pipe", type: "Material" },
      { name: "Manometer tubes", type: "Instrument" },
      { name: "Ruler & level", type: "Equipment" },
      { name: "Excel", type: "Software" },
    ],
    resources: [
      { item: "Clear PVC tube", source: "Kiambu Rd hardware", cost: "KES 300" },
      { item: "Rubber tubing", source: "Gikomba market", cost: "KES 150" },
      { item: "Epoxy sealant", source: "Hardware store", cost: "KES 120" },
    ],
    squadReady: false,
  },
  {
    id: 8,
    title: "UAV drone frame design & simulation",
    discipline: "Mechatronics",
    difficulty: "Advanced" as const,
    year: "Year 4",
    duration: "1 semester",
    budget: "KES 5,000",
    desc: "Design a quadcopter frame in SolidWorks, run FEA stress analysis, then build and flight-test a working prototype at campus.",
    topics: ["Aerodynamics", "FEA", "CAD design", "Control systems", "Propulsion"],
    steps: [
      "Research quadcopter arm geometry and motor mounting requirements",
      "Model the frame in SolidWorks with correct material properties",
      "Run static FEA under maximum thrust load — identify stress concentrations",
      "Redesign weak points and re-run analysis until factor of safety is met",
      "3D print or cut frame from aluminium sheet at campus FabLab",
      "Mount motors, ESCs, flight controller and perform maiden flight test",
    ],
    tools: [
      { name: "SolidWorks", type: "Software" },
      { name: "ANSYS / SimScale", type: "Software" },
      { name: "3D printer", type: "Equipment" },
      { name: "Multimeter", type: "Instrument" },
      { name: "Betaflight", type: "Software" },
    ],
    resources: [
      { item: "Brushless motors x4", source: "Jumia Kenya", cost: "KES 2,400" },
      { item: "Flight controller (F405)", source: "Jumia Kenya", cost: "KES 1,200" },
      { item: "3D print filament", source: "Campus FabLab / iHub", cost: "KES 800" },
      { item: "Propellers + ESCs", source: "Jumia Kenya", cost: "KES 900" },
    ],
    squadReady: true,
  },
];

type Project = typeof projects[number];

const DISCIPLINES = ["All disciplines", "Fluid Mechanics", "Thermodynamics", "Structural Engineering", "Electrical Engineering", "Mechatronics", "Software Engineering", "Environmental Engineering"];
const DIFFICULTIES = ["All levels", "Beginner", "Intermediate", "Advanced"];
const YEARS = ["All years", "Year 1", "Year 2", "Year 3", "Year 4"];
const DURATIONS = ["Any duration", "1–2 weeks", "3–4 weeks", "1 semester"];

const diffColors: Record<string, string> = {
  Beginner: "bg-emerald-100 text-emerald-800",
  Intermediate: "bg-amber-100 text-amber-800",
  Advanced: "bg-red-100 text-red-800",
};

const discColors: Record<string, string> = {
  "Fluid Mechanics": "bg-blue-50 text-blue-700",
  "Thermodynamics": "bg-orange-50 text-orange-700",
  "Structural Engineering": "bg-stone-100 text-stone-700",
  "Electrical Engineering": "bg-yellow-50 text-yellow-700",
  "Mechatronics": "bg-purple-50 text-purple-700",
  "Software Engineering": "bg-cyan-50 text-cyan-700",
  "Environmental Engineering": "bg-green-50 text-green-700",
};

export default function Projects() {
  const [search, setSearch] = useState("");
  const [fDisc, setFDisc] = useState("All disciplines");
  const [fDiff, setFDiff] = useState("All levels");
  const [fYear, setFYear] = useState("All years");
  const [fDur, setFDur] = useState("Any duration");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = projects.filter((p) => {
    const q = search.toLowerCase();
    const text = (p.title + p.desc + p.topics.join(" ") + p.tools.map((t) => t.name).join(" ")).toLowerCase();
    if (q && !text.includes(q)) return false;
    if (fDisc !== "All disciplines" && p.discipline !== fDisc) return false;
    if (fDiff !== "All levels" && p.difficulty !== fDiff) return false;
    if (fYear !== "All years" && p.year !== fYear) return false;
    if (fDur !== "Any duration" && p.duration !== fDur) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      {/* Header */}
      <div className="border-b border-white/10 bg-gray-950/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <img src={logoImg} alt="Engineering Hub" className="h-8 w-8 rounded-lg object-contain" />
              <span className="font-semibold tracking-tight hidden sm:inline">Engineering Hub</span>
            </Link>
            <span className="text-white/30 hidden sm:inline">/</span>
            <span className="text-white/60 text-sm">Project Library</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xs text-white/50 hover:text-white transition flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Back
            </Link>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="text-xs bg-white/10 hover:bg-white/20 transition px-3 py-1.5 rounded-lg"
            >
              Join Discord →
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Hero */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-block text-xs font-medium bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            We don't just study. We build.
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Engineering project library
          </h1>
          <p className="text-white/50 text-base sm:text-lg max-w-2xl">
            Step-by-step projects for Kenyan engineering students — with tools, KES budgets, Nairobi material sources, and squad links.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {[
            { num: filtered.length, label: "Projects shown" },
            { num: "KES 600–5k", label: "Budget range" },
            { num: "7", label: "Disciplines" },
            { num: "4", label: "Year levels" },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10">
              <div className="text-xl sm:text-2xl font-bold text-white">{s.num}</div>
              <div className="text-xs text-white/40 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects, topics, tools..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 mb-4 transition"
        />

        {/* Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 sm:mb-8">
          {[
            { val: fDisc, set: setFDisc, opts: DISCIPLINES, label: "Discipline" },
            { val: fDiff, set: setFDiff, opts: DIFFICULTIES, label: "Difficulty" },
            { val: fYear, set: setFYear, opts: YEARS, label: "Year" },
            { val: fDur, set: setFDur, opts: DURATIONS, label: "Duration" },
          ].map((f) => (
            <div key={f.label}>
              <label className="block text-xs text-white/40 mb-1">{f.label}</label>
              <select
                value={f.val}
                onChange={(e) => f.set(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500/50 cursor-pointer"
              >
                {f.opts.map((o) => (
                  <option key={o} value={o} className="bg-gray-900">
                    {o}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-white/30">
            No projects match your filters. Try adjusting your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filtered.map((p) => (
              <div
                key={p.id}
                onClick={() => setSelected(p)}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 cursor-pointer hover:border-orange-500/40 hover:bg-white/[0.08] transition group flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-lg ${diffColors[p.difficulty]}`}>
                    {p.difficulty}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-lg ${discColors[p.discipline] || "bg-white/10 text-white/60"}`}>
                    {p.discipline}
                  </span>
                </div>
                <h3 className="font-semibold text-base mb-2 group-hover:text-orange-400 transition leading-snug">
                  {p.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4 flex-1">{p.desc}</p>
                <div className="flex flex-wrap gap-3 text-xs text-white/40 mb-4">
                  <span>⏱ {p.duration}</span>
                  <span>📅 {p.year}</span>
                  <span>💰 {p.budget}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.topics.slice(0, 3).map((t) => (
                    <span key={t} className="text-xs bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-md">
                      {t}
                    </span>
                  ))}
                  {p.topics.length > 3 && (
                    <span className="text-xs bg-white/10 text-white/40 px-2 py-0.5 rounded-md">
                      +{p.topics.length - 3}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-auto">
                  {p.squadReady ? (
                    <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">
                      Squad ready
                    </span>
                  ) : (
                    <span className="text-xs text-white/30">Solo project</span>
                  )}
                  <span className="text-xs text-orange-400 group-hover:underline">View project →</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* WhatsApp CTA */}
        <div className="mt-10 bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
          <h3 className="text-lg font-bold mb-2">Need help picking a project?</h3>
          <p className="text-white/50 text-sm mb-4">Chat with us on WhatsApp — we'll match you with the right project for your year and skill level.</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-5 py-2.5 rounded-xl transition"
          >
            <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center p-4 sm:p-8 overflow-y-auto"
          onClick={(e) => e.target === e.currentTarget && setSelected(null)}
        >
          <div className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-2xl my-8 sm:my-auto">
            <div className="p-5 sm:p-6 border-b border-white/10 flex items-start justify-between">
              <div>
                <div className="flex gap-2 mb-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-lg ${diffColors[selected.difficulty]}`}>
                    {selected.difficulty}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-lg ${discColors[selected.discipline] || "bg-white/10 text-white/60"}`}>
                    {selected.discipline}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold leading-snug">{selected.title}</h2>
                <div className="flex flex-wrap gap-3 sm:gap-4 mt-2 text-sm text-white/40">
                  <span>⏱ {selected.duration}</span>
                  <span>📅 {selected.year}</span>
                  <span>💰 Budget: <span className="text-orange-400 font-medium">{selected.budget}</span></span>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-white/40 hover:text-white ml-4 text-xl leading-none"
              >
                ✕
              </button>
            </div>
            <div className="p-5 sm:p-6 space-y-6">
              <p className="text-white/60 text-sm leading-relaxed">{selected.desc}</p>

              {/* Topics */}
              <div>
                <div className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Topics covered</div>
                <div className="flex flex-wrap gap-2">
                  {selected.topics.map((t) => (
                    <span key={t} className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Steps */}
              <div>
                <div className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Step-by-step guide</div>
                <div className="space-y-3">
                  {selected.steps.map((s, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="min-w-[24px] h-6 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-bold shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-sm text-white/60 leading-relaxed pt-0.5">{s}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div>
                <div className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Tools & software</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {selected.tools.map((t) => (
                    <div key={t.name} className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="text-sm font-medium text-white">{t.name}</div>
                      <div className="text-xs text-white/40 mt-0.5">{t.type}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div>
                <div className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">
                  Materials & cost (Nairobi)
                </div>
                <div className="rounded-xl border border-white/10 overflow-hidden">
                  {selected.resources.map((r, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between px-4 py-3 ${i !== selected.resources.length - 1 ? "border-b border-white/10" : ""}`}
                    >
                      <div>
                        <div className="text-sm font-medium text-white">{r.item}</div>
                        <div className="text-xs text-white/40">{r.source}</div>
                      </div>
                      <div className="text-sm font-bold text-orange-400">{r.cost}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {selected.squadReady && (
                  <a
                    href={DISCORD_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center text-sm bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-xl transition"
                  >
                    Find a squad on Discord →
                  </a>
                )}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center text-sm bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-xl transition inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" /> Ask on WhatsApp
                </a>
                <button
                  onClick={() => setSelected(null)}
                  className="flex-1 text-sm border border-white/20 hover:bg-white/10 text-white/70 py-2.5 rounded-xl transition"
                >
                  Back to projects
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
