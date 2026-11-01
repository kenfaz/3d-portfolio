import {
  ArrowDown,
  ArrowRight,
  CodeXml,
  Download,
  Mail,
  Rocket,
} from "lucide-react";
import { Link } from "react-router-dom";

import SpaceScene from "../components/SpaceScene";

export default function Home({ darkMode }) {
  return (
    <main className={darkMode ? "home dark" : "home light"} id="home">
      <div className="space-background" aria-hidden="true" />

      <section className="hero">
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
            <Link className="button button-primary" to="/#projects">
              <Rocket size={18} />
              Explore My Projects
              <ArrowRight size={17} />
            </Link>

            <a className="button button-secondary" href="/Resume.png" download>
              <Download size={18} />
              Download CV
            </a>
          </div>

          <Link className="contact-link" to="/#contact">
            <Mail size={16} />
            Let's connect
          </Link>
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
          <Link to="/#contact" aria-label="Contact">
            <Mail size={19} />
          </Link>
        </div>

        <Link className="scroll-prompt" to="/#about">
          <span className="scroll-icon">
            <ArrowDown size={15} />
          </span>
          <span>SCROLL TO EXPLORE</span>
        </Link>

        <div className="hero-index">
          <span>01</span>
          <span className="index-line" />
          <span>THE BEGINNING</span>
        </div>
      </section>
    </main>
  );
}