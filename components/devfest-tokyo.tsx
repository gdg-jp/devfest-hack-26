"use client";

import { useRef } from "react";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Asterisk, Dots } from "@/components/brand-shapes";
import { useI18n } from "@/components/i18n-provider";
import { Magnetic, MaskLines, ScrambleText } from "@/components/motion-kit";
import { easeOut } from "@/components/motion-presets";

const eventUrl = "https://gdgs.jp/df26-tokyoh";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: easeOut } },
};

export function DevFestTokyo() {
  const { t } = useI18n();
  const copy = t.devfestTokyo;
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-35, 35]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [1, 1, 1] : [1.1, 1.03, 1.08]);
  const titleY = useTransform(scrollYProgress, [0.12, 0.55], reduceMotion ? [0, 0] : [48, -14]);
  const orbRotate = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-18, 28]);

  return (
    <section ref={ref} className="section devfest-tokyo" id="devfest-tokyo">
      <div className="tokyo-orbit tokyo-orbit-one" aria-hidden="true" />
      <div className="tokyo-orbit tokyo-orbit-two" aria-hidden="true" />

      <div className="container tokyo-intro">
        <motion.header className="tokyo-head" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}>
          <div className="tokyo-head-meta">
            <motion.span className="tokyo-index" variants={{ hidden: { opacity: 0, rotate: -18, scale: 0.7 }, visible: { opacity: 1, rotate: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 17 } } }}>07</motion.span>
            <ScrambleText className="tokyo-kicker" text={copy.kicker} />
            <motion.span className="tokyo-head-rule" aria-hidden="true" variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 1, ease: easeOut } } }} />
          </div>
          <motion.div className="tokyo-head-copy" style={{ y: titleY }}>
            <h2 className="tokyo-heading"><MaskLines lines={copy.title} delay={0.08} /></h2>
            <motion.p variants={reveal}>{copy.description}</motion.p>
          </motion.div>
        </motion.header>
      </div>

      <motion.div className="container tokyo-experience" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
        <motion.figure className="tokyo-photo" variants={{ hidden: { opacity: 0, y: 70, clipPath: "inset(12% 2% 12% 2% round 40px 40px 0 0)" }, visible: { opacity: 1, y: 0, clipPath: "inset(0%)", transition: { duration: 1.05, ease: easeOut } } }}>
          <motion.img src="/images/devfest-tokyo-2025.webp" alt={copy.photoAlt} width="2400" height="1601" loading="lazy" decoding="async" style={{ y: imageY, scale: imageScale }} />
          <div className="tokyo-photo-shade" aria-hidden="true" />

          <motion.div className="tokyo-photo-lockup" variants={{ hidden: { opacity: 0, x: -32 }, visible: { opacity: 1, x: 0, transition: { duration: 0.75, delay: 0.35, ease: easeOut } } }}>
            <span className="tokyo-photo-overline">GOOGLE DEVELOPER GROUP</span>
            <strong>DevFest<br />Tokyo</strong>
            <span className="tokyo-photo-theme">{copy.theme}</span>
          </motion.div>

          <motion.div className="tokyo-year-orb" style={{ rotate: orbRotate }} variants={{ hidden: { opacity: 0, scale: 0.35 }, visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 160, damping: 14, delay: 0.45 } } }} whileHover={{ scale: 1.08, rotate: 8 }}>
            <span>TOKYO</span>
            <strong>2026</strong>
            <Dots colors={["#4285f4", "#ea4335", "#f9ab00"]} />
          </motion.div>
          <figcaption>{copy.photoCaption}</figcaption>
        </motion.figure>

        <motion.div className="tokyo-details" variants={{ hidden: { opacity: 0, y: 42 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } } }}>
          <div className="tokyo-date-block">
            <CalendarDays aria-hidden="true" />
            <span className="tokyo-detail-label">{copy.dateLabel}</span>
            <strong>{copy.date}</strong>
            <span>{copy.day} · {copy.time}</span>
          </div>
          <div className="tokyo-place-block">
            <MapPin aria-hidden="true" />
            <span className="tokyo-detail-label">{copy.venueLabel}</span>
            <strong>{copy.venue}</strong>
            <span>{copy.access}</span>
          </div>
          <div className="tokyo-bridge-block">
            <motion.span className="tokyo-bridge-icon" aria-hidden="true" animate={reduceMotion ? undefined : { rotate: [0, 10, 0], scale: [1, 1.08, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}><Asterisk duration={12} /></motion.span>
            <span className="tokyo-detail-label">HACKATHON → DEVFEST</span>
            <strong>{copy.bridge}</strong>
            <span>{copy.admission}</span>
          </div>
          <div className="tokyo-action-block">
            <p>{copy.note}</p>
            <Magnetic strength={0.22} className="tokyo-magnetic">
              <motion.a className="btn btn-lg tokyo-link" href={eventUrl} target="_blank" rel="noopener noreferrer" aria-label={copy.linkAria} whileHover="hover" whileTap={{ scale: 0.97 }}>
                <span>{copy.link}</span>
                <motion.span className="btn-icon" variants={{ hover: { x: 3, y: -3, rotate: 8 } }} aria-hidden="true"><ArrowUpRight /></motion.span>
              </motion.a>
            </Magnetic>
          </div>
        </motion.div>

        <motion.ul className="tokyo-topics" aria-label={copy.topicsLabel} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.055, delayChildren: 0.25 } } }}>
          {copy.topics.map((topic, index) => (
            <motion.li key={topic} variants={{ hidden: { opacity: 0, y: 18, rotate: index % 2 ? 2 : -2 }, visible: { opacity: 1, y: 0, rotate: 0 } }} whileHover={{ y: -5, rotate: index % 2 ? -2 : 2 }}>
              <span aria-hidden="true">0{index + 1}</span>{topic}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
