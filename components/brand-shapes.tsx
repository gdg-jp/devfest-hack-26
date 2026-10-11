"use client";

import type { SVGProps } from "react";
import { motion, type SVGMotionProps } from "motion/react";

// Shapes from the GDG On Campus visual language: outlined in Black 02 and
// filled with the core, halftone or pastel palette.

const INK = "#1e1e1e";

type ShapeProps = { className?: string; title?: string };

function a11y(title?: string): SVGProps<SVGSVGElement> {
  return title ? { role: "img", "aria-label": title } : { "aria-hidden": true };
}

const LOGO_PIECES = [
  { fill: "#EA4335", d: "M14.4783 36.65L50.3288 10.9622C57.1681 6.06184 66.6944 7.61852 71.6071 14.4354L71.6271 14.4632C76.5395 21.2803 74.9805 30.7799 68.1414 35.6805L32.2909 61.3683C25.4516 66.2688 15.9253 64.712 11.0126 57.895L10.9926 57.8673C6.08015 51.0501 7.63895 41.5505 14.4783 36.65Z" },
  { fill: "#4285F4", d: "M10.9946 39.9696L11.0145 39.9419C15.9272 33.1249 25.4535 31.5681 32.2929 36.4686L68.1434 62.1564C74.9825 67.057 76.5414 76.5566 71.629 83.3737L71.609 83.4015C66.6964 90.2184 57.17 91.7751 50.3307 86.8747L14.4802 61.1869C7.6409 56.2864 6.08211 46.7868 10.9946 39.9696Z" },
  { fill: "#F9AB00", d: "M100.859 62.1343L136.71 36.4465C143.549 31.5462 153.075 33.1029 157.988 39.9198L158.008 39.9475C162.92 46.7646 161.361 56.2643 154.522 61.1649L118.672 86.8526C111.832 91.7532 102.306 90.1964 97.3934 83.3794L97.3735 83.3516C92.461 76.5345 94.0198 67.0349 100.859 62.1343Z" },
  { fill: "#34A853", d: "M97.3715 14.4735L97.3915 14.4458C102.304 7.62879 111.83 6.072 118.67 10.9725L154.52 36.6603C161.359 41.5609 162.918 51.0606 158.006 57.8777L157.986 57.9054C153.073 64.7223 143.547 66.279 136.708 61.3786L100.857 35.6909C94.0179 30.7903 92.4591 21.2907 97.3715 14.4735Z" },
];

// Where each capsule flies in from when the logo assembles.
const LOGO_ENTRANCE = [
  { x: -40, y: -36, rotate: -40 },
  { x: -40, y: 36, rotate: 40 },
  { x: 40, y: 36, rotate: -40 },
  { x: 40, y: -36, rotate: 40 },
];

export function GdgLogo({ className, title, assemble = false, delay = 0 }: ShapeProps & { assemble?: boolean; delay?: number }) {
  return (
    <svg className={className} viewBox="0 0 169 98" fill="none" {...a11y(title)}>
      {LOGO_PIECES.map((piece, index) => (
        <motion.path
          key={piece.fill}
          d={piece.d}
          fill={piece.fill}
          stroke={INK}
          strokeWidth={3}
          strokeMiterlimit={10}
          initial={assemble ? { opacity: 0, ...LOGO_ENTRANCE[index] } : false}
          animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: delay + index * 0.07 }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      ))}
    </svg>
  );
}

const meridianPhases = [0, Math.PI / 3, (2 * Math.PI) / 3];

function meridianFrames(phase: number) {
  return Array.from({ length: 13 }, (_, step) => Math.abs(Math.cos(phase + (step * Math.PI) / 12)) * 56);
}

export function Globe({ className, title, fill = "#ffffff", spin = true, duration = 9 }: ShapeProps & { fill?: string; spin?: boolean; duration?: number }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" {...a11y(title)}>
      <circle cx="60" cy="60" r="56" fill={fill} stroke={INK} strokeWidth="3" />
      <path d="M4 60H116M11.5 32H108.5M11.5 88H108.5" stroke={INK} strokeWidth="3" />
      {meridianPhases.map((phase) => {
        const frames = meridianFrames(phase);
        return (
          <motion.ellipse
            key={phase}
            cx="60"
            cy="60"
            ry="56"
            initial={{ rx: frames[0] }}
            animate={spin ? { rx: frames } : { rx: frames[0] }}
            transition={spin ? { duration, ease: "linear", repeat: Infinity } : undefined}
            stroke={INK}
            strokeWidth="3"
          />
        );
      })}
    </svg>
  );
}

