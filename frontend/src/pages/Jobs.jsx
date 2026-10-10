import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "../App.css";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    API.get("/jobs").then((res) => setJobs(res.data)).catch((error) => { console.error(error); setFailed(true); }).finally(() => setLoading(false));
  }, []);

  const filteredJobs = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return jobs;
    return jobs.filter((job) => [job.title, job.company, job.location, job.description].some((field) => field?.toLowerCase().includes(value)));
  }, [jobs, query]);

  return (
    <><Navbar /><main className="jobs-page">
      <header className="page-intro"><span className="eyebrow">Find your fit</span><h1>Explore open roles</h1><p>Discover your next opportunity from our latest listings.</p></header>
      <label className="form-field" style={{ maxWidth: 540, marginBottom: 28 }}>Search jobs by title, company, or location
        <input type="search" placeholder="Try “designer” or “New York”" value={query} onChange={(event) => setQuery(event.target.value)} />
      </label>
      {loading ? <div className="loading-state" role="status">Finding opportunities…</div> : failed ? <div className="state-card"><h2>We couldn’t load jobs</h2><p>Please refresh the page and try again.</p></div> : filteredJobs.length === 0 ? <div className="state-card"><h2>{jobs.length ? "No matching roles" : "No jobs posted yet"}</h2><p>{jobs.length ? "Try a different title, company, or location." : "Check back soon for new opportunities."}</p></div> : <>
        <p style={{ color: "var(--muted)", fontSize: 13, margin: "0 0 16px" }}>{filteredJobs.length} {filteredJobs.length === 1 ? "opportunity" : "opportunities"}</p>
        <div className="job-grid">{filteredJobs.map((job) => <article key={job._id} className="job-card">
          <div className="job-card-top"><span className="company-mark">{job.company?.charAt(0) || "J"}</span><span className="job-type">Open role</span></div>
          <h2>{job.title}</h2><div className="job-company">{job.company}</div>
          <div className="job-meta"><span>⌖ {job.location || "Location flexible"}</span>{job.salary && <span>{job.salary}</span>}</div>
          <p className="job-summary">{job.description || "Explore this opportunity and learn more about the role."}</p>
          <Link className="job-card-link" to={`/jobs/${job._id}`}>View role details <span aria-hidden="true">→</span></Link>
        </article>)}</div>
      </>}
    </main></>
  );
}

export default Jobs;
