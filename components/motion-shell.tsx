"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

export function MotionShell({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionConfig>
  );
}
