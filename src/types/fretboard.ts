export type Fret = {
  fretNumber: number; // E.g., 0 for open, 1 for first fret, etc.
  isHighlighted: boolean; // Whether the fret is marked
  note: string | null; // The note being played, e.g., "C", "G", or null
};

// Type definition for a string
export type GuitarString = {
  stringNumber: number; // 1 to 6 (or 1 to 4 for bass, etc.)
  frets: Fret[]; // Array of frets for this string
  openNote: string; // The note for the open string, e.g., "E", "A"
};

// Type definition for the guitar fretboard
export type Fretboard = {
  strings: GuitarString[]; // Array of guitar strings
};