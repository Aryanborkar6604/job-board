import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "../App.css";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "candidate" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const handleSubmit = async (event) => {
    event.preventDefault(); setError(""); setSubmitting(true);
    try { await API.post("/auth/register", form); navigate("/login"); }
    catch (err) { setError(err.response?.data?.message || "We couldn’t create your account. Please try again."); }
    finally { setSubmitting(false); }
  };
  return <><Navbar /><main className="auth-shell"><section className="auth-card"><span className="eyebrow">Get started</span><h1>Create your account</h1><p className="auth-subtitle">Join JobBoard and take the next step.</p>
    <form onSubmit={handleSubmit}>
      <label className="form-field">Full name<input type="text" name="name" autoComplete="name" placeholder="Your name" value={form.name} onChange={handleChange} required /></label>
      <label className="form-field">Email address<input type="email" name="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required /></label>
      <label className="form-field">Password<input type="password" name="password" autoComplete="new-password" placeholder="Create a password" value={form.password} onChange={handleChange} required /></label>
      <label className="form-field">I’m here to
        <select name="role" value={form.role} onChange={handleChange}><option value="candidate">Find a job</option><option value="employer">Hire great people</option></select>
      </label>
      {error && <p role="alert" style={{ color: "#b42318", fontSize: 13, margin: "0 0 14px" }}>{error}</p>}
      <button className="button-primary auth-submit" type="submit" disabled={submitting}>{submitting ? "Creating account…" : "Create account"}</button>
    </form><p className="auth-foot">Already have an account? <Link to="/login">Log in</Link></p>
  </section></main></>;
}
export default Register;
