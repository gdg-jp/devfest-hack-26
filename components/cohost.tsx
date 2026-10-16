"use client";

import { useI18n } from "@/components/i18n-provider";

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
        <div className="cohost-partner">
          <div className="cohost-logo">
            <img
              src="/images/mercari-logo-transparent.png"
              alt={copy.logoAlt}
              width="1672"
              height="941"
              loading="lazy"
              decoding="async"
            />
          </div>
          <strong>{copy.name}</strong>
        </div>
      </div>
    </section>
  );
}