export function Asterisk({ className, title, spin = true, duration = 14 }: ShapeProps & { spin?: boolean; duration?: number }) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      {...(a11y(title) as SVGMotionProps<SVGSVGElement>)}
      animate={spin ? { rotate: 360 } : undefined}
      transition={spin ? { duration, ease: "linear", repeat: Infinity } : undefined}
    >
      <path d="M50 6V94M6 50H94M18.9 18.9L81.1 81.1M81.1 18.9L18.9 81.1" stroke={INK} strokeWidth="4" strokeLinecap="round" />
    </motion.svg>
  );
}

export function Dots({
  className,
  title,
  colors = ["#4285f4", "#ea4335", "#f9ab00"],
  bounce = false,
}: ShapeProps & { colors?: string[]; bounce?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 128 40" fill="none" overflow="visible" {...a11y(title)}>
      {colors.map((color, index) => (
        <motion.circle
          key={`${color}-${index}`}
          cx={20 + index * 44}
          cy="20"
          r="17"
          fill={color}
          stroke={INK}
          strokeWidth="3"
          animate={bounce ? { y: [0, -9, 0] } : undefined}
          transition={bounce ? { duration: 1.6, ease: "easeInOut", repeat: Infinity, delay: index * 0.16 } : undefined}
        />
      ))}
    </svg>
  );
}

export function People({ className, title, fill = "none", wave = false }: ShapeProps & { fill?: string; wave?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 132 72" fill="none" overflow="visible" {...a11y(title)}>
      {[22, 66, 110].map((x, index) => (
        <motion.g
          key={x}
          animate={wave ? { y: [0, -6, 0] } : undefined}
          transition={wave ? { duration: 1.8, ease: "easeInOut", repeat: Infinity, delay: index * 0.2 } : undefined}
        >
          <circle cx={x} cy="18" r="13" fill={fill} stroke={INK} strokeWidth="3" />
          <path d={`M${x - 19} 68A19 19 0 0 1 ${x + 19} 68`} stroke={INK} strokeWidth="3" strokeLinecap="round" />
        </motion.g>
      ))}
    </svg>
  );
}

