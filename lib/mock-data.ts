// lib/mock-data.ts
export const allNews = [
  {
    slug: "wichtiger-heimsieg",
    title: "Wichtiger Heimsieg in letzter Minute",
    summary:
      "Ein spätes Tor von Thomas Blum sichert dem VfB 05 drei Punkte im Derby.",
    image: "/placeholder-news-1.png",
    date: "2025-09-19",
  },
  {
    slug: "neuer-trikotsponsor",
    title: "Neuer Trikotsponsor für die kommende Saison",
    summary:
      "Der Verein freut sich, eine neue Partnerschaft mit einem lokalen Unternehmen bekannt zu geben.",
    image: "/placeholder-news-2.png",
    date: "2025-09-15",
  },
  {
    slug: "jugendturnier-erfolg",
    title: "U17 gewinnt prestigeträchtiges Jugendturnier",
    summary:
      "Unsere Jugendmannschaft zeigt eine beeindruckende Leistung und holt den Pokal nach Hause.",
    image: "/placeholder-news-3.png",
    date: "2025-09-12",
  },
  {
    slug: "vereinsfest-ankündigung",
    title: "Ankündigung: Großes Sommer-Vereinsfest",
    summary:
      "Am 30. September laden wir alle Mitglieder, Freunde und Förderer herzlich ein.",
    image: "/placeholder-news-4.png",
    date: "2025-09-10",
  },
];

export const teamRosters: {
  [key: string]: { num: number; name: string; pos: string }[];
} = {
  "erste-herren": [
    { num: 1, name: "Jan Schmidt", pos: "Torwart" },
    { num: 4, name: "Lukas Weber", pos: "Verteidigung" },
    { num: 5, name: "Klaus Fischer", pos: "Verteidigung" },
    { num: 6, name: "Jonas Becker", pos: "Mittelfeld" },
    { num: 10, name: "Peter Schmidt", pos: "Mittelfeld" },
    { num: 9, name: "Thomas Blum", pos: "Sturm" },
  ],
};

export const teamSchedules: {
  [key: string]: { date: string; opponent: string; result: string }[];
} = {
  "erste-herren": [
    { date: "2025-09-14", opponent: "FC Pesch", result: "3:1 (S)" },
    { date: "2025-09-21", opponent: "SC West Köln", result: "2:2 (U)" },
    { date: "2025-09-28", opponent: "Fortuna Köln II", result: "Ausstehend" },
    { date: "2025-10-05", opponent: "SpVg Flittard", result: "Ausstehend" },
  ],
};

export const leagueTables: {
  [key: string]: { pos: number; team: string; pts: number; gd: string }[];
} = {
  "erste-herren": [
    { pos: 1, team: "SpVg Flittard", pts: 30, gd: "+25" },
    { pos: 2, team: "VfB 05 Köln", pts: 26, gd: "+19" },
    { pos: 3, team: "FC Pesch", pts: 25, gd: "+15" },
    { pos: 4, team: "SC West Köln", pts: 22, gd: "+12" },
  ],
};

export const allTeams = [
  {
    slug: "erste-herren",
    name: "1. Herren",
    league: "Kreisliga A",
    coach: "Klaus Fischer",
    image: "/placeholder-team-1.jpg",
  },
  {
    slug: "zweite-herren",
    name: "2. Herren",
    league: "Kreisliga C",
    coach: "Peter Schmidt",
    image: "/placeholder-team-2.jpg",
  },
  {
    slug: "alte-herren",
    name: "Alte Herren",
    league: "Freizeitliga",
    coach: "Wolfgang Weber",
    image: "/placeholder-team-3.jpg",
  },
  {
    slug: "u19-junioren",
    name: "U19-Junioren",
    league: "Sonderliga",
    coach: "Thomas Schneider",
    image: "/placeholder-team-4.jpg",
  },
  {
    slug: "u17-junioren",
    name: "U17-Junioren",
    league: "Bezirksliga",
    coach: "Michael Wagner",
    image: "/placeholder-team-5.jpg",
  },
];
