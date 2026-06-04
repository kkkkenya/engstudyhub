## Goal

Replace the current Timetable page with an exam-only view. Classes, the weekly class grid, day tabs, manage mode, Pomodoro, and color-coded class blocks are all removed. What remains is a minimal weekly exam table grouped by academic year, with a department filter and per-year CSV/PDF export.

## Page structure (top → bottom)

1. **Header** — Back link, page title "Exam Timetable — June 2026", brief subtitle. No share/export buttons here.
2. **Department filter** — Two toggle buttons: Mechanical / Aerospace. (Same `deptId` state as today, default keeps current behavior.)
3. **Year sections** — One block per year, rendered in order: Year 1, Year 2, Year 3, Year 4, Year 5. A year section is hidden if it has zero exams after filtering.

Each year section contains:
- Section header row: `Year N` label on the left, small CSV + PDF icon buttons on the right.
- A single week-view table beneath it.

## Year-grouping rule

- Derive year from the first digit of the 3-digit course number: `EMM 214 → 2`, `EAR 312 → 3`, `ECU 103 → 1`, `EMM 508 → 5`.
- Shared units (ECU / UCU / EEE) appear under **every** year section that has at least one departmental exam, since multiple cohorts sit them. (Confirmed in clarifying answer.)
- Implementation: `const yearOf = (code) => parseInt(code.match(/\d/)?.[0] ?? "0", 10)` then a `isShared(code)` check for ECU/UCU/EEE.

## Week-view table (per year)

A simple HTML table — no absolute-positioned grid, no color blocks.

```text
        | Mon 8 Jun | Tue 9 Jun | Wed 10 Jun | Thu 11 Jun | Fri 12 Jun
--------+-----------+-----------+------------+------------+-----------
08:00   |  EMM 508  |  EMM 214  |            |  ECU 202   |  ECU 302
        |  Flexible…|  Elec II  |            |  Eng Maths │  Innov…
        |  BSSC 280 |  TR2/3    |            |  OML11     |  AZ39…
--------+-----------+-----------+------------+------------+-----------
11:00   |           |  EMM 420  |            |            |  EAR 101
…
```

Details:
- Columns: Mon–Fri (5). Each column header shows the actual date for that week's row of exams; since exams span two weeks (8–12 June and 15–19 June), render **two tables stacked** per year (Week 1, Week 2), each with its own date headers. Skip a week if it has zero exams for that year.
- Rows: distinct start times that appear in the data for that year/week (typically 08:00, 11:00, 14:00, 16:30).
- Cell content (only these fields, stacked, mono font):
  - Unit code (bold)
  - Unit name (smaller)
  - Time range (e.g. 08:00–10:00)
  - Venue
- Multiple exams in the same cell stack vertically separated by a thin divider.
- Styling: plain 1px `border-foreground/20` borders, `bg-card` header row, alternating row shading via `even:bg-muted/30`. No badges, no subject colors, no `shadow-brutal`. Empty cells render blank.

## Per-year export buttons

- Reuse existing `exportAsCSV` / `exportAsPDF` logic but parameterize by year + dept.
- Buttons sit in the year section header, right-aligned, small icon-only ghost buttons with tooltips ("Export CSV", "Export PDF").
- CSV columns: `Date, Day, Start, End, Code, Title, Venue`. Filename: `exams-{dept.shortName}-year{N}.csv`.
- PDF: print-friendly HTML table, same columns, page title `{dept.name} — Year {N} Exams`.

## Code removed

From `src/pages/Timetable.tsx`:
- `TimetableEvent`, `Department`, `DEPARTMENTS`, `PALETTE`, `getSubjectColor`, `evt`, `genId`.
- `WeeklyGrid`, `ManageMode`, day-tab list view, Pomodoro timer, week tracker, add/edit/delete event flows, related state and modals.
- "Upcoming exam" hero banner and countdown logic (page is now a pure reference table — no countdown).
- All `lucide-react` icons no longer used (keep `ArrowLeft`, `FileText`, `FileSpreadsheet`).
- `html-to-image` import and `toPng` usage.

## Code kept / refactored

- `EXAMS` array and `examFor` mapping (unchanged).
- `ExamEntry`, `DeptId` types.
- Department filter state (`deptId`) and toggle UI.
- Export helpers, refactored to take `(year, exams)` and produce per-year output.

## Memory updates

After implementation, update:
- `mem://features/timetable-system` → rewrite to describe exam-only year-grouped week view (drop class schedule, Pomodoro, week tracker references).
- Delete `mem://architecture/timetable-layout` (absolute-positioning math no longer applies) and remove its entry from `mem://index.md`.

## Files touched

- `src/pages/Timetable.tsx` — major rewrite (~1200 lines → ~250 lines).
- `mem://index.md`, `mem://features/timetable-system`, `mem://architecture/timetable-layout` — memory cleanup.

No other pages, routes, or components change.