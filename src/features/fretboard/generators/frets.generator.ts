import { OPEN_FRET_NUM, FIRST_VISIBLE_FRET } from "../constants";
import { Fret, FretNumber } from "../types";
import { calcNoteAtFret } from "../utils/fretboard.utils";

export const generateFrets = (
  numOfFrets: FretNumber,
  openNote: string,
  startAtFret: FretNumber,
  highlightedFret: FretNumber
): Fret[] => {
  const createFret = (_: undefined, index: number): Fret => {
    if (index === OPEN_FRET_NUM) {
      return {
        fretNumber: index,
        isHighlighted: highlightedFret === index,
        note: openNote,
      };
    }

    const adjustedFretNumber = (index +
      (startAtFret >= FIRST_VISIBLE_FRET ? startAtFret - 1 : 0)) as FretNumber;

    return {
      fretNumber: adjustedFretNumber,
      isHighlighted: highlightedFret === adjustedFretNumber,
      note: calcNoteAtFret(openNote, adjustedFretNumber),
    };
  };

  return Array.from({ length: numOfFrets + 1 }, createFret);
};

export const generateFrettedFretPositions = (
  currentPositions: FretPositions,
  stringFretPairs: {
    stringNumber: StringNumber;
    fretNumber: FretNumber;
  }[]
): FretPositions => {
  return currentPositions.map(
    (currentPosition, indexPosition) =>
      updateFretPositions(currentPosition, indexPosition, stringFretPairs)[0]
  ) as FretPositions;
};

export const updateFretPositions = (
  currentPosition: FretNumber,
  indexPosition: number,
  stringFretPairs: StringFretPair[]
): FretNumber[] => {
  const currentString = indexPosition + 1;
  const matchingPair = stringFretPairs.find(
    (pair) => pair.stringNumber === currentString
  );

  return [matchingPair ? matchingPair.fretNumber : currentPosition];
};
