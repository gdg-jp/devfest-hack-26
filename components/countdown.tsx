"use client";

import { useEffect, useState } from "react";

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
    <section className="countdown" aria-label="共通キックオフまでのカウントダウン">
      <div className="countdown-label">
        <span className="live-dot" />
        <p>COMMON KICKOFF STARTS IN</p>
      </div>
      <div className="countdown-grid" aria-live="polite">
        {units.map(([label, value]) => (
          <div className="countdown-unit" key={label}>
            <strong>{String(value).padStart(2, "0")}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <p className="countdown-foot">2026.11.01 / JST</p>
    </section>
  );
}
