import { CHROMATIC_SCALE } from "../constants";
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

export const getFrettedFrets = (fretboard: Fretboard): Fret[] => {
  const inactiveFret: Fret = {
    fretNumber: 0 as FretNumber,
    isHighlighted: false,
    note: "",
  };

  return fretboard.strings.map(
    (string) =>
      string.frets.filter((fret) => fret.isHighlighted).at(-1) ?? inactiveFret
  );
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

export const getFrettedFretPositions = (
  frets: FrettedFrets,
  startAtFret: FretNumber = 0
): FretPositions => {
  const positions = frets.map(fret => {
    const absolutePosition = fret.fretNumber;
    const viewportPosition = startAtFret + absolutePosition;
    
    return viewportPosition as FretNumber;
  }) as FretPositions;

  return positions;
};
