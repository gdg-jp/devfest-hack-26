import { Monitor, Navigation } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const venues = [
  { id: "01", city: "TOKYO", name: "東京会場 A", place: "会場調整中", color: "blue" },
  { id: "02", city: "TOKYO", name: "東京会場 B", place: "会場調整中", color: "red" },
  { id: "03", city: "OSAKA", name: "大阪会場", place: "会場調整中", color: "yellow" },
  { id: "04", city: "NAGOYA", name: "名古屋大学", place: "愛知県名古屋市", color: "green" },
  { id: "05", city: "AIZU", name: "会津大学", place: "福島県会津若松市", color: "blue" },
  { id: "06", city: "ONLINE", name: "オンライン会場", place: "全国から参加可能", color: "red", online: true },
];

export function Locations() {
  return (
    <section className="section-shell locations-section" id="locations">
      <SectionHeading
        number="03"
        kicker="REGIONAL BASES"
        title="あなたの街から、参加できる。"
        description="会場参加とオンライン参加に対応。地域の仲間と集まり、全国のコミュニティとつながりながら開発します。"
      />
      <div className="venue-grid">
        {venues.map((venue) => (
          <article className="venue-row" key={venue.id}>
            <span className={`venue-dot ${venue.color}`} />
            <span className="venue-id">{venue.id}</span>
            <p className="venue-city">{venue.city}</p>
            <div>
              <h3>{venue.name}</h3>
              <p>{venue.place}</p>
            </div>
            {venue.online ? <Monitor aria-hidden="true" /> : <Navigation aria-hidden="true" />}
          </article>
        ))}
      </div>
      <div className="final-location">
        <p><span>DEMO DAY VENUE</span> FINALISTS ONLY</p>
        <div>
          <strong>Google<br />渋谷オフィス</strong>
          <p>東京都渋谷区<br />11月27日（金）午後</p>
        </div>
      </div>
    </section>
  );
}
