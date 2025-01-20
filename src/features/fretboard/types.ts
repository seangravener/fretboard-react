import { CHROMATIC_SCALE, FRET_NUMBERS, STRING_NUMBERS } from "./constants";

export type Tuning = readonly [string, string, string, string, string, string];
export type ChromaticNote = (typeof CHROMATIC_SCALE)[number];
export type FretNumber = (typeof FRET_NUMBERS)[number];
export type StringNumber = (typeof STRING_NUMBERS)[number];

export type Fretboard = {
  // numOfFrets: FretNumber;
  currentStartFret: FretNumber;
  strings: FretboardString[];
};

export type Fret = {
  fretNumber: FretNumber;
  isHighlighted: boolean;
  note: ChromaticNote;
};

export type FretboardString = {
  stringNumber: StringNumber;
  openNote: ChromaticNote;
  frets: Fret[];
};

export type Chord = {
  name: string;
  root: ChromaticNote;
  quality: string;
};

export type FretboardContextType = {
  fretboard: Fretboard;
  highlightFret: (stringNumber: StringNumber, fretNumber: FretNumber) => void;
  setStartingFret: (fretNumber: FretNumber) => void;
  currentNotes: ChromaticNote[];
  currentChord: Chord | string | null;
};

export type FretPositions = [
  FretNumber,
  FretNumber,
  FretNumber,
  FretNumber,
  FretNumber,
  FretNumber
];

export type FretboardDisplayOptions = { displayNotes?: boolean };
