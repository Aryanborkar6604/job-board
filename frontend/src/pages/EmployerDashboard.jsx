import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "../App.css";

function EmployerDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    API.get("/applications/employer", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then((res) => setApplications(res.data)).catch((error) => { console.error(error); setFailed(true); }).finally(() => setLoading(false));
  }, []);
  const uploadBase = API.defaults.baseURL.replace(/\/api\/?$/, "");
  return <><Navbar /><main className="dashboard-page">
    <header className="page-intro"><span className="eyebrow">Employer workspace</span><h1>Applications received</h1><p>Review candidates who are interested in your open roles.</p></header>
    <div className="dashboard-layout"><aside className="dashboard-side"><span className="side-label">Workspace</span><Link className="side-link" to="/employer">Applications</Link><Link className="side-link" to="/jobs" style={{ color: "#697386", background: "transparent" }}>Browse jobs →</Link></aside>
      <section className="dashboard-main"><div className="stats"><div className="stat-card"><h2>{applications.length}</h2><p>Total applications</p></div><div className="stat-card"><h2>{new Set(applications.map((app) => app.job?._id).filter(Boolean)).size}</h2><p>Roles with applicants</p></div></div>
        {loading ? <div className="loading-state">Loading applications…</div> : failed ? <div className="state-card"><h2>We couldn’t load applications</h2><p>Please log in again or refresh the page.</p></div> : applications.length === 0 ? <div className="state-card"><h2>No applications yet</h2><p>Applications will appear here when candidates apply to your roles.</p></div> : <div className="card-grid">{applications.map((app) => <article key={app._id} className="card"><h3>{app.job?.title || "Job listing unavailable"}</h3><div className="company">{app.job?.company || "Your company"}</div><div className="info"><strong>Candidate</strong><br />{app.candidate?.name || "Candidate"}<br />{app.candidate?.email || ""}</div><div className="info"><strong>Resume</strong><br />{app.resume || "No resume attached"}</div>{app.resume && <a className="resume-btn" href={`${uploadBase}/uploads/${encodeURIComponent(app.resume)}`} target="_blank" rel="noreferrer">View resume ↗</a>}</article>)}</div>}
      </section>
    </div>
  </main></>;
}
export default EmployerDashboard;
