import CurrentYear from "@/components/CurrentYear";

export default function Footer() {
  return (
    <footer className="footer">
      <a href="#home" className="footer-logo">
        VerBytes<span>nBits</span>
      </a>

      <p>
        Designed and built with Next.js, TypeScript, and CSS.
      </p>

      <a
        href="https://github.com/VerBytesnBits"
        target="_blank"
        rel="noreferrer"
      >
        GitHub ↗
      </a>

      <CurrentYear />
    </footer>
  );
}
