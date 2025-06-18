import { CHROMATIC_SCALE, FRET_NUMBERS, STRING_NUMBERS } from "./constants";

export type Tuning = readonly [string, string, string, string, string, string];
export type ChromaticNote = (typeof CHROMATIC_SCALE)[number];
export type FretNumber = (typeof FRET_NUMBERS)[number];
export type StringNumber = (typeof STRING_NUMBERS)[number];

export type Fretboard = {
  tuning: Tuning;
  startAtFret: FretNumber;
  numOfFrets: FretNumber;
  strings: FretboardString[];
  totalFrets: number;
  highlightedFrets: FretPositions;
};

export type Fret = {
  fretNumber: FretNumber;
  isHighlighted: boolean;
  note: ChromaticNote;
};

export type FrettedFrets = [Fret, Fret, Fret, Fret, Fret, Fret];

export interface StringFretPair {
  stringNumber: StringNumber;
  fretNumber: FretNumber;
}

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
  setStartAtFret: (fretNumber: FretNumber) => void;
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
