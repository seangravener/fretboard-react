import { ReactNode, useMemo } from "react";
import { useFretboard } from "../hooks/useFretboard";
import { INITIAL_NUM_OF_FRETS, INITIAL_TUNING } from "../constants";
import { FretboardContext } from "./FretboardContext";
import { identifyChord } from "../utils/chord.utils";
import { getActiveFrets, getCurrentNotes } from "../utils/fretboard.utils";

export const FretboardProvider = ({ children }: { children: ReactNode }) => {
  const { fretboard, highlightFret, setStartAtFret } = useFretboard(
    INITIAL_TUNING,
    INITIAL_NUM_OF_FRETS
  );
  const currentNotes = getCurrentNotes(fretboard);
  const activeFrets = getActiveFrets(fretboard);
  const currentChord: string = identifyChord(fretboard.strings);
  const contextValue = useMemo(
    () => ({
      highlightFret,
      setStartAtFret,
      fretboard,
      currentNotes,
      currentChord,
      activeFrets,
    }),
    [
      highlightFret,
      setStartAtFret,
      fretboard,
      currentNotes,
      currentChord,
      activeFrets,
    ]
  );

  return (
    <FretboardContext.Provider value={contextValue}>
      {children}
    </FretboardContext.Provider>
  );
};
