
const skillGroups = [
  {
    title: "Frontend",
    description: "Building user interfaces",
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "TypeScript"],
  },
  {
    title: "Backend",
    description: "Application logic and APIs",
    skills: ["Node.js", "REST APIs", "Authentication", "Spatie RBAC","Laravel", "PHP"],
  },
  {
    title: "Database",
    description: "Storing and managing data",
    skills: ["MySQL",],
  },
  {
    title: "Tools",
    description: "Development workflow",
    skills: ["Git", "GitHub", "VS Code", "npm", "Docker"],
  },
];

export default function Skills() {
  return (
    <section className="section skills-section" id="skills">
      <div className="section-heading">
        <p className="eyebrow">MY TOOLKIT</p>
        <h2>Technologies I work with.</h2>
        <p>A growing toolkit for building full-stack applications.</p>
      </div>

      <div className="skills-grid">
        {skillGroups.map((group) => (
          <article className="skill-card" key={group.title}>
            <div className="skill-card-icon">
              {"</>"}
            </div>

            <h3>{group.title}</h3>
            <p>{group.description}</p>

            <div className="skill-tags">
              {group.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
