import { Fretboard } from "../types";

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
