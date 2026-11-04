
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Code2,
  ExternalLink,
  Rocket,
} from "lucide-react";
import projects from "../data/projects";
import "./ProjectDetails.css";

export default function ProjectDetails() {
  const { projectId } = useParams();

  const project = projects.find((item) => item.id === projectId);

  if (!project) {
    return (
      <main className="project-detail-page">
        <h1>Mission not found</h1>
        <p>This project could not be found in the project database.</p>
        <Link to="/#projects">
          <ArrowLeft size={17} /> Return to projects
        </Link>
      </main>
    );
  }

  return (
    <main
      className="project-detail-page"
      style={{ "--detail-accent": project.accent }}
    >
      <Link to="/#projects" className="detail-back">
        <ArrowLeft size={17} /> Back to the galaxy
      </Link>

      <header className="detail-hero">
        <span className="detail-kicker">
          PROJECT ARCHIVE / {project.year}
        </span>

        <h1>{project.title}</h1>
        <p className="detail-subtitle">{project.subtitle}</p>

        <div className="detail-meta">
          <span>{project.category}</span>
          <span>{project.status}</span>
        </div>
      </header>

      <section className="detail-section">
        <h2>Mission Overview</h2>
        <p>{project.description}</p>
      </section>

      <section className="detail-section">
        <h2>Tools & Techniques</h2>
        <div className="detail-tech-list">
          {project.technologies.map((technology) => (
            <span key={technology}>
              <Code2 size={15} />
              {technology}
            </span>
          ))}
        </div>
      </section>

      <section className="detail-section">
        <h2>Project Links</h2>
        <p>
          Explore the available source code or live version of this project.
        </p>

        <div className="detail-actions">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer">
              <Code2 size={17} /> View source code
              <ArrowUpRight size={15} />
            </a>
          )}

          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer">
              <ExternalLink size={17} /> Live demo
              <ArrowUpRight size={15} />
            </a>
          )}

          {!project.github && !project.demo && (
            <p className="detail-unavailable">
              <Rocket size={17} />
              Project links have not been added yet.
            </p>
          )}
        </div>
      </section>

      <Link to="/#projects" className="detail-return">
        Explore other missions <ArrowUpRight size={17} />
      </Link>
    </main>
  );
}
