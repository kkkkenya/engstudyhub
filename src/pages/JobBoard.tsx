import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import logoImg from "@/assets/logo.png";
import { ArrowLeft, MessageCircle, Search, ExternalLink, Copy, Check, Briefcase, MapPin, Clock, RefreshCw } from "lucide-react";

const DISCORD_URL = "https://discord.gg/7yUz2rXumm";
const WHATSAPP_URL = "https://wa.me/254745947704";
const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

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
  FULLTIME: "bg-emerald-100 text-emerald-800",
  PARTTIME: "bg-amber-100 text-amber-800",
  INTERN: "bg-blue-100 text-blue-800",
  CONTRACTOR: "bg-red-100 text-red-800",
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

  const buildQuery = useCallback(() => {
    let q = field !== "All fields" ? `${field} engineering` : activeQuery || "engineering";
    if (location === "Kenya only") q += " in Kenya";
    else if (location === "Remote only") q += " remote";
    else if (location === "Kenya & Remote") q += " Kenya";
    return q;
  }, [activeQuery, field, location]);

  const fetchJobs = useCallback(async () => {
    if (!RAPIDAPI_KEY) {
      setError("API key not configured. Please set VITE_RAPIDAPI_KEY.");
      setLoading(false);
      return;
    }
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
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      {/* Header */}
      <div className="border-b border-white/10 bg-gray-950/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <img src={logoImg} alt="Logo" className="w-8 h-8 rounded-lg object-cover" />
            </Link>
            <Link to="/" className="flex items-center gap-1 text-white/60 hover:text-white text-sm transition">
              <ArrowLeft className="w-4 h-4" /> Back
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-white/60 text-sm">Job Board</span>
          </div>
          <a href={DISCORD_URL} target="_blank" rel="noreferrer"
            className="text-xs bg-white/10 hover:bg-white/20 transition px-3 py-1.5 rounded-lg">
            Join Discord →
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Hero */}
        <div className="mb-10">
          <div className="inline-block text-xs font-medium bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            Real opportunities. Updated live.
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Engineering job board</h1>
          <p className="text-white/50 text-lg max-w-2xl">
            Live engineering opportunities in Kenya and remote — updated in real time.
          </p>
        </div>

        {/* Search */}
        <div className="flex gap-2 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
              placeholder="Search job titles, keywords..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 transition"
            />
          </div>
          <button onClick={handleSearch}
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl text-sm font-medium transition">
            Search
          </button>
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
              <label className="block text-xs text-white/40 mb-1">{f.label}</label>
              <select value={f.val} onChange={e => f.set(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500/50 cursor-pointer">
                {f.opts.map(o => <option key={o.value} value={o.value} className="bg-gray-900">{o.label}</option>)}
              </select>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
          <span className="text-white/60">{jobs.length} jobs found</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-xs">Updated now</span>
          </span>
          <span className="text-white/30">Query: "{buildQuery()}"</span>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-white/10 rounded w-3/4" />
                    <div className="h-3 bg-white/10 rounded w-1/2" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-white/10 rounded w-full" />
                  <div className="h-3 bg-white/10 rounded w-5/6" />
                </div>
                <div className="flex gap-2 mt-4">
                  <div className="h-8 bg-white/10 rounded-lg flex-1" />
                  <div className="h-8 bg-white/10 rounded-lg w-16" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-20">
            <p className="text-white/50 mb-4">{error}</p>
            <button onClick={fetchJobs}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition">
              <RefreshCw className="w-4 h-4" /> Retry
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && jobs.length === 0 && (
          <div className="text-center py-20 text-white/30">
            No jobs found for "{buildQuery()}". Try a different search.
          </div>
        )}

        {/* Job cards */}
        {!loading && !error && jobs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs.map(job => (
              <div key={job.job_id} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col hover:border-orange-500/40 transition group">
                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                  {job.employer_logo ? (
                    <img src={job.employer_logo} alt={job.employer_name} className="w-10 h-10 rounded-lg object-contain bg-white" />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-bold">
                      {getInitials(job.employer_name)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm leading-snug group-hover:text-orange-400 transition truncate">
                      {job.job_title}
                    </h3>
                    <p className="text-white/50 text-xs truncate">{job.employer_name}</p>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="flex items-center gap-1 text-xs text-white/40">
                    <MapPin className="w-3 h-3" />
                    {job.job_city || job.job_country || "N/A"}
                  </span>
                  {job.job_is_remote && (
                    <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-md">Remote</span>
                  )}
                  {job.job_employment_type && (
                    <span className={`text-xs px-2 py-0.5 rounded-md ${typeColors[job.job_employment_type] || "bg-white/10 text-white/60"}`}>
                      {typeLabels[job.job_employment_type] || job.job_employment_type}
                    </span>
                  )}
                </div>

                {/* Date */}
                <div className="flex items-center gap-1 text-xs text-white/30 mb-3">
                  <Clock className="w-3 h-3" />
                  {daysAgo(job.job_posted_at_datetime_utc)}
                </div>

                {/* Description */}
                <p className="text-white/40 text-xs leading-relaxed mb-4 flex-1">
                  {job.job_description?.slice(0, 120)}...
                </p>

                {/* Actions */}
                <div className="flex gap-2 mt-auto">
                  <a href={job.job_apply_link} target="_blank" rel="noreferrer"
                    className="flex-1 text-center text-xs bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-lg transition inline-flex items-center justify-center gap-1">
                    <ExternalLink className="w-3 h-3" /> Apply now
                  </a>
                  <button onClick={() => copyLink(job.job_id, job.job_apply_link)}
                    className="text-xs border border-white/20 hover:bg-white/10 text-white/70 px-3 py-2 rounded-lg transition inline-flex items-center gap-1">
                    {copiedId === job.job_id ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Share</>}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* WhatsApp CTA */}
        <div className="mt-16 mb-8 text-center">
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-6 py-3 rounded-xl text-sm transition">
            <MessageCircle className="w-5 h-5" /> Chat with us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
