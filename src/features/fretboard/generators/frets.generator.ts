import { OPEN_FRET, SHIFT_START_AT_FRET } from "../constants";
import { Fret, FretNumber } from "../types";
import { calcNoteAtFret } from "../utils/fretboard.utils";

export const generateFrets = (
  numOfFrets: FretNumber,
  openNote: string,
  startAtFret: FretNumber,
  highlightedFret: FretNumber
): Fret[] => {
  const createFret = (_: undefined, index: number): Fret => {
    if (index === OPEN_FRET) {
      return {
        fretNumber: index,
        isHighlighted: highlightedFret === index,
        note: openNote,
      };
    }

    const adjustedFretNumber = (index +
      (startAtFret >= SHIFT_START_AT_FRET ? startAtFret - 1 : 0)) as FretNumber;

    return {
      fretNumber: adjustedFretNumber,
      isHighlighted: highlightedFret === adjustedFretNumber,
      note: calcNoteAtFret(openNote, adjustedFretNumber),
    };
  };

  return Array.from({ length: numOfFrets + 1 }, createFret);
};
