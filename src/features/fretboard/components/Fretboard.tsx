import { INITIAL_DISPLAY_OPTIONS } from "../constants";
import { FretboardProvider } from "../contexts/FretboardProvider";
import { FretboardDisplayOptions } from "../types";
import { FretboardNeck } from "./display/FretboardNeck";

export const Fretboard = ({
  displayNotes = INITIAL_DISPLAY_OPTIONS.displayNotes,
}: FretboardDisplayOptions) => (
  <FretboardProvider>
    <FretboardNeck displayNotes={displayNotes} />
  </FretboardProvider>
);
