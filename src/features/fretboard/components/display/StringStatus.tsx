import { Fretboard, FretNumber, StringNumber } from "../../types";
import { getStringIndicator } from "../../utils/fretboard.utils";
import { MUTED_FRET_NUM, OPEN_FRET_NUM } from "../../constants";

type Props = {
  fretboard: Fretboard;
  onFretClick?: (stringNum: StringNumber, fretNum: FretNumber) => void;
};

export const StringStatus = ({ fretboard, onFretClick }: Props) => {
  const handleStringIndicatorClick = (stringNumber: StringNumber) => {
    if (!onFretClick) return;

    const string = fretboard.strings.find(s => s.stringNumber === stringNumber);
    if (!string) return;

    const highlightedFret = string.frets.find(fret => fret.isHighlighted);
    const currentFretNumber = highlightedFret?.fretNumber ?? MUTED_FRET_NUM;

    let newFretNumber: FretNumber;

    if (currentFretNumber > 0) {
      newFretNumber = OPEN_FRET_NUM;
    } else if (currentFretNumber === MUTED_FRET_NUM) {
      newFretNumber = OPEN_FRET_NUM;
    } else {
      newFretNumber = MUTED_FRET_NUM;
    }

    onFretClick(stringNumber, newFretNumber);
  };

  const getStringTitle = (string: typeof fretboard.strings[0]) => {
    const highlightedFret = string.frets.find(fret => fret.isHighlighted);
    const currentFretNumber = highlightedFret?.fretNumber ?? MUTED_FRET_NUM;
    
    if (currentFretNumber > 0) {
      return `Fretted at ${currentFretNumber} (${highlightedFret?.note}) - Click to mute`;
    } else if (currentFretNumber === MUTED_FRET_NUM) {
      return `Muted (${string.openNote}) - Click to open`;
    } else {
      return `Open (${string.openNote}) - Click to mute`;
    }
  };

  return (
    <div className="fretboard-string-indicators" aria-label="String Indicators">
      {fretboard.strings.map((string) => (
        <button
          key={`string-indicator-${string.stringNumber}`}
          className="fretboard-string-indicator"
          data-string-number={string.stringNumber}
          onClick={() => handleStringIndicatorClick(string.stringNumber)}
          title={getStringTitle(string)}
        >
          {getStringIndicator(string)}
        </button>
      ))}
    </div>
  );
};
