import { useState } from "react";
import {
  ArrowRight,
  Download,
  Menu,
  Moon,
  Sun,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navigationLinks = [
  ["Home", "/"],
  ["About", "/about"],
  ["Skills", "/skills"],
  ["Experience", "/experience"],
  ["Projects", "/projects"],
  ["Education", "/education"],
  ["Contact", "/contact"],
];

export default function Navbar({ darkMode, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <header className={`navbar${isHome && !darkMode ? " light" : ""}`}>
      <Link className="brand" to="/" aria-label="Home">
        <span className="brand-icon">✦</span>
        <span>MyUniverse<span className="brand-dot">.</span></span>
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
        {navigationLinks.map(([label, href]) => {
          const isActive =
            pathname === href ||
            (href === "/projects" && pathname.startsWith("/projects/"));

          return (
            <Link
              key={label}
              to={href}
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
        <a className="nav-cv" href="/cv.pdf" download>
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
