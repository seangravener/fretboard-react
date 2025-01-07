import { useFretboardContext } from "../hooks/useFretboardContext";
import { ChordDisplay } from "./ChordDisplay";
import { FretboardDisplay } from "./FretboardDisplay";

export const Fretboard = () => {
  const { fretboard, highlightFret } = useFretboardContext();

  return (
    <>
      <ChordDisplay />
      <FretboardDisplay
        fretboard={fretboard}
        onFretClick={highlightFret}
        options={{ displayNotes: true }}
      />
    </>
  );
};
