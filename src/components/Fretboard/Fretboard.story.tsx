import { Meta } from '@storybook/react';
import { Fretboard, FretboardProps } from './Fretboard';

const meta: Meta<typeof Fretboard> = {
  component: Fretboard,
  title: 'Fretboard',
};

export default meta;

export const Usage = (args: FretboardProps) => <Fretboard {...args} />;
