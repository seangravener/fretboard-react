import { useState } from "react";
import { generateFretboard } from "../generators/fretboardGenerator";
import { Fretboard, FretNumber, StringNumber, Tuning } from "../types";
import { INITIAL_HIGHLIGHTED_FRETS } from "../constants";

export const useFretboard = (
  initialTuning: Tuning,
  initialFrets: FretNumber
) => {
  const [fretboard, setFretboard] = useState<Fretboard>(() => {
    const defaultOpenFrets = INITIAL_HIGHLIGHTED_FRETS;
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
