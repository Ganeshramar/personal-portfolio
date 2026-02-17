import './Portfolio.css'
import { useState, useEffect, useRef, useCallback } from "react";

const skills = [
  { name: "JavaScript", icon: "⚡", level: 89, label: "Expert", tags: ["ES2024", "DOM", "Async"] },
  { name: "Angular", icon: "🅰️", level: 85, label: "Advanced", tags: ["RxJS", "NgRx", "Material"] },
  { name: "React", icon: "⚛️", level: 82, label: "Expert", tags: ["Hooks", "Redux", "Next.js"] },
  { name: "TypeScript", icon: "🔷", level: 84, label: "Advanced", tags: ["Generics", "Decorators", "Types"] },
  { name: "Node.js", icon: "🟢", level: 78, label: "Expert", tags: ["Express", "REST", "GraphQL"] },
  { name: "Databases", icon: "🗄️", level: 75, label: "Advanced", tags: ["MongoDB", "SQL",] },
];

const projects = [
  {
    num: "01",
    title: "Enterprise Angular Dashboard",
    desc: "A real-time analytics platform built with Angular 17 and NgRx state management, featuring WebSocket data streams and complex data visualizations.",
    stack: ["Angular", "TypeScript", "NgRx", "D3.js", "WebSockets"],
    link: "#"
  },
  {
    num: "02",
    title: "Node.js Microservices API",
    desc: "Scalable RESTful microservices architecture handling 50k+ requests/day with JWT auth, rate limiting, and comprehensive test coverage.",
    stack: ["Node.js", "Express", "TypeScript", "PostgreSQL", "Docker"],
    link: "#"
  },
  {
    num: "03",
    title: "React Commerce Platform",
    desc: "Full-stack e-commerce solution with server-side rendering, optimistic UI updates, and a custom design system built on React 18.",
    stack: ["React", "Next.js", "TypeScript", "Tailwind", "Prisma"],
    link: "#"
  },
  {
    num: "04",
    title: "Real-Time Collaboration Tool",
    desc: "Multiplayer document editor with operational transformation, real-time cursors, and offline-first architecture using IndexedDB.",
    stack: ["React", "Node.js", "Socket.io", "MongoDB", "TypeScript"],
    link: "#"
  },
];

const experience = [
  {
    date: "2024 — Present",
    role: "Senior Software Engineer",
    company: "EPAM",
    bullets: [
      "Integrated SAP Spartacus storefront into Angular 16+ enterprise e-commerce platform, enabling modular and scalable architecture",
      "Developed reusable and performance-optimized Angular components for dynamic storefront experiences",
      "Implemented SonarQube and ESLint rules improving code quality and maintaining high test coverage using Jasmine & Karma",
      "Built React 18-based document approval system with OnlyOffice integration for secure, role-based collaboration workflows",
      "Designed and deployed custom OnlyOffice plugins enabling contextual editing and enhanced medical document processing",
      "Collaborated with backend and DevOps teams to streamline CI/CD pipelines and production deployments"
    ]
  },
  {
    date: "2023 — 2024",
    role: "Senior Engineer Software",
    company: "Utthunga Technologies",
    bullets: [
      "Engineered Angular 15 + NgRx applications for industrial mobility solutions supporting real-time factory monitoring",
      "Designed scalable smart and presentational components with RxJS-based API integrations",
      "Optimized application performance and ensured maintainable state management architecture",
      "Collaborated with cross-functional teams and contributed to DevOps workflows and release management"
    ]
  },
  {
    date: "2021 — 2023",
    role: "Senior System Engineer",
    company: "Infosys Pvt. Ltd",
    bullets: [
      "Developed telecom ticket management system using Angular 10, improving operational tracking efficiency",
      "Designed interactive dashboards for service request monitoring and issue resolution workflows",
      "Built healthcare insurance platform using Angular 11 and Node.js REST APIs",
      "Implemented business logic enhancements and handled production change requests with minimal downtime",
      "Participated in client discussions, architecture planning, and Agile ceremonies"
    ]
  },
  {
    date: "2019 — 2021",
    role: "Software Engineer",
    company: "GoDB Tech Pvt. Ltd",
    bullets: [
      "Built enterprise insurance platforms using Angular 9/10 with NgRx state management",
      "Developed mobile applications using Ionic and integrated secure authentication mechanisms",
      "Implemented barcode scanning and dashboard analytics features for logistics applications",
      "Handled release management, UAT validation, and production support activities",
      "Designed scalable modules and optimized REST API integrations"
    ]
  }
];


