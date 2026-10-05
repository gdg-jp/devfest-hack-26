"use client";

import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { dictionaries, localePath, type Dictionary, type Locale } from "@/lib/i18n";

type I18nValue = {
  locale: Locale;
  t: Dictionary;
  switchLocale: (next: Locale) => void;
};

const I18nContext = createContext<I18nValue | null>(null);

const wipeBars = ["var(--blue)", "var(--red)", "var(--yellow)", "var(--green)"];

export function I18nProvider({ initialLocale, children }: { initialLocale: Locale; children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [pending, setPending] = useState<Locale | null>(null);
  const reduceMotion = useReducedMotion();

  // The root layout is shared by both locales, so the document-level language
  // and title are synchronised from here.
  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = dictionaries[locale].meta.title;
  }, [locale]);

  const commit = useCallback((next: Locale) => {
    setLocale(next);
    const { search, hash } = window.location;
    window.history.replaceState(window.history.state, "", `${localePath[next]}${search}${hash}`);
  }, []);

  const switchLocale = useCallback(
    (next: Locale) => {
      if (next === locale || pending) return;
      if (reduceMotion) {
        commit(next);
        return;
      }
      setPending(next);
    },
    [commit, locale, pending, reduceMotion],
  );

  const value = useMemo(() => ({ locale, t: dictionaries[locale], switchLocale }), [locale, switchLocale]);

  return (
    <I18nContext.Provider value={value}>
      <div lang={locale} className="locale-root">
        {children}
      </div>
      <AnimatePresence>
        {pending ? (
          <motion.div key="locale-wipe" className="locale-wipe" aria-hidden="true">
            {wipeBars.map((color, index) => (
              <motion.span
                key={color}
                style={{ backgroundColor: color }}
                initial={{ scaleY: 0, originY: 1 }}
                animate={{ scaleY: 1, originY: 1 }}
                exit={{ scaleY: 0, originY: 0, transition: { duration: 0.34, delay: index * 0.05, ease: [0.76, 0, 0.24, 1] } }}
                transition={{ duration: 0.32, delay: index * 0.05, ease: [0.76, 0, 0.24, 1] }}
                onAnimationComplete={(definition) => {
                  // Swap the copy once the last bar has fully covered the page,
                  // never on the exit animation that reveals it again.
                  const covered = (definition as { scaleY?: number }).scaleY === 1;
                  if (!covered || index !== wipeBars.length - 1 || !pending) return;
                  commit(pending);
                  setPending(null);
                }}
              />
            ))}
            <motion.p
              className="locale-wipe-label"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, delay: 0.12 }}
            >
              {pending === "en" ? "English" : "日本語"}
            </motion.p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used inside I18nProvider");
  return context;
}
