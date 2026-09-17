"use client";

import { ArrowUp, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

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
      <motion.h2 variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}>そのアイデアを、<br />動く未来に。</motion.h2>
      <motion.a href="https://example.com" target="_blank" rel="noreferrer" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}>
        <span>ハッカソンに応募する</span>
        <ArrowUpRight aria-hidden="true" size={30} />
      </motion.a>
      <motion.p className="final-cta-note" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>応募ページは準備中です。公開後、外部サイトへ移動します。</motion.p>
      <div className="final-colorbar" aria-hidden="true"><span /><span /><span /><span /></div>
    </motion.section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand"><img src="/brand/gdg-lockup.svg" alt="" /><span>DevFest</span> Hackathon 2026</div>
      <p className="footer-organizer">Organized by Google Developer Groups on Campus Japan</p>
      <div className="footer-actions">
        <p>© 2026 DevFest Hackathon</p>
        <a href="#top" aria-label="ページ上部へ戻る">BACK TO TOP <ArrowUp aria-hidden="true" size={16} /></a>
      </div>
    </footer>
  );
}
