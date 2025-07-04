import { useFretboardContext } from "./useFretboardContext";
import { FretNumber, FretPositions, StringNumber } from "../types";

export const useFretboardService = () => {
  const {
    fretboard,
    highlightFret,
    setStartAtFret,
    setHighlightedFrets,
    currentNotes,
    currentChord,
    activeFrets,
  } = useFretboardContext();

  const toggleFret = (stringNumber: StringNumber, fretNumber: FretNumber) => {
    highlightFret(stringNumber, fretNumber);
  };

  const clearHighlights = () => {
    const clearedFrets = Array(fretboard.tuning.length).fill(0) as FretPositions;
    setHighlightedFrets(clearedFrets);
  };

  const shiftFretboard = (direction: "up" | "down") => {
    const newStartAtFret = direction === "up" 
      ? Math.min(fretboard.startAtFret + 1, 12)
      : Math.max(fretboard.startAtFret - 1, 0);
    
    setStartAtFret(newStartAtFret as FretNumber);
  };

  return {
    fretboard,
    currentNotes,
    currentChord,
    activeFrets,
    toggleFret,
    clearHighlights,
    shiftFretboard,
    setHighlightedFrets,
    setStartAtFret,
  };
};
