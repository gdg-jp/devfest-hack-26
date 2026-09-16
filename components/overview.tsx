"use client";

import { CalendarDays, Cloud, MapPin, TrainFront, Users } from "lucide-react";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/section-heading";

const facts = [
  { icon: Users, label: "WHO", value: "18歳以上の学生", note: "大学・大学院・博士課程／休学中を含む" },
  { icon: Cloud, label: "BUILD WITH", value: "Google Cloud / Gemini", note: "Cloud Creditを参加者へ配布" },
  { icon: MapPin, label: "FORMAT", value: "全国5地域 + Online", note: "東京・大阪・名古屋・会津・オンライン" },
];

const schedule = [
  { date: "11.01", eyebrow: "SUN · ONLINE", title: "共通 Kickoff", detail: "テーマ発表とルール説明" },
  { date: "11.02—14", eyebrow: "REGIONAL ROUND", title: "会場ごとに連続5日間", detail: "企画・開発・検証・提出" },
  { date: "11.27", eyebrow: "FRI · PM", title: "Demo Day", detail: "Google 渋谷オフィス" },
];

export function Overview() {
  return (
    <section className="section-shell overview-section" id="about">
      <SectionHeading
        number="01"
        kicker="EVENT OVERVIEW"
        title="まず知ってほしい、開催概要。"
        description="全国の学生がGoogle Cloud PlatformやGeminiを活用し、連続した5日間でプロトタイプを形にするハッカソンです。Regional Roundの日程は会場ごとに異なります。"
      />

      <motion.div
        className="overview-facts"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      >
        {facts.map(({ icon: Icon, label, value, note }) => (
          <motion.article
            className="overview-fact"
            key={label}
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
          >
            <Icon aria-hidden="true" />
            <div><span>{label}</span><strong>{value}</strong><p>{note}</p></div>
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        className="overview-schedule"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.11 } } }}
      >
        <div className="overview-schedule-head">
          <CalendarDays aria-hidden="true" />
          <div><span>KEY DATES</span><h3>2026年11月</h3></div>
        </div>
        <div className="overview-schedule-list">
          {schedule.map((event, index) => (
            <motion.article
              className={index === 1 ? "overview-schedule-item is-primary" : "overview-schedule-item"}
              key={event.date}
              variants={{ hidden: { opacity: 0, x: 28 }, visible: { opacity: 1, x: 0 } }}
            >
              <strong>{event.date}</strong>
              <div><span>{event.eyebrow}</span><h4>{event.title}</h4><p>{event.detail}</p></div>
            </motion.article>
          ))}
        </div>
      </motion.div>

      <motion.aside
        className="overview-note"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
      >
        <TrainFront aria-hidden="true" />
        <span>FOR FINALISTS</span>
        <p>決勝進出者には、Demo Day参加のため東京までの交通費を支援します。</p>
        <small>支援条件・上限額は決定後に掲載します。</small>
      </motion.aside>
    </section>
  );
}