// ─── PARTICLES ────────────────────────────────────────────────────────────────
function Particles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let raf;
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);

    const dots = Array.from({ length: 80 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
    }));

    function draw() {
      ctx.clearRect(0, 0, W, H);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > W) d.vx *= -1;
        if (d.y < 0 || d.y > H) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,255,229,0.25)";
        ctx.fill();
      });
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(0,255,229,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas id="particles-canvas" ref={canvasRef} />;
}

// ─── TYPEWRITER ───────────────────────────────────────────────────────────────
function Typewriter({ strings }) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[idx];
    const speed = deleting ? 40 : 80;
    const timer = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) {
          setDisplay(current.slice(0, charIdx + 1));
          setCharIdx(c => c + 1);
        } else {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        if (charIdx > 0) {
          setDisplay(current.slice(0, charIdx - 1));
          setCharIdx(c => c - 1);
        } else {
          setDeleting(false);
          setIdx(i => (i + 1) % strings.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, idx, strings]);

  return (
    <span style={{ color: "#e8eaf6" }}>
      {display}<span className="cursor-blink" />
    </span>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const skillsRef = useRef([]);
  const timelineRef = useRef([]);
  const revealRefs = useRef([]);

  // Custom cursor
  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) { cursorRef.current.style.left = e.clientX + "px"; cursorRef.current.style.top = e.clientY + "px"; }
      if (ringRef.current) { ringRef.current.style.left = e.clientX + "px"; ringRef.current.style.top = e.clientY + "px"; }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Skill bars observer
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target.querySelector(".skill-bar");
          const pct = entry.target.dataset.pct;
          if (bar) bar.style.width = pct + "%";
        }
      });
    }, { threshold: 0.3 });
    skillsRef.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Timeline observer
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add("visible"), i * 200);
        }
      });
    }, { threshold: 0.1 });
    timelineRef.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // General reveal
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    revealRefs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const addReveal = useCallback(el => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  }, []);

  return (
    <>
      {/* <style>{styles}</style> */}
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />
      <div className="grid-overlay" />
      <Particles />

      {/* NAV */}
      <nav>
        <div className="logo">&lt;<span>DEV</span>/&gt;</div>
        <div className="nav-right">
        <ul className="nav-links">
          {["About", "Skills", "Projects", "Experience", "Contact"].map(s => (
            <li key={s}><a href={`#${s.toLowerCase()}`}>{s}</a></li>
          ))}
        </ul>

        {/* 📄 Resume Download */}
        <div className="nav-links">
          <a href='./assets/resume.pdf' download="Ganesh_Ramar_Resume.pdf" className="btn-resume">
            ↓ Resume
          </a>

        </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="about" className="hero" style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="hero-eyebrow">Senior Software Engineer</div>
        <h1 className="hero-name">
          <span className="line1">Ganesh</span>
          <span className="line2 glitch" data-text="RAMAR.">RAMAR.</span>
        </h1>
        <div className="hero-role">
          <Typewriter strings={[ "Senior Frontend Developer.",
              "NgRx & Micro-Frontend Specialist.",
              "JavaScript Developer.",
              "OnlyOffice Plugin Developer.",
              "Building Enterprise-Scale Applications."]} />
        </div>
        <p className="hero-desc">
          Javascript Developer specializing in <strong>JavaScript</strong>, <strong>Angular</strong>, <strong>React</strong>,{" "}
          <strong>Node.js</strong> & <strong>TypeScript</strong>. I build systems that are fast, maintainable, and a joy to use.
        </p>
        <div className="hero-cta">
          <a href="#projects" className="btn-primary">View Work</a>
          <a href="#contact" className="btn-secondary">Get In Touch</a>
        </div>
        <div className="hero-stats">
          {[["5", "Years Experience"], ["30", "Projects Shipped"], ["4", "Team Members Led"]].map(([n, l]) => (
            <div className="stat-item" key={l}>
              <div className="num">{n}+</div>
              <div className="lbl">{l}</div>
            </div>
          ))}
        </div>

        {/* About grid below */}
        <div className="about-grid" style={{ marginTop: "6rem" }} ref={addReveal}>
          <div className="about-text reveal" ref={addReveal}>
            <p>
            I'm a <strong>Senior Software Engineer</strong> with 5+ years of experience 
            building scalable enterprise applications using Angular, React, and TypeScript.
          </p>

          <p>
            I specialize in <strong>enterprise-grade Angular architecture</strong>, 
            NgRx state management, and high-performance web applications. 
            I've delivered production systems for global clients including 
            e-commerce platforms (SAP Spartacus), telecom ticketing systems, 
            and healthcare workflows with secure document collaboration using OnlyOffice.
          </p>

          <p>
            I focus on clean architecture, modular design, performance optimization, 
            and writing code that scales — both technically and across teams. 
            I believe great software is not just functional, but maintainable, 
            testable, and built for long-term impact.
          </p>
          </div>
          <div className="about-visual reveal" ref={addReveal} style={{ transitionDelay: "0.2s" }}>
            <div className="code-block">
              <div className="code-dot-bar">
                <div className="dot dot-r" /><div className="dot dot-y" /><div className="dot dot-g" />
              </div>
              <code>
                <span className="code-line"><span className="cm">// developer.ts</span></span>
                <span className="code-line"><span className="kw">const</span> <span className="fn">ganesh</span> = {'{'}</span>
                <span className="code-line">  <span className="prop">name</span>: <span className="str">"Ganesh Ramar"</span>,</span>
                <span className="code-line">  <span className="prop">role</span>: <span className="str">"Javascript Developer"</span>,</span>
                <span className="code-line">  <span className="prop">stack</span>: [</span>
                <span className="code-line">    <span className="acc">"Angular"</span>, <span className="acc">"React"</span>,</span>
                <span className="code-line">    <span className="acc">"JavaScript"</span>, <span className="acc">"TypeScript"</span>,</span>
                <span className="code-line">    <span className="acc">"Node.js"</span>, <span className="acc">"HTML & CSS"</span>,</span>
                <span className="code-line">    <span className="acc">"OnlyOffice Plugin Development"</span></span>
                <span className="code-line">  ],</span>
                <span className="code-line">  <span className="prop">available</span>: <span className="kw">true</span>,</span>
                <span className="code-line">  <span className="prop">passion</span>: <span className="str">"Clean code 🚀"</span></span>
                <span className="code-line">{'}'}</span>
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="skills-section" style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="section-header reveal" ref={addReveal}>
          <div className="section-tag">Tech Stack</div>
          <h2 className="section-title">Skills &amp; <em>Expertise</em></h2>
        </div>
        <div className="skills-grid">
          {skills.map((s, i) => (
            <div
              className="skill-card"
              key={s.name}
              data-pct={s.level}
              ref={el => skillsRef.current[i] = el}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="skill-icon">{s.icon}</div>
              <div className="skill-name">{s.name}</div>
              <div className="skill-bar-wrap"><div className="skill-bar" /></div>
              <div className="skill-level">{s.level}% · {s.label}</div>
              <div className="skill-tags">
                {s.tags.map(t => <span className="tag" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="projects-section" style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="section-header reveal" ref={addReveal}>
          <div className="section-tag">Portfolio</div>
          <h2 className="section-title">Selected <em>Projects</em></h2>
        </div>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <div
              className="project-card reveal"
              key={p.num}
              ref={addReveal}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="project-num">Project {p.num}</div>
              <div className="project-title">{p.title}</div>
              <p className="project-desc">{p.desc}</p>
              <div className="project-stack">
                {p.stack.map(s => <span className="stack-tag" key={s}>{s}</span>)}
              </div>
              <a href={p.link} className="project-link">View Project →</a>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="experience-section" style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="section-header reveal" ref={addReveal}>
          <div className="section-tag">Career</div>
          <h2 className="section-title">Work <em>Experience</em></h2>
        </div>
        <div className="timeline">
          {experience.map((e, i) => (
            <div
              className="timeline-item"
              key={i}
              ref={el => timelineRef.current[i] = el}
            >
              <div className="timeline-dot" />
              <div className="timeline-date">{e.date}</div>
              <div className="timeline-role">{e.role}</div>
              <div className="timeline-company">{e.company}</div>
              <ul className="timeline-bullets">
                {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section" style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="section-tag reveal" ref={addReveal}>Contact</div>
        <div className="contact-big reveal" ref={addReveal}>
          Let's Build
          <span>Something.</span>
        </div>
        <p className="contact-sub reveal" ref={addReveal}>
          I'm open to senior & lead roles, freelance contracts, and interesting side projects. Let's talk.
        </p>
        <div className="contact-links reveal" ref={addReveal}>
          <a href="mailto:ganeshramar.moorthy@gmail.com?subject=Let's Work Together&body=Hi Ganesh, I'd like to discuss a project with you." className="contact-link primary">Send Email</a>
          <a href="https://www.linkedin.com/in/ganesh-ramar/" className="contact-link outline">LinkedIn</a>
          <a href="http://github.com/Ganeshramar" className="contact-link outline">GitHub</a>
        </div>
      </section>

      <footer style={{ maxWidth: 1200 }}>
        <p>© 2026 Ganesh Ramar. Built with <span>♥</span> in React.</p>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: "var(--muted)" }}>
          JS · Angular · Node.js · React · TypeScript
        </p>
      </footer>
    </>
  );
}