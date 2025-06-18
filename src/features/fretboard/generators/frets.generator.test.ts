import { describe, it, expect } from "vitest";

import { OPEN_FRET_NUM, FIRST_VISIBLE_FRET } from "../constants";
import {
  generateFrets,
  generateFrettedFretPositions,
  updateFretPositions,
} from "./frets.generator";
import { FretNumber, FretPositions, StringFretPair } from "../types";
import { calcNoteAtFret } from "../utils/fretboard.utils";

describe("frets.generator", () => {
  describe("generateFrets", () => {
    it("should generate open fret correctly", () => {
      const result = generateFrets(1, "E", 0, 0);
      expect(result[OPEN_FRET_NUM]).toEqual({
        fretNumber: OPEN_FRET_NUM,
        isHighlighted: true,
        note: "E",
      });
    });

    it("should generate shifted frets when startAtFret >= SHIFT_START_AT_FRET_NUM", () => {
      const result = generateFrets(3, "E", FIRST_VISIBLE_FRET, 0);

      // Verify all fret positions are correctly shifted
      expect(result[0].fretNumber).toBe(0);
      expect(result[1].fretNumber).toBe(FIRST_VISIBLE_FRET);
      expect(result[2].fretNumber).toBe(FIRST_VISIBLE_FRET + 1);
      expect(result[3].fretNumber).toBe(FIRST_VISIBLE_FRET + 2);

      // Verify notes are calculated correctly for shifted positions
      expect(result[0].note).toBe("E");
      expect(result[1].note).toBe(calcNoteAtFret("E", FIRST_VISIBLE_FRET));
    });

    it("should handle different shift starting positions", () => {
      const startAtFret = (FIRST_VISIBLE_FRET + 2) as FretNumber;
      const result = generateFrets(2, "A", startAtFret, 0);

      expect(result[0].fretNumber).toBe(0);
      expect(result[1].fretNumber).toBe(startAtFret);
      expect(result[2].fretNumber).toBe(startAtFret + 1);
    });

    it("should maintain correct note progression with shifted frets", () => {
      const result = generateFrets(2, "G", FIRST_VISIBLE_FRET, 0);

      const expectedNotes = [
        "G",
        calcNoteAtFret("G", FIRST_VISIBLE_FRET),
        calcNoteAtFret("G", (FIRST_VISIBLE_FRET + 1) as FretNumber),
      ];

      expect(result.map((fret) => fret.note)).toEqual(expectedNotes);
    });

    it("should highlight specified fret", () => {
      const highlightedFret = 2 as FretNumber;
      const result = generateFrets(3, "E", 0, highlightedFret);
      expect(result[1].isHighlighted).toBe(false);
      expect(result[2].isHighlighted).toBe(true);
    });

    it("should calculate correct notes for each fret", () => {
      const result = generateFrets(2, "E", 0, 0);
      expect(result.map((f) => f.note)).toEqual(["E", "F", "F#"]);
    });
  });

  describe("generateFrettedFretPositions", () => {
    it("should update multiple fret positions", () => {
      const currentPositions = [0, 0, 0, 0, 0, 0] as FretPositions;
      const stringFretPairs: StringFretPair[] = [
        { stringNumber: 1, fretNumber: 2 },
        { stringNumber: 3, fretNumber: 1 }
      ];
      
      const result = generateFrettedFretPositions(currentPositions, stringFretPairs);
      expect(result).toEqual([2, 0, 1, 0, 0, 0]);
    });

    it("should handle empty string-fret pairs", () => {
      const currentPositions = [1, 1, 3, 1, 1, 1] as FretPositions;
      const result = generateFrettedFretPositions(currentPositions, []);
      expect(result).toEqual([1, 1, 3, 1, 1, 1]);
    });
  });

  describe("updateFretPositions", () => {
    it("should update position for matching string number", () => {
      const stringFretPairs: StringFretPair[] = [
        { stringNumber: 2, fretNumber: 3 },
      ];
      const result = updateFretPositions(0 as FretNumber, 1, stringFretPairs);
      expect(result).toEqual([3]);
    });

    it("should maintain current position for non-matching strings", () => {
      const stringFretPairs: StringFretPair[] = [
        { stringNumber: 1, fretNumber: 3 },
      ];
      const result = updateFretPositions(2 as FretNumber, 1, stringFretPairs);
      expect(result).toEqual([2]);
    });
  });
});
