import { createContext } from "react";
import { FretboardContextType } from "../types";

export const FretboardContext = createContext<FretboardContextType | null>(
  null
);
