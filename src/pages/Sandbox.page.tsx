import { Fretboard } from '@/components/Fretboard/Fretboard';
import { KeyboardNoteSelector } from '@/components/KeyboardNoteSelector/KeyboardNoteSelector';
import { INote } from '@/types/INote';

const NoteSelectorInputCallback = (_: INote) => {};

export function SandboxPage() {
  return (
    <>
      <Fretboard strings={[0, 1, 2, 2, 0, -1]} />
      <KeyboardNoteSelector inputCallback={NoteSelectorInputCallback} />
    </>
  );
}
