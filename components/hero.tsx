"use client";

import type { PointerEvent, ReactNode } from "react";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ApplyButton } from "@/components/application-modal";
import { Arc, Arrow, Asterisk, Bars, Brace, Chain, Dots, Globe, Slashes } from "@/components/brand-shapes";
import { useI18n } from "@/components/i18n-provider";
import { Magnetic } from "@/components/motion-kit";
import { easeOut, spring } from "@/components/motion-presets";
import { useMediaQuery } from "@/hooks/use-media-query";

// Starts as the intro loader lifts.
const INTRO = 0.75;

const titleRows = [
  { text: "DevFest", className: "is-brand" },
  { text: "GDGoC Japan", className: "is-chapter" },
  { text: "Hackathon", className: "is-main" },
];

function TitleRow({ text, className, delay, children }: { text: string; className: string; delay: number; children?: ReactNode }) {
  return (
    <span className={`hero-title-row ${className}`} aria-hidden="true">
      <span className="mask-line">
        <motion.span
          className="mask-line-inner"
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 1.05, ease: easeOut, delay }}
        >
          {Array.from(text).map((char, index) => (
            <motion.span key={`${char}-${index}`} className="hero-char" whileHover={{ y: "-0.1em", transition: spring }}>
              {char === " " ? "\u00a0" : char}
            </motion.span>
          ))}
        </motion.span>
      </span>
      {children}
    </span>
  );
}

type ShapeConfig = {
  className: string;
  depth: number;
  delay: number;
  children: ReactNode;
};

function HeroShape({ config, pointerX, pointerY, draggable }: { config: ShapeConfig; pointerX: MotionValue<number>; pointerY: MotionValue<number>; draggable: boolean }) {
  const x = useTransform(pointerX, (value) => value * config.depth * 44);
  const y = useTransform(pointerY, (value) => value * config.depth * 44);

  return (
    <motion.div className={`hero-shape ${config.className}`} style={{ x, y }}>
      <motion.div
        initial={{ scale: 0, rotate: -35, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 190, damping: 14, delay: INTRO + config.delay }}
      >
        {/* Shapes sit still: only the asterisk and globe keep their own rotation. */}
        <motion.div
          className="hero-shape-grip"
          drag={draggable}
          dragSnapToOrigin
          dragElastic={0.55}
          whileHover={{ scale: 1.07, rotate: -4 }}
          whileDrag={{ scale: 1.14, rotate: 8, cursor: "grabbing" }}
          transition={spring}
        >
          {config.children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

const shapes: ShapeConfig[] = [
  { className: "shape-slashes", depth: 0.6, delay: 0.05, children: <Slashes colors={["#c3ecf6", "#4285f4"]} /> },
  { className: "shape-bars", depth: 0.25, delay: 0.12, children: <Bars /> },
  { className: "shape-asterisk", depth: 1, delay: 0.2, children: <Asterisk /> },
  { className: "shape-arc", depth: 0.5, delay: 0.28, children: <Arc /> },
  { className: "shape-globe", depth: 0.8, delay: 0.34, children: <Globe fill="#ccf6c5" /> },
  { className: "shape-chain", depth: 0.4, delay: 0.42, children: <Chain fill="#ffd427" /> },
];

export function Hero() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");

  const pointerX = useSpring(0, { stiffness: 70, damping: 18 });
  const pointerY = useSpring(0, { stiffness: 70, damping: 18 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const artY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

  function handlePointer(event: PointerEvent<HTMLElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section ref={ref} id="top" className="hero" onPointerMove={handlePointer}>
      <div className="container hero-grid">
        <motion.div
          className="hero-lockup"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: INTRO } } }}
        >
          <motion.span variants={{ hidden: { opacity: 0, scale: 0.6 }, visible: { opacity: 1, scale: 1 } }}>
            <Dots className="hero-lockup-dots" colors={["#4285f4", "#ea4335", "#f9ab00"]} />
          </motion.span>
          <motion.span className="hero-lockup-pill" variants={{ hidden: { opacity: 0, scaleX: 0.3 }, visible: { opacity: 1, scaleX: 1 } }}>
            {t.hero.tab}
          </motion.span>
          <motion.span className="hero-lockup-arrow" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
            <Arrow draw delay={INTRO + 0.2} />
          </motion.span>
          <motion.span className="hero-lockup-campus" variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}>
            <Brace className="hero-brace" fill="#ffffff" side="open" />
            <span>On Campus<br />Japan</span>
            <Brace className="hero-brace" fill="#ffffff" side="close" />
          </motion.span>
        </motion.div>

        <motion.div className="hero-title-wrap" style={{ y: titleY, opacity: fade }}>
          <h1 className="hero-title">
            <span className="sr-only">DevFest GDGoC Japan Hackathon 2026</span>
            {titleRows.map((row, index) => (
              <TitleRow key={row.text} text={row.text} className={row.className} delay={INTRO + 0.08 + index * 0.1}>
                {row.className === "is-chapter" ? (
                  <motion.span
                    className="hero-year"
                    initial={{ opacity: 0, scale: 0.4, rotate: -14 }}
                    animate={{ opacity: 1, scale: 1, rotate: -5 }}
                    whileHover={{ rotate: 6, scale: 1.08, transition: spring }}
                    transition={{ type: "spring", stiffness: 260, damping: 13, delay: INTRO + 0.55 }}
                  >
                    2026
                  </motion.span>
                ) : null}
              </TitleRow>
            ))}
          </h1>
        </motion.div>

        <motion.div className="hero-art" style={{ y: artY }} aria-hidden="true">
          {shapes.map((config) => (
            <HeroShape key={config.className} config={config} pointerX={pointerX} pointerY={pointerY} draggable={finePointer && !reduceMotion} />
          ))}
        </motion.div>

        <motion.div
          className="hero-intro"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: INTRO + 0.45 } } }}
        >
          <motion.p className="hero-tagline" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            {t.hero.tagline.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </motion.p>
          <motion.div className="hero-actions" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <Magnetic>
              <ApplyButton className="btn btn-apply btn-lg">{t.common.applyLong}</ApplyButton>
            </Magnetic>
            <motion.a className="btn btn-ghost" href="#schedule" whileHover="hover">
              <span className="btn-label">{t.hero.secondary}</span>
              <motion.span className="btn-icon" variants={{ hover: { y: 3 } }} aria-hidden="true">
                <ArrowDown />
              </motion.span>
            </motion.a>
          </motion.div>
          <motion.p className="hero-entry" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
            <span className="live-dot" aria-hidden="true" />
            {t.common.entryUntil}
          </motion.p>
        </motion.div>

        <motion.ol
          className="hero-dates"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: INTRO + 0.6 } } }}
        >
          <motion.span
            className="hero-dates-rail"
            aria-hidden="true"
            variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 1.1, ease: easeOut } } }}
          />
          {t.hero.keyDates.map((item, index) => (
            <motion.li
              key={index}
              className={`hero-date tone-${["blue", "green", "yellow", "red"][index]}`}
              variants={{ hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ y: -6 }}
              transition={spring}
            >
              <span className="hero-date-step">0{index + 1}</span>
              <strong>{item.date}</strong>
              <span className="hero-date-day">{item.day}</span>
              <span className="hero-date-label">{item.label}</span>
              <span className="hero-date-meta">{item.meta}</span>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
