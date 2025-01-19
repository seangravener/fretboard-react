import { ReactNode, useMemo } from "react";
import { useFretboard } from "../hooks/useFretboard";
import { INITIAL_NUM_OF_FRETS, INITIAL_TUNING } from "../constants";
import { FretboardContext } from "./FretboardContext";
import { identifyChord } from "../utils/chord.utils";
import { getActiveFrets, getCurrentNotes } from "../utils/fretboard.utils";

export const FretboardProvider = ({ children }: { children: ReactNode }) => {
  const { fretboard, highlightFret } = useFretboard(
    INITIAL_TUNING,
    INITIAL_NUM_OF_FRETS
  );
  const currentNotes = getCurrentNotes(fretboard);
  const activeFrets = getActiveFrets(fretboard);
  const currentChord = identifyChord(fretboard.strings);
  const memoizedValue = useMemo(
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
    <FretboardContext.Provider value={memoizedValue}>
      {children}
    </FretboardContext.Provider>
  );
};
