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
    strings: tuning.map((openNote, index) =>
      generateString(
        (index + 1) as StringNumber,
        openNote,
        numFrets,
        highlightedFretPositions[index]
      )
    ),
  };
};
