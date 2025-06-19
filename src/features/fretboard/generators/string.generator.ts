import { Fret, FretNumber, FretPositions, FretboardString, StringNumber } from "../types";
import { generateFrets } from "./frets.generator";
import { ChromaticNote } from "../types";
import { INITIAL_TUNING, MUTED_FRET_NUM } from "../constants";

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
    const highlightedFret = highlightedFrets[index] ?? (0 as FretNumber);

    return generateString(
      (index + 1) as StringNumber,
      openNote,
      numOfFrets,
      startAtFret,
      highlightedFret
    );
  });
};
