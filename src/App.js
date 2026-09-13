import { useState } from 'react';

import './App.css';
import name from "./name.png";
import header from "./header4.png";
import profilePic from "./profile-pic.jpeg"
import { github, linkedin, mail, x, mapPin, substack, goodreads } from './icons';
import { Writing, Reading } from './sections';



function App() {
  const [hamburgerActive, setHamburgerActive] = useState(false);


  function handleHamburgerClick() {
    setHamburgerActive(!hamburgerActive);
    console.log(hamburgerActive)
  }

  return (
    <>
      <div className="nav">
        <img className='header-img' src={header} />
        <div className="nav-header">
        </div>
        <div className={`hamburger ${hamburgerActive ? "active" : ""}`} onClick={() => handleHamburgerClick()}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <div className={`nav-links ${hamburgerActive ? "active" : ""}`}>
          <a className="nav-link" onClick={() => setHamburgerActive(false)} href="#">Home</a>
          <a className="nav-link" onClick={() => setHamburgerActive(false)} href="#skills">Skills</a>
          <a className="nav-link" onClick={() => setHamburgerActive(false)} href="#resume">Resume</a>
          <a className="nav-link" onClick={() => setHamburgerActive(false)} href="#writing">Writing</a>
          <a className="nav-link" onClick={() => setHamburgerActive(false)} href="#reading">Reading</a>
          <a className="nav-link" onClick={() => setHamburgerActive(false)} href="#contact">Contact</a>
        </div>
      </div>
      <section className="intro-section">
        <div className="intro-text">
          <img className="name-img" src={name} />
          <div className="job-title">Engineering at Meta |{mapPin}San Francisco</div>
          <div className="job-subtitle">
            Senior Software Engineer at Meta, working on agentic AI infrastructure. Previously Staff at AMD. I like building systems other people end up depending on.
            <br />Off the clock: <a href="https://jainmansi.substack.com">writing</a>, <a href="https://www.goodreads.com/user/show/142953896-mansi-jain" target="_blank" rel="noreferer">reading</a>, tennis, and play ping-pong.
          </div>
        </div>

        <img src={profilePic} className="profile-pic" />
      </section>

      <section id="skills" className="skills-section">
        <div className="section-header">Skills</div>
        <div className="skills">
          {[
            ["Programming Languages", ["Python", "JavaScript", "Hack", "HTML / CSS", "SQL", "Ansible"]],
            ["Web Technologies", ["React", "Redux", "Rest APIs", "WebSockets"]],
            ["API Frameworks", ["FastAPI", "Flask", "Django"]],
            ["Databases", ["PostgreSQL", "MongoDB", "ElasticSearch"]],
            ["Technologies", ["AWS", "Kafka", "Docker", "Kubernetes", "Figma"]],
          ].map(([type, items]) => (
            <div className="skills-row" key={type}>
              <div className="skill-type">{type}: &nbsp;</div>
              <div>
                {items.map((s) => (
                  <span className="skill-pill" key={s}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="resume" className="resume-section">
        <div className="section-header">Experience</div>
        <div className="resume">
          <div className="resume-card">
            <div className="chronology">
              <div className="card-header">Meta</div>
              <div className="card-date">Aug 2025 - Present</div>
            </div>
            <div className="card-details">
              <div className="resume-job-title">Senior Software Engineer</div>
            </div>
          </div>
          <div className="resume-card">
            <div className="chronology">
              <div className="card-header">AMD</div>
              <div className="card-date">Jun 2022 - Aug 2025</div>
            </div>
            <div className="card-details">
              <div className="resume-job-title">Member of Technical Staff</div>
            </div>
          </div>

          <div className="resume-card">
            <div className="chronology">
              <div className="card-header">AMD</div>
              <div className="card-date">Mar 2020 - Jun 2022</div>
            </div>
            <div className="card-details">
              <div className="resume-job-title">Senior Software Engineer</div>
            </div>
          </div>

          <div className="resume-card">
            <div className="chronology">
              <div className="card-header">Cirrus Logic</div>
              <div className="card-date">Oct 2017 - Mar 2020</div>
            </div>
            <div className="card-details">
              <div className="resume-job-title">Software Engineer</div>
            </div>
          </div>

          <div className="resume-card">
            <div className="chronology">
              <div className="card-header">Ericsson</div>
              <div className="card-date">May 2016 - Dec 2016</div>
            </div>
            <div className="card-details">
              <div className="resume-job-title">Software Engineer Intern</div>
            </div>
          </div>

          <div className="section-header">Education</div>

          <div className="resume-card">
            <div className="chronology">
              <div className="card-header">Northeastern University</div>
              <div className="card-date">Jul 2015 - Aug 2017</div>
            </div>
            <div className="card-details">
              <div className="edu-degree">Master of Science</div>
              <div className="edu-major">Information Systems</div>
            </div>
          </div>

          <div className="resume-card">
            <div className="chronology">
              <div className="card-header">National Institute of Technology, Raipur</div>
              <div className="card-date">Jul 2011 - May 2015</div>
            </div>
            <div className="card-details">
              <div className="edu-degree">Bachelor of Technology</div>
              <div className="edu-major">Information Technology</div>
            </div>
          </div>

        </div>
      </section>

      <Writing />

      <Reading />

      <section id="contact" className="contact-section">
        <div className="section-header">Let's get in touch</div>
        <div className="contact-details">
          <div className="contact-icons">
            <a href="https://github.com/jainmansi" rel="noreferrer" target="_blank">
              {github}
            </a>
            <a href="https://www.linkedin.com/in/mansijain9/" rel="noreferrer" target="_blank">
              {linkedin}
            </a>
            <a href="https://x.com/mansijain_" rel="noreferrer" target="_blank">
              {x}
            </a>
            <a href="https://jainmansi.substack.com" rel="noreferrer" target="_blank">
              {substack}
            </a>
            <a href="https://www.goodreads.com/user/show/142953896-mansi-jain" rel="noreferrer" target="_blank">
              {goodreads}
            </a>
            <a href="mailto:mansijain.nitrr@gmail.com">
              {mail}
            </a>
          </div>
        </div>
      </section>
      <footer>
        &copy; 2024 by Mansi Jain
      </footer>
    </>

  );
}

export default App;
