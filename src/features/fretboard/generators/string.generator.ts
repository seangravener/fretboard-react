import { Fret, FretNumber, FretboardString, StringNumber } from "../types";
import { generateFrets } from "./frets.generator";

// Highlighted = open/active/playing
// Not highlighted = inactive/muted

export const generateString = (
  stringNumber: StringNumber,
  openNote: string,
  numFrets: FretNumber,
  highlightedFret: FretNumber
): FretboardString => {
  const frets: Fret[] = generateFrets(numFrets, openNote, highlightedFret);

  return {
    stringNumber,
    openNote,
    frets,
  };
};
