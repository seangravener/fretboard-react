import { ReactNode, useMemo, useReducer } from "react";
import { useFretboard } from "../hooks/useFretboard";
import { INITIAL_NUM_OF_FRETS, INITIAL_TUNING } from "../constants";
import { FretboardContext } from "./FretboardContext";
import { identifyChord } from "../utils/chord.utils";
import { getActiveFrets, getCurrentNotes } from "../utils/fretboard.utils";
import {
  FretboardAction,
  FretboardState,
  FretNumber,
  StringNumber,
} from "../types";

export const FretboardProvider = ({ children }: { children: ReactNode }) => {
  const { fretboard, fretboardState, highlightFret, setStartAtFret } =
    useFretboard(INITIAL_TUNING, INITIAL_NUM_OF_FRETS);

  const fretboardReducer = (
    state: FretboardState,
    action: FretboardAction
  ): FretboardState => {
    switch (action.type) {
      case "HIGHLIGHT_FRET":
        highlightFret(action.payload.string, action.payload.fret);
        return {
          ...state,
          computed: {
            currentNotes: getCurrentNotes(fretboard),
            currentChord: identifyChord(fretboard.strings),
            activeFrets: getActiveFrets(fretboard),
          },
        };

      case "SET_START_FRET":
        setStartAtFret(action.payload);
        return {
          ...state,
          computed: {
            currentNotes: getCurrentNotes(fretboard),
            currentChord: identifyChord(fretboard.strings),
            activeFrets: getActiveFrets(fretboard),
          },
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fretboardReducer, fretboardState);
  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
      controls: {
        highlightFret: (string: StringNumber, fret: FretNumber) =>
          dispatch({ type: "HIGHLIGHT_FRET", payload: { string, fret } }),
        setStartAtFret: (fret: FretNumber) =>
          dispatch({ type: "SET_START_FRET", payload: fret }),
      },
    }),
    [state]
  );

  return (
    <FretboardContext.Provider value={contextValue}>
      {children}
    </FretboardContext.Provider>
  );

  // const currentNotes = getCurrentNotes(fretboard);
  // const activeFrets = getActiveFrets(fretboard);
  // const currentChord: string = identifyChord(fretboard.strings);
  // const contextValue = useMemo(
  //   () => ({
  //     highlightFret,
  //     setStartAtFret,
  //     fretboard,
  //     currentNotes,
  //     currentChord,
  //     activeFrets,
  //   }),
  //   [
  //     highlightFret,
  //     setStartAtFret,
  //     fretboard,
  //     currentNotes,
  //     currentChord,
  //     activeFrets,
  //   ]
  // );

  // return (
  //   <FretboardContext.Provider value={contextValue}>
  //     {children}
  //   </FretboardContext.Provider>
  // );
};
