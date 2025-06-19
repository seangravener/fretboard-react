import { Fretboard } from "./features/fretboard/components/Fretboard";

export const App = () => (
  <>
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Fretboard
            </span>
            <span className="text-white"> Explorer</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Interactive guitar fretboard for learning chords, scales, and music
            theory
          </p>
        </header>
      </div>
    </div>

    <main className="space-y-8">
      <Fretboard displayNotes={true} />
    </main>

    <footer className="text-center mt-12 text-slate-400">
      <p>&copy; 2024 Fretboard Explorer - Master your guitar journey</p>
    </footer>
  </>
);
