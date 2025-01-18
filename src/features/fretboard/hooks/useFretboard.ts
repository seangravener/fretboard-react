import { useState } from "react";
import { Fretboard, FretNumber, StringNumber, Tuning } from "../types";
import { generateFretboard } from "../generators/fretboard.generator";

export const useFretboard = (
  initialTuning: Tuning,
  initialFrets: FretNumber
) => {
  const [fretboard, setFretboard] = useState<Fretboard>(() => {
    return generateFretboard(initialTuning, initialFrets);
  });

  const highlightFret = (
    stringNumber: StringNumber,
    fretNumber: FretNumber
  ) => {
    setFretboard((prev) => ({
      ...prev,
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

        if (hasNoHighlightedFrets && fretNumber !== 0) {
          updatedFrets[0].isHighlighted = !string.frets[0].isHighlighted;
        }

        return { ...string, frets: updatedFrets };
      }),
    }));
  };

  return { fretboard, highlightFret };
};
