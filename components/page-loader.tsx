"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { GdgLogo } from "@/components/brand-shapes";
import { easeInOut, easeOut } from "@/components/motion-presets";

export function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // The app can hydrate after the browser's `load` event, so the intro is
    // timed from hydration rather than waiting for that event.
    const timer = window.setTimeout(() => setVisible(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="page-loader"
          aria-hidden="true"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.75, ease: easeInOut }}
        >
          <GdgLogo className="loader-logo" assemble />
          <motion.p
            className="loader-title"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ delay: 0.3, duration: 0.5, ease: easeOut }}
          >
            DevFest GDGoC Japan Hackathon 2026
          </motion.p>
          <span className="loader-bars">
            {["#4285f4", "#ea4335", "#f9ab00", "#34a853"].map((color, index) => (
              <motion.span
                key={color}
                style={{ backgroundColor: color }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.1, ease: easeOut }}
              />
            ))}
          </span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
