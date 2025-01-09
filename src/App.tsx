import { FretboardProvider } from "./features/fretboard/contexts/FretboardProvider";
import { Fretboard } from "./features/fretboard/components/Fretboard";

export const App = () => {
  return (
    <FretboardProvider>
      <Fretboard />
    </FretboardProvider>
  );
};
