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

export type VenueId = "tokyo" | "osaka" | "nagoya" | "aizu" | "online";

export const venueOrder: VenueId[] = ["tokyo", "osaka", "nagoya", "aizu", "online"];

export const venueTone: Record<VenueId, Tone> = {
  tokyo: "blue",
  osaka: "red",
  nagoya: "yellow",
  aizu: "green",
  online: "ink",
};

export const venueMapQuery: Partial<Record<VenueId, string>> = {
  tokyo: "メルカリ 六本木ヒルズ森タワー",
  osaka: "イノゲート大阪",
  nagoya: "名古屋大学",
  aizu: "会津大学",
};

export function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
