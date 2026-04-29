export type Team = {
  id: string;
  name: string;
  flag: string;
  group: "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
};

export const teams: Team[] = [
  { id: "qat", name: "Qatar", flag: "🇶🇦", group: "A" },
  { id: "ecu", name: "Ecuador", flag: "🇪🇨", group: "A" },
  { id: "sen", name: "Senegal", flag: "🇸🇳", group: "A" },
  { id: "ned", name: "Netherlands", flag: "🇳🇱", group: "A" },
  { id: "eng", name: "England", flag: "🇬🇧", group: "B" },
  { id: "irn", name: "Iran", flag: "🇮🇷", group: "B" },
  { id: "usa", name: "United States", flag: "🇺🇸", group: "B" },
  { id: "wal", name: "Wales", flag: "🏴", group: "B" },
  { id: "arg", name: "Argentina", flag: "🇦🇷", group: "C" },
  { id: "ksa", name: "Saudi Arabia", flag: "🇸🇦", group: "C" },
  { id: "mex", name: "Mexico", flag: "🇲🇽", group: "C" },
  { id: "pol", name: "Poland", flag: "🇵🇱", group: "C" },
  { id: "fra", name: "France", flag: "🇫🇷", group: "D" },
  { id: "aus", name: "Australia", flag: "🇦🇺", group: "D" },
  { id: "den", name: "Denmark", flag: "🇩🇰", group: "D" },
  { id: "tun", name: "Tunisia", flag: "🇹🇳", group: "D" },
  { id: "esp", name: "Spain", flag: "🇪🇸", group: "E" },
  { id: "crc", name: "Costa Rica", flag: "🇨🇷", group: "E" },
  { id: "ger", name: "Germany", flag: "🇩🇪", group: "E" },
  { id: "jpn", name: "Japan", flag: "🇯🇵", group: "E" },
  { id: "bel", name: "Belgium", flag: "🇧🇪", group: "F" },
  { id: "can", name: "Canada", flag: "🇨🇦", group: "F" },
  { id: "mar", name: "Morocco", flag: "🇲🇦", group: "F" },
  { id: "cro", name: "Croatia", flag: "🇭🇷", group: "F" },
  { id: "bra", name: "Brazil", flag: "🇧🇷", group: "G" },
  { id: "srb", name: "Serbia", flag: "🇷🇸", group: "G" },
  { id: "sui", name: "Switzerland", flag: "🇨🇭", group: "G" },
  { id: "cmr", name: "Cameroon", flag: "🇨🇲", group: "G" },
  { id: "por", name: "Portugal", flag: "🇵🇹", group: "H" },
  { id: "gha", name: "Ghana", flag: "🇬🇭", group: "H" },
  { id: "uru", name: "Uruguay", flag: "🇺🇾", group: "H" },
  { id: "kor", name: "South Korea", flag: "🇰🇷", group: "H" }
];

export function getTeam(id?: string | null) {
  return teams.find((team) => team.id === id);
}
