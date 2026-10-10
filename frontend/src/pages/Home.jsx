import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";

const features = [
  ["01", "Find work that fits", "Explore roles across teams and industries, all in one place."],
  ["02", "Make your next move", "Clear job details help you find an opportunity that feels right."],
  ["03", "Apply with confidence", "Keep your search simple and follow your applications in one place."],
];

export default function Home() {
  return (
    <div className="home-page">
      <Navbar />
      <main>
        <section className="hero-wrap">
          <div className="hero-copy">
            <span className="eyebrow">Your next chapter starts here</span>
            <h1>Work that moves <span>you forward.</span></h1>
            <p>Discover opportunities that match your ambition. Find a role you love and take the next step in your career.</p>
            <div className="hero-actions">
              <Link className="button-primary" to="/jobs">Explore open roles <span aria-hidden="true">→</span></Link>
              <Link className="button-secondary" to="/register">Create an account</Link>
            </div>
            <div className="hero-proof"><span className="proof-dots" aria-hidden="true"><i>A</i><i>M</i><i>J</i></span><span>A more thoughtful way to find your next role</span></div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-orbit"><div className="art-person">JB</div></div>
            <div className="float-card float-one"><span className="float-icon">↗</span><span><strong>New opportunities</strong><small>Start exploring today</small></span></div>
            <div className="float-card float-two"><span className="float-icon">✓</span><span><strong>Your next step</strong><small>Closer than you think</small></span></div>
          </div>
        </section>
        <section className="home-section">
          <div className="section-heading"><div><span className="eyebrow">A better job search</span><h2>Make your next move count</h2></div><p>Everything you need to move forward, in one place.</p></div>
          <div className="feature-grid">{features.map(([number, title, description]) => <article className="feature-card" key={number}><span className="feature-icon">{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
        </section>
      </main>
    </div>
  );
}
