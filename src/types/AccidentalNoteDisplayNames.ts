import { AccidentalNoteName } from './AccidentalNoteName';

export type AccidentalNoteDisplayNames = {
  [key in AccidentalNoteName]: AccidentalNoteName | null | undefined;
} & {
  'C#': 'C#' | 'Db' | null | undefined;
  Db: 'C#' | 'Db' | null | undefined;
  'D#': 'D#' | 'Eb' | null | undefined;
  Eb: 'D#' | 'Eb' | null | undefined;
  'F#': 'F#' | 'Gb' | null | undefined;
  Gb: 'F#' | 'Gb' | null | undefined;
  'G#': 'G#' | 'Ab' | null | undefined;
  Ab: 'G#' | 'Ab' | null | undefined;
  'A#': 'A#' | 'Bb' | null | undefined;
  Bb: 'A#' | 'Bb' | null | undefined;
};
