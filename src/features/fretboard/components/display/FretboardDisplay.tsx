import { Fretboard, FretNumber, StringNumber } from "../../types";
import { CurrentChordDisplay } from "./CurrentChordDisplay";
import { FretboardStrings } from "./FretboardStrings";
import { FretboardNoteLabels } from "./FretboardNoteLabels";
import { StringIndicators } from "./StringIndicators";

import "./FretboardDisplay.css";
import { ChordDisplay } from "./ChordDisplay";

type FretboardDisplayProps = {
  fretboard: Fretboard;
  options?: { displayNotes: boolean };
  onFretClick?: (stringNum: StringNumber, fretNum: FretNumber) => void;
};

export const FretboardDisplay = ({
  fretboard,
  options,
  onFretClick,
}: FretboardDisplayProps) => {
  return (
    <>
      <CurrentChordDisplay style={{ margin: "22px" }} />
      <ChordDisplay />
      <div className="fretboard-container">
        <FretboardNoteLabels />
        <StringIndicators onFretClick={onFretClick} fretboard={fretboard} />
        <FretboardStrings
          fretboard={fretboard}
          options={options}
          onFretClick={onFretClick}
        />
      </div>
    </>
  );
};
