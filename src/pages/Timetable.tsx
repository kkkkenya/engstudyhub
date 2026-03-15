import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, MapPin, BookOpen, ChevronDown, ChevronUp, X, Check, Plus, Trash2, Edit3, GraduationCap } from "lucide-react";
import logoImg from "@/assets/logo.png";

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
const DAY_SHORT: Record<DayName, string> = { Monday: "Mon", Tuesday: "Tue", Wednesday: "Wed", Thursday: "Thu", Friday: "Fri" };

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

const evt = (subject: string, start: string, end: string, location: string, desc: string, tag: EventTag = "lecture"): TimetableEvent => ({
  id: genId(), subject, startTime: start, endTime: end, location, description: desc, tag, completed: false,
});

// ─── Department schedules ───
const DEPARTMENTS: Department[] = [
  {
    id: "mechanical",
    name: "Mechanical Engineering",
    shortName: "Mech",
    schedule: {
      Monday: [
        evt("EMM 211", "09:00", "11:00", "SC10", "Engineering Mathematics"),
        evt("EMM 219", "11:00", "13:00", "SC10", "Thermodynamics"),
        evt("EMM 214", "14:00", "17:00", "TBA", "Fluid Mechanics"),
      ],
      Tuesday: [
        evt("ECU 203", "07:00", "09:00", "SC2", "Communication Skills"),
        evt("EMM 205", "09:00", "12:00", "TBA", "Strength of Materials"),
        evt("EMM 216", "15:00", "17:00", "Workshop", "Workshop Technology", "lab"),
      ],
      Wednesday: [
        evt("EMM 200", "09:00", "12:00", "C.LAB", "Computer Applications", "lab"),
        evt("EMM 216", "14:00", "17:00", "TBA", "Workshop Technology"),
      ],
      Thursday: [
        evt("ECU 202", "07:00", "09:00", "SC2", "Development Studies"),
        evt("EMM 211", "14:00", "17:00", "TBA", "Engineering Mathematics"),
      ],
      Friday: [
        evt("EMM 214", "07:00", "09:00", "OML2", "Fluid Mechanics", "lab"),
        evt("ECU 203", "09:00", "11:00", "SC2", "Communication Skills"),
        evt("EMM 205", "15:00", "17:00", "SC13", "Strength of Materials"),
        evt("EMM 219", "17:00", "18:00", "SC13", "Thermodynamics"),
      ],
    },
  },
  {
    id: "electrical",
    name: "Electrical Engineering",
    shortName: "Elec",
    schedule: {
      Monday: [
        evt("EEE 201", "07:00", "09:00", "SC3", "Circuit Analysis"),
        evt("EEE 210", "10:00", "12:00", "E.LAB", "Electronics Lab", "lab"),
        evt("ECU 203", "14:00", "16:00", "SC2", "Communication Skills"),
      ],
      Tuesday: [
        evt("EEE 205", "08:00", "10:00", "SC5", "Electromagnetic Theory"),
        evt("EEE 215", "11:00", "13:00", "SC5", "Power Systems"),
        evt("EEE 220", "14:00", "17:00", "E.LAB", "Machines Lab", "lab"),
      ],
      Wednesday: [
        evt("EEE 201", "09:00", "11:00", "SC3", "Circuit Analysis"),
        evt("ECU 202", "13:00", "15:00", "SC2", "Development Studies"),
      ],
      Thursday: [
        evt("EEE 205", "07:00", "09:00", "SC5", "Electromagnetic Theory"),
        evt("EEE 215", "10:00", "12:00", "SC5", "Power Systems"),
        evt("EEE 210", "14:00", "16:00", "E.LAB", "Electronics Lab", "lab"),
      ],
      Friday: [
        evt("EEE 220", "08:00", "10:00", "SC3", "Electrical Machines"),
        evt("EMM 200", "11:00", "13:00", "C.LAB", "Computer Applications", "lab"),
      ],
    },
  },
  {
    id: "civil",
    name: "Civil Engineering",
    shortName: "Civil",
    schedule: {
      Monday: [
        evt("ECE 201", "07:00", "09:00", "SC4", "Structural Analysis"),
        evt("ECE 210", "10:00", "13:00", "S.LAB", "Surveying Lab", "lab"),
      ],
      Tuesday: [
        evt("ECE 205", "08:00", "10:00", "SC4", "Geotechnics"),
        evt("ECU 203", "11:00", "13:00", "SC2", "Communication Skills"),
        evt("ECE 215", "14:00", "17:00", "TBA", "Hydraulics"),
      ],
      Wednesday: [
        evt("ECE 201", "09:00", "11:00", "SC4", "Structural Analysis"),
        evt("ECE 220", "13:00", "16:00", "C.LAB", "CAD Lab", "lab"),
      ],
      Thursday: [
        evt("ECU 202", "07:00", "09:00", "SC2", "Development Studies"),
        evt("ECE 205", "10:00", "12:00", "SC4", "Geotechnics"),
        evt("ECE 215", "14:00", "16:00", "TBA", "Hydraulics"),
      ],
      Friday: [
        evt("ECE 210", "08:00", "10:00", "SC4", "Surveying"),
        evt("EMM 200", "11:00", "13:00", "C.LAB", "Computer Applications", "lab"),
        evt("ECE 220", "14:00", "16:00", "TBA", "Construction Technology"),
      ],
    },
  },
  {
    id: "mechatronics",
    name: "Mechatronics Engineering",
    shortName: "Mech-tronics",
    schedule: {
      Monday: [
        evt("EMT 201", "08:00", "10:00", "SC6", "Control Systems"),
        evt("EMT 210", "11:00", "13:00", "R.LAB", "Robotics Lab", "lab"),
        evt("EMM 211", "14:00", "16:00", "SC10", "Engineering Mathematics"),
      ],
      Tuesday: [
        evt("EMT 205", "07:00", "09:00", "SC6", "Microprocessors"),
        evt("ECU 203", "10:00", "12:00", "SC2", "Communication Skills"),
        evt("EMT 215", "14:00", "17:00", "E.LAB", "Sensors & Actuators", "lab"),
      ],
      Wednesday: [
        evt("EMT 201", "09:00", "11:00", "SC6", "Control Systems"),
        evt("EMM 200", "13:00", "16:00", "C.LAB", "Computer Applications", "lab"),
      ],
      Thursday: [
        evt("ECU 202", "07:00", "09:00", "SC2", "Development Studies"),
        evt("EMT 205", "10:00", "12:00", "SC6", "Microprocessors"),
        evt("EMT 210", "14:00", "16:00", "R.LAB", "Robotics Lab", "lab"),
      ],
      Friday: [
        evt("EMT 215", "08:00", "10:00", "SC6", "Sensors & Actuators"),
        evt("EMM 211", "11:00", "13:00", "SC10", "Engineering Mathematics"),
      ],
    },
  },
];

