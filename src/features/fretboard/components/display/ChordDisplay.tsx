// get fretboard and current notes from createContext
// use identifyCord() to get chordName
// render div.chord-display; h3; div.chord-name; div.chord-notes

import { useFretboardContext } from "../../hooks/useFretboardContext";
import { identifyChord } from "../../utils/chord.utils";

export const ChordDisplay = () => {
  const {
    fretboardState: { fretboard, computed },
  } = useFretboardContext();
  const chordName = identifyChord(fretboard.strings);

  return (
    <div className="chord-display">
      <h3>Chord Display</h3>
      <div className="chord-name">{chordName || "No chord detected"}</div>
      <div className="chord-notes">{computed.currentNotes.join(" / ")}</div>
    </div>
  );
};