export function Slashes({ className, title, colors = ["#4285f4", "#ea4335"] }: ShapeProps & { colors?: [string, string] | string[] }) {
  return (
    <svg className={className} viewBox="0 0 112 120" fill="none" {...a11y(title)}>
      <path d="M36 4H64L30 116H2Z" fill={colors[0]} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M82 4H110L76 116H48Z" fill={colors[1]} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}

export function Arrow({ className, draw = false, delay = 0 }: ShapeProps & { draw?: boolean; delay?: number }) {
  return (
    <span className={`brand-arrow ${className ?? ""}`} aria-hidden="true">
      <motion.span
        className="brand-arrow-line"
        initial={draw ? { scaleX: 0 } : false}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.svg
        className="brand-arrow-head"
        viewBox="0 0 14 24"
        fill="none"
        initial={draw ? { opacity: 0, x: -24 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: delay + 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <path d="M2 2L12 12L2 22" stroke={INK} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>
    </span>
  );
}

export function BlockArrow({ className, title, fill = "#34a853" }: ShapeProps & { fill?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 110" fill="none" {...a11y(title)}>
      <path d="M35 4H65V58H92L50 106L8 58H35Z" fill={fill} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}

const BRACE_OPEN =
  "M3.83156 95.8936H10.9505C13.4732 95.8936 15.5467 97.9325 15.5467 100.49V136.361C15.5467 149.009 25.8103 159.273 38.4585 159.273H56.7741C57.7763 159.273 58.6057 158.443 58.6057 157.441V131.73C58.6057 130.728 57.7763 129.898 56.7741 129.898H42.7091C40.1864 129.898 38.1129 127.86 38.1129 125.302V35.9703C38.1129 33.4476 40.1518 31.3741 42.7091 31.3741H56.7741C57.7763 31.3741 58.6057 30.5448 58.6057 29.5426V3.83156C58.6057 2.82939 57.7763 2 56.7741 2H38.4585C25.8103 2 15.5467 12.2637 15.5467 24.9118V60.7828C15.5467 63.3056 13.5077 65.379 10.9505 65.379H3.83156C2.82939 65.379 2 66.2084 2 67.2106V94.062C2 95.0642 2.82939 95.8936 3.83156 95.8936Z";
const BRACE_CLOSE =
  "M56.7741 95.8936H49.6552C47.1325 95.8936 45.059 97.9325 45.059 100.49V136.361C45.059 149.009 34.7953 159.273 22.1472 159.273H3.83154C2.82936 159.273 2 158.443 2 157.441V131.73C2 130.728 2.82936 129.898 3.83154 129.898H17.8966C20.4193 129.898 22.4928 127.86 22.4928 125.302V35.9703C22.4928 33.4476 20.4539 31.3741 17.8966 31.3741H3.83154C2.82936 31.3741 2 30.5448 2 29.5426V3.83156C2 2.82939 2.82936 2 3.83154 2H22.1472C34.7953 2 45.059 12.2637 45.059 24.9118V60.7828C45.059 63.3056 47.0979 65.379 49.6552 65.379H56.7741C57.7763 65.379 58.6057 66.2084 58.6057 67.2106V94.062C58.6057 95.0642 57.7763 95.8936 56.7741 95.8936Z";

export function Brace({ className, title, fill = "#ccf6c5", side = "open" }: ShapeProps & { fill?: string; side?: "open" | "close" }) {
  return (
    <svg className={className} viewBox="0 0 61 162" fill="none" {...a11y(title)}>
      <path d={side === "open" ? BRACE_OPEN : BRACE_CLOSE} fill={fill} stroke={INK} strokeWidth="4" strokeMiterlimit="10" />
    </svg>
  );
}

export function Chain({ className, title, fill = "#ffd427" }: ShapeProps & { fill?: string }) {
  return (
    <svg className={className} viewBox="0 0 150 56" fill="none" {...a11y(title)}>
      {[28, 75, 122].map((x) => (
        <circle key={x} cx={x} cy="28" r="24" fill={fill} stroke={INK} strokeWidth="3" />
      ))}
    </svg>
  );
}

export function Pin({ className, title, fill = "#4285f4" }: ShapeProps & { fill?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 110" fill="none" {...a11y(title)}>
      <path d="M40 106C40 106 6 68 6 40A34 34 0 0 1 74 40C74 68 40 106 40 106Z" fill={fill} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <circle cx="40" cy="40" r="13" fill="#ffffff" stroke={INK} strokeWidth="3" />
    </svg>
  );
}

export function Capsule({ className, title, fill = "#34a853" }: ShapeProps & { fill?: string }) {
  return (
    <svg className={className} viewBox="0 0 160 64" fill="none" {...a11y(title)}>
      <rect x="2" y="2" width="156" height="60" rx="30" fill="#ffffff" stroke={INK} strokeWidth="3" />
      <rect x="2" y="2" width="76" height="60" rx="30" fill={fill} stroke={INK} strokeWidth="3" />
    </svg>
  );
}

export function Arc({ className, title, fill = "#f9ab00" }: ShapeProps & { fill?: string }) {
  return (
    <svg className={className} viewBox="0 0 72 132" fill="none" {...a11y(title)}>
      <path d="M6 4A62 62 0 0 1 6 128V98A32 32 0 0 0 6 34Z" fill={fill} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}

export function Bars({ className, title, fill = "#ffffff" }: ShapeProps & { fill?: string }) {
  return (
    <svg className={className} viewBox="0 0 132 52" fill="none" {...a11y(title)}>
      <rect x="2" y="2" width="128" height="16" rx="8" fill={fill} stroke={INK} strokeWidth="3" />
      <rect x="2" y="34" width="128" height="16" rx="8" fill={fill} stroke={INK} strokeWidth="3" />
    </svg>
  );
}
