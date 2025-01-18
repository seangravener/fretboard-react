import { useFretboardContext } from "../../hooks/useFretboardContext";

type CurrentChordDisplayProps = {
  style: React.CSSProperties;
};

export const CurrentChordDisplay = ({ style }: CurrentChordDisplayProps) => {
  const { currentNotes } = useFretboardContext();

  return (
    <div style={style}>
      Current Notes:{" "}
      <code style={{ fontSize: "1rem" }}>{currentNotes?.join(" / ")}</code>
    </div>
  );
};
