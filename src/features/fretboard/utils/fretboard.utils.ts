import { CHROMATIC_SCALE } from "../constants";
import {
  ChromaticNote,
  Fret,
  Fretboard,
  FretboardString,
  FretNumber,
  FrettedStringPositions,
} from "../types";

export const getCurrentNotes = (fretboard: Fretboard): ChromaticNote[] => {
  return fretboard.strings.flatMap((string) =>
    string.frets.filter((fret) => fret.isHighlighted).map((fret) => fret.note)
  );
};

// @TODO
//  1. Return proper Fret {} object (not just the fretNumber)
//  2. Use name FrettedPositions for return type
export const getActiveFrets = (
  fretboard: Fretboard
): FrettedStringPositions => {
  const inactiveFret: Fret = {
    fretNumber: 0 as FretNumber,
    isHighlighted: false,
    note: "",
  };

  return fretboard.strings.map(
    (string) =>
      string.frets.filter((fret) => fret.isHighlighted).at(-1) ?? inactiveFret
  ) as unknown as FrettedStringPositions;
};

export const calcNoteAtFret = (
  openNote: string,
  fretNumber: FretNumber
): string => {
  const openNoteIndex = CHROMATIC_SCALE.indexOf(openNote);

  if (openNoteIndex === -1) {
    throw new Error(`Invalid note: ${openNote}`);
  }

  const calculatedNote =
    CHROMATIC_SCALE[(openNoteIndex + fretNumber) % CHROMATIC_SCALE.length];

  return calculatedNote;
};

export const isStringOpen = (string: FretboardString): boolean => {
  return string.frets.some(
    (fret) => fret.fretNumber === 0 && fret.isHighlighted
  );
};

export const getStringIndicator = (string: FretboardString): "O" | "X" =>
  isStringOpen(string) ? "O" : "X";
