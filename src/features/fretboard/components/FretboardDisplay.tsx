import { Fretboard } from "../types";
import "./FretboardDisplay.css";

type Props = {
  fretboard: Fretboard;
  options?: { displayNotes: boolean };
  onFretClick?: (stringNum: number, fretNum: number) => void;
};

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
