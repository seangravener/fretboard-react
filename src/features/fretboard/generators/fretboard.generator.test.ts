import { describe, it, expect } from "vitest";

import {
  INITIAL_NUM_OF_FRETS,
  INITIAL_START_AT_FRET,
  INITIAL_TUNING,
  MUTED_FRET,
} from "../constants";
import { FretNumber, FrettedStringPositions, Tuning } from "../types";
import { generateFretboard } from "./fretboard.generator";

const OPEN_STRING_OFFSET = 1;

describe("generateFretboard", () => {
  it("generates default fretboard configuration", () => {
    const fretboard = generateFretboard();

    expect(fretboard.startAtFret).toBe(INITIAL_START_AT_FRET);
    expect(fretboard.strings).toHaveLength(INITIAL_TUNING.length);
    expect(fretboard.strings[0].frets).toHaveLength(
      INITIAL_NUM_OF_FRETS + OPEN_STRING_OFFSET
    );
  });

  it("handles custom tuning", () => {
    const customTuning: Tuning = ["D", "A", "D", "G", "B", "E"];
    const fretboard = generateFretboard(customTuning);

    expect(fretboard.strings[0].openNote).toBe("D");
    expect(fretboard.strings).toHaveLength(customTuning.length);
  });

  it("processes muted frets", () => {
    const mutedPositions = [MUTED_FRET, 0, 2, 3, 0, 0] as FrettedStringPositions // prettier-ignore
    const fretboard = generateFretboard(
      INITIAL_TUNING,
      INITIAL_NUM_OF_FRETS,
      INITIAL_START_AT_FRET,
      mutedPositions
    );

    expect(
      fretboard.strings[0].frets.every((fret) => !fret.isHighlighted)
    ).toBe(true);
  });

  it("supports custom starting fret position", () => {
    const startFret = 5 as FretNumber;
    const fretboard = generateFretboard(
      INITIAL_TUNING,
      INITIAL_NUM_OF_FRETS,
      startFret
    );

    expect(fretboard.startAtFret).toBe(startFret);
    expect(fretboard.strings[0].frets).toHaveLength(
      INITIAL_NUM_OF_FRETS + OPEN_STRING_OFFSET
    );
  });

  it("handles custom number of frets", () => {
    const customFrets = 12 as FretNumber;
    const fretboard = generateFretboard(INITIAL_TUNING, customFrets);

    expect(fretboard.strings[0].frets).toHaveLength(
      customFrets + OPEN_STRING_OFFSET
    );
    expect(fretboard.strings).toHaveLength(INITIAL_TUNING.length);
  });
});
