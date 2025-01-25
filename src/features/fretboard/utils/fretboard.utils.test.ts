import { describe, it, expect } from "vitest";
import {
  getCurrentNotes,
  getFrettedFrets,
  calcNoteAtFret,
  isStringOpen,
  getStringIndicator,
  getFrettedFretNumbers,
} from "./fretboard.utils";
// import { CHROMATIC_SCALE } from "../constants";
import type {
  Fret,
  Fretboard,
  FretboardString,
  FretNumber,
  FretPositions,
  FrettedFrets,
} from "../types";
import { INACTIVE_FRET } from "../constants";

describe("Fretboard Utils", () => {
  describe("getCurrentNotes", () => {
    it("should return empty array when no notes are highlighted", () => {
      const fretboard: Fretboard = {
        startAtFret: 1,
        strings: [
          {
            frets: [{ fretNumber: 0, isHighlighted: false, note: "E" }],
            stringNumber: 1,
            openNote: "E",
          },
        ],
      };
      expect(getCurrentNotes(fretboard)).toEqual([]);
    });

    it("should return highlighted notes", () => {
      const fretboard: Fretboard = {
        startAtFret: 1,
        strings: [
          {
            stringNumber: 1,
            openNote: "E",
            frets: [
              { fretNumber: 0, isHighlighted: true, note: "E" },
              { fretNumber: 1, isHighlighted: true, note: "F" },
            ],
          },
        ],
      };
      expect(getCurrentNotes(fretboard)).toEqual(["E", "F"]);
    });
  });

  describe("getFrettedNumbers", () => {
    it("should return inactive fret when no frets are highlighted", () => {
      const fretboard: Fretboard = {
        startAtFret: 1,
        strings: [
          {
            frets: [{ fretNumber: 3, isHighlighted: true, note: "G" }],
            stringNumber: 1,
            openNote: "E",
          },
          {
            frets: [{ fretNumber: 12, isHighlighted: true, note: "A" }],
            stringNumber: 2,
            openNote: "A",
          },
          {
            frets: [{ fretNumber: 3, isHighlighted: true, note: "G" }],
            stringNumber: 3,
            openNote: "E",
          },
          {
            frets: [{ fretNumber: 12, isHighlighted: true, note: "A" }],
            stringNumber: 4,
            openNote: "A",
          },
          {
            frets: [{ fretNumber: 0, isHighlighted: true, note: "D" }],
            stringNumber: 5,
            openNote: "D",
          },
          {
            frets: [{ fretNumber: 1, isHighlighted: true, note: "G#" }],
            stringNumber: 6,
            openNote: "G",
          },
        ],
      };

      const expected = fretboard.strings.flatMap((string) => string.frets);
      expect(getFrettedFrets(fretboard)).toStrictEqual(expected);
    });

    it("should return last highlighted fret for each string", () => {
      const fretboard: Fretboard = {
        startAtFret: 1,
        strings: [
          {
            stringNumber: 1,
            openNote: "E",
            frets: [
              { fretNumber: 0, isHighlighted: true, note: "E" },
              { fretNumber: 1, isHighlighted: true, note: "F" },
            ],
          },
        ],
      };

      const expected = Array(6).fill(INACTIVE_FRET) as FrettedFrets;
      expected[0] = fretboard.strings[0].frets[1];

      const result = getFrettedFrets(fretboard);
      expect(result).toHaveLength(6);
      expect(result[result.length - 1]).toEqual(expected[expected.length - 1]);
      expect(result).toStrictEqual(expected);
    });
  });

  describe("getActiveFretNumbers", () => {
    it("should return array of fret numbers with last highlighted position", () => {
      const fretboard: Fretboard = {
        startAtFret: 1,
        strings: [
          {
            stringNumber: 1,
            openNote: "E",
            frets: [{ fretNumber: 1, isHighlighted: true, note: "F" }],
          },
          {
            stringNumber: 2,
            openNote: "A",
            frets: [{ fretNumber: 2, isHighlighted: true, note: "B" }],
          },
          {
            stringNumber: 3,
            openNote: "D",
            frets: [{ fretNumber: 0, isHighlighted: false, note: "D" }],
          },
          {
            stringNumber: 4,
            openNote: "G",
            frets: [{ fretNumber: 0, isHighlighted: false, note: "G" }],
          },
          {
            stringNumber: 5,
            openNote: "B",
            frets: [{ fretNumber: 0, isHighlighted: false, note: "B" }],
          },
          {
            stringNumber: 6,
            openNote: "E",
            frets: [{ fretNumber: 0, isHighlighted: false, note: "E" }],
          },
        ],
      };

      expect(getFrettedFretNumbers(fretboard)).toEqual([1, 2, 0, 0, 0, 0]);
    });
  });

  describe("calcNoteAtFret", () => {
    it("should calculate correct note at fret", () => {
      expect(calcNoteAtFret("E", 1 as FretNumber)).toBe("F");
      expect(calcNoteAtFret("E", 12 as FretNumber)).toBe("E");
    });

    it("should throw error for invalid note", () => {
      expect(() => calcNoteAtFret("H", 1 as FretNumber)).toThrowError(
        "Invalid note: H"
      );
    });
  });

  describe("isStringOpen", () => {
    it("should return true for open string", () => {
      const string: FretboardString = {
        stringNumber: 1,
        openNote: "E",
        frets: [{ fretNumber: 0, isHighlighted: true, note: "E" }],
      };
      expect(isStringOpen(string)).toBe(true);
    });

    it("should return false for non-open string", () => {
      const string: FretboardString = {
        stringNumber: 1,
        openNote: "E",
        frets: [
          { fretNumber: 0, isHighlighted: false, note: "E" },
          { fretNumber: 1, isHighlighted: true, note: "F" },
        ],
      };
      expect(isStringOpen(string)).toBe(false);
    });
  });

  describe("getStringIndicator", () => {
    it('should return "O" for open string', () => {
      const string: FretboardString = {
        stringNumber: 1,
        openNote: "E",
        frets: [{ fretNumber: 0, isHighlighted: true, note: "E" }],
      };
      expect(getStringIndicator(string)).toBe("O");
    });

    it('should return "X" for non-open string', () => {
      const string: FretboardString = {
        stringNumber: 1,
        openNote: "E",
        frets: [{ fretNumber: 0, isHighlighted: false, note: "E" }],
      };
      expect(getStringIndicator(string)).toBe("X");
    });
  });
});
