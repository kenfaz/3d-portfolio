
import {
  ArrowRight,
  Code2,
  Database,
  GraduationCap,
  Laptop,
  MapPin,
  Mail,
  Phone,
  Rocket,
  Server,
  Wrench,
  Network,
  BriefcaseBusiness,
  UserRound,
} from "lucide-react";
import "./About.css";

const profile = {
  name: "Khen David F. Famadico",
  title: "Aspiring Developer",
  location: "Your Location",
  email: "khendavidfamadico@gmail.com",
  phone: "+63 XXX XXX XXXX",
  education: "Bachelor of Science in Information Technology",
  school: "City College of Calamba",
};

const journey = [
  {
    period: "Present",
    title: "Growing as a Developer",
    description:
      "Learning new technologies and developing practical software projects.",
  },
  {
    period: "Previous",
    title: "Technical Learning",
    description:
      "Building foundational skills in programming, networking, databases, and troubleshooting.",
  },
  {
    period: "Beginning",
    title: "My First Steps in Technology",
    description:
      "Exploring computers, discovering how technology works, and developing a passion for problem-solving.",
  },
];

const specializations = [
  { label: "Web Development", Icon: Code2 },
  { label: "Computer Networking", Icon: Network },
  { label: "System Administration", Icon: Server },
  { label: "Hardware Troubleshooting", Icon: Wrench },
  { label: "Database Management", Icon: Database },
  { label: "Software Projects", Icon: Laptop },
];

function Detail({ Icon, label, children }) {
  return (
    <div className="about-detail">
      <span className="about-detail-icon">
        <Icon size={19} aria-hidden="true" />
      </span>
      <div>
        <span className="about-detail-label">{label}</span>
        <p>{children}</p>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <main className="about-page" id="about">
      <div className="about-nebula" aria-hidden="true" />

      <section className="about-hero">
        <div className="about-profile">
          <div className="about-planet-frame">
            <div className="about-orbit about-orbit-one" />
            <div className="about-orbit about-orbit-two" />

            <div className="about-avatar" aria-label="Profile image placeholder">
              <UserRound size={100} strokeWidth={1} />
              <span>YOUR PORTRAIT</span>
            </div>

            <span className="about-moon about-moon-one" />
            <span className="about-moon about-moon-two" />
          </div>
        </div>

        <div className="about-introduction">
          <span className="about-eyebrow">MISSION PROFILE / 001</span>

          <h1>
            Turning Ideas Into
            <span className="about-gradient"> Digital Realities.</span>
          </h1>

          <p className="about-lead">
            Hello, I'm <strong>{profile.name}</strong>. I'm an aspiring
            developer passionate about technology, problem-solving, and
            creating digital experiences that serve a purpose.
          </p>

          <p className="about-description">
            I enjoy exploring new technologies, developing projects,
            and continuously improving my technical skills. My goal
            is to turn what I learn into practical solutions and
            meaningful experiences.
          </p>

          <a className="about-cta" href="/projects">
            Explore My Projects <ArrowRight size={17} />
          </a>
        </div>

        <aside className="about-info-card" aria-label="Personal information">
          <Detail Icon={UserRound} label="FULL NAME">
            {profile.name}
          </Detail>

          <Detail Icon={BriefcaseBusiness} label="PROFESSIONAL TITLE">
            {profile.title}
          </Detail>

          <Detail Icon={MapPin} label="LOCATION">
            {profile.location}
          </Detail>

          <Detail Icon={Mail} label="EMAIL ADDRESS">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </Detail>

          <Detail Icon={Phone} label="CONTACT NUMBER">
            {profile.phone}
          </Detail>

          <div className="about-info-divider" />

          <Detail Icon={GraduationCap} label="EDUCATION">
            {profile.education}
            <span className="about-detail-secondary">
              {profile.school}
            </span>
          </Detail>
        </aside>
      </section>

      <section className="about-lower">
        <article className="about-journey">
          <span className="about-section-kicker">MY STORY</span>
          <h2>
            My <span className="about-gradient">Journey</span>
          </h2>

          <p>
            Every developer starts somewhere. My journey is about
            curiosity, continuous learning, and turning ideas into
            working projects. Each challenge is an opportunity to
            learn something new and become better at what I do.
          </p>

          <div className="about-quote">
            Keep learning.
            <br />
            Keep exploring.
          </div>
        </article>

        <article className="about-timeline-section">
          <span className="about-section-kicker">MISSION LOG</span>
          <h2>My Journey Through Time</h2>

          <div className="about-timeline">
            {journey.map((item) => (
              <div className="about-timeline-item" key={item.title}>
                <div className="about-timeline-marker" />

                <div className="about-timeline-content">
                  <span className="about-period">{item.period}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="about-specializations">
          <span className="about-section-kicker">MY TOOLKIT</span>
          <h2>Areas of Interest</h2>

          <p>
            These are the areas I enjoy exploring and developing
            through learning and hands-on projects.
          </p>

          <div className="about-specialization-list">
            {specializations.map(({ label, Icon }) => (
              <div className="about-specialization" key={label}>
                <Icon size={17} aria-hidden="true" />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="about-mini-planet" aria-hidden="true">
            <div className="about-mini-planet-ring" />
          </div>
        </article>
      </section>

      <footer className="about-bottom">
        <span />
        <a href="/contact">
          <Rocket size={16} />
          LET'S CONNECT
          <ArrowRight size={15} />
        </a>
        <span />
      </footer>
    </main>
  );
}
