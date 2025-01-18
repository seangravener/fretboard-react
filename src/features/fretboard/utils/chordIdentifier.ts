import { CHROMATIC_SCALE } from "../constants";
import { FretboardString } from "../types";

type ChordPattern = {
  name: string;
  intervals: number[];
};

type GuitarChordShape = {
  name: string;
  positions: number[];
  startFret: number;
};

const CHORD_PATTERNS: ChordPattern[] = [
  { name: "Major", intervals: [0, 4, 7] },
  { name: "Minor", intervals: [0, 3, 7] },
  { name: "Diminished", intervals: [0, 3, 6] },
  { name: "Augmented", intervals: [0, 4, 8] },
  { name: "7", intervals: [0, 4, 7, 10] },
  { name: "maj7", intervals: [0, 4, 7, 11] },
  { name: "m7", intervals: [0, 3, 7, 10] },
  { name: "m(maj7)", intervals: [0, 3, 7, 11] },
  { name: "dim7", intervals: [0, 3, 6, 9] },
  { name: "m7b5", intervals: [0, 3, 6, 10] },
];

const BASIC_GUITAR_CHORDS: GuitarChordShape[] = [
  { name: "C", positions: [0, 3, 2, 0, 1, 0], startFret: 0 },
  { name: "G", positions: [3, 2, 0, 0, 0, 3], startFret: 0 },
  { name: "D", positions: [-1, -1, 0, 2, 3, 2], startFret: 0 },
  { name: "A", positions: [-1, 0, 2, 2, 2, 0], startFret: 0 },
  { name: "E", positions: [0, 2, 2, 1, 0, 0], startFret: 0 },
  { name: "F", positions: [1, 3, 3, 2, 1, 1], startFret: 0 },
];

const getNoteIndex = (note: string): number => CHROMATIC_SCALE.indexOf(note);

// add comments
const getIntervals = (notes: string[]): number[] => {
  const rootIndex = getNoteIndex(notes[0]);
  return notes
    .map((note) => {
      const noteIndex = getNoteIndex(note);
      return (noteIndex - rootIndex + 12) % 12;
    })
    .sort((a, b) => a - b);
};

// add comments
const intervalsMatch = (intervals: number[], pattern: number[]): boolean => {
  if (intervals.length !== pattern.length) return false;
  return intervals.every((interval, i) => interval === pattern[i]);
};

const identifyGuitarShape = (strings: FretboardString[]): string => {
  const currentShape = strings.map(
    (string) =>
      string.frets.find((fret) => fret.isHighlighted)?.fretNumber ?? -1
  );

  const matchedChord = BASIC_GUITAR_CHORDS.find((chord) =>
    chord.positions.every((pos, idx) => pos === currentShape[idx])
  );

  return matchedChord?.name ?? "";
};

const identifyByIntervals = (strings: FretboardString[]): string => {
  const highlightedNotes = strings.flatMap((string) =>
    string.frets.filter((fret) => fret.isHighlighted).map((fret) => fret.note)
  );

  if (highlightedNotes.length < 3) return "";

  const intervals = getIntervals(highlightedNotes);
  const matchedPattern = CHORD_PATTERNS.find((pattern) =>
    intervalsMatch(intervals, pattern.intervals)
  );

  if (!matchedPattern) return "";
  return `${highlightedNotes[0]}${matchedPattern.name}`;
};

export const identifyChord = (strings: FretboardString[]): string => {
  const guitarShape = identifyGuitarShape(strings);

  if (guitarShape) return guitarShape;
  return identifyByIntervals(strings);
};
