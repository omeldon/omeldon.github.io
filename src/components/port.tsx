import React, { useState, useEffect, useRef } from "react";
import ProfileImage from "../images/DONES_ROMMEL_G.png";
import Work01 from "../images/work-1.png";
import Work02 from "../images/work-2.png";
import Work03 from "../images/work-3.png";
import Work04 from "../images/work-4.png";
import Work05 from "../images/work-5.png";
import Work06 from "../images/work-6.png";
import Work07 from "../images/work-7.png";
import Work08 from "../images/work-8.png";
import Work09 from "../images/work-9.png";
import {
  Sun,
  Moon,
  Download,
  Mail,
  User,
  BookOpen,
  Code,
  Database,
  Computer,
  AppWindowIcon,
  Github,
  ExternalLink,
  Linkedin,
  Twitter,
  Facebook,
  Menu,
  X,
  FileText,
  Folder,
  Terminal,
  Play,
  Coffee,
  Zap,
  Heart,
  Star,
  ChevronDown,
  Eye,
  Award,
  MapPin,
  Phone,
} from "lucide-react";

// Theme Context
interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = React.createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});

// Types
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  github: string;
  demo: string;
  technologies: string[];
}

interface Skill {
  name: string;
  icon: React.ComponentType<any>;
  level: number;
  description: string;
}

