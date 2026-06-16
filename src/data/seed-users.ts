import type { UserRecord } from "@/store/app-store";

const names: Array<[string, string]> = [
  ["Arthur Sterling", "arthur-sterling"],
  ["Elena Rossi", "elena-rossi"],
  ["Julian Vane", "julian-vane"],
  ["Kenji Sato", "kenji-sato"],
  ["Sia Montgomery", "sia-montgomery"],
  ["Marcus Drago", "marcus-drago"],
  ["Rothschild IX", "rothschild-ix"],
  ["Vanderbilt Elite", "vanderbilt-elite"],
  ["Silversmith Co", "silversmith-co"],
  ["Lucia Marquez", "lucia-marquez"],
  ["Hiroshi Tanaka", "hiroshi-tanaka"],
  ["Olivia Crane", "olivia-crane"],
  ["Dmitri Volkov", "dmitri-volkov"],
  ["Amara Okafor", "amara-okafor"],
  ["Jasper Holt", "jasper-holt"],
  ["Noor Khalil", "noor-khalil"],
  ["Renata Ferreira", "renata-ferreira"],
  ["Cassius Beaumont", "cassius-beaumont"],
  ["Maya Lindqvist", "maya-lindqvist"],
  ["Theo Ashworth", "theo-ashworth"],
  ["Ivan Petrov", "ivan-petrov"],
  ["Sofia Marchetti", "sofia-marchetti"],
  ["Leonardo Cruz", "leonardo-cruz"],
  ["Anya Sokolova", "anya-sokolova"],
  ["Hugo Laurent", "hugo-laurent"],
  ["Mira Patel", "mira-patel"],
  ["Beatrix Wynn", "beatrix-wynn"],
  ["Otto Bergmann", "otto-bergmann"],
  ["Camille Dubois", "camille-dubois"],
  ["Felix Aldridge", "felix-aldridge"],
  ["Vera Costa", "vera-costa"],
  ["Nikolai Orlov", "nikolai-orlov"],
  ["Imogen Hart", "imogen-hart"],
  ["Rafael Mendes", "rafael-mendes"],
  ["Astrid Lund", "astrid-lund"],
  ["Tobias Reinhardt", "tobias-reinhardt"],
  ["Salome Iversen", "salome-iversen"],
  ["Cyrus Vahid", "cyrus-vahid"],
  ["Delphine Aubry", "delphine-aubry"],
  ["Konrad Stein", "konrad-stein"],
  ["Penelope Voss", "penelope-voss"],
  ["Yusuf Demir", "yusuf-demir"],
  ["Lila Brennan", "lila-brennan"],
  ["Augustin Marchand", "augustin-marchand"],
  ["Tatiana Reyes", "tatiana-reyes"],
  ["Magnus Holmberg", "magnus-holmberg"],
  ["Ines Carvalho", "ines-carvalho"],
  ["Roman Albescu", "roman-albescu"],
  ["Esme Whitlock", "esme-whitlock"],
  ["Bruno Salvatore", "bruno-salvatore"],
];

const countries = ["US", "UK", "JP", "FR", "DE", "IT", "BR", "AE", "SG", "CH"];

export const buildSeedUsers = (): UserRecord[] => {
  // Deterministic pseudo-random so order is stable across reloads
  return names.map(([name, username], i) => {
    const seed = (i + 1) * 7919;
    const totalPaid = Math.floor(
      Math.max(50, 2_500_000 / (i + 1) - ((seed % 1000) * (i + 1) * 3)),
    );
    const joinDaysAgo = 30 + ((seed * 13) % 720);
    const joinDate = new Date(Date.now() - joinDaysAgo * 86400000).toISOString();
    return {
      id: `seed-${i + 1}`,
      username,
      displayName: name,
      points: totalPaid,
      totalPaid,
      country: countries[i % countries.length],
      joinDate,
      bio: "",
      avatarUrl: null,
      achievements: [],
      lastUpdated: new Date().toISOString(),
    } satisfies UserRecord;
  });
};