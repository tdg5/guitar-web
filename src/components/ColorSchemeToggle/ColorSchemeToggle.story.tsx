import { Meta } from '@storybook/react';
import { ColorSchemeToggle } from './ColorSchemeToggle';

const meta: Meta<typeof ColorSchemeToggle> = {
  component: ColorSchemeToggle,
  title: 'ColorSchemeToggle',
};

export default meta;

export const Usage = () => <ColorSchemeToggle />;
