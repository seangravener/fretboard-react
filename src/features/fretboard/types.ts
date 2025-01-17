import { CHROMATIC_SCALE, FRET_NUMBERS, STRING_NUMBERS } from "./constants";

export type Tuning = readonly [string, string, string, string, string, string];
export type ChromaticNote = (typeof CHROMATIC_SCALE)[number];
export type FretNumber = (typeof FRET_NUMBERS)[number];
export type StringNumber = (typeof STRING_NUMBERS)[number];

export type Fret = {
  fretNumber: FretNumber;
  isHighlighted: boolean;
  note: ChromaticNote;
};

export type GuitarString = {
  stringNumber: StringNumber;
  openNote: ChromaticNote;
  isOpen: boolean;
  frets: Fret[];
};

export type Fretboard = {
  strings: GuitarString[];
  currentNotes: ChromaticNote[];
};

export type Chord = {
  name: string;
  root: ChromaticNote;
  quality: string;
};

export type FretboardContextType = {
  fretboard: Fretboard;
  highlightFret: (stringNumber: StringNumber, fretNumber: FretNumber) => void;
  currentNotes: ChromaticNote[];
  currentChord: Chord | string | null;
};

export type FretPositionMatrix = [
  [number],
  [number],
  [number],
  [number],
  [number],
  [number]
];
