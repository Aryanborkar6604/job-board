import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <div
        style={{
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          background:
            "linear-gradient(135deg,#2563eb,#7c3aed)",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: "4rem" }}>
          Find Your Dream Job
        </h1>

        <p style={{ marginTop: 20 }}>
          Explore opportunities from top companies
        </p>

        <Link to="/jobs">
          <button
            style={{
              marginTop: 30,
              padding: "15px 35px",
              border: "none",
              borderRadius: 10,
              background: "white",
              color: "#2563eb",
              fontWeight: "bold",
            }}
          >
            Browse Jobs
          </button>
        </Link>
      </div>
    </>
  );
}