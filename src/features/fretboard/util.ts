import { FretNumber, GuitarString } from "./types";
import { CHROMATIC_SCALE } from "./constants";

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

export const isStringOpen = (string: GuitarString): boolean => {
  const highlightedFrets = string.frets.map((fret) => fret.isHighlighted);
  const isMuted =
    string.frets[0].isHighlighted && highlightedFrets.length === 1;

  return isMuted || !string.frets.some((fret) => fret.isHighlighted);
};

export const getStringIndicator = (string: GuitarString): "O" | "X" =>
  isStringOpen(string) ? "O" : "X";
