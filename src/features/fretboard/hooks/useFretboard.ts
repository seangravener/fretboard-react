import { useState } from "react";
import { generateFretboard } from "../generators/fretboardGenerator";
import { Fret, Fretboard, GuitarString } from "../types";

export const useFretboard = (initialTuning: string[], initialFrets: number) => {
  const [fretboard, setFretboard] = useState<Fretboard>(
    generateFretboard(initialTuning, initialFrets)
  );

  const highlightFret = (stringNumber: number, fretNumber: number) => {
    setFretboard((prevFretboard) => ({
      strings: prevFretboard.strings.map((string) =>
        updateString(string, stringNumber, fretNumber)
      ),
    }));
  };

  const updateString = (
    string: GuitarString,
    stringNumber: number,
    fretNumber: number
  ) => {
    const shouldUpdateString = string.stringNumber === stringNumber;
    const toggleFretHighlight = (fret: Fret) => ({
      ...fret,
      isHighlighted:
        fret.fretNumber === fretNumber
          ? !fret.isHighlighted
          : fret.isHighlighted,
    });

    return shouldUpdateString
      ? { ...string, frets: string.frets.map(toggleFretHighlight) }
      : string;
  };

  return {
    fretboard,
    highlightFret,
  };
};
