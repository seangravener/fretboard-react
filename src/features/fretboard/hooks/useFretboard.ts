import { useState } from "react";
import { generateFretboard } from "../generators/fretboardGenerator";
import {
  Fretboard,
  FretNumber,
  StringNumber,
} from "../types";

export const useFretboard = (
  initialTuning: string[],
  initialFrets: FretNumber
) => {
  const [fretboard, setFretboard] = useState<Fretboard>(
    generateFretboard(initialTuning, initialFrets)
  );

  const highlightFret = (
    stringNumber: StringNumber,
    fretNumber: FretNumber
  ) => {
    setFretboard((prevFretboard) => ({
      ...prevFretboard,
      strings: prevFretboard.strings.map((string) => {
        if (string.stringNumber !== stringNumber) return string;

        const currentFrets = string.frets.map((fret) => fret.isHighlighted);
        const isFret0 = fretNumber === 0;

        // Handle fret 0 (explicit muting) logic
        if (isFret0) {
          return {
            ...string,
            isOpen: !string.frets[0].isHighlighted,
            frets: string.frets.map((fret) => ({
              ...fret,
              isHighlighted:
                fret.fretNumber === 0 ? !fret.isHighlighted : false,
            })),
          };
        }

        // Handle regular fret highlighting
        const updatedFrets = string.frets.map((fret) => ({
          ...fret,
          isHighlighted:
            fret.fretNumber === fretNumber
              ? !fret.isHighlighted
              : fret.isHighlighted,
        }));

        // Check if all frets except 0 are not highlighted
        const hasNoHighlightedFrets = updatedFrets
          .slice(1)
          .every((fret) => !fret.isHighlighted);

        return {
          ...string,
          isOpen: hasNoHighlightedFrets,
          frets: updatedFrets.map((fret) => ({
            ...fret,
            isHighlighted:
              fret.fretNumber === 0
                ? !hasNoHighlightedFrets
                : fret.isHighlighted,
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
    // string is mute d;
    if (!currString.frets[0].isHighlighted && currString.frets.length === 1) {
      return undefined;
    }

    return currString.frets.filter((fret) => fret.isHighlighted).at(-1);
  });

  const currentNotes = fretboard.strings
    .flatMap((string) => string.frets)
    .filter((fret) =>
      fret.fretNumber !== 0 ? fret.isHighlighted : !fret.isHighlighted
    )
    .map((fret) => fret.note);

  return {
    fretboard,
    highlightFret,
    currentNotes,
    activeFrets,
  };
};
