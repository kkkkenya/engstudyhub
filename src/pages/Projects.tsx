import { useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "@/assets/logo.png";
import { ArrowLeft, MessageCircle } from "lucide-react";

const DISCORD_URL = "https://discord.gg/7yUz2rXumm";
const WHATSAPP_URL = "https://wa.me/254745947704";

type Difficulty = "Beginner" | "Intermediate" | "Advanced";

const projects: {
  id: number;
  title: string;
  discipline: string;
  difficulty: Difficulty;
  year: string;
  duration: string;
  budget: string;
  desc: string;
  topics: string[];
  steps: string[];
  tools: { name: string; type: string }[];
  resources: { item: string; source: string; cost: string }[];
  squadReady: boolean;
}[] = [
  // ─── ORIGINAL PROJECTS ───────────────────────────────────────
  {
    id: 1,
    title: "Pipe flow pressure drop experiment",
    discipline: "Fluid Mechanics",
    difficulty: "Beginner",
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
    difficulty: "Intermediate",
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
    difficulty: "Advanced",
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
    difficulty: "Intermediate",
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
    difficulty: "Beginner",
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
    difficulty: "Intermediate",
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
    difficulty: "Beginner",
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
    difficulty: "Advanced",
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

  // ─── MECHANICAL ENGINEERING ──────────────────────────────────
  {
    id: 9,
    title: "Stirling engine build from scrap materials",
    discipline: "Mechanical Engineering",
    difficulty: "Intermediate",
    year: "Year 2",
    duration: "3–4 weeks",
    budget: "KES 1,800",
    desc: "Build a working low-temperature Stirling engine from tin cans and scrap metal. Demonstrates thermodynamic cycles and heat-to-work conversion hands-on.",
    topics: ["Thermodynamic cycles", "Heat engines", "Carnot efficiency", "Mechanical linkages", "Energy conversion"],
    steps: [
      "Source two different-diameter tin cans for the hot and cold cylinders",
      "Cut and shape a displacer piston from steel wool or foam",
      "Fabricate the power piston from a plastic syringe or PVC",
      "Assemble crankshaft from wire and connect pistons with 90° phase offset",
      "Place engine over a candle or hot water cup and spin flywheel to start",
      "Measure RPM at different temperature differentials and calculate thermal efficiency",
    ],
    tools: [
      { name: "Tin cans", type: "Material" },
      { name: "Steel wool / foam", type: "Material" },
      { name: "Hacksaw & drill", type: "Equipment" },
      { name: "Tachometer / phone app", type: "Instrument" },
    ],
    resources: [
      { item: "Tin cans (sourced)", source: "Any kitchen / supermarket", cost: "KES 0" },
      { item: "Mild steel wire (crankshaft)", source: "Kiambu Rd hardware", cost: "KES 150" },
      { item: "Epoxy adhesive", source: "Hardware store", cost: "KES 200" },
      { item: "Plastic syringe (power piston)", source: "Pharmacy", cost: "KES 80" },
    ],
    squadReady: false,
  },
  {
    id: 10,
    title: "Manual hydraulic jack analysis",
    discipline: "Mechanical Engineering",
    difficulty: "Beginner",
    year: "Year 1",
    duration: "1–2 weeks",
    budget: "KES 500",
    desc: "Disassemble a bottle jack, measure cylinder dimensions, and verify Pascal's law by calculating mechanical advantage and comparing to measured lift force.",
    topics: ["Pascal's law", "Fluid statics", "Mechanical advantage", "Hydraulic systems", "Force analysis"],
    steps: [
      "Borrow or purchase a small bottle jack from a hardware store",
      "Measure ram diameter, handle length, and pump cylinder bore",
      "Calculate theoretical mechanical advantage using Pascal's law",
      "Apply known weights and measure required handle force with a spring balance",
      "Compare theoretical vs experimental mechanical advantage",
      "Write report explaining sources of friction loss and efficiency",
    ],
    tools: [
      { name: "Bottle jack", type: "Equipment" },
      { name: "Vernier caliper", type: "Instrument" },
      { name: "Spring balance", type: "Instrument" },
      { name: "Excel", type: "Software" },
    ],
    resources: [
      { item: "Small bottle jack (2 ton)", source: "Kirinyaga Rd hardware", cost: "KES 900" },
      { item: "Spring balance", source: "Campus lab", cost: "KES 0" },
      { item: "Known weights (water bottles)", source: "Any supermarket", cost: "KES 100" },
    ],
    squadReady: false,
  },
  {
    id: 11,
    title: "Belt and pulley power transmission rig",
    discipline: "Mechanical Engineering",
    difficulty: "Beginner",
    year: "Year 2",
    duration: "1–2 weeks",
    budget: "KES 1,200",
    desc: "Build a belt-and-pulley rig driven by a small DC motor. Measure speed ratios, belt tension, and power transmission efficiency across different pulley size combinations.",
    topics: ["Power transmission", "Belt drives", "Speed ratios", "Torque", "Mechanical efficiency"],
    steps: [
      "Mount two pulleys of different diameters on shafts fixed to a wooden base",
      "Connect a small DC motor to the driving pulley via a V-belt",
      "Measure input and output shaft speeds using a tachometer",
      "Calculate velocity ratio and compare to theoretical pulley diameter ratio",
      "Measure belt tension on tight and slack sides using a spring balance",
      "Calculate power input and output, then determine transmission efficiency",
    ],
    tools: [
      { name: "DC motor (12V)", type: "Hardware" },
      { name: "V-belt & pulleys", type: "Mechanical" },
      { name: "Tachometer", type: "Instrument" },
      { name: "Spring balance", type: "Instrument" },
    ],
    resources: [
      { item: "DC motor 12V", source: "Kampala Road electronics", cost: "KES 400" },
      { item: "V-belt & pulley set", source: "Kirinyaga Rd hardware", cost: "KES 550" },
      { item: "Wooden base board", source: "Timber yard, Ngong Rd", cost: "KES 200" },
    ],
    squadReady: false,
  },
  {
    id: 12,
    title: "Simple gear train speed reducer",
    discipline: "Mechanical Engineering",
    difficulty: "Intermediate",
    year: "Year 2",
    duration: "3–4 weeks",
    budget: "KES 2,000",
    desc: "Design and 3D print a two-stage spur gear train that reduces input motor speed by a target ratio. Verify gear ratios, measure output torque, and document tooth geometry.",
    topics: ["Gear theory", "Velocity ratio", "Module and pitch", "Torque multiplication", "CAD design"],
    steps: [
      "Calculate required gear ratios for a target output speed",
      "Select tooth module and determine gear tooth counts",
      "Model all gears and housing in SolidWorks or Fusion 360",
      "3D print gears and housing at campus FabLab",
      "Assemble gear train and couple to DC motor",
      "Measure input/output speeds with tachometer and calculate actual ratio vs design",
    ],
    tools: [
      { name: "SolidWorks / Fusion 360", type: "Software" },
      { name: "3D printer", type: "Equipment" },
      { name: "DC motor", type: "Hardware" },
      { name: "Tachometer", type: "Instrument" },
    ],
    resources: [
      { item: "3D print filament (PLA)", source: "Campus FabLab / iHub Nairobi", cost: "KES 700" },
      { item: "DC motor + power supply", source: "Kampala Road", cost: "KES 600" },
      { item: "Steel shafts & bearings", source: "Kirinyaga Rd", cost: "KES 500" },
    ],
    squadReady: true,
  },
  {
    id: 13,
    title: "Flat plate solar collector performance test",
    discipline: "Mechanical Engineering",
    difficulty: "Intermediate",
    year: "Year 3",
    duration: "3–4 weeks",
    budget: "KES 2,800",
    desc: "Build a flat plate solar water heater collector and measure thermal efficiency under Nairobi sun conditions. Compare black-painted vs unpainted absorber plates.",
    topics: [
      "Solar thermal energy",
      "Heat transfer",
      "Collector efficiency",
      "Radiation heat transfer",
      "Renewable energy",
    ],
    steps: [
      "Fabricate a shallow wooden box lined with insulation and glazed with clear acrylic",
      "Install a copper pipe serpentine as the absorber and paint it matte black",
      "Connect inlet and outlet to a water storage tank",
      "Mount collector at optimal tilt angle for Nairobi latitude (1.3°S)",
      "Run water through at set flow rate and record inlet/outlet temps hourly",
      "Calculate collector efficiency and compare to theoretical maximum",
    ],
    tools: [
      { name: "Copper pipe", type: "Material" },
      { name: "Clear acrylic sheet", type: "Material" },
      { name: "Digital thermometer x2", type: "Instrument" },
      { name: "Excel / Python", type: "Software" },
    ],
    resources: [
      { item: "Copper pipe serpentine", source: "Kiambu Rd plumbing", cost: "KES 900" },
      { item: "Clear acrylic sheet", source: "Westlands plastics", cost: "KES 700" },
      { item: "Rockwool insulation", source: "Timber & hardware store", cost: "KES 500" },
      { item: "Matte black spray paint", source: "Supermarket", cost: "KES 250" },
    ],
    squadReady: true,
  },
  {
    id: 14,
    title: "Vibration analysis of a simply supported beam",
    discipline: "Mechanical Engineering",
    difficulty: "Intermediate",
    year: "Year 3",
    duration: "3–4 weeks",
    budget: "KES 1,500",
    desc: "Mount an accelerometer on a steel beam, strike it with an impulse, and extract the natural frequency. Compare experimental results to Euler-Bernoulli beam theory.",
    topics: [
      "Structural dynamics",
      "Natural frequency",
      "Euler-Bernoulli theory",
      "Accelerometers",
      "Signal processing",
    ],
    steps: [
      "Clamp a mild steel flat bar as a simply supported beam on a rigid frame",
      "Attach a small accelerometer or piezo sensor near midspan",
      "Strike the beam with a rubber mallet and record the vibration signal",
      "Use a free FFT app (e.g. Spectroid on Android) to identify peak frequency",
      "Calculate theoretical natural frequency using beam dimensions and material properties",
      "Compare experimental vs theoretical results and discuss damping effects",
    ],
    tools: [
      { name: "Mild steel flat bar", type: "Material" },
      { name: "Accelerometer / piezo sensor", type: "Instrument" },
      { name: "Spectroid app (Android)", type: "Software" },
      { name: "MATLAB / Python FFT", type: "Software" },
    ],
    resources: [
      { item: "Mild steel flat bar (1m)", source: "Kirinyaga Rd steel shops", cost: "KES 400" },
      { item: "Piezo sensor module", source: "Kampala Road electronics", cost: "KES 300" },
      { item: "Clamps & support frame", source: "Campus structures lab", cost: "KES 0" },
    ],
    squadReady: false,
  },
  {
    id: 15,
    title: "Refrigeration cycle COP measurement",
    discipline: "Mechanical Engineering",
    difficulty: "Advanced",
    year: "Year 3",
    duration: "3–4 weeks",
    budget: "KES 800",
    desc: "Instrument a domestic mini-fridge with temperature and current sensors to measure its real-world Coefficient of Performance. Compare to ideal vapour-compression cycle COP.",
    topics: ["Vapour compression cycle", "COP", "Refrigerants", "Thermodynamic cycles", "Enthalpy"],
    steps: [
      "Attach K-type thermocouples at evaporator and condenser inlet/outlet points",
      "Connect a current clamp meter to measure compressor power draw",
      "Run the fridge at different thermostat settings and record data every 5 minutes",
      "Calculate actual COP = Q_evap / W_compressor for each setting",
      "Use refrigerant P-h chart to estimate ideal cycle COP",
      "Compare actual vs ideal COP and explain sources of irreversibility",
    ],
    tools: [
      { name: "Mini fridge (borrowed)", type: "Equipment" },
      { name: "K-type thermocouple x4", type: "Instrument" },
      { name: "Current clamp meter", type: "Instrument" },
      { name: "Excel / Python", type: "Software" },
    ],
    resources: [
      { item: "K-type thermocouple probes x4", source: "Jumia Kenya", cost: "KES 600" },
      { item: "Current clamp meter", source: "Kampala Road", cost: "KES 900" },
      { item: "Mini fridge (borrow from hostel)", source: "Hostels / home", cost: "KES 0" },
    ],
    squadReady: false,
  },
  {
    id: 16,
    title: "Wind turbine blade design and test",
    discipline: "Mechanical Engineering",
    difficulty: "Advanced",
    year: "Year 4",
    duration: "1 semester",
    budget: "KES 3,500",
    desc: "Design NACA-profile wind turbine blades in SolidWorks, 3D print them, and test power output in front of a box fan at different pitch angles and wind speeds.",
    topics: ["Aerodynamics", "NACA profiles", "Blade element momentum theory", "Renewable energy", "CAD/CAM"],
    steps: [
      "Study NACA aerofoil profiles and select a suitable section (e.g. NACA 4412)",
      "Design 3-blade rotor with variable twist and taper in SolidWorks",
      "Run basic CFD analysis in SimScale to estimate lift/drag ratio",
      "3D print blades and mount on a DC motor shaft to act as generator",
      "Test in front of a box fan at 3 wind speed settings with a multimeter measuring output voltage",
      "Plot power coefficient (Cp) vs tip speed ratio and compare to Betz limit",
    ],
    tools: [
      { name: "SolidWorks", type: "Software" },
      { name: "SimScale (free CFD)", type: "Software" },
      { name: "3D printer", type: "Equipment" },
      { name: "Multimeter", type: "Instrument" },
      { name: "Box fan", type: "Equipment" },
    ],
    resources: [
      { item: "3D print filament (PETG)", source: "Campus FabLab / iHub", cost: "KES 1,200" },
      { item: "DC generator motor", source: "Kampala Road", cost: "KES 600" },
      { item: "Anemometer (borrow)", source: "Campus lab", cost: "KES 0" },
      { item: "Bearings & hub hardware", source: "Kirinyaga Rd", cost: "KES 500" },
    ],
    squadReady: true,
  },
  {
    id: 17,
    title: "CNC router toolpath programming",
    discipline: "Mechanical Engineering",
    difficulty: "Advanced",
    year: "Year 4",
    duration: "3–4 weeks",
    budget: "KES 1,000",
    desc: "Design a mechanical component in Fusion 360, generate CAM toolpaths, and machine it on the campus CNC router. Focuses on feeds, speeds, and tolerance achievement.",
    topics: ["CAD/CAM", "CNC machining", "G-code programming", "Manufacturing tolerances", "Cutting parameters"],
    steps: [
      "Design a test component (bracket or logo plate) in Fusion 360 with 3 or more features",
      "Set up CAM workspace — define stock, WCS, and tool library",
      "Generate 2D contour and pocket toolpaths with appropriate feeds and speeds",
      "Simulate toolpath in Fusion 360 and check for collisions",
      "Post-process G-code and load to campus CNC router",
      "Machine part, measure critical dimensions with vernier caliper, and compare to design",
    ],
    tools: [
      { name: "Fusion 360", type: "Software" },
      { name: "CNC router (campus)", type: "Equipment" },
      { name: "Vernier caliper", type: "Instrument" },
      { name: "End mills (6mm)", type: "Tooling" },
    ],
    resources: [
      { item: "MDF / aluminium stock", source: "Campus workshop", cost: "KES 600" },
      { item: "End mill bits", source: "Kirinyaga Rd", cost: "KES 400" },
      { item: "Fusion 360 (free for students)", source: "Autodesk website", cost: "KES 0" },
    ],
    squadReady: true,
  },
  {
    id: 18,
    title: "Tensile testing of mild steel vs aluminium",
    discipline: "Mechanical Engineering",
    difficulty: "Beginner",
    year: "Year 2",
    duration: "1–2 weeks",
    budget: "KES 600",
    desc: "Machine dog-bone specimens from mild steel and aluminium, run tensile tests on a UTM machine, and plot stress-strain curves to extract Young's modulus, yield stress, and UTS.",
    topics: ["Material properties", "Stress-strain curve", "Young's modulus", "Yield strength", "Ductility"],
    steps: [
      "Machine or file dog-bone specimens to standard gauge dimensions",
      "Measure original cross-section area and gauge length accurately",
      "Load specimens in the Universal Testing Machine (UTM) at campus lab",
      "Record load vs extension data until fracture",
      "Plot engineering stress-strain curves for both materials",
      "Extract Young's modulus, 0.2% proof stress, UTS, and elongation at fracture",
    ],
    tools: [
      { name: "Universal Testing Machine", type: "Equipment" },
      { name: "Vernier caliper", type: "Instrument" },
      { name: "Excel / MATLAB", type: "Software" },
      { name: "File / lathe", type: "Equipment" },
    ],
    resources: [
      { item: "Mild steel flat bar", source: "Kirinyaga Rd", cost: "KES 200" },
      { item: "Aluminium flat bar", source: "Kirinyaga Rd", cost: "KES 350" },
      { item: "UTM machine access", source: "Campus materials lab", cost: "KES 0" },
    ],
    squadReady: false,
  },

  // ─── AEROSPACE ENGINEERING ───────────────────────────────────
  {
    id: 19,
    title: "Subsonic wind tunnel aerofoil test",
    discipline: "Aerospace Engineering",
    difficulty: "Advanced",
    year: "Year 3",
    duration: "3–4 weeks",
    budget: "KES 2,000",
    desc: "3D print a NACA 0012 aerofoil model, instrument it with pressure tappings, and test it in the campus subsonic wind tunnel to measure lift coefficient vs angle of attack.",
    topics: ["Aerodynamics", "Lift and drag", "NACA aerofoils", "Pressure distribution", "Boundary layer"],
    steps: [
      "Download NACA 0012 coordinates and model aerofoil in SolidWorks at 150mm chord",
      "Add 8 pressure tapping holes along the upper and lower surface",
      "3D print aerofoil model and seal surface with filler primer",
      "Mount in campus wind tunnel test section at 0°, 5°, 10°, 15° angle of attack",
      "Connect pressure tappings to a manometer bank and record readings at each angle",
      "Calculate Cp distribution and integrate to get lift coefficient, compare to thin aerofoil theory",
    ],
    tools: [
      { name: "SolidWorks", type: "Software" },
      { name: "3D printer", type: "Equipment" },
      { name: "Wind tunnel (campus)", type: "Equipment" },
      { name: "Manometer bank", type: "Instrument" },
    ],
    resources: [
      { item: "3D print filament (PLA)", source: "Campus FabLab", cost: "KES 800" },
      { item: "Filler primer spray", source: "Supermarket", cost: "KES 350" },
      { item: "Brass tapping inserts", source: "Kirinyaga Rd", cost: "KES 400" },
    ],
    squadReady: true,
  },
  {
    id: 20,
    title: "Model rocket design and altitude prediction",
    discipline: "Aerospace Engineering",
    difficulty: "Intermediate",
    year: "Year 2",
    duration: "3–4 weeks",
    budget: "KES 3,500",
    desc: "Design and build a single-stage model rocket with a cardboard body and balsa fins. Use OpenRocket simulation to predict apogee altitude, then launch and compare to altimeter data.",
    topics: ["Rocket propulsion", "Drag and stability", "Centre of pressure", "Centre of gravity", "Flight dynamics"],
    steps: [
      "Sketch rocket geometry — nose cone, body tube, fins, and motor mount",
      "Model design in OpenRocket (free software) and simulate altitude",
      "Adjust fin size and placement until CP is at least 1 calibre behind CG",
      "Build rocket from cardboard tube, balsa fins, and 3D printed nose cone",
      "Install a small altimeter module to record peak altitude",
      "Launch at a safe open field, recover rocket, download altitude data, and compare to simulation",
    ],
    tools: [
      { name: "OpenRocket (free)", type: "Software" },
      { name: "Balsa wood", type: "Material" },
      { name: "Cardboard tube", type: "Material" },
      { name: "Altimeter module", type: "Instrument" },
    ],
    resources: [
      { item: "Model rocket motor (Estes C6-5)", source: "Import via Jumia / hobbyist", cost: "KES 1,500" },
      { item: "Balsa fins", source: "Westlands craft shops", cost: "KES 400" },
      { item: "Altimeter module (BMP280)", source: "Kampala Road electronics", cost: "KES 350" },
      { item: "Cardboard tube & nose cone", source: "Stationery shop", cost: "KES 200" },
    ],
    squadReady: true,
  },

  // ─── ELECTRICAL ENGINEERING ──────────────────────────────────
  {
    id: 21,
    title: "Single-phase transformer design and test",
    discipline: "Electrical Engineering",
    difficulty: "Intermediate",
    year: "Year 2",
    duration: "3–4 weeks",
    budget: "KES 1,800",
    desc: "Wind and test a small single-phase step-down transformer. Measure efficiency, regulation, and no-load losses. Compare results to transformer equivalent circuit theory.",
    topics: ["Electromagnetic induction", "Transformer theory", "Core losses", "Voltage regulation", "Efficiency"],
    steps: [
      "Select an E-I laminated iron core from a scrap electronics transformer",
      "Calculate primary and secondary turns for 220V → 12V using transformer equation",
      "Wind primary and secondary coils on bobbin using enamelled copper wire",
      "Assemble core and test with a variac — measure open-circuit and short-circuit parameters",
      "Run load test at 25%, 50%, 75%, 100% of rated load",
      "Plot efficiency vs load curve and calculate voltage regulation",
    ],
    tools: [
      { name: "E-I laminated core", type: "Material" },
      { name: "Enamelled copper wire", type: "Material" },
      { name: "Variac (autotransformer)", type: "Equipment" },
      { name: "Multimeter & clamp meter", type: "Instrument" },
    ],
    resources: [
      { item: "E-I core (salvaged)", source: "Scrap electronics, Gikomba", cost: "KES 200" },
      { item: "Enamelled copper wire", source: "Kampala Road", cost: "KES 600" },
      { item: "Bobbin former", source: "Kampala Road", cost: "KES 150" },
    ],
    squadReady: false,
  },
  {
    id: 22,
    title: "Solar MPPT charge controller on breadboard",
    discipline: "Electrical Engineering",
    difficulty: "Advanced",
    year: "Year 4",
    duration: "1 semester",
    budget: "KES 4,000",
    desc: "Implement a simple Perturb & Observe MPPT algorithm on an Arduino to maximise power extraction from a small solar panel into a 12V lead-acid battery.",
    topics: ["Solar PV systems", "MPPT algorithms", "DC-DC converters", "Power electronics", "Embedded systems"],
    steps: [
      "Characterise a small solar panel — measure Voc, Isc, and P-V curve at different light levels",
      "Design a buck converter circuit to step down panel voltage to battery voltage",
      "Implement the Perturb & Observe algorithm in Arduino code",
      "Add voltage and current sensing using INA219 sensor module",
      "Test MPPT vs direct connection — compare power delivered to battery",
      "Log data and plot panel operating point tracking on P-V curve",
    ],
    tools: [
      { name: "Arduino Uno", type: "Hardware" },
      { name: "INA219 sensor", type: "Sensor" },
      { name: "MOSFET + inductor (buck converter)", type: "Component" },
      { name: "Solar panel (5W)", type: "Hardware" },
    ],
    resources: [
      { item: "5W solar panel", source: "Jumia Kenya", cost: "KES 1,200" },
      { item: "INA219 current sensor", source: "Kampala Road", cost: "KES 350" },
      { item: "Buck converter components", source: "Kampala Road", cost: "KES 700" },
      { item: "12V lead-acid battery", source: "Any auto shop", cost: "KES 1,500" },
    ],
    squadReady: true,
  },

  // ─── CIVIL ENGINEERING ───────────────────────────────────────
  {
    id: 23,
    title: "Concrete mix design and compressive strength test",
    discipline: "Civil Engineering",
    difficulty: "Beginner",
    year: "Year 2",
    duration: "3–4 weeks",
    budget: "KES 1,500",
    desc: "Design three concrete mixes at different water-cement ratios, cast 150mm cube specimens, cure for 7 and 28 days, and crush them to determine compressive strength.",
    topics: ["Concrete mix design", "Water-cement ratio", "Compressive strength", "Curing", "Construction materials"],
    steps: [
      "Design three concrete mixes at w/c ratios of 0.4, 0.5, and 0.6",
      "Weigh and mix cement, sand, aggregate, and water by hand",
      "Cast into 150mm steel cube moulds and compact with a rod",
      "Cure cubes in a water bath and label with date and mix design",
      "Crush 3 cubes per mix at 7 days and 3 at 28 days in the campus UTM",
      "Plot compressive strength vs w/c ratio and compare to target design strength",
    ],
    tools: [
      { name: "150mm cube moulds", type: "Equipment" },
      { name: "Universal Testing Machine", type: "Equipment" },
      { name: "Weighing scale", type: "Instrument" },
      { name: "Excel", type: "Software" },
    ],
    resources: [
      { item: "Cement (5kg)", source: "Kiambu Rd hardware", cost: "KES 500" },
      { item: "Sand & ballast", source: "Kiambu Rd hardware", cost: "KES 400" },
      { item: "Cube moulds (borrow)", source: "Campus civil lab", cost: "KES 0" },
    ],
    squadReady: true,
  },
  {
    id: 24,
    title: "Contour map and earthworks volume calculation",
    discipline: "Civil Engineering",
    difficulty: "Intermediate",
    year: "Year 2",
    duration: "3–4 weeks",
    budget: "KES 800",
    desc: "Use a surveying level and staff to collect grid elevations on a section of campus ground, draw contour lines, and calculate cut-and-fill volumes for a hypothetical road alignment.",
    topics: ["Surveying", "Contouring", "Earthworks", "Prismoidal formula", "Road design"],
    steps: [
      "Set up a dumpy level or total station at a known benchmark on campus",
      "Take staff readings at a 5m x 5m grid over a 30m x 30m area",
      "Reduce levels using the height of collimation method",
      "Plot the grid elevations and draw contour lines at 0.5m intervals",
      "Overlay a proposed road centerline and cross-sections at 5m intervals",
      "Calculate cut and fill volumes using the prismoidal formula",
    ],
    tools: [
      { name: "Dumpy level / total station", type: "Instrument" },
      { name: "Levelling staff", type: "Instrument" },
      { name: "AutoCAD Civil 3D", type: "Software" },
      { name: "Excel", type: "Software" },
    ],
    resources: [
      { item: "Dumpy level (borrow)", source: "Campus survey lab", cost: "KES 0" },
      { item: "Survey pegs & tape", source: "Hardware store", cost: "KES 400" },
      { item: "Field notebook", source: "Stationery", cost: "KES 100" },
    ],
    squadReady: true,
  },

  // ─── BIOMEDICAL ENGINEERING ──────────────────────────────────
  {
    id: 25,
    title: "DIY ECG signal acquisition with Arduino",
    discipline: "Biomedical Engineering",
    difficulty: "Intermediate",
    year: "Year 3",
    duration: "3–4 weeks",
    budget: "KES 2,500",
    desc: "Build a basic ECG circuit using the AD8232 heart rate monitor module, acquire signals via Arduino, and display a live waveform in the Arduino Serial Plotter or Python.",
    topics: [
      "Biosignals",
      "Instrumentation amplifiers",
      "ECG waveform",
      "Signal filtering",
      "Biopotential measurement",
    ],
    steps: [
      "Connect AD8232 ECG module to Arduino analog input",
      "Fabricate gel electrode pads from copper tape or buy disposable ECG electrodes",
      "Attach electrodes to right arm, left arm, and right leg (standard lead I)",
      "Upload Arduino code to sample at 500 Hz and stream data via serial port",
      "Plot live ECG waveform in Arduino Serial Plotter",
      "Identify P wave, QRS complex, and T wave — calculate heart rate from R-R interval",
    ],
    tools: [
      { name: "AD8232 ECG module", type: "Hardware" },
      { name: "Arduino Uno", type: "Hardware" },
      { name: "Disposable ECG electrodes", type: "Material" },
      { name: "Python (matplotlib)", type: "Software" },
    ],
    resources: [
      { item: "AD8232 ECG module", source: "Jumia Kenya", cost: "KES 1,200" },
      { item: "Disposable ECG electrodes (10 pack)", source: "Pharmacy / Aga Khan supplier", cost: "KES 400" },
      { item: "Arduino Uno clone", source: "Jumia Kenya", cost: "KES 1,200" },
    ],
    squadReady: false,
  },
  {
    id: 26,
    title: "3D printed prosthetic finger mechanism",
    discipline: "Biomedical Engineering",
    difficulty: "Advanced",
    year: "Year 4",
    duration: "1 semester",
    budget: "KES 3,500",
    desc: "Design and 3D print a cable-driven prosthetic finger that flexes and extends when a wrist tendon cable is pulled. Evaluate range of motion and grip force.",
    topics: ["Biomechanics", "Mechanism design", "Prosthetics", "Cable-driven systems", "Range of motion"],
    steps: [
      "Research human finger anatomy — phalanges, joints, and tendon routing",
      "Model a 3-phalange finger with revolute joints in SolidWorks or Fusion 360",
      "Route a nylon cable through the finger to simulate flexor tendon action",
      "3D print all components in PLA and assemble with M2 screws as pivot pins",
      "Test flexion-extension range of motion and measure grip force with a force gauge",
      "Document design, bill of materials, and compare to clinical benchmarks",
    ],
    tools: [
      { name: "SolidWorks / Fusion 360", type: "Software" },
      { name: "3D printer", type: "Equipment" },
      { name: "Force gauge", type: "Instrument" },
      { name: "Nylon cable & M2 screws", type: "Material" },
    ],
    resources: [
      { item: "PLA filament (500g)", source: "Campus FabLab / iHub", cost: "KES 1,500" },
      { item: "M2 screws & nuts (pack)", source: "Kirinyaga Rd hardware", cost: "KES 200" },
      { item: "Nylon fishing line (cable)", source: "Fishing shop", cost: "KES 100" },
      { item: "Force gauge (borrow)", source: "Campus lab", cost: "KES 0" },
    ],
    squadReady: true,
  },

  // ─── BIOSYSTEMS ENGINEERING ──────────────────────────────────
  {
    id: 27,
    title: "Automated greenhouse climate controller",
    discipline: "Biosystems Engineering",
    difficulty: "Intermediate",
    year: "Year 3",
    duration: "3–4 weeks",
    budget: "KES 3,200",
    desc: "Build a microcontroller-based system to monitor temperature, humidity, and light inside a mini greenhouse and automatically control a fan, heater, and grow light relay.",
    topics: ["Greenhouse engineering", "Climate control", "Sensor integration", "PID control", "Agricultural systems"],
    steps: [
      "Set up DHT22 temperature/humidity sensor and LDR light sensor with Arduino",
      "Connect relay modules to control a 12V fan, grow light, and small heater",
      "Write control logic — fan on if temp > 30°C, light on if lux < threshold",
      "Build a small acrylic or cardboard mini-greenhouse enclosure (50x50x80cm)",
      "Run the system for 5 days monitoring a seedling tray",
      "Log data to SD card and analyse temperature stability vs setpoint",
    ],
    tools: [
      { name: "Arduino Uno", type: "Hardware" },
      { name: "DHT22 sensor", type: "Sensor" },
      { name: "Relay module x3", type: "Hardware" },
      { name: "Arduino IDE", type: "Software" },
    ],
    resources: [
      { item: "DHT22 temperature/humidity sensor", source: "Jumia Kenya", cost: "KES 400" },
      { item: "Relay module 3-channel", source: "Kampala Road", cost: "KES 450" },
      { item: "Grow light (LED strip)", source: "Jumia Kenya", cost: "KES 700" },
      { item: "Acrylic sheet for enclosure", source: "Westlands plastics", cost: "KES 800" },
    ],
    squadReady: true,
  },
  {
    id: 28,
    title: "Drip irrigation scheduling model for smallholder farms",
    discipline: "Biosystems Engineering",
    difficulty: "Intermediate",
    year: "Year 3",
    duration: "3–4 weeks",
    budget: "KES 2,000",
    desc: "Build a Python-based crop water requirement model using FAO-56 Penman-Monteith ET0 equations for Kenyan conditions. Output an irrigation schedule for maize or kale.",
    topics: [
      "Crop water requirements",
      "Evapotranspiration",
      "FAO-56 method",
      "Irrigation scheduling",
      "Agricultural hydrology",
    ],
    steps: [
      "Download historical weather data for your county from Kenya Met Dept website",
      "Implement FAO-56 Penman-Monteith ET0 equation in Python",
      "Select crop (maize or kale) and input crop coefficients (Kc) for each growth stage",
      "Calculate daily crop water requirement (ETc = Kc × ET0) over a full season",
      "Build an irrigation schedule that accounts for rainfall and soil water holding capacity",
      "Validate model output against published irrigation guidelines for Kenya",
    ],
    tools: [
      { name: "Python (pandas, numpy)", type: "Software" },
      { name: "Kenya Met Dept data", type: "Data source" },
      { name: "FAO-56 publication", type: "Reference" },
      { name: "Excel / Google Sheets", type: "Software" },
    ],
    resources: [
      { item: "Weather data download", source: "Kenya Met Dept (meteo.go.ke)", cost: "KES 0" },
      { item: "FAO-56 paper (free PDF)", source: "fao.org", cost: "KES 0" },
      { item: "Laptop + Python (free)", source: "Anaconda / Google Colab", cost: "KES 0" },
    ],
    squadReady: false,
  },
];

type Project = (typeof projects)[number];

const DISCIPLINES = [
  "All disciplines",
  "Fluid Mechanics",
  "Thermodynamics",
  "Structural Engineering",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Mechatronics",
  "Software Engineering",
  "Environmental Engineering",
  "Aerospace Engineering",
  "Civil Engineering",
  "Biomedical Engineering",
  "Biosystems Engineering",
];
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
  Thermodynamics: "bg-orange-50 text-orange-700",
  "Structural Engineering": "bg-stone-100 text-stone-700",
  "Mechanical Engineering": "bg-red-50 text-red-700",
  "Electrical Engineering": "bg-yellow-50 text-yellow-700",
  Mechatronics: "bg-purple-50 text-purple-700",
  "Software Engineering": "bg-cyan-50 text-cyan-700",
  "Environmental Engineering": "bg-green-50 text-green-700",
  "Aerospace Engineering": "bg-sky-50 text-sky-700",
  "Civil Engineering": "bg-stone-200 text-stone-800",
  "Biomedical Engineering": "bg-pink-50 text-pink-700",
  "Biosystems Engineering": "bg-teal-50 text-teal-700",
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
    <div className="min-h-screen bg-background text-foreground font-body">
      {/* Header */}
      <div className="border-b-4 border-foreground bg-card sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <img src={logoImg} alt="Engineering Hub" className="h-8 w-8 object-contain" />
              <span className="font-display font-black tracking-tight hidden sm:inline uppercase">Engineering Hub</span>
            </Link>
            <span className="text-muted-foreground hidden sm:inline font-mono">/</span>
            <span className="text-muted-foreground text-sm font-mono">Project Library</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition flex items-center gap-1 font-mono">
              <ArrowLeft className="w-3 h-3" /> Back
            </Link>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="text-xs bg-foreground text-card font-display font-bold uppercase px-3 py-1.5 border-2 border-foreground shadow-brutal-sm hover:bg-primary transition active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
            >
              Discord →
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Hero */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-block text-xs font-display font-bold bg-primary text-foreground px-3 py-1 border-2 border-foreground mb-4 uppercase tracking-wider">
            We don't just study. We build.
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-black tracking-tight mb-3 uppercase">Engineering project library</h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl font-body">
            Step-by-step projects for Kenyan engineering students — with tools, KES budgets, Nairobi material sources,
            and squad links.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {[
            { num: filtered.length, label: "Projects shown" },
            { num: "KES 500–5k", label: "Budget range" },
            { num: "12", label: "Disciplines" },
            { num: "4", label: "Year levels" },
          ].map((s) => (
            <div key={s.label} className="bg-card p-3 sm:p-4 border-2 border-foreground shadow-brutal-sm">
              <div className="text-xl sm:text-2xl font-display font-black">{s.num}</div>
              <div className="text-xs text-muted-foreground mt-1 font-mono uppercase">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects, topics, tools..."
          className="w-full bg-card border-2 border-foreground px-4 py-3 text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary mb-4 transition"
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
              <label className="block text-xs text-muted-foreground mb-1 font-mono uppercase">{f.label}</label>
              <select
                value={f.val}
                onChange={(e) => f.set(e.target.value)}
                className="w-full bg-card border-2 border-foreground px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
              >
                {f.opts.map((o) => (
                  <option key={o} value={o}>
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
                  <span
                    className={`text-xs px-2 py-1 rounded-lg ${discColors[p.discipline] || "bg-white/10 text-white/60"}`}
                  >
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
                    <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">Squad ready</span>
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
          <p className="text-white/50 text-sm mb-4">
            Chat with us on WhatsApp — we'll match you with the right project for your year and skill level.
          </p>
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
                  <span
                    className={`text-xs px-2 py-1 rounded-lg ${discColors[selected.discipline] || "bg-white/10 text-white/60"}`}
                  >
                    {selected.discipline}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold leading-snug">{selected.title}</h2>
                <div className="flex flex-wrap gap-3 sm:gap-4 mt-2 text-sm text-white/40">
                  <span>⏱ {selected.duration}</span>
                  <span>📅 {selected.year}</span>
                  <span>
                    💰 Budget: <span className="text-orange-400 font-medium">{selected.budget}</span>
                  </span>
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
                <div className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">
                  Step-by-step guide
                </div>
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
                <div className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">
                  Tools & software
                </div>
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
                      className={`flex items-center justify-between px-4 py-3 ${
                        i !== selected.resources.length - 1 ? "border-b border-white/10" : ""
                      }`}
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
