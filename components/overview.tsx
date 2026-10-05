"use client";

import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import { Brace, Dots, People, Pin } from "@/components/brand-shapes";
import { useI18n } from "@/components/i18n-provider";
import { CountUp, useTilt } from "@/components/motion-kit";
import { easeOut } from "@/components/motion-presets";
import { SectionHeading } from "@/components/section-heading";

const cardMotion = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: easeOut } },
};

function BentoCard({ className, label, children, note, art }: { className: string; label: string; children: ReactNode; note: string; art?: ReactNode }) {
  const tilt = useTilt(5);
  return (
    <motion.article className={`bento-card ${className}`} variants={cardMotion} whileHover="hover" {...tilt}>
      <span className="bento-label">{label}</span>
      <div className="bento-value">{children}</div>
      <p className="bento-note">{note}</p>
      {art ? (
        <motion.div className="bento-art" aria-hidden="true" variants={{ hover: { scale: 1.08, rotate: -6 } }} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
          {art}
        </motion.div>
      ) : null}
    </motion.article>
  );
}

export function Overview() {
  const { t } = useI18n();
  const cards = t.about.cards;

  return (
    <section className="section overview" id="about">
      <div className="container">
        <SectionHeading index="01" kicker={t.about.kicker} title={t.about.title} description={t.about.description} />

        <motion.div
          className="bento"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <BentoCard className="tone-blue span-6 bento-who" label={cards.who.label} note={cards.who.note} art={<People wave fill="#ffffff" />}>
            <strong className="bento-headline">{cards.who.value}</strong>
          </BentoCard>

          <BentoCard className="tone-yellow span-3" label={cards.team.label} note={cards.team.note}>
            <strong className="bento-number">2<span className="bento-dash">–</span><CountUp value={4} /></strong>
            <span className="bento-unit">{cards.team.unit}</span>
          </BentoCard>

          <BentoCard
            className="tone-green span-3 bento-build"
            label={cards.build.label}
            note={cards.build.note}
            art={
              <span className="bento-braces">
                <Brace fill="#ffffff" side="open" />
                <Dots colors={["#34a853", "#f9ab00"]} />
                <Brace fill="#ffffff" side="close" />
              </span>
            }
          >
            <strong className="bento-headline is-compact">{cards.build.value}</strong>
          </BentoCard>

          <BentoCard className="tone-red span-3" label={cards.venues.label} note={cards.venues.note} art={<Pin fill="#ea4335" />}>
            <strong className="bento-number"><CountUp value={4} /><span className="bento-plus">+ Online</span></strong>
          </BentoCard>

          <BentoCard className="tone-white span-3" label={cards.demo.label} note={cards.demo.note}>
            <strong className="bento-number"><span className="bento-top">TOP</span><CountUp value={10} /></strong>
          </BentoCard>

          <BentoCard className="tone-core-blue span-6 bento-judges" label={cards.judges.label} note={cards.judges.note} art={<People wave fill="#ffe7a5" />}>
            <strong className="bento-headline">{cards.judges.value}</strong>
          </BentoCard>
        </motion.div>

        <motion.ul
          className="chip-row"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {t.about.chips.map((chip, index) => (
            <motion.li key={index} variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }} whileHover={{ y: -3 }}>
              <Check aria-hidden="true" />
              {chip}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
