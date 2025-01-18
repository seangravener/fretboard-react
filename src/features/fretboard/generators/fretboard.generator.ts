import { INITIAL_HIGHLIGHTED_FRETS } from "../constants";
import {
  Fretboard,
  FretNumber,
  FretPositions,
  StringNumber,
  Tuning,
} from "../types";
import { generateString } from "./string.generator";

export const generateFretboard = (
  tuning: Tuning,
  numFrets: FretNumber,
  highlightedFretPositions: FretPositions = INITIAL_HIGHLIGHTED_FRETS
): Fretboard => {
  return {
    strings: tuning.map((openNote, index) => {
      const highlightedFretPosition =
        highlightedFretPositions[index] < 0 || !highlightedFretPositions[index]
          ? (-1 as FretNumber)
          : (highlightedFretPositions[index] as FretNumber);

      return generateString(
        (index + 1) as StringNumber,
        openNote,
        numFrets,
        highlightedFretPosition
      );
    }),
  };
};