// ─── Helpers ───
const timeToMin = (t: string) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
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

const getCurrentMinutes = () => { const n = new Date(); return n.getHours() * 60 + n.getMinutes(); };

// ─── Component ───
const Timetable = () => {
  const [deptId, setDeptId] = useState<string>(DEPARTMENTS[0].id);
  const [showDeptPicker, setShowDeptPicker] = useState(false);
  const [schedules, setSchedules] = useState<Record<string, Record<DayName, TimetableEvent[]>>>(
    () => Object.fromEntries(DEPARTMENTS.map(d => [d.id, d.schedule]))
  );
  const [activeDay, setActiveDay] = useState<DayName>(getTodayDayName());
  const [selectedEvent, setSelectedEvent] = useState<TimetableEvent | null>(null);
  const [showStats, setShowStats] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editEvent, setEditEvent] = useState<TimetableEvent | null>(null);
  const [now, setNow] = useState(getCurrentMinutes());

  const dept = DEPARTMENTS.find(d => d.id === deptId)!;
  const schedule = schedules[deptId];

  useEffect(() => {
    const interval = setInterval(() => setNow(getCurrentMinutes()), 30000);
    return () => clearInterval(interval);
  }, []);

  const todayName = getTodayDayName();
  const todayEvents = schedule[todayName] || [];

  const getNextClass = useCallback(() => {
    const events = todayEvents.filter(e => !e.completed);
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

  const totalHoursToday = todayEvents.reduce((sum, e) => sum + (timeToMin(e.endTime) - timeToMin(e.startTime)) / 60, 0);
  const completedToday = todayEvents.filter(e => e.completed).length;
  const weeklyHours: Record<string, number> = {};
  Object.values(schedule).flat().forEach(e => {
    const hrs = (timeToMin(e.endTime) - timeToMin(e.startTime)) / 60;
    weeklyHours[e.subject] = (weeklyHours[e.subject] || 0) + hrs;
  });

  const updateSchedule = (updater: (prev: Record<DayName, TimetableEvent[]>) => Record<DayName, TimetableEvent[]>) => {
    setSchedules(prev => ({ ...prev, [deptId]: updater(prev[deptId]) }));
  };

  const toggleComplete = (id: string) => {
    updateSchedule(prev => {
      const updated = { ...prev };
      for (const day of DAYS) {
        updated[day] = updated[day].map(e => e.id === id ? { ...e, completed: !e.completed } : e);
      }
      return updated;
    });
  };

  const deleteEvent = (id: string) => {
    updateSchedule(prev => {
      const updated = { ...prev };
      for (const day of DAYS) {
        updated[day] = updated[day].filter(e => e.id !== id);
      }
      return updated;
    });
    setSelectedEvent(null);
  };

  const saveEvent = (day: DayName, event: TimetableEvent) => {
    updateSchedule(prev => {
      const updated = { ...prev };
      if (editEvent) {
        for (const d of DAYS) {
          updated[d] = updated[d].filter(e => e.id !== editEvent.id);
        }
      }
      updated[day] = [...updated[day], event].sort((a, b) => timeToMin(a.startTime) - timeToMin(b.startTime));
      return updated;
    });
    setShowAddModal(false);
    setEditEvent(null);
  };

  const dayEvents = schedule[activeDay];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="bg-card border-b-4 border-foreground px-3 py-2.5 flex items-center justify-between sticky top-0 z-40">
        <Link to="/" className="flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          <img src={logoImg} alt="Hub" className="h-7 w-auto" />
        </Link>
        <h1 className="font-display font-bold text-sm uppercase tracking-wider">Timetable</h1>
        <button onClick={() => { setEditEvent(null); setShowAddModal(true); }} className="bg-primary text-foreground border-2 border-foreground p-1.5 shadow-brutal-sm active:shadow-none active:translate-x-1 active:translate-y-1">
          <Plus className="w-5 h-5" />
        </button>
      </header>

      {/* Department selector */}
      <div className="px-3 mt-3">
        <button
          onClick={() => setShowDeptPicker(!showDeptPicker)}
          className="w-full flex items-center justify-between bg-card border-2 border-foreground px-3 py-2.5 shadow-brutal-sm active:shadow-none active:translate-x-1 active:translate-y-1"
        >
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="font-display font-bold text-sm">{dept.name}</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform ${showDeptPicker ? "rotate-180" : ""}`} />
        </button>
        {showDeptPicker && (
          <div className="border-2 border-t-0 border-foreground bg-card divide-y-2 divide-foreground">
            {DEPARTMENTS.map(d => (
              <button
                key={d.id}
                onClick={() => { setDeptId(d.id); setShowDeptPicker(false); setSelectedEvent(null); }}
                className={`w-full text-left px-3 py-3 font-mono text-sm font-bold transition-colors active:bg-primary/20
                  ${d.id === deptId ? "bg-primary/10 text-primary" : "hover:bg-muted"}`}
              >
                <div className="flex items-center justify-between">
                  <span>{d.name}</span>
                  {d.id === deptId && <Check className="w-4 h-4 text-primary" />}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Next class banner */}
      {nextClass && (
        <div className="mx-3 mt-3 border-2 border-foreground bg-card p-3 shadow-brutal-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="font-mono text-xs uppercase font-bold text-muted-foreground">
                {nextClass.minsUntil < 0 ? "Happening Now" : "Next Class"}
              </span>
            </div>
            <span className="font-mono text-lg font-black text-primary">
              {nextClass.minsUntil < 0 ? "IN SESSION" : formatCountdown(nextClass.minsUntil)}
            </span>
          </div>
          <div className="mt-1.5 flex items-center justify-between">
            <span className="font-display font-bold text-base">{nextClass.event.subject}</span>
            <span className="font-mono text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3 h-3" />{nextClass.event.location}
            </span>
          </div>
          <div className="font-mono text-xs text-muted-foreground mt-0.5">
            {nextClass.event.startTime} – {nextClass.event.endTime}
          </div>
        </div>
      )}

      {/* Day tabs */}
      <div className="flex gap-1 px-3 mt-3 overflow-x-auto no-scrollbar">
        {DAYS.map(day => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`flex-1 min-w-[56px] py-2.5 font-mono text-xs font-bold uppercase border-2 border-foreground transition-all active:translate-y-0.5
              ${activeDay === day
                ? "bg-primary text-foreground shadow-brutal-sm"
                : day === todayName
                  ? "bg-card text-foreground border-dashed"
                  : "bg-muted text-muted-foreground"
              }`}
          >
            {DAY_SHORT[day]}
            {day === todayName && <div className="w-1.5 h-1.5 rounded-full bg-primary mx-auto mt-1" />}
          </button>
        ))}
      </div>

      {/* Events list */}
      <div className="flex-1 px-3 py-3 space-y-2 pb-24">
        {dayEvents.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground font-mono text-sm">
            No classes on {activeDay}. Tap + to add one.
          </div>
        ) : (
          dayEvents.map(event => {
            const duration = (timeToMin(event.endTime) - timeToMin(event.startTime)) / 60;
            const isNow = activeDay === todayName && now >= timeToMin(event.startTime) && now < timeToMin(event.endTime);
            const isPast = activeDay === todayName && now >= timeToMin(event.endTime);
            return (
              <button
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className={`w-full text-left border-2 border-foreground p-3 transition-all active:translate-y-0.5
                  ${isNow ? "bg-primary/10 border-primary shadow-brutal-sm" : "bg-card shadow-brutal-sm"}
                  ${event.completed ? "opacity-50" : ""}
                  ${isPast && !event.completed ? "opacity-70" : ""}
                `}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full border-2 flex-shrink-0"
                        style={{ backgroundColor: getSubjectColor(event.subject), borderColor: "hsl(var(--foreground))" }}
                      />
                      <span className={`font-display font-bold text-sm ${event.completed ? "line-through" : ""}`}>
                        {event.subject}
                      </span>
                      {isNow && <span className="font-mono text-[10px] bg-primary text-foreground px-1.5 py-0.5 font-bold uppercase">Live</span>}
                    </div>
                    <div className="font-mono text-xs text-muted-foreground mt-1 flex items-center gap-3">
                      <span>{event.startTime}–{event.endTime}</span>
                      <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{event.location}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-mono text-[10px] uppercase border border-foreground px-1.5 py-0.5 font-bold">
                      {event.tag}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground">{duration}h</span>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Stats toggle */}
      <div className="fixed bottom-0 left-0 right-0 z-30">
        <button
          onClick={() => setShowStats(!showStats)}
          className="w-full bg-foreground text-card font-mono text-xs font-bold uppercase py-2.5 flex items-center justify-center gap-2 border-t-2 border-foreground"
        >
          <BookOpen className="w-3.5 h-3.5" />
          Stats {showStats ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
        </button>
        {showStats && (
          <div className="bg-card border-t-2 border-foreground p-3 space-y-3 max-h-[45vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-2">
              <div className="border-2 border-foreground p-2.5 bg-primary/10">
                <div className="font-mono text-[10px] uppercase text-muted-foreground">Today's Classes</div>
                <div className="font-display font-black text-2xl">{todayEvents.length}</div>
              </div>
              <div className="border-2 border-foreground p-2.5 bg-accent/10">
                <div className="font-mono text-[10px] uppercase text-muted-foreground">Hours Today</div>
                <div className="font-display font-black text-2xl">{totalHoursToday}</div>
              </div>
              <div className="border-2 border-foreground p-2.5 bg-card col-span-2">
                <div className="font-mono text-[10px] uppercase text-muted-foreground">Completed</div>
                <div className="font-display font-black text-2xl">{completedToday}/{todayEvents.length}</div>
              </div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase text-muted-foreground mb-2">Weekly Hours by Subject</div>
              <div className="space-y-1.5">
                {Object.entries(weeklyHours).sort((a, b) => b[1] - a[1]).map(([subj, hrs]) => (
                  <div key={subj} className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: getSubjectColor(subj) }}
                    />
                    <span className="font-mono text-xs font-bold flex-1">{subj}</span>
                    <div className="flex-1 h-2 bg-muted border border-foreground">
                      <div className="h-full" style={{ width: `${(hrs / Math.max(...Object.values(weeklyHours))) * 100}%`, backgroundColor: getSubjectColor(subj) }} />
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground w-8 text-right">{hrs}h</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Event detail bottom sheet */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-end" onClick={() => setSelectedEvent(null)}>
          <div className="absolute inset-0 bg-foreground/50" />
          <div className="relative w-full bg-card border-t-4 border-foreground p-4 pb-8 animate-in slide-in-from-bottom" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full mx-auto mb-4" />
            <button onClick={() => setSelectedEvent(null)} className="absolute top-3 right-3 p-1">
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-4 h-4 rounded-full border-2"
                style={{ backgroundColor: getSubjectColor(selectedEvent.subject), borderColor: "hsl(var(--foreground))" }}
              />
              <h2 className="font-display font-black text-xl">{selectedEvent.subject}</h2>
              <span className="font-mono text-[10px] uppercase border border-foreground px-1.5 py-0.5 font-bold ml-auto">{selectedEvent.tag}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{selectedEvent.description}</p>
            <div className="font-mono text-xs space-y-1.5 mb-4">
              <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-primary" />{selectedEvent.startTime} – {selectedEvent.endTime}</div>
              <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-accent" />{selectedEvent.location}</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { toggleComplete(selectedEvent.id); setSelectedEvent({ ...selectedEvent, completed: !selectedEvent.completed }); }}
                className={`flex-1 border-2 border-foreground py-3 font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 shadow-brutal-sm active:shadow-none active:translate-x-1 active:translate-y-1
                  ${selectedEvent.completed ? "bg-muted" : "bg-primary"}`}
              >
                <Check className="w-4 h-4" />{selectedEvent.completed ? "Undo" : "Done"}
              </button>
              <button
                onClick={() => { setEditEvent(selectedEvent); setSelectedEvent(null); setShowAddModal(true); }}
                className="flex-1 border-2 border-foreground bg-card py-3 font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 shadow-brutal-sm active:shadow-none active:translate-x-1 active:translate-y-1"
              >
                <Edit3 className="w-4 h-4" />Edit
              </button>
              <button
                onClick={() => deleteEvent(selectedEvent.id)}
                className="border-2 border-foreground bg-destructive text-destructive-foreground py-3 px-4 font-mono text-xs font-bold uppercase flex items-center justify-center shadow-brutal-sm active:shadow-none active:translate-x-1 active:translate-y-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit modal */}
      {showAddModal && (
        <EventModal
          initialEvent={editEvent}
          activeDay={activeDay}
          onSave={saveEvent}
          onClose={() => { setShowAddModal(false); setEditEvent(null); }}
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
      <div className="relative w-full bg-card border-t-4 border-foreground p-4 pb-8 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom" onClick={e => e.stopPropagation()}>
        <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full mx-auto mb-3" />
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-black text-lg uppercase">{initialEvent ? "Edit Event" : "New Event"}</h2>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-3">
          <div>
            <label className={labelClass}>Subject</label>
            <input value={subject} onChange={e => setSubject(e.target.value)} className={inputClass} placeholder="e.g. EMM 211" />
          </div>
          <div>
            <label className={labelClass}>Day</label>
            <select value={day} onChange={e => setDay(e.target.value as DayName)} className={inputClass}>
              {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className={labelClass}>Start</label>
              <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>End</label>
              <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Location</label>
            <input value={location} onChange={e => setLocation(e.target.value)} className={inputClass} placeholder="e.g. SC10" />
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <input value={description} onChange={e => setDescription(e.target.value)} className={inputClass} placeholder="Optional notes" />
          </div>
          <div>
            <label className={labelClass}>Tag</label>
            <div className="flex gap-1.5 flex-wrap">
              {(["lecture", "lab", "study", "exam"] as EventTag[]).map(t => (
                <button
                  key={t}
                  onClick={() => setTag(t)}
                  className={`font-mono text-xs font-bold uppercase px-3 py-2 border-2 border-foreground transition-all
                    ${tag === t ? "bg-primary text-foreground shadow-brutal-sm" : "bg-muted text-muted-foreground"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleSave}
            className="w-full bg-primary text-foreground border-2 border-foreground py-3 font-mono font-bold uppercase text-sm shadow-brutal-sm active:shadow-none active:translate-x-1 active:translate-y-1 mt-2"
          >
            {initialEvent ? "Save Changes" : "Add Event"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timetable;
