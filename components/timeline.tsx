"use client";

import { CalendarDays, Code2, Presentation } from "lucide-react";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/section-heading";

export function Timeline() {
  return (
    <section className="timeline-section" id="timeline">
      <div className="section-shell">
        <SectionHeading
          number="02"
          kicker="SCHEDULE"
          title="5日間、ひとつのプロダクトに向き合う。"
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
          <motion.article className="schedule-milestone" variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}>
            <CalendarDays aria-hidden="true" />
            <p>COMMON KICKOFF · ONLINE</p>
            <strong>11.01</strong>
            <span>テーマ発表・ルール説明</span>
          </motion.article>

          <motion.article className="development-window" variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}>
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

          <motion.article className="schedule-milestone demo-milestone" variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}>
            <Presentation aria-hidden="true" />
            <p>DEMO DAY · SHIBUYA</p>
            <strong>11.27</strong>
            <span>プレゼンテーション・審査・表彰</span>
          </motion.article>
        </motion.div>

        <motion.div
          className="demo-highlight"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <div>
            <span className="demo-badge">FINAL STAGE</span>
            <h3>Demo Day</h3>
          </div>
          <p>ファイナリストがGoogle 渋谷オフィスに集結。プロダクトをプレゼンテーションし、優勝チームを決定します。</p>
          <strong>11.27<br /><span>FRI / PM</span></strong>
        </motion.div>
        <p className="schedule-caption">※ 各会場の開始日・詳細時刻は決定後に更新します。オンライン参加者は11月2日開発開始、11月6日Code Freezeの予定です。</p>
      </div>
    </section>
  );
}
