import { ReactNode, useMemo } from "react";
import { useFretboard } from "../hooks/useFretboard";
import { INITIAL_FRETS, INITIAL_TUNING } from "../constants";
import { FretboardContext } from "./FretboardContext";
import { identifyChord } from "../utils/chordIdentifier";
import { getActiveFrets, getCurrentNotes } from "../utils/fretboard.utils";

export const FretboardProvider = ({ children }: { children: ReactNode }) => {
  const { fretboard, highlightFret } = useFretboard(
    INITIAL_TUNING,
    INITIAL_FRETS
  );
  const currentNotes = getCurrentNotes(fretboard);
  const activeFrets = getActiveFrets(fretboard);
  const currentChord: string = identifyChord(fretboard.strings);

  const contextValue = useMemo(
    () => ({
      fretboard,
      highlightFret,
      currentNotes,
      currentChord,
      activeFrets,
    }),
    [fretboard, highlightFret, currentNotes, currentChord, activeFrets]
  );

  return (
    <FretboardContext.Provider value={contextValue}>
      {children}
    </FretboardContext.Provider>
  );
};
