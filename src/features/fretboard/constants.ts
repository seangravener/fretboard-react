import { FretPositions, Tuning } from "./types";

export const INITIAL_FRETS = 6;
export const INITIAL_TUNING: Tuning = ["E", "A", "D", "G", "B", "E"];
export const INITIAL_HIGHLIGHTED_FRETS: FretPositions = [0, 0, 0, 0, 0, 0]; // prettier-ignore
export const CHROMATIC_SCALE = [ "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"]; // prettier-ignore

export const STRING_NUMBERS = [1, 2, 3, 4, 5, 6] as const;
export const FRET_NUMBERS = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24 ] as const; // prettier-ignore
