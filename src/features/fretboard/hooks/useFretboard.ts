import { useState } from "react";
import { generateFretboard } from "../generators/fretboardGenerator";
import { Fretboard, GuitarString } from "../types";

export const useFretboard = (initialTuning: string[], initialFrets: number) => {
  const [fretboard, setFretboard] = useState<Fretboard>(
    generateFretboard(initialTuning, initialFrets)
  );

  const highlightFret = (stringNum: number, fretNum: number) => {
    setFretboard((prevFretboard) => ({
      strings: prevFretboard.strings.map((string) =>
        updateString(string, stringNum, fretNum)
      ),
    }));
  };

  const updateString = (
    string: GuitarString,
    stringNum: number,
    fretNum: number
  ) => {
    if (string.stringNumber === stringNum) {
      return {
        ...string,
        frets: string.frets.map((fret) => ({
          ...fret,
          isHighlighted:
            fret.fretNumber === fretNum
              ? !fret.isHighlighted
              : fret.isHighlighted,
        })),
      };
    }
    return string;
  };

  return {
    fretboard,
    highlightFret,
  };
};
