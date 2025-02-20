import { Meta } from '@storybook/react';
import { AccidentalNoteDisplayNamesSharp } from '@/lib/notes';
import { KeyboardNoteSelector, KeyboardNoteSelectorProps } from './KeyboardNoteSelector';

const meta: Meta<typeof KeyboardNoteSelector> = {
  argTypes: {
    inputCallback: {
      action: 'note-selected',
      description: 'The callback that is triggered when a note is selected.',
    },
  },
  args: {
    accidentalNoteDisplayNames: AccidentalNoteDisplayNamesSharp,
  },
  component: KeyboardNoteSelector,
  title: 'KeyboardNoteSelector',
};

export default meta;

export const Usage = (args: KeyboardNoteSelectorProps) => <KeyboardNoteSelector {...args} />;
