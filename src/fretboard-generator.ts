// Type definitions
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

// Notes in a chromatic scale
export const CHROMATIC_SCALE = [
  "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"
];

// Function to calculate the note at a given fret
export const getNoteAtFret = (openNote: string, fretNumber: number): string => {
  const openNoteIndex = CHROMATIC_SCALE.indexOf(openNote);
  if (openNoteIndex === -1) throw new Error(`Invalid note: ${openNote}`);
  return CHROMATIC_SCALE[(openNoteIndex + fretNumber) % CHROMATIC_SCALE.length];
};

// Function to generate a single string
export const generateString = (
  stringNumber: number,
  openNote: string,
  numFrets: number,
  highlightedFrets: number[] = []
): GuitarString => {
  const frets: Fret[] = Array.from({ length: numFrets + 1 }, (_, fretNumber) => ({
    fretNumber,
    isHighlighted: highlightedFrets.includes(fretNumber),
    note: getNoteAtFret(openNote, fretNumber)
  }));
  return { stringNumber, openNote, frets };
};

// Function to generate the entire fretboard
export const generateFretboard = (
  tuning: string[],
  numFrets: number,
  highlightedFretsByString: number[][] = []
): Fretboard => {
  return {
    strings: tuning.map((openNote, index) =>
      generateString(index + 1, openNote, numFrets, highlightedFretsByString[index] || [])
    )
  };
};

// Example usage
export const tuning = ["E", "A", "D", "G", "B", "E"]; // Standard tuning
export const numFrets = 5; // Number of frets to display
export const highlightedFretsByString = [
  [2],    // Highlight fret 2 on the 1st string
  [2],    // Highlight fret 2 on the 2nd string
  [],     // No highlights on the 3rd string
  [3],    // Highlight fret 3 on the 4th string
  [2],    // Highlight fret 2 on the 5th string
  [3]     // Highlight fret 3 on the 6th string
];

