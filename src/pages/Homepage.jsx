import { Link } from "react-router";
import "../CSS/Homepage.css";

function Homepage() {
  const features = [
    { title: "Support Tickets", text: "Report an IT problem and follow it until it is fixed." },
    { title: "AI Assistant", text: "Get quick steps to fix common problems right away." },
    { title: "Equipment", text: "Borrow laptops and devices from the IT team." },
    { title: "Office Map", text: "Find any employee's desk in the building." },
  ];

  const steps = [
    "Sign in with your company account.",
    "Describe your problem or create a ticket.",
    "The IT team fixes it and keeps you updated.",
  ];

  return (
    <div className="homepage">
      <section className="hero">
        <h1>HelpDesk Pro</h1>
        <p>IT support, equipment and office locations in one place.</p>
        <div className="hero-buttons">
          <Link className="button" to="/sign-in">
            Sign In
          </Link>
          <Link className="button button-outline" to="/sign-up">
            Sign Up
          </Link>
        </div>
      </section>

      <h2>What you can do</h2>
      <div className="features">
        {features.map((oneFeature) => (
          <div className="feature-box" key={oneFeature.title}>
            <h3>{oneFeature.title}</h3>
            <p>{oneFeature.text}</p>
          </div>
        ))}
      </div>

      <h2>How it works</h2>
      <ol className="steps">
        {steps.map((oneStep) => (
          <li key={oneStep}>{oneStep}</li>
        ))}
      </ol>
    </div>
  );
}

export default Homepage;
