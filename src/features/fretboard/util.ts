import { GuitarString } from "./types";
import { CHROMATIC_SCALE } from "./constants";

export const calcNoteAtFret = (
  openNote: string,
  fretNumber: number
): string => {
  const openNoteIndex = CHROMATIC_SCALE.indexOf(openNote);

  if (openNoteIndex === -1) {
    throw new Error(`Invalid note: ${openNote}`);
  }

  return CHROMATIC_SCALE[(openNoteIndex + fretNumber) % CHROMATIC_SCALE.length];
};

export const isStringOpen = (string: GuitarString): boolean =>
  !string.frets.some((fret) => fret.isHighlighted);

export const getStringIndicator = (string: GuitarString): "O" | "X" =>
  isStringOpen(string) ? "O" : "X";
