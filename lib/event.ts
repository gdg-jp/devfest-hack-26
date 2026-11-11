// Locale-independent event facts. Copy lives in `lib/i18n.ts`.

export const APPLICATION_URL = "https://devfest26-form.gdgs.jp/";

export type PhaseId = "kickoff" | "entry" | "build" | "regional" | "demo" | "devfest";

export type Tone = "blue" | "green" | "yellow" | "red" | "pink" | "ink";

export const phaseOrder: PhaseId[] = ["kickoff", "entry", "build", "regional", "demo", "devfest"];

export const phaseTone: Record<PhaseId, Tone> = {
  kickoff: "blue",
  entry: "blue",
  build: "green",
  regional: "yellow",
  demo: "red",
  devfest: "pink",
};

// Days in November 2026 covered by each phase. November 1, 2026 is a Sunday,
// so the calendar grid starts without leading blanks.
export const phaseDays: Record<PhaseId, number[]> = {
  kickoff: [1],
  entry: [2, 3, 4],
  build: [5, 6, 7, 8, 9, 10],
  regional: [14],
  demo: [27],
  devfest: [29],
};

export type MilestoneId = "kickoff" | "build" | "regional" | "demo";

export const milestones: { id: MilestoneId; at: number }[] = [
  { id: "kickoff", at: Date.parse("2026-11-01T00:00:00+09:00") },
  { id: "build", at: Date.parse("2026-11-05T00:00:00+09:00") },
  { id: "regional", at: Date.parse("2026-11-14T00:00:00+09:00") },
  { id: "demo", at: Date.parse("2026-11-27T10:00:00+09:00") },
];

export type VenueId = "tokyo" | "osaka" | "nagoya" | "online";

export const venueOrder: VenueId[] = ["tokyo", "osaka", "nagoya", "online"];

// Regional Day is on-site first; the online venue is only for those who cannot attend in person.
export const onsiteVenueOrder = venueOrder.filter((id) => id !== "online");

export const venueTone: Record<VenueId, Tone> = {
  tokyo: "blue",
  osaka: "red",
  nagoya: "yellow",
  online: "ink",
};

export const venueMapQuery: Partial<Record<VenueId, string>> = {
  tokyo: "銀座松竹スクエア 東京都中央区築地1-13-1",
  osaka: "船井総研グループ大阪本社 サステナグローススクエア OSAKA Enz'Arena",
  nagoya: "名古屋大学",
};

// Logo files ship with their brand's required white clear space; render them unmodified.
export type PartnerLogo = { src: string; width: number; height: number };

export type CohostId = "layerx" | "funai";

// Listed in venue order (Tokyo, Osaka).
export const cohostOrder: CohostId[] = ["layerx", "funai"];

export const cohostLogo: Partial<Record<CohostId, PartnerLogo>> = {
  layerx: { src: "/images/layerx-logo.svg", width: 1176, height: 433 },
};

export type SponsorId = "findy";

export const sponsorOrder: SponsorId[] = ["findy"];

export const sponsorLogo: Partial<Record<SponsorId, PartnerLogo>> = {
  findy: { src: "/images/findy-logo.jpg", width: 1000, height: 1000 },
};

export function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
