// Move all types here from src/types/fretboard.ts
export type Fret = {
  fretNumber: number;
  isHighlighted: boolean;
  note: string;
};

export type GuitarString = {
  stringNumber: number;
  openNote: string;
  frets: Fret[];
};

export type Fretboard = {
  strings: GuitarString[];
};
