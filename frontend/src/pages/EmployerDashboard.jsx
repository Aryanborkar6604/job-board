import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/dashboard.css";

function EmployerDashboard() {
  const [applications, setApplications] =
    useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications =
    async () => {
      try {
        const token =
          localStorage.getItem("token");

        const res = await API.get(
          "/applications/employer",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setApplications(res.data);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="page-container">
      <h1 className="page-title">
        Applications Received
      </h1>

      <div className="stats">
        <div className="stat-card">
          <h2>{applications.length}</h2>
          <p>Total Applications</p>
        </div>
      </div>

      {applications.length === 0 ? (
        <h3>No Applications</h3>
      ) : (
        <div className="card-grid">
          {applications.map((app) => (
            <div
              key={app._id}
              className="card"
            >
              <h3>{app.job?.title}</h3>

              <div className="company">
                {app.job?.company}
              </div>

              <div className="info">
                👤 Candidate:
                {app.candidate?.name}
                <br />
                📧 Email:
                {app.candidate?.email}
                <br />
                📄 Resume:
                {app.resume}
              </div>

              <button className="resume-btn">
                View Resume
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmployerDashboard;