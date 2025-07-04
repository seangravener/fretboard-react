import { ReactNode, useMemo, useState, useCallback } from "react";
import {
  INITIAL_NUM_OF_FRETS,
  INITIAL_TUNING,
  MUTED_FRET_NUM,
} from "../constants";
import { FretboardContext } from "./FretboardContext";
import { identifyChord } from "../utils/chord.utils";
import { getFrettedFrets, getCurrentNotes } from "../utils/fretboard.utils";
import { generateFretboard } from "../generators/fretboard.generator";
import { generateStrings } from "../generators/string.generator";
import { Fretboard, FretNumber, FretPositions, StringNumber } from "../types";

export const FretboardProvider = ({ children }: { children: ReactNode }) => {
  const [fretboard, setFretboard] = useState<Fretboard>(() =>
    generateFretboard(INITIAL_TUNING, INITIAL_NUM_OF_FRETS)
  );

  const setStartAtFret = useCallback((newStartAtFret: FretNumber) => {
    const currentHighlightedFrets = fretboard.strings.map((string) => {
      const highlightedFret = string.frets.find((fret) => fret.isHighlighted);

      if (!highlightedFret || highlightedFret.fretNumber === 0) {
        return highlightedFret?.fretNumber ?? 0;
      }

      const relativePosition =
        highlightedFret.fretNumber - fretboard.startAtFret;

      return newStartAtFret + relativePosition;
    }) as FretPositions;

    setFretboard(
      generateFretboard(
        fretboard.tuning,
        fretboard.numOfFrets,
        newStartAtFret,
        currentHighlightedFrets
      )
    );
  }, [fretboard]);

  const highlightFret = useCallback((
    stringNumber: StringNumber,
    fretNumber: FretNumber
  ) => {
    const newHighlightedFrets = fretboard.highlightedFrets.map(
      (currentFret, index) => {
        const currentStringNumber = (index + 1) as StringNumber;

        if (currentStringNumber !== stringNumber) {
          return currentFret;
        }

        if (fretNumber === MUTED_FRET_NUM) {
          return MUTED_FRET_NUM;
        }

        return currentFret === fretNumber ? MUTED_FRET_NUM : fretNumber;
      }
    ) as FretPositions;

    setFretboard((prev) => ({
      ...prev,
      highlightedFrets: newHighlightedFrets,
      strings: generateStrings(
        prev.numOfFrets,
        prev.startAtFret,
        newHighlightedFrets
      ),
    }));
  }, [fretboard]);

  const setHighlightedFrets = useCallback((fretPositions: FretPositions) => {
    setFretboard((prev) => ({
      ...prev,
      highlightedFrets: fretPositions,
      strings: generateStrings(
        prev.numOfFrets,
        prev.startAtFret,
        fretPositions
      ),
    }));
  }, []);

  const currentNotes = getCurrentNotes(fretboard);
  const activeFrets = getFrettedFrets(fretboard);
  const currentChord: string = identifyChord(fretboard.strings);

  const contextValue = useMemo(
    () => ({
      fretboard,
      highlightFret,
      setStartAtFret,
      setHighlightedFrets,
      currentNotes,
      currentChord,
      activeFrets,
    }),
    [
      fretboard,
      currentNotes,
      currentChord,
      activeFrets,
      highlightFret,
      setStartAtFret,
      setHighlightedFrets,
    ]
  );

  return (
    <FretboardContext.Provider value={contextValue}>
      {children}
    </FretboardContext.Provider>
  );
};
