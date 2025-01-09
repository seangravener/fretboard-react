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
      strings: prevFretboard.strings.map((string) =>
        updateString(string, stringNumber, fretNumber)
      ),
    }));
  };

  const currentNotes = fretboard.strings
    .flatMap((string) => string.frets)
    .filter((frets) => frets.isHighlighted)
    .map((fret) => fret.note);

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
      ? {
          ...string,
          isOpen: fretNumber === 0,
          frets: string.frets.map(toggleFretHighlight),
        }
      : string;
  };

  return {
    fretboard,
    highlightFret,
    currentNotes,
  };
};
