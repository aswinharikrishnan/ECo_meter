import "./HomePage.css";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from "../images/amppay.png";
import img from "../images/pexels-ssteenbergenn-2966315.jpg";
import DemoPopup from './DemoPopup';

// Components
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollSection = (id, event) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (isOpen) toggleMenu();
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 80;
      setVisible(isVisible);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <div className={`navbar ${visible ? "active" : "hidden"}`}>
      <div className="logo">
        <img src={logo} alt="AmpPay Logo" />
      </div>
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <a href="#" onClick={(e) => scrollSection("home", e)} className="nav-link">
          Home
        </a>
        <a href="#about1" onClick={(e) => scrollSection("about1", e)} className="nav-link">
          About
        </a>
        <Link to="/login" className="nav-link" onClick={toggleMenu}>
          Dashboard
        </Link>
      </div>
      <div className="menu-toggle" onClick={toggleMenu}>
        ☰
      </div>
    </div>
  );
};

const Carousel1 = ({ setIsDemoOpen }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/login");
  };

  const scrollSection = (id, event) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="carousel-container">
      <div className="carousel-img">
        <img src={img} alt="Innovative Business Solutions" />
      </div>
      <div className="carousel-content">
        <h1 className="carousel-title">Welcome to AmpPay</h1>
        <p className="carousel-text">
          Your all-in-one payment solution for seamless transactions
        </p>
        <div className="carousel-buttons">
          <Link to="/login" className="btn-primary">
          Get Started
        </Link>
          <button className="btn-secondary" onClick={() => navigate("/dashboard")}>
            Try Demo
          </button>
        </div>
      </div>
    </div>
  );
};

const Vision = () => {
  const [visibleHeader, setVisibleHeader] = useState(false);
  const [fadeInIntro, setFadeInIntro] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleHeader(true);
          setFadeInIntro(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="vision" className="vision-container" ref={sectionRef}>
      <div className="vision-inner">
        <h1 className={`vision-title ${visibleHeader ? "active_header2" : "hidden2"}`}>
          About Us
        </h1>
        <div className="vision-bottom">
          <div className={`vision-intro ${fadeInIntro ? "fade-in" : ""}`}>
            <p>
              Welcome to AmpPay – your gateway to empowered energy management.
              Founded by a team passionate about sustainability, AmpPay offers a
              comprehensive solution for tracking, managing, and optimizing
              energy consumption. Our platform delivers real-time tracking,
              predictive insights, and personalized recommendations to help you
              achieve your energy goals. Explore AmpPay today and take control
              of your energy like never before.
            </p>
          </div>
          <div className="vision-img">
            <img
              src="https://adamsyy.github.io/tedx-2022/metamorphosis-removebg.png"
              alt="Vision"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="card-container" ref={sectionRef}>
      <div className="card-grid">
        <div className={`card ${isVisible ? 'fade-in' : ''}`}>
          <h3>Our Story</h3>
          <p>
            AmpPay's journey is marked by innovation and dedication. From the
            inception of our idea to the implementation of cutting-edge solutions,
            we've overcome challenges and reached key milestones. Driven by a
            passion to create a positive impact, we aim to revolutionize energy
            consumption.
          </p>
        </div>
        <div className={`card ${isVisible ? 'fade-in delay-200' : ''}`}>
          <h3>Our Vision</h3>
          <p>
            At AmpPay, we envision a future where energy efficiency is seamlessly
            integrated into everyday life. Our commitment to improvement and
            innovation drives us to shape a sustainable way of living. Together,
            we can build a better tomorrow.
          </p>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const featuresData = [
    {
      icon: `<i class="fas fa-tachometer-alt"></i>`,
      title: "Real-time Tracking",
      description: "Monitor your energy consumption instantly.",
    },
    {
      icon: `<i class="fas fa-chart-line"></i>`,
      title: "Predictive Billing",
      description: "Plan and adjust your energy habits with accurate bill predictions.",
    },
    {
      icon: `<i class="fas fa-star"></i>`,
      title: "Efficiency Rankings",
      description: "Compare your energy efficiency with neighboring households.",
    },
    {
      icon: `<i class="fas fa-leaf"></i>`,
      title: "Carbon Footprint Assessment",
      description: "Gain insights into the environmental impact of your energy use.",
    },
    {
      icon: `<i class="fas fa-bell"></i>`,
      title: "Proactive Notification System",
      description: "Set limits and receive instant alerts, encouraging proactive energy-saving measures.",
    },
    {
      icon: `<i class="fas fa-lock"></i>`,
      title: "Secure Data Management",
      description: "Ensure the security and privacy of your energy consumption data.",
    },
  ];

  return (
    <div className="features-container" ref={sectionRef}>
      <h2 className="features-title">Key Features</h2>
      <div className="features-grid">
        {featuresData.map((feature, index) => (
          <div key={index} className={`feature-card ${isVisible ? 'fade-in' : ''}`}>
            <div
              className="feature-icon"
              dangerouslySetInnerHTML={{ __html: feature.icon }}
            />
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-text">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer id="footer" className="footer-container">
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} AmpPay. All rights reserved.</p>
        <p>Crafted with 💙 by Team AmpPay</p>
      </div>
    </footer>
  );
};

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="main-container">
      {loading ? (
        <div id="loader">
          <div className="loader-animation">
            <div className="ring"></div>
            <div className="ring"></div>
            <div className="ring"></div>
            <p className="loading-text">Loading</p>
            <div className="particles">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="particle" />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="content-container">
          <NavBar />
          <Carousel1 setIsDemoOpen={setIsDemoOpen} />
          <div id="about1" className="about-container">
            <Vision />
            <Card />
            <Features />
            <Footer />
          </div>
        </div>
      )}
      <DemoPopup isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </div>
  );
};

export default HomePage;
