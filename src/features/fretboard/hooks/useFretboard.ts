import { useState } from "react";
import { generateFretboard } from "../generators/fretboardGenerator";
import { Fretboard, FretNumber, StringNumber } from "../types";

export const useFretboard = (
  initialTuning: string[],
  initialFrets: FretNumber
) => {
  const [fretboard, setFretboard] = useState<Fretboard>(() => {
    const defaultOpenFrets = [[0], [0], [0], [0], [0], [0]];
    return generateFretboard(initialTuning, initialFrets, defaultOpenFrets);
  });

  // @TODO Rename to toggleFret
  const highlightFret = (
    stringNumber: StringNumber,
    fretNumber: FretNumber
  ) => {
    setFretboard((prevFretboard) => ({
      ...prevFretboard,
      strings: prevFretboard.strings.map((string) => {
        if (string.stringNumber !== stringNumber) return string;

        const hasHighlightedFrets = string.frets.every(
          (fret) => fret.isHighlighted
        );

        return {
          ...string,
          isOpen: hasHighlightedFrets,
          frets: string.frets.map((fret) => ({
            ...fret,
            isHighlighted:
              fret.fretNumber === fretNumber && !fret.isHighlighted,
          })),
        };
      }),
    }));
  };

  // To implement this approach:

  // Initialize fret[0].isHighlighted = true for open strings
  // Set fret[0].isHighlighted = false when muting
  // Update the string.isOpen property based on this convention
  // This would make the state management more straightforward and reduce the need for condition inversions throughout the code. The mental model becomes:

  // Highlighted = active/playing
  // Not highlighted = inactive/muted
  const activeFrets = fretboard.strings.map((currString) => {
    return currString.frets.filter((fret) => fret.isHighlighted).at(-1);
  });

  // @TODO remove
  const currentNotes = fretboard.strings
    .flatMap((string) => string.frets)
    .filter((fret) => fret.isHighlighted)
    .map((fret) => fret.note);

  return {
    fretboard,
    highlightFret,
    currentNotes,
    activeFrets,
  };
};
