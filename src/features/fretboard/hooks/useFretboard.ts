import { useState } from "react";
import { generateFretboard } from "../generators/fretboardGenerator";
import {
  Fret,
  Fretboard,
  FretNumber,
  GuitarString,
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

  const currentNotes = fretboard.strings
    .flatMap((string) => string.frets)
    .filter((fret) =>
      fret.fretNumber !== 0 ? fret.isHighlighted : !fret.isHighlighted
    )
    // .filter((fret) => fret.isHighlighted)
    .map((fret) => fret.note);

  return {
    fretboard,
    highlightFret,
    currentNotes,
  };
};
