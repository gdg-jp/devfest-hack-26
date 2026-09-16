"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

const navItems = [
  ["About", "#about"],
  ["Timeline", "#timeline"],
  ["Locations", "#locations"],
  ["Prizes", "#prizes"],
];

export function Header() {
  return (
    <motion.header className="site-header" initial={{ y: -90 }} animate={{ y: 0 }} transition={{ duration: 0.72 }}>
      <a className="wordmark" href="#top" aria-label="DevFest Hackathon 2026 トップへ">
        <img src="/brand/gdg-lockup.svg" alt="" />
        <span className="wordmark-copy"><b>Google Developer Groups</b><small>On Campus · Japan</small></span>
      </a>
      <nav className="desktop-nav" aria-label="メインナビゲーション">
        {navItems.map(([label, href]) => (
          <motion.a key={href} href={href} whileHover={{ y: -2 }}>{label}</motion.a>
        ))}
      </nav>
      <motion.a className="header-cta" href="https://example.com" target="_blank" rel="noreferrer" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
        応募する <ArrowUpRight aria-hidden="true" size={17} />
      </motion.a>
    </motion.header>
  );
}
