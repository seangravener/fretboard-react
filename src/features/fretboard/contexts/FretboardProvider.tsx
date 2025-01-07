import { ReactNode } from "react";
import { useFretboard } from "../hooks/useFretboard";
import { DEFAULT_FRETS, DEFAULT_TUNING } from "../constants";
import { FretboardContext } from "./FretboardContext";

export const FretboardProvider = ({ children }: { children: ReactNode }) => {
  const fretboardState = useFretboard(DEFAULT_TUNING, DEFAULT_FRETS);

  return (
    <FretboardContext.Provider value={fretboardState}>
      {children}
    </FretboardContext.Provider>
  );
};
