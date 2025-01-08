type GuitarChordShape = {
  name: string;
  positions: number[]; // fret positions from 6th to 1st string, -1 for muted
  startFret: number; // position of first fret in the shape
};

export const BASIC_GUITAR_CHORDS: GuitarChordShape[] = [
  { name: "C", positions: [0, 3, 2, 0, 1, 0], startFret: 0 },
  { name: "G", positions: [3, 2, 0, 0, 0, 3], startFret: 0 },
  { name: "D", positions: [-1, -1, 0, 2, 3, 2], startFret: 0 },
  { name: "A", positions: [-1, 0, 2, 2, 2, 0], startFret: 0 },
  { name: "E", positions: [0, 2, 2, 1, 0, 0], startFret: 0 },
  { name: "F", positions: [1, 3, 3, 2, 1, 1], startFret: 0 },
];
