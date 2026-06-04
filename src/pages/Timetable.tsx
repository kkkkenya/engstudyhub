import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, FileSpreadsheet } from "lucide-react";

// ─── Types ───
type DeptId = "aerospace" | "mechanical";

interface ExamEntry {
  date: string; // YYYY-MM-DD
  day: string; // Mon / Tue / etc.
  startTime: string; // HH:MM (24h)
  endTime: string;
  code: string;
  title: string;
  venue: string;
  depts: DeptId[];
}

interface DeptMeta {
  id: DeptId;
  name: string;
  shortName: string;
}

const DEPARTMENTS: DeptMeta[] = [
  { id: "mechanical", name: "Mechanical Engineering", shortName: "Mech" },
  { id: "aerospace", name: "Aerospace Engineering", shortName: "Aero" },
];

// EMM = Mechanical, EAR = Aerospace, ECU/UCU/EEE = shared
const SHARED_PREFIXES = new Set(["ECU", "UCU", "EEE"]);
const examFor = (code: string): DeptId[] => {
  const p = code.slice(0, 3).toUpperCase();
  if (p === "EAR") return ["aerospace"];
  if (p === "EMM") return ["mechanical"];
  if (SHARED_PREFIXES.has(p)) return ["aerospace", "mechanical"];
  return [];
};

const isShared = (code: string) => SHARED_PREFIXES.has(code.slice(0, 3).toUpperCase());

const yearOf = (code: string): number => {
  const m = code.match(/\d/);
  return m ? parseInt(m[0], 10) : 0;
};

const mkExam = (
  date: string,
  day: string,
  startTime: string,
  endTime: string,
  code: string,
  title: string,
  venue: string,
): ExamEntry => ({
  date,
  day,
  startTime,
  endTime,
  code,
  title,
  venue,
  depts: examFor(code),
});

