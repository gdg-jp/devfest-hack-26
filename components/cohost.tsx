"use client";

import { useI18n } from "@/components/i18n-provider";
import { PartnerStrip } from "@/components/partner-strip";
import { cohostLogo, cohostOrder } from "@/lib/event";

export function Cohost() {
  const { t } = useI18n();
  const copy = t.cohost;

  return <PartnerStrip id="cohost" kicker={copy.kicker} title={copy.title} order={cohostOrder} names={copy.names} logos={cohostLogo} />;
}
