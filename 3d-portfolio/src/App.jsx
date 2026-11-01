
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Skills from "./pages/Skills";
import Experience from "./pages/Experience";
import Education from "./pages/Education";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";

function ScrollToTop() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, key]);

  return null;
}

function Portfolio({ darkMode }) {
  return (
    <>
      <Home darkMode={darkMode} />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Contact />
    </>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode((isDark) => !isDark)}
      />
      <Routes>
        <Route path="/" element={<Portfolio darkMode={darkMode} />} />
        <Route path="/about" element={<Navigate to="/#about" replace />} />
        <Route path="/projects" element={<Navigate to="/#projects" replace />} />
        <Route path="/skills" element={<Navigate to="/#skills" replace />} />
        <Route
          path="/projects/:projectId"
          element={<ProjectDetails />}
        />
        <Route path="/experience" element={<Navigate to="/#experience" replace />} />
        <Route path="/education" element={<Navigate to="/#education" replace />} />
        <Route path="/contact" element={<Navigate to="/#contact" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
