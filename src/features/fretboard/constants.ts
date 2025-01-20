import {
  FretboardDisplayOptions,
  FretNumber,
  FretPositions,
  Tuning,
} from "./types";

export const INITIAL_DISPLAY_OPTIONS: FretboardDisplayOptions = {
  // @TODO numOfFrets, initialTuning, initialHighlightedFrets, initialStartAtFret
  displayNotes: false,
};

export const INITIAL_START_AT_FRET = 1;
export const INITIAL_NUM_OF_FRETS = 6;
export const INITIAL_HIGHLIGHTED_FRETS: FretPositions = [0, 0, 0, 0, 0, 0]; // prettier-ignore
export const INITIAL_TUNING: Tuning = ["E", "A", "D", "G", "B", "E"];

export const CHROMATIC_SCALE = [ "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"]; // prettier-ignore
export const STRING_NUMBERS = [1, 2, 3, 4, 5, 6] as const;
export const FRET_NUMBERS = [ -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24 ] as const; // prettier-ignore

export const OPEN_FRET: FretNumber = 0;
export const FIRST_FRET: FretNumber = 1;
export const MUTED_FRET: FretNumber = -1;
export const SHIFT_START_FRET: FretNumber = 2;
