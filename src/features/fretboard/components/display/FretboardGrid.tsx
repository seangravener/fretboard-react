import { Fretboard, FretNumber, StringNumber } from "../../types";

type FretboardStringsProps = {
  fretboard: Fretboard;
  displayNotes?: boolean;
  onFretClick?: (stringNum: StringNumber, fretNum: FretNumber) => void;
};

export const FretboardGrid = ({
  fretboard,
  displayNotes,
  onFretClick,
}: FretboardStringsProps) => (
  <div className="fretboard-display">
    {fretboard.strings.map((string) => (
      <div className="fretboard-string" key={string.stringNumber}>
        {string.frets.slice(1).map((fret) => (
          <button
            key={`${fret.note}-${fret.fretNumber}`}
            className={`fretboard-fret ${fret.isHighlighted ? "fretboard-active" : ""}`}
            aria-label="Fret"
            onClick={() => onFretClick?.(string.stringNumber, fret.fretNumber)}
          >
            {displayNotes ? <span>{fret.note}</span> : null}
          </button>
        ))}
      </div>
    ))}
  </div>
);
