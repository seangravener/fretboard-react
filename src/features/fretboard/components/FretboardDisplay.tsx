import { useFretboardContext } from "../hooks/useFretboardContext";
import { Fretboard, FretNumber, StringNumber } from "../types";
import { getStringIndicator } from "../util";
import "./FretboardDisplay.css";

type Props = {
  fretboard: Fretboard;
  options?: { displayNotes: boolean };
  onFretClick?: (stringNum: StringNumber, fretNum: FretNumber) => void;
};

export const StringIndicators = ({
  fretboard,
  options,
  onFretClick,
}: Props) => (
  <div className="string-indicators" aria-label="String Indicators">
    {fretboard.strings.map((string) => (
      <button
        key={`string-indicator-${string.stringNumber}`}
        className="string-indicator"
        data-string-number={string.stringNumber}
        onClick={() => onFretClick?.(string.stringNumber, 0)}
        title={options?.displayNotes ? string.openNote : ""}
      >
        {string.frets.map(fret => fret.isHighlighted).join(' ')}
        {getStringIndicator(string)}
      </button>
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

export const CurrentChordDisplay = ({
  style,
}: {
  style: React.CSSProperties;
}) => {
  const { currentNotes } = useFretboardContext();

  return (
    <div style={style}>
      Current Notes:{" "}
      <code style={{ fontSize: "1rem" }}>{currentNotes?.join(" / ")}</code>
    </div>
  );
};

export const FretboardDisplay = ({
  fretboard,
  options,
  onFretClick,
}: Props) => {
  return (
    <>
      <CurrentChordDisplay style={{ margin: "22px" }} />

      <div className="fretboard-container">
        <FretboardNoteLabels />

        <StringIndicators onFretClick={onFretClick} fretboard={fretboard} />

        <div className="fretboard">
          {fretboard.strings.map((string) => (
            <div className="string" key={string.stringNumber}>
              {string.frets.slice(1).map((fret) => (
                <button
                  key={`${fret.note}-${fret.fretNumber}`}
                  className={`fret ${fret.isHighlighted ? "active" : ""}`}
                  aria-label="Fret"
                  onClick={() =>
                    onFretClick?.(string.stringNumber, fret.fretNumber)
                  }
                >
                  {options?.displayNotes ? <span>{fret.note}</span> : null}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
