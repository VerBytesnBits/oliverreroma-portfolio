
"use client";

import { useEffect, useState } from "react";

const names = ["VerBytesnBits", "Oliver Reroma"];

export default function Hero() {
  const [nameIndex, setNameIndex] = useState(0);
  const [displayedName, setDisplayedName] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentName = names[nameIndex];

    const timeout = setTimeout(
      () => {
        if (!deleting) {
          // Type the name one character at a time
          if (displayedName.length < currentName.length) {
            setDisplayedName(
              currentName.slice(0, displayedName.length + 1)
            );
          } else {
            // Pause when the full name is visible
            setDeleting(true);
          }
        } else {
          // Delete one character at a time
          if (displayedName.length > 0) {
            setDisplayedName(displayedName.slice(0, -1));
          } else {
            setDeleting(false);
            setNameIndex((prev) => (prev + 1) % names.length);
          }
        }
      },
      deleting
        ? 65
        : displayedName.length === currentName.length
          ? 1000
          : 120
    );

    return () => clearTimeout(timeout);
  }, [displayedName, deleting, nameIndex]);

  return (
    <section className="hero section" id="home">
      <div className="hero-content">
        <p className="eyebrow">FULL-STACK WEB DEVELOPER</p>

        <h1>
          Building digital experiences
          <span> that matter.</span>
        </h1>

        <p className="hero-description">
          Hi, I&apos;m{" "}
          <span className="typewriter-name">
            {displayedName}
            <span className="typewriter-cursor" aria-hidden="true">
              |
            </span>
          </span>
          . I build modern, responsive web applications with
          a focus on clean design, reliable functionality,
          and great user experiences.
        </p>

        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">
            Explore My Work ↗
          </a>
          <a href="#contact" className="btn btn-outline">
            Contact Me
          </a>
        </div>

        <div className="hero-socials">
          <a
            href="https://github.com/VerBytesnBits"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
          <span>Next.js · React · TypeScript</span>
        </div>
      </div>

      <div className="hero-visual" aria-hidden="true">
        <div className="hero-orb">
          <span>{"</>"}</span>
        </div>

        <div className="hero-code-card">
          <span className="code-dot purple" />
          <span className="code-dot pink" />
          <span className="code-dot blue" />
          <pre>{`const developer = {
  creative: true,
  focused: true,
  building: "the future"
};`}</pre>
        </div>
      </div>
    </section>
  );
}
