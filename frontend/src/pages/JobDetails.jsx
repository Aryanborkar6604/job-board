import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const res = await API.get(`/jobs/${id}`);
      setJob(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load job");
    } finally {
      setLoading(false);
    }
  };

  const applyJob = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      if (!resume) {
        alert("Please select a resume");
        return;
      }

      const formData = new FormData();

      formData.append("jobId", job._id);
      formData.append("resume", resume);

      await API.post(
        "/applications/apply",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Application submitted successfully!");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to apply"
      );
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
        Loading...
      </h2>
    );
  }

  if (!job) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Job Not Found
      </h2>
    );
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "25px",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h1>{job.title}</h1>

        <h2
          style={{
            color: "#555",
          }}
        >
          {job.company}
        </h2>

        <p>
          📍 <strong>{job.location}</strong>
        </p>

        <p>
          💰 <strong>{job.salary}</strong>
        </p>

        <hr />

        <h3>Job Description</h3>

        <p>{job.description}</p>

        <hr />

        <h3>Apply for this Job</h3>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) =>
            setResume(e.target.files[0])
          }
        />

        <br />
        <br />

        <button
          onClick={applyJob}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default JobDetails;