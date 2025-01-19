import { useFretboardContext } from "../../hooks/useFretboardContext";

type FretboardStringsProps = {
  displayNotes: boolean;
};

export const FretboardStrings = (displayNotes: FretboardStringsProps) => {
  const { fretboard, highlightFret } = useFretboardContext();

  return (
    <div className="fretboard">
      {fretboard.strings.map((string) => (
        <div className="string" key={string.stringNumber}>
          {string.frets.slice(1).map((fret) => (
            <button
              key={`${fret.note}-${fret.fretNumber}`}
              className={`fret ${fret.isHighlighted ? "active" : ""}`}
              aria-label="Fret"
              onClick={() =>
                highlightFret(string.stringNumber, fret.fretNumber)
              }
            >
              {displayNotes ? <span>{fret.note}</span> : null}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
