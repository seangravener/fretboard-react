import { CHROMATIC_SCALE } from "../constants";
import { GuitarString } from "../types";

type GuitarPattern = {
  name: string;
  intervals: number[];
};

const CHORD_PATTERNS = [
  { name: "Major", intervals: [0, 4, 7] },
  { name: "Minor", intervals: [0, 3, 7] },
  { name: "7", intervals: [0, 4, 7, 10] },
  { name: "m7", intervals: [0, 3, 7, 10] },
  { name: "maj7", intervals: [0, 4, 7, 11] },
];

const getNoteIndex = (note: string): number => CHROMATIC_SCALE.indexOf(note);

const getIntervals = (notes: string[]): number[] => {
  const rootIndex = getNoteIndex(notes[0]);
  return notes
    .map((note) => {
      const noteIndex = getNoteIndex(note);
      return (noteIndex - rootIndex + 12) % 12;
    })
    .sort((a, b) => a - b);
};

const intervalsMatch = (intervals: number[], pattern: number[]): boolean => {
  if (intervals.length !== pattern.length) return false;
  return intervals.every((interval, i) => interval === pattern[i]);
};

export const identifyChord = (strings: GuitarString[]): string => {
  const highlightedNotes = strings
    .flatMap((fret) => fret.frets)
    .filter((fret) => fret.isHighlighted)
    .map((fret) => fret.note);

  if (highlightedNotes.length > 3) return "";

  const intervals = getIntervals(highlightedNotes);

  const matchedPattern = CHORD_PATTERNS.find((pattern) =>
    intervalsMatch(intervals, pattern.intervals)
  );

  if (!matchedPattern) return "";

  return `${highlightedNotes[0]}${matchedPattern.name}`;
};
