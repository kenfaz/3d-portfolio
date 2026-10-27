import {
  ArrowDown,
  ArrowRight,
  CodeXml,
  Download,
  Mail,
  Menu,
  Moon,
  Rocket,
  Sun,
} from "lucide-react";

import { useState } from "react";
import SpaceScene from "../components/SpaceScene";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className={darkMode ? "home dark" : "home light"}>
      <div className="space-background" aria-hidden="true" />

      <header className="navbar">
        <a className="brand" href="#home" aria-label="Home">
          <span className="brand-icon">✦</span>
          <span>MyUniverse<span className="brand-dot">.</span></span>
        </a>

        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <ArrowRight /> : <Menu />}
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          {[
            ["Home", "#home"],
            ["About", "/about"],
            ["Skills", "#skills"],
            ["Experience", "#experience"],
            ["Projects", "#projects"],
            ["Education", "#education"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className={label === "Home" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a className="nav-cv" href="/cv.pdf" download>
            CV <Download size={15} />
          </a>

          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="status-dot" />
            AVAILABLE FOR OPPORTUNITIES
          </div>

          <p className="intro">Hello, universe. I'm</p>

          <h1>
            <span className="gradient-text">Kenken.</span>
          </h1>

          <h2>
            Aspiring Developer
            <span className="heading-period">.</span>
          </h2>

          <p className="hero-description">
            I build digital experiences, explore new technologies,
            and turn ideas into meaningful projects.
            Welcome to my corner of the universe.
          </p>

          <div className="hero-tags">
            <span>CODE</span>
            <span className="tag-separator">✦</span>
            <span>CREATE</span>
            <span className="tag-separator">✦</span>
            <span>EXPLORE</span>
          </div>

          <div className="hero-buttons">
            <a className="button button-primary" href="#projects">
              <Rocket size={18} />
              Explore My Projects
              <ArrowRight size={17} />
            </a>

            <a className="button button-secondary" href="/cv.pdf" download>
              <Download size={18} />
              Download CV
            </a>
          </div>

          <a className="contact-link" href="#contact">
            <Mail size={16} />
            Let's connect
          </a>
        </div>

        <div className="planet-area">
          <div className="planet-label label-one">
            <span className="label-line" />
            <span>
              <strong>CREATIVITY</strong>
              <small>Ideas into reality</small>
            </span>
          </div>

          <SpaceScene />

          <div className="planet-label label-two">
            <span className="label-line" />
            <span>
              <strong>EXPLORATION</strong>
              <small>Always learning</small>
            </span>
          </div>

          <div className="orbit-decoration orbit-one" />
          <div className="orbit-decoration orbit-two" />
        </div>

        <div className="social-links">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <CodeXml size={19} />
          </a>
          <a href="#contact" aria-label="Contact">
            <Mail size={19} />
          </a>
        </div>

        <a className="scroll-prompt" href="#about">
          <span className="scroll-icon">
            <ArrowDown size={15} />
          </span>
          <span>SCROLL TO EXPLORE</span>
        </a>

        <div className="hero-index">
          <span>01</span>
          <span className="index-line" />
          <span>THE BEGINNING</span>
        </div>
      </section>
    </main>
  );
}