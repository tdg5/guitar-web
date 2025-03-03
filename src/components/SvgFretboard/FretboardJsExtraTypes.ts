import { Barre, Position } from '@moonwave99/fretboard.js';
import { BaseType, ValueFn } from 'd3-selection';

export type { BaseType, ValueFn } from 'd3-selection';
export type { Barre, Position } from '@moonwave99/fretboard.js';

export type BoundsDimension = {
  fret: number;
  maxString: string;
};

export type Bounds = {
  bottomLeft: BoundsDimension;
  bottomRight: BoundsDimension;
  topLeft: BoundsDimension;
  topRight: BoundsDimension;
};

export type BarreAttributeValue =
  | boolean
  | null
  | number
  | ReadonlyArray<number | string>
  | string
  | ValueFn<BaseType, Barre, boolean | null | number | ReadonlyArray<number | string> | string>;

export type BoundsAttributeValue =
  | boolean
  | null
  | number
  | ReadonlyArray<number | string>
  | string
  | ValueFn<BaseType, Bounds, boolean | null | number | ReadonlyArray<number | string> | string>;

export type PositionAttributeValue =
  | boolean
  | null
  | number
  | ReadonlyArray<number | string>
  | string
  | ValueFn<BaseType, Position, boolean | null | number | ReadonlyArray<number | string> | string>;

export type FontValue =
  | boolean
  | null
  | number
  | ReadonlyArray<number | string>
  | string
  | ValueFn<BaseType, null, boolean | null | number | ReadonlyArray<number | string> | string>;

export type StringAttributeValue =
  | boolean
  | null
  | number
  | ReadonlyArray<number | string>
  | string
  | ValueFn<BaseType, number, boolean | null | number | ReadonlyArray<number | string> | string>;

export type Strings = number[];

export type Tuning = string[];

export type FretboardSystemOptions = {
  fretCount: number;
  tuning: Tuning;
};

export type FretboardOptions = {
  barresColor?: BarreAttributeValue;
  bottomPadding?: number;
  crop?: boolean;
  disabledOpacity?: number;
  dotFill?: PositionAttributeValue;
  dotSize?: number;
  dotStrokeColor?: PositionAttributeValue;
  dotStrokeWidth?: PositionAttributeValue;
  dotText?: PositionAttributeValue;
  dotTextSize?: PositionAttributeValue;
  el?: BaseType | string;
  font?: FontValue;
  fretColor?: string;
  fretCount?: number;
  fretLeftPadding?: number;
  fretNumbersColor?: string;
  fretNumbersHeight?: number;
  fretNumbersMargin?: number;
  fretWidth?: number;
  height?: number;
  highlightBlendMode?: string;
  highlightFill?: BoundsAttributeValue;
  highlightPadding?: number;
  highlightRadius?: BoundsAttributeValue;
  highlightStroke?: BoundsAttributeValue;
  leftPadding?: number;
  middleFretColor?: string;
  middleFretWidth?: number;
  nutColor?: string;
  nutWidth?: number;
  rightPadding?: number;
  scaleFrets?: boolean;
  showFretNumbers?: boolean;
  stringColor?: StringAttributeValue;
  stringCount?: number;
  stringWidth?: number | [number];
  topPadding?: number;
  tuning?: Tuning;
  width?: number;
};

export type FretboardMouseEventName = keyof Pick<
  HTMLElementEventMap,
  {
    [P in keyof HTMLElementEventMap]: HTMLElementEventMap[P] extends MouseEvent ? P : never;
  }[keyof HTMLElementEventMap]
>;

export type FretboardMouseEventHandler = (position: Position, event: MouseEvent) => void;
