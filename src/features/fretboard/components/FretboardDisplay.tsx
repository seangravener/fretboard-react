import { Fretboard } from "../types";
import "./FretboardDisplay.css";

type Props = {
  fretboard: Fretboard;
  onFretClick?: (stringNum: number, fretNum: number) => void;
};

export const FretboardDisplay = ({ fretboard, onFretClick }: Props) => {
  return (
    <div className="fretboard-container">
      <div className="note-labels">
        {["E", "A", "D", "G", "B", "e"].map((note) => (
          <div className="note-label" key={note}>
            <span>{note}</span>
          </div>
        ))}
      </div>

      <div className="fretboard">
        {fretboard.strings.map((string) => (
          <div className="string" key={string.stringNumber}>
            {string.frets.map((fret) => (
              <button
                key={`${fret.note}-${fret.fretNumber}`}
                className={`fret ${fret.isHighlighted ? "active" : ""}`}
                aria-label="Fret"
                onClick={() =>
                  onFretClick
                    ? onFretClick(string.stringNumber, fret.fretNumber)
                    : ""
                }
              >
                <span>{fret.note}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
