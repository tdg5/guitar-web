import { Barre, FretboardSystem, Position } from '@philjollans/fretboard.js';
import { BaseType, ValueFn } from 'd3-selection';

export type { BaseType, ValueFn } from 'd3-selection';
export type { Barre, Position } from '@philjollans/fretboard.js';
export { Fretboard, FretboardSystem } from '@philjollans/fretboard.js';

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
  fretMarkerColor?: string;
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
  showFretMarkers?: boolean;
  showFretNumbers?: boolean;
  stringColor?: StringAttributeValue;
  stringCount?: number;
  stringWidth?: number | [number];
  topPadding?: number;
  tuning?: Tuning;
  width?: number;
};

export type FretboardMouseOrTouchEventName = keyof Pick<
  HTMLElementEventMap,
  {
    [P in keyof HTMLElementEventMap]: HTMLElementEventMap[P] extends MouseEvent | TouchEvent ? P : never;
  }[keyof HTMLElementEventMap]
>;

export type FretboardMouseOrTouchEventHandler = (position: Position, event: MouseEvent | TouchEvent) => void;

export const FRETBOARD_MOUSE_AND_TOUCH_EVENT_NAMES: FretboardMouseOrTouchEventName[] = [
  'auxclick',
  'click',
  'contextmenu',
  'dblclick',
  'drag',
  'dragend',
  'dragenter',
  'dragleave',
  'dragover',
  'dragstart',
  'drop',
  'gotpointercapture',
  'lostpointercapture',
  'mousedown',
  'mouseenter',
  'mouseleave',
  'mousemove',
  'mouseout',
  'mouseover',
  'mouseup',
  'pointercancel',
  'pointerdown',
  'pointerenter',
  'pointerleave',
  'pointermove',
  'pointerout',
  'pointerover',
  'pointerup',
  'touchcancel',
  'touchend',
  'touchmove',
  'touchstart',
  'wheel',
];
