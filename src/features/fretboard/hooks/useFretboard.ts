import { useState } from "react";
import { Fretboard, FretNumber, StringNumber, Tuning } from "../types";
import { generateFretboard } from "../generators/fretboard.generator";

export const useFretboard = (
  initialTuning: Tuning,
  initialNumOfFrets: FretNumber,
  startAtFret: FretNumber = 0
) => {
  const [fretboard, setFretboard] = useState<Fretboard>(() =>
    generateFretboard(initialTuning, initialNumOfFrets, startAtFret)
  );

  const setStartingFret = (currentStartFret: FretNumber) => {
    setFretboard(() => ({
      ...generateFretboard(initialTuning, initialNumOfFrets, currentStartFret),
    }));
  };

  const highlightFret = (
    stringNumber: StringNumber,
    fretNumber: FretNumber
  ) => {
    setFretboard((prev) => ({
      ...prev,

      // @TODO replace with generateFretboard()
      strings: prev.strings.map((string) => {
        if (string.stringNumber !== stringNumber) return string;

        const updatedFrets = string.frets.map((fret) => ({
          ...fret,
          isHighlighted:
            fret.fretNumber === fretNumber ? !fret.isHighlighted : false,
        }));

        const hasNoHighlightedFrets = !updatedFrets.some(
          (fret) => fret.isHighlighted
        );

        // @TODO Toggle string open/muted state back to previous, unfretted state
        if (hasNoHighlightedFrets && fretNumber !== 0) {
          updatedFrets[0].isHighlighted = !string.frets[0].isHighlighted;
        }

        return { ...string, frets: updatedFrets };
      }),
    }));
  };

  return { fretboard, highlightFret, setStartingFret };
};
