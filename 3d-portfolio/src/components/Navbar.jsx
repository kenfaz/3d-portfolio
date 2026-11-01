import { useEffect, useState } from "react";
import {
  ArrowRight,
  Download,
  Menu,
  Moon,
  Sun,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navigationLinks = [
  ["Home", "home"],
  ["About", "about"],
  ["Skills", "skills"],
  ["Experience", "experience"],
  ["Projects", "projects"],
  ["Education", "education"],
  ["Contact", "contact"],
];

export default function Navbar({ darkMode, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    function updateActiveSection() {
      if (!isHome) {
        setActiveSection(pathname.startsWith("/projects") ? "projects" : pathname.slice(1));
        return;
      }

      const activationLine =
        document.querySelector(".navbar")?.getBoundingClientRect().bottom ?? 0;
      const currentSection = navigationLinks
        .map(([, section]) => document.getElementById(section))
        .filter((element) => element && element.getBoundingClientRect().top <= activationLine + 1)
        .pop();

      setActiveSection(currentSection?.id ?? "home");
    }

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [isHome, pathname]);

  return (
    <header className={`navbar${isHome && !darkMode ? " light" : ""}`}>
      <Link className="brand" to="/" aria-label="Home">
        <span>HelloWorld<span className="brand-dot">.</span></span>
      </Link>

      <button
        className="mobile-menu-button"
        onClick={() => setMenuOpen((isOpen) => !isOpen)}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        {menuOpen ? <ArrowRight /> : <Menu />}
      </button>

      <nav className={menuOpen ? "nav-links open" : "nav-links"}>
        {navigationLinks.map(([label, section]) => {
          const isActive = activeSection === section;

          return (
            <Link
              key={label}
              to={`/#${section}`}
              className={isActive ? "active" : ""}
              aria-current={isActive ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="nav-actions">
        <a className="nav-cv" href="/Resume.png" download>
          CV <Download size={15} />
        </a>

        {isHome && (
          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        )}
      </div>
    </header>
  );
}
