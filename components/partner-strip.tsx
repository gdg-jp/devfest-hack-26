import type { PartnerLogo } from "@/lib/event";

type PartnerStripProps<Id extends string> = {
  id: string;
  kicker: string;
  title: string;
  order: Id[];
  names: Record<Id, string>;
  logos: Partial<Record<Id, PartnerLogo>>;
};

export function PartnerStrip<Id extends string>({ id, kicker, title, order, names, logos }: PartnerStripProps<Id>) {
  const titleId = `${id}-title`;

  return (
    <section className="partner-section" id={id} aria-labelledby={titleId}>
      <div className="container partner-inner">
        <div className="partner-heading">
          <span>{kicker}</span>
          <h2 id={titleId}>{title}</h2>
        </div>
        <ul className="partner-list">
          {order.map((partnerId) => {
            const logo = logos[partnerId];
            return (
              <li className="partner-item" key={partnerId}>
                {logo ? (
                  // The visible name next to it labels the logo, so it stays decorative.
                  // eslint-disable-next-line @next/next/no-img-element -- static brand file shown as supplied; nothing for next/image to optimize
                  <img
                    className={logo.width === logo.height ? "partner-logo is-square" : "partner-logo"}
                    src={logo.src}
                    alt=""
                    width={logo.width}
                    height={logo.height}
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}
                <strong>{names[partnerId]}</strong>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
