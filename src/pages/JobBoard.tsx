import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import logoImg from "@/assets/logo-new.jpeg";
import { ArrowLeft, MessageCircle, Search, ExternalLink, Copy, Check, MapPin, Clock, RefreshCw } from "lucide-react";

const DISCORD_URL = "https://discord.gg/7yUz2rXumm";
const WHATSAPP_URL = "https://wa.me/254745947704";
const RAPIDAPI_KEY = "244a802cf2mshc55a541dd3546ffp191c45jsn71c1c8ef1c75";

interface Job {
  job_id: string;
  job_title: string;
  employer_name: string;
  employer_logo: string | null;
  job_city: string;
  job_state: string;
  job_country: string;
  job_description: string;
  job_apply_link: string;
  job_is_remote: boolean;
  job_employment_type: string;
  job_posted_at_datetime_utc: string;
  job_publisher: string;
}

const JOB_TYPES = [
  { label: "All types", value: "" },
  { label: "Full-time", value: "FULLTIME" },
  { label: "Part-time", value: "PARTTIME" },
  { label: "Internship", value: "INTERN" },
  { label: "Contract", value: "CONTRACTOR" },
];

const LOCATIONS = ["Kenya & Remote", "Kenya only", "Remote only", "Global"];

const FIELDS = [
  "All fields", "Civil", "Mechanical", "Electrical", "Software",
  "Environmental", "Biomedical", "Aerospace",
];

const DATE_POSTED = [
  { label: "Any time", value: "all" },
  { label: "Last 24h", value: "today" },
  { label: "Last 7 days", value: "week" },
  { label: "Last 30 days", value: "month" },
];

const typeColors: Record<string, string> = {
  FULLTIME: "bg-primary/20 text-foreground border-2 border-foreground",
  PARTTIME: "bg-accent/20 text-foreground border-2 border-foreground",
  INTERN: "bg-card text-foreground border-2 border-foreground",
  CONTRACTOR: "bg-destructive/20 text-foreground border-2 border-foreground",
};

const typeLabels: Record<string, string> = {
  FULLTIME: "Full-time",
  PARTTIME: "Part-time",
  INTERN: "Internship",
  CONTRACTOR: "Contract",
};

function daysAgo(dateStr: string): string {
  if (!dateStr) return "";
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "1 day ago";
  return `${diff} days ago`;
}

