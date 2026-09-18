"use client";

import { ArrowUp } from "lucide-react";
import { motion } from "motion/react";
import { ApplyButton } from "@/components/application-modal";

export function FinalCta() {
  return (
    <motion.section
      className="final-cta"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
    >
      <motion.p className="final-cta-kicker" variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}>YOUR IDEA. FIVE DAYS. ONE DEMO.</motion.p>
      <motion.h2 variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}>アイデアを、<br />動く未来に。</motion.h2>
      <ApplyButton className="final-apply-button">ハッカソンに応募する</ApplyButton>
      <div className="final-colorbar" aria-hidden="true"><span /><span /><span /><span /></div>
    </motion.section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand"><img src="/brand/gdg-lockup.svg" alt="" /><span>DevFest</span> Hackathon 2026</div>
      <p className="footer-organizer">
        <span>Organized by</span>
        <span>Google Developer Groups</span>
        <span>on Campus Japan</span>
      </p>
      <div className="footer-actions">
        <p>© 2026 DevFest Hackathon</p>
        <a href="#top" aria-label="ページ上部へ戻る">BACK TO TOP <ArrowUp aria-hidden="true" size={16} /></a>
      </div>
    </footer>
  );
}
