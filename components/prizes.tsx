import { Cloud, Cpu, Presentation, TrainFront, Trophy, Utensils } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const winnerBenefits = [
  { icon: Cpu, title: "Google ハードウェア製品" },
  { icon: Trophy, title: "優勝トロフィー" },
  { icon: Presentation, title: "Google エンジニアリングリーダーシップへのプレゼンテーション機会" },
  { icon: Utensils, title: "Google インターン採用チームとのランチセッション" },
];

export function Prizes() {
  return (
    <section className="prizes-section" id="prizes">
      <div className="section-shell">
        <SectionHeading
          number="04"
          kicker="WINNER BENEFITS"
          title="優勝チームに贈られる、次の機会。"
          description="Demo Dayのプライズは優勝チームのみが対象です。内容はGoogle側で最終調整中のため、確定後に正式情報へ更新します。"
        />

        <article className="winner-prize">
          <header>
            <span>DEMO DAY · GRAND PRIZE</span>
            <h3>For the Winner</h3>
            <p>優勝チームのみ</p>
          </header>
          <div className="winner-benefit-list">
            {winnerBenefits.map(({ icon: Icon, title }) => (
              <div className="winner-benefit" key={title}>
                <Icon aria-hidden="true" />
                <p>{title}</p>
                <span>調整中</span>
              </div>
            ))}
          </div>
        </article>

        <div className="participant-benefits">
          <article className="cloud-credit-card">
            <Cloud aria-hidden="true" />
            <div><span>FOR ALL PARTICIPANTS</span><h3>Google Cloud Credit</h3></div>
            <p>Regional Roundの参加者へ、開発に利用できるGoogle Cloud Creditを配布します。</p>
          </article>
          <article className="travel-support">
            <TrainFront aria-hidden="true" />
            <div><span>FOR FINALISTS</span><h3>Travel Support</h3></div>
            <p>決勝進出者には、Demo Day参加のための東京までの交通費を支援します。</p>
          </article>
        </div>
      </div>
    </section>
  );
}
