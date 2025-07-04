export const StringLabels = () => {
  return (
    <div className="fretboard-note-labels">
      {["E", "A", "D", "G", "B", "e"].map((note) => (
        <div className="fretboard-note-label" key={note}>
          <span>{note}</span>
        </div>
      ))}
    </div>
  );
};
