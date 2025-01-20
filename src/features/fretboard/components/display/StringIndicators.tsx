import { Fretboard, FretNumber, StringNumber } from "../../types";
import { getStringIndicator } from "../../utils/fretboard.utils";

type Props = {
  fretboard: Fretboard;
  onFretClick?: (stringNum: StringNumber, fretNum: FretNumber) => void;
};

export const StringIndicators = ({ fretboard, onFretClick }: Props) => (
  <div className="string-indicators" aria-label="String Indicators">
    {fretboard.strings.map((string) => (
      <button
        key={`string-indicator-${string.stringNumber}`}
        className="string-indicator"
        data-string-number={string.stringNumber}
        onClick={() => onFretClick?.(string.stringNumber, 0)}
        title={
          (string.frets[0].isHighlighted ? `Open` : `Muted`) +
          ` (${string.openNote})`
        }
      >
        {getStringIndicator(string)}
      </button>
    ))}
  </div>
);
