"use client";

import { useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useI18n } from "@/components/i18n-provider";
import { easeOut } from "@/components/motion-presets";
import { milestones } from "@/lib/event";

function subscribe(onTick: () => void) {
  const timer = window.setInterval(onTick, 1_000);
  return () => window.clearInterval(timer);
}

const getSecond = () => Math.floor(Date.now() / 1_000);

// The server renders placeholders; the live clock takes over after hydration.
const getServerSecond = () => null;

function split(distance: number) {
  return [
    Math.floor(distance / 86_400),
    Math.floor((distance / 3_600) % 24),
    Math.floor((distance / 60) % 60),
    Math.floor(distance % 60),
  ];
}

function RollingDigit({ digit }: { digit: string }) {
  return (
    <span className="rolling-digit">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={digit}
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.38, ease: easeOut }}
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const tones = ["blue", "red", "yellow", "green"];

export function Countdown() {
  const { t } = useI18n();
  const copy = t.countdown;
  const now = useSyncExternalStore(subscribe, getSecond, getServerSecond);
  const next = now === null ? milestones[0] : milestones.find((milestone) => milestone.at / 1_000 > now);
  const values = now === null || !next ? null : split(next.at / 1_000 - now);
  const target = next ? copy.milestones[next.id] : null;

  return (
    <section className="countdown" aria-label={copy.label}>
      <div className="container">
        <motion.div
          className="countdown-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <div className="countdown-target">
            <p className="countdown-tag">
              <span className="live-dot" aria-hidden="true" />
              {copy.tab}
            </p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={next ? next.id : "done"}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="countdown-until">{target ? target.until : copy.done}</h2>
                {target ? <p className="countdown-when">{target.when}</p> : null}
              </motion.div>
            </AnimatePresence>
          </div>

          {next ? (
            <p className="countdown-clock">
              {copy.prefix ? <span className="countdown-prefix">{copy.prefix}</span> : null}
              {copy.units.other.map((unit, index) => {
                const value = values ? values[index] : null;
                const text = value === null ? "--" : String(value).padStart(2, "0");
                const label = value === 1 ? copy.units.one[index] : unit;
                return (
                  <motion.span
                    key={index}
                    className={`countdown-part tone-${tones[index]}`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.15 + index * 0.06 }}
                  >
                    <strong aria-hidden="true">
                      {Array.from(text).map((digit, position) => (
                        <RollingDigit key={position} digit={digit} />
                      ))}
                    </strong>
                    <span className="sr-only">{text}</span>
                    <span className="countdown-unit">{label}</span>
                  </motion.span>
                );
              })}
            </p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
