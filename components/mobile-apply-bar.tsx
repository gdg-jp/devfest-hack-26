"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ApplyButton } from "@/components/application-modal";
import { useI18n } from "@/components/i18n-provider";

/** Small-screen shortcut to the application once the hero CTA is out of view. */
export function MobileApplyBar() {
  const { t } = useI18n();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const finalCta = document.getElementById("apply");
    const finalTop = finalCta ? finalCta.getBoundingClientRect().top : Number.POSITIVE_INFINITY;
    setVisible(latest > window.innerHeight * 0.9 && finalTop > window.innerHeight * 0.7);
  });

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="mobile-apply"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
        >
          <p>
            <span className="live-dot" aria-hidden="true" />
            {t.common.entryUntil}
          </p>
          <ApplyButton className="btn btn-apply btn-sm">{t.common.apply}</ApplyButton>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
