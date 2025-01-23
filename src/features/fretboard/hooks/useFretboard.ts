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
import { generateStrings } from "../generators/string.generator";
import {
  INITIAL_NUM_OF_FRETS,
  INITIAL_TUNING,
  SHIFT_START_AT_FRET,
} from "../constants";

export const useFretboard = (
  tuning: Tuning = INITIAL_TUNING,
  numOfFrets: FretNumber = INITIAL_NUM_OF_FRETS,
  startAtFret: FretNumber = SHIFT_START_AT_FRET
) => {
  const initialFretboard = generateFretboard(tuning, numOfFrets, startAtFret);
  const generateInitialState = (): FretboardState => ({
    fretboard: initialFretboard,
    highlightFret: () => {},
    setStartAtFret: () => {},
    computed: {
      currentNotes: [],
      currentChord: null,
      activeFrets: [],
    },
  });

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
    // setFretboard(() => ({
    //   ...generateFretboard(
    //     tuning,
    //     numOfFrets,
    //     startAtFret,
    //     highlightedFretPositions
    //   ),
    // }));
  };

  const highlightFret = (
    // @TODO refactor with FretboardPositions[] as param
    stringNumber: StringNumber,
    fretNumber: FretNumber
  ) => {
    // @TODO replace with generateStrings() with FretboardPositions set
    const updatedStrings = ({ fretboard }: { fretboard: Fretboard }) =>
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

    const frettedPositions: FrettedStringPositions = generateStrings(
      stringNumber,
      numOfFrets,
      startAtFret,
      [0, 0, 0, 0, 0, 0]
    ).flatMap((string) =>
      string.frets
        .slice(0, 6)
        .map((fret) =>
          fret.isHighlighted
            ? string.frets.find((fret) => fret.isHighlighted)?.fretNumber
            : 0
        )
    ) as FrettedStringPositions;

    const fretboard = generateFretboard(
      tuning,
      numOfFrets,
      startAtFret,
      // frettedPositions
    );

    return {
      fretboard: {
        ...fretboard,
        strings: generateStrings(
          stringNumber,
          numOfFrets,
          startAtFret,
          frettedPositions
        ),
      },
      // fretboard: { strings: updatedStrings({ fretboard }) },
    };

    // @TODO Depricate
    // setFretboard((prev) => ({
    //   ...prev,
    //   strings: updatedStrings({ fretboard: prev } as FretboardState),
    // }));
  };

  return {
    fretboard: initialFretboard,
    generateInitialState,
    highlightFret,
    setStartAtFret,
  };
};
