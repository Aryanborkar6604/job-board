import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "../App.css";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applied, setApplied] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    API.get(`/jobs/${id}`).then((res) => setJob(res.data)).catch((err) => { console.error(err); setError("This role may have been removed or is temporarily unavailable."); }).finally(() => setLoading(false));
  }, [id]);

  const applyJob = async () => {
    setError("");
    const token = localStorage.getItem("token");
    if (!token) { setError("Please log in before applying."); return; }
    if (!resume) { setError("Choose your resume file to continue."); return; }
    setSubmitting(true);
    try {
      const formData = new FormData(); formData.append("jobId", job._id); formData.append("resume", resume);
      await API.post("/applications/apply", formData, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } });
      setApplied(true);
    } catch (err) { setError(err.response?.data?.message || "Your application couldn’t be submitted. Please try again."); }
    finally { setSubmitting(false); }
  };

  return <><Navbar /><main className="details-page">{loading ? <div className="loading-state" role="status">Loading role details…</div> : !job ? <div className="state-card"><h2>Role unavailable</h2><p>{error || "We couldn’t find this job."}</p><Link className="button-secondary" style={{ marginTop: 18 }} to="/jobs">Back to jobs</Link></div> : <article className="details-card">
    <div className="details-head"><span className="company-mark">{job.company?.charAt(0) || "J"}</span><div><h1>{job.title}</h1><p>{job.company}</p></div></div>
    <div className="details-meta"><span>⌖ {job.location || "Location flexible"}</span>{job.salary && <span>{job.salary}</span>}<span>Open role</span></div>
    <h2>About the role</h2><p className="description">{job.description || "More details about this role will be available soon."}</p>
    <section className="apply-box"><h2>{applied ? "Application submitted" : "Interested in this role?"}</h2><p>{applied ? "Your application is on its way. You can track it from your candidate dashboard." : "Attach your resume and send your application."}</p>
      {!applied && <><label className="form-field" htmlFor="resume-file">Resume</label><input id="resume-file" className="file-input" type="file" accept=".pdf,.doc,.docx" onChange={(event) => setResume(event.target.files?.[0] || null)} />
      {resume && <p style={{ margin: "0 0 12px", color: "#596477" }}>Selected: {resume.name}</p>}
      {error && <p role="alert" style={{ color: "#b42318", fontSize: 13 }}>{error} {error.includes("log in") && <Link to="/login" style={{ fontWeight: 700 }}>Log in</Link>}</p>}
      <button className="button-primary" type="button" onClick={applyJob} disabled={submitting}>{submitting ? "Submitting…" : "Apply for this role"}</button></>}
      {applied && <Link className="button-primary" to="/candidate">View my applications</Link>}
    </section>
  </article>}</main></>;
}

export default JobDetails;
