import { FIRST_FRET } from "../../constants";
import { Fretboard, FretNumber } from "../../types";

type Props = {
  fretboard: Fretboard;
  onStartFretChange: (fret: FretNumber) => void;
  onDisplayNotesToggle: () => void;
  displayNotes?: boolean;
};

export const FretboardControls = ({
  fretboard,
  onStartFretChange,
  onDisplayNotesToggle,
  displayNotes = false,
}: Props) => {
  const incrementFret = () => {
    onStartFretChange((fretboard.startAtFret + 1) as FretNumber);
  };

  const decrementFret = () => {
    if (fretboard.startAtFret > FIRST_FRET) {
      onStartFretChange((fretboard.startAtFret - 1) as FretNumber);
    }
  };

  return (
    <div className="fretboard-controls" aria-label="Fretboard Controls">
      <div className="fret-position-controls">
        <button
          onClick={decrementFret}
          disabled={fretboard.startAtFret === FIRST_FRET}
        >
          ↑
        </button>
        <span>Start Fret: {fretboard.startAtFret}</span>
        <button onClick={incrementFret}>↓</button>
      </div>
      <div className="display-controls">
        <label>
          <input
            type="checkbox"
            checked={displayNotes}
            onChange={onDisplayNotesToggle}
          />
          Show Notes
        </label>
      </div>
    </div>
  );
};
