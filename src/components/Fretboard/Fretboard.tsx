import Guitar from 'react-guitar';
import classes from './Fretboard.module.css';

export interface FretsProps {
  amount: number;
  from: number;
}

export interface FretboardProps {
  frets?: FretsProps;
  strings: number[];
}

const DEFAULT_FRETS = { amount: 12, from: 0 };

export function Fretboard({ frets, strings }: FretboardProps) {
  const fretsConfig = frets ?? DEFAULT_FRETS;
  return <Guitar className={classes.reactGuitar} frets={fretsConfig} strings={strings} />;
}
