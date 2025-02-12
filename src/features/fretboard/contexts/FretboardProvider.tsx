import { ReactNode, useMemo, useReducer } from "react";
import { useFretboard } from "../hooks/useFretboard";
import { INITIAL_NUM_OF_FRETS, INITIAL_TUNING } from "../constants";
import { FretboardContext } from "./FretboardContext";
import { getCurrentChord } from "../utils/chord.utils";
import { getFrettedFrets, getCurrentNotes } from "../utils/fretboard.utils";

import {
  FretboardAction,
  FretboardState,
  FretNumber,
  StringNumber,
} from "../types";

export const FretboardProvider = ({ children }: { children: ReactNode }) => {
  const { fretboard, generateInitialState, highlightFret, setStartAtFret } =
    useFretboard(INITIAL_TUNING, INITIAL_NUM_OF_FRETS);

  const fretboardReducer = (
    fretboardState: FretboardState,
    action: FretboardAction
  ): FretboardState => {
    switch (action.type) {
      case "HIGHLIGHT_FRET": {
        const updatedFretboard = highlightFret(
          action.payload.string,
          action.payload.fret
        );
        // [ ] Fix state persistence
        const { fretboard } = updatedFretboard;
        console.log(updatedFretboard);

        return {
          ...fretboardState,
          fretboard: { ...fretboard },
          computed: {
            currentNotes: getCurrentNotes(fretboard),
            currentChord: getCurrentChord(fretboard.strings),
            frettedFrets: getFrettedFrets(fretboard),
          },
        };
      }

      case "SET_START_FRET": {
        const updatedFretboard = setStartAtFret(action.payload);

        return {
          ...fretboardState,
          fretboard: {
            ...updatedFretboard.fretboard,
            startAtFret: action.payload
          },
          computed: {
            currentNotes: getCurrentNotes(fretboard),
            currentChord: getCurrentChord(fretboard.strings),
            frettedFrets: getFrettedFrets(fretboard),
          },
        };
      }

      default: {
        return fretboardState;
      }
    }
  };

  const [currentFretboardState, dispatch] = useReducer(
    fretboardReducer,
    generateInitialState()
  );
  const memoizedContextValue = useMemo(
    () => ({
      fretboardState: currentFretboardState,
      dispatch,
      controls: {
        highlightFret: (string: StringNumber, fret: FretNumber) => {
          console.log(string, fret, "before highlight dispatch");
          dispatch({ type: "HIGHLIGHT_FRET", payload: { string, fret } });
        },
        setStartAtFret: (fret: FretNumber) =>
          dispatch({ type: "SET_START_FRET", payload: fret }),
      },
    }),
    [currentFretboardState]
  );

  return (
    <FretboardContext.Provider value={memoizedContextValue}>
      {children}
    </FretboardContext.Provider>
  );
};
