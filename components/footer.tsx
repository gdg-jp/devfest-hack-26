"use client";

import { useRef } from "react";
import { ArrowUp } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { ApplyButton } from "@/components/application-modal";
import { Asterisk, BlockArrow, Chain, Dots, GdgLogo, Globe, Slashes } from "@/components/brand-shapes";
import { useI18n } from "@/components/i18n-provider";
import { LanguageToggle } from "@/components/language-toggle";
import { Magnetic, MaskLines } from "@/components/motion-kit";
import { easeOut } from "@/components/motion-presets";

export function FinalCta() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rise = useTransform(scrollYProgress, [0, 1], [140, -140]);
  const sink = useTransform(scrollYProgress, [0, 1], [-90, 90]);
  const turn = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={ref} className="final-cta" id="apply">
      <div className="final-cta-shapes" aria-hidden="true">
        <motion.div className="final-shape final-slashes" style={{ y: rise, rotate: turn }}>
          <Slashes colors={["#ffffff", "#ffe7a5"]} />
        </motion.div>
        <motion.div className="final-shape final-globe" style={{ y: sink }}>
          <Globe fill="#ffffff" />
        </motion.div>
        <motion.div className="final-shape final-asterisk" style={{ y: rise }}>
          <Asterisk duration={9} />
        </motion.div>
        <motion.div className="final-shape final-chain" style={{ y: sink, rotate: turn }}>
          <Chain fill="#ccf6c5" />
        </motion.div>
        <motion.div className="final-shape final-arrow" style={{ y: rise }}>
          <BlockArrow fill="#ffe7a5" />
        </motion.div>
      </div>

      <motion.div
        className="container final-cta-inner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.p className="final-cta-kicker" variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>
          {t.finalCta.kicker}
        </motion.p>
        <h2 className="final-cta-title">
          <MaskLines lines={t.finalCta.title} />
        </h2>
        <motion.div className="final-cta-actions" variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut, delay: 0.3 } } }}>
          <Magnetic strength={0.4}>
            <ApplyButton className="btn btn-apply btn-xl">{t.common.applyLong}</ApplyButton>
          </Magnetic>
          <p className="final-cta-note">
            <span className="live-dot" aria-hidden="true" />
            {t.finalCta.note}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

const wordmarkColors = ["#4285f4", "#ea4335", "#f9ab00", "#34a853"];

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="site-footer">
      <div className="footer-colorbar" aria-hidden="true">
        <span /><span /><span /><span />
      </div>
      <div className="container footer-grid">
        <div className="footer-brand">
          <GdgLogo className="footer-logo" />
          <span>
            <b>Google Developer Groups</b>
            <small>On Campus · Japan</small>
          </span>
        </div>

        <div className="footer-event">
          <p className="footer-title">DevFest GDGoC Japan Hackathon 2026</p>
          <p className="footer-organizer">
            <span>{t.footer.organizedBy}</span> {t.footer.organizer}
          </p>
        </div>

        <nav className="footer-nav" aria-label="Footer">
          {t.nav.map((item) => (
            <motion.a key={item.id} href={`#${item.id}`} whileHover={{ x: 4 }}>
              {item.label}
            </motion.a>
          ))}
        </nav>

        <div className="footer-actions">
          <LanguageToggle tone="dark" />
          <motion.a className="footer-top" href="#top" whileHover="hover">
            {t.common.backToTop}
            <motion.span variants={{ hover: { y: -4 } }} transition={{ type: "spring", stiffness: 400, damping: 12 }}>
              <ArrowUp aria-hidden="true" />
            </motion.span>
          </motion.a>
        </div>
      </div>

      <div className="footer-wordmark" aria-hidden="true">
        {Array.from("DevFest").map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            initial={{ y: "70%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: easeOut, delay: index * 0.05 }}
            whileHover={{ color: wordmarkColors[index % wordmarkColors.length], y: "-6%", transition: { type: "spring", stiffness: 400, damping: 14 } }}
          >
            {char}
          </motion.span>
        ))}
        <Dots className="footer-wordmark-dots" bounce />
      </div>

      <div className="container footer-bottom">
        <p>{t.footer.copyright}</p>
        <p className="footer-tags">#GDGOnCampus #DevFest</p>
      </div>
    </footer>
  );
}
