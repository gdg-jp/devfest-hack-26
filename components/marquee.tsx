"use client";

import { Fragment, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { useI18n } from "@/components/i18n-provider";

const separators = ["#4285f4", "#ea4335", "#f9ab00", "#34a853"];

function Track({ items, baseVelocity, className, decorative = false }: { items: string[]; baseVelocity: number; className: string; decorative?: boolean }) {
  const reduceMotion = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (value) => `${wrap(-25, -50, value)}%`);
  const direction = useRef(1);

  // Scrolling speeds the band up and flips it with the scroll direction.
  useAnimationFrame((_, delta) => {
    if (reduceMotion) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const factor = velocityFactor.get();
    if (factor < 0) direction.current = -1;
    else if (factor > 0) direction.current = 1;
    moveBy += direction.current * moveBy * factor;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={`marquee-band ${className}`} aria-hidden={decorative || undefined}>
      <motion.div className="marquee-track" style={{ x }}>
        {Array.from({ length: 4 }, (_, copy) => (
          <span className="marquee-group" key={copy} aria-hidden={copy > 0 ? true : undefined}>
            {items.map((item, index) => (
              <Fragment key={item}>
                <span className="marquee-item">{item}</span>
                <span className="marquee-sep" style={{ backgroundColor: separators[index % separators.length] }} />
              </Fragment>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function Marquee() {
  const { t } = useI18n();
  return (
    <section className="marquee" aria-label="DevFest GDGoC Japan Hackathon 2026">
      <Track items={t.marquee} baseVelocity={-2.2} className="marquee-ink" />
      <Track items={[...t.marquee].reverse()} baseVelocity={2.2} className="marquee-yellow" decorative />
    </section>
  );
}
