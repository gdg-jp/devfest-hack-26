"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import { ArrowUpRight, Check, X } from "lucide-react";
import { motion } from "motion/react";
import { Dots } from "@/components/brand-shapes";
import { useI18n } from "@/components/i18n-provider";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { APPLICATION_URL } from "@/lib/event";

type ApplicationModalContextValue = {
  open: () => void;
};

const ApplicationModalContext = createContext<ApplicationModalContextValue | null>(null);

export function ApplicationModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ApplicationModalContext.Provider value={{ open: () => setIsOpen(true) }}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {children}
        <ApplicationModalContent />
      </Dialog>
    </ApplicationModalContext.Provider>
  );
}

export function ApplyButton({
  children,
  className,
  onOpen,
}: {
  children?: ReactNode;
  className?: string;
  onOpen?: () => void;
}) {
  const context = useContext(ApplicationModalContext);
  const { t } = useI18n();

  if (!context) {
    throw new Error("ApplyButton must be used inside ApplicationModalProvider");
  }

  return (
    <motion.button
      type="button"
      className={className}
      aria-haspopup="dialog"
      onClick={() => {
        onOpen?.();
        context.open();
      }}
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
    >
      <span className="btn-label">{children ?? t.common.apply}</span>
      <motion.span
        className="btn-icon"
        variants={{ hover: { rotate: 45 } }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
        aria-hidden="true"
      >
        <ArrowUpRight />
      </motion.span>
    </motion.button>
  );
}

const listMotion = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
};

const itemMotion = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0 },
};

function ApplicationModalContent() {
  const { t } = useI18n();
  const copy = t.modal;

  return (
    <DialogContent className="application-dialog" showCloseButton={false}>
      <div className="application-dialog-bar" aria-hidden="true">
        <span /><span /><span /><span />
      </div>
      <DialogClose className="application-dialog-close" aria-label={copy.close}>
        <X aria-hidden="true" size={20} />
      </DialogClose>
      <DialogHeader className="application-dialog-header">
        <Dots className="application-dialog-dots" bounce />
        <p className="application-dialog-kicker">{copy.kicker}</p>
        <DialogTitle>{copy.title}</DialogTitle>
        <DialogDescription>{copy.description}</DialogDescription>
      </DialogHeader>
      <div className="application-dialog-scroll">
        <section aria-labelledby="application-eligibility-title">
          <h3 id="application-eligibility-title">{copy.sectionTitle}</h3>
          <motion.ul initial="hidden" animate="visible" variants={listMotion}>
            {copy.items.map((item) => (
              <motion.li key={item} variants={itemMotion}>
                <Check aria-hidden="true" />
                <div>{item}</div>
              </motion.li>
            ))}
            <motion.li variants={itemMotion}>
              <Check aria-hidden="true" />
              <div>
                {copy.memberLead}
                <ul>
                  {copy.memberItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.li>
            {copy.notes.map((item) => (
              <motion.li key={item} variants={itemMotion}>
                <Check aria-hidden="true" />
                <div>{item}</div>
              </motion.li>
            ))}
          </motion.ul>
        </section>
      </div>
      <div className="application-dialog-actions">
        <DialogClose asChild>
          <button type="button" className="btn btn-ghost btn-text">{copy.back}</button>
        </DialogClose>
        <motion.a
          href={APPLICATION_URL}
          target="_blank"
          rel="noreferrer"
          className="btn btn-apply"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="btn-label">{copy.continue}</span>
          <span className="btn-icon" aria-hidden="true"><ArrowUpRight /></span>
        </motion.a>
      </div>
    </DialogContent>
  );
}
