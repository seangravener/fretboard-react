import { CHROMATIC_SCALE, FRET_NUMBERS, STRING_NUMBERS } from "./constants";

export type Tuning = readonly [string, string, string, string, string, string];
export type ChromaticNote = (typeof CHROMATIC_SCALE)[number];
export type FretNumber = (typeof FRET_NUMBERS)[number];
export type StringNumber = (typeof STRING_NUMBERS)[number];

export type Fretboard = {
  // numOfFrets: FretNumber;
  startAtFret: FretNumber;
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

export type FretboardContextType_old = {
  fretboard: Fretboard;
  highlightFret: (stringNumber: StringNumber, fretNumber: FretNumber) => void;
  setStartAtFret: (fretNumber: FretNumber) => void;
  currentNotes: ChromaticNote[];
  currentChord: Chord | string | null;
};

export type FretboardAction =
  | {
      type: "HIGHLIGHT_FRET";
      payload: { string: StringNumber; fret: FretNumber };
    }
  | { type: "SET_START_FRET"; payload: FretNumber };

export type FretboardContextType = {
  fretboardState: FretboardState;
  dispatch: React.Dispatch<FretboardAction>;
  controls: {
    highlightFret: (stringNumber: StringNumber, fretNumber: FretNumber) => void;
    setStartAtFret: (fretNumber: FretNumber) => void;
  };
};

export type FretboardState = {
  fretboard: Fretboard;
  computed: {
    currentNotes: ChromaticNote[];
    currentChord: Chord | string | null;
    activeFrets: FrettedStringPositions;
  };
  highlightFret: (stringNumber: StringNumber, fretNumber: FretNumber) => void;
  setStartAtFret: (fretNumber: FretNumber) => void;
};

export type FrettedStringPositions = [
  FretNumber?,
  FretNumber?,
  FretNumber?,
  FretNumber?,
  FretNumber?,
  FretNumber?
];

export type FretboardDisplayOptions = { displayNotes?: boolean };
