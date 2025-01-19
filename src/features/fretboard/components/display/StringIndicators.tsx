import { useFretboardContext } from "../../hooks/useFretboardContext";
import { getStringIndicator } from "../../utils/fretboard.utils";

type StringIndicatorsProps = {
  displayNotes: boolean;
};

export const StringIndicators = ({ displayNotes }: StringIndicatorsProps) => {
  const { fretboard, highlightFret } = useFretboardContext();

  return (
    <div className="string-indicators" aria-label="String Indicators">
      {fretboard.strings.map((string) => (
        <button
          key={`string-indicator-${string.stringNumber}`}
          className="string-indicator"
          data-string-number={string.stringNumber}
          onClick={() => highlightFret(string.stringNumber, 0)}
          title={displayNotes ? string.openNote : ""}
        >
          {getStringIndicator(string)}
        </button>
      ))}
    </div>
  );
};
