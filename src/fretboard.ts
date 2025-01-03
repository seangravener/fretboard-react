import { Fretboard } from './types/fretboard';

export const fretboard: Fretboard = {
  strings: [
    {
      stringNumber: 1,
      openNote: "E",
      frets: [
        { fretNumber: 0, isHighlighted: false, note: "E" },
        { fretNumber: 1, isHighlighted: false, note: "F" },
        { fretNumber: 2, isHighlighted: true, note: "F#" },
        { fretNumber: 3, isHighlighted: false, note: "G" },
        { fretNumber: 4, isHighlighted: false, note: "G#" },
        { fretNumber: 5, isHighlighted: false, note: "A" },
      ],
    },
    {
      stringNumber: 2,
      openNote: "A",
      frets: [
        { fretNumber: 0, isHighlighted: false, note: "A" },
        { fretNumber: 1, isHighlighted: false, note: "A#" },
        { fretNumber: 2, isHighlighted: true, note: "B" },
        { fretNumber: 3, isHighlighted: false, note: "C" },
        { fretNumber: 4, isHighlighted: false, note: "C#" },
        { fretNumber: 5, isHighlighted: false, note: "D" },
      ],
    },
    // Repeat for other strings...
  ],
};
