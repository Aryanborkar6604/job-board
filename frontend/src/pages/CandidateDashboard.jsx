import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/dashboard.css";

function CandidateDashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/applications/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApplications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">My Applications</h1>

      <div className="stats">
        <div className="stat-card">
          <h2>{applications.length}</h2>
          <p>Applications Submitted</p>
        </div>
      </div>

      {applications.length === 0 ? (
        <h3>No Applications Yet</h3>
      ) : (
        <div className="card-grid">
          {applications.map((app) => (
            <div key={app._id} className="card">
              <h3>{app.job?.title}</h3>

              <div className="company">
                {app.job?.company}
              </div>

              <div className="info">
                📄 Resume: {app.resume}
              </div>

              <span className="badge">
                Applied Successfully
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CandidateDashboard;