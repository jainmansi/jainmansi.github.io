import './App.css';
import logo from "./logo.png";
import header from "./header4.png";
import profilePic from "./profile-pic.jpeg"
import { github, linkedin, mail } from './icons';

function App() {
  return (
    <>
      <div className="nav">
        <img className='header-img' src={header} />
        <input type="checkbox" id="nav-check" />
        <div className="nav-header">
        </div>
        <div className="nav-btn">
          <label for="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#skills">Skills</a>
          <a href="#resume">Resume</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
      <section className="intro-section">
        <div className="intro-text">
          <img className="name-img" src={logo} />
          <div className="job-title">Member of Technical Staff at AMD</div>
          <div className="job-subtitle">I build full-stack applications, automate workflows, and manage distributed systems. With expertise in Python, JavaScript, and React, I'm always eager to learn more. Currently pursuing my Master of Science in AI at University of Texas at Austin.</div>
        </div>

        <img src={profilePic} className="profile-pic" />
      </section>

      <section id="skills" className="skills-section">
        <div className="section-header">Skills</div>
        <div className="skills">
          <div className="skills-row">
            <div className="skill-type">Programming Languages: &nbsp;</div>
            <div>Python, JavaScript, HTML / CSS, SQL, Ansible</div>
          </div>
          <div className="skills-row">
            <div className="skill-type">Web Technologies: &nbsp;</div>
            <div>React, Redux, Rest APIs, WebSockets</div>
          </div>
          <div className="skills-row">
            <div className="skill-type">API Frameworks: &nbsp;</div>
            <div>FastAPI, Flask, Django</div>
          </div>
          <div className="skills-row">
            <div className="skill-type">Databases: &nbsp;</div>
            <div>PostgreSQL, MongoDB, ElasticSearch</div>
          </div>
          <div className="skills-row">
            <div className="skill-type">Technologies: &nbsp;</div>
            <div>AWS, Kafka, Docker, Kubernetes, Figma</div>
          </div>
        </div>
      </section>

      <section id="resume" className="resume-section">
        <div className="section-header">Experience</div>
        <div className="resume">
          <div className="resume-card">
            <div className="chronology">
              <div className="card-header">AMD</div>
              <div className="card-date">Jun 2022 - Present</div>
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
              <div className="card-header">University of Texas at Austin</div>
              <div className="card-date">Aug 2024 - Present</div>
            </div>
            <div className="card-details">
              <div className="edu-degree">Master of Science</div>
              <div className="edu-major">Artificial Intelligence</div>
            </div>
          </div>

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
