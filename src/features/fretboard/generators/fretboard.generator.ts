import { Fretboard, FretNumber, StringNumber, Tuning } from "../types";
import { generateString } from "./string.generator";

export const generateFretboard = (
  tuning: Tuning,
  numFrets: FretNumber,
  highlightedFretsByString: FretNumber[][] = []
): Fretboard => {
  return {
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
