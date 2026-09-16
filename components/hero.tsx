import { ArrowDown, ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-rail" aria-hidden="true">
        <span>BUILD</span><span>CONNECT</span><span>SHIP</span>
      </div>
      <div className="hero-main">
        <p className="eyebrow"><span /> Google Developer Groups · Japan</p>
        <h1>
          <span>DEVFEST</span>
          <span className="hero-title-row">HACK<span className="title-year">’26</span></span>
        </h1>
        <div className="hero-intro">
          <p className="hero-lead">つくる5日間。<br />つながる、その先へ。</p>
          <p className="hero-copy">
            全国の開発者が、それぞれの街からひとつの未来を実装する。
            Regional Roundを勝ち抜いたチームは、渋谷のDemo Dayへ。
          </p>
        </div>
        <div className="hero-actions">
          <a className="primary-cta" href="https://example.com" target="_blank" rel="noreferrer">
            ハッカソンに応募する <ArrowUpRight aria-hidden="true" />
          </a>
          <a className="scroll-link" href="#about">イベントを知る <ArrowDown aria-hidden="true" size={18} /></a>
        </div>
      </div>
      <div className="hero-meta">
        <p className="meta-kicker">REGIONAL ROUND</p>
        <p className="meta-date">11.02—14</p>
        <p className="meta-note">TOKYO · OSAKA · NAGOYA<br />AIZU · ONLINE</p>
        <div className="meta-divider" />
        <p className="meta-kicker">DEMO DAY</p>
        <p className="meta-date">11.27 PM</p>
        <p className="meta-note">GOOGLE SHIBUYA</p>
      </div>
      <div className="hero-stripes" aria-hidden="true">
        <span className="stripe-blue" /><span className="stripe-red" />
        <span className="stripe-yellow" /><span className="stripe-green" />
      </div>
    </section>
  );
}
