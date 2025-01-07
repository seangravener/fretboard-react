import { DEFAULT_TUNING, DEFAULT_FRETS } from "./features/fretboard/constants";
import { useFretboard } from "./features/fretboard/hooks/useFretboard";
import { FretboardDisplay } from "./features/fretboard/components/FretboardDisplay";

export const App = () => {
  const { fretboard, highlightFret } = useFretboard(
    DEFAULT_TUNING,
    DEFAULT_FRETS
  );

  return (
    <div>
      <FretboardDisplay
        fretboard={fretboard}
        onFretClick={highlightFret}
        options={{ displayNotes: true }}
      />
    </div>
  );
};
