import { FretboardDisplayOptions } from "../../types";
import { ActiveNotes } from "./ActiveNotes";
import { FretboardGrid } from "./FretboardGrid";
import { StringLabels } from "./StringLabels";
import { StringStatus } from "./StringStatus";
import { useFretboardService } from "../../contexts/hooks/useFretboardService";

import "./FretboardDisplay.scss";
import { CapoControls } from "./CapoControls";

export const FretboardNeck = ({ displayNotes }: FretboardDisplayOptions) => {
  const { fretboard, toggleFret, setStartAtFret } = useFretboardService();

  return (
    <>
      <ActiveNotes style={{ margin: "22px" }} />

      <div className="flex max-w-3xl m-auto">
        <div className="fretboard-container">
          <StringLabels />
          <StringStatus fretboard={fretboard} onFretClick={toggleFret} />
          <FretboardGrid
            fretboard={fretboard}
            onFretClick={toggleFret}
            displayNotes={displayNotes}
          />
        </div>

        <CapoControls onDisplayNotesToggle={() => {}} />
      </div>

      <button onClick={() => setStartAtFret(3)}>Change Fret Start 3</button>
      <button onClick={() => setStartAtFret(6)}>Change Fret Start 6</button>
    </>
  );
};
