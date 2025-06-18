import { useState } from "react";
import {
  Fretboard,
  FretNumber,
  FretPositions,
  StringNumber,
  Tuning,
} from "../types";
import { generateFretboard } from "../generators/fretboard.generator";

export const useFretboard = (
  tuning?: Tuning,
  numOfFrets?: FretNumber,
  startAtFret?: FretNumber
) => {
  const [fretboard, setFretboard] = useState<Fretboard>(() =>
    generateFretboard(tuning, numOfFrets, startAtFret)
  );

  const setStartAtFret = (startAtFret: FretNumber) => {
    const highlightedFretPositions = fretboard.strings.map((string) => {
      const highlightedFret = string.frets.find((fret) => fret.isHighlighted);
      if (highlightedFret?.fretNumber === 0) return 0;

      const highlightedFretNumber = highlightedFret
        ? highlightedFret.fretNumber
        : 0;
      const relativePosition = highlightedFretNumber - fretboard.startAtFret;

      return startAtFret + relativePosition;
    }) as FretPositions;

    setFretboard(() => ({
      ...generateFretboard(
        tuning,
        numOfFrets,
        startAtFret,
        highlightedFretPositions
      ),
    }));
  };
  // @TODO refactor with FretboardPositions[] as an optional input
  const highlightFret = (
    stringNumber: StringNumber,
    fretNumber: FretNumber
  ) => {
    setFretboard((prev) => ({
      ...prev,

      // @TODO replace with generateStrings() with FretboardPositions set
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

  return { fretboard, highlightFret, setStartAtFret };
};
