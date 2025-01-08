import { BehaviorSubject, Observable } from "rxjs";
import { DEFAULT_TUNING, DEFAULT_FRETS } from "../constants";
import { Fretboard, FretNumber, StringNumber } from "../types";
import { generateFretboard } from "../generators/fretboardGenerator";

export class FretboardStateService {
  private static instance: FretboardStateService;
  private readonly fretboardSubject: BehaviorSubject<Fretboard>;

  private constructor() {
    const initialState = generateFretboard(DEFAULT_TUNING, DEFAULT_FRETS);
    this.fretboardSubject = new BehaviorSubject<Fretboard>(initialState);
  }

  getFretboard$(): Observable<Fretboard> {
    return this.fretboardSubject.asObservable();
  }

  highlightFret(stringNumber: StringNumber, fretNumber: FretNumber): void {
    const current = this.fretboardSubject.getValue();
    // Update logic here
    this.fretboardSubject.next(current);
  }

  static getInstance(): FretboardStateService {
    if (!FretboardStateService.instance) {
      FretboardStateService.instance = new FretboardStateService();
    }

    return FretboardStateService.instance;
  }
}

export default FretboardStateService.getInstance();
