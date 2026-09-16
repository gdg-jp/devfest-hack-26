import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const buildDays = [
  { day: "DAY 0", title: "Kickoff", detail: "テーマ発表・ルール説明・チームビルディング" },
  { day: "DAY 1", title: "Frame", detail: "課題を定義し、つくるものを決める" },
  { day: "DAY 2—4", title: "Build", detail: "実装・検証・メンタリング" },
  { day: "DAY 5", title: "Ship", detail: "提出・Regional Round審査" },
];

export function Timeline() {
  return (
    <section className="timeline-section" id="timeline">
      <div className="section-shell">
        <SectionHeading
          number="02"
          kicker="SCHEDULE"
          title="5日でつくり、1日で未来を見せる。"
          description="Regional Roundの開催日は会場ごとに異なります。各会場は11月2日〜14日の期間内に、5日間の開発プログラムを実施します。"
          light
        />
        <div className="date-band">
          <div><span>REGIONAL ROUND</span><strong>NOV. 02—14</strong></div>
          <ArrowRight aria-hidden="true" />
          <div><span>DEMO DAY</span><strong>NOV. 27 / PM</strong></div>
        </div>
        <div className="build-days">
          {buildDays.map((item, index) => (
            <article className="build-day" key={item.day}>
              <div className="day-marker"><span>{String(index + 1).padStart(2, "0")}</span></div>
              <p>{item.day}</p>
              <h3>{item.title}</h3>
              <small>{item.detail}</small>
            </article>
          ))}
        </div>
        <div className="demo-highlight">
          <div>
            <span className="demo-badge">FINAL STAGE</span>
            <h3>Demo Day</h3>
          </div>
          <p>ファイナリストがGoogle 渋谷オフィスに集結。プロダクトをプレゼンテーションし、審査・表彰を行います。</p>
          <strong>11.27<br /><span>FRI / PM</span></strong>
        </div>
        <p className="schedule-caption">※ 上記はデザイン検討用の仮タイムテーブルです。各会場の開始日・詳細時刻は決定後に更新します。</p>
      </div>
    </section>
  );
}
