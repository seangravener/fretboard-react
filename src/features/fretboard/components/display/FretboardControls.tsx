import { FINAL_FRET_NUM, FIRST_FRET_NUM } from "../../constants";
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
    if (fretboard.startAtFret > FIRST_FRET_NUM) {
      onStartFretChange((fretboard.startAtFret - 1) as FretNumber);
    }
  };

  return (
    <div className="fretboard-controls" aria-label="Fretboard Controls">
      <div className="fret-position-controls text-center mb-4">
        <button
          className="px-4 py-2 border border-slate-700 bg-slate-200 rounded-lg"
          onClick={decrementFret}
          disabled={fretboard.startAtFret === FIRST_FRET_NUM}
        >
          ↑
        </button>
        <div 
        className=""
        title="Current Start Fret">{fretboard.startAtFret}</div>
        <button
          className="px-4 py-2 border border-slate-700 bg-slate-200 rounded-lg"
          onClick={incrementFret}
          disabled={fretboard.startAtFret === FINAL_FRET_NUM}
        >
          ↓
        </button>
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
