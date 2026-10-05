"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ApplyButton } from "@/components/application-modal";
import { GdgLogo } from "@/components/brand-shapes";
import { useI18n } from "@/components/i18n-provider";
import { LanguageToggle } from "@/components/language-toggle";
import { easeInOut, easeOut } from "@/components/motion-presets";

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

// "top" is observed so the nav clears while the hero is in view.
const sectionIds = ["top", "about", "schedule", "venues", "prizes", "judging"];

export function Header() {
  const { t } = useI18n();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    if (latest > previous + 4 && latest > 320) setHidden(true);
    else if (latest < previous - 4) setHidden(false);
  });

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <a className="skip-link" href="#main">{t.common.skip}</a>
      <motion.header
        className="site-header"
        data-scrolled={scrolled || menuOpen}
        initial={{ y: -120 }}
        animate={{ y: hidden && !menuOpen ? -130 : 0 }}
        transition={{ duration: 0.5, ease: easeOut }}
      >
        <div className="header-bar">
          <a className="header-brand" href="#top" aria-label="DevFest GDGoC Japan Hackathon 2026">
            <GdgLogo className="header-logo" />
            <span className="header-brand-copy">
              <b>Google Developer Groups</b>
              <small>On Campus · Japan</small>
            </span>
          </a>

          <nav className="header-nav" aria-label="Primary">
            {t.nav.map((item) => (
              <a key={item.id} href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined}>
                {active === item.id ? (
                  <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                ) : null}
                <span className="nav-label">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <LanguageToggle className="header-lang" />
            <ApplyButton className="btn btn-apply btn-sm header-apply">{t.common.apply}</ApplyButton>
            <motion.button
              type="button"
              className="menu-button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? t.common.closeMenu : t.common.menu}
              onClick={() => setMenuOpen((open) => !open)}
              whileTap={{ scale: 0.92 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              id="mobile-menu"
              className="mobile-menu"
              initial={{ clipPath: "inset(0 0 100% 0 round 28px)" }}
              animate={{ clipPath: "inset(0 0 0% 0 round 28px)" }}
              exit={{ clipPath: "inset(0 0 100% 0 round 28px)" }}
              transition={{ duration: 0.5, ease: easeInOut }}
            >
              <motion.nav
                aria-label="Mobile"
                initial="hidden"
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
              >
                {t.nav.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                  >
                    <span className="mobile-menu-index">0{index + 1}</span>
                    {item.label}
                  </motion.a>
                ))}
              </motion.nav>
              <motion.div
                className="mobile-menu-foot"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <ApplyButton className="btn btn-apply" onOpen={() => setMenuOpen(false)}>{t.common.applyLong}</ApplyButton>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
