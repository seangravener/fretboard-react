import { createContext } from "react";
import { Fretboard, FretNumber } from "../types";

interface FretboardContextType {
  fretboard: Fretboard;
  highlightFret: (stringNumber: number, fretNumber: FretNumber) => void;
  currentNotes: string[];
}

export const FretboardContext = createContext<FretboardContextType | null>(
  null
);
