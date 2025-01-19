import { INITIAL_DISPLAY_OPTIONS } from "../constants";
import { FretboardProvider } from "../contexts/FretboardProvider";
import { FretboardDisplayOptions } from "../types";
import { FretboardDisplay } from "./display/FretboardDisplay";

export const Fretboard = ({
  displayNotes = INITIAL_DISPLAY_OPTIONS.displayNotes,
}: FretboardDisplayOptions) => (
  <FretboardProvider>
    <FretboardDisplay displayNotes={displayNotes} />
  </FretboardProvider>
);
