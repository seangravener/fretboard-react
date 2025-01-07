import { DEFAULT_TUNING, DEFAULT_FRETS } from "./features/fretboard/constants";
import { useFretboard } from "./features/fretboard/hooks/useFretboard";
import { FretboardDisplay } from "./features/fretboard/components/FretboardDisplay";
import { FretboardProvider } from "./features/fretboard/contexts/FretboardProvider";
import { Fretboard } from "./features/fretboard/components/Fretboard";

export const App = () => {
  // const { fretboard, highlightFret } = useFretboard(
  //   DEFAULT_TUNING,
  //   DEFAULT_FRETS
  // );

  return (
    <FretboardProvider>
      <div>
        <Fretboard />
        {/* <FretboardDisplay
          fretboard={fretboard}
          onFretClick={highlightFret}
          options={{ displayNotes: true }}
        /> */}
      </div>
    </FretboardProvider>
  );
};
