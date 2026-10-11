"use client";

import type { PointerEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { easeOut } from "@/components/motion-presets";

/**
 * Masked line reveal. Drive it with `hidden` / `visible` variants from a parent.
 * Lines are keyed by position: a text key would remount them on a language
 * switch, after a `whileInView` parent has already played, leaving them hidden.
 */
export function MaskLines({ lines, delay = 0 }: { lines: string[]; delay?: number }) {
  return (
    <>
      {lines.map((line, index) => (
        <span className="mask-line" key={index}>
          <motion.span
            className="mask-line-inner"
            variants={{
              hidden: { y: "108%" },
              visible: { y: "0%", transition: { duration: 0.9, ease: easeOut, delay: delay + index * 0.09 } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </>
  );
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]/<>*#";

/** Mono "decoder" effect, run once when the text scrolls into view and again when it changes. */
export function ScrambleText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });
  const reduceMotion = useReducedMotion();
  const [frame, setFrame] = useState<{ text: string; value: string } | null>(null);

  useEffect(() => {
    if (!isInView || reduceMotion) return;
    const total = 16;
    let step = 0;
    const timer = window.setInterval(() => {
      step += 1;
      if (step >= total) {
        window.clearInterval(timer);
        setFrame(null);
        return;
      }
      const settled = Math.floor((step / total) * text.length);
      const value = Array.from(text, (char, index) =>
        index < settled || char === " " ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      ).join("");
      setFrame({ text, value });
    }, 36);
    return () => window.clearInterval(timer);
  }, [isInView, reduceMotion, text]);

  const shown = frame && frame.text === text ? frame.value : text;

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{shown}</span>
    </span>
  );
}

/** Counts up to `value` when scrolled into view. Server HTML keeps the final value. */
export function CountUp({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });
  const reduceMotion = useReducedMotion();
  const count = useMotionValue(value);
  const rounded = useTransform(count, (latest) => Math.round(latest).toString());

  useEffect(() => {
    if (!isInView || reduceMotion) return;
    count.set(0);
    const controls = animate(count, value, { duration: 1.3, ease: easeOut });
    return () => controls.stop();
  }, [count, isInView, reduceMotion, value]);

  return (
    <motion.span ref={ref} className={className}>
      {rounded}
    </motion.span>
  );
}

/** Pulls its child toward the pointer, then springs back. */
export function Magnetic({ children, strength = 0.3, className }: { children: ReactNode; strength?: number; className?: string }) {
  const reduceMotion = useReducedMotion();
  const x = useSpring(0, { stiffness: 220, damping: 16, mass: 0.6 });
  const y = useSpring(0, { stiffness: 220, damping: 16, mass: 0.6 });

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div className={className ?? "magnetic"} style={{ x, y }} onPointerMove={handleMove} onPointerLeave={reset}>
      {children}
    </motion.div>
  );
}

/** Pointer-driven 3D tilt for cards. Spread the result onto a motion element. */
export function useTilt(max = 6) {
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 200, damping: 18 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 18 });

  return {
    style: { rotateX, rotateY, transformPerspective: 1000 },
    onPointerMove(event: PointerEvent<HTMLElement>) {
      if (reduceMotion || event.pointerType !== "mouse") return;
      const rect = event.currentTarget.getBoundingClientRect();
      rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * max * 2);
      rotateX.set(-((event.clientY - rect.top) / rect.height - 0.5) * max * 2);
    },
    onPointerLeave() {
      rotateX.set(0);
      rotateY.set(0);
    },
  };
}
