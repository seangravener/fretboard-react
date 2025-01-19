import { FretboardDisplayOptions } from "../../types";
import { CurrentChordDisplay } from "./CurrentChordDisplay";
import { FretboardStrings } from "./FretboardStrings";
import { FretboardNoteLabels } from "./FretboardNoteLabels";
import { StringIndicators } from "./StringIndicators";
import { ChordDisplay } from "./ChordDisplay";

import "./FretboardDisplay.css";

export const FretboardDisplay = ({ displayNotes }: FretboardDisplayOptions) => {
  return (
    <>
      <CurrentChordDisplay style={{ margin: "22px" }} />
      <ChordDisplay />
      <div className="fretboard-container">
        <FretboardNoteLabels />
        <StringIndicators displayNotes={displayNotes} />
        <FretboardStrings displayNotes={displayNotes} />
      </div>
    </>
  );
};
