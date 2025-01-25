import { CHROMATIC_SCALE, INACTIVE_FRET } from "../constants";
import {
  ChromaticNote,
  Fret,
  Fretboard,
  FretboardString,
  FretNumber,
  FretPositions,
  FrettedFrets,
} from "../types";

export const getCurrentNotes = (fretboard: Fretboard): ChromaticNote[] => {
  return fretboard.strings.flatMap((string) =>
    string.frets.filter((fret) => fret.isHighlighted).map((fret) => fret.note)
  );
};

export const getFrettedFrets = (fretboard: Fretboard): FrettedFrets => {
  const inactiveFret: Fret = INACTIVE_FRET;
  const frettedFrets = Array(6).fill(inactiveFret) as FrettedFrets;

  fretboard.strings.forEach((string, index) => {
    const lastHighlightedFret = string.frets
      .filter((fret) => fret.isHighlighted)
      .at(-1);
    frettedFrets[index] = lastHighlightedFret ?? inactiveFret;
  });

  return frettedFrets;
};

export const getFrettedFretNumbers = (fretboard: Fretboard): FretPositions => {
  return fretboard.strings.map((string) => {
    const lastHighlightedFret = string.frets
      .filter((fret) => fret.isHighlighted)
      .at(-1);
    return lastHighlightedFret?.fretNumber ?? (0 as FretNumber);
  }) as FretPositions;
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
