import { useState } from "react";
import {
  Fretboard,
  FretboardState,
  FretNumber,
  FrettedStringPositions,
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

  const [fretboardState, setFretboardState] = useState<FretboardState>(
    (): FretboardState => ({
      ...fretboardState,
      fretboard: generateFretboard(tuning, numOfFrets, startAtFret),
    })
  );

  const setStartAtFret = (startAtFret: FretNumber) => {
    const highlightedFretPositions = fretboard.strings.map((string) => {
      const highlightedFret = string.frets.find((fret) => fret.isHighlighted);
      if (highlightedFret?.fretNumber === 0) return 0; // Skip open strings

      const highlightedFretNumber = highlightedFret
        ? highlightedFret.fretNumber
        : 0;
      const relativePosition = highlightedFretNumber - fretboard.startAtFret;

      return startAtFret + relativePosition;
    }) as FrettedStringPositions;

    setFretboardState((prev) => ({
      ...prev,
      fretboard: generateFretboard(
        tuning,
        numOfFrets,
        startAtFret,
        highlightedFretPositions
      ),
    }));

    // @TODO Depricate
    setFretboard(() => ({
      ...generateFretboard(
        tuning,
        numOfFrets,
        startAtFret,
        highlightedFretPositions
      ),
    }));
  };

  const highlightFret = (
    // @TODO refactor with FretboardPositions[] as param
    stringNumber: StringNumber,
    fretNumber: FretNumber
  ) => {
    // @TODO replace with generateStrings() with FretboardPositions set
    const updatedStrings = ({ fretboard }: FretboardState) =>
      fretboard.strings.map((string) => {
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
          // @TODO Toggle string open/muted state back to previous, unfretted state
          updatedFrets[0].isHighlighted = !string.frets[0].isHighlighted;
        }

        return { ...string, frets: updatedFrets };
      });

    setFretboardState((prev) => ({
      ...prev,
      fretboard: { ...prev.fretboard, strings: updatedStrings(prev) },
    }));

    // @TODO Depricate
    setFretboard((prev) => ({
      ...prev,
      strings: updatedStrings({ fretboard: prev } as FretboardState),
    }));
  };

  return {
    fretboard,
    fretboardState,
    highlightFret,
    setStartAtFret,
    generateFretboard,
  };
};