function getInitials(name: string): string {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

export default function JobBoard() {
  const [searchInput, setSearchInput] = useState("");
  const [activeQuery, setActiveQuery] = useState("engineering");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("Kenya & Remote");
  const [field, setField] = useState("All fields");
  const [datePosted, setDatePosted] = useState("all");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    document.title = "Engineering Jobs | Engineering Hub";
  }, []);

  useEffect(() => {
    const handler = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const applyQuickFilter = (filter: string) => {
    if (filter === "Kenya & Remote") { setLocation("Kenya & Remote"); setJobType(""); }
    else if (filter === "Kenya Only") { setLocation("Kenya only"); setJobType(""); }
    else if (filter === "Remote Only") { setLocation("Remote only"); setJobType(""); }
    else if (filter === "Internships Only") { setJobType("INTERN"); }
  };

  const clearFilters = () => {
    setJobType("");
    setLocation("Kenya & Remote");
    setField("All fields");
    setDatePosted("all");
    setSearchInput("");
    setActiveQuery("engineering");
  };

  const buildQuery = useCallback(() => {
    let q = field !== "All fields" ? `${field} engineering` : activeQuery || "engineering";
    if (location === "Kenya only") q += " in Kenya";
    else if (location === "Remote only") q += " remote";
    else if (location === "Kenya & Remote") q += " Kenya";
    return q;
  }, [activeQuery, field, location]);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        query: buildQuery(),
        page: "1",
        num_pages: "1",
        country: location === "Global" ? "" : "KE",
        date_posted: datePosted,
      });
      if (jobType) params.set("employment_types", jobType);

      const res = await fetch(`https://jsearch.p.rapidapi.com/search?${params}`, {
        headers: {
          "x-rapidapi-key": RAPIDAPI_KEY,
          "x-rapidapi-host": "jsearch.p.rapidapi.com",
        },
      });
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      setJobs(data.data || []);
    } catch (e: any) {
      setError(e.message || "Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  }, [buildQuery, jobType, datePosted, location]);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  const handleSearch = () => {
    setActiveQuery(searchInput || "engineering");
  };

  const copyLink = (id: string, link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      {/* Header */}
      <div className="border-b-4 border-foreground bg-card sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <img src={logoImg} alt="Engineering Hub" className="h-10 md:h-12 w-auto" />
              <span className="font-display font-black tracking-tight hidden sm:inline uppercase">Engineering Hub</span>
            </Link>
            <span className="text-muted-foreground hidden sm:inline font-mono">/</span>
            <span className="text-muted-foreground text-sm font-mono">Job Board</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition flex items-center gap-1 font-mono">
              <ArrowLeft className="w-3 h-3" /> Back
            </Link>
            <a href={DISCORD_URL} target="_blank" rel="noreferrer"
              className="text-xs bg-foreground text-card font-display font-bold uppercase px-3 py-1.5 border-2 border-foreground shadow-brutal-sm hover:bg-primary transition active:shadow-none active:translate-x-0.5 active:translate-y-0.5">
              Discord →
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Hero */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-block text-xs font-display font-bold bg-primary text-foreground px-3 py-1 border-2 border-foreground mb-4 uppercase tracking-wider">
            Real opportunities. Updated live.
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-black tracking-tight mb-3 uppercase">
            Engineering job board
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl font-body">
            Live engineering opportunities in Kenya and remote — updated in real time.
          </p>
        </div>

        {/* Search */}
        <div className="flex gap-2 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
              placeholder="Search job titles, keywords..."
              className="w-full bg-card border-2 border-foreground pl-10 pr-4 py-3 text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>
          <button onClick={handleSearch}
            className="bg-primary text-foreground px-5 py-3 text-sm font-display font-bold uppercase border-2 border-foreground shadow-brutal hover:shadow-brutal-sm transition btn-brutal">
            Search
          </button>
        </div>

        {/* Quick filter chips */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {["Kenya & Remote", "Kenya Only", "Remote Only", "Internships Only"].map(filter => (
            <button
              key={filter}
              onClick={() => applyQuickFilter(filter)}
              className="font-mono text-xs border-2 border-foreground px-3 py-1.5 hover:bg-primary/20 transition-colors text-muted-foreground hover:text-foreground"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Job type", val: jobType, set: (v: string) => setJobType(v), opts: JOB_TYPES.map(t => ({ label: t.label, value: t.value })) },
            { label: "Location", val: location, set: (v: string) => setLocation(v), opts: LOCATIONS.map(l => ({ label: l, value: l })) },
            { label: "Field", val: field, set: (v: string) => setField(v), opts: FIELDS.map(f => ({ label: f, value: f })) },
            { label: "Date posted", val: datePosted, set: (v: string) => setDatePosted(v), opts: DATE_POSTED.map(d => ({ label: d.label, value: d.value })) },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-xs text-muted-foreground mb-1 font-mono uppercase">{f.label}</label>
              <select value={f.val} onChange={e => f.set(e.target.value)}
                className="w-full bg-card border-2 border-foreground px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer">
                {f.opts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm font-mono">
          <span className="bg-foreground text-card px-3 py-1 font-bold">{jobs.length} jobs found</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-xs font-bold">Updated now</span>
          </span>
          <span className="text-muted-foreground text-xs">Query: "{buildQuery()}"</span>
        </div>

        {/* Last updated */}
        <div className="font-mono text-xs text-muted-foreground text-right mb-4">
          Updated {new Date().toLocaleTimeString("en-KE", { hour: "2-digit", minute: "2-digit" })}
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-card border-2 border-foreground p-5 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-muted border-2 border-foreground" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted w-3/4" />
                    <div className="h-3 bg-muted w-1/2" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-muted w-full" />
                  <div className="h-3 bg-muted w-5/6" />
                </div>
                <div className="flex gap-2 mt-4">
                  <div className="h-8 bg-muted flex-1" />
                  <div className="h-8 bg-muted w-16" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-20">
            <div className="bg-card border-2 border-foreground p-8 max-w-md mx-auto shadow-brutal">
              <p className="text-muted-foreground mb-4 font-mono text-sm">{error}</p>
              <button onClick={fetchJobs}
                className="inline-flex items-center gap-2 bg-primary text-foreground px-5 py-2.5 text-sm font-display font-bold uppercase border-2 border-foreground shadow-brutal-sm hover:shadow-none transition btn-brutal">
                <RefreshCw className="w-4 h-4" /> Retry
              </button>
            </div>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && jobs.length === 0 && (
          <div className="text-center py-16 border-2 border-foreground bg-card">
            <div className="text-4xl mb-3">🔍</div>
            <div className="font-display font-bold text-xl mb-2">No Jobs Found</div>
            <div className="font-body text-muted-foreground text-sm mb-4 max-w-md mx-auto px-4">
              No {field !== "All fields" ? field + " " : ""}roles right now. New jobs drop daily — check back tomorrow or widen your search.
            </div>
            <button
              onClick={clearFilters}
              className="font-mono text-xs border-2 border-foreground px-4 py-2 hover:bg-primary/20 transition-colors text-muted-foreground"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Job cards */}
        {!loading && !error && jobs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map(job => (
              <div key={job.job_id} className="bg-card border-2 border-foreground p-5 flex flex-col hover:shadow-brutal transition-shadow group">
                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                  {job.employer_logo ? (
                    <img src={job.employer_logo} alt={job.employer_name} className="w-10 h-10 object-contain bg-card border-2 border-foreground" />
                  ) : (
                    <div className="w-10 h-10 bg-primary text-foreground flex items-center justify-center text-xs font-display font-black border-2 border-foreground">
                      {getInitials(job.employer_name)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-sm leading-snug group-hover:text-primary transition truncate uppercase">
                      {job.job_title}
                    </h3>
                    <p className="text-muted-foreground text-xs font-mono truncate">{job.employer_name}</p>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                    <MapPin className="w-3 h-3" />
                    {job.job_city || job.job_country || "N/A"}
                  </span>
                  {job.job_is_remote && (
                    <span className="text-xs bg-primary/20 text-foreground px-2 py-0.5 border border-foreground font-mono font-bold">Remote</span>
                  )}
                  {job.job_employment_type && (
                    <span className={`text-xs px-2 py-0.5 font-mono font-bold ${typeColors[job.job_employment_type] || "bg-muted text-foreground border-2 border-foreground"}`}>
                      {typeLabels[job.job_employment_type] || job.job_employment_type}
                    </span>
                  )}
                </div>

                {/* Date */}
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3 font-mono">
                  <Clock className="w-3 h-3" />
                  {daysAgo(job.job_posted_at_datetime_utc)}
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-xs leading-relaxed mb-4 flex-1 font-body line-clamp-2">
                  {job.job_description?.slice(0, 120)}...
                </p>

                {/* Actions */}
                <div className="flex gap-2 mt-auto">
                  <a href={job.job_apply_link} target="_blank" rel="noreferrer"
                    className="flex-1 text-center text-xs bg-primary text-foreground font-display font-bold uppercase py-2 border-2 border-foreground shadow-brutal-sm hover:shadow-none transition inline-flex items-center justify-center gap-1 btn-brutal">
                    <ExternalLink className="w-3 h-3" /> Apply now
                  </a>
                  <button onClick={() => copyLink(job.job_id, job.job_apply_link)}
                    className="text-xs border-2 border-foreground bg-card hover:bg-muted text-foreground px-3 py-2 transition inline-flex items-center gap-1 font-mono btn-brutal">
                    {copiedId === job.job_id ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Share</>}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* WhatsApp CTA */}
        <div className="mt-12 mb-8 bg-card border-4 border-foreground p-6 sm:p-8 text-center shadow-brutal">
          <h3 className="text-lg sm:text-xl font-display font-black uppercase mb-2">Need career advice?</h3>
          <p className="text-muted-foreground text-sm mb-4 font-body">
            Chat with us on WhatsApp — we'll help with CVs, applications, and interview prep.
          </p>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-foreground font-display font-bold uppercase px-6 py-3 text-sm border-2 border-foreground shadow-brutal-sm hover:shadow-none transition btn-brutal">
            <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
          </a>
        </div>
      </div>

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-4 z-40 w-11 h-11 bg-primary border-4 border-foreground shadow-brutal font-mono font-black text-foreground text-lg flex items-center justify-center hover:-translate-y-1 transition-transform active:shadow-none active:translate-y-0"
        >
          ↑
        </button>
      )}
    </div>
  );
}
