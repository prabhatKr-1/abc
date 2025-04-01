import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Landing.css";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const elements = document.querySelectorAll(".animate-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title animate-pop">
            Revolutionize Your Library Experience
            <div className="gradient-border"></div>
          </h1>
          <p className="hero-subtitle animate-slide-up">
            Modern Library Management System packed with Features
          </p>
          <button
            onClick={() => navigate("/auth")}
            className="cta-button animate-pulse"
          >
            Get Started Now
            <span className="hover-effect"></span>
          </button>
        </div>
        <div className="hero-visual">
          <div className="floating-book"></div>
          <div className="floating-scan"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title animate-on-scroll">Key Features</h2>
        <div className="feature-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card animate-on-scroll delay-${index + 1}`}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className="shine"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      
    </div>
  );
};

const features = [
  {
    icon: "📚",
    title: "Smart Cataloging",
    description: "AI-powered book categorization with instant search",
  },
  {
    icon: "⏱️",
    title: "Instant Tracking",
    description: "Real-time book location tracking with RFID integration",
  },
  {
    icon: "📊",
    title: "Advanced Analytics",
    description: "Detailed usage reports and member insights",
  },
  {
    icon: "🤖",
    title: "AI Assistant",
    description: "24/7 virtual librarian for instant support",
  },
];

export default LandingPage;
