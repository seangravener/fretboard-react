import {
  Fret,
  Fretboard,
  FretNumber,
  GuitarString,
  StringNumber,
  Tuning,
} from "../types";
import { calcNoteAtFret, isStringOpen } from "../util";

export const generateString = (
  stringNumber: StringNumber,
  openNote: string,
  numFrets: FretNumber,
  highlightedFrets: number[] = []
): GuitarString => {
  const createFret = (_: undefined, index: number): Fret => ({
    fretNumber: index as FretNumber,

    // Muted: (frets[0].isHighlighted === false)
    // Open String: (frets[0].isHighlighted === true)
    isHighlighted: highlightedFrets.includes(index as FretNumber),
    note: calcNoteAtFret(openNote, index as FretNumber),
  });

  const frets: Fret[] = Array.from({ length: numFrets + 1 }, createFret);

  return {
    stringNumber,
    openNote,
    isOpen: frets[0].isHighlighted,
    frets,
  };
};

export const generateFretboard = (
  tuning: Tuning,
  numFrets: FretNumber,
  highlightedFretsByString: number[][] = []
): Fretboard => {
  return {
    currentNotes: [], // a) remove or b) calculate value
    strings: tuning.map((openNote, index) =>
      generateString(
        (index + 1) as StringNumber,
        openNote,
        numFrets,
        highlightedFretsByString[index + 1] || []
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
