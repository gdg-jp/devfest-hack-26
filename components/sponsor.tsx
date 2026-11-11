"use client";

import { useI18n } from "@/components/i18n-provider";
import { PartnerStrip } from "@/components/partner-strip";
import { sponsorLogo, sponsorOrder } from "@/lib/event";

export function Sponsor() {
  const { t } = useI18n();
  const copy = t.sponsor;

  return <PartnerStrip id="sponsor" kicker={copy.kicker} title={copy.title} order={sponsorOrder} names={copy.names} logos={sponsorLogo} />;
}
