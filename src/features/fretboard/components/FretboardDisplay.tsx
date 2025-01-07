import { Fretboard } from "../types";
import "./FretboardDisplay.css";

type Props = {
  fretboard: Fretboard;
  options?: { displayNotes: boolean };
  onFretClick?: (stringNum: number, fretNum: number) => void;
};

interface FretboardOpenStringsProps2 {
  fretboard: Fretboard;
}

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

export const FretboardOpenStrings = () => {
  return (
    <div className="open-string-indicators">
      {["X", "X", "O", "X", "O", "X"].map((indicator) => (
        <div className="open-string-indicator" key={indicator}>
          {indicator}
        </div>
      ))}
    </div>
  );
};

export const FretboardOpenStrings2 = ({
  fretboard,
}: FretboardOpenStringsProps2) => {
  const getOpenStrings = (fretboard: Fretboard) =>
    fretboard.strings.filter(
      (string) => !string.frets.some((fret) => fret.isHighlighted)
    );

  const openStrings = getOpenStrings(fretboard);

  return (
    <div className="open-string-indicators">
      {openStrings.map((string) => (
        <div key={string.stringNumber} className="open-string-indicator">
          O ({string.stringNumber})
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
      <FretboardOpenStrings></FretboardOpenStrings>
      <FretboardOpenStrings2 fretboard={fretboard}></FretboardOpenStrings2>

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
