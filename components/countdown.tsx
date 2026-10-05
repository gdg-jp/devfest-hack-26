"use client";

import { useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Globe } from "@/components/brand-shapes";
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
  const now = useSyncExternalStore(subscribe, getSecond, getServerSecond);
  const next = now === null ? milestones[0] : milestones.find((milestone) => milestone.at / 1_000 > now);
  const values = now === null || !next ? null : split(next.at / 1_000 - now);
  const copy = next ? t.countdown.milestones[next.id] : null;

  return (
    <section className="countdown" aria-label={t.countdown.label}>
      <div className="container">
        <motion.div
          className="countdown-card tab-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <span className="tab-card-tab">{t.countdown.tab}</span>

          <div className="countdown-info">
            <p className="countdown-label">
              <span className="live-dot" aria-hidden="true" />
              {t.countdown.label}
            </p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={copy ? copy.title : "done"}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="countdown-title">{copy ? copy.title : t.countdown.done}</h2>
                {copy ? <p className="countdown-when">{copy.when}</p> : null}
              </motion.div>
            </AnimatePresence>
          </div>

          {next ? (
            <div className="countdown-digits">
              {t.countdown.units.map((unit, index) => {
                const text = values ? String(values[index]).padStart(2, "0") : "--";
                return (
                  <motion.div
                    key={index}
                    className={`countdown-unit tone-${tones[index]}`}
                    initial={{ opacity: 0, y: 24, rotate: index % 2 ? 3 : -3 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -6, rotate: index % 2 ? 2 : -2, transition: { type: "spring", stiffness: 320, damping: 16 } }}
                    transition={{ type: "spring", stiffness: 260, damping: 18, delay: index * 0.06 }}
                  >
                    <strong aria-hidden="true">
                      {Array.from(text).map((digit, position) => (
                        <RollingDigit key={position} digit={digit} />
                      ))}
                    </strong>
                    <span className="sr-only">{`${text} ${unit}`}</span>
                    <span className="countdown-unit-label" aria-hidden="true">{unit}</span>
                  </motion.div>
                );
              })}
              <span className="countdown-seconds" aria-hidden="true">
                <motion.span animate={{ scaleX: values ? (60 - values[3]) / 60 : 0 }} transition={{ duration: 0.9, ease: "linear" }} />
              </span>
            </div>
          ) : null}

          <Globe className="countdown-globe" fill="#c3ecf6" />
        </motion.div>
      </div>
    </section>
  );
}
