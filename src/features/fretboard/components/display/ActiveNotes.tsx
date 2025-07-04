import { useFretboardService } from "../../hooks/useFretboardService";

type CurrentChordDisplayProps = {
  style: React.CSSProperties;
};

export const ActiveNotes = ({ style }: CurrentChordDisplayProps) => {
  const { currentNotes } = useFretboardService();

  return (
    <div style={style}>
      Current Notes:{" "}
      <code style={{ fontSize: "1rem" }}>{currentNotes?.join(" / ")}</code>
    </div>
  );
};
