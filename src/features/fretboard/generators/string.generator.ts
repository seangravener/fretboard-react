import { INITIAL_TUNING, MUTED_FRET_NUM } from "../constants";
import {
  Fret,
  FretNumber,
  FretboardString,
  FretPositions,
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
  numOfFrets: FretNumber,
  startAtFret: FretNumber,
  highlightedFrets: FretPositions
): FretboardString[] => {
  return INITIAL_TUNING.map((openNote: ChromaticNote, index) => {
    const highlightedFret = highlightedFrets[index] ?? MUTED_FRET_NUM;

    return generateString(
      (index + 1) as StringNumber,
      openNote,
      numOfFrets,
      startAtFret,
      highlightedFret
    );
  });
};