const EXAMS: ExamEntry[] = [
  // Mon 8 June
  mkExam("2026-06-08", "Mon", "08:00", "10:00", "EMM 508", "Flexible Manufacturing Systems", "BSSC 280"),
  mkExam("2026-06-08", "Mon", "08:00", "10:00", "EAR 514", "Aircraft & Spacecraft Maintenance", "BSSC 281"),
  // Tue 9 June
  mkExam("2026-06-09", "Tue", "08:00", "10:00", "EMM 214", "Electrical Engineering II", "TR2/3"),
  mkExam("2026-06-09", "Tue", "08:00", "10:00", "EAR 211", "Electrical Engineering Principles II", "TR2/3"),
  mkExam("2026-06-09", "Tue", "08:00", "10:00", "EMM 320", "Mechanical Vibrations", "BSSC 281"),
  mkExam("2026-06-09", "Tue", "11:00", "13:00", "EMM 420", "Simulation & Modelling", "BSSC 275"),
  mkExam("2026-06-09", "Tue", "11:00", "13:00", "EAR 412", "Guidance & Navigation System", "TR3"),
  mkExam("2026-06-09", "Tue", "14:00", "16:00", "EAR 317", "Control Systems II", "BSSC 281"),
  mkExam("2026-06-09", "Tue", "14:00", "16:00", "ECU 103", "Physics for Engineers II", "SOE 1,2"),
  // Wed 10 June
  mkExam("2026-06-10", "Wed", "14:00", "16:00", "EMM 509", "Robotics & Automation", "TR1"),
  mkExam("2026-06-10", "Wed", "14:00", "16:00", "EAR 513", "Aerospace Law, Safety & Management", "BSSC 280"),
  // Thu 11 June
  mkExam("2026-06-11", "Thu", "08:00", "10:00", "ECU 202", "Engineering Mathematics VII", "OML11"),
  mkExam("2026-06-11", "Thu", "08:00", "10:00", "EAR 400", "Propulsion", "BSSC 273"),
  mkExam("2026-06-11", "Thu", "14:00", "16:00", "UCU 111", "Critical Thinking & Problem Solving", "SZ39 / EF / AZ / SOE"),
  // Fri 12 June
  mkExam("2026-06-12", "Fri", "08:00", "10:00", "ECU 302", "Innovation & Entrepreneurship", "AZ39, HH, CH"),
  mkExam("2026-06-12", "Fri", "08:00", "10:00", "EAR 312", "Aerospace Structures II", "BSSC 152"),
  mkExam("2026-06-12", "Fri", "08:00", "10:00", "EMM 102", "Intro to Material Science", "BSSC 281"),
  mkExam("2026-06-12", "Fri", "11:00", "13:00", "EAR 101", "Material Science", "BSSC 280"),
  mkExam("2026-06-12", "Fri", "11:00", "13:00", "EAR 403", "Avionics", "BSSC 280"),
  mkExam("2026-06-12", "Fri", "11:00", "13:00", "EMM 200", "Computer Aided Engineering Drawing", "C.LAB"),
  mkExam("2026-06-12", "Fri", "11:00", "13:00", "EAR 512", "Aircraft Manufacturing Technology", "BSSC 273"),
  mkExam("2026-06-12", "Fri", "14:00", "16:00", "ECU 107", "Engineering Mathematics IV", "AZ39"),
  mkExam("2026-06-12", "Fri", "14:00", "16:00", "EMM 425", "Solid & Structural Mechanics IV", "TR4"),
  mkExam("2026-06-12", "Fri", "14:00", "16:00", "EMM 511", "Computer Aided Design & Manufacturing", "BSSC 280"),
  mkExam("2026-06-12", "Fri", "16:30", "18:30", "EMM 300", "Engineering Electronics", "HH"),
  // Mon 15 June
  mkExam("2026-06-15", "Mon", "08:00", "10:00", "EMM 313", "Measurements & Instrumentation", "BSSC 273"),
  mkExam("2026-06-15", "Mon", "11:00", "13:00", "EAR 415", "Aerodynamics IV: Applied Aerodynamics", "BSSC 281"),
  mkExam("2026-06-15", "Mon", "11:00", "13:00", "EMM 422", "Refrigeration & Air Conditioning", "TR1"),
  mkExam("2026-06-15", "Mon", "14:00", "16:00", "EAR 307", "Mechanics of Machines", "BSSC 280"),
  mkExam("2026-06-15", "Mon", "14:00", "16:00", "EMM 512", "Manufacturing Resources Management", "TR1"),
  mkExam("2026-06-15", "Mon", "14:00", "16:00", "EAR 511", "Manufacturing Processes", "BSSC 152"),
  mkExam("2026-06-15", "Mon", "16:30", "18:30", "ECU 203", "Engineering Mathematics VIII", "OML 9"),
  // Tue 16 June
  mkExam("2026-06-16", "Tue", "08:00", "10:00", "EMM 219", "Engineering Thermodynamics II", "BSSC 280"),
  mkExam("2026-06-16", "Tue", "11:00", "13:00", "EAR 206", "Solid & Structural Mechanics", "BSSC 273"),
  mkExam("2026-06-16", "Tue", "11:00", "13:00", "EMM 410", "Manufacturing Processes II", "BSSC 281"),
  mkExam("2026-06-16", "Tue", "11:00", "13:00", "EAR 417", "Metal Forming Processes in Aerospace", "TR1"),
  mkExam("2026-06-16", "Tue", "14:00", "16:00", "EAR 104", "Aerospace Engineering Drawing II", "DR"),
  mkExam("2026-06-16", "Tue", "14:00", "16:00", "EMM 101", "Engineering Drawing & Design II", "DR"),
  mkExam("2026-06-16", "Tue", "14:00", "16:00", "ECU 301", "Engineering Mathematics X", "SZ39"),
  // Wed 17 June
  mkExam("2026-06-17", "Wed", "08:00", "10:00", "EMM 513", "Jig, Tool & Fixture Design", "TR3"),
  mkExam("2026-06-17", "Wed", "08:00", "10:00", "EAR 207", "Fundamentals of Aerospace Engineering Design", "BSSC 152"),
  mkExam("2026-06-17", "Wed", "11:00", "13:00", "EMM 211", "Engineering Mechanics II", "TR2"),
  mkExam("2026-06-17", "Wed", "11:00", "13:00", "EMM 427", "Quality Management", "BSSC 275"),
  mkExam("2026-06-17", "Wed", "11:00", "13:00", "EAR 510", "Aircraft System Design", "BSSC 152"),
  mkExam("2026-06-17", "Wed", "11:00", "13:00", "EAR 409", "Aircraft Structure Design II", "BSSC 281"),
  mkExam("2026-06-17", "Wed", "14:00", "16:00", "EAR 309", "Aerodynamics II: Inviscid & Compressible Flow", "BSSC 275"),
  mkExam("2026-06-17", "Wed", "14:00", "16:00", "EAR 102", "Workshop Practice & Processes I", "BSSC 281"),
  mkExam("2026-06-17", "Wed", "14:00", "16:00", "EMM 108", "Workshop Processes & Practice I", "BSSC 280"),
  mkExam("2026-06-17", "Wed", "16:30", "18:30", "EMM 303", "Solid & Structural Mechanics II", "TR3"),
  // Thu 18 June
  mkExam("2026-06-18", "Thu", "08:00", "10:00", "EAR 208", "Workshop Practice & Processes III", "HH"),
  mkExam("2026-06-18", "Thu", "08:00", "10:00", "EMM 216", "Workshop Practice & Processes III", "HH"),
  mkExam("2026-06-18", "Thu", "11:00", "13:00", "EMM 426", "Design of Machines & Machine Elements", "TR3"),
  mkExam("2026-06-18", "Thu", "11:00", "13:00", "EAR 316", "Polymer & Composite Materials for Aerospace", "BSSC 281"),
  mkExam("2026-06-18", "Thu", "11:00", "13:00", "EAR 410", "Aerospace Vibration & Control", "BSSC 152"),
  mkExam("2026-06-18", "Thu", "14:00", "16:00", "EMM 315", "Material Forming Processes", "TR3"),
  mkExam("2026-06-18", "Thu", "16:30", "18:30", "EAR 214", "Fluids III: Compressible Flow", "HHA2"),
  mkExam("2026-06-18", "Thu", "16:30", "18:30", "EMM 421", "Fluid Mechanics V", "HHA2"),
  mkExam("2026-06-18", "Thu", "16:30", "18:30", "ECU 102", "Chemistry for Engineers II", "AZ39"),
  // Fri 19 June
  mkExam("2026-06-19", "Fri", "08:00", "10:00", "EMM 514", "Control Engineering II", "TR1"),
  mkExam("2026-06-19", "Fri", "08:00", "10:00", "EMM 319", "Engineering Thermodynamics III", "BSSC 273"),
  mkExam("2026-06-19", "Fri", "08:00", "10:00", "ECU 106", "Engineering Mathematics III", "OML 4,5"),
  mkExam("2026-06-19", "Fri", "11:00", "13:00", "EAR 201", "Computer Aided Design", "C.LAB"),
  mkExam("2026-06-19", "Fri", "11:00", "13:00", "EMM 416", "Control Engineering I", "TR3"),
  mkExam("2026-06-19", "Fri", "11:00", "13:00", "EAR 416", "Flight Dynamics", "TR4"),
  mkExam("2026-06-19", "Fri", "14:00", "16:00", "EMM 205", "Fluid Mechanics II", "TR1"),
  mkExam("2026-06-19", "Fri", "14:00", "16:00", "EAR 313", "Digital Electronics", "BSSC 281"),
  mkExam("2026-06-19", "Fri", "14:00", "16:00", "EAR 509", "Aerospace Materials & Manufacturing", "TR4"),
  mkExam("2026-06-19", "Fri", "16:30", "18:30", "EAR 106", "Fluid Mechanics I", "TR2"),
];

