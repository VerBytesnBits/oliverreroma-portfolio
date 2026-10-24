
export default function About() {
  return (
    <section className="section about-section" id="about">
      <div className="section-heading">
        <p className="eyebrow">ABOUT ME</p>
        <h2>Turning ideas into working applications.</h2>
      </div>

      <div className="about-content">
        <div className="about-mark" aria-hidden="true">
          <span>{"{ }"}</span>
        </div>

        <div className="about-text">
          <h3>A developer who enjoys solving problems.</h3>

          <p>
            I&apos;m a web developer interested in building useful,
            accessible, and maintainable digital experiences.
            I enjoy working across the front end and back end,
            from designing user interfaces to connecting APIs
            and managing application data.
          </p>

          <p>
            My current portfolio is built with Next.js,
            TypeScript, and plain CSS. I&apos;m continually
            learning, improving my workflow, and exploring
            better ways to build for the web.
          </p>

          <a href="#contact" className="text-link">
            Let&apos;s connect →
          </a>
        </div>
      </div>
    </section>
  );
}
