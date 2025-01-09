import { ReactNode, useMemo } from "react";
import { useFretboard } from "../hooks/useFretboard";
import { DEFAULT_FRETS, DEFAULT_TUNING } from "../constants";
import { FretboardContext } from "./FretboardContext";
import { identifyChord } from "../utils/chordIdentifier";

export const FretboardProvider = ({ children }: { children: ReactNode }) => {
  const { fretboard, highlightFret, currentNotes } = useFretboard(
    DEFAULT_TUNING,
    DEFAULT_FRETS
  );
  const currentChord: string = identifyChord(fretboard.strings);

  const contextValue = useMemo(
    () => ({
      fretboard,
      highlightFret,
      currentNotes,
      currentChord,
    }),
    [fretboard, highlightFret, currentNotes, currentChord]
  );

  return (
    <FretboardContext.Provider value={contextValue}>
      {children}
    </FretboardContext.Provider>
  );
};
