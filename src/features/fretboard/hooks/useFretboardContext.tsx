import { useContext } from "react";
import { FretboardContext } from "../contexts/FretboardContext";
import { FretboardContextType } from "../types";

export const useFretboardContext = () => {
  const context = useContext<FretboardContextType | null>(FretboardContext);

  if (!context) {
    throw new Error(
      "useFretboardContext must be used within FretboardProvider"
    );
  }
  return context;
};
