import { FretboardString } from "./types";

export const isStringOpen = (string: FretboardString): boolean => {
  return string.frets.some(
    (fret) => fret.fretNumber === 0 && fret.isHighlighted
  );
};

export const getStringIndicator = (string: FretboardString): "O" | "X" =>
  isStringOpen(string) ? "O" : "X";
