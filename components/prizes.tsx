"use client";

import type { ReactNode } from "react";
import { Cloud, Cpu, Presentation, TrainFront, Trophy, Utensils } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { Brace, Dots, GdgLogo, Globe } from "@/components/brand-shapes";
import { useI18n } from "@/components/i18n-provider";
import { CountUp, useTilt } from "@/components/motion-kit";
import { easeOut } from "@/components/motion-presets";
import { SectionHeading } from "@/components/section-heading";
import { useMediaQuery } from "@/hooks/use-media-query";

const perkIcons = [Cpu, Trophy, Presentation, Utensils];

const confettiColors = ["#4285f4", "#ea4335", "#f9ab00", "#34a853", "#ff7daf", "#57caff"];

// Deterministic burst so server and client markup match.
const confetti = Array.from({ length: 22 }, (_, index) => {
  const angle = (index / 22) * Math.PI * 2 + (index % 3) * 0.21;
  const distance = 110 + (index % 5) * 34;
  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance * 0.75 - 40,
    rotate: (index % 2 ? 1 : -1) * (120 + index * 17),
    color: confettiColors[index % confettiColors.length],
    shape: ["dot", "bar", "square"][index % 3],
  };
});

function ConfettiBurst() {
  return (
    <span className="confetti" aria-hidden="true">
      {confetti.map((piece, index) => (
        <motion.i
          key={index}
          className={`confetti-${piece.shape}`}
          style={{ backgroundColor: piece.color }}
          variants={{
            hidden: { x: 0, y: 0, scale: 0, opacity: 0, rotate: 0 },
            visible: {
              x: [0, piece.x, piece.x * 1.08],
              y: [0, piece.y, piece.y + 120],
              scale: [0, 1, 0.8],
              opacity: [0, 1, 0],
              rotate: [0, piece.rotate, piece.rotate * 1.4],
              transition: { duration: 1.6, ease: "easeOut", times: [0, 0.4, 1], delay: 0.35 + (index % 6) * 0.02 },
            },
          }}
        />
      ))}
    </span>
  );
}

type BadgeProps = {
  role: string;
  title: string;
  note: string;
  event: string;
  date: string;
  tone: "red" | "green";
  index: number;
  draggable: boolean;
};

function LanyardBadge({ role, title, note, event, date, tone, index, draggable }: BadgeProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-140, 140], [-16, 16]);

  return (
    <motion.div
      className={`lanyard tone-${tone}`}
      initial={{ y: -220, rotate: index ? 14 : -14, opacity: 0 }}
      whileInView={{ y: 0, rotate: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ rotate: [0, index ? -3 : 3, index ? 2 : -2, 0], transition: { duration: 1.2 } }}
      transition={{ type: "spring", stiffness: 110, damping: 8, delay: 0.15 + index * 0.18 }}
    >
      <span className="lanyard-strap" aria-hidden="true" />
      <span className="lanyard-clip" aria-hidden="true" />
      <motion.div
        className="lanyard-card"
        drag={draggable}
        dragSnapToOrigin
        dragElastic={0.35}
        dragConstraints={{ left: -120, right: 120, top: -10, bottom: 60 }}
        dragTransition={{ bounceStiffness: 260, bounceDamping: 12 }}
        style={{ x, rotate }}
        whileDrag={{ cursor: "grabbing", scale: 1.03 }}
      >
        <div className="lanyard-head">
          <GdgLogo className="lanyard-logo" />
          <span>
            <b>{event}</b>
            <small>{date}</small>
          </span>
        </div>
        <div className="lanyard-inner">
          <strong>{title}</strong>
          <p>{note}</p>
        </div>
        <span className="lanyard-role">{role}</span>
        <div className="lanyard-foot" aria-hidden="true">
          <Globe className="lanyard-globe" fill="#ffffff" spin={false} />
          <Dots className="lanyard-dots" colors={tone === "red" ? ["#ea4335", "#ea4335", "#ea4335"] : ["#34a853", "#34a853", "#34a853"]} />
        </div>
      </motion.div>
    </motion.div>
  );
}

function SupportCard({ className, kicker, title, children, icon }: { className: string; kicker: string; title: string; children: ReactNode; icon: ReactNode }) {
  const tilt = useTilt(5);
  return (
    <motion.article
      className={`support-card ${className}`}
      variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } } }}
      whileHover="hover"
      {...tilt}
    >
      <motion.span className="support-icon" variants={{ hover: { rotate: -12, scale: 1.1 } }} transition={{ type: "spring", stiffness: 320, damping: 14 }}>
        {icon}
      </motion.span>
      <span className="support-kicker">{kicker}</span>
      <h3>{title}</h3>
      {children}
    </motion.article>
  );
}

export function Prizes() {
  const { t } = useI18n();
  const copy = t.prizes;
  const reduceMotion = useReducedMotion();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");

  return (
    <section className="section prizes" id="prizes">
      <div className="container">
        <SectionHeading index="04" kicker={copy.kicker} title={copy.title} description={copy.description} />

        <motion.article
          className="grand tab-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOut, staggerChildren: 0.08 } } }}
        >
          <span className="tab-card-tab">{copy.grand.tab}</span>

          <div className="grand-head">
            <span className="grand-trophy">
              <ConfettiBurst />
              <motion.span
                className="grand-trophy-icon"
                variants={{ hidden: { scale: 0, rotate: -40 }, visible: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 240, damping: 11, delay: 0.25 } } }}
                whileHover={{ rotate: [0, -12, 10, -6, 0], transition: { duration: 0.7 } }}
              >
                <Trophy aria-hidden="true" />
              </motion.span>
            </span>
            <motion.h3 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>{copy.grand.title}</motion.h3>
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>{copy.grand.lead}</motion.p>
          </div>

          <div className="grand-badges">
            <span className="lanyard-rail" aria-hidden="true" />
            {copy.grand.badges.map((badge, index) => (
              <LanyardBadge
                key={badge.role}
                {...badge}
                event={copy.grand.badgeEvent}
                date={copy.grand.badgeDate}
                tone={index === 0 ? "red" : "green"}
                index={index}
                draggable={finePointer && !reduceMotion}
              />
            ))}
          </div>

          <motion.div className="grand-perks" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.3 } } }}>
            <p className="grand-perks-title">{copy.grand.perksTitle}</p>
            <ul>
              {copy.grand.perks.map((perk, index) => {
                const Icon = perkIcons[index];
                return (
                  <motion.li key={index} variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} whileHover={{ x: 6 }}>
                    <Icon aria-hidden="true" />
                    <span>{perk}</span>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>

          <motion.aside
            className="google-callout"
            variants={{ hidden: { opacity: 0, scale: 0.94 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: easeOut, delay: 0.35 } } }}
            whileHover={{ y: -4 }}
          >
            <div className="google-callout-shapes" aria-hidden="true">
              <Brace fill="#ffffff" side="open" />
              <Dots colors={["#ffffff", "#ffe7a5", "#ffffff"]} bounce={!reduceMotion} />
              <Brace fill="#ffffff" side="close" />
            </div>
            <span className="google-callout-kicker">{copy.google.kicker}</span>
            <p className="google-callout-title">{copy.google.title}</p>
            <p className="google-callout-body">{copy.google.body}</p>
            <p className="google-callout-disclaimer">{copy.google.disclaimer}</p>
          </motion.aside>
        </motion.article>

        <motion.div
          className="support-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <SupportCard
            className="tone-green support-organizer"
            kicker={copy.organizer.kicker}
            title={copy.organizer.title}
            icon={<GdgLogo />}
          >
            <p className="support-count">
              <CountUp value={4} />
              <span>{copy.organizer.unit}</span>
            </p>
            <p>{copy.organizer.body}</p>
            <span className="support-pill">{copy.organizer.role}</span>
            <span className="mini-badges" aria-hidden="true">
              {[0, 1, 2, 3].map((badge) => (
                <motion.i
                  key={badge}
                  variants={{
                    hidden: { rotate: 0, x: 0 },
                    visible: { rotate: (badge - 1.5) * 7, x: (badge - 1.5) * 7 },
                    hover: { rotate: (badge - 1.5) * 14, x: (badge - 1.5) * 13, y: -4 },
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                />
              ))}
            </span>
          </SupportCard>

          <SupportCard className="tone-blue" kicker={copy.travel.kicker} title={copy.travel.title} icon={<TrainFront />}>
            <p>{copy.travel.body}</p>
            <small>{copy.travel.note}</small>
          </SupportCard>

          <SupportCard className="tone-white" kicker={copy.credit.kicker} title={copy.credit.title} icon={<Cloud />}>
            <p>{copy.credit.body}</p>
          </SupportCard>
        </motion.div>

        <p className="prizes-note">{copy.exhibitionNote}</p>
      </div>
    </section>
  );
}
