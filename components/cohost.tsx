"use client";

import { useI18n } from "@/components/i18n-provider";
import { cohostLogo, cohostOrder } from "@/lib/event";

export function Cohost() {
  const { t } = useI18n();
  const copy = t.cohost;

  return (
    <section className="cohost-section" id="cohost" aria-labelledby="cohost-title">
      <div className="container cohost-inner">
        <div className="cohost-heading">
          <span>{copy.kicker}</span>
          <h2 id="cohost-title">{copy.title}</h2>
        </div>
        <ul className="cohost-partners">
          {cohostOrder.map((id) => {
            const logo = cohostLogo[id];
            return (
              <li className="cohost-partner" key={id}>
                {logo ? (
                  // The visible name next to it labels the logo, so it stays decorative.
                  // eslint-disable-next-line @next/next/no-img-element -- static SVG; nothing for next/image to optimize
                  <img className="cohost-logo" src={logo.src} alt="" width={logo.width} height={logo.height} loading="lazy" decoding="async" />
                ) : null}
                <strong>{copy.names[id]}</strong>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
