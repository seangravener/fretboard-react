import "./App.css";
import { fretboard } from "./fretboard";

function App() {
  return (
    <>
      <div className="fretboard-container">
        <div className="note-labels">
          <div className="note-label"><span>E</span></div>
          <div className="note-label"><span>A</span></div>
          <div className="note-label"><span>D</span></div>
          <div className="note-label"><span>G</span></div>
          <div className="note-label"><span>B</span></div>
          <div className="note-label"><span>e</span></div>
        </div>

        <div className="fretboard">
          <div className="string">
            {/* <div className="note-label">E</div> */}
            <div className="fret"></div>
            <div className="fret active"></div>
            <div className="fret"></div>
            <div className="fret"></div>
          </div>
          <div className="string">
            {/* <div className="note-label">A</div> */}
            <div className="fret"></div>
            <div className="fret"></div>
            <div className="fret"></div>
            <div className="fret"></div>
          </div>
          <div className="string">
            {/* <div className="note-label">D</div> */}
            <div className="fret"></div>
            <div className="fret"></div>
            <div className="fret"></div>
            <div className="fret"></div>
          </div>
          <div className="string">
            {/* <div className="note-label">G</div> */}
            <div className="fret"></div>
            <div className="fret"></div>
            <div className="fret"></div>
            <div className="fret"></div>
          </div>
          <div className="string">
            {/* <div className="note-label">B</div> */}
            <div className="fret"></div>
            <div className="fret"></div>
            <div className="fret"></div>
            <div className="fret"></div>
          </div>
          <div className="string">
            {/* <div className="note-label">E</div> */}
            <div className="fret"></div>
            <div className="fret"></div>
            <div className="fret"></div>
            <div className="fret"></div>
          </div>
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
