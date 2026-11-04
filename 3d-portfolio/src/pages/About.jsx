
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
import { Link } from "react-router-dom";
import "./About.css";

const profile = {
  name: "Khen David F. Famadico",
  title: "Aspiring Developer",
  location: "Calamba City, Laguna, Philippines",
  email: "khendavidfamadico@gmail.com",
  phone: "+63 993 833 9330",
  education: "Bachelor of Science in Information Technology",
  school: "City College of Calamba",
};

const journey = [
  {
    period: "Present",
    title: "Acquiring my BSIT degree",
    description:
      "Learned and developed skills in programming, networking, and system administration. Gained hands-on experience through projects and internships.",
  },
  {
    period: "More curiosity",
    title: "Pentesting and Linux",
    description:
      "Did CTFs through controlled virtual environments and learned about ethical hacking, penetration testing, and cybersecurity. Explored new technologies and frameworks to stay updated with industry trends.",
  },
  {
    period: "Curiosity",
    title: "Web development and Wallpaper Engine",
    description:
      "Explored web development techniques and created custom wallpapers using various design tools.",
  },
  {
    period: "Alpha",
    title: "Game development and scripting",
    description:
      "Stumbled upon a video about game development and started creating simple games using Python (pygame) along with scripting and automating simple tasks."
    },
];

const specializations = [
  { label: "Web Development", Icon: Code2 },
  { label: "Computer Networking", Icon: Network },
  { label: "System Administration", Icon: Server },
  { label: "Hardware Troubleshooting", Icon: Wrench },
  { label: "Database Management", Icon: Database },
  { label: "Software Projects", Icon: Laptop },
  { label: "Pentesting", Icon: Rocket },
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

            <div className="about-avatar">
              <img src="/profile.png" alt={`${profile.name} profile`} />
            </div>

            <div className="about-moon-orbit about-moon-orbit-one" aria-hidden="true">
              <span className="about-moon about-moon-one" />
            </div>
            <div className="about-moon-orbit about-moon-orbit-two" aria-hidden="true">
              <span className="about-moon about-moon-two" />
            </div>
          </div>
        </div>

        <div className="about-introduction">
          <span className="about-eyebrow">MISSION PROFILE / 001</span>

          <h1>
            Turning Ideas Into
            <span className="about-gradient"> Digital Realities.</span>
          </h1>

          <p className="about-lead">
            Hello, I'm <strong>{profile.name}</strong>. I'm an ICT graduate and now taking my degree in Information Technology.
            I have a strong passion and curiosity for technology, and I like to reverse engineer things to understand them in a deeper level.
          </p>

          <p className="about-description">
            I enjoy exploring new technologies, developing projects,
            and continuously improving my technical skills. My goal
            is to create practical solutions that actually solve real world problems. Especially in communities that needs technological support.
          </p>

          <Link className="about-cta" to="/#projects">
            Explore My Projects <ArrowRight size={17} />
          </Link>
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
            It all started with a fat screen monitor and a curious mind. I was amazed by what technology could.
            My mind was filled with questions, and I wanted to understand how things worked. This curiosity led me to explore various fields in technology, from programming to networking, and even game development. Each step of the way, I learned something new and exciting, fueling my passion for creating and innovating.
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
        <Link to="/#contact">
          <Rocket size={16} />
          LET'S CONNECT
          <ArrowRight size={15} />
        </Link>
        <span />
      </footer>
    </main>
  );
}
