import {
  Fret,
  Fretboard,
  FretboardState,
  FretboardString,
  FretNumber,
  FretPositions,
  FrettedFrets,
  StringNumber,
  Tuning,
} from "../types";
import { generateFretboard } from "../generators/fretboard.generator";
import { generateStrings } from "../generators/string.generator";
import {
  INITIAL_NUM_OF_FRETS,
  INITIAL_TUNING,
  SHIFT_START_AT_FRET_NUM,
} from "../constants";

export const useFretboard = (
  tuning: Tuning = INITIAL_TUNING,
  numOfFrets: FretNumber = INITIAL_NUM_OF_FRETS,
  startAtFret: FretNumber = SHIFT_START_AT_FRET_NUM
) => {
  const initialFretboard = generateFretboard(tuning, numOfFrets, startAtFret);
  const generateInitialState = (): FretboardState => ({
    fretboard: initialFretboard,
    highlightFret: () => {},
    setStartAtFret: () => {},
    computed: {
      currentNotes: [],
      currentChord: null,
      frettedFrets: [] as unknown as FrettedFrets,
    },
  });

  const setStartAtFret = (startAtFret: FretNumber) => {
    const currentFretboard = generateFretboard(tuning, numOfFrets, startAtFret);
    const highlightedFretPositions = currentFretboard.strings.map((string) => {
      const highlightedFret = string.frets.find((fret) => fret.isHighlighted);
      if (highlightedFret?.fretNumber === 0) return 0; // Skip open strings

      const highlightedFretNumber = highlightedFret
        ? highlightedFret.fretNumber
        : 0;
      const relativePosition =
        highlightedFretNumber - currentFretboard.startAtFret;

      return startAtFret + relativePosition;
    }) as FretPositions;

    return {
      fretboard: generateFretboard(
        tuning,
        numOfFrets,
        startAtFret,
        highlightedFretPositions
      ),
    };
  };

  const highlightFret = (
    // @TODO refactor with FretboardPositions[] as param
    stringNumber: StringNumber,
    fretNumber: FretNumber
  ) => {
    // [ ] @TODO replace with generateStrings() with FretboardPositions set
    const updatedStrings = ({ fretboard }: { fretboard: Fretboard }) =>
      fretboard.strings.map((string) => {
        if (string.stringNumber !== stringNumber) return string;

        const updatedFrets = string.frets.map((fret) => ({
          ...fret,
          isHighlighted:
            fret.fretNumber === fretNumber ? !fret.isHighlighted : false,
        }));

        const hasNoHighlightedFrets = !updatedFrets.some(
          (fret) => fret.isHighlighted
        );

        if (hasNoHighlightedFrets && fretNumber !== 0) {
          // @TODO Toggle string open/muted state back to previous, unfretted state
          updatedFrets[0].isHighlighted = !string.frets[0].isHighlighted;
        }

        return { ...string, frets: updatedFrets };
      });

    const getLastHighlightedFret = (string: FretboardString) => {
      return string.frets
        .filter((fret) => fret.isHighlighted)
        .reduce(
          (last, current) =>
            current.fretNumber > last.fretNumber ? current : last,
          {} as Fret
        );
    };

    // [ ] Reduce redundant call to generateStrins() 
    const frettedPositions: FretPositions = generateStrings(
      numOfFrets,
      startAtFret,
      [1, 2, 0, 0, 0, 0]
    ).map(
      (string) => getLastHighlightedFret(string).fretNumber ?? 0
    ) as FretPositions;

    const fretboard = generateFretboard(
      tuning,
      numOfFrets,
      startAtFret,
      [1, 2, 0, 0, 0, 3]
    );

    console.log("frettedPositions", frettedPositions);

    return {
      fretboard: {
        ...fretboard,
        strings: updatedStrings({ fretboard }),
        // strings: generateStrings(
        //   // stringNumber,
        //   numOfFrets,
        //   startAtFret,
        //   frettedPositions
        // ),
      },
    };

    // @TODO Depricate
    // setFretboard((prev) => ({
    //   ...prev,
    //   strings: updatedStrings({ fretboard: prev } as FretboardState),
    // }));
  };

  return {
    fretboard: initialFretboard,
    generateInitialState,
    highlightFret,
    setStartAtFret,
  };
};
