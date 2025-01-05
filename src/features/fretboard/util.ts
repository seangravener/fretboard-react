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
