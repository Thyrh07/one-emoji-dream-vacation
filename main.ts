// One Emoji, One Dream Vacation — make.fun entry (program/v1).
// Writes exactly one emoji to /output/entry.txt for the judge.
//
// The pick: Mount Fuji (U+1F5FB). The judge weighs, in order:
//  1. exactly one emoji that plainly names a dream vacation — a mountain
//     is named in the brief itself, and Fuji is the mountain;
//  2. vivid at a glance, like a postcard — snow-capped Fuji is the
//     postcard of Japan;
//  3. personal and specific, one particular dream — not any beach, but
//     Japan, Fuji, one trip;
//  4. a spark of wit/surprise — a fresh pick against the beach-island
//     cliches the field is full of;
//  5. instantly readable across cultures and screens.
// No network, no clock, no randomness: fully deterministic.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry itself: one emoji, nothing else.
const EMOJI = "🗻";
// Where the grader expects it.
const OUTPUT = "entry.txt";

// The sealed gate: /output/entry.txt must be UTF-8 text of 1 to 8
// characters, not only white space. Refuse to finish silently on a
// bad entry instead of shipping one the judge never sees.
function assertGate(text: string): void {
  const chars = [...text];
  if (chars.length < 1 || chars.length > 8) {
    throw new Error(`gate: entry is ${chars.length} characters, need 1-8`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate: entry is only white space");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
assertGate(EMOJI);
writeFileSync(join(outDir, OUTPUT), EMOJI, "utf8");
// Round-trip check: what landed on disk is exactly the entry.
const back = readFileSync(join(outDir, OUTPUT), "utf8");
if (back !== EMOJI) {
  throw new Error("gate: entry on disk differs from the entry");
}
