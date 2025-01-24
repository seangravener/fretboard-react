import { INITIAL_TUNING, MUTED_FRET } from "../constants";
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
  numOfFrets: FretNumber,
  startAtFret: FretNumber,
  highlightedFrets: FrettedStringPositions
): FretboardString[] => {
  return INITIAL_TUNING.map((openNote: ChromaticNote, index) => {
    const highlightedFret = highlightedFrets[index] ?? MUTED_FRET;

    return generateString(
      (index + 1) as StringNumber,
      openNote,
      numOfFrets,
      startAtFret,
      highlightedFret
    );
  });
};
