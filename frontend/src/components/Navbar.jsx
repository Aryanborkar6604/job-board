import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <Link to="/" className="logo"><span className="logo-mark" aria-hidden="true">J</span> JobBoard</Link>
      <div className="nav-center">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/jobs">Jobs</NavLink>
      </div>
      <div className="nav-right">
        <Link to="/login" className="login-btn">Log in</Link>
        <Link to="/register" className="register-btn">Get started</Link>
      </div>
    </nav>
  );
}
