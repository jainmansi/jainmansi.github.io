import { useState } from 'react';

import './App.css';
import logo from "./logo.png";
import profilePic from "./profile-pic.jpeg";
import { github, linkedin, mail, x, mapPin } from './icons';
import { Writing, Reading } from './sections';

const SKILLS = [
  ["Languages", ["Python", "JavaScript", "Hack", "SQL", "HTML / CSS", "Ansible"]],
  ["Web", ["React", "Redux", "REST", "WebSockets"]],
  ["Backend", ["FastAPI", "Flask", "Django"]],
  ["Data", ["PostgreSQL", "MongoDB", "ElasticSearch"]],
  ["Infra", ["AWS", "Kafka", "Docker", "Kubernetes"]],
];

const EXPERIENCE = [
  { org: "Meta", role: "Senior Software Engineer", date: "2025 — Now" },
  { org: "AMD", role: "Member of Technical Staff", date: "2022 — 2025" },
  { org: "AMD", role: "Senior Software Engineer", date: "2020 — 2022" },
  { org: "Cirrus Logic", role: "Software Engineer", date: "2017 — 2020" },
  { org: "Ericsson", role: "Software Engineer Intern", date: "2016" },
];

const EDUCATION = [
  { org: "Northeastern University", role: "M.S., Information Systems", date: "2015 — 2017" },
  { org: "NIT Raipur", role: "B.Tech, Information Technology", date: "2011 — 2015" },
];

export function MagHead({ title, id }) {
  return (
    <div className="mag-head" id={id}>
      <h2 className="mag-title">{title}</h2>
      <span className="mag-rule" />
    </div>
  );
}

function Timeline({ items }) {
  return (
    <div className="timeline">
      {items.map((it, i) => (
        <div className="tl-row" key={`${it.org}-${i}`}>
          <div className="tl-date">{it.date}</div>
          <div className="tl-marker" aria-hidden="true" />
          <div className="tl-content">
            <div className="tl-role">{it.role}</div>
            <div className="tl-org">{it.org}{it.note && <span className="tl-note"> — {it.note}</span>}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
    <>
      <header className="masthead">
        <a href="#top" className="wordmark" onClick={close}>
          <img className="brand-mark" src={logo} alt="" />
          <span>Mansi Jain</span>
        </a>
        <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span className="bar" /><span className="bar" /><span className="bar" />
        </div>
        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <a className="nav-link" onClick={close} href="#skills">Skills</a>
          <a className="nav-link" onClick={close} href="#work">Work</a>
          <a className="nav-link" onClick={close} href="#writing">Writing</a>
          <a className="nav-link" onClick={close} href="#reading">Reading</a>
          <a className="nav-link" onClick={close} href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        {/* ---- hero ---- */}
        <section className="hero">
          <div className="hero-text">
            <div className="eyebrow">The internet home of</div>
            <h1 className="hero-name">Mansi Jain</h1>
            <div className="hero-meta">
              Engineering at Meta <span className="dot">·</span>{mapPin}San Francisco
            </div>
            <p className="hero-bio">
              I work on agentic AI infrastructure at Meta, and was previously Staff at AMD.
              I like building the kind of systems other people end up depending on. Off the clock, I'm usually{' '}
              <a href="https://jainmansi.substack.com" target="_blank" rel="noreferrer">writing</a>,{' '}
              <a href="https://www.goodreads.com/user/show/142953896-mansi-jain" target="_blank" rel="noreferrer">reading</a>,
              on the tennis court, or at the ping-pong table.
            </p>
          </div>

          <div className="hero-figure">
            <img src={profilePic} className="hero-photo" alt="Mansi Jain" />
          </div>
        </section>

        {/* ---- 01 skills ---- */}
        <section id="skills" className="toolkit" aria-label="Skills">
          <MagHead title="Skills" />
          <div className="toolkit-grid">
            {SKILLS.map(([label, items]) => (
              <div className="toolkit-col" key={label}>
                <div className="toolkit-label">{label}</div>
                <ul className="toolkit-list">
                  {items.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ---- 02 experience ---- */}
        <section id="work" className="section">
          <MagHead title="Experience" />
          <Timeline items={EXPERIENCE} />
          <div className="sub-rule">Education</div>
          <Timeline items={EDUCATION} />
        </section>

        {/* ---- 02 writing ---- */}
        <Writing />

        {/* ---- 03 reading ---- */}
        <Reading />

        {/* ---- contact ---- */}
        <section id="contact" className="contact">
          <div className="eyebrow">Say hello</div>
          <h2 className="contact-head">Let's build something worth depending on.</h2>
          <div className="contact-icons">
            <a href="https://github.com/jainmansi" rel="noreferrer" target="_blank" aria-label="GitHub">{github}</a>
            <a href="https://www.linkedin.com/in/mansijain9/" rel="noreferrer" target="_blank" aria-label="LinkedIn">{linkedin}</a>
            <a href="https://x.com/mansijain_" rel="noreferrer" target="_blank" aria-label="X">{x}</a>
            <a href="mailto:mansijain.nitrr@gmail.com" aria-label="Email">{mail}</a>
          </div>
        </section>
      </main>

      <footer>
        <span>&copy; {new Date().getFullYear()} Mansi Jain</span>
        <span className="footer-note">Built with React · Writing &amp; reading pulled live from Substack &amp; Goodreads</span>
      </footer>
    </>
  );
}

export default App;
