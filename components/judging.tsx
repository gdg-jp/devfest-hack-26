"use client";

import { HeartHandshake, Mic, PackageCheck, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Asterisk, People } from "@/components/brand-shapes";
import { useI18n } from "@/components/i18n-provider";
import { useTilt } from "@/components/motion-kit";
import { easeOut } from "@/components/motion-presets";
import { SectionHeading } from "@/components/section-heading";

const criteriaMeta = [
  { icon: Sparkles, tone: "blue", deal: { x: 120, rotate: -9 } },
  { icon: PackageCheck, tone: "green", deal: { x: 40, rotate: -3 } },
  { icon: HeartHandshake, tone: "yellow", deal: { x: -40, rotate: 3 } },
  { icon: Mic, tone: "red", deal: { x: -120, rotate: 9 } },
];

function CriterionCard({ index, title, body }: { index: number; title: string; body: string }) {
  const { icon: Icon, tone, deal } = criteriaMeta[index];
  const tilt = useTilt(7);

  return (
    <motion.li
      className={`criterion tone-${tone}`}
      variants={{
        hidden: { opacity: 0, y: 90, ...deal },
        visible: { opacity: 1, y: 0, x: 0, rotate: 0, transition: { type: "spring", stiffness: 120, damping: 17 } },
      }}
      whileHover="hover"
      {...tilt}
    >
      <span className="criterion-number" aria-hidden="true">0{index + 1}</span>
      <motion.span className="criterion-icon" variants={{ hover: { rotate: 12, scale: 1.12 } }} transition={{ type: "spring", stiffness: 320, damping: 12 }}>
        <Icon aria-hidden="true" />
      </motion.span>
      <h3>{title}</h3>
      <p>{body}</p>
      <motion.span className="criterion-bar" aria-hidden="true" variants={{ hover: { scaleX: 1 } }} initial={{ scaleX: 0.18 }} transition={{ duration: 0.4, ease: easeOut }} />
    </motion.li>
  );
}

export function Judging() {
  const { t } = useI18n();
  const copy = t.judging;

  return (
    <section className="section judging" id="judging">
      <div className="container">
        <SectionHeading index="05" kicker={copy.kicker} title={copy.title} description={copy.description} />

        <motion.ol
          className="criteria"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
        >
          {copy.criteria.map((criterion, index) => (
            <CriterionCard key={index} index={index} {...criterion} />
          ))}
        </motion.ol>

        <motion.div
          className="judges tab-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <span className="tab-card-tab">{copy.judges.kicker}</span>
          <div className="judges-art" aria-hidden="true">
            <People fill="#c3ecf6" wave />
          </div>
          <div className="judges-copy">
            <p className="judges-title">{copy.judges.title}</p>
            <p>{copy.judges.body}</p>
          </div>
          <Asterisk className="judges-asterisk" duration={10} />
        </motion.div>
      </div>
    </section>
  );
}
