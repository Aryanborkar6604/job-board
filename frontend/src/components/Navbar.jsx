import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        💼 JobBoard
      </Link>

      <div className="nav-center">
        <Link to="/">Home</Link>
        <Link to="/jobs">Jobs</Link>
      </div>

      <div className="nav-right">
        <Link to="/login" className="login-btn">
          Login
        </Link>

        <Link to="/register" className="register-btn">
          Register
        </Link>
      </div>
    </nav>
  );
}