"use client";

import { motion } from "motion/react";
import { ApplyButton } from "@/components/application-modal";

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
      <ApplyButton className="header-cta" />
    </motion.header>
  );
}
