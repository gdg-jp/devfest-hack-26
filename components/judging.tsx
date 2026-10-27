"use client";

import { ArrowRight, HeartHandshake, Mic, PackageCheck, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { People } from "@/components/brand-shapes";
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

function JudgingFlow() {
  const { t } = useI18n();
  const flow = t.judging.flow;
  const last = flow.stages.length - 1;

  return (
    <motion.div
      className="judge-flow tab-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: easeOut }}
    >
      <span className="tab-card-tab">{flow.kicker}</span>
      <ol className="judge-flow-steps">
        {flow.stages.map((stage, index) => (
          <li key={index} className={`judge-stage${index === last ? " is-final" : ""}`}>
            {index > 0 ? (
              <span className="judge-stage-arrow" aria-hidden="true">
                <ArrowRight />
              </span>
            ) : null}
            {index === last ? (
              <span className="judge-stage-art" aria-hidden="true">
                <People fill="#c3ecf6" wave />
              </span>
            ) : null}
            <span className="judge-stage-step">{stage.step}</span>
            <p className="judge-stage-title">{stage.title}</p>
            <p className="judge-stage-who">{stage.who}</p>
            <p className="judge-stage-body">{stage.body}</p>
          </li>
        ))}
      </ol>
    </motion.div>
  );
}

export function Judging() {
  const { t } = useI18n();
  const copy = t.judging;

  return (
    <section className="section judging" id="judging">
      <div className="container">
        <SectionHeading index="06" kicker={copy.kicker} title={copy.title} description={copy.description} />

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

        <JudgingFlow />
      </div>
    </section>
  );
}
