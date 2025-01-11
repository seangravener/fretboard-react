import { useState } from "react";
import { generateFretboard } from "../generators/fretboardGenerator";
import {
  Fret,
  Fretboard,
  FretNumber,
  GuitarString,
  StringNumber,
} from "../types";

export const useFretboard = (
  initialTuning: string[],
  initialFrets: FretNumber
) => {
  const [fretboard, setFretboard] = useState<Fretboard>(
    generateFretboard(initialTuning, initialFrets)
  );

  const highlightFret = (
    stringNumber: StringNumber,
    fretNumber: FretNumber
  ) => {
    setFretboard((prevFretboard) => ({
      ...prevFretboard,
      strings: prevFretboard.strings.map((string) => {
        if (string.stringNumber !== stringNumber) return string;

        const highlightedFrets = string.frets.filter(
          (fret) => fret.isHighlighted
        );

        return {
          ...string,
          isOpen:
            !string.frets[0].isHighlighted && highlightedFrets.length === 1,
          frets: string.frets.map((fret) => ({
            ...fret,
            isHighlighted:
              fret.fretNumber === fretNumber
                ? !fret.isHighlighted
                : fret.isHighlighted,
          })),
        };
      }),
    }));
  };

  const currentNotes = fretboard.strings
    .flatMap((string) => string.frets)
    .filter((frets) => frets.isHighlighted)
    .map((fret) => fret.note);

  return {
    fretboard,
    highlightFret,
    currentNotes,
  };
};
