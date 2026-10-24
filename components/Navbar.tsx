
export default function Navbar() {
  return (
    <header className="navbar">
      <a href="#home" className="navbar-logo">
        VerBytes<span>nBits</span>
      </a>

      <nav className="navbar-links" aria-label="Main navigation">
        <a href="#home">Home</a>
        <a href="#projects">Projects</a>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#github">GitHub</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}
