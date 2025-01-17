import { CHROMATIC_SCALE } from "../constants";
import { ChromaticNote, Fret, Fretboard, FretNumber } from "../types";

export const getCurrentNotes = (fretboard: Fretboard): ChromaticNote[] => {
  return fretboard.strings.flatMap((string) =>
    string.frets.filter((fret) => fret.isHighlighted).map((fret) => fret.note)
  );
};

export const getActiveFrets = (fretboard: Fretboard): Fret[] => {
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
