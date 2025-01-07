import { useContext } from "react";
import { FretboardContext } from "../contexts/FretboardContext";

export const useFretboardContext = () => {
  const context = useContext(FretboardContext);

  if (!context) {
    throw new Error(
      "useFretboardContext must be used within FretboardProvider"
    );
  }
  return context;
};
