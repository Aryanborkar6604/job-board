import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");

      setJobs(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Loading Jobs...
      </h2>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "auto",
        padding: "40px 20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "3rem",
        }}
      >
        Available Jobs
      </h1>

      {jobs.length === 0 ? (
        <h3
          style={{
            textAlign: "center",
          }}
        >
          No Jobs Available
        </h3>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",
            gap: "25px",
          }}
        >
          {jobs.map((job) => (
            <div
              key={job._id}
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "20px",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <h2>{job.title}</h2>

              <h3
                style={{
                  color: "#555",
                }}
              >
                {job.company}
              </h3>

              <p>
                📍{" "}
                <strong>
                  {job.location}
                </strong>
              </p>

              <p>
                💰{" "}
                <strong>
                  {job.salary}
                </strong>
              </p>

              <p>
                {job.description}
              </p>

              <Link
                to={`/jobs/${job._id}`}
              >
                <button
                  style={{
                    marginTop: "10px",
                    padding:
                      "10px 20px",
                    background:
                      "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius:
                      "8px",
                    cursor: "pointer",
                  }}
                >
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Jobs;