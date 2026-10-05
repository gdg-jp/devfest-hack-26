"use client";

import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Dots } from "@/components/brand-shapes";
import { useI18n } from "@/components/i18n-provider";
import { easeOut } from "@/components/motion-presets";
import { SectionHeading } from "@/components/section-heading";
import { phaseDays, phaseOrder, phaseTone, type PhaseId } from "@/lib/event";

const DAYS_IN_NOVEMBER = 30;

const phaseOfDay = new Map<number, PhaseId>();
for (const id of phaseOrder) for (const day of phaseDays[id]) phaseOfDay.set(day, id);

/** The phase whose row crosses the middle band of the viewport. */
function useScrolledPhase(listRef: RefObject<HTMLOListElement | null>) {
  const [phase, setPhase] = useState<PhaseId | null>(null);

  useEffect(() => {
    const rows = listRef.current?.querySelectorAll<HTMLElement>("[data-phase]");
    if (!rows) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setPhase(entry.target.getAttribute("data-phase") as PhaseId);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, [listRef]);

  return phase;
}

export function Schedule() {
  const { t } = useI18n();
  const copy = t.schedule;
  const listRef = useRef<HTMLOListElement>(null);
  const [hovered, setHovered] = useState<PhaseId | null>(null);
  const scrolled = useScrolledPhase(listRef);
  const focus = hovered ?? scrolled;

  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });

  return (
    <section className="section schedule" id="schedule">
      <div className="container">
        <SectionHeading index="02" kicker={copy.kicker} title={copy.title} description={copy.description} />

        <div className="schedule-grid">
          <ol ref={listRef} className="phase-list" data-hovering={hovered !== null}>
            <span className="phase-track" aria-hidden="true">
              <motion.span style={{ scaleY: progress }} />
            </span>
            {phaseOrder.map((id) => {
              const phase = copy.phases[id];
              return (
                <motion.li
                  key={id}
                  data-phase={id}
                  className={`phase tone-${phaseTone[id]}${focus === id ? " is-focus" : ""}${hovered && hovered !== id ? " is-dim" : ""}`}
                  onPointerEnter={() => setHovered(id)}
                  onPointerLeave={() => setHovered(null)}
                  initial={{ opacity: 0, x: -36 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7, ease: easeOut }}
                >
                  <span className="phase-node" aria-hidden="true">
                    <motion.span animate={{ scale: focus === id ? 1 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 20 }} />
                  </span>
                  <div className="phase-date">
                    <strong>{phase.date}</strong>
                    <span>{phase.day}</span>
                  </div>
                  <div className="phase-body">
                    <span className="phase-mode">{phase.mode}</span>
                    <h3>{phase.title}</h3>
                    <p>{phase.detail}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>

          <div className="calendar-wrap">
            <motion.div
              className="calendar tab-card"
              initial={{ opacity: 0, y: 40, rotate: 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: easeOut }}
            >
              <span className="tab-card-tab">{copy.calendarTab}</span>
              <Dots className="calendar-dots" colors={["#4285f4", "#34a853", "#f9ab00"]} bounce />
              <div className="calendar-weekdays" aria-hidden="true">
                {copy.weekdays.map((day, index) => (
                  <span key={`${day}-${index}`}>{day}</span>
                ))}
              </div>
              <motion.div
                className="calendar-grid"
                aria-hidden="true"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.018, delayChildren: 0.2 } } }}
              >
                {Array.from({ length: DAYS_IN_NOVEMBER }, (_, index) => {
                  const day = index + 1;
                  const phase = phaseOfDay.get(day);
                  const continued = phase !== undefined && phaseOfDay.get(day - 1) === phase && day % 7 !== 1;
                  const classes = [
                    "cal-day",
                    phase ? `has-phase tone-${phaseTone[phase]} phase-${phase}` : "",
                    continued ? "is-continued" : "",
                    phase && focus === phase ? "is-focus" : "",
                    phase && hovered && hovered !== phase ? "is-dim" : "",
                  ].join(" ");
                  return (
                    <motion.span
                      key={day}
                      className={classes}
                      variants={{ hidden: { opacity: 0, scale: 0.4 }, visible: { opacity: 1, scale: 1 } }}
                      transition={{ type: "spring", stiffness: 320, damping: 20 }}
                      onPointerEnter={phase ? () => setHovered(phase) : undefined}
                      onPointerLeave={phase ? () => setHovered(null) : undefined}
                    >
                      <span className="cal-day-number">{day}</span>
                    </motion.span>
                  );
                })}
              </motion.div>
              <ul className="calendar-legend">
                {phaseOrder.map((id) => (
                  <li
                    key={id}
                    className={`tone-${phaseTone[id]} phase-${id}${focus === id ? " is-focus" : ""}`}
                    onPointerEnter={() => setHovered(id)}
                    onPointerLeave={() => setHovered(null)}
                  >
                    <span className="legend-swatch" aria-hidden="true" />
                    {copy.phases[id].legend}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
        <p className="schedule-note">{copy.note}</p>
      </div>
    </section>
  );
}
