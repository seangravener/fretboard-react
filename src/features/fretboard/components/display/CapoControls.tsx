import { FINAL_FRET_NUM, FIRST_FRET_NUM } from "../../constants";
import { FretNumber } from "../../types";
import { ChordViewer } from "./ChordViewer";
import { useFretboardService } from "../../contexts/hooks/useFretboardService";

type Props = {
  onDisplayNotesToggle: () => void;
  displayNotes?: boolean;
};

export const CapoControls = ({
  onDisplayNotesToggle,
  displayNotes = false,
}: Props) => {
  const { fretboard, setStartAtFret } = useFretboardService();
  const incrementFret = () => {
    setStartAtFret((fretboard.startAtFret + 1) as FretNumber);
  };

  const decrementFret = () => {
    if (fretboard.startAtFret > FIRST_FRET_NUM) {
      setStartAtFret((fretboard.startAtFret - 1) as FretNumber);
    }
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="mb-4">
          <ChordViewer />
        </div>
        <div
          className="fretboard-controls bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-lg p-6 shadow-xl"
          aria-label="Fretboard Controls"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Capo
            </span>
            <span className="text-white"> Position</span>
          </h3>

          <div className="fret-position-controls text-center mb-6">
            <div className="flex items-center justify-center gap-4">
              <button
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={decrementFret}
                disabled={fretboard.startAtFret === FIRST_FRET_NUM}
              >
                ↑
              </button>
              <div
                className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white font-bold text-xl min-w-[60px]"
                title="Current Start Fret"
              >
                {fretboard.startAtFret}
              </div>
              <button
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={incrementFret}
                disabled={fretboard.startAtFret === FINAL_FRET_NUM}
              >
                ↓
              </button>
            </div>
          </div>

          <div className="display-controls text-center">
            <label className="flex items-center justify-center gap-3 text-slate-300 text-lg cursor-pointer">
              <input
                type="checkbox"
                checked={displayNotes}
                onChange={onDisplayNotesToggle}
                className="w-5 h-5 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
              />
              <span className="font-medium">Show Notes</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
