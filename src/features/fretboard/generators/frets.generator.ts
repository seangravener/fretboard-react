import { Fret, FretNumber } from "../types";
import { calcNoteAtFret } from "../utils/fretboard.utils";

export const generateFrets = (
  numOfFrets: FretNumber,
  openNote: string,
  startAtFret: FretNumber = 0,
  highlightedFret: FretNumber = 0
): Fret[] => {
  const createFret = (_: undefined, index: number): Fret => {
    // Skip fret 0 for open/muted state
    if (index === 0) {
      return {
        fretNumber: 0 as FretNumber,
        isHighlighted: highlightedFret === 0,
        note: openNote,
      };
    }

    const adjustedFretNumber = (index + startAtFret) as FretNumber;
    return {
      fretNumber: adjustedFretNumber,
      isHighlighted: highlightedFret === adjustedFretNumber,
      note: calcNoteAtFret(openNote, adjustedFretNumber),
    };
  };

  return Array.from({ length: numOfFrets + 1 }, createFret);
};
