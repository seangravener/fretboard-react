import { CHROMATIC_SCALE, FRET_NUMBERS, STRING_NUMBERS } from "./constants";

export type ChromaticNote = (typeof CHROMATIC_SCALE)[number];
export type FretNumber = (typeof FRET_NUMBERS)[number];
export type StringNumber = (typeof STRING_NUMBERS)[number];

// Move all types here from src/types/fretboard.ts
export type Fret = {
  fretNumber: FretNumber;
  isHighlighted: boolean;
  note: ChromaticNote;
};

export type GuitarString = {
  stringNumber: StringNumber;
  openNote: ChromaticNote;
  frets: Fret[];
};

export type Fretboard = {
  strings: GuitarString[];
  currentNotes: ChromaticNote[];
};
