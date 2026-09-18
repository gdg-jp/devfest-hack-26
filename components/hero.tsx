"use client";

import { ArrowDown, Braces } from "lucide-react";
import { motion } from "motion/react";
import { cardHover, cardTransition } from "@/components/motion-presets";
import { ApplyButton } from "@/components/application-modal";

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <motion.div
          className="hero-topline"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <span>GOOGLE DEVELOPER GROUPS ON CAMPUS · JAPAN</span>
          <strong>01 / 04 — OPEN CALL</strong>
        </motion.div>

        <motion.div
          className="hero-logo-field"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.12, duration: 0.72 }}
          whileHover={{ scale: 1.01, transition: { duration: 0.45 } }}
        >
          <div className="hero-logo-field-meta">
            <span>DEVFEST HACKATHON 2026</span>
            <span>BUILD / SHARE / GROW</span>
          </div>
          <img className="hero-event-logo" src="/brand/devfest-hackathon-logo.png" alt="DevFest Hackathon 2026" />
          <div className="hero-logo-field-meta hero-logo-field-meta--bottom">
            <strong>5 DAYS</strong>
            <span>Regional Round → Demo Day</span>
          </div>
        </motion.div>

        <motion.div
          className="hero-copy-block"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } } }}
        >
          <motion.div className="hero-year-row" variants={item}>
            <strong>2026</strong>
            <p>つくる5日間。<br />つながる、その先へ。</p>
          </motion.div>
          <motion.div className="hero-actions" variants={item}>
            <ApplyButton className="primary-cta" >ハッカソンに応募する</ApplyButton>
            <a className="scroll-link" href="#about">開催概要を見る <ArrowDown aria-hidden="true" size={18} /></a>
          </motion.div>
        </motion.div>

        <motion.div className="hero-side-rail" initial={{ opacity: 0, x: 42 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.42, duration: 0.78 }}>
          <motion.aside className="hero-info-panel motion-card" whileHover={{ ...cardHover, transition: cardTransition }}>
          <div className="hero-info-heading">
            <Braces aria-hidden="true" />
            <div><span>EVENT DATA</span><small>AT A GLANCE</small></div>
          </div>

          <div className="hero-main-date">
            <p>REGIONAL ROUND</p>
            <strong><small>NOV.</small> 02—14</strong>
            <span>会場ごとに、この期間内の連続5日間で開催</span>
          </div>

          <div className="hero-date-pair">
            <div><span>COMMON KICKOFF</span><strong>11.01</strong><small>ONLINE</small></div>
            <div><span>DEMO DAY</span><strong>11.27</strong><small>PM · SHIBUYA</small></div>
          </div>

          <ul className="hero-facts" aria-label="イベントの要点">
            {['18歳以上の学生対象', '全国5地域 + オンライン', 'Google Cloud / Gemini'].map((fact) => (
              <motion.li key={fact} whileHover={{ y: -3, backgroundColor: "#ffe7a5" }} transition={cardTransition}>{fact}</motion.li>
            ))}
          </ul>
          </motion.aside>

          <motion.div
          className="hero-brand-lockup motion-card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78 }}
          whileHover={{ y: -5, transition: cardTransition }}
        >
          <img src="/brand/gdg-lockup.svg" alt="Google Developer Groups" />
          <span><b>Google Developer Groups</b><small>On Campus · Japan</small></span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
