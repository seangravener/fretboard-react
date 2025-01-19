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

        {/* @TODO Use context instead of prop drilling */}
        <StringIndicators onFretClick={highlightFret} fretboard={fretboard} />

        {/* @TODO Use context instead of prop drilling */}
        <FretboardStrings
          fretboard={fretboard}
          displayNotes={displayNotes}
          onFretClick={highlightFret}
        />
      </div>
    </>
  );
};
