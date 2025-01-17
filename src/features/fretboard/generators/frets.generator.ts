import { Fret, FretNumber } from "../types";
import { calcNoteAtFret } from "../utils/fretboard.utils";

export const generateFrets = (
  numFrets: FretNumber,
  openNote: string,
  highlightedFrets: FretNumber[]
): Fret[] => {
  const createFret = (_: undefined, index: number): Fret => ({
    fretNumber: index as FretNumber,
    isHighlighted: highlightedFrets.includes(index as FretNumber),
    note: calcNoteAtFret(openNote, index as FretNumber),
  });

  return Array.from({ length: numFrets + 1 }, createFret);
};
