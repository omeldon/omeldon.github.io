import { useState, useEffect } from "react";
import profilePic from "./assets/images/home-profile.jpg";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const roles = [
    "Computer Engineer",
    "Data Analyst",
    "Web Developer",
    "Quality Control Engineer",
  ];
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 1500); // Faster transition

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-logo">
          <h1>OMELDON</h1>
        </div>
        <ul className="nav-links">
          <li className={activeTab === "home" ? "active" : ""} onClick={() => setActiveTab("home")}>
            Home
          </li>
          <li className={activeTab === "about" ? "active" : ""} onClick={() => setActiveTab("about")}>
            About
          </li>
          <li className={activeTab === "skills" ? "active" : ""} onClick={() => setActiveTab("skills")}>
            Skills
          </li>
          <li className={activeTab === "gallery" ? "active" : ""} onClick={() => setActiveTab("gallery")}>
            Gallery
          </li>
          <li className={activeTab === "contact" ? "active" : ""} onClick={() => setActiveTab("contact")}>
            Contact
          </li>
        </ul>
      </nav>

      {/* Content Section */}
      <main className="content">
        {activeTab === "home" && (
          <div className="home-section">
            {/* Left Side - Text Content */}
            <div className="home-content">
              <h1>Hello! I am Rommel Dones</h1>
              <h2 className="intro-subtitle">
                <span className="text-slider">{roles[currentRole]}</span>
              </h2>
            </div>

            {/* Right Side - Image */}
            <div className="home-image">
            <img src={profilePic} alt="Rommel Dones" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
