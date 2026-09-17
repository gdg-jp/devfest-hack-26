"use client";

import { Cloud, Cpu, Presentation, TrainFront, Trophy, Utensils } from "lucide-react";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/section-heading";
import { cardHover, cardTap, cardTransition, rowHover } from "@/components/motion-presets";

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

        <motion.article
          className="winner-prize motion-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          whileHover={{ y: -8, scale: 1.006 }}
          transition={cardTransition}
        >
          <header>
            <span>DEMO DAY · GRAND PRIZE</span>
            <h3>For the Winner</h3>
            <p>優勝チームのみ</p>
          </header>
          <div className="winner-benefit-list">
            {winnerBenefits.map(({ icon: Icon, title }, index) => (
              <motion.div
                className="winner-benefit"
                key={title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                whileHover={{ ...rowHover, transition: cardTransition }}
              >
                <Icon aria-hidden="true" />
                <p>{title}</p>
                <span>調整中</span>
              </motion.div>
            ))}
          </div>
        </motion.article>

        <div className="participant-benefits">
          <motion.article className="cloud-credit-card motion-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} whileHover={cardHover} whileTap={cardTap} transition={cardTransition}>
            <Cloud aria-hidden="true" />
            <div><span>FOR ALL PARTICIPANTS</span><h3>Google Cloud Credit</h3></div>
            <p>Regional Roundの参加者へ、開発に利用できるGoogle Cloud Creditを配布します。</p>
          </motion.article>
          <motion.article className="travel-support motion-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} whileHover={cardHover} whileTap={cardTap} transition={cardTransition}>
            <TrainFront aria-hidden="true" />
            <div><span>FOR FINALISTS</span><h3>Travel Support</h3></div>
            <p>決勝進出者には、Demo Day参加のための東京までの交通費を支援します。</p>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
