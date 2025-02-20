import type { AccidentalNoteDisplayNames, INote, NoteName } from '@/types/notes';

class Note implements INote {
  index: number;
  isAccidental: boolean;
  isNatural: boolean;
  names: NoteName[];

  constructor(index: number, names: NoteName[]) {
    this.index = index;
    this.isAccidental = names.length > 1;
    this.isNatural = !this.isAccidental;
    this.names = names;
  }
}

const NOTE_BY_INDEX_CACHE = new Map<number, Note>();

const NOTE_NAMES_BY_INDEX = new Map<number, NoteName[]>([
  [0, ['C']],
  [1, ['C#', 'Db']],
  [2, ['D']],
  [3, ['D#', 'Eb']],
  [4, ['E']],
  [5, ['F']],
  [6, ['F#', 'Gb']],
  [7, ['G']],
  [8, ['G#', 'Ab']],
  [9, ['A']],
  [10, ['A#', 'Bb']],
  [11, ['B']],
]);

const NOTE_INDEXES_BY_NAME = new Map<NoteName, number>([
  ['C', 0],
  ['C#', 1],
  ['Db', 1],
  ['D', 2],
  ['D#', 3],
  ['Eb', 3],
  ['E', 4],
  ['F', 5],
  ['F#', 6],
  ['Gb', 6],
  ['G', 7],
  ['G#', 8],
  ['Ab', 8],
  ['A', 9],
  ['A#', 10],
  ['Bb', 10],
  ['B', 11],
]);

export const NOTES_IN_OCTAVE = 12;

export const getNoteByName = (noteName: NoteName): INote => {
  const noteIndex = NOTE_INDEXES_BY_NAME.get(noteName);
  if (noteIndex === undefined) {
    throw new Error(`Note name "${name}" not found`);
  }
  return getNoteByIndex(noteIndex);
};

export const getNoteByIndex = (index: number): INote => {
  const noteNames = NOTE_NAMES_BY_INDEX.get(index);
  if (noteNames === undefined) {
    throw new Error(`Note index "${index}" not found`);
  }
  const cachedNote = NOTE_BY_INDEX_CACHE.get(index);
  if (!cachedNote) {
    NOTE_BY_INDEX_CACHE.set(index, new Note(index, noteNames));
  }
  return NOTE_BY_INDEX_CACHE.get(index)!;
};

export const AccidentalNoteDisplayNamesAll = {
  'C#': 'C#',
  Db: 'Db',
  'D#': 'D#',
  Eb: 'Eb',
  'F#': 'F#',
  Gb: 'Gb',
  'G#': 'G#',
  Ab: 'Ab',
  'A#': 'A#',
  Bb: 'Bb',
} as AccidentalNoteDisplayNames;

export const AccidentalNoteDisplayNamesFlat = {
  'C#': 'Db',
  'D#': 'Eb',
  'F#': 'Gb',
  'G#': 'Ab',
  'A#': 'Bb',
} as AccidentalNoteDisplayNames;

export const AccidentalNoteDisplayNamesSharp = {
  'C#': 'C#',
  'D#': 'D#',
  'F#': 'F#',
  'G#': 'G#',
  'A#': 'A#',
} as AccidentalNoteDisplayNames;
