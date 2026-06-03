import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { toPng } from "html-to-image";
import {
  ArrowLeft,
  Clock,
  MapPin,
  BookOpen,
  X,
  Check,
  Plus,
  Trash2,
  Edit3,
  GraduationCap,
  Grid3X3,
  List,
  Settings2,
  Download,
  Share2,
  Timer,
  FileText,
  FileSpreadsheet,
} from "lucide-react";
import logoImg from "@/assets/logo-new.jpeg";

// ─── Types ───
type EventTag = "lecture" | "lab" | "study" | "exam";

interface TimetableEvent {
  id: string;
  subject: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  tag: EventTag;
  completed: boolean;
}

type DayName = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";

interface Department {
  id: string;
  name: string;
  shortName: string;
  schedule: Record<DayName, TimetableEvent[]>;
}

const DAYS: DayName[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const DAY_SHORT: Record<DayName, string> = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
};

// ─── Subject color helper ───
const PALETTE = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "hsl(var(--destructive))",
  "hsl(var(--ring))",
  "hsl(var(--muted-foreground))",
  "hsl(160, 68%, 28%)",
  "hsl(38, 91%, 40%)",
  "hsl(0, 64%, 50%)",
  "hsl(200, 70%, 45%)",
  "hsl(280, 60%, 50%)",
  "hsl(330, 70%, 50%)",
  "hsl(90, 60%, 40%)",
];

const subjectColorCache: Record<string, string> = {};
let colorIdx = 0;
const getSubjectColor = (subject: string) => {
  if (!subjectColorCache[subject]) {
    subjectColorCache[subject] = PALETTE[colorIdx % PALETTE.length];
    colorIdx++;
  }
  return subjectColorCache[subject];
};

let idCounter = 0;
const genId = () => `evt-${++idCounter}`;

const evt = (
  subject: string,
  start: string,
  end: string,
  location: string,
  desc: string,
  tag: EventTag = "lecture",
): TimetableEvent => ({
  id: genId(),
  subject,
  startTime: start,
  endTime: end,
  location,
  description: desc,
  tag,
  completed: false,
});

// ─── Department schedules ───
const DEPARTMENTS: Department[] = [
  {
    id: "aerospace",
    name: "Aerospace Engineering",
    shortName: "Aero",
    schedule: {
      Monday: [
        evt("Structural & Solid Mechanics", "09:00", "11:00", "TBA", "Structural & Solid Mechanics"),
        evt("Aerospace Engineering Design", "15:00", "17:00", "TBA", "Aerospace Engineering Design"),
      ],
      Tuesday: [
        evt("Transform Methods", "07:00", "09:00", "SC2", "Transform Methods (shared)"),
        evt("Workshop", "10:00", "13:00", "Workshop", "Workshop", "lab"),
      ],
      Wednesday: [
        evt("CAD", "09:00", "11:00", "C.LAB", "Computer Aided Design", "lab"),
      ],
      Thursday: [
        evt("ODEs", "07:00", "09:00", "SC2", "Ordinary Differential Equations (shared)"),
        evt("Fluid Mechanics", "11:00", "13:00", "TBA", "Fluid Mechanics"),
        evt("Electrical Engineering", "16:30", "18:30", "TBA", "Electrical Engineering (shared)"),
      ],
      Friday: [],
    },
  },
  {
    id: "mechanical",
    name: "Mechanical Engineering",
    shortName: "Mech",
    schedule: {
      Monday: [
        evt("Fluids 2 (EMM 205)", "10:00", "12:00", "TBA", "Fluid Mechanics II"),
      ],
      Tuesday: [
        evt("Transform Methods", "07:00", "09:00", "SC2", "Transform Methods (shared)"),
        evt("Dynamics", "08:00", "10:00", "TBA", "Dynamics"),
      ],
      Wednesday: [
        evt("CAD", "11:00", "13:00", "C.LAB", "Computer Aided Design", "lab"),
        evt("Thermodynamics", "14:00", "16:00", "TBA", "Thermodynamics"),
      ],
      Thursday: [
        evt("ODEs", "07:00", "09:00", "SC2", "Ordinary Differential Equations (shared)"),
        evt("Workshop", "09:00", "12:00", "Workshop", "Workshop", "lab"),
        evt("Electrical Engineering", "16:30", "18:30", "TBA", "Electrical Engineering (shared)"),
      ],
      Friday: [],
    },
  },
];

// ─── Exam timetable (June 2026) ───
// Course code prefix → department mapping:
//   EMM = Mechanical, EAR = Aerospace,
//   ECU = all engineers (shared), UCU = university common unit (shared),
//   EEE = Electrical
type DeptId = "aerospace" | "mechanical";
interface ExamEntry {
  date: string;        // YYYY-MM-DD
  day: string;         // Mon / Tue / etc.
  startTime: string;   // HH:MM (24h)
  endTime: string;
  code: string;
  title: string;
  venue: string;
  depts: DeptId[];
}

const examFor = (code: string): DeptId[] => {
  const p = code.slice(0, 3).toUpperCase();
  if (p === "EAR") return ["aerospace"];
  if (p === "EMM") return ["mechanical"];
  if (p === "ECU" || p === "UCU" || p === "EEE") return ["aerospace", "mechanical"];
  return [];
};

