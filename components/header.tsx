import { ArrowUpRight } from "lucide-react";

const navItems = [
  ["About", "#about"],
  ["Timeline", "#timeline"],
  ["Locations", "#locations"],
  ["Prizes", "#prizes"],
];

export function Header() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="DevFest Hackathon 2026 トップへ">
        <span className="wordmark-gdg">GDG</span>
        <span className="wordmark-slash">/</span>
        <span>DEVFEST HACK</span>
      </a>
      <nav className="desktop-nav" aria-label="メインナビゲーション">
        {navItems.map(([label, href]) => (
          <a key={href} href={href}>{label}</a>
        ))}
      </nav>
      <a className="header-cta" href="https://example.com" target="_blank" rel="noreferrer">
        参加登録 <ArrowUpRight aria-hidden="true" size={17} />
      </a>
    </header>
  );
}
