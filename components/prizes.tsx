import { MoveUpRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const prizes = [
  { rank: "01", name: "GRAND PRIZE", ja: "最優秀賞", reward: "COMING SOON", color: "blue" },
  { rank: "02", name: "RUNNER-UP", ja: "優秀賞", reward: "COMING SOON", color: "red" },
  { rank: "03", name: "SPECIAL AWARD", ja: "特別賞", reward: "COMING SOON", color: "green" },
];

export function Prizes() {
  return (
    <section className="prizes-section" id="prizes">
      <div className="section-shell">
        <SectionHeading
          number="04"
          kicker="PRIZES"
          title="挑戦の先に、次のチャンスを。"
          description="各賞の賞品・審査基準はブランドガイド内の正式情報に合わせて更新予定です。ここではレイアウト確認用の仮表示を使用しています。"
        />
        <div className="prize-list">
          {prizes.map((prize) => (
            <article className="prize-row" key={prize.rank}>
              <span className={`prize-color ${prize.color}`} />
              <span className="prize-rank">{prize.rank}</span>
              <div><p>{prize.name}</p><h3>{prize.ja}</h3></div>
              <strong>{prize.reward}</strong>
              <MoveUpRight aria-hidden="true" />
            </article>
          ))}
        </div>
        <div className="travel-support">
          <span>+ TRAVEL SUPPORT</span>
          <p>Regional Roundを通過したファイナリストには、Demo Day参加のための東京までの交通費を支援します。</p>
        </div>
      </div>
    </section>
  );
}
