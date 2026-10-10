import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "../App.css";

function CandidateDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    API.get("/applications/my", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then((res) => setApplications(res.data)).catch((error) => { console.error(error); setFailed(true); }).finally(() => setLoading(false));
  }, []);
  return <><Navbar /><main className="dashboard-page">
    <header className="page-intro"><span className="eyebrow">Candidate workspace</span><h1>My applications</h1><p>Keep track of the roles you’ve applied for.</p></header>
    <div className="dashboard-layout"><aside className="dashboard-side"><span className="side-label">Workspace</span><Link className="side-link" to="/candidate">My applications</Link><Link className="side-link" to="/jobs" style={{ color: "#697386", background: "transparent" }}>Explore jobs →</Link></aside>
      <section className="dashboard-main"><div className="stats"><div className="stat-card"><h2>{applications.length}</h2><p>Applications submitted</p></div><div className="stat-card"><h2>{applications.length ? "Active" : "—"}</h2><p>Search status</p></div></div>
        {loading ? <div className="loading-state">Loading your applications…</div> : failed ? <div className="state-card"><h2>We couldn’t load your applications</h2><p>Please log in again or refresh the page.</p></div> : applications.length === 0 ? <div className="state-card"><h2>Your next opportunity is out there</h2><p>When you apply for a role, it’ll show up here.</p><Link className="button-primary" style={{ marginTop: 18 }} to="/jobs">Explore open roles</Link></div> : <div className="card-grid">{applications.map((app) => <article key={app._id} className="card"><h3>{app.job?.title || "Job listing unavailable"}</h3><div className="company">{app.job?.company || "Company"}</div><div className="info">Resume: {app.resume?.split("/").pop() || "Attached"}</div><span className="badge">Application submitted</span></article>)}</div>}
      </section>
    </div>
  </main></>;
}
export default CandidateDashboard;
