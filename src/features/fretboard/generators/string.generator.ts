import { INITIAL_TUNING } from "../constants";
import {
  Fret,
  FretNumber,
  FretboardString,
  FrettedStringPositions,
  StringNumber,
} from "../types";
import { generateFrets } from "./frets.generator";
import { ChromaticNote } from "../types";

// Highlighted = open/active/playing
// Not highlighted = inactive/muted

export const generateString = (
  stringNumber: StringNumber,
  openNote: string,
  numFrets: FretNumber,
  startAtFret: FretNumber,
  highlightedFret: FretNumber
): FretboardString => {
  const frets: Fret[] = generateFrets(
    numFrets,
    openNote,
    startAtFret,
    highlightedFret
  );

  return {
    stringNumber,
    openNote,
    frets,
  };
};

export const generateStrings = (
  stringNumber: StringNumber,
  numFrets: FretNumber,
  startAtFret: FretNumber,
  highlightedFrets: FrettedStringPositions
): FretboardString[] => {
  return INITIAL_TUNING.flatMap((openNote: ChromaticNote) => {
    return highlightedFrets.map((fretNumber) => {
      if (!fretNumber) {
        fretNumber = -1;
      }

      return generateString(
        stringNumber,
        openNote,
        numFrets,
        startAtFret,
        fretNumber
      );
    });
  });
};
