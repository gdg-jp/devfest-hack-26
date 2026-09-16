import { Code2, MapPin, Users } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const stats = [
  { icon: Code2, label: "DEVELOPMENT", value: "5 DAYS", note: "集中開発期間" },
  { icon: MapPin, label: "FORMAT", value: "6 BASES", note: "全国5地域 + オンライン" },
  { icon: Users, label: "FINAL", value: "TOKYO", note: "ファイナリストは渋谷へ" },
];

export function Overview() {
  return (
    <section className="section-shell overview-section" id="about">
      <SectionHeading
        number="01"
        kicker="ABOUT THE HACKATHON"
        title="場所を越えて、アイデアを実装する。"
        description="全国のGDGコミュニティから参加する開発者が、5日間でプロトタイプを形にするハッカソンです。各Regional Roundから選ばれたチームが、東京・渋谷で行われるDemo Dayに進出します。"
      />
      <div className="overview-stats">
        {stats.map(({ icon: Icon, label, value, note }, index) => (
          <article className="stat-card" key={label}>
            <div className={`stat-color stat-color-${index + 1}`} />
            <div className="stat-top">
              <span>{label}</span>
              <Icon aria-hidden="true" size={22} strokeWidth={1.7} />
            </div>
            <strong>{value}</strong>
            <p>{note}</p>
          </article>
        ))}
      </div>
      <aside className="overview-note">
        <span>FOR FINALISTS</span>
        <p>決勝進出者には、東京までの交通費支援があります。</p>
        <small>支援条件・上限額は決定後に掲載します。</small>
      </aside>
    </section>
  );
}
