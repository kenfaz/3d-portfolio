
import { useMemo, useState } from "react";
import {
  Code2,
  Palette,
  Database,
  Wrench,
  Gamepad2,
  GitBranch,
  Search,
  Sparkles,
  Layers3,
  Terminal,
  Boxes,
  Globe,
  X,
} from "lucide-react";
import "./Skills.css";

const skillGroups = [
  {
    title: "Frontend Development",
    category: "Frontend",
    description: "Building responsive and interactive user interfaces.",
    icon: Code2,
    color: "#8b83ff",
    skills: [
      { name: "HTML5", detail: "Web page structure" },
      { name: "CSS3", detail: "Styling and responsive layouts" },
      { name: "JavaScript", detail: "Interactive web functionality" },
      { name: "React", detail: "Component-based interfaces" },
      { name: "Vite", detail: "Frontend development tooling" },
      { name: "React Router", detail: "Client-side navigation" },
    ],
  },
  {
    title: "Backend & Databases",
    category: "Backend",
    description: "Developing application logic and managing stored data.",
    icon: Database,
    color: "#59d6ff",
    skills: [
      { name: "PHP", detail: "Server-side web development" },
      { name: "MySQL", detail: "Relational database management" },
      { name: "REST APIs", detail: "Working with web services" },
      { name: "GraphQL", detail: "Exploring structured API queries" },
    ],
  },
  {
    title: "Programming & Game Development",
    category: "Programming",
    description: "Exploring programming concepts and interactive experiences.",
    icon: Gamepad2,
    color: "#f0a4ff",
    skills: [
      { name: "Python", detail: "Scripting and programming projects" },
      { name: "Kaplay.js", detail: "2D game development" },
      { name: "Three.js", detail: "3D graphics for the web" },
      { name: "React Three Fiber", detail: "3D scenes in React" },
    ],
  },
  {
    title: "Tools & Workflow",
    category: "Tools",
    description: "Using development tools to build, test, and maintain projects.",
    icon: Wrench,
    color: "#ffc477",
    skills: [
      { name: "Git", detail: "Version control" },
      { name: "GitHub", detail: "Code hosting and collaboration" },
      { name: "VS Code", detail: "Code editing and development" },
      { name: "Vite", detail: "Local development and builds" },
      { name: "XAMPP", detail: "Local PHP and MySQL environment" },
    ],
  },
];

const categories = ["All", ...skillGroups.map((group) => group.category)];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGroups = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return skillGroups
      .filter(
        (group) =>
          activeCategory === "All" || group.category === activeCategory
      )
      .map((group) => ({
        ...group,
        skills: group.skills.filter(
          (skill) =>
            !query ||
            skill.name.toLowerCase().includes(query) ||
            skill.detail.toLowerCase().includes(query) ||
            group.title.toLowerCase().includes(query)
        ),
      }))
      .filter((group) => group.skills.length > 0);
  }, [activeCategory, searchTerm]);

  const totalSkills = skillGroups.reduce(
    (total, group) => total + group.skills.length,
    0
  );

  function clearFilters() {
    setActiveCategory("All");
    setSearchTerm("");
  }

  return (
    <main className="skills-page">
      <div className="skills-stars" aria-hidden="true" />
      <div className="skills-orbit skills-orbit-one" aria-hidden="true" />
      <div className="skills-orbit skills-orbit-two" aria-hidden="true" />

      <section className="skills-hero">
        <div className="skills-hero-copy">
          <span className="skills-eyebrow">
            <Sparkles size={15} aria-hidden="true" />
            MY TECH UNIVERSE
          </span>

          <h1>
            Skills & <span>Technologies</span>
          </h1>

          <p>
            The tools, technologies, and programming concepts I use to
            explore ideas and build digital experiences.
          </p>

          <div className="skills-hero-stats">
            <div className="skills-stat">
              <span className="skills-stat-number">{totalSkills}</span>
              <span className="skills-stat-label">Listed technologies</span>
            </div>
            <div className="skills-stat-divider" />
            <div className="skills-stat">
              <span className="skills-stat-number">{skillGroups.length}</span>
              <span className="skills-stat-label">Skill categories</span>
            </div>
          </div>
        </div>

        <div className="skills-hero-visual" aria-hidden="true">
          <div className="skills-planet-ring skills-ring-one" />
          <div className="skills-planet-ring skills-ring-two" />
          <div className="skills-planet">
            <div className="skills-planet-shine" />
          </div>
          <div className="skills-floating-icon skills-floating-code">
            <Code2 size={23} />
          </div>
          <div className="skills-floating-icon skills-floating-layers">
            <Layers3 size={22} />
          </div>
          <div className="skills-floating-icon skills-floating-terminal">
            <Terminal size={22} />
          </div>
          <span className="skills-star-dot skills-dot-one" />
          <span className="skills-star-dot skills-dot-two" />
          <span className="skills-star-dot skills-dot-three" />
        </div>
      </section>

      <section className="skills-explorer" aria-label="Explore skills">
        <div className="skills-section-heading">
          <div>
            <span className="skills-section-kicker">THE COLLECTION</span>
            <h2>Explore my toolkit</h2>
          </div>
          <span className="skills-result-count">
            {filteredGroups.reduce(
              (total, group) => total + group.skills.length,
              0
            )}{" "}
            skills shown
          </span>
        </div>

        <div className="skills-controls">
          <label className="skills-search">
            <Search size={18} aria-hidden="true" />
            <span className="sr-only">Search skills</span>
            <input
              type="search"
              placeholder="Search technologies..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                className="skills-clear-search"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </label>

          <div className="skills-filter-list" aria-label="Filter by category">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={`skills-filter ${
                  activeCategory === category ? "active" : ""
                }`}
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredGroups.length > 0 ? (
          <div className="skills-groups">
            {filteredGroups.map((group) => {
              const GroupIcon = group.icon;

              return (
                <article className="skills-group-card" key={group.category}>
                  <div className="skills-group-header">
                    <div
                      className="skills-group-icon"
                      style={{ "--group-accent": group.color }}
                    >
                      <GroupIcon size={22} aria-hidden="true" />
                    </div>

                    <div className="skills-group-title">
                      <h3>{group.title}</h3>
                      <p>{group.description}</p>
                    </div>

                    <span className="skills-group-count">
                      {String(group.skills.length).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="skills-chip-grid">
                    {group.skills.map((skill) => (
                      <div className="skills-chip" key={skill.name}>
                        <span
                          className="skills-chip-dot"
                          style={{ backgroundColor: group.color }}
                          aria-hidden="true"
                        />
                        <div>
                          <span className="skills-chip-name">
                            {skill.name}
                          </span>
                          <span className="skills-chip-detail">
                            {skill.detail}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="skills-empty-state">
            <div className="skills-empty-icon">
              <Boxes size={28} />
            </div>
            <h3>No matching skills found</h3>
            <p>Try another keyword or reset your category filter.</p>
            <button
              type="button"
              className="skills-reset-button"
              onClick={clearFilters}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      <section className="skills-note">
        <div className="skills-note-icon">
          <Globe size={22} aria-hidden="true" />
        </div>
        <div>
          <h2>Always exploring</h2>
          <p>
            Development is a continuous learning process. I keep exploring
            new tools and improving my skills through coursework,
            experimentation, and personal projects.
          </p>
        </div>
      </section>
    </main>
  );
}
