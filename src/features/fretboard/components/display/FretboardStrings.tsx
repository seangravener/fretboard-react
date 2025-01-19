import { Fretboard, FretNumber, StringNumber } from "../../types";

type FretboardStringsProps = {
  fretboard: Fretboard;
  displayNotes?: boolean;
  onFretClick?: (stringNum: StringNumber, fretNum: FretNumber) => void;
};

export const FretboardStrings = ({
  fretboard,
  displayNotes,
  onFretClick,
}: FretboardStringsProps) => (
  <div className="fretboard">
    {fretboard.strings.map((string) => (
      <div className="string" key={string.stringNumber}>
        {string.frets.slice(1).map((fret) => (
          <button
            key={`${fret.note}-${fret.fretNumber}`}
            className={`fret ${fret.isHighlighted ? "active" : ""}`}
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
