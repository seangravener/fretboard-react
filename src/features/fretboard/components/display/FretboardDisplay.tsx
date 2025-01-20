import { FretboardDisplayOptions } from "../../types";
import { CurrentChordDisplay } from "./CurrentChordDisplay";
import { FretboardStrings } from "./FretboardStrings";
import { FretboardNoteLabels } from "./FretboardNoteLabels";
import { StringIndicators } from "./StringIndicators";
import { ChordDisplay } from "./ChordDisplay";
import { useFretboardContext } from "../../hooks/useFretboardContext";

import "./FretboardDisplay.css";
import { FretboardControls } from "./FretboardControls";

export const FretboardDisplay = ({ displayNotes }: FretboardDisplayOptions) => {
  const { fretboard, highlightFret, setStartAtFret } = useFretboardContext();

  return (
    <>
      <button onClick={() => setStartAtFret(2)}>Change Fret Start</button>
      <CurrentChordDisplay style={{ margin: "22px" }} />
      <ChordDisplay />
      <FretboardControls
        fretboard={fretboard}
        onStartFretChange={setStartAtFret}
        onDisplayNotesToggle={() => {}}
      />
      <div className="fretboard-container">
        <FretboardNoteLabels />
        <StringIndicators fretboard={fretboard} onFretClick={highlightFret} />
        <FretboardStrings
          fretboard={fretboard}
          onFretClick={highlightFret}
          displayNotes={displayNotes}
        />
      </div>
    </>
  );
};
