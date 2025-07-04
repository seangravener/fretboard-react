import { useFretboardService } from "../../contexts/hooks/useFretboardService";

export const ChordViewer = () => {
  const { currentNotes, currentChord } = useFretboardService();

  return (
    <div className="chord-display bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-lg p-6 shadow-xl">
      <h3 className="text-2xl font-bold text-white mb-4 text-center">
        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Chord
        </span>
        <span className="text-white"> Display</span>
      </h3>
      <div className="chord-name text-3xl font-bold text-center mb-3">
        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          {currentChord ?? "No chord detected"}
        </span>
      </div>
      <div className="chord-notes text-slate-300 text-lg text-center">
        {currentNotes.join(" / ")}
      </div>
    </div>
  );
};
