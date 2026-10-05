import type { MilestoneId, PhaseId, VenueId } from "@/lib/event";

export const locales = ["ja", "en"] as const;
export type Locale = (typeof locales)[number];

export const localePath: Record<Locale, string> = { ja: "/", en: "/en" };

const ja = {
  meta: {
    title: "DevFest GDGoC Japan Hackathon 2026 | Google Developer Groups on Campus Japan",
    description:
      "全国の学生が Google Cloud と Gemini で6日間のプロダクト開発に挑む、DevFest GDGoC Japan Hackathon 2026。11月1日キックオフ、11月14日 Regional Day、11月27日 Demo Day。",
  },
  common: {
    apply: "応募する",
    applyLong: "ハッカソンに応募する",
    skip: "本文へスキップ",
    language: "表示言語",
    menu: "メニュー",
    closeMenu: "メニューを閉じる",
    entryUntil: "参加受付 11.04（水）まで",
    backToTop: "トップへ戻る",
    openMap: "地図を開く",
  },
  nav: [
    { id: "about", label: "概要" },
    { id: "schedule", label: "日程" },
    { id: "venues", label: "会場" },
    { id: "prizes", label: "賞・特典" },
    { id: "judging", label: "審査" },
  ],
  hero: {
    tab: "STUDENT HACKATHON · NOV 2026",
    tagline: ["つくる6日間。", "つながる、その先へ。"],
    secondary: "スケジュールを見る",
    keyDates: [
      { date: "11.01", day: "日", label: "共通キックオフ", meta: "ONLINE" },
      { date: "11.05–10", day: "木–火", label: "開発期間", meta: "ONLINE" },
      { date: "11.14", day: "土", label: "Regional Day", meta: "4会場 + ONLINE" },
      { date: "11.27", day: "金", label: "Demo Day", meta: "TOP 10" },
    ],
  },
  marquee: [
    "DevFest GDGoC Japan Hackathon 2026",
    "Build with Google Cloud & Gemini",
    "Tokyo · Osaka · Nagoya · Aizu · Online",
    "Kickoff 11.01",
    "Demo Day 11.27",
    "#GDGOnCampus",
  ],
  countdown: {
    tab: "COUNTDOWN",
    label: "カウントダウン",
    prefix: "あと",
    // Singular / plural forms; Japanese uses the same unit for both.
    units: { one: ["日", "時間", "分", "秒"], other: ["日", "時間", "分", "秒"] },
    done: "Demo Day まで走り抜けました。ご参加ありがとうございました。",
    milestones: {
      kickoff: { until: "共通キックオフまで", when: "11.01（日）· ONLINE" },
      build: { until: "開発期間スタートまで", when: "11.05（木）· ONLINE" },
      regional: { until: "Regional Day まで", when: "11.14（土）· ON-SITE" },
      demo: { until: "Demo Day まで", when: "11.27（金）10:00 · GOOGLE SHIBUYA" },
    } satisfies Record<MilestoneId, { until: string; when: string }>,
  },
  about: {
    kicker: "ABOUT",
    title: ["アイデアを、", "動かす6日間。"],
    description:
      "DevFest GDGoC Japan Hackathon 2026 は、全国の学生が Google Cloud や Gemini を活用し、6日間でプロダクトを形にするハッカソンです。開発期間は全会場共通でオンライン。11月14日の Regional Day には、各地域の会場に集まります。",
    cards: {
      who: { label: "WHO", value: "18歳以上の学生", note: "日本国内の大学・大学院に在籍し、日本に居住する学生" },
      team: { label: "TEAM", value: "2–4", unit: "名のチームで参加", note: "異なる大学のメンバーでのチーム編成もOK" },
      build: { label: "BUILD WITH", value: "Google Cloud / Gemini", note: "参加者に Google Cloud Credit を配布" },
      venues: { label: "VENUES", value: "4 + Online", note: "東京・大阪・名古屋・会津・オンライン" },
      demo: { label: "DEMO DAY", value: "TOP 10", note: "Top 10 チームが Google 渋谷オフィスで発表" },
      judges: { label: "JUDGES", value: "Google Software Engineers", note: "Google のソフトウェアエンジニアが審査員として参加予定" },
    },
    chips: ["コーディング経験は不問", "AI を活用したプロダクト開発に関心がある方", "留学生・外国籍の方も応募可（日本語で進行）"],
  },
  schedule: {
    kicker: "SCHEDULE",
    title: ["6日間、", "開発に集中。"],
    description:
      "11月1日のキックオフでテーマを発表。11月5日から10日までの6日間は、全会場共通でオンライン開発に取り組みます。11月14日の Regional Day を経て、11月27日の Demo Day には Top 10 チームが進みます。",
    calendarTab: "2026年11月",
    weekdays: ["日", "月", "火", "水", "木", "金", "土"],
    note: "※ Demo Day 以外の詳細時刻は、決定後に更新します。",
    phases: {
      kickoff: { date: "11.01", day: "日", title: "共通キックオフ", mode: "ONLINE", detail: "テーマ発表とルール説明。全国の参加者がオンラインで集まります。", legend: "キックオフ" },
      entry: { date: "〜11.04", day: "水", title: "参加受付 締切", mode: "ENTRY", detail: "キックオフ後も、11月4日まで参加受付を行います。", legend: "受付期間" },
      build: { date: "11.05–11.10", day: "木–火", title: "開発期間", mode: "ONLINE · 全会場共通", detail: "全会場共通の6日間。企画・開発・検証・提出までをオンラインで進めます。", legend: "開発期間" },
      regional: { date: "11.14", day: "土", title: "Regional Day", mode: "ON-SITE · 現地開催", detail: "東京・大阪・名古屋・会津の各会場とオンライン会場で、同日に開催します。", legend: "Regional Day" },
      demo: { date: "11.27", day: "金", title: "Demo Day", mode: "ON-SITE · 10:00–12:00", detail: "Top 10 チームが Google 渋谷オフィスに集結。プレゼンテーション・審査・表彰を行います。", legend: "Demo Day" },
      devfest: { date: "11.29", day: "日", title: "DevFest Tokyo", mode: "WINNERS", detail: "優勝チームの LT 登壇と、受賞チームによる学生展示。", legend: "DevFest Tokyo" },
    } satisfies Record<PhaseId, { date: string; day: string; title: string; mode: string; detail: string; legend: string }>,
  },
  venues: {
    kicker: "VENUES",
    title: ["地域を越えて、", "ともにつくる。"],
    description:
      "11月14日の Regional Day は、全国4会場とオンライン会場で同日開催します。地域の仲間と集まり、全国のコミュニティとつながりましょう。",
    regionalTag: "REGIONAL DAY · 11.14 SAT",
    list: {
      tokyo: { city: "TOKYO", region: "東京", name: "メルカリ本社", place: "六本木ヒルズ森タワー", address: "東京都港区六本木6-10-1" },
      osaka: { city: "OSAKA", region: "大阪", name: "イノゲート大阪 エンザリーナ", place: "JR大阪駅 西口直結", address: "大阪府大阪市北区梅田3-2-123" },
      nagoya: { city: "NAGOYA", region: "名古屋", name: "名古屋大学", place: "Nagoya University", address: "愛知県名古屋市" },
      aizu: { city: "AIZU", region: "会津", name: "会津大学", place: "The University of Aizu", address: "福島県会津若松市" },
      online: { city: "ONLINE", region: "オンライン", name: "オンライン会場", place: "全国どこからでも", address: "自宅や大学から参加できます" },
    } satisfies Record<VenueId, { city: string; region: string; name: string; place: string; address: string }>,
    demo: {
      kicker: "DEMO DAY VENUE",
      name: "Google 渋谷オフィス",
      address: "東京都渋谷区",
      date: "11月27日（金）",
      time: "10:00–12:00",
      tag: "TOP 10 TEAMS ONLY",
      travel: "決勝進出者には、Demo Day 参加のための東京までの交通費を支援します。",
    },
  },
  prizes: {
    kicker: "PRIZES",
    title: ["優勝の先に、", "次の舞台を。"],
    description:
      "Demo Day で選ばれたチームは、11月29日の DevFest Tokyo へ。LT 登壇や学生展示を通じて、つくったプロダクトをより多くの開発者に届けられます。",
    grand: {
      tab: "GRAND PRIZE",
      title: "優勝チーム",
      lead: "DevFest Tokyo のステージと展示スペースへ。",
      badges: [
        { role: "SPEAKER", title: "LT 登壇権", note: "DevFest Tokyo のステージで、プロダクトをライトニングトークで紹介" },
        { role: "EXHIBITOR", title: "学生展示権", note: "ハッカソンで開発したプロダクトを DevFest Tokyo で展示" },
      ],
      badgeEvent: "DevFest Tokyo",
      badgeDate: "11.29 SUN",
      perksTitle: "さらに優勝チームには",
      perks: [
        "Google ハードウェア製品",
        "優勝トロフィー",
        "Google エンジニアリングリーダーシップへのプレゼンテーション機会",
        "Google インターン採用チームとのランチセッション",
      ],
    },
    google: {
      kicker: "GOOGLE インターンシップ / 新卒採用",
      title: "Google のインターンシップ / 新卒採用に関する機会を、優勝チームへ。",
      body: "審査には Google のソフトウェアエンジニアが参加予定。優勝チームには、Google エンジニアリングリーダーシップへのプレゼンテーションや、インターン採用チームとのランチセッションの機会があります。",
      disclaimer: "※ Google における採用・インターンシップへの参加や、選考の結果を保証するものではありません。",
    },
    organizer: {
      kicker: "GDG TOKYO ORGANIZER AWARD",
      title: "GDG Tokyo Organizer 賞",
      count: "4",
      unit: "チーム",
      body: "GDG Tokyo Organizer 賞に選ばれた4チームに、11月29日の DevFest Tokyo 学生展示権を贈ります。",
      role: "EXHIBITOR × 4",
    },
    travel: {
      kicker: "FOR FINALISTS",
      title: "Travel Support",
      body: "決勝進出者（Top 10 チーム）には、Demo Day 参加のための東京までの交通費を支援します。",
      note: "支援条件・上限額は決定後に掲載します。",
    },
    credit: {
      kicker: "FOR ALL PARTICIPANTS",
      title: "Google Cloud Credit",
      body: "参加者へ、開発に利用できる Google Cloud Credit を配布します。",
    },
    exhibitionNote: "DevFest Tokyo の学生展示では、ハッカソンで開発したプロダクトを展示していただきます。",
  },
  judging: {
    kicker: "JUDGING",
    title: ["4つの視点で、", "審査します。"],
    description: "プロダクトとピッチは、次の4つの観点から審査します。審査員として、Google のソフトウェアエンジニアが参加予定です。",
    criteria: [
      { title: "Google 技術の活用", body: "Gemini や Google Cloud などの Google 技術を、プロダクトの価値に結びつけて活用できているか。" },
      { title: "プロダクトの完成度", body: "実際に動き、使える状態まで作り込まれているか。体験の質と実装の完成度。" },
      { title: "社会課題への解決力", body: "現実の社会課題を捉え、意味のある解決策を示せているか。" },
      { title: "ピッチの構成と説明力", body: "課題・解決策・デモを分かりやすく構成し、プロダクトの魅力を伝えられているか。" },
    ],
    judges: {
      kicker: "JUDGES",
      title: "Google Software Engineers",
      body: "Google のソフトウェアエンジニアが、審査員として参加予定です。",
    },
  },
  finalCta: {
    kicker: "YOUR IDEA. SIX DAYS. ONE DEMO.",
    title: ["アイデアを、", "動く未来に。"],
    note: "参加受付は 11月4日（水）まで",
  },
  footer: {
    organizedBy: "主催",
    organizer: "Google Developer Groups on Campus Japan",
    copyright: "© 2026 DevFest GDGoC Japan Hackathon",
  },
  modal: {
    kicker: "BEFORE YOU APPLY",
    title: "応募対象を確認してください",
    description: "以下の条件を満たしていることを確認してから、応募ページへ進んでください。",
    sectionTitle: "応募対象",
    items: [
      "応募期間の開始時から賞品授与時（ハッカソン開催日当日）まで、日本国内の大学・大学院に在籍し、日本に居住する学生であること",
      "2 名以上 4 名以下のチームであること",
    ],
    memberLead: "チームメンバー全員が、以下の条件を満たしていること",
    memberItems: [
      "応募期間の開始時から賞品授与時（ハッカソン開催日当日）まで、日本国内の大学・大学院に在籍し、日本に居住していること",
      "応募時点で 18 歳以上であること",
    ],
    notes: [
      "異なる大学に所属するメンバー同士でのチーム編成も可能です",
      "ソフトウェア開発やコーディングの経験は問いません。ただし、AI を活用したプロダクト開発に関心があることが必要です",
      "留学生および外国籍の方も応募可能です。プログラムは日本語で進行するため、チーム活動、メンタリング、発表に参加できる日本語力が必要です",
    ],
    back: "戻る",
    continue: "応募ページへ進む",
    close: "応募条件を閉じる",
  },
};

