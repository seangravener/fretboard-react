import { Fretboard } from "../types";
import { getStringIndicator } from "../util";
import "./FretboardDisplay.css";

type Props = {
  fretboard: Fretboard;
  options?: { displayNotes: boolean };
  onFretClick?: (stringNum: number, fretNum: number) => void;
};

interface StringIndicatorsProps {
  fretboard: Fretboard;
}

export const StringIndicators = ({
  fretboard,
}: StringIndicatorsProps) => (
  <div className="string-indicators" aria-label="String Indicators">
    {fretboard.strings.map((string) => (
      <div
        key={`string-indicator-${string.stringNumber}`}
        className="string-indicator"
        data-string-number={string.stringNumber}
      >
        {getStringIndicator(string)}
      </div>
    ))}
  </div>
);

export const FretboardNoteLabels = () => {
  return (
    <div className="note-labels">
      {["E", "A", "D", "G", "B", "e"].map((note) => (
        <div className="note-label" key={note}>
          <span>{note}</span>
        </div>
      ))}
    </div>
  );
};

export const FretboardDisplay = ({
  fretboard,
  options,
  onFretClick,
}: Props) => {
  return (
    <div className="fretboard-container">
      <FretboardNoteLabels></FretboardNoteLabels>
      <StringIndicators fretboard={fretboard}></StringIndicators>

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
                {options?.displayNotes ? <span>{fret.note}</span> : ""}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
