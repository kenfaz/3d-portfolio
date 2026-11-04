
import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Code2,
  ExternalLink,
  Gamepad2,
  Search,
  Sparkles,
  X,
  Database,
  ChartNoAxesCombined,
  Rocket,
} from "lucide-react";
import { Link } from "react-router-dom";
import projects from "../data/projects";
import "./Projects.css";

const categories = [
  "All Projects",
  ...new Set(projects.map((project) => project.category)),
];

const icons = {
  database: Database,
  "gamepad-2": Gamepad2,
  "chart-no-axes-combined": ChartNoAxesCombined,
};

function ProjectCard({ project, index }) {
  const Icon = icons[project.icon] || Code2;

  return (
    <article
      className={`project-card ${project.featured ? "featured" : ""}`}
      style={{ "--project-accent": project.accent }}
    >
      <div className="project-card-visual">
        <div className="project-card-stars" aria-hidden="true" />
        <div className="project-orbit project-orbit-a" aria-hidden="true" />
        <div className="project-orbit project-orbit-b" aria-hidden="true" />

        {project.thumbnail ? (
          <img
            className="project-card-thumbnail"
            src={project.thumbnail}
            alt={`${project.title} project thumbnail`}
          />
        ) : (
          <div className="project-planet" aria-hidden="true">
            <Icon size={42} strokeWidth={1.25} />
          </div>
        )}

        <span className="project-number">
          MISSION {String(index + 1).padStart(2, "0")}
        </span>

        <span className="project-category">{project.category}</span>
      </div>

      <div className="project-card-content">
        <div className="project-card-meta">
          <span>{project.year}</span>
          <span className="project-status">
            <span />
            {project.status}
          </span>
        </div>

        <h2>{project.title}</h2>
        <h3>{project.subtitle}</h3>

        <p className="project-description">{project.description}</p>

        <div className="project-tech-list" aria-label="Tools and techniques">
          {project.technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>

        <div className="project-card-actions">
          <Link
            className="project-details-link"
            to={`/projects/${project.id}`}
          >
            Explore mission <ArrowUpRight size={17} />
          </Link>

          {project.github && (
            <a
              className="project-external-link"
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${project.title} source code`}
            >
              <Code2 size={17} />
            </a>
          )}

          {project.demo && (
            <a
              className="project-external-link"
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${project.title} live demo`}
            >
              <ExternalLink size={17} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Projects");
  const [technology, setTechnology] = useState("All Tools & Techniques");
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const technologies = useMemo(
    () => [
      "All Tools & Techniques",
      ...new Set(projects.flatMap((project) => project.technologies)),
    ],
    []
  );

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch = [
        project.title,
        project.subtitle,
        project.description,
        project.category,
        ...project.technologies,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);

      const matchesCategory =
        category === "All Projects" || project.category === category;

      const matchesTechnology =
        technology === "All Tools & Techniques" ||
        project.technologies.includes(technology);

      const matchesFeatured = !featuredOnly || project.featured;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesTechnology &&
        matchesFeatured
      );
    });
  }, [search, category, technology, featuredOnly]);

  function clearFilters() {
    setSearch("");
    setCategory("All Projects");
    setTechnology("All Tools & Techniques");
    setFeaturedOnly(false);
  }

  return (
    <main className="projects-page" id="projects">
      <div className="projects-nebula" aria-hidden="true" />

      <header className="projects-heading">
        <div className="projects-eyebrow">
          <Sparkles size={14} />
          THE PROJECT GALAXY
        </div>

        <h1>
          Explore My <span>Universe.</span>
        </h1>

        <p>
          Every project is a new world to explore. Discover the ideas,
          technologies, and experiments behind my development journey.
        </p>

        <div className="projects-stats">
          <div>
            <strong>{projects.length.toString().padStart(2, "0")}</strong>
            <span>MISSIONS</span>
          </div>
          <span className="projects-stat-divider" />
          <div>
            <strong>{new Set(projects.flatMap((p) => p.technologies)).size
              .toString()
              .padStart(2, "0")}</strong>
            <span>TOOLS & TECHNIQUES</span>
          </div>
          <span className="projects-stat-divider" />
          <div>
            <strong>
              {new Set(projects.map((p) => p.category)).size
                .toString()
                .padStart(2, "0")}
            </strong>
            <span>DOMAINS</span>
          </div>
        </div>
      </header>

      <section className="projects-explorer" aria-label="Project explorer">
        <div className="projects-toolbar">
          <label className="projects-search">
            <Search size={19} aria-hidden="true" />
            <input
              type="search"
              placeholder="Search projects, tools, or techniques..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search projects"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X size={17} />
              </button>
            )}
          </label>

          <label className="projects-technology-select">
            <span className="sr-only">Filter by tool or technique</span>
            <select
              value={technology}
              onChange={(event) => setTechnology(event.target.value)}
            >
              {technologies.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="projects-filter-row">
          <div className="projects-categories" aria-label="Project categories">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={category === item ? "selected" : ""}
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
              >
                {item}
              </button>
            ))}
          </div>

          <label className="featured-filter">
            <input
              type="checkbox"
              checked={featuredOnly}
              onChange={(event) => setFeaturedOnly(event.target.checked)}
            />
            <span>Featured only</span>
          </label>
        </div>

        <div className="projects-results-bar" aria-live="polite">
          <span>
            <span className="projects-results-dot" />
            {filteredProjects.length}{" "}
            {filteredProjects.length === 1 ? "MISSION" : "MISSIONS"} FOUND
          </span>

          {(search ||
            category !== "All Projects" ||
            technology !== "All Tools & Techniques" ||
            featuredOnly) && (
            <button type="button" onClick={clearFilters}>
              Clear filters <X size={14} />
            </button>
          )}
        </div>

        {filteredProjects.length > 0 ? (
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={projects.indexOf(project)}
              />
            ))}
          </div>
        ) : (
          <div className="projects-empty">
            <div className="projects-empty-icon">
              <Rocket size={30} />
            </div>
            <h2>No missions found</h2>
            <p>
              No projects match your current search. Try another keyword
              or reset the filters.
            </p>
            <button type="button" onClick={clearFilters}>
              Reset explorer <ArrowRight size={16} />
            </button>
          </div>
        )}
      </section>

      <footer className="projects-footer">
        <ArrowDownRight size={17} />
        <span>MORE IDEAS. MORE WORLDS. ALWAYS EXPLORING.</span>
      </footer>
    </main>
  );
}
