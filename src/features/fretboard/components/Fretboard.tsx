import { useFretboardContext } from "../hooks/useFretboardContext";
import { FretboardDisplay } from "./display/FretboardDisplay";

export const Fretboard = () => {
  const { fretboard, highlightFret } = useFretboardContext();

  console.log(fretboard);

  return (
    <FretboardDisplay
      fretboard={fretboard}
      onFretClick={highlightFret}
      options={{ displayNotes: false }}
    />
  );
};
