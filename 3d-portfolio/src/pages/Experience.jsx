
import { useState } from "react";
import {
  BriefcaseBusiness,
  Code2,
  Database,
  Gamepad2,
  ArrowUpRight,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Rocket,
  CalendarDays,
  Layers3,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./Experience.css";

const experiences = [
  {
    id: 1,
    type: "Academic Project",
    title: "Inventory & Sales Monitoring System",
    organization: "Desire's Tailor Shop",
    period: "2026",
    icon: Database,
    accent: "#a29bff",
    description:
      "Contributed to the development of a browser-based management system designed to organize inventory, rental transactions, tailoring orders, customer records, and sales monitoring.",
    responsibilities: [
      "Worked with PHP and MySQL for server-side functionality and data management.",
      "Developed and organized features for inventory, reservations, rentals, and tailoring orders.",
      "Explored SMS and email notifications for reminders and operational updates.",
      "Worked with role-based access and organized business records.",
    ],
    technologies: ["PHP", "MySQL", "JavaScript", "HTML", "CSS"],
    projectId: "desires-tailor",
  },
  {
    id: 2,
    type: "Personal Project",
    title: "2D Game Development",
    organization: "WellSpace",
    period: "2026",
    icon: Gamepad2,
    accent: "#59d6ff",
    description:
      "Explored 2D game development through a pixel-art project using Kaplay.js and Vite, focusing on animated sprites, keyboard controls, and a minimal game interface.",
    responsibilities: [
      "Configured a Vite-based JavaScript development environment.",
      "Worked with idle and walking sprite animations.",
      "Implemented keyboard movement using WASD and arrow keys.",
      "Organized reusable interface elements and game controls into separate modules.",
    ],
    technologies: ["JavaScript", "Kaplay.js", "Vite", "Pixel Art"],
    projectId: "wellspace",
  },
  {
    id: 3,
    type: "Development Project",
    title: "GitHub Stats Generator",
    organization: "Developer Tools",
    period: "2026",
    icon: Code2,
    accent: "#f0a4ff",
    description:
      "Explored the use of GitHub data and APIs to retrieve developer statistics and investigate ways to present those statistics in profile README content.",
    responsibilities: [
      "Explored GitHub API and GraphQL data retrieval.",
      "Investigated how developer statistics could be organized and displayed.",
      "Experimented with Python for API-related tasks.",
      "Investigated API request structure and connection issues during development.",
    ],
    technologies: ["Python", "GraphQL", "GitHub API", "Markdown"],
    projectId: "github-stats-generator",
  },
];

const highlights = [
  {
    icon: Code2,
    title: "Application Development",
    description:
      "Building and experimenting with web applications and interactive interfaces.",
  },
  {
    icon: Database,
    title: "Data Management",
    description:
      "Exploring relational databases, application data, and API integrations.",
  },
  {
    icon: Layers3,
    title: "Continuous Learning",
    description:
      "Improving development skills through coursework and hands-on projects.",
  },
];

export default function Experience() {
  const [expandedItems, setExpandedItems] = useState([1]);
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    "All",
    "Academic Project",
    "Personal Project",
    "Development Project",
  ];

  const filteredExperiences =
    activeFilter === "All"
      ? experiences
      : experiences.filter((item) => item.type === activeFilter);

  function toggleExperience(id) {
    setExpandedItems((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id]
    );
  }

  return (
    <main className="experience-page">
      <div className="experience-stars" aria-hidden="true" />
      <div className="experience-orbit experience-orbit-a" aria-hidden="true" />
      <div className="experience-orbit experience-orbit-b" aria-hidden="true" />

      <section className="experience-hero">
        <div className="experience-hero-copy">
          <span className="experience-eyebrow">
            <Sparkles size={15} aria-hidden="true" />
            MY JOURNEY SO FAR
          </span>

          <h1>
            Experience & <span>Growth</span>
          </h1>

          <p>
            A look at the projects, technical challenges, and learning
            experiences that continue to shape my journey as a developer.
          </p>

          <a className="experience-scroll-link" href="#experience-timeline">
            Explore my journey
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>

        <div className="experience-hero-art" aria-hidden="true">
          <div className="experience-art-orbit experience-art-orbit-one" />
          <div className="experience-art-orbit experience-art-orbit-two" />
          <div className="experience-art-planet">
            <div className="experience-art-crater crater-one" />
            <div className="experience-art-crater crater-two" />
            <div className="experience-art-crater crater-three" />
          </div>
          <div className="experience-art-icon art-icon-briefcase">
            <BriefcaseBusiness size={22} />
          </div>
          <div className="experience-art-icon art-icon-rocket">
            <Rocket size={22} />
          </div>
          <span className="experience-art-star star-a" />
          <span className="experience-art-star star-b" />
          <span className="experience-art-star star-c" />
        </div>
      </section>

      <section className="experience-highlights" aria-label="Experience highlights">
        {highlights.map((item) => {
          const Icon = item.icon;

          return (
            <article className="experience-highlight" key={item.title}>
              <div className="experience-highlight-icon">
                <Icon size={22} aria-hidden="true" />
              </div>
              <div>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
            </article>
          );
        })}
      </section>

      <section
        className="experience-timeline-section"
        id="experience-timeline"
      >
        <div className="experience-section-heading">
          <div>
            <span className="experience-section-kicker">
              THE DEVELOPMENT LOG
            </span>
            <h2>My experience timeline</h2>
            <p>
              Project-based experience, technical exploration, and practical
              application of development skills.
            </p>
          </div>
          <span className="experience-total">
            {experiences.length} projects
          </span>
        </div>

        <div
          className="experience-filters"
          aria-label="Filter experience entries"
        >
          {filters.map((filter) => (
            <button
              type="button"
              key={filter}
              className={`experience-filter ${
                activeFilter === filter ? "active" : ""
              }`}
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="experience-timeline">
          {filteredExperiences.map((item) => {
            const Icon = item.icon;
            const isExpanded = expandedItems.includes(item.id);

            return (
              <article
                className="experience-entry"
                key={item.id}
                style={{ "--experience-accent": item.accent }}
              >
                <div className="experience-timeline-marker">
                  <span>
                    <Icon size={19} aria-hidden="true" />
                  </span>
                </div>

                <div className="experience-entry-card">
                  <div className="experience-entry-topline">
                    <span className="experience-type">
                      {item.type}
                    </span>
                    <span className="experience-period">
                      <CalendarDays size={14} aria-hidden="true" />
                      {item.period}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="experience-entry-toggle"
                    aria-expanded={isExpanded}
                    onClick={() => toggleExperience(item.id)}
                  >
                    <span className="experience-entry-title-wrap">
                      <span className="experience-entry-title">
                        {item.title}
                      </span>
                      <span className="experience-entry-organization">
                        {item.organization}
                      </span>
                    </span>

                    <span className="experience-expand-icon">
                      {isExpanded ? (
                        <ChevronUp size={19} />
                      ) : (
                        <ChevronDown size={19} />
                      )}
                    </span>
                  </button>

                  <p className="experience-entry-description">
                    {item.description}
                  </p>

                  {isExpanded && (
                    <div className="experience-entry-details">
                      <h3>Key activities</h3>
                      <ul>
                        {item.responsibilities.map((responsibility) => (
                          <li key={responsibility}>{responsibility}</li>
                        ))}
                      </ul>

                      <h3>Technologies explored</h3>
                      <div className="experience-tech-list">
                        {item.technologies.map((technology) => (
                          <span key={technology}>{technology}</span>
                        ))}
                      </div>

                      <Link
                        to={`/projects/${item.projectId}`}
                        className="experience-project-link"
                      >
                        View project details
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </Link>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="experience-closing">
        <div className="experience-closing-icon">
          <Code2 size={23} aria-hidden="true" />
        </div>
        <div>
          <h2>Every project is another step forward.</h2>
          <p>
            I continue to build, experiment, and learn through practical
            development projects.
          </p>
        </div>
        <Link to="/projects" className="experience-closing-link">
          Explore projects
          <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