const InteractiveBackground: React.FC<{ darkMode: boolean }> = ({
  darkMode,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Interactive particles
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
      pulse: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.8 + 0.2,
        color: darkMode
          ? `hsl(${200 + Math.random() * 60}, 70%, 60%)`
          : `hsl(${200 + Math.random() * 60}, 60%, 50%)`,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    // Floating geometric shapes
    const shapes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      type: "circle" | "triangle" | "square";
      opacity: number;
    }> = [];

    for (let i = 0; i < 15; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 30 + 10,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        type: ["circle", "triangle", "square"][
          Math.floor(Math.random() * 3)
        ] as "circle" | "triangle" | "square",
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Animate particles
      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.pulse += 0.05;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        const pulsedSize = particle.size + Math.sin(particle.pulse) * 2;
        const pulsedOpacity = particle.opacity + Math.sin(particle.pulse) * 0.3;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, pulsedSize, 0, Math.PI * 2);
        ctx.fillStyle = particle.color
          .replace(")", `, ${pulsedOpacity})`)
          .replace("hsl", "hsla");
        ctx.fill();

        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = particle.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect nearby particles
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) +
                Math.pow(particle.y - otherParticle.y, 2)
            );

            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = darkMode
                ? `rgba(59, 130, 246, ${0.2 - distance / 500})`
                : `rgba(99, 102, 241, ${0.2 - distance / 500})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });
      });

      // Animate geometric shapes
      shapes.forEach((shape) => {
        shape.x += shape.vx;
        shape.y += shape.vy;
        shape.rotation += shape.rotationSpeed;

        // Bounce off edges
        if (shape.x < -50 || shape.x > canvas.width + 50) shape.vx *= -1;
        if (shape.y < -50 || shape.y > canvas.height + 50) shape.vy *= -1;

        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.rotation);
        ctx.globalAlpha = shape.opacity;

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, shape.size);
        gradient.addColorStop(
          0,
          darkMode ? "rgba(59, 130, 246, 0.6)" : "rgba(99, 102, 241, 0.6)"
        );
        gradient.addColorStop(
          1,
          darkMode ? "rgba(147, 51, 234, 0.1)" : "rgba(168, 85, 247, 0.1)"
        );

        switch (shape.type) {
          case "circle":
            ctx.beginPath();
            ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            break;
          case "triangle":
            ctx.beginPath();
            ctx.moveTo(0, -shape.size / 2);
            ctx.lineTo(-shape.size / 2, shape.size / 2);
            ctx.lineTo(shape.size / 2, shape.size / 2);
            ctx.closePath();
            ctx.fillStyle = gradient;
            ctx.fill();
            break;
          case "square":
            ctx.beginPath();
            ctx.rect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
            ctx.fillStyle = gradient;
            ctx.fill();
            break;
        }

        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
};

const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      setIsVisible(entry.isIntersecting);
    },
    { threshold: 0.1, ...options }
  );

  if (elementRef.current) {
    observer.observe(elementRef.current);
  }

  return () => observer.disconnect();
}, [options]);

return [elementRef, isVisible] as const;
};

// Parallax Hook
// const useParallax = () => {
//   const [offset, setOffset] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       setOffset(window.pageYOffset);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return offset;
// };

// VS Code themed Navbar Component
const Navbar: React.FC = () => {
  const { darkMode, toggleDarkMode } = React.useContext(ThemeContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: FileText, color: "text-blue-400" },
    { id: "about", label: "About", icon: User, color: "text-green-400" },
    { id: "skills", label: "Skills", icon: Code, color: "text-yellow-400" },
    {
      id: "projects",
      label: "Projects",
      icon: Folder,
      color: "text-purple-400",
    },
    { id: "contact", label: "Contact", icon: Mail, color: "text-pink-400" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);

      const sections = ["home", "about", "skills", "projects", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? `${
                darkMode ? "bg-gray-900/95" : "bg-white/95"
              } backdrop-blur-md shadow-lg`
            : `${darkMode ? "bg-gray-900" : "bg-white"}`
        } ${darkMode ? "border-gray-700" : "border-gray-200"} border-b`}
      >
        {/* VS Code Title Bar with animations */}
        <div
          className={`${
            darkMode ? "bg-gray-800" : "bg-gray-100"
          } px-2 sm:px-4 py-1 text-xs flex items-center justify-between relative overflow-hidden`}
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x"></div>
          </div>

          <div className="flex items-center space-x-2 relative z-10">
            <div className="flex space-x-1">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500 animate-pulse"></div>
              <div
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500 animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500 animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
            <span
              className={`ml-2 sm:ml-4 text-xs sm:text-sm font-mono transition-all duration-300 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              } ${isScrolled ? "animate-bounce" : ""}`}
            >
              <Terminal className="inline w-3 h-3 mr-1" />
               Dones - Portfolio.exe
            </span>
          </div>
          <div className="flex items-center space-x-2 relative z-10">
            <div
              className={`text-xs ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {new Date().toLocaleTimeString()}
            </div>
            <button
              onClick={toggleDarkMode}
              className={`p-1 rounded hover:bg-opacity-20 transition-all duration-300 transform hover:scale-110 ${
                darkMode
                  ? "hover:bg-white text-gray-300 hover:text-yellow-400"
                  : "hover:bg-black text-gray-600 hover:text-blue-600"
              }`}
            >
              {darkMode ? (
                <Sun className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
              ) : (
                <Moon className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Main Navigation */}
        <div className="px-2 sm:px-4">
          <div className="flex justify-between items-center h-10 sm:h-12">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Terminal
                  className={`w-4 h-4 sm:w-5 sm:h-5 animate-pulse ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                />
                <span
                  className={`font-mono text-xs sm:text-sm font-semibold ${
                    darkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  ~/omeldon
                </span>
                <div className="ml-2 animate-blink">
                  <div className="w-2 h-4 bg-blue-500"></div>
                </div>
              </div>
            </div>

            {/* Desktop Navigation Tabs with enhanced animations */}
            <div className="hidden lg:flex items-center">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`group relative flex items-center space-x-2 px-3 xl:px-4 py-2 text-sm font-medium border-b-2 transition-all duration-300 hover:scale-105 ${
                    activeSection === item.id
                      ? `${
                          darkMode
                            ? "border-blue-400 text-blue-400 bg-gray-800/50"
                            : "border-blue-600 text-blue-600 bg-blue-50/50"
                        }`
                      : `border-transparent ${
                          darkMode
                            ? "text-gray-300 hover:text-blue-400 hover:bg-gray-800/30"
                            : "text-gray-600 hover:text-blue-600 hover:bg-gray-50/30"
                        }`
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <item.icon
                    className={`w-4 h-4 transition-colors group-hover:${item.color}`}
                  />
                  <span className="hidden xl:inline transition-all duration-300 group-hover:tracking-wide">
                    {item.label}
                  </span>
                  {activeSection === item.id && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full animate-ping"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Tablet Navigation */}
            <div className="hidden md:flex lg:hidden items-center space-x-1">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`group relative flex items-center justify-center p-2 text-sm font-medium border-b-2 transition-all duration-300 hover:scale-110 ${
                    activeSection === item.id
                      ? `${
                          darkMode
                            ? "border-blue-400 text-blue-400 bg-gray-800/50"
                            : "border-blue-600 text-blue-600 bg-blue-50/50"
                        }`
                      : `border-transparent ${
                          darkMode
                            ? "text-gray-300 hover:text-blue-400 hover:bg-gray-800/30"
                            : "text-gray-600 hover:text-blue-600 hover:bg-gray-50/30"
                        }`
                  }`}
                  title={item.label}
                >
                  <item.icon className="w-4 h-4" />
                  {activeSection === item.id && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-md transition-all duration-300 hover:scale-110 ${
                  darkMode
                    ? "text-gray-300 hover:bg-gray-800"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 animate-spin" />
                ) : (
                  <Menu className="w-5 h-5 animate-pulse" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden border-t transform transition-all duration-300 ${
              darkMode
                ? "bg-gray-800/95 border-gray-700"
                : "bg-white/95 border-gray-200"
            } backdrop-blur-md`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`group flex items-center space-x-3 w-full px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 hover:scale-105 animate-slideInLeft ${
                    activeSection === item.id
                      ? `${
                          darkMode
                            ? "bg-blue-900/50 text-blue-400"
                            : "bg-blue-100/50 text-blue-600"
                        }`
                      : `${
                          darkMode
                            ? "text-gray-300 hover:bg-gray-700/50"
                            : "text-gray-600 hover:bg-gray-50/50"
                        }`
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <item.icon
                    className={`w-4 h-4 group-hover:${item.color} transition-colors`}
                  />
                  <span className="transition-all duration-300 group-hover:tracking-wide">
                    {item.label}
                  </span>
                  {activeSection === item.id && (
                    <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out"
          style={{
            width: `${Math.min(
              (window.scrollY /
                (document.documentElement.scrollHeight - window.innerHeight)) *
                100,
              100
            )}%`,
          }}
        ></div>
      </div>
    </>
  );
};

// Home Component

const roles = [
  "SAP C4C Functional Consultant",
  "Computer Engineer ",
  "Data Analyst ",
  "Web Developer ",
  "Quality Control Engineer ",
];

interface TypewriterTextProps {
  darkMode: boolean;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ darkMode }) => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (index === roles.length) return;

    const speed = deleting ? 50 : 100;

    const timeout = setTimeout(() => {
      setText(roles[index].substring(0, subIndex));

      if (!deleting && subIndex === roles[index].length) {
        setTimeout(() => setDeleting(true), 1500);
      } else if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % roles.length);
      }

      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting]);

  return (
    <h2
      className={`text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 font-mono text-center transform transition-all duration-300 hover:scale-105 ${
        darkMode ? "text-blue-400" : "text-blue-600"
      }`}
    >
      <span className="animate-fadeInUp">{text}</span>
      <span className="border-r-2 border-blue-500 animate-pulse ml-1 animate-blink"></span>
    </h2>
  );
};

const Home: React.FC = () => {
  const { darkMode } = React.useContext(ThemeContext);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 relative overflow-hidden"
    >
      <InteractiveBackground darkMode={darkMode} />

      {/* Interactive cursor follower */}
      <div
        className="fixed pointer-events-none z-10 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
          transform: `scale(${isHovered ? 2 : 1})`,
        }}
      >
        <div
          className={`w-5 h-5 rounded-full border-2 ${
            darkMode ? "border-blue-400" : "border-blue-600"
          } ${isHovered ? "bg-blue-500/20" : ""}`}
        ></div>
      </div>

      <div className="max-w-5xl mx-auto text-center w-full relative z-10">
        <div className="animate-fadeInUp">
          {/* Enhanced VS Code Editor Header */}
          <div
            className={`inline-block mb-6 sm:mb-8 w-full max-w-2xl mx-auto transform transition-all duration-500 hover:scale-105 hover:rotate-1 ${
              darkMode
                ? "bg-gray-800/90 border-gray-700"
                : "bg-gray-50/90 border-gray-200"
            } border rounded-lg p-3 sm:p-4 text-left font-mono text-xs sm:text-sm backdrop-blur-md shadow-2xl`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Enhanced header with more VS Code elements */}
            <div
              className={`flex items-center justify-between mb-2 sm:mb-3 pb-2 border-b ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="flex items-center space-x-2">
                <FileText
                  className={`w-3 h-3 sm:w-4 sm:h-4 animate-pulse ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                />
                <span
                  className={`${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } animate-typing`}
                >
                  developer.ts
                </span>
                <div className="ml-2 flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></div>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                  Line 1:1
                </span>
                <div className="flex items-center space-x-1">
                  <Coffee className="w-3 h-3 text-yellow-500 animate-bounce" />
                  <Zap className="w-3 h-3 text-blue-500 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Enhanced code content */}
            <div className="space-y-1 overflow-x-auto">
              <div className="flex">
                <span className="text-gray-500 select-none w-6 text-right mr-3 text-xs">
                  1
                </span>
                <div className="whitespace-nowrap animate-slideInLeft">
                  <span
                    className={`${
                      darkMode ? "text-purple-400" : "text-purple-600"
                    } animate-glow`}
                  >
                    const
                  </span>
                  <span
                    className={`${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    } ml-2`}
                  >
                    developer
                  </span>
                  <span
                    className={darkMode ? "text-gray-300" : "text-gray-700"}
                  >
                    {" "}
                    = {`{`}
                  </span>
                </div>
              </div>
              <div className="flex">
                <span className="text-gray-500 select-none w-6 text-right mr-3 text-xs">
                  2
                </span>
                <div
                  className="pl-2 sm:pl-4 animate-slideInLeft"
                  style={{ animationDelay: "0.1s" }}
                >
                  <span
                    className={`${
                      darkMode ? "text-green-400" : "text-green-600"
                    } animate-pulse`}
                  >
                    name
                  </span>
                  <span
                    className={darkMode ? "text-gray-300" : "text-gray-700"}
                  >
                    :{" "}
                  </span>
                  <span
                    className={`${
                      darkMode ? "text-yellow-400" : "text-yellow-600"
                    } animate-glow`}
                  >
                    " Dones"
                  </span>
                  <span
                    className={darkMode ? "text-gray-300" : "text-gray-700"}
                  >
                    ,
                  </span>
                </div>
              </div>
              <div className="flex">
                <span className="text-gray-500 select-none w-6 text-right mr-3 text-xs">
                  3
                </span>
                <div
                  className="pl-2 sm:pl-4 animate-slideInLeft"
                  style={{ animationDelay: "0.2s" }}
                >
                  <span
                    className={`${
                      darkMode ? "text-green-400" : "text-green-600"
                    } animate-pulse`}
                  >
                    role
                  </span>
                  <span
                    className={darkMode ? "text-gray-300" : "text-gray-700"}
                  >
                    :{" "}
                  </span>
                  <span
                    className={`${
                      darkMode ? "text-yellow-400" : "text-yellow-600"
                    } animate-glow`}
                  >
                    "SAP C4C Functional Consultant"
                  </span>
                  <span
                    className={darkMode ? "text-gray-300" : "text-gray-700"}
                  >
                    ,
                  </span>
                </div>
              </div>
              <div className="flex">
                <span className="text-gray-500 select-none w-6 text-right mr-3 text-xs">
                  4
                </span>
                <div
                  className="pl-2 sm:pl-4 animate-slideInLeft"
                  style={{ animationDelay: "0.3s" }}
                >
                  <span
                    className={`${
                      darkMode ? "text-green-400" : "text-green-600"
                    } animate-pulse`}
                  >
                    passion
                  </span>
                  <span
                    className={darkMode ? "text-gray-300" : "text-gray-700"}
                  >
                    :{" "}
                  </span>
                  <span
                    className={`${
                      darkMode ? "text-yellow-400" : "text-yellow-600"
                    } animate-glow`}
                  >
                    "Continuously learning and growing"
                  </span>
                  <span
                    className={darkMode ? "text-gray-300" : "text-gray-700"}
                  >
                    ,
                  </span>
                </div>
              </div>
              <div className="flex">
                <span className="text-gray-500 select-none w-6 text-right mr-3 text-xs">
                  5
                </span>
                <div
                  className="pl-2 sm:pl-4 animate-slideInLeft"
                  style={{ animationDelay: "0.4s" }}
                >
                  <span
                    className={`${
                      darkMode ? "text-green-400" : "text-green-600"
                    } animate-pulse`}
                  >
                    status
                  </span>
                  <span
                    className={darkMode ? "text-gray-300" : "text-gray-700"}
                  >
                    :{" "}
                  </span>
                  <span
                    className={`${
                      darkMode ? "text-yellow-400" : "text-yellow-600"
                    } animate-glow`}
                  >
                    "Employed"
                  </span>
                  <Heart className="inline w-3 h-3 ml-1 text-red-500 animate-heartbeat" />
                </div>
              </div>
              <div className="flex">
                <span className="text-gray-500 select-none w-6 text-right mr-3 text-xs">
                  6
                </span>
                <div
                  className="animate-slideInLeft"
                  style={{ animationDelay: "0.5s" }}
                >
                  <span
                    className={darkMode ? "text-gray-300" : "text-gray-700"}
                  >
                    {`};`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced main heading */}
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 font-mono transform transition-all duration-500 hover:scale-105 animate-slideInUp ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
            style={{
              textShadow: darkMode
                ? "0 0 20px rgba(59, 130, 246, 0.3)"
                : "0 0 20px rgba(99, 102, 241, 0.3)",
            }}
          >
            <span className="animate-wave inline-block"> Dones</span>
          </h1>

          <TypewriterText darkMode={darkMode} />

          <p
            className={`text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4 transform transition-all duration-500 hover:scale-105 animate-fadeInUp ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            I’m a{" "}
            <span className="font-bold text-blue-500 animate-pulse">
              self-learning web developer
            </span>{" "}
            focused on enhancing my skills by studying{" "}
            <span className="font-bold text-purple-500">modern frameworks</span>{" "}
            and building{" "}
            <span className="font-bold text-green-500">
              real-world projects
            </span>
            .
          </p>

          {/* Enhanced action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <a
              href="/DonesRommel.pdf"
              download
              className={`group relative flex items-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg font-medium text-center justify-center overflow-hidden transform hover:-translate-y-1 ${
                darkMode
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Download className="w-5 h-5 group-hover:animate-bounce relative z-10" />
              <span className="relative z-10">Download Resume</span>
              <div className="absolute -top-full left-0 w-full h-full bg-white/20 transform rotate-12 group-hover:top-full transition-all duration-700"></div>
            </a>

            <button
              onClick={() => scrollToSection("contact")}
              className={`group relative flex items-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg border-2 font-medium text-center justify-center overflow-hidden transform hover:-translate-y-1 ${
                darkMode
                  ? "border-gray-600 hover:bg-gray-800 text-gray-200 hover:border-blue-400"
                  : "border-gray-300 hover:bg-gray-50 text-gray-700 hover:border-blue-600"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Mail className="w-5 h-5 group-hover:animate-pulse relative z-10" />
              <span className="relative z-10">Contact Me</span>
              <div className="absolute -bottom-full left-0 w-full h-full bg-blue-500/20 transform rotate-12 group-hover:bottom-full transition-all duration-700"></div>
            </button>
          </div>

          {/* Scroll down indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown
              className={`w-6 h-6 cursor-pointer transition-colors ${
                darkMode
                  ? "text-gray-400 hover:text-blue-400"
                  : "text-gray-600 hover:text-blue-600"
              }`}
              onClick={() => scrollToSection("About")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// About Component

const About: React.FC = () => {
  const { darkMode } = React.useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
      return () => section.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`py-16 sm:py-20 relative overflow-hidden ${
        darkMode ? "bg-gray-800" : "bg-gray-50"
      }`}
    >
      {/* Enhanced Interactive Background */}
      <InteractiveBackground darkMode={darkMode} />

      {/* Mouse follower effect */}
      <div
        className="absolute pointer-events-none transition-all duration-300 ease-out z-10"
        style={{
          left: mousePosition.x - 100,
          top: mousePosition.y - 100,
          width: 200,
          height: 200,
          background: darkMode
            ? "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div
          className={`text-center mb-12 sm:mb-16 ${
            isVisible ? "animate-fadeInUp" : "opacity-0"
          }`}
        >
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 font-mono ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            <span
              className={`${
                darkMode ? "text-purple-400" : "text-purple-600"
              } animate-pulse`}
            >
              &lt;
            </span>
            About
            <span
              className={`${
                darkMode ? "text-purple-400" : "text-purple-600"
              } animate-pulse`}
            >
              {" "}
              /&gt;
            </span>
          </h2>
          <div
            className={`w-16 sm:w-24 h-1 ${
              darkMode ? "bg-blue-400" : "bg-blue-600"
            } mx-auto mb-8 animate-expandWidth`}
          ></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div
            className={`order-2 lg:order-1 ${
              isVisible ? "animate-slideInLeft" : "opacity-0"
            }`}
          >
            <div className="flex justify-center lg:justify-start">
              <div className="relative inline-block mb-6 sm:mb-8 group">
                {/* Profile image with enhanced effects */}
                <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-lg p-1 transform transition-all duration-300 hover:scale-105 hover:rotate-2 animate-gradient-rotate">
                  <div
                    className={`w-full h-full ${
                      darkMode ? "bg-gray-700" : "bg-gray-300"
                    } rounded-lg flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Profile Image instead of RD */}
                    <img
                      src={ProfileImage}
                      alt="Rommel Dones"
                      className="w-full h-full object-cover rounded-lg relative z-10"
                    />
                  </div>
                </div>

                {/* Bottom-right icon */}
                <div
                  className={`absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 p-2 sm:p-3 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-12 ${
                    darkMode ? "bg-blue-600" : "bg-blue-600"
                  }`}
                >
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-pulse" />
                </div>

                {/* Floating status indicators */}
                <div className="absolute -top-2 -left-2 flex space-x-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                  <span className="text-xs font-mono text-green-500 animate-pulse">
                    Online
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`order-1 lg:order-2 ${
              isVisible ? "animate-slideInRight" : "opacity-0"
            }`}
          >
            {/* Enhanced README section */}
            <div className="flex items-center gap-3 mb-6 group">
              <BookOpen
                className={`w-5 h-5 sm:w-6 sm:h-6 ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                } group-hover:animate-spin transition-transform duration-300`}
              />
              <h3
                className={`text-xl sm:text-2xl font-semibold font-mono ${
                  darkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                README.md
              </h3>
              <div className="ml-auto flex items-center space-x-2 text-xs">
                <Eye className="w-4 h-4 text-gray-500" />
                <span className="text-gray-500">1.2k views</span>
                <Star className="w-4 h-4 text-yellow-500 animate-pulse" />
                <span className="text-yellow-500">42</span>
              </div>
            </div>

            {/* Enhanced code block */}
            <div
              className={`p-3 sm:p-4 rounded-lg font-mono text-xs sm:text-sm mb-6 overflow-x-auto transform transition-all duration-300 hover:scale-105 group ${
                darkMode
                  ? "bg-gray-900/80 border border-gray-700 shadow-2xl"
                  : "bg-white/80 border border-gray-200 shadow-2xl"
              } backdrop-blur-md`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <div
                    className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-3 h-3 bg-green-500 rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-blue-500" />
                  <span className="text-xs text-gray-500">Terminal</span>
                </div>
              </div>

              <div
                className={`mb-2 ${
                  darkMode ? "text-green-400" : "text-green-600"
                } animate-typing`}
              >
                # About Me
              </div>
              <div
                className={`${
                  darkMode ? "text-gray-300" : "text-gray-700"
                } leading-relaxed text-justify`}
              >
                With nearly 4 years of experience spanning electronics manufacturing and IT, currently working as SAP C4C Consultant providing functional support across Europe, North and Latin America, and Asia Pacific. Handles ticket review, change request management, queue dispatch, and non-regression testing for scheduled transports and SAP upgrades.
Previously a Quality Control Engineer in electronics manufacturing, analyzing quality data to generate actionable reports for customers and stakeholders using Excel, Tibco Spotfire, and Power BI. Also handled line monitoring, internal audits, and collaborated with production and engineering teams to drive process improvements.
              </div>

              <div className="mt-3 flex items-center space-x-2 text-xs">
                <Play className="w-3 h-3 text-green-500 animate-pulse" />
                <span
                  className={darkMode ? "text-green-400" : "text-green-600"}
                >
                  Last updated: Just now
                </span>
              </div>
            </div>

            {/* Fun facts section */}
            <div className="mt-6 p-4 rounded-lg border-l-4 border-blue-500 bg-blue-50/50 dark:bg-blue-800/20 backdrop-blur-sm">
              <div className="flex items-center mb-2">
                <Coffee className="w-4 h-4 text-amber-700 dark:text-amber-400 mr-2 animate-bounce" />
                <span className="font-mono text-sm font-bold">Fun Facts</span>
              </div>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li className="animate-slideInLeft">
                  ☕ Coffee consumed:{" "}
                  <span className="font-bold text-amber-700 dark:text-amber-400">
                    ∞ cups
                  </span>
                </li>
                <li
                  className="animate-slideInLeft"
                  style={{ animationDelay: "0.1s" }}
                >
                  🌙 Late night coding sessions:{" "}
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    countless
                  </span>
                </li>
                <li
                  className="animate-slideInLeft"
                  style={{ animationDelay: "0.2s" }}
                >
                  🐛 Bugs fixed:{" "}
                  <span className="font-bold text-green-600 dark:text-green-400">
                    too many to count
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes expandWidth {
          from {
            width: 0;
          }
          to {
            width: 6rem;
          }
        }
        
        @keyframes gradient-rotate {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out;
        }
        
        .animate-expandWidth {
          animation: expandWidth 1s ease-out;
        }
        
        .animate-gradient-rotate {
          animation: gradient-rotate 3s ease infinite;
          background-size: 200% 200%;
        }
        
        .animate-typing {
          animation: typing 2s steps(20, end);
        }
      `}</style>
    </section>
  );
};

// Skills Component
const Skills: React.FC = () => {
  const { darkMode } = React.useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSkill, setActiveSkill] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const skills: Skill[] = [
    {
      name: "Frontend Development",
      icon: Code,
      level: 80,
      description:
        "React, Vue, Angular, TypeScript, HTML5, CSS3, Tailwind, Bootstrap",
    },
    {
      name: "Data Analysis",
      icon: Database,
      level: 85,
      description: "Power BI, SQL, Excel, Tableau, Tibco Spotfire",
    },
    {
      name: "Software Technologies",
      icon: AppWindowIcon,
      level: 80,
      description: "Git, Github, Xampp, Figma, Canva",
    },
    {
      name: "Microsoft 365 ",
      icon: Computer,
      level: 95,
      description: "Word, Powerpoint, Excel, Outlook, Teams, OneDrive, Access",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-16 sm:py-20 relative overflow-hidden"
    >

      <InteractiveBackground darkMode={darkMode} />

      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-gradient-shift"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`text-center mb-12 sm:mb-16 ${
            isVisible ? "animate-fadeInUp" : "opacity-0"
          }`}
        >
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 font-mono ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            <span
              className={`${
                darkMode ? "text-purple-400" : "text-purple-600"
              } animate-pulse`}
            >
              &lt;
            </span>
            Skills
            <span
              className={`${
                darkMode ? "text-purple-400" : "text-purple-600"
              } animate-pulse`}
            >
              {" "}
              /&gt;
            </span>
          </h2>
          <div
            className={`w-16 sm:w-24 h-1 ${
              darkMode ? "bg-blue-400" : "bg-blue-600"
            } mx-auto mb-8 animate-expandWidth`}
          ></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`group relative p-4 sm:p-6 rounded-lg shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl border cursor-pointer ${
                darkMode
                  ? "bg-gray-800/80 hover:bg-gray-750/80 border-gray-700"
                  : "bg-white/80 hover:bg-gray-50/80 border-gray-200"
              } backdrop-blur-md ${
                isVisible ? "animate-slideInUp" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
              onMouseEnter={() => setActiveSkill(index)}
              onMouseLeave={() => setActiveSkill(null)}
            >
              {/* Skill icon with enhanced animation */}
              <div
                className={`relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-lg mb-4 mx-auto overflow-hidden ${
                  darkMode ? "bg-blue-600" : "bg-blue-600"
                } group-hover:animate-pulse transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <skill.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white relative z-10 group-hover:animate-bounce" />

                {/* Skill level indicator */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold text-white animate-pulse">
                  {Math.floor(skill.level / 10)}
                </div>
              </div>

              {/* Skill name */}
              <h3
                className={`text-base sm:text-lg font-semibold text-center mb-3 font-mono leading-tight transition-colors duration-300 ${
                  darkMode
                    ? "text-gray-100 group-hover:text-blue-400"
                    : "text-gray-900 group-hover:text-blue-600"
                }`}
              >
                {skill.name}
              </h3>

              {/* Skill description - shows on hover */}
              <div
                className={`text-xs text-center mb-4 transition-all duration-300 ${
                  activeSkill === index
                    ? "opacity-100 max-h-20"
                    : "opacity-0 max-h-0 overflow-hidden"
                } ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                {skill.description}
              </div>

              {/* Enhanced progress bar */}
              <div
                className={`w-full rounded-full h-2 mb-2 relative overflow-hidden ${
                  darkMode ? "bg-gray-700" : "bg-gray-200"
                }`}
              >
                <div
                  className={`h-2 rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${
                    darkMode
                      ? "bg-gradient-to-r from-blue-400 to-purple-500"
                      : "bg-gradient-to-r from-blue-600 to-purple-600"
                  }`}
                  style={{ width: isVisible ? `${skill.level}%` : "0%" }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                </div>
              </div>

              {/* Skill percentage with enhanced styling */}
              <div className="flex items-center justify-between">
                <div
                  className={`text-center text-sm font-medium font-mono ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  } group-hover:animate-pulse`}
                >
                  {skill.level}%
                </div>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(skill.level / 20)
                          ? "text-yellow-400 animate-twinkle"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>

              {/* Hover overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Additional skills showcase */}
        <div
          className={`mt-12 text-center ${
            isVisible ? "animate-fadeInUp" : "opacity-0"
          }`}
          style={{ animationDelay: "1s" }}
        >
          <h3
            className={`text-lg font-mono mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Technologies I work with:
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "React",
              "TypeScript",
              "Node.js",
              "Python",
              "Git",
              "Github",
              "Power BI",
            ].map((tech, index) => (
              <span
                key={tech}
                className={`px-3 py-1 rounded-full text-sm font-mono transition-all duration-300 hover:scale-110 ${
                  darkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-blue-600 hover:text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-blue-600 hover:text-white"
                } animate-fadeInUp cursor-pointer`}
                style={{ animationDelay: `${1.2 + index * 0.1}s` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Projects Component
const Projects: React.FC = () => {
  const { darkMode } = React.useContext(ThemeContext);

  const projects: Project[] = [
    {
      id: 1,
      title: "Rock Paper Scissors Game",
      description:
        "A two-player Rock-Paper-Scissors game built in Emu8086 using Assembly Language, determining the winner based on player inputs.",
      image: Work01, // now using your imported local image
      github: "https://github.com/omeldon/Assembly-language",
      demo: "",
      technologies: ["Emu8086", "Assembly Language"],
    },
    {
      id: 2,
      title: "Python Resistor Finder",
      description:
        "A Python-based tool that calculates resistor values from color codes, providing quick and accurate results for electronics projects.",
      image: Work02,
      github: "https://github.com/omeldon/Python-Codes",
      demo: "",
      technologies: ["Python", "Tkinter"],
    },
    {
      id: 3,
      title: "Bi-Verse",
      description:
        "A responsive web app for exploring and displaying Bible verses, built with React, Material-UI, Vite, and Tailwind for a clean and modern interface.",
      image: Work03,
      github: "https://github.com/omeldon/bible-ReactJS",
      demo: "https://bi-verse.vercel.app/",
      technologies: ["React", "Material-UI", "Vite", "Tailwind"],
    },
    {
      id: 4,
      title: "Static Filipino Sign Language Interpreter",
      description:
        "A machine learning project that recognizes and interprets static Filipino Sign Language gestures using Python and TensorFlow. Built to assist communication and promote accessibility through real-time gesture recognition.",
      image: Work04,
      github: "https://github.com/omeldon/Python-Codes",
      demo: "",
      technologies: ["Python","Machine Learning"],
    },
    {
      id: 5,
      title: "Intruder Alert System using Ultrasonic Sensor",
      description:
        "An Arduino-based security system that detects intruders using an ultrasonic sensor and triggers an alert. Designed and simulated in TinkerCad to demonstrate real-time distance sensing and safety applications.",
      image: Work05,
      github: "https://github.com/omeldon/Arduino-Codes",
      demo: "",
      technologies: ["Arduino, TinkerCad"],
    },
    {
      id: 6,
      title: "Line Follower Robot using L293D",
      description:
         "A robotics project that uses an Arduino and L293D motor driver to create an autonomous robot capable of following a track. Simulated in TinkerCad to showcase embedded systems and automation concepts.",
      image: Work06,
      github: "https://github.com/omeldon/Arduino-Codes",
      demo: "",
      technologies: ["Arduino, TinkerCad"],
    },
    {
      id: 7,
      title: "Power BI Sample Dashboard",
      description:
        "An interactive Power BI dashboard designed to visualize and analyze sales performance data. Includes KPIs, trend analysis, and dynamic filters for better business insights.",
      image: Work07,
      github: "https://github.com/omeldon/Power-BI-Projects",
      demo: "",
      technologies: ["Power BI"],
    },
    {
      id: 8,
      title: "Power BI Sample Dashboard",
      description:
        "A Power BI dashboard showcasing Call Center metrics such as employee demographics, performance, and retention. Built to provide clear insights for data-driven decision-making.",
      image: Work08,
      github: "https://github.com/omeldon/Power-BI-Projects",
      demo: "",
      technologies: ["Power BI"],
    },
    {
      id: 9,
      title: "React Website using Tailwind",
      description:
         "A modern and responsive website built with React and Tailwind CSS. Focused on clean UI, reusable components, and optimized performance for a smooth user experience.",
      image: Work09,
      github: "https://github.com/omeldon/direcho-trabaho-project-figma-mockup-master",
      demo: "https://dt-final-project.vercel.app/",
      technologies: ["React", "Material-UI", "Tailwind"],
    },
  ];

  return (
    <section
      id="projects"
      className={`py-16 sm:py-20 relative overflow-hidden ${
        darkMode ? "bg-gray-800" : "bg-gray-50"
      }`}
    >
      <InteractiveBackground darkMode={darkMode} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl font-bold mb-4 font-mono ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            <span className={darkMode ? "text-purple-400" : "text-purple-600"}>
              &lt;
            </span>
            Projects
            <span className={darkMode ? "text-purple-400" : "text-purple-600"}>
              {" "}
              /&gt;
            </span>
          </h2>
          <div
            className={`w-24 h-1 ${
              darkMode ? "bg-blue-400" : "bg-blue-600"
            } mx-auto mb-8`}
          ></div>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl border ${
                darkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="relative group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Github className="w-5 h-5 text-gray-900" />
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5 text-gray-900" />
                  </a>
                </div>
              </div>

              <div className="p-6">
                <h3
                  className={`text-xl font-semibold mb-3 font-mono ${
                    darkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  {project.title}
                </h3>
                <p
                  className={`mb-4 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 text-sm rounded-full font-mono ${
                        darkMode
                          ? "bg-gray-600 text-gray-200"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Component

const Contact: React.FC = () => {
  const { darkMode } = React.useContext(ThemeContext);
  const [elementRef, isVisible] = useIntersectionObserver();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "omeldon424@gmail.com",
      href: "mailto:omeldon424@gmail.com",
      color: "text-red-500",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Santa Rosa City, Laguna",
      href: "#",
      color: "text-green-500",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+63 915 408 8234",
      href: "tel:+63XXXXXXXXX",
      color: "text-blue-500",
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/rommel-dones-598539202/",
      color: "hover:text-blue-600",
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/omeldon",
      color: "hover:text-gray-600",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://x.com/RommelDones",
      color: "hover:text-blue-400",
    },
    {
      icon: Facebook,
      label: "Facebook",
      href: "https://web.facebook.com/rommel.dones.424/",
      color: "hover:text-blue-700",
    },
  ];

  const validateForm = () => {
    const errors = { name: "", email: "", message: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setFormErrors({ name: "", email: "", message: "" });
      setIsSubmitting(false);

      // Reset success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <section
      id="contact"
      ref={elementRef}
      className="py-16 sm:py-20 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <InteractiveBackground darkMode={darkMode} />
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${
              darkMode ? "#60a5fa" : "#3b82f6"
            } 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 font-mono ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            <span className={darkMode ? "text-purple-400" : "text-purple-600"}>
              &lt;
            </span>
            Contact
            <span className={darkMode ? "text-purple-400" : "text-purple-600"}>
              {" "}
              /&gt;
            </span>
          </h2>
          <div
            className={`w-16 sm:w-24 h-1 ${
              darkMode ? "bg-blue-400" : "bg-blue-600"
            } mx-auto mb-6 sm:mb-8`}
          ></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Info */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div
              className={`p-6 sm:p-8 rounded-2xl shadow-xl border backdrop-blur-sm ${
                darkMode
                  ? "bg-gray-800/80 border-gray-700"
                  : "bg-white/80 border-gray-200"
              }`}
            >
              <h3
                className={`text-xl sm:text-2xl font-semibold mb-6 font-mono flex items-center gap-3 ${
                  darkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                <Mail
                  className={`w-6 h-6 ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                />
                Get In Touch
              </h3>

              {/* Contact Information */}
              <div className="space-y-4 mb-8">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                      darkMode
                        ? "bg-gray-700/50 hover:bg-gray-700"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <info.icon className={`w-5 h-5 ${info.color}`} />
                    <div>
                      <p
                        className={`text-xs sm:text-sm font-medium ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {info.label}
                      </p>
                      <p
                        className={`text-sm sm:text-base font-mono ${
                          darkMode ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        {info.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h4
                  className={`text-lg font-semibold mb-4 font-mono ${
                    darkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Connect With Me
                </h4>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                        darkMode
                          ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                      } ${social.color}`}
                      title={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div
              className={`p-6 sm:p-8 rounded-2xl shadow-xl border backdrop-blur-sm ${
                darkMode
                  ? "bg-gray-800/80 border-gray-700"
                  : "bg-white/80 border-gray-200"
              }`}
            >
              {submitSuccess && (
                <div
                  className={`mb-6 p-4 rounded-lg border-l-4 ${
                    darkMode
                      ? "bg-green-900/20 border-green-400 text-green-400"
                      : "bg-green-50 border-green-500 text-green-700"
                  }`}
                >
                  <div className="flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    <span className="font-medium">
                      Message sent successfully!
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 font-mono ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 font-mono focus:ring-2 focus:ring-opacity-50 ${
                        formErrors.name
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : darkMode
                          ? "bg-gray-700 border-gray-600 focus:border-blue-400 focus:ring-blue-400 text-gray-100"
                          : "bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                      } focus:outline-none`}
                      placeholder="Your name"
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-sm mt-1 font-mono flex items-center">
                        <X className="w-4 h-4 mr-1" />
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 font-mono ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 font-mono focus:ring-2 focus:ring-opacity-50 ${
                        formErrors.email
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : darkMode
                          ? "bg-gray-700 border-gray-600 focus:border-blue-400 focus:ring-blue-400 text-gray-100"
                          : "bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                      } focus:outline-none`}
                      placeholder="your@email.com"
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1 font-mono flex items-center">
                        <X className="w-4 h-4 mr-1" />
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 font-mono ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 resize-none font-mono focus:ring-2 focus:ring-opacity-50 ${
                      formErrors.message
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : darkMode
                        ? "bg-gray-700 border-gray-600 focus:border-blue-400 focus:ring-blue-400 text-gray-100"
                        : "bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                    } focus:outline-none`}
                    placeholder="Tell me about your project or just say hello..."
                  />
                  {formErrors.message && (
                    <p className="text-red-500 text-sm mt-1 font-mono flex items-center">
                      <X className="w-4 h-4 mr-1" />
                      {formErrors.message}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg font-mono font-medium flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? darkMode
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : "bg-gray-400 text-gray-600 cursor-not-allowed"
                      : darkMode
                      ? "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-blue-500/25"
                      : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-blue-500/25"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer: React.FC = () => {
  const { darkMode } = React.useContext(ThemeContext);

  return (
    <footer
      className={`py-8 border-t ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p
            className={`font-mono text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <span className={darkMode ? "text-purple-400" : "text-purple-600"}>
              &lt;
            </span>
            © 2025 Rommel Dones. All rights reserved.
            <span className={darkMode ? "text-purple-400" : "text-purple-600"}>
              {" "}
              /&gt;
            </span>
          </p>
          <p
            className={`font-mono text-xs mt-2 ${
              darkMode ? "text-gray-500" : "text-gray-500"
            }`}
          >
            Built with React + TypeScript + Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main Portfolio Component
const Portfolio: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <Navbar />
        <Home />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />

        <style>{`
          .animate-fade-in {
            animation: fadeIn 1s ease-in-out;
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          html {
            scroll-behavior: smooth;
          }
          
          .dark {
            color-scheme: dark;
          }
        `}</style>
      </div>
    </ThemeContext.Provider>
  );
};

export default Portfolio;
