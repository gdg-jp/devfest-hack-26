"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const EVENT_START = new Date("2026-11-01T00:00:00+09:00").getTime();

function getRemaining() {
  const distance = Math.max(0, EVENT_START - Date.now());
  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1_000) % 60),
  };
}

export function Countdown() {
  const [remaining, setRemaining] = useState(getRemaining);

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(getRemaining()), 1_000);
    return () => window.clearInterval(timer);
  }, []);

  const units = [
    ["DAYS", remaining.days],
    ["HRS", remaining.hours],
    ["MIN", remaining.minutes],
    ["SEC", remaining.seconds],
  ];

  return (
    <motion.section
      className="countdown"
      aria-label="共通キックオフまでのカウントダウン"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.72 }}
    >
      <div className="countdown-inner">
        <div className="countdown-head">
          <motion.div className="countdown-label" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.82 }}>
            <span className="live-dot" />
            <div><p>COMMON KICKOFF STARTS IN</p><small>共通キックオフまで</small></div>
          </motion.div>
          <motion.p className="countdown-foot" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.82 }}>2026.11.01 / JST</motion.p>
        </div>
        <motion.div className="countdown-grid motion-card" aria-live="polite" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.88 }} whileHover={{ y: -6 }}>
          {units.map(([label, value], index) => (
            <motion.div
              className="countdown-unit"
              key={label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ backgroundColor: ["#c3ecf6", "#f8d8d8", "#ffe7a5", "#ccf6c5"][index], scale: 1.025, transition: { duration: 0.2, delay: 0 } }}
              transition={{ delay: 0.92 + index * 0.06 }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.strong
                  key={value}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                >
                  {String(value).padStart(2, "0")}
                </motion.strong>
              </AnimatePresence>
              <span>{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
