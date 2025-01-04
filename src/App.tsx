import "./App.css";
import { fretboardG as fretboard } from "./fretboard";

function App() {
  return (
    <>
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
                >
                  <span
                    style={{
                      color: "#090",
                      zIndex: "inherit",
                      fontWeight: "bolder",
                      position: "relative",
                      background: "#ccc",
                    }}
                  >
                    {fret.note}
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      <hr />
      <div className="fretboard">
        {fretboard.strings.map((string) => (
          <>
            <h2>{string.stringNumber}</h2>
            <div className="guitar-string" key={string.stringNumber}>
              {string.frets.map((fret) => (
                <div
                  className={`fret ${fret.isHighlighted ? "highlighted" : ""}`}
                  key={`${string.stringNumber}-${fret.fretNumber}`}
                >
                  {fret.note}
                </div>
              ))}
            </div>
          </>
        ))}
      </div>

      <div style={{ background: "#000" }}></div>
      <div className="container">
        <div>item</div>
        <div>item</div>
        <div>item</div>
        <div>item</div>
        <div>item</div>
        <div>item</div>
        <div>item</div>
      </div>
    </>
  );
}

export default App;
