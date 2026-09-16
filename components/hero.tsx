import { ArrowDown, ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <div className="hero-title-lockup">
          <img src="/brand/bracket-open.svg" alt="" />
          <div>
            <p>GOOGLE DEVELOPER GROUPS · JAPAN</p>
            <h1>DevFest</h1>
          </div>
          <img src="/brand/bracket-close.svg" alt="" />
        </div>

        <div className="hero-card-stack">
          <div className="hero-primary-card">
            <span className="hero-edition">HACKATHON 2026</span>
            <h2>つくる5日間。<br />つながる、その先へ。</h2>
            <p className="hero-date-pill">NOV. 02 — NOV. 27, 2026</p>
          </div>
          <div className="hero-secondary-card">
            <p>全国の開発者が、それぞれの街からひとつの未来を実装する。Regional Roundを勝ち抜いたチームは、渋谷のDemo Dayへ。</p>
            <div className="hero-actions">
              <a className="primary-cta" href="https://example.com" target="_blank" rel="noreferrer">
                ハッカソンに応募する <ArrowUpRight aria-hidden="true" />
              </a>
              <a className="scroll-link" href="#about">詳しく見る <ArrowDown aria-hidden="true" size={18} /></a>
            </div>
          </div>
        </div>

        <div className="hero-stat-stack" aria-label="イベント概要">
          <div className="hero-stat"><span>Regional</span><strong>06</strong><small>BASES</small></div>
          <div className="hero-stat"><span>Build</span><strong>05</strong><small>DAYS</small></div>
          <div className="hero-stat"><span>Demo Day</span><strong>11.27</strong><small>SHIBUYA</small></div>
        </div>

        <div className="hero-gdg-lockup">
          <img src="/brand/gdg-lockup.svg" alt="Google Developer Groups" />
          <p>Google<br />Developer<br />Groups</p>
          <span>Japan</span>
        </div>
      </div>
    </section>
  );
}
