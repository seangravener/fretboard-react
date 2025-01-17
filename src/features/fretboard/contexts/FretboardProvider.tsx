import { ReactNode, useMemo } from "react";
import { useFretboard } from "../hooks/useFretboard";
import { INITIAL_FRETS, INITIAL_TUNING } from "../constants";
import { FretboardContext } from "./FretboardContext";
import { identifyChord } from "../utils/chordIdentifier";

export const FretboardProvider = ({ children }: { children: ReactNode }) => {
  const { fretboard, highlightFret, currentNotes, activeFrets } = useFretboard(
    INITIAL_TUNING,
    INITIAL_FRETS
  );
  const currentChord: string = identifyChord(fretboard.strings);

  console.log("activeFrets", activeFrets);

  const contextValue = useMemo(
    () => ({
      fretboard,
      highlightFret,
      currentNotes,
      currentChord,
    }),
    [fretboard, highlightFret, currentNotes, currentChord]
  );

  console.log("contextValue", contextValue);

  return (
    <FretboardContext.Provider value={contextValue}>
      {children}
    </FretboardContext.Provider>
  );
};
