"use client";

import { motion } from "motion/react";
import { MaskLines, ScrambleText } from "@/components/motion-kit";
import { easeOut } from "@/components/motion-presets";

type SectionHeadingProps = {
  index: string;
  kicker: string;
  title: string[];
  description?: string;
};

export function SectionHeading({ index, kicker, title, description }: SectionHeadingProps) {
  return (
    <motion.header
      className="sec-head"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      <div className="sec-head-meta">
        <motion.span
          className="sec-index"
          variants={{ hidden: { opacity: 0, scale: 0.5, rotate: -20 }, visible: { opacity: 1, scale: 1, rotate: 0 } }}
          transition={{ type: "spring", stiffness: 300, damping: 16 }}
        >
          {index}
        </motion.span>
        <ScrambleText className="sec-kicker" text={kicker} />
        <motion.span
          className="sec-rule"
          aria-hidden="true"
          variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 1.1, ease: easeOut } } }}
        />
      </div>
      <h2 className="sec-title">
        <MaskLines lines={title} delay={0.1} />
      </h2>
      {description ? (
        <motion.p
          className="sec-desc"
          variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut, delay: 0.3 } } }}
        >
          {description}
        </motion.p>
      ) : null}
    </motion.header>
  );
}
