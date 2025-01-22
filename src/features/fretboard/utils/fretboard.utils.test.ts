import { describe, it, expect } from "vitest";
import {
  getCurrentNotes,
  getActiveFrets,
  calcNoteAtFret,
  isStringOpen,
  getStringIndicator,
} from "./fretboard.utils";
// import { CHROMATIC_SCALE } from "../constants";
import type {
  Fretboard,
  FretboardString,
  FretNumber,
  FrettedStringPositions,
} from "../types";

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

  describe("getActiveFrets", () => {
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
      expect(getActiveFrets(fretboard)).toStrictEqual(expected);
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
      const expected = fretboard.strings.flatMap(
        (string) => string.frets
      ) as unknown as FrettedStringPositions;
      const result = getActiveFrets(fretboard);
      expect(result).toStrictEqual(expected);
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
