import { useState, useEffect } from "react";
import homeprof from "./assets/images/home-profile.jpg";
import profilepic from "./assets/images/profile-pic.jpg";
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
    }, 1500);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <div className="app">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-logo">
          <h1>OMELDON</h1>
        </div>
        <ul className="nav-links">
          {['home', 'about', 'skills', 'gallery', 'contact'].map((tab) => (
            <li key={tab} className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </li>
          ))}
        </ul>
      </nav>

      {/* Content Section */}
      <main className="content">
        {activeTab === "home" && (
          <div className="home-section">
            <div className="home-content">
              <h1>Hello! I am Rommel Dones</h1>
              <h2 className="intro-subtitle">
                <span className="text-slider">{roles[currentRole]}</span>
              </h2>
            </div>
            <div className="home-image">
              <img src={homeprof} alt="Rommel Dones" />
            </div>
          </div>
        )}

      {
      activeTab === "about" && (
        <section id="about" className="about-section">
          <div className="container">
            <div className="box-shadow-full">
              <div className="row">
                <div className="col-md-4 text-center">
                  <div className="title-box-2">
                    <h5 className="title-left">About Me</h5>
                  </div>
                  <div className="about-img">
                    <img src={profilepic} alt="Rommel Dones" />
                  </div>
                  <div className="about-info mt-3">
                    <p><span className="title-s">Name: </span> Rommel Dones</p>
                    <p><span className="title-s">Profile: </span> Computer Engineer</p>
                    <p><span className="title-s">Email: </span> donesrommel2000@gmail.com</p>
                    <p>
                      <span className="title-s">LinkedIn: </span>
                      <a href="https://www.linkedin.com/in/rommel-dones-598539202" target="_blank" rel="noopener noreferrer">View LinkedIn Profile</a>
                    </p>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="about-me pt-4 pt-md-0">
                    <p className="lead" style={{ textIndent: '50px', textAlign: 'justify' }}>
                      Hello everyone, I am Rommel Dones currently residing at Sta. Rosa, Laguna and a graduate of Bachelor of Science in Computer Engineering at Laguna State Polytechnic University – San Pablo City Campus.
                    </p>
                    <p className="lead" style={{ textIndent: '50px', textAlign: 'justify' }}>
                      With the 4 years of studying at LSPU – SPCC, I gained knowledge and experience in programming languages such as Python, Java, C++, and Arduino. I also learned designing and simulating electronics and Arduino circuits, as well as web development in my internship.
                    </p>
                    <p className="lead" style={{ textIndent: '50px', textAlign: 'justify' }}>
                      Currently, I am working as a Quality Control Engineer in an Electronics Manufacturing Company, and I use my free time for self-studying Data Analysis for future career opportunities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
      }

        {activeTab === "skills" && (
          <section className="skills-section">
            <h2>Skills</h2>
            <ul>
              <li>React.js</li>
              <li>JavaScript</li>
              <li>Python</li>
              <li>Data Analysis</li>
              <li>Quality Assurance</li>
            </ul>
          </section>
        )}

        {activeTab === "gallery" && (
          <section className="gallery-section">
            <h2>Gallery</h2>
            <p>Showcase of my projects and experiences.</p>
            {/* Add images or portfolio items here */}
          </section>
        )}

        {activeTab === "contact" && (
          <section className="contact-section">
            <h2>Contact Me</h2>
            <p>Email: rommeldones@example.com</p>
            <p>LinkedIn: linkedin.com/in/rommeldones</p>
          </section>
        )}
      </main>

      
    </div>
  );
}

export default App;
