import { INITIAL_HIGHLIGHTED_FRETS } from "../constants";
import { generateString } from "./string.generator";

import {
  Fretboard,
  FretNumber,
  FretPositions,
  StringNumber,
  Tuning,
} from "../types";

export const generateFretboard = (
  tuning: Tuning,
  numFrets: FretNumber,
  highlightedFretPositions: FretPositions = INITIAL_HIGHLIGHTED_FRETS
): Fretboard => {
  return {
    strings: tuning.map((openNote, index) => {
      const currentFret = highlightedFretPositions[index];
      const highlightedFret =
        currentFret === -1 ? (-1 as FretNumber) : (currentFret as FretNumber);

      return generateString(
        (index + 1) as StringNumber,
        openNote,
        numFrets,
        highlightedFret
      );
    }),
  };
};

export const generateAsciiFretboard = (fretboard: Fretboard): string => {
  const header = fretboard.strings
    .map((string) => string.openNote)
    .reverse()
    .join(" "); // Open notes as header
  const divider = " " + "_".repeat(fretboard.strings[0].frets.length * 2 - 1); // Horizontal divider

  const rows = fretboard.strings
    .map((guitarString) => {
      // Create a text row for each string
      const stringRepresentation = guitarString.frets
        .map((fret) => (fret.isHighlighted ? "X" : "|"))
        .join(" ");
      return `| ${stringRepresentation}`;
    })
    .reverse(); // Flip strings to match visual order (low E on top)

  return `${header}\n${divider}\n${rows.join("\n")}`;
};
