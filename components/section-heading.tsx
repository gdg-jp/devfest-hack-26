"use client";

import { motion } from "motion/react";

type SectionHeadingProps = {
  number: string;
  kicker: string;
  title: string;
  description?: string;
  light?: boolean;
};

export function SectionHeading({ number, kicker, title, description, light = false }: SectionHeadingProps) {
  return (
    <motion.header
      className={`section-heading${light ? " section-heading-light" : ""}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.09 } },
      }}
    >
      <motion.p className="section-index" variants={{ hidden: { opacity: 0, scale: 0.82 }, visible: { opacity: 1, scale: 1 } }}>{number}</motion.p>
      <motion.div variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}>
        <p className="section-kicker">{kicker}</p>
        <h2>{title}</h2>
      </motion.div>
      {description ? (
        <motion.p
          className="section-description"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          {description}
        </motion.p>
      ) : null}
    </motion.header>
  );
}