const mkExam = (date: string, day: string, startTime: string, endTime: string, code: string, title: string, venue: string): ExamEntry => ({
  date, day, startTime, endTime, code, title, venue,
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

const daysBetween = (from: Date, toISO: string) => {
  const to = new Date(toISO + "T00:00:00");
  const a = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  return Math.round((to.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
};

// ─── Helpers ───
const timeToMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
const formatCountdown = (mins: number) => {
  if (mins < 0) return "Now";
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

const getTodayDayName = (): DayName => {
  const d = new Date().getDay();
  const map: Record<number, DayName> = { 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday" };
  return map[d] || "Monday";
};

const getCurrentMinutes = () => {
  const n = new Date();
  return n.getHours() * 60 + n.getMinutes();
};

// ─── Weekly Grid View (Desktop) ───
const HOUR_HEIGHT = 64;
const GRID_START = 7;
const GRID_END = 19;
const GRID_TOTAL_HOURS = GRID_END - GRID_START;

const WeeklyGrid = ({
  schedule,
  todayName,
  now,
  onEventClick,
  onAddClick,
}: {
  schedule: Record<DayName, TimetableEvent[]>;
  todayName: DayName;
  now: number;
  onEventClick: (event: TimetableEvent) => void;
  onAddClick: (day: DayName) => void;
}) => {
  const nowOffset = now >= GRID_START * 60 && now <= GRID_END * 60 ? ((now - GRID_START * 60) / 60) * HOUR_HEIGHT : -1;

  return (
    <div className="border-2 border-foreground bg-card overflow-auto">
      <div className="grid grid-cols-[56px_repeat(5,1fr)] border-b-2 border-foreground sticky top-0 z-10 bg-card">
        <div className="border-r-2 border-foreground p-2" />
        {DAYS.map((day) => (
          <div
            key={day}
            className={`border-r-2 last:border-r-0 border-foreground p-2 text-center font-mono text-xs font-bold uppercase
              ${day === todayName ? "bg-primary/10 text-primary" : ""}`}
          >
            {DAY_SHORT[day]}
            <button
              onClick={() => onAddClick(day)}
              className="ml-1.5 inline-flex items-center justify-center w-5 h-5 bg-primary/20 hover:bg-primary/40 transition-colors"
              title={`Add to ${day}`}
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[56px_repeat(5,1fr)]" style={{ height: GRID_TOTAL_HOURS * HOUR_HEIGHT }}>
        <div className="border-r-2 border-foreground relative">
          {Array.from({ length: GRID_TOTAL_HOURS }, (_, i) => i + GRID_START).map((hour) => (
            <div
              key={hour}
              className="absolute right-0 pr-1.5 font-mono text-[10px] text-muted-foreground"
              style={{ top: (hour - GRID_START) * HOUR_HEIGHT - 6 }}
            >
              {hour.toString().padStart(2, "0")}:00
            </div>
          ))}
        </div>

        {DAYS.map((day) => (
          <div
            key={day}
            className={`border-r-2 last:border-r-0 border-foreground/10 relative ${day === todayName ? "bg-primary/5" : ""}`}
          >
            {Array.from({ length: GRID_TOTAL_HOURS }, (_, i) => (
              <div key={i} className="absolute left-0 right-0 border-t border-foreground/10" style={{ top: i * HOUR_HEIGHT }} />
            ))}
            {day === todayName && nowOffset >= 0 && (
              <div className="absolute left-0 right-0 h-0.5 bg-destructive z-10" style={{ top: nowOffset }}>
                <div className="absolute -left-1 -top-1 w-2.5 h-2.5 rounded-full bg-destructive" />
              </div>
            )}
            {schedule[day].map((event) => {
              const startMin = timeToMin(event.startTime);
              const endMin = timeToMin(event.endTime);
              const topPx = ((startMin - GRID_START * 60) / 60) * HOUR_HEIGHT;
              const heightPx = ((endMin - startMin) / 60) * HOUR_HEIGHT;
              const isNow = day === todayName && now >= startMin && now < endMin;
              return (
                <button
                  key={event.id}
                  onClick={() => onEventClick(event)}
                  className={`absolute left-0.5 right-0.5 text-left p-1.5 border-2 border-foreground overflow-hidden transition-all hover:shadow-brutal-sm hover:z-20
                    ${event.completed ? "opacity-40" : ""} ${isNow ? "ring-2 ring-primary z-10" : ""}`}
                  style={{ top: `${topPx}px`, height: `${heightPx - 2}px`, backgroundColor: getSubjectColor(event.subject) }}
                >
                  <div className="font-mono text-[10px] font-bold text-foreground leading-tight truncate">{event.subject}</div>
                  <div className="font-mono text-[9px] text-foreground/70 truncate">{event.startTime}–{event.endTime}</div>
                  {heightPx > 50 && <div className="font-mono text-[9px] text-foreground/60 truncate">{event.location}</div>}
                  {heightPx > 80 && <div className="font-mono text-[8px] text-foreground/50 truncate mt-0.5">{event.description}</div>}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Manage Mode ───
const ManageMode = ({
  schedule, onEdit, onDelete, onAdd, onClose,
}: {
  schedule: Record<DayName, TimetableEvent[]>;
  onEdit: (event: TimetableEvent) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  onClose: () => void;
}) => (
  <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
    <header className="bg-card border-b-4 border-foreground px-3 py-2.5 flex items-center justify-between sticky top-0 z-40">
      <button onClick={onClose} className="flex items-center gap-2 font-mono text-sm font-bold">
        <X className="w-5 h-5" /> Close
      </button>
      <h1 className="font-display font-bold text-sm uppercase tracking-wider">Manage Timetable</h1>
      <button onClick={onAdd} className="bg-primary text-foreground border-2 border-foreground p-1.5 shadow-brutal-sm active:shadow-none active:translate-x-1 active:translate-y-1">
        <Plus className="w-5 h-5" />
      </button>
    </header>
    <div className="p-3 space-y-4 pb-8">
      {DAYS.map((day) => {
        const events = schedule[day];
        return (
          <div key={day}>
            <h3 className="font-display font-black text-sm uppercase mb-2 flex items-center gap-2">
              <span className="bg-foreground text-card px-2 py-0.5 font-mono text-xs">{day}</span>
              <span className="font-mono text-xs text-muted-foreground">{events.length} class{events.length !== 1 ? "es" : ""}</span>
            </h3>
            {events.length === 0 ? (
              <div className="text-muted-foreground font-mono text-xs py-2 pl-2 border-l-2 border-dashed border-muted-foreground/30">No classes</div>
            ) : (
              <div className="space-y-1.5">
                {events.map((event) => (
                  <div key={event.id} className="flex items-center gap-2 bg-card border-2 border-foreground p-2">
                    <span className="w-3 h-3 rounded-full flex-shrink-0 border-2" style={{ backgroundColor: getSubjectColor(event.subject), borderColor: "hsl(var(--foreground))" }} />
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-bold text-xs truncate">{event.subject}</div>
                      <div className="font-mono text-[10px] text-muted-foreground">{event.startTime}–{event.endTime} · {event.location}</div>
                    </div>
                    <button onClick={() => onEdit(event)} className="p-2 border-2 border-foreground bg-muted hover:bg-primary/20 transition-colors active:translate-y-0.5" title="Edit">
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => onDelete(event.id)} className="p-2 border-2 border-foreground bg-destructive/10 hover:bg-destructive/30 text-destructive transition-colors active:translate-y-0.5" title="Delete">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

// v2: bumped after switching to Aerospace + Mechanical only schedule.
// Bumping the suffix invalidates any old cached classes in users' browsers.
const STORAGE_KEY_SCHEDULES = "timetable-schedules-v2";
const STORAGE_KEY_DEPT = "timetable-dept-v2";

const Timetable = () => {
  const [deptId, setDeptId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DEPT);
      if (saved && DEPARTMENTS.some((d) => d.id === saved)) return saved;
      return DEPARTMENTS[0].id;
    } catch {
      return DEPARTMENTS[0].id;
    }
  });
  const [schedules, setSchedules] = useState<Record<string, Record<DayName, TimetableEvent[]>>>(() => {
    const defaults = Object.fromEntries(DEPARTMENTS.map((d) => [d.id, d.schedule]));
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SCHEDULES);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...defaults, ...parsed };
      }
    } catch {}
    return defaults;
  });
  const [activeDay, setActiveDay] = useState<DayName>(getTodayDayName());
  const [selectedEvent, setSelectedEvent] = useState<TimetableEvent | null>(null);
  const [showStats, setShowStats] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editEvent, setEditEvent] = useState<TimetableEvent | null>(null);
  const [now, setNow] = useState(getCurrentMinutes());
  const [viewMode, setViewMode] = useState<"day" | "week">("day");
  const [showManage, setShowManage] = useState(false);
  const [addDay, setAddDay] = useState<DayName | null>(null);
  const [exporting, setExporting] = useState(false);
  const [showPomodoro, setShowPomodoro] = useState(false);
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [pomodoroSeconds, setPomodoroSeconds] = useState(25 * 60);
  const [pomodoroMode, setPomodoroMode] = useState<"focus" | "short" | "long">("focus");
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const timetableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Timetable | Engineering Hub";
  }, []);

  const POMODORO_TIMES = { focus: 25 * 60, short: 5 * 60, long: 15 * 60 };

  const dept = DEPARTMENTS.find((d) => d.id === deptId) ?? DEPARTMENTS[0];
  const schedule = schedules[dept.id] ?? dept.schedule;

  // Semester week calculation
  const getSemesterWeek = () => {
    const now = new Date();
    const month = now.getMonth();
    const semStart = month >= 6 ? new Date(now.getFullYear(), 6, 28) : new Date(now.getFullYear(), 1, 3);
    const diffMs = now.getTime() - semStart.getTime();
    const week = Math.max(1, Math.ceil(diffMs / (7 * 24 * 60 * 60 * 1000)));
    return Math.min(week, 17);
  };
  const semesterWeek = getSemesterWeek();

  // Persist
  useEffect(() => { try { localStorage.setItem(STORAGE_KEY_SCHEDULES, JSON.stringify(schedules)); } catch {} }, [schedules]);
  useEffect(() => { try { localStorage.setItem(STORAGE_KEY_DEPT, deptId); } catch {} }, [deptId]);
  useEffect(() => { const interval = setInterval(() => setNow(getCurrentMinutes()), 30000); return () => clearInterval(interval); }, []);

  // Pomodoro timer
  useEffect(() => {
    if (!pomodoroActive) return;
    const interval = setInterval(() => {
      setPomodoroSeconds(prev => {
        if (prev <= 1) {
          setPomodoroActive(false);
          setPomodoroCount(c => c + 1);
          const nextMode = pomodoroMode === "focus" ? (pomodoroCount > 0 && pomodoroCount % 3 === 0 ? "long" : "short") : "focus";
          setPomodoroMode(nextMode);
          return POMODORO_TIMES[nextMode];
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [pomodoroActive, pomodoroMode, pomodoroCount]);

  const exportAsImage = async () => {
    if (!timetableRef.current || exporting) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(timetableRef.current, { cacheBust: true, backgroundColor: '#ffffff' });
      const link = document.createElement("a");
      link.download = `timetable-${dept.shortName}-${activeDay}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) { console.error("Export failed:", err); }
    setExporting(false);
  };

  const shareTimetable = async () => {
    if (!timetableRef.current) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(timetableRef.current, { cacheBust: true, backgroundColor: '#ffffff' });
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], `timetable-${dept.shortName}.png`, { type: "image/png" });
      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: `${dept.name} Timetable` });
      } else {
        const link = document.createElement("a");
        link.download = file.name;
        link.href = dataUrl;
        link.click();
      }
    } catch (err) { console.error("Share failed:", err); }
    setExporting(false);
  };

  const exportAsCSV = () => {
    const rows: string[][] = [["Type", "Day/Date", "Start", "End", "Code", "Subject/Title", "Venue"]];
    DAYS.forEach((day) => {
      (schedule[day] || []).forEach((e) => {
        rows.push(["Class", day, e.startTime, e.endTime, "", e.subject, e.location]);
      });
    });
    EXAMS.filter((ex) => ex.depts.includes(deptId as DeptId)).forEach((ex) => {
      rows.push(["Exam", `${ex.day} ${ex.date}`, ex.startTime, ex.endTime, ex.code, ex.title, ex.venue]);
    });
    const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const csv = rows.map((r) => r.map(esc).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `timetable-${dept.shortName}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportAsPDF = () => {
    const classRows = DAYS.map((day) => {
      const items = (schedule[day] || [])
        .map((e) => `<tr><td>${e.startTime}–${e.endTime}</td><td>${e.subject}</td><td>${e.location}</td></tr>`)
        .join("");
      return items
        ? `<tr class="day"><td colspan="3">${day}</td></tr>${items}`
        : `<tr class="day"><td colspan="3">${day}</td></tr><tr><td colspan="3" class="empty">Free / TBD</td></tr>`;
    }).join("");
    const examRows = EXAMS.filter((ex) => ex.depts.includes(deptId as DeptId))
      .map((ex) => `<tr><td>${ex.day} ${ex.date}</td><td>${ex.startTime}–${ex.endTime}</td><td>${ex.code}</td><td>${ex.title}</td><td>${ex.venue}</td></tr>`)
      .join("");
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>${dept.name} Timetable</title>
      <style>
        body{font-family:'Helvetica Neue',Arial,sans-serif;color:#111;padding:24px;}
        h1{font-size:20px;margin:0 0 4px;text-transform:uppercase;letter-spacing:1px}
        h2{font-size:14px;margin:24px 0 8px;text-transform:uppercase;border-bottom:2px solid #111;padding-bottom:4px}
        table{width:100%;border-collapse:collapse;font-size:11px;margin-bottom:12px}
        th,td{border:1px solid #ccc;padding:6px 8px;text-align:left;vertical-align:top}
        th{background:#111;color:#fff;text-transform:uppercase;font-size:10px;letter-spacing:.5px}
        tr.day td{background:#eee;font-weight:700;text-transform:uppercase}
        td.empty{color:#888;font-style:italic}
        @media print{body{padding:12px}}
      </style></head><body>
      <h1>${dept.name} — Timetable</h1>
      <div style="font-size:11px;color:#555">Generated ${new Date().toLocaleDateString()}</div>
      <h2>Weekly Classes</h2>
      <table><thead><tr><th>Time</th><th>Subject</th><th>Venue</th></tr></thead><tbody>${classRows}</tbody></table>
      <h2>Exam Timetable (June 2026)</h2>
      <table><thead><tr><th>Date</th><th>Time</th><th>Code</th><th>Title</th><th>Venue</th></tr></thead>
      <tbody>${examRows || '<tr><td colspan="5" class="empty">No exams scheduled.</td></tr>'}</tbody></table>
      <script>window.onload=()=>{setTimeout(()=>window.print(),300)}</script>
      </body></html>`;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(html);
    w.document.close();
  };

  const todayName = getTodayDayName();
  const todayEvents = schedule[todayName] || [];

  const getNextClass = useCallback(() => {
    const events = todayEvents.filter((e) => !e.completed);
    for (const e of events) {
      const start = timeToMin(e.startTime);
      if (start > now) return { event: e, minsUntil: start - now };
    }
    for (const e of events) {
      const start = timeToMin(e.startTime);
      const end = timeToMin(e.endTime);
      if (now >= start && now < end) return { event: e, minsUntil: -1 };
    }
    return null;
  }, [todayEvents, now]);

  const nextClass = getNextClass();

  const getUpcomingExams = () => {
    const today = new Date();
    return EXAMS
      .filter(ex => ex.depts.includes(deptId as DeptId))
      .map(ex => ({ ex, daysUntil: daysBetween(today, ex.date) }))
      .filter(({ daysUntil }) => daysUntil >= 0)
      .sort((a, b) => a.daysUntil - b.daysUntil || a.ex.startTime.localeCompare(b.ex.startTime));
  };
  const upcomingExams = getUpcomingExams();

  const totalHoursToday = todayEvents.reduce((sum, e) => sum + (timeToMin(e.endTime) - timeToMin(e.startTime)) / 60, 0);
  const completedToday = todayEvents.filter((e) => e.completed).length;
  const weeklyHours: Record<string, number> = {};
  Object.values(schedule).flat().forEach((e) => {
    const hrs = (timeToMin(e.endTime) - timeToMin(e.startTime)) / 60;
    weeklyHours[e.subject] = (weeklyHours[e.subject] || 0) + hrs;
  });

  const updateSchedule = (updater: (prev: Record<DayName, TimetableEvent[]>) => Record<DayName, TimetableEvent[]>) => {
    setSchedules((prev) => ({ ...prev, [deptId]: updater(prev[deptId]) }));
  };

  const toggleComplete = (id: string) => {
    updateSchedule((prev) => {
      const updated = { ...prev };
      for (const day of DAYS) { updated[day] = updated[day].map((e) => (e.id === id ? { ...e, completed: !e.completed } : e)); }
      return updated;
    });
  };

  const deleteEvent = (id: string) => {
    updateSchedule((prev) => {
      const updated = { ...prev };
      for (const day of DAYS) { updated[day] = updated[day].filter((e) => e.id !== id); }
      return updated;
    });
    setSelectedEvent(null);
  };

  const saveEvent = (day: DayName, event: TimetableEvent) => {
    updateSchedule((prev) => {
      const updated = { ...prev };
      if (editEvent) { for (const d of DAYS) { updated[d] = updated[d].filter((e) => e.id !== editEvent.id); } }
      updated[day] = [...updated[day], event].sort((a, b) => timeToMin(a.startTime) - timeToMin(b.startTime));
      return updated;
    });
    setShowAddModal(false);
    setEditEvent(null);
    setAddDay(null);
  };

  const dayEvents = schedule[activeDay];

  const openAddForDay = (day: DayName) => {
    setAddDay(day);
    setEditEvent(null);
    setShowAddModal(true);
  };

  const TAG_COLORS: Record<string, string> = {
    lecture: "bg-primary/10 text-primary border-primary/30",
    lab: "bg-accent/10 text-accent border-accent/30",
    study: "bg-green-500/10 text-green-600 border-green-500/30",
    exam: "bg-destructive/10 text-destructive border-destructive/30",
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col pb-4">
      {/* Header */}
      <header className="bg-card border-b-4 border-foreground px-3 py-2.5 flex items-center justify-between sticky top-0 z-40">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <ArrowLeft className="w-4 h-4" />
          <img src={logoImg} alt="Hub" className="h-9 w-auto" />
        </Link>
        <div className="text-center">
          <h1 className="font-display font-bold text-xs uppercase tracking-wider">Timetable</h1>
          <div className="font-mono text-[10px] text-primary font-bold">Week {semesterWeek} of Semester</div>
        </div>
        <div className="flex items-center gap-1">
          {/* View toggle — visible on md+ */}
          <div className="hidden md:flex border-2 border-foreground">
            <button onClick={() => setViewMode("day")} className={`p-1.5 transition-colors ${viewMode === "day" ? "bg-primary" : "bg-card hover:bg-muted"}`} title="Day view">
              <List className="w-4 h-4" />
            </button>
            <button onClick={() => setViewMode("week")} className={`p-1.5 border-l-2 border-foreground transition-colors ${viewMode === "week" ? "bg-primary" : "bg-card hover:bg-muted"}`} title="Week view">
              <Grid3X3 className="w-4 h-4" />
            </button>
          </div>
          <button onClick={() => setShowPomodoro(true)} className="p-2 border-2 border-foreground bg-primary text-foreground shadow-brutal-sm active:shadow-none active:translate-x-0.5 active:translate-y-0.5" title="Focus Timer">
            <Timer className="w-4 h-4" />
          </button>
          <button onClick={shareTimetable} className="p-2 border-2 border-foreground bg-card shadow-brutal-sm active:shadow-none" title="Share">
            <Share2 className="w-4 h-4" />
          </button>
          <button onClick={() => setShowManage(true)} className="p-2 border-2 border-foreground bg-card shadow-brutal-sm active:shadow-none" title="Manage">
            <Settings2 className="w-4 h-4" />
          </button>
          <button onClick={() => { setEditEvent(null); setAddDay(null); setShowAddModal(true); }} className="p-2 border-2 border-foreground bg-foreground text-card shadow-brutal-sm active:shadow-none" title="Add class">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div ref={timetableRef}>
        {/* Department selector — horizontal chips */}
        <div className="px-3 mt-3">
          <div className="font-mono text-[10px] uppercase text-muted-foreground mb-2 font-bold">Your Department</div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {DEPARTMENTS.map((d) => (
              <button
                key={d.id}
                onClick={() => { setDeptId(d.id); setSelectedEvent(null); }}
                className={`flex-shrink-0 font-mono text-xs font-bold uppercase px-3 py-2 border-2 border-foreground transition-all whitespace-nowrap active:translate-y-0.5 ${d.id === deptId ? "bg-primary text-foreground shadow-brutal-sm" : "bg-card text-foreground hover:bg-primary/20"}`}
              >
                {d.shortName}
              </button>
            ))}
          </div>
        </div>

        {/* Next class banner */}
        {nextClass && (
          <div className={`mx-3 mt-3 border-2 border-foreground p-3 shadow-brutal-sm relative overflow-hidden ${nextClass.minsUntil < 0 ? "bg-primary text-foreground" : "bg-card"}`}>
            {nextClass.minsUntil < 0 && (
              <span className="absolute top-3 right-3 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-foreground" />
              </span>
            )}
            <div className="flex items-center gap-2 mb-1.5">
              <Clock className={`w-3.5 h-3.5 ${nextClass.minsUntil < 0 ? "text-foreground" : "text-primary"}`} />
              <span className={`font-mono text-[10px] uppercase font-bold ${nextClass.minsUntil < 0 ? "text-foreground/70" : "text-muted-foreground"}`}>
                {nextClass.minsUntil < 0 ? "● Happening Right Now" : "Next Class In"}
              </span>
              {nextClass.minsUntil >= 0 && (
                <span className="font-mono text-xl font-black text-primary ml-auto">{formatCountdown(nextClass.minsUntil)}</span>
              )}
            </div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="font-display font-black text-lg leading-tight">{nextClass.event.subject}</div>
                <div className={`font-body text-xs mt-0.5 ${nextClass.minsUntil < 0 ? "text-foreground/70" : "text-muted-foreground"}`}>{nextClass.event.description}</div>
              </div>
              <div className="text-right shrink-0">
                <div className={`font-mono text-xs font-bold flex items-center gap-1 justify-end ${nextClass.minsUntil < 0 ? "text-foreground/70" : "text-muted-foreground"}`}>
                  <MapPin className="w-3 h-3" />{nextClass.event.location}
                </div>
                <div className={`font-mono text-xs mt-0.5 ${nextClass.minsUntil < 0 ? "text-foreground/60" : "text-muted-foreground"}`}>
                  {nextClass.event.startTime}–{nextClass.event.endTime}
                </div>
              </div>
            </div>
            {nextClass.minsUntil < 0 && (
              <div className="mt-3">
                <div className="h-1.5 bg-foreground/20 rounded-full overflow-hidden">
                  <div className="h-full bg-foreground rounded-full transition-all duration-1000" style={{
                    width: `${Math.min(100, ((now - timeToMin(nextClass.event.startTime)) / (timeToMin(nextClass.event.endTime) - timeToMin(nextClass.event.startTime))) * 100)}%`
                  }} />
                </div>
                <div className="font-mono text-[9px] text-foreground/50 mt-1 text-right">
                  {Math.round(timeToMin(nextClass.event.endTime) - now)}min remaining
                </div>
              </div>
            )}
          </div>
        )}

        {/* CAT/Exam countdown */}
        {upcomingExams.length > 0 && (
          <div className="mx-3 mt-2 border-2 border-destructive bg-destructive/5 p-3">
            <div className="font-mono text-[10px] uppercase text-destructive font-bold mb-2 flex items-center gap-1.5">⚡ UPCOMING EXAMS — JUNE 2026</div>
            <div className="space-y-1.5">
              {upcomingExams.slice(0, 4).map(({ ex, daysUntil }, i) => (
                <div key={i} className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-mono text-[10px] font-bold bg-foreground text-card px-1.5 py-0.5">{ex.code}</span>
                      <span className="font-display font-bold text-sm truncate">{ex.title}</span>
                    </div>
                    <div className="font-mono text-[10px] text-muted-foreground mt-0.5">
                      {ex.day} {ex.date.slice(8)}/{ex.date.slice(5,7)} · {ex.startTime}–{ex.endTime} · {ex.venue}
                    </div>
                  </div>
                  <span className={`font-mono text-[10px] font-black px-2 py-1 border-2 border-foreground shrink-0 ${daysUntil === 0 ? "bg-destructive text-destructive-foreground" : daysUntil <= 3 ? "bg-accent text-foreground" : "bg-card text-foreground"}`}>
                    {daysUntil === 0 ? "TODAY" : daysUntil === 1 ? "TOMORROW" : `${daysUntil}d`}
                  </span>
                </div>
              ))}
              {upcomingExams.length > 4 && (
                <div className="font-mono text-[10px] text-muted-foreground pt-1">+{upcomingExams.length - 4} more exam{upcomingExams.length - 4 === 1 ? "" : "s"}</div>
              )}
            </div>
          </div>
        )}

        {/* Weekly grid (desktop) */}
        {viewMode === "week" && (
          <div className="hidden md:block px-3 mt-3 pb-16">
            <WeeklyGrid schedule={schedule} todayName={todayName} now={now} onEventClick={setSelectedEvent} onAddClick={openAddForDay} />
          </div>
        )}

        {/* Day view */}
        <div className={viewMode === "week" ? "md:hidden" : ""}>
          {/* Day tabs */}
          <div className="flex gap-1.5 px-3 mt-3 overflow-x-auto no-scrollbar">
            {DAYS.map((day) => {
              const dayEventCount = schedule[day].length;
              const hasExam = schedule[day].some(e => e.tag === "exam");
              return (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={`flex-1 min-w-[52px] py-2.5 flex flex-col items-center border-2 border-foreground transition-all active:translate-y-0.5 relative ${activeDay === day ? "bg-primary text-foreground shadow-brutal-sm" : day === todayName ? "bg-card border-dashed" : "bg-muted text-muted-foreground"}`}
                >
                  <span className="font-mono text-[10px] font-bold uppercase">{DAY_SHORT[day]}</span>
                  <span className={`font-mono text-[9px] mt-0.5 ${activeDay === day ? "text-foreground/70" : "text-muted-foreground"}`}>
                    {dayEventCount} class{dayEventCount !== 1 ? "es" : ""}
                  </span>
                  {day === todayName && (
                    <div className={`w-1.5 h-1.5 rounded-full mt-0.5 ${activeDay === day ? "bg-foreground" : "bg-primary"}`} />
                  )}
                  {hasExam && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive border-2 border-foreground rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Events list */}
          <div className="flex-1 px-3 py-3 space-y-2">
            {dayEvents.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground font-mono text-sm">
                No classes on {activeDay}. Tap + to add one.
              </div>
            ) : (
              dayEvents.map((event) => {
                const duration = (timeToMin(event.endTime) - timeToMin(event.startTime)) / 60;
                const isNow = activeDay === todayName && now >= timeToMin(event.startTime) && now < timeToMin(event.endTime);
                const isPast = activeDay === todayName && now >= timeToMin(event.endTime);

                return (
                  <button
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className={`w-full text-left border-2 transition-all active:translate-y-0.5 relative overflow-hidden ${isNow ? "border-primary bg-primary/5 shadow-brutal-sm" : "border-foreground bg-card shadow-brutal-sm"} ${event.completed ? "opacity-40" : ""} ${isPast && !event.completed ? "opacity-60" : ""}`}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: getSubjectColor(event.subject) }} />
                    <div className="pl-4 pr-3 py-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`font-display font-bold text-sm leading-tight ${event.completed ? "line-through" : ""}`}>{event.subject}</span>
                            {isNow && <span className="font-mono text-[9px] bg-primary text-foreground px-1.5 py-0.5 font-bold uppercase animate-pulse shrink-0">LIVE</span>}
                            {event.tag === "exam" && <span className="font-mono text-[9px] bg-destructive text-destructive-foreground px-1.5 py-0.5 font-bold uppercase shrink-0">EXAM</span>}
                          </div>
                          {event.description && (
                            <div className="font-body text-xs text-muted-foreground mb-1.5 line-clamp-1">{event.description}</div>
                          )}
                          <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{event.startTime}–{event.endTime}</span>
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{event.location}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                          <span className={`font-mono text-[9px] font-bold uppercase px-1.5 py-0.5 border ${TAG_COLORS[event.tag] || TAG_COLORS.lecture}`}>{event.tag}</span>
                          <span className="font-mono text-[10px] text-muted-foreground">{duration}h</span>
                        </div>
                      </div>
                      {isNow && (
                        <div className="mt-2.5 h-1 bg-foreground/10 rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{
                            width: `${Math.min(100, ((now - timeToMin(event.startTime)) / (timeToMin(event.endTime) - timeToMin(event.startTime))) * 100)}%`
                          }} />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Inline stats */}
          <div className="px-3 pb-28">
            <button
              onClick={() => setShowStats(!showStats)}
              className="w-full bg-card border-4 border-foreground font-mono text-xs font-bold uppercase py-3 flex items-center justify-center gap-2 mt-4 shadow-brutal-sm active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              {showStats ? "Hide Stats ↑" : "Show Weekly Stats ↓"}
            </button>
            {showStats && (
              <div className="border-4 border-t-0 border-foreground bg-card p-4 space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="border-2 border-foreground p-3 bg-primary/10 text-center">
                    <div className="font-mono text-[10px] uppercase text-muted-foreground">Classes</div>
                    <div className="font-display font-black text-2xl text-primary">{todayEvents.length}</div>
                  </div>
                  <div className="border-2 border-foreground p-3 bg-accent/10 text-center">
                    <div className="font-mono text-[10px] uppercase text-muted-foreground">Hours</div>
                    <div className="font-display font-black text-2xl">{totalHoursToday}</div>
                  </div>
                  <div className="border-2 border-foreground p-3 text-center">
                    <div className="font-mono text-[10px] uppercase text-muted-foreground">Done</div>
                    <div className="font-display font-black text-2xl">{completedToday}/{todayEvents.length}</div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-mono text-[10px] uppercase text-muted-foreground mb-1.5">
                    <span>Semester Progress</span>
                    <span>Week {semesterWeek}/17</span>
                  </div>
                  <div className="h-3 bg-muted border-2 border-foreground overflow-hidden">
                    <div className="h-full bg-primary transition-all" style={{ width: `${(semesterWeek / 17) * 100}%` }} />
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase text-muted-foreground mb-2 font-bold">Weekly Hours by Subject</div>
                  <div className="space-y-2">
                    {Object.entries(weeklyHours).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([subj, hrs]) => (
                      <div key={subj} className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 border border-foreground" style={{ backgroundColor: getSubjectColor(subj) }} />
                        <span className="font-mono text-[10px] font-bold flex-1 truncate">{subj}</span>
                        <div className="w-24 h-2 bg-muted border border-foreground overflow-hidden">
                          <div className="h-full transition-all" style={{ width: `${(hrs / Math.max(...Object.values(weeklyHours))) * 100}%`, backgroundColor: getSubjectColor(subj) }} />
                        </div>
                        <span className="font-mono text-[9px] text-muted-foreground w-6 text-right">{hrs}h</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>{/* end exportable ref */}

      {/* Event detail bottom sheet */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-end" onClick={() => setSelectedEvent(null)}>
          <div className="absolute inset-0 bg-foreground/50" />
          <div className="relative w-full bg-card border-t-4 border-foreground p-4 pb-8 animate-in slide-in-from-bottom" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full mx-auto mb-4" />
            <button onClick={() => setSelectedEvent(null)} className="absolute top-3 right-3 p-1">
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-4 h-4 rounded-full border-2" style={{ backgroundColor: getSubjectColor(selectedEvent.subject), borderColor: "hsl(var(--foreground))" }} />
              <h2 className="font-display font-black text-xl">{selectedEvent.subject}</h2>
              <span className="font-mono text-[10px] uppercase border border-foreground px-1.5 py-0.5 font-bold ml-auto">{selectedEvent.tag}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{selectedEvent.description}</p>
            <div className="font-mono text-xs space-y-1.5 mb-4">
              <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-primary" />{selectedEvent.startTime} – {selectedEvent.endTime}</div>
              <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-accent" />{selectedEvent.location}</div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <button
                onClick={() => { toggleComplete(selectedEvent.id); setSelectedEvent({...selectedEvent, completed: !selectedEvent.completed}); }}
                className={`border-2 border-foreground py-3 font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 shadow-brutal-sm active:shadow-none active:translate-y-0.5 ${selectedEvent.completed ? "bg-muted" : "bg-primary text-foreground"}`}
              >
                <Check className="w-4 h-4" />{selectedEvent.completed ? "Undo Done" : "Mark Done"}
              </button>
              <button
                onClick={() => { setEditEvent(selectedEvent); setSelectedEvent(null); setShowAddModal(true); }}
                className="border-2 border-foreground bg-card py-3 font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 shadow-brutal-sm active:shadow-none active:translate-y-0.5"
              >
                <Edit3 className="w-4 h-4" />Edit
              </button>
              <button
                onClick={() => setShowPomodoro(true)}
                className="border-2 border-foreground bg-foreground text-card py-3 font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 col-span-2 shadow-brutal-sm active:shadow-none active:translate-y-0.5"
              >
                <Timer className="w-4 h-4" />Start Focus Session
              </button>
              <button
                onClick={() => deleteEvent(selectedEvent.id)}
                className="border-2 border-foreground bg-destructive/10 text-destructive py-3 px-4 font-mono text-xs font-bold uppercase flex items-center justify-center gap-1 col-span-2 active:translate-y-0.5"
              >
                <Trash2 className="w-3.5 h-3.5" />Remove Class
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pomodoro Focus Timer */}
      {showPomodoro && (
        <div className="fixed inset-0 z-50 flex items-end" onClick={() => setShowPomodoro(false)}>
          <div className="absolute inset-0 bg-foreground/50" />
          <div className="relative w-full bg-card border-t-4 border-foreground p-6 pb-10" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full mx-auto mb-4" />
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-black text-xl uppercase">Focus Timer</h2>
              <button onClick={() => setShowPomodoro(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="flex gap-2 mb-6">
              {(["focus", "short", "long"] as const).map(mode => (
                <button key={mode}
                  onClick={() => { setPomodoroMode(mode); setPomodoroActive(false); setPomodoroSeconds(POMODORO_TIMES[mode]); }}
                  className={`flex-1 font-mono text-xs font-bold uppercase py-2 border-2 border-foreground transition-colors ${pomodoroMode === mode ? "bg-primary text-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  {mode === "focus" ? "Focus 25m" : mode === "short" ? "Break 5m" : "Long 15m"}
                </button>
              ))}
            </div>
            <div className="text-center mb-6">
              <div className={`font-mono text-7xl font-black tracking-tighter mb-2 ${pomodoroActive ? "text-primary" : "text-foreground"}`}>
                {String(Math.floor(pomodoroSeconds / 60)).padStart(2, "0")}:{String(pomodoroSeconds % 60).padStart(2, "0")}
              </div>
              <div className="font-mono text-xs text-muted-foreground uppercase">
                {pomodoroMode === "focus" ? "🔥 Lock in. No distractions." : "☕ Rest. You earned it."}
              </div>
              {pomodoroCount > 0 && (
                <div className="font-mono text-xs text-primary mt-1 font-bold">{pomodoroCount} session{pomodoroCount !== 1 ? "s" : ""} completed today</div>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setPomodoroActive(!pomodoroActive)}
                className={`flex-1 border-4 border-foreground font-mono font-bold uppercase py-4 text-lg shadow-brutal active:shadow-none active:translate-x-1 active:translate-y-1 ${pomodoroActive ? "bg-card text-foreground" : "bg-primary text-foreground"}`}
              >
                {pomodoroActive ? "⏸ Pause" : "▶ Start"}
              </button>
              <button
                onClick={() => { setPomodoroActive(false); setPomodoroSeconds(POMODORO_TIMES[pomodoroMode]); }}
                className="border-4 border-foreground bg-muted font-mono font-bold uppercase py-4 px-5 shadow-brutal active:shadow-none active:translate-x-1 active:translate-y-1"
              >
                ↺
              </button>
            </div>
            <div className="mt-4 text-center font-mono text-xs text-muted-foreground">Join a live study room on Discord while you focus</div>
          </div>
        </div>
      )}

      {/* Add/Edit modal */}
      {showAddModal && (
        <EventModal
          initialEvent={editEvent}
          activeDay={addDay || activeDay}
          onSave={saveEvent}
          onClose={() => { setShowAddModal(false); setEditEvent(null); setAddDay(null); }}
        />
      )}

      {/* Manage mode */}
      {showManage && (
        <ManageMode
          schedule={schedule}
          onEdit={(event) => { setEditEvent(event); setShowManage(false); setShowAddModal(true); }}
          onDelete={(id) => deleteEvent(id)}
          onAdd={() => { setShowManage(false); setEditEvent(null); setAddDay(null); setShowAddModal(true); }}
          onClose={() => setShowManage(false)}
        />
      )}
    </div>
  );
};

// ─── Add/Edit Modal ───
const EventModal = ({
  initialEvent, activeDay, onSave, onClose,
}: {
  initialEvent: TimetableEvent | null;
  activeDay: DayName;
  onSave: (day: DayName, event: TimetableEvent) => void;
  onClose: () => void;
}) => {
  const [day, setDay] = useState<DayName>(activeDay);
  const [subject, setSubject] = useState(initialEvent?.subject || "");
  const [startTime, setStartTime] = useState(initialEvent?.startTime || "08:00");
  const [endTime, setEndTime] = useState(initialEvent?.endTime || "09:00");
  const [location, setLocation] = useState(initialEvent?.location || "");
  const [description, setDescription] = useState(initialEvent?.description || "");
  const [tag, setTag] = useState<EventTag>(initialEvent?.tag || "lecture");

  const handleSave = () => {
    if (!subject.trim()) return;
    onSave(day, {
      id: initialEvent?.id || genId(),
      subject: subject.trim(),
      startTime, endTime, location, description, tag,
      completed: initialEvent?.completed || false,
    });
  };

  const inputClass = "w-full border-2 border-foreground bg-background px-3 py-2.5 font-mono text-sm focus:outline-none focus:border-primary";
  const labelClass = "font-mono text-[10px] uppercase font-bold text-muted-foreground mb-1 block";

  return (
    <div className="fixed inset-0 z-50 flex items-end" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/50" />
      <div className="relative w-full bg-card border-t-4 border-foreground p-4 pb-8 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom" onClick={(e) => e.stopPropagation()}>
        <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full mx-auto mb-3" />
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-black text-lg uppercase">{initialEvent ? "Edit Event" : "New Event"}</h2>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-3">
          <div>
            <label className={labelClass}>Subject</label>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} className={inputClass} placeholder="e.g. EMM 211" />
          </div>
          <div>
            <label className={labelClass}>Day</label>
            <select value={day} onChange={(e) => setDay(e.target.value as DayName)} className={inputClass}>
              {DAYS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className={labelClass}>Start</label>
              <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>End</label>
              <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Location</label>
            <input value={location} onChange={(e) => setLocation(e.target.value)} className={inputClass} placeholder="e.g. SC10" />
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <input value={description} onChange={(e) => setDescription(e.target.value)} className={inputClass} placeholder="Optional notes" />
          </div>
          <div>
            <label className={labelClass}>Tag</label>
            <div className="flex gap-1.5 flex-wrap">
              {(["lecture", "lab", "study", "exam"] as EventTag[]).map((t) => (
                <button key={t} onClick={() => setTag(t)} className={`font-mono text-xs font-bold uppercase px-3 py-2 border-2 border-foreground transition-all ${tag === t ? "bg-primary text-foreground shadow-brutal-sm" : "bg-muted text-muted-foreground"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <button onClick={handleSave} className="w-full bg-primary text-foreground border-2 border-foreground py-3 font-mono font-bold uppercase text-sm shadow-brutal-sm active:shadow-none active:translate-x-1 active:translate-y-1 mt-2">
            {initialEvent ? "Save Changes" : "Add Event"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timetable;
