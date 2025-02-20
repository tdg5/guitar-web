import { NoteName } from './NoteName';

export interface INote {
  index: number;
  isAccidental: boolean;
  isNatural: boolean;
  names: NoteName[];
}