export type Dictionary = typeof ja;

const en: Dictionary = {
  meta: {
    title: "DevFest GDGoC Japan Hackathon 2026 | Google Developer Groups on Campus Japan",
    description:
      "A six-day hackathon for university students across Japan, building with Google Cloud and Gemini. Kickoff Nov 1, Regional Day Nov 14, Demo Day Nov 27.",
  },
  common: {
    apply: "Apply",
    applyLong: "Apply to the hackathon",
    skip: "Skip to content",
    language: "Language",
    menu: "Menu",
    closeMenu: "Close menu",
    entryUntil: "Entries open until Wed, Nov 4",
    backToTop: "Back to top",
    openMap: "Open map",
  },
  nav: [
    { id: "about", label: "About" },
    { id: "schedule", label: "Schedule" },
    { id: "venues", label: "Venues" },
    { id: "prizes", label: "Prizes" },
    { id: "judging", label: "Judging" },
  ],
  hero: {
    tab: "STUDENT HACKATHON · NOV 2026",
    tagline: ["Six days to build.", "Connections that go beyond."],
    secondary: "See the schedule",
    keyDates: [
      { date: "11.01", day: "SUN", label: "Common Kickoff", meta: "ONLINE" },
      { date: "11.05–10", day: "THU–TUE", label: "Development", meta: "ONLINE" },
      { date: "11.14", day: "SAT", label: "Regional Day", meta: "4 VENUES + ONLINE" },
      { date: "11.27", day: "FRI", label: "Demo Day", meta: "TOP 10" },
    ],
  },
  marquee: [
    "DevFest GDGoC Japan Hackathon 2026",
    "Build with Google Cloud & Gemini",
    "Tokyo · Osaka · Nagoya · Aizu · Online",
    "Kickoff 11.01",
    "Demo Day 11.27",
    "#GDGOnCampus",
  ],
  countdown: {
    tab: "COUNTDOWN",
    label: "Countdown",
    prefix: "",
    units: { one: ["day", "hr", "min", "sec"], other: ["days", "hrs", "min", "sec"] },
    done: "That's a wrap on Demo Day. Thank you for building with us.",
    milestones: {
      kickoff: { until: "Common Kickoff starts in", when: "SUN, NOV 1 · ONLINE" },
      build: { until: "Development period starts in", when: "THU, NOV 5 · ONLINE" },
      regional: { until: "Regional Day starts in", when: "SAT, NOV 14 · ON-SITE" },
      demo: { until: "Demo Day starts in", when: "FRI, NOV 27 · 10:00 · GOOGLE SHIBUYA" },
    },
  },
  about: {
    kicker: "ABOUT",
    title: ["Six days to", "make ideas move."],
    description:
      "DevFest GDGoC Japan Hackathon 2026 brings students from across Japan together to build products with Google Cloud and Gemini in just six days. Development happens online on a shared schedule, and on November 14 teams gather at venues in their region for Regional Day.",
    cards: {
      who: { label: "WHO", value: "Students aged 18+", note: "Enrolled at a university or graduate school in Japan and living in Japan" },
      team: { label: "TEAM", value: "2–4", unit: "members per team", note: "Teams across different universities are welcome" },
      build: { label: "BUILD WITH", value: "Google Cloud / Gemini", note: "Google Cloud credits provided to participants" },
      venues: { label: "VENUES", value: "4 + Online", note: "Tokyo, Osaka, Nagoya, Aizu, and online" },
      demo: { label: "DEMO DAY", value: "TOP 10", note: "The top 10 teams present at Google's Shibuya office" },
      judges: { label: "JUDGES", value: "Google Software Engineers", note: "Software engineers from Google are scheduled to join as judges" },
    },
    chips: ["No coding experience required", "For anyone interested in building with AI", "International students welcome (run in Japanese)"],
  },
  schedule: {
    kicker: "SCHEDULE",
    title: ["Six days of", "focused building."],
    description:
      "Themes are revealed at the Kickoff on November 1. From November 5 to 10, every team builds online on the same schedule. After Regional Day on November 14, the top 10 teams move on to Demo Day on November 27.",
    calendarTab: "NOVEMBER 2026",
    weekdays: ["S", "M", "T", "W", "T", "F", "S"],
    note: "* Times other than Demo Day will be announced once confirmed.",
    phases: {
      kickoff: { date: "11.01", day: "SUN", title: "Common Kickoff", mode: "ONLINE", detail: "Theme reveal and rules briefing. Participants from across Japan meet online.", legend: "Kickoff" },
      entry: { date: "→11.04", day: "WED", title: "Entries close", mode: "ENTRY", detail: "Entries stay open after the Kickoff, until November 4.", legend: "Entry window" },
      build: { date: "11.05–11.10", day: "THU–TUE", title: "Development Period", mode: "ONLINE · ALL VENUES", detail: "Six days on one shared schedule: plan, build, test, and submit — all online.", legend: "Development" },
      regional: { date: "11.14", day: "SAT", title: "Regional Day", mode: "ON-SITE", detail: "Held on the same day at venues in Tokyo, Osaka, Nagoya, and Aizu, plus online.", legend: "Regional Day" },
      demo: { date: "11.27", day: "FRI", title: "Demo Day", mode: "ON-SITE · 10:00–12:00", detail: "The top 10 teams gather at Google's Shibuya office to present, be judged, and receive awards.", legend: "Demo Day" },
      devfest: { date: "11.29", day: "SUN", title: "DevFest Tokyo", mode: "WINNERS", detail: "A lightning talk by the winning team and a student showcase by award-winning teams.", legend: "DevFest Tokyo" },
    },
  },
  venues: {
    kicker: "VENUES",
    title: ["Across regions,", "building together."],
    description:
      "Regional Day on November 14 takes place on the same day at four venues across Japan and online. Meet builders in your region and connect with the community nationwide.",
    regionalTag: "REGIONAL DAY · SAT, NOV 14",
    list: {
      tokyo: { city: "TOKYO", region: "Tokyo", name: "Mercari HQ", place: "Roppongi Hills Mori Tower", address: "6-10-1 Roppongi, Minato-ku, Tokyo" },
      osaka: { city: "OSAKA", region: "Osaka", name: "INOGATE OSAKA — ENZALINA", place: "Directly connected to JR Osaka Station (West Exit)", address: "3-2-123 Umeda, Kita-ku, Osaka" },
      nagoya: { city: "NAGOYA", region: "Nagoya", name: "Nagoya University", place: "名古屋大学", address: "Nagoya, Aichi" },
      aizu: { city: "AIZU", region: "Aizu", name: "The University of Aizu", place: "会津大学", address: "Aizuwakamatsu, Fukushima" },
      online: { city: "ONLINE", region: "Online", name: "Online venue", place: "From anywhere in Japan", address: "Join from home or your campus" },
    },
    demo: {
      kicker: "DEMO DAY VENUE",
      name: "Google Shibuya Office",
      address: "Shibuya, Tokyo",
      date: "Fri, Nov 27",
      time: "10:00–12:00",
      tag: "TOP 10 TEAMS ONLY",
      travel: "Finalists receive travel support to get to Tokyo for Demo Day.",
    },
  },
  prizes: {
    kicker: "PRIZES",
    title: ["Beyond the win,", "your next stage."],
    description:
      "Teams selected at Demo Day head to DevFest Tokyo on November 29, sharing what they built with many more developers through a lightning talk and the student showcase.",
    grand: {
      tab: "GRAND PRIZE",
      title: "Winning team",
      lead: "A stage and a booth at DevFest Tokyo.",
      badges: [
        { role: "SPEAKER", title: "Lightning talk slot", note: "Present your product in a lightning talk on the DevFest Tokyo stage" },
        { role: "EXHIBITOR", title: "Student showcase slot", note: "Exhibit the product you built during the hackathon at DevFest Tokyo" },
      ],
      badgeEvent: "DevFest Tokyo",
      badgeDate: "11.29 SUN",
      perksTitle: "The winning team also receives",
      perks: [
        "Google hardware",
        "The winner's trophy",
        "A chance to present to Google engineering leadership",
        "A lunch session with Google's internship recruiting team",
      ],
    },
    google: {
      kicker: "GOOGLE INTERNSHIP / NEW GRAD",
      title: "Opportunities related to Google Internship / New Grad recruiting — for the winning team.",
      body: "Software engineers from Google are scheduled to judge. The winning team also gets to present to Google engineering leadership and join a lunch session with Google's internship recruiting team.",
      disclaimer: "* This does not guarantee an internship, employment, or any outcome in Google's hiring process.",
    },
    organizer: {
      kicker: "GDG TOKYO ORGANIZER AWARD",
      title: "GDG Tokyo Organizer Award",
      count: "4",
      unit: "teams",
      body: "Four teams chosen for the GDG Tokyo Organizer Award receive a student showcase slot at DevFest Tokyo on November 29.",
      role: "EXHIBITOR × 4",
    },
    travel: {
      kicker: "FOR FINALISTS",
      title: "Travel Support",
      body: "Finalists (the top 10 teams) receive support for travel to Tokyo to attend Demo Day.",
      note: "Eligibility and limits will be announced once finalized.",
    },
    credit: {
      kicker: "FOR ALL PARTICIPANTS",
      title: "Google Cloud Credit",
      body: "Every participant receives Google Cloud credits to use for development.",
    },
    exhibitionNote: "At the DevFest Tokyo student showcase, teams exhibit the products they built during the hackathon.",
  },
  judging: {
    kicker: "JUDGING",
    title: ["Judged on", "four criteria."],
    description: "Products and pitches are evaluated on the four criteria below. Software engineers from Google are scheduled to join the judging panel.",
    criteria: [
      { title: "Use of Google technology", body: "How well Google technologies such as Gemini and Google Cloud are used to create real value." },
      { title: "Product completeness", body: "Whether it actually works and is usable — the quality of the experience and the build." },
      { title: "Impact on social challenges", body: "Whether it tackles a real social challenge with a meaningful solution." },
      { title: "Pitch structure & clarity", body: "How clearly the pitch frames the problem, the solution, and the demo." },
    ],
    judges: {
      kicker: "JUDGES",
      title: "Google Software Engineers",
      body: "Software engineers from Google are scheduled to join as judges.",
    },
  },
  finalCta: {
    kicker: "YOUR IDEA. SIX DAYS. ONE DEMO.",
    title: ["Turn your idea", "into what's next."],
    note: "Entries close Wednesday, November 4",
  },
  footer: {
    organizedBy: "Organized by",
    organizer: "Google Developer Groups on Campus Japan",
    copyright: "© 2026 DevFest GDGoC Japan Hackathon",
  },
  modal: {
    kicker: "BEFORE YOU APPLY",
    title: "Check that you're eligible",
    description: "Please confirm that you meet the requirements below before continuing to the application page.",
    sectionTitle: "Eligibility",
    items: [
      "From the start of the application period until prizes are awarded (the day of the hackathon event), you are a student enrolled at a university or graduate school in Japan and living in Japan",
      "You apply as a team of 2 to 4 members",
    ],
    memberLead: "Every team member meets the following",
    memberItems: [
      "Enrolled at a university or graduate school in Japan and living in Japan from the start of the application period until prizes are awarded (the day of the hackathon event)",
      "Aged 18 or older at the time of application",
    ],
    notes: [
      "Teams may include members from different universities",
      "No software development or coding experience is required, but you must be interested in building products with AI",
      "International students and non-Japanese nationals are welcome. The program is run in Japanese, so you need enough Japanese to take part in team activities, mentoring, and presentations",
    ],
    back: "Back",
    continue: "Continue to application",
    close: "Close eligibility details",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { ja, en };
