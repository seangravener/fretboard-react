import { useState } from "react";
import {
  Fretboard,
  FretNumber,
  FretPositions,
  StringNumber,
  Tuning,
} from "../types";
import { generateFretboard } from "../generators/fretboard.generator";
import { generateStrings } from "../generators/string.generator";
import { MUTED_FRET_NUM } from "../constants";

export const useFretboard = (
  tuning?: Tuning,
  numOfFrets?: FretNumber,
  startAtFret?: FretNumber,
  initialHighlightedFrets?: FretPositions
) => {
  const [fretboard, setFretboard] = useState<Fretboard>(() =>
    generateFretboard(tuning, numOfFrets, startAtFret, initialHighlightedFrets)
  );

  const setStartAtFret = (newStartAtFret: FretNumber) => {
    const currentHighlightedFrets = fretboard.strings.map((string) => {
      const highlightedFret = string.frets.find((fret) => fret.isHighlighted);
      
      if (!highlightedFret || highlightedFret.fretNumber === 0) {
        return highlightedFret?.fretNumber ?? 0;
      }

      const relativePosition = highlightedFret.fretNumber - fretboard.startAtFret;
      
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
  };

  const highlightFret = (
  stringNumber: StringNumber,
  fretNumber: FretNumber
) => {
  const newHighlightedFrets = fretboard.highlightedFrets.map((currentFret, index) => {
    const currentStringNumber = (index + 1) as StringNumber;
    
    if (currentStringNumber !== stringNumber) {
      return currentFret;
    }

    if (fretNumber === MUTED_FRET_NUM) {
      return MUTED_FRET_NUM;
    }
    
    return currentFret === fretNumber ? MUTED_FRET_NUM : fretNumber;
  }) as FretPositions;

  setFretboard((prev) => ({
    ...prev,
    highlightedFrets: newHighlightedFrets,
    strings: generateStrings(
      prev.numOfFrets,
      prev.startAtFret,
      newHighlightedFrets
    ),
  }));
};

  const setHighlightedFrets = (fretPositions: FretPositions) => {
    setFretboard((prev) => ({
      ...prev,
      highlightedFrets: fretPositions,
      strings: generateStrings(
        prev.numOfFrets,
        prev.startAtFret,
        fretPositions
      ),
    }));
  };

  return { 
    fretboard, 
    highlightFret, 
    setStartAtFret, 
    setHighlightedFrets 
  };
};
