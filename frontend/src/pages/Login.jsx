import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "../App.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); setError(""); setSubmitting(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate(res.data.role === "employer" ? "/employer" : "/candidate");
    } catch (err) { setError(err.response?.data?.message || "We couldn’t sign you in. Check your details and try again."); }
    finally { setSubmitting(false); }
  };

  return <><Navbar /><main className="auth-shell"><section className="auth-card"><span className="eyebrow">Welcome back</span><h1>Log in to JobBoard</h1><p className="auth-subtitle">Pick up where your next career move begins.</p>
    <form onSubmit={handleSubmit}>
      <label className="form-field">Email address<input type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
      <label className="form-field">Password<input type="password" autoComplete="current-password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
      {error && <p role="alert" style={{ color: "#b42318", fontSize: 13, margin: "0 0 14px" }}>{error}</p>}
      <button className="button-primary auth-submit" type="submit" disabled={submitting}>{submitting ? "Signing in…" : "Log in"}</button>
    </form><p className="auth-foot">New to JobBoard? <Link to="/register">Create an account</Link></p>
  </section></main></>;
}

export default Login;
