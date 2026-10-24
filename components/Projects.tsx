
const projects = [
  {
    number: "01",
    title: "IT Computer Laboratory Management System",
    description:
     "A capstone project, focuses mainly in tracking and inventory. Role: Full Stack Developer build and setup frontend and backend essentials",
    stack: ["Laravel 12", "Livewire", "CSS", "Spatie", "MySQL", "Tailwind"],
    demo: "",
    github: "https://github.com/VerBytesnBits",
  },
  {
    number: "02",
    title: "Portfolio Website",
    description:
      "A responsive personal portfolio showcasing projects, technical skills, and professional experience.",
    stack: ["Next.js", "TypeScript", "CSS"],
    demo: "",
    github: "https://github.com/VerBytesnBits",
  },
  {
    number: "03",
    title: "SyncPoint Strategies",
    description:
      "A web application Role: Jr. Full Stack Web Developer, build and setup frontend and backend essentials",
    stack: ["Laravel", "PHP", "CSS","Tailwind", "Docker"],
    demo: "",
    github: "https://github.com/VerBytesnBits",
  },
];

export default function Projects() {
  return (
    <section className="section projects-section" id="projects">
      <div className="section-heading">
        <p className="eyebrow">SELECTED WORK</p>
        <h2>Projects that showcase my skills.</h2>
        <p>Some examples of the kind of work I build.</p>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.number}>
            <div className="project-top">
              <span className="project-number">{project.number}</span>
              <span className="project-icon">↗</span>
            </div>

            <h3>{project.title}</h3>
            <p>{project.description}</p>

            <div className="project-stack">
              {project.stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>

            <div className="project-links">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
              >
                Source Code ↗
              </a>

              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live Demo ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
