import { getTeam } from "./teams";

export type Match = {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  kickoff: string;
  venue: string;
  facts: string[];
};

export const matches: Match[] = [
  {
    id: "match-001",
    homeTeamId: "arg",
    awayTeamId: "ksa",
    kickoff: "2026-06-11T18:00:00Z",
    venue: "Estadio Azteca",
    facts: [
      "Argentina enter with one of the tournament's deepest attacking rotations.",
      "Saudi Arabia's compact midfield makes early tempo control important.",
      "Set pieces could tilt a match expected to be tight before halftime."
    ]
  },
  {
    id: "match-002",
    homeTeamId: "usa",
    awayTeamId: "wal",
    kickoff: "2026-06-12T01:00:00Z",
    venue: "SoFi Stadium",
    facts: [
      "The United States press most aggressively after opponent goal kicks.",
      "Wales are dangerous when transitions start from the left channel.",
      "Both teams rely on wide service, so fullback matchups should matter."
    ]
  },
  {
    id: "match-003",
    homeTeamId: "fra",
    awayTeamId: "den",
    kickoff: "2026-06-13T20:00:00Z",
    venue: "MetLife Stadium",
    facts: [
      "France's forwards thrive when they can isolate defenders in space.",
      "Denmark's back three can become a five when protecting a lead.",
      "The midfield duel may decide how many clean chances France generate."
    ]
  },
  {
    id: "match-004",
    homeTeamId: "bra",
    awayTeamId: "sui",
    kickoff: "2026-06-14T22:00:00Z",
    venue: "AT&T Stadium",
    facts: [
      "Brazil can rotate creators without losing one-on-one threat.",
      "Switzerland defend the box well and rarely give up central lanes.",
      "An early Brazil goal would force Switzerland into a more open shape."
    ]
  }
];

export function getMatch(id: string) {
  // FUTURE: replace with live match API
  return matches.find((match) => match.id === id);
}

export function getMatchTeams(match: Match) {
  // FUTURE: replace with live match API
  return {
    home: getTeam(match.homeTeamId),
    away: getTeam(match.awayTeamId)
  };
}
