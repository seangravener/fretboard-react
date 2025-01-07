import { ReactNode } from "react";
import { useFretboard } from "../hooks/useFretboard";
import { DEFAULT_FRETS, DEFAULT_TUNING } from "../constants";
import { FretboardContext } from "./FretboardContext";
import { identifyChord } from "../utils/chordIdentifier";

export const FretboardProvider = ({ children }: { children: ReactNode }) => {
  const { fretboard, highlightFret, currentNotes } = useFretboard(
    DEFAULT_TUNING,
    DEFAULT_FRETS
  );
  const currentChord = identifyChord(fretboard.strings);

  return (
    <FretboardContext.Provider
      value={{ fretboard, highlightFret, currentNotes, currentChord }}
    >
      {children}
    </FretboardContext.Provider>
  );
};
