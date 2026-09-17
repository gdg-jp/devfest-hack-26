"use client";

import { CalendarDays, Code2, Presentation } from "lucide-react";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/section-heading";
import { cardHover, cardTap, cardTransition } from "@/components/motion-presets";

export function Timeline() {
  return (
    <section className="timeline-section" id="timeline">
      <div className="section-shell">
        <SectionHeading
          number="02"
          kicker="SCHEDULE"
          title="5日間の挑戦。"
          description="開発期間は途中で区切らず、各会場で連続した5日間として実施します。Regional Roundの開催日は会場ごとに異なります。"
          light
        />

        <motion.div
          className="schedule-overview"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.article className="schedule-milestone motion-card" variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }} whileHover={cardHover} whileTap={cardTap} transition={cardTransition}>
            <CalendarDays aria-hidden="true" />
            <p>COMMON KICKOFF · ONLINE</p>
            <strong>11.01</strong>
            <span>テーマ発表・ルール説明</span>
          </motion.article>

          <motion.article className="development-window motion-card" variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }} whileHover={cardHover} whileTap={cardTap} transition={cardTransition}>
            <div className="development-label">
              <Code2 aria-hidden="true" />
              <div><p>REGIONAL ROUND</p><h3>5 DAYS DEVELOPMENT</h3></div>
            </div>
            <strong>11.02 — 11.14</strong>
            <p className="development-copy">各会場の開催日程に合わせ、5日間を通して企画・実装・検証・提出まで行います。</p>
            <div className="development-track" aria-hidden="true">
              <motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.35 }} />
              <i>START</i><i>CODE FREEZE</i>
            </div>
          </motion.article>

          <motion.article className="schedule-milestone demo-milestone motion-card" variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }} whileHover={cardHover} whileTap={cardTap} transition={cardTransition}>
            <Presentation aria-hidden="true" />
            <p>DEMO DAY · SHIBUYA</p>
            <strong>11.27</strong>
            <span>プレゼンテーション・審査・表彰</span>
          </motion.article>
        </motion.div>

        <motion.div
          className="demo-highlight motion-card"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          whileHover={{ y: -8, scale: 1.008 }}
          transition={cardTransition}
        >
          <div className="demo-highlight-copy">
            <span className="demo-badge">FINAL STAGE</span>
            <h3>Demo Day</h3>
            <p>ファイナリストがGoogle 渋谷オフィスに集結。プロダクトをプレゼンテーションし、優勝チームを決定します。</p>
          </div>
          <div className="demo-highlight-meta">
            <div><span>DATE</span><strong>11.27</strong><small>FRI / PM</small></div>
            <div><span>VENUE</span><strong>Google 渋谷<br />オフィス</strong><small>FINALISTS ONLY</small></div>
          </div>
        </motion.div>
        <p className="schedule-caption">※ 各会場の開始日・詳細時刻は決定後に更新します。オンライン参加者は11月2日開発開始、11月6日Code Freezeの予定です。</p>
      </div>
    </section>
  );
}
