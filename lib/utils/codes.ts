const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function createInviteCode(length = 6) {
  return Array.from({ length }, () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]).join("");
}
