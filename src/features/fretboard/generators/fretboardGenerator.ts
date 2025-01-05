import { Fret, Fretboard, GuitarString } from "../types";
import { calcNoteAtFret } from "../util";

export const generateString = (
  stringNumber: number,
  openNote: string,
  numFrets: number,
  highlightedFrets: number[] = []
): GuitarString => {
  const createFret = (_: string, fretNumber: number) => ({
    fretNumber,
    isHighlighted: highlightedFrets.includes(fretNumber),
    note: calcNoteAtFret(openNote, fretNumber),
  });
  const frets: Fret[] = Array.from({ length: numFrets + 1 }, createFret);

  return { stringNumber, openNote, frets };
};

export const generateFretboard = (
  tuning: string[],
  numFrets: number,
  highlightedFretsByString: number[][] = []
): Fretboard => {
  return {
    strings: tuning.map((openNote, index) =>
      generateString(
        index + 1,
        openNote,
        numFrets,
        highlightedFretsByString[index] || []
      )
    ),
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
