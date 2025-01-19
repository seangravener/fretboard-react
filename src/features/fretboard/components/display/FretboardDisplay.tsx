import { FretboardDisplayOptions } from "../../types";
import { CurrentChordDisplay } from "./CurrentChordDisplay";
import { FretboardStrings } from "./FretboardStrings";
import { FretboardNoteLabels } from "./FretboardNoteLabels";
import { StringIndicators } from "./StringIndicators";
import { ChordDisplay } from "./ChordDisplay";
import { useFretboardContext } from "../../hooks/useFretboardContext";

import "./FretboardDisplay.css";

export const FretboardDisplay = ({ displayNotes }: FretboardDisplayOptions) => {
  const { fretboard, highlightFret } = useFretboardContext();

  return (
    <>
      <CurrentChordDisplay style={{ margin: "22px" }} />
      <ChordDisplay />
      <div className="fretboard-container">
        <FretboardNoteLabels />
        <StringIndicators
          fretboard={fretboard}
          onFretClick={highlightFret}
          displayNotes={displayNotes}
        />
        <FretboardStrings
          fretboard={fretboard}
          onFretClick={highlightFret}
          displayNotes={displayNotes}
        />
      </div>
    </>
  );
};
