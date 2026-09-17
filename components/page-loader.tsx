"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const colors = ["#4285f4", "#ea4335", "#f9ab00", "#34a853"];

export function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.dataset.loading = "true";
    // The app can hydrate after the browser's `load` event. Keep this
    // deliberately independent of that event so the intro never lingers.
    const hideTimer = window.setTimeout(() => setVisible(false), 820);

    return () => {
      window.clearTimeout(hideTimer);
      delete document.body.dataset.loading;
    };
  }, []);

  useEffect(() => {
    if (!visible) delete document.body.dataset.loading;
  }, [visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="page-loader"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ y: "-105%", borderBottomLeftRadius: "45%", borderBottomRightRadius: "45%" }}
          transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="loader-lockup">
            <p>DEVFEST HACKATHON</p>
            <strong>2026</strong>
          </div>
          <div className="loader-dots">
            {colors.map((color, index) => (
              <motion.span
                key={color}
                style={{ backgroundColor: color }}
                animate={{ y: [0, -16, 0], scale: [1, 1.08, 1] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: index * 0.11, ease: [0.45, 0, 0.55, 1] }}
              />
            ))}
          </div>
          <motion.div className="loader-rule" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }} />
          <span className="loader-caption">GOOGLE DEVELOPER GROUPS ON CAMPUS · JAPAN</span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
