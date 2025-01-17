import { GuitarString } from "./types";

export const isStringOpen = (string: GuitarString): boolean => {
  return string.frets.some(
    (fret) => fret.fretNumber === 0 && fret.isHighlighted
  );
};

export const getStringIndicator = (string: GuitarString): "O" | "X" =>
  isStringOpen(string) ? "O" : "X";
