"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { motion } from "motion/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const APPLICATION_URL = "https://www.craftstadium.com/organizer/google-developer-groups-on-campus-japan-96";

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
  children = "応募する",
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  const context = useContext(ApplicationModalContext);

  if (!context) {
    throw new Error("ApplyButton must be used inside ApplicationModalProvider");
  }

  return (
    <motion.button
      type="button"
      className={className}
      aria-haspopup="dialog"
      onClick={context.open}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
    >
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" />
    </motion.button>
  );
}

function ApplicationModalContent() {
  return (
    <DialogContent className="application-dialog" showCloseButton={false}>
      <div className="application-dialog-bar" aria-hidden="true">
        <span /><span /><span /><span />
      </div>
      <DialogClose className="application-dialog-close" aria-label="応募条件を閉じる">
        <X aria-hidden="true" size={20} />
      </DialogClose>
      <DialogHeader className="application-dialog-header">
        <p className="application-dialog-kicker">BEFORE YOU APPLY</p>
        <DialogTitle>応募対象を確認してください</DialogTitle>
        <DialogDescription>
          以下の条件を満たしていることを確認してから、応募ページへ進んでください。
        </DialogDescription>
      </DialogHeader>
      <div className="application-dialog-scroll">
        <section aria-labelledby="application-eligibility-title">
          <h3 id="application-eligibility-title">応募対象</h3>
          <ul>
            <li>応募期間の開始時から賞品授与時（ハッカソン開催日当日）まで、日本国内の大学・大学院に在籍し、日本に居住する学生であること</li>
            <li>2 名以上 4 名以下のチームであること</li>
            <li>
              チームメンバー全員が、以下の条件を満たしていること
              <ul>
                <li>応募期間の開始時から賞品授与時（ハッカソン開催日当日）まで、日本国内の大学・大学院に在籍し、日本に居住していること</li>
                <li>応募時点で 18 歳以上であること</li>
              </ul>
            </li>
            <li>異なる大学に所属するメンバー同士でのチーム編成も可能です</li>
            <li>ソフトウェア開発やコーディングの経験は問いません。ただし、AI を活用したプロダクト開発に関心があることが必要です</li>
            <li>留学生および外国籍の方も応募可能です。プログラムは日本語で進行するため、チーム活動、メンタリング、発表に参加できる日本語力が必要です</li>
          </ul>
        </section>
      </div>
      <div className="application-dialog-actions">
        <DialogClose asChild>
          <button type="button" className="application-dialog-back">戻る</button>
        </DialogClose>
        <a href={APPLICATION_URL} target="_blank" rel="noreferrer" className="application-dialog-continue">
          応募ページへ進む <ArrowUpRight aria-hidden="true" size={19} />
        </a>
      </div>
    </DialogContent>
  );
}
