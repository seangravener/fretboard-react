import { Fretboard, FretNumber, StringNumber } from "../../types";

type FretboardStringsProps = {
  fretboard: Fretboard;
  options?: { displayNotes: boolean };
  onFretClick?: (stringNum: StringNumber, fretNum: FretNumber) => void;
};

export const FretboardStrings = ({
  fretboard,
  options,
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
            {options?.displayNotes ? <span>{fret.note}</span> : null}
          </button>
        ))}
      </div>
    ))}
  </div>
);
