import { describe, it, expect } from "vitest";
import { generateString } from "./string.generator";
import { FretNumber, StringNumber } from "../types";

const OPEN_FRET_OFFSET = 1;

describe("generateString", () => {
  it("generates a string with correct properties", () => {
    const stringNumber = 1 as StringNumber;
    const openNote = "E";
    const numFrets = 12 as FretNumber;
    const startAtFret = 0 as FretNumber;
    const highlightedFret = 0 as FretNumber;

    const guitarString = generateString(
      stringNumber,
      openNote,
      numFrets,
      startAtFret,
      highlightedFret
    );

    expect(guitarString.stringNumber).toBe(stringNumber);
    expect(guitarString.openNote).toBe(openNote);
    expect(guitarString.frets).toHaveLength(numFrets + OPEN_FRET_OFFSET);
  });

  it("creates correct number of frets", () => {
    const numFrets = 24 as FretNumber;
    const guitarString = generateString(
      1 as StringNumber,
      "E",
      numFrets,
      0 as FretNumber,
      0 as FretNumber
    );

    expect(guitarString.frets).toHaveLength(numFrets + OPEN_FRET_OFFSET);
  });

  it("handles different starting fret positions", () => {
    const startAtFret = 5 as FretNumber;
    const guitarString = generateString(
      1 as StringNumber,
      "E",
      12 as FretNumber,
      startAtFret,
      7 as FretNumber
    );

    expect(guitarString.frets[0].fretNumber + startAtFret).toBe(startAtFret);
  });

  it("correctly sets highlighted fret", () => {
    const highlightedFret = 7 as FretNumber;
    const guitarString = generateString(
      1 as StringNumber,
      "E",
      12 as FretNumber,
      0 as FretNumber,
      highlightedFret
    );

    expect(guitarString.frets[highlightedFret].isHighlighted).toBe(true);
    expect(guitarString.frets[0].isHighlighted).toBe(false);
  });

  it("handles different string numbers", () => {
    const stringNumber = 6 as StringNumber;
    const guitarString = generateString(
      stringNumber,
      "E",
      12 as FretNumber,
      0 as FretNumber,
      0 as FretNumber
    );

    expect(guitarString.stringNumber).toBe(stringNumber);
  });
});
