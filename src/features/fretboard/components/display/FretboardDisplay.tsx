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
  const {
    fretboardState: { fretboard },
    controls: { highlightFret, setStartAtFret },
  } = useFretboardContext();

  return (
    <>
      <CurrentChordDisplay style={{ margin: "22px" }} />
      <ChordDisplay />

      <div className="flex max-w-3xl m-auto">
        <div className="fretboard-container">
          <FretboardNoteLabels />
          <StringIndicators fretboard={fretboard} onFretClick={highlightFret} />
          <FretboardStrings
            fretboard={fretboard}
            onFretClick={(st, fr) => {
              console.log(st, fr, "onfretclick");
              return highlightFret(st, fr);
            }}
            displayNotes={displayNotes}
          />
        </div>
        <FretboardControls
          fretboard={fretboard}
          onStartFretChange={setStartAtFret}
          onDisplayNotesToggle={() => {}}
        />
      </div>

      <button onClick={() => setStartAtFret(3)}>Change Fret Start 3</button>
      <button onClick={() => setStartAtFret(6)}>Change Fret Start 6</button>
    </>
  );
};
