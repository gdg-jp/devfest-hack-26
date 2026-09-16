import { ArrowUp, ArrowUpRight } from "lucide-react";

export function FinalCta() {
  return (
    <section className="final-cta">
      <p className="final-cta-kicker">YOUR IDEA. FIVE DAYS. ONE DEMO.</p>
      <h2>そのアイデアを、<br />動く未来に。</h2>
      <a href="https://example.com" target="_blank" rel="noreferrer">
        <span>ハッカソンに応募する</span>
        <ArrowUpRight aria-hidden="true" size={30} />
      </a>
      <p className="final-cta-note">応募ページは準備中です。公開後、外部サイトへ移動します。</p>
      <div className="final-colorbar" aria-hidden="true"><span /><span /><span /><span /></div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand"><span>GDG</span> / DEVFEST HACKATHON 2026</div>
      <p>Organized by Google Developer Groups in Japan</p>
      <p>© 2026 DevFest Hackathon</p>
      <a href="#top" aria-label="ページ上部へ戻る">BACK TO TOP <ArrowUp aria-hidden="true" size={16} /></a>
    </footer>
  );
}
