import * as notes from '@/lib/notes';
import type { AccidentalNoteDisplayNames, AccidentalNoteName, NoteName } from '@/types/notes';
import { INoteSelectorInputCallback } from '@/types/NoteSelector';
import classes from './KeyboardNoteSelector.module.css';

export interface KeyboardNoteSelectorProps {
  inputCallback: INoteSelectorInputCallback;
  accidentalNoteDisplayNames?: AccidentalNoteDisplayNames;
}

const noteNamesToNoteDisplayName = (
  noteNames: NoteName[],
  accidentalNoteDisplayNames: AccidentalNoteDisplayNames | null | undefined
): NoteName => {
  if (!accidentalNoteDisplayNames || noteNames.length === 1) {
    return noteNames[0];
  }

  for (let index = 0; index < noteNames.length; index++) {
    const accidentalNote = noteNames[index] as AccidentalNoteName;
    const displayName = accidentalNoteDisplayNames[accidentalNote];
    if (displayName) {
      return displayName;
    }
  }
  return noteNames[0];
};

export function KeyboardNoteSelector({
  accidentalNoteDisplayNames,
  inputCallback,
}: KeyboardNoteSelectorProps) {
  const keys = [];
  for (let index = 0; index < notes.NOTES_IN_OCTAVE; index++) {
    const note = notes.getNoteByIndex(index);
    const noteFamilyStyle = note.isAccidental ? classes.accidental : classes.natural;
    const noteDisplayName = noteNamesToNoteDisplayName(note.names, accidentalNoteDisplayNames);
    const keyElement = (
      <button
        className={`${classes.key} ${noteFamilyStyle}`}
        key={note.index}
        onClick={() => inputCallback(note)}
        type="button"
      >
        <div className={classes.keyLabel} key={`${note.index}-label`}>
          {noteDisplayName}
        </div>
      </button>
    );
    keys.push(keyElement);
  }
  return <div className={`${classes.keyboardNoteSelector} ${classes.keyboard}`}>{keys}</div>;
}
