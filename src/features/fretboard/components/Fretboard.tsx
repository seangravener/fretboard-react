import { useFretboardContext } from "../hooks/useFretboardContext";
import { FretboardDisplay } from "./FretboardDisplay";

export const Fretboard = () => {
  const { fretboard, highlightFret } = useFretboardContext();

  return (
    <FretboardDisplay
      fretboard={fretboard}
      onFretClick={highlightFret}
      options={{ displayNotes: true }}
    />
  );
};