const DAYS_ORDER = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const DAY_FULL: Record<string, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
};

const WEEKS: { label: string; dates: string[] }[] = [
  {
    label: "Week 1 · 8 – 12 June",
    dates: ["2026-06-08", "2026-06-09", "2026-06-10", "2026-06-11", "2026-06-12"],
  },
  {
    label: "Week 2 · 15 – 19 June",
    dates: ["2026-06-15", "2026-06-16", "2026-06-17", "2026-06-18", "2026-06-19"],
  },
];

const formatDateHeader = (iso: string) => {
  const d = new Date(iso + "T00:00:00");
  const day = d.toLocaleDateString("en-GB", { weekday: "short" });
  const num = d.getDate();
  const mon = d.toLocaleDateString("en-GB", { month: "short" });
  return `${day} ${num} ${mon}`;
};

// ─── Export helpers ───
const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

const esc = (s: string) => `"${String(s).replace(/"/g, '""')}"`;

const exportYearCSV = (dept: DeptMeta, year: number, exams: ExamEntry[]) => {
  const rows: string[][] = [["Date", "Day", "Start", "End", "Code", "Title", "Venue"]];
  exams.forEach((e) =>
    rows.push([e.date, DAY_FULL[e.day] || e.day, e.startTime, e.endTime, e.code, e.title, e.venue]),
  );
  const csv = rows.map((r) => r.map(esc).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  downloadBlob(blob, `exams-${dept.shortName}-year${year}.csv`);
};

const exportYearPDF = (dept: DeptMeta, year: number, exams: ExamEntry[]) => {
  const title = `${dept.name} — Year ${year} Exams (June 2026)`;
  const body = exams
    .map(
      (e) => `
      <tr>
        <td>${e.date}</td>
        <td>${DAY_FULL[e.day] || e.day}</td>
        <td>${e.startTime}–${e.endTime}</td>
        <td><strong>${e.code}</strong></td>
        <td>${e.title}</td>
        <td>${e.venue}</td>
      </tr>`,
    )
    .join("");
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title>
    <style>
      body{font-family:Inter,system-ui,sans-serif;padding:24px;color:#0a0a0a}
      h1{font-size:18px;margin:0 0 16px}
      table{width:100%;border-collapse:collapse;font-size:12px}
      th,td{border:1px solid #999;padding:6px 8px;text-align:left;vertical-align:top}
      th{background:#f0f0f0}
      @media print{body{padding:12px}}
    </style></head><body>
      <h1>${title}</h1>
      <table>
        <thead><tr><th>Date</th><th>Day</th><th>Time</th><th>Code</th><th>Title</th><th>Venue</th></tr></thead>
        <tbody>${body}</tbody>
      </table>
      <script>setTimeout(()=>window.print(),300);</script>
    </body></html>`;
  const w = window.open("", "_blank");
  if (!w) return;
  w.document.open();
  w.document.write(html);
  w.document.close();
};

// ─── Week table component ───
const WeekTable = ({
  exams,
  weekDates,
  weekLabel,
}: {
  exams: ExamEntry[];
  weekDates: string[];
  weekLabel: string;
}) => {
  const weekExams = exams.filter((e) => weekDates.includes(e.date));
  if (weekExams.length === 0) return null;

  // Distinct start times, sorted
  const times = Array.from(new Set(weekExams.map((e) => e.startTime))).sort();

  // index: date -> startTime -> exams[]
  const cellMap: Record<string, Record<string, ExamEntry[]>> = {};
  weekDates.forEach((d) => (cellMap[d] = {}));
  weekExams.forEach((e) => {
    if (!cellMap[e.date][e.startTime]) cellMap[e.date][e.startTime] = [];
    cellMap[e.date][e.startTime].push(e);
  });

  return (
    <div className="mb-6 last:mb-0">
      <div className="font-mono text-xs font-bold uppercase text-muted-foreground mb-2 tracking-wider">
        {weekLabel}
      </div>
      <div className="overflow-x-auto border border-foreground/20">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="bg-card">
              <th className="border border-foreground/20 p-2 text-left font-mono font-bold w-20">Time</th>
              {weekDates.map((d, i) => (
                <th
                  key={d}
                  className="border border-foreground/20 p-2 text-left font-mono font-bold"
                  style={{ width: `${(100 - 12) / weekDates.length}%` }}
                >
                  {formatDateHeader(d)}
                  <span className="sr-only">{DAYS_ORDER[i]}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((t, rowIdx) => (
              <tr key={t} className={rowIdx % 2 === 1 ? "bg-muted/30" : ""}>
                <td className="border border-foreground/20 p-2 align-top font-mono font-bold whitespace-nowrap">
                  {t}
                </td>
                {weekDates.map((d) => {
                  const cell = cellMap[d][t] || [];
                  return (
                    <td key={d} className="border border-foreground/20 p-2 align-top">
                      {cell.length === 0 ? (
                        <span className="text-foreground/20">—</span>
                      ) : (
                        <div className="space-y-2">
                          {cell.map((ex, i) => (
                            <div
                              key={ex.code + i}
                              className={i > 0 ? "pt-2 border-t border-foreground/10" : ""}
                            >
                              <div className="font-mono font-bold text-foreground">{ex.code}</div>
                              <div className="text-foreground/80 leading-tight">{ex.title}</div>
                              <div className="font-mono text-[10px] text-muted-foreground mt-0.5">
                                {ex.startTime}–{ex.endTime} · {ex.venue}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── Page ───
const Timetable = () => {
  const [deptId, setDeptId] = useState<DeptId>("mechanical");
  const dept = DEPARTMENTS.find((d) => d.id === deptId)!;

  const examsByYear = useMemo(() => {
    const filtered = EXAMS.filter((e) => e.depts.includes(deptId));
    // Year-bearing exams = non-shared dept exams. Shared go into every year that has dept exams.
    const deptYears = new Set<number>();
    filtered.forEach((e) => {
      if (!isShared(e.code)) deptYears.add(yearOf(e.code));
    });
    const sharedExams = filtered.filter((e) => isShared(e.code));

    const out: Record<number, ExamEntry[]> = {};
    [1, 2, 3, 4, 5].forEach((y) => {
      if (!deptYears.has(y)) return;
      const yearExams = filtered.filter((e) => !isShared(e.code) && yearOf(e.code) === y);
      out[y] = [...yearExams, ...sharedExams].sort(
        (a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime),
      );
    });
    return out;
  }, [deptId]);

  const years = Object.keys(examsByYear)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b-4 border-foreground px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <Link
            to="/tools"
            className="flex items-center gap-2 font-mono text-sm font-bold hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Tools
          </Link>
          <div className="text-right">
            <h1 className="font-display text-base md:text-lg font-bold uppercase tracking-tight">
              Exam Timetable
            </h1>
            <p className="font-mono text-[10px] md:text-xs text-muted-foreground">June 2026 · JKUAT</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Department filter */}
        <div className="mb-6">
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
            Department
          </div>
          <div className="inline-flex border-2 border-foreground bg-card">
            {DEPARTMENTS.map((d) => (
              <button
                key={d.id}
                onClick={() => setDeptId(d.id)}
                className={`px-4 py-2 font-mono text-sm font-bold uppercase transition-colors ${
                  deptId === d.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground hover:bg-muted"
                }`}
              >
                {d.name}
              </button>
            ))}
          </div>
        </div>

        {years.length === 0 && (
          <div className="border-2 border-foreground bg-card p-8 text-center font-mono text-sm text-muted-foreground">
            No exams scheduled for this department.
          </div>
        )}

        {years.map((y) => {
          const exams = examsByYear[y];
          return (
            <section key={y} className="mb-10 last:mb-0">
              <div className="flex items-center justify-between border-b-2 border-foreground pb-2 mb-4">
                <h2 className="font-display text-lg md:text-xl font-bold uppercase tracking-tight">
                  Year {y}
                  <span className="ml-3 font-mono text-xs text-muted-foreground font-normal">
                    {exams.length} exam{exams.length === 1 ? "" : "s"}
                  </span>
                </h2>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => exportYearCSV(dept, y, exams)}
                    className="inline-flex items-center gap-1.5 px-2 py-1 font-mono text-[10px] uppercase font-bold border border-foreground/30 hover:bg-muted transition-colors"
                    title={`Export Year ${y} as CSV`}
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" /> CSV
                  </button>
                  <button
                    onClick={() => exportYearPDF(dept, y, exams)}
                    className="inline-flex items-center gap-1.5 px-2 py-1 font-mono text-[10px] uppercase font-bold border border-foreground/30 hover:bg-muted transition-colors"
                    title={`Export Year ${y} as PDF`}
                  >
                    <FileText className="w-3.5 h-3.5" /> PDF
                  </button>
                </div>
              </div>

              {WEEKS.map((w) => (
                <WeekTable key={w.label} exams={exams} weekDates={w.dates} weekLabel={w.label} />
              ))}
            </section>
          );
        })}
      </main>
    </div>
  );
};

export default Timetable;
