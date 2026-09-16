import { ArrowDown, ArrowRight, ArrowUpRight, Braces, Globe2 } from "lucide-react";

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <div className="hero-symbols" aria-hidden="true">
          <div className="symbol-dots"><span /><span /><span /></div>
          <div className="symbol-line"><span /><ArrowRight /></div>
          <Globe2 className="symbol-globe" />
          <div className="symbol-slashes"><i /><i /></div>
        </div>

        <div className="hero-copy-block">
          <p className="hero-overline">GOOGLE DEVELOPER GROUPS ON CAMPUS · JAPAN</p>
          <h1>DevFest<br /><span>Hackathon</span></h1>
          <div className="hero-year-row">
            <strong>2026</strong>
            <p>つくる5日間。<br />つながる、その先へ。</p>
          </div>
          <div className="hero-actions">
            <a className="primary-cta" href="https://example.com" target="_blank" rel="noreferrer">
              ハッカソンに応募する <ArrowUpRight aria-hidden="true" />
            </a>
            <a className="scroll-link" href="#about">詳しく見る <ArrowDown aria-hidden="true" size={18} /></a>
          </div>
        </div>

        <aside className="hero-info-panel">
          <div className="hero-info-heading">
            <Braces aria-hidden="true" />
            <span>EVENT INFO</span>
          </div>
          <p>全国の学生ビルダーが、Google Cloud PlatformやGeminiを活用してプロダクトを開発する5日間。</p>
          <dl>
            <div><dt>REGIONAL ROUND</dt><dd>11.02—14</dd></div>
            <div><dt>DEVELOPMENT</dt><dd>5 DAYS</dd></div>
            <div><dt>DEMO DAY</dt><dd>11.27 PM</dd></div>
          </dl>
          <small>Tokyo · Osaka · Nagoya · Aizu · Online</small>
        </aside>

        <div className="hero-brand-lockup">
          <img src="/brand/gdg-lockup.svg" alt="Google Developer Groups" />
          <span><b>Google Developer Groups</b><small>On Campus · Japan</small></span>
        </div>
      </div>
    </section>
  );
}
