
import {
  GraduationCap,
  Award,
  BookOpen,
  Code2,
  Trophy,
  Sparkles,
  ExternalLink,
  CalendarDays,
  School,
  Medal,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./Education.css";

const education = [
  {
    id: 1,
    level: "College",
    program: "Bachelor of Science in Information Technology",
    school: "City College of Calamba",
    period: "2024 - 2028",
    description:
      "Learned Data structures, Algorithms, Web Development, Database Management, and Software Engineering principles. Gained hands-on experience through projects and internships.",
    status: "Ongoing",
  
  },
  {
    id: 2,
    level: "Senior High School",
    strand: "TVL - Information and Communication Technology (ICT)",
    school: "Laguna College of Business and Arts",
    period: "2022 - 2024",
    description: "Acquired my NC2 in Computer Systems Servicing. Gained practical skills in computer hardware, software installation, and troubleshooting.",
    status: "Finished",
  
  },
];

const credentials = [
  {
    id: 1,
    title: "Computer Systems Servicing NC II",
    issuer: "TESDA / Issuing Institution",
    category: "Technical Qualification",
    description:
      "Technical training related to computer hardware, software installation, system configuration, and troubleshooting. Confirm the exact qualification title and issuing institution.",
    icon: School,
    accent: "#8b83ff",
    year: "Add year",
  },
  {
    id: 2,
    title: "Problem Solving (Basic)",
    issuer: "HackerRank",
    category: "Programming",
    description:
      "Recognition of foundational problem-solving skills through programming challenges.",
    icon: Code2,
    accent: "#59d6ff",
    year: "Add year",
  },
  {
    id: 3,
    title: "Scientific Computing with Python",
    issuer: "freeCodeCamp",
    category: "Programming",
    description:
      "Credential related to Python programming and scientific computing concepts.",
    icon: Award,
    accent: "#f0a4ff",
    year: "Add year",
  },
  {
    id: 4,
    title: "Pixel Perfect Certificate",
    issuer: "Verify issuing organization",
    category: "Design / Development",
    description:
      "Won 3rd place in the Pixel Perfect Challenge for UI/UX design using Figma.",
    icon: Medal,
    accent: "#ffc477",
    year: "Add year",
  },
];

const achievements = [
  {
    title: "DCI Hackathon — First Place",
    subtitle: "Hackathon Achievement",
    description:
      "Recognized for achieving first place in the DCI Hackathon October 21.",
    icon: Trophy,
    accent: "#ffc477",
  },
];

export default function Education() {
  return (
    <main className="education-page" id="education">
      <div className="education-stars" aria-hidden="true" />
      <div className="education-orbit education-orbit-one" aria-hidden="true" />
      <div className="education-orbit education-orbit-two" aria-hidden="true" />

      <section className="education-hero">
        <div className="education-hero-copy">
          <span className="education-eyebrow">
            <Sparkles size={15} aria-hidden="true" />
            LEARNING & ACHIEVEMENTS
          </span>

          <h1>
            Education & <span>Credentials</span>
          </h1>

          <p>
            My academic journey, technical qualifications, and learning
            milestones that support my growth as a developer.
          </p>

          <a className="education-hero-link" href="#education-history">
            Explore my background
            <span aria-hidden="true">↘</span>
          </a>
        </div>

        <div className="education-hero-visual" aria-hidden="true">
          <div className="education-planet-ring ring-one" />
          <div className="education-planet-ring ring-two" />
          <div className="education-planet">
            <div className="education-planet-highlight" />
          </div>
          <div className="education-float-icon float-book">
            <BookOpen size={22} />
          </div>
          <div className="education-float-icon float-award">
            <Award size={22} />
          </div>
          <span className="education-star star-one" />
          <span className="education-star star-two" />
          <span className="education-star star-three" />
        </div>
      </section>

      <section
        className="education-history section-width"
        id="education-history"
      >
        <div className="education-section-heading">
          <div>
            <span className="education-section-kicker">
              ACADEMIC BACKGROUND
            </span>
            <h2>Education journey</h2>
            <p>
              The academic experiences and formal learning that shape my
              technical foundation.
            </p>
          </div>
          <GraduationCap
            className="education-heading-icon"
            size={34}
            aria-hidden="true"
          />
        </div>

        <div className="education-timeline">
          {education.map((item) => (
            <article className="education-timeline-entry" key={item.id}>
              <div className="education-timeline-marker">
                <GraduationCap size={19} aria-hidden="true" />
              </div>

              <div className="education-timeline-card">
                <div className="education-entry-top">
                  <span className="education-entry-level">
                    {item.level}
                  </span>
                  <span className="education-entry-period">
                    <CalendarDays size={14} aria-hidden="true" />
                    {item.period}
                  </span>
                </div>

                <h3>{item.program}</h3>
                <p className="education-school-name">{item.school}</p>
                <p className="education-entry-description">
                  {item.description}
                </p>
                <span className="education-edit-hint">
                  {item.status}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="education-credentials section-width">
        <div className="education-section-heading">
          <div>
            <span className="education-section-kicker">
              SKILLS & QUALIFICATIONS
            </span>
            <h2>Credentials & certificates</h2>
            <p>
              A collection of technical qualifications and learning
              achievements.
            </p>
          </div>
          <Award
            className="education-heading-icon"
            size={34}
            aria-hidden="true"
          />
        </div>

        <div className="education-credential-grid">
          {credentials.map((credential) => {
            const Icon = credential.icon;

            return (
              <article
                className="education-credential-card"
                key={credential.id}
                style={{ "--credential-accent": credential.accent }}
              >
                <div className="education-credential-top">
                  <div className="education-credential-icon">
                    <Icon size={23} aria-hidden="true" />
                  </div>
                  <span className="education-credential-category">
                    {credential.category}
                  </span>
                </div>

                <h3>{credential.title}</h3>
                <p className="education-credential-issuer">
                  {credential.issuer}
                </p>
                <p className="education-credential-description">
                  {credential.description}
                </p>

                <div className="education-credential-footer">
                  <span>{credential.year}</span>
                  <span className="education-credential-mark">
                    <Sparkles size={14} aria-hidden="true" />
                    Credential
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="education-achievements section-width">
        <div className="education-section-heading">
          <div>
            <span className="education-section-kicker">
              MILESTONES
            </span>
            <h2>Achievements & recognition</h2>
            <p>
              Experiences that reflect initiative, teamwork, and
              continued learning.
            </p>
          </div>
          <Trophy
            className="education-heading-icon"
            size={34}
            aria-hidden="true"
          />
        </div>

        <div className="education-achievement-list">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;

            return (
              <article
                className="education-achievement-card"
                key={achievement.title}
                style={{ "--achievement-accent": achievement.accent }}
              >
                <div className="education-achievement-icon">
                  <Icon size={25} aria-hidden="true" />
                </div>
                <div className="education-achievement-content">
                  <span>{achievement.subtitle}</span>
                  <h3>{achievement.title}</h3>
                  <p>{achievement.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="education-cta section-width">
        <div className="education-cta-icon">
          <BookOpen size={23} aria-hidden="true" />
        </div>
        <div className="education-cta-copy">
          <h2>Learning never stops</h2>
          <p>
            Every course, project, and challenge is an opportunity to
            develop new skills and strengthen existing ones.
          </p>
        </div>
        <Link to="/#projects" className="education-cta-link">
          View my projects
          <ExternalLink size={16} aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
