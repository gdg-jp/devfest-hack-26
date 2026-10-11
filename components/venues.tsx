"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { ArrowUpRight, TrainFront, UserRound } from "lucide-react";
import { motion, useSpring } from "motion/react";
import { Arc, GdgLogo, Globe, People, Pin, Slashes } from "@/components/brand-shapes";
import { useI18n } from "@/components/i18n-provider";
import { easeOut } from "@/components/motion-presets";
import { SectionHeading } from "@/components/section-heading";
import { mapsUrl, onsiteVenueOrder, venueMapQuery, venueTone, type VenueId } from "@/lib/event";

const venueArt: Record<VenueId, ReactNode> = {
  tokyo: <Pin fill="#4285f4" />,
  osaka: <Slashes colors={["#ff7daf", "#ea4335"]} />,
  nagoya: <Arc fill="#f9ab00" />,
  aizu: <People fill="#5cdb6d" wave />,
  online: <Globe fill="#ffffff" duration={7} />,
};

function VenuePanel({ id, index, active, onActivate }: { id: VenueId; index: number; active: boolean; onActivate: () => void }) {
  const { t } = useI18n();
  const venue = t.venues.list[id];
  const grow = useSpring(active ? 5 : 1, { stiffness: 170, damping: 26 });
  const mapQuery = venueMapQuery[id];

  useEffect(() => {
    grow.set(active ? 5 : 1);
  }, [active, grow]);

  return (
    <motion.article
      className={`venue tone-${venueTone[id]}`}
      data-active={active}
      style={{ flexGrow: grow }}
      onPointerEnter={onActivate}
      variants={{ hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } } }}
    >
      <button type="button" className="venue-trigger" aria-expanded={active} aria-controls={`venue-${id}`} onClick={onActivate} onFocus={onActivate}>
        <span className="venue-index">0{index + 1}</span>
        <span className="venue-city-vertical">{venue.city}</span>
        <span className="sr-only">{venue.name}</span>
      </button>

      <div className="venue-body" id={`venue-${id}`}>
        <p className="venue-city">{venue.city}</p>
        <div className="venue-details">
          <p className="venue-region">{venue.region}</p>
          <h3>{venue.name}</h3>
          <p className="venue-place">{venue.place}</p>
          <p className="venue-address">{venue.address}</p>
        </div>
        <div className="venue-foot">
          <span className="venue-tag">{t.venues.regionalTag}</span>
          {mapQuery ? (
            <motion.a className="venue-map" href={mapsUrl(mapQuery)} target="_blank" rel="noreferrer" whileHover={{ x: 3 }}>
              {t.common.openMap}
              <ArrowUpRight aria-hidden="true" />
            </motion.a>
          ) : null}
        </div>
      </div>

      <motion.div
        className="venue-art"
        aria-hidden="true"
        animate={{ scale: active ? 1 : 0.4, rotate: active ? 0 : -24, opacity: active ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
      >
        {venueArt[id]}
      </motion.div>
    </motion.article>
  );
}

/** The online venue sits below the on-site panels as a fallback, not as a fifth equal choice. */
function OnlineVenue() {
  const { t } = useI18n();
  const copy = t.venues.online;

  return (
    <motion.aside
      className="online-venue"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut, staggerChildren: 0.08 } } }}
    >
      <motion.div
        className="online-venue-art"
        aria-hidden="true"
        variants={{ hidden: { scale: 0.6, rotate: -30 }, visible: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 220, damping: 14 } } }}
        whileHover={{ rotate: -10, scale: 1.08 }}
      >
        {venueArt.online}
      </motion.div>
      <div className="online-venue-copy">
        <span className="online-venue-kicker">{copy.kicker}</span>
        <h3>{copy.title}</h3>
        <p>{copy.body}</p>
        <p className="online-venue-caution">{copy.caution}</p>
      </div>
      <motion.p className="online-venue-note" variants={{ hidden: { opacity: 0, x: 16 }, visible: { opacity: 1, x: 0 } }}>
        <UserRound aria-hidden="true" />
        {copy.note}
      </motion.p>
    </motion.aside>
  );
}

export function Venues() {
  const { t } = useI18n();
  const [active, setActive] = useState<VenueId>("tokyo");
  const demo = t.venues.demo;

  return (
    <section className="section venues" id="venues">
      <div className="container">
        <SectionHeading index="04" kicker={t.venues.kicker} title={t.venues.title} description={t.venues.description} />

        <motion.div
          className="venue-panels"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {onsiteVenueOrder.map((id, index) => (
            <VenuePanel key={id} id={id} index={index} active={active === id} onActivate={() => setActive(id)} />
          ))}
        </motion.div>

        <OnlineVenue />

        <motion.div
          className="demo-venue"
          initial={{ opacity: 0, y: 50, clipPath: "inset(10% 6% 10% 6% round 32px)" }}
          whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 32px)" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1, ease: easeOut }}
        >
          <div className="demo-venue-main">
            <span className="demo-venue-kicker">{demo.kicker}</span>
            <h3>{demo.name}</h3>
            <p>{demo.address}</p>
          </div>
          <dl className="demo-venue-meta">
            <div>
              <dt>DATE</dt>
              <dd>{demo.date}</dd>
            </div>
            <div>
              <dt>TIME</dt>
              <dd>{demo.time}</dd>
            </div>
            <div>
              <dt>TEAMS</dt>
              <dd>{demo.tag}</dd>
            </div>
          </dl>
          <p className="demo-venue-travel">
            <TrainFront aria-hidden="true" />
            {demo.travel}
          </p>
          <motion.div
            className="demo-venue-logo"
            aria-hidden="true"
            whileHover={{ rotate: -8, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300, damping: 14 }}
          >
            <GdgLogo />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
