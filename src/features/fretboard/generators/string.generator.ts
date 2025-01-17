import { Fret, FretNumber, GuitarString, StringNumber } from "../types";
import { generateFrets } from "./frets.generator";

// Highlighted = open/active/playing
// Not highlighted = inactive/muted

export const generateString = (
  stringNumber: StringNumber,
  openNote: string,
  numFrets: FretNumber,
  highlightedFrets: FretNumber[] = []
): GuitarString => {
  const frets: Fret[] = generateFrets(numFrets, openNote, highlightedFrets);

  return {
    stringNumber,
    openNote,
    frets,
    isOpen: frets[0].isHighlighted, // redundant?
  };
};
