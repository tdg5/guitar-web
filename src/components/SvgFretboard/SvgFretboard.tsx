import { MouseEvent } from 'react';
import {
  DEFAULT_COLORS,
  DEFAULT_DIMENSIONS,
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_SIZE,
  DEFAULT_FRET_COUNT,
  DEFAULT_HIGHLIGHT_BLEND_MODE,
  GUITAR_TUNINGS,
  THROTTLE_INTERVAL,
} from './constants';

type Point = {
  x: number;
  y: number;
}

type StringWidth = number | ((stringNumber: number) => number);

type StringColor = string | ((stringNumber: number) => string);

type Tuning = string[];

export type PositionBoundary = {
  bottom: number;
  left: number;
  right: number;
  top: number;
}

export type Position = {
  boundary: PositionBoundary,
  chroma?: number;
  degree?: number;
  disabled?: boolean;
  fret: number;
  inBox?: boolean;
  interval?: string;
  note?: string;
  octave?: number;
  octaveInScale?: number;
  string: number;
}

export type SvgFretboardOptions = {
  barresColor: string;
  disabledOpacity: number;
  dotFill: string | ((position: Position) => string)
  dotSize: number;
  dotStrokeColor: string | ((position: Position) => string);
  dotStrokeWidth: number | ((position: Position) => number);
  dotText: (position: Position) => string;
  dotTextSize: number | ((position: Position) => number);
  font: string;
  fretColor: string;
  fretCount: number;
  fretNumbersColor: string;
  fretNumbersHeight: number;
  fretNumbersMargin: number;
  fretWidth: number;
  height: number;
  highlightBlendMode: string;
  highlightFill: string;
  highlightPadding: number;
  highlightRadius: number;
  highlightStroke: string;
  inlayFill: string;
  inlaySize: number;
  inlayStrokeColor: string;
  inlayStrokeWidth: number;
  nutColor: string;
  nutWidth: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  positions: Position[],
  scaleFrets: boolean,
  showFretInlay: boolean;
  showFretNumbers: boolean;
  stringColor: string;
  stringCount: number;
  stringWidth: number | ((stringNumber: number) => number)
  tuning: Tuning;
  width: number;
}

type FretboardDimensions = {
  fretNumbersHeight: number;
  fretOffsets: number[];
  height: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  stringOffsets: number[];
  stringWidths: number[];
  totalHeight: number;
  totalWidth: number;
  width: number;
}

const defaultSvgFretboardOptions: SvgFretboardOptions = {
  barresColor: DEFAULT_COLORS.barres,
  disabledOpacity: 0.9,
  dotFill: DEFAULT_COLORS.dotFill,
  dotSize: DEFAULT_DIMENSIONS.unit,
  dotStrokeColor: DEFAULT_COLORS.dotStroke,
  dotStrokeWidth: DEFAULT_DIMENSIONS.line * 2,
  dotText: (_: Position) => '',
  dotTextSize: DEFAULT_FONT_SIZE,
  font: DEFAULT_FONT_FAMILY,
  fretColor: DEFAULT_COLORS.line,
  fretCount: DEFAULT_FRET_COUNT,
  fretNumbersColor: DEFAULT_COLORS.fretNumber,
  fretNumbersHeight: DEFAULT_DIMENSIONS.unit * 2,
  fretNumbersMargin: DEFAULT_DIMENSIONS.unit,
  fretWidth: DEFAULT_DIMENSIONS.line,
  height: 150,
  highlightBlendMode: DEFAULT_HIGHLIGHT_BLEND_MODE,
  highlightFill: DEFAULT_COLORS.highlightFill,
  highlightPadding: DEFAULT_DIMENSIONS.unit * .5,
  highlightRadius: DEFAULT_DIMENSIONS.unit * .5,
  highlightStroke: DEFAULT_COLORS.highlightStroke,
  inlayFill: DEFAULT_COLORS.inlayFill,
  inlaySize: DEFAULT_DIMENSIONS.unit * 0.25,
  inlayStrokeColor: DEFAULT_COLORS.line,
  inlayStrokeWidth: DEFAULT_DIMENSIONS.line,
  nutColor: DEFAULT_COLORS.line,
  nutWidth: DEFAULT_DIMENSIONS.nut,
  paddingBottom: DEFAULT_DIMENSIONS.unit * .75,
  paddingLeft: DEFAULT_DIMENSIONS.unit,
  paddingRight: DEFAULT_DIMENSIONS.unit,
  paddingTop: DEFAULT_DIMENSIONS.unit,
  positions: [],
  scaleFrets: true,
  showFretInlay: true,
  showFretNumbers: true,
  stringColor: DEFAULT_COLORS.line,
  stringCount: 6,
  stringWidth: DEFAULT_DIMENSIONS.line,
  tuning: GUITAR_TUNINGS.default,
  width: 960,
};

function getStringOffsets(
  height: number,
  stringWidths: number[],
): number[] {
  const stringCount = stringWidths.length;
  const stringOffsetsY: number[] = [];
  for (let stringNumber = 0; stringNumber < stringCount; stringNumber++)
  {
    const fractionOfFretboardHeight = height / (stringCount - 1);
    const stringWidth = stringWidths[stringNumber];
    const halfStringWidth = stringWidth / 2;
    let offsetY: number;
    if (stringNumber === stringCount - 1) {
      offsetY = height - halfStringWidth;
    }
    else {
      offsetY = (stringNumber * fractionOfFretboardHeight) + halfStringWidth;
    }
    stringOffsetsY[stringNumber] = offsetY;
  }
  return stringOffsetsY;
}

function getStringElements(
  fretboardTotalWidth: number,
  stringColor: StringColor,
  stringOffsetsY: number[],
  stringWidth: StringWidth,
) {
  const strings = stringOffsetsY.map((midPointY, stringNumber) => {
    const stringColorValue = typeof(stringColor) === "function" ? stringColor(stringNumber) : stringColor;
    const stringWidthValue =
      typeof(stringWidth) === "function" ? stringWidth(stringNumber) : stringWidth;

    return (
      <line
        key={stringNumber}
        stroke={stringColorValue}
        strokeWidth={stringWidthValue}
        x1={0}
        x2={fretboardTotalWidth}
        y1={midPointY}
        y2={midPointY}
      >
      </line>
    );
  });

  return <g className={'strings'}>{strings}</g>;
}

function getStringWidths(stringWidth: StringWidth, stringCount: number): number[] {
  const stringWidths: number[] = [];
  for (let stringNumber = 0; stringNumber < stringCount; stringNumber++)
  {
    const widthValue =
      typeof(stringWidth) === "function" ? stringWidth(stringNumber + 1) : stringWidth;
    stringWidths[stringNumber] = widthValue;
  }
  return stringWidths;
}

function getFretboardDimensions({
  fretCount,
  fretNumbersHeight,
  height,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  scaleFrets,
  showFretNumbers,
  stringCount,
  stringWidth,
  width,
}: {
  fretCount: number;
  fretNumbersHeight: number;
  height: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  scaleFrets: boolean;
  showFretNumbers: boolean;
  stringCount: number,
  stringWidth: StringWidth,
  width: number;
}): FretboardDimensions {
  const stringWidths = getStringWidths(stringWidth, stringCount);
  return {
    fretNumbersHeight: fretNumbersHeight,
    fretOffsets: getFretOffsets(fretCount, scaleFrets),
    height: height,
    paddingBottom: paddingBottom,
    paddingLeft: paddingLeft,
    paddingRight: paddingRight,
    paddingTop: paddingTop,
    stringOffsets: getStringOffsets(height, stringWidths),
    stringWidths: stringWidths,
    totalHeight:
      height + paddingTop + paddingBottom + (showFretNumbers ? fretNumbersHeight : 0),
    totalWidth: width + paddingLeft + paddingRight,
    width: width,
  };
}

function getFretOffsets(fretCount: number, scaleFrets: boolean) {
  const fretRatio = Math.pow(2, 1 / 12);
  const frets = [0];

  for (let i = 1; i <= fretCount; i++) {
    let x = (100 / fretCount) * i;
    if (scaleFrets) {
      x = 100 - 100 / Math.pow(fretRatio, i);
    }
    frets.push(x);
  }
  return frets.map(x => x / frets[frets.length - 1] * 100);
}

function getFretElements({
  height,
  fretColor,
  fretOffsets,
  fretWidth,
  nutColor,
  nutWidth,
}: {
  height: number;
  fretColor: string;
  fretOffsets: number[];
  fretWidth: number;
  nutColor: string;
  nutWidth: number;
}) {
  const frets = fretOffsets.map((offset, index) => {
    const specificFretColor = index === 0 ? nutColor : fretColor;
    const specificFretWidth = index === 0 ? nutWidth : fretWidth;
    return <line
      key={index}
      stroke={specificFretColor}
      strokeWidth={specificFretWidth}
      x1={`${offset}%`}
      x2={`${offset}%`}
      y1={0}
      y2={height}
    />
  });

  return <g className={'frets'}>{frets}</g>;
}

function getFretInlayPoints(
  {
    fretCount,
    fretOffsets,
    height,
  }: {
    height: number;
    fretCount: number;
    fretOffsets: number[];
  }
): Point[] {
  const inlayPoints = [];
  for (let fretNumber = 1; fretNumber <= fretCount; fretNumber++)
  {
    const fretModulo = fretNumber % 12;
    if (fretModulo === 0 || fretModulo === 3 || fretModulo === 5 || fretModulo === 7 ||
      fretModulo === 9)
    {
      const xOffset = (fretOffsets[fretNumber - 1] + fretOffsets[fretNumber]) / 2;
      if (fretModulo === 0) {
        inlayPoints.push({x: xOffset, y: height / 3});
        inlayPoints.push({x: xOffset, y: height / 3 * 2});
      }
      else {
        inlayPoints.push({x: xOffset, y: height / 2});
      }
    }
  }
  return inlayPoints;
}

function getFretInlayElements(
  {
    fretCount,
    fretOffsets,
    height,
    inlayFill,
    inlaySize,
    inlayStrokeColor,
    inlayStrokeWidth,
    scaleFrets,
  }: {
    height: number,
    fretCount: number,
    fretOffsets: number[],
    inlayFill: string,
    inlaySize: number,
    inlayStrokeColor: string,
    inlayStrokeWidth: number,
    scaleFrets: boolean,
  }
) {
  const inlayPoints = getFretInlayPoints({fretCount, fretOffsets, height});
  const inlays = inlayPoints.map((point, index) => {
    return <circle
      cx={`${point.x}%`}
      cy={point.y}
      fill={inlayFill}
      key={index}
      r={inlaySize}
      stroke={inlayStrokeColor}
      strokeWidth={inlayStrokeWidth}
    />
  });

  return <g className={'fret-inlays'}>{inlays}</g>;
}

function getFretNumbersElements({
  font,
  fretCount,
  fretNumbersColor,
  fretNumbersMargin,
  fretOffsets,
  paddingTop,
  stringOffsets,
}: {
  font: string;
  fretCount: number;
  fretNumbersColor: string;
  fretNumbersMargin: number;
  fretOffsets: number[];
  paddingTop: number;
  stringOffsets: number[];
}) {
  const fretNumbers = [];
  const lastStringOffset = stringOffsets[stringOffsets.length - 1];
  for (let fretNumber = 1; fretNumber <= fretCount; fretNumber++)
  {
    const fretTextOffset = (fretOffsets[fretNumber - 1] + fretOffsets[fretNumber]) / 2;
    var fretText = <text
      fill={fretNumbersColor}
      key={fretNumber}
      textAnchor={'middle'}
      x={`${fretTextOffset}%`}
    >
      {fretNumber}
    </text>;
    fretNumbers.push(fretText);
  }

  const fretNumberGroup = <g
    className={`fret-numbers`}
    fontFamily={font}
    transform={`translate(0 ${fretNumbersMargin + lastStringOffset + paddingTop})`}
  >
    {fretNumbers}
  </g>;
  return fretNumberGroup;
}

export const SvgFretboard = (props: Partial<SvgFretboardOptions>) => {
  const propsWithDefaults: SvgFretboardOptions = {
    ...defaultSvgFretboardOptions,
    ...props,
  };

  const {
    fretOffsets,
    paddingLeft,
    paddingTop,
    stringOffsets,
    totalHeight,
    totalWidth,
    width,
  } = getFretboardDimensions(propsWithDefaults);

  const {
    showFretInlay,
    showFretNumbers,
    stringColor,
    stringWidth,
  } = propsWithDefaults;

  const strings = getStringElements(totalWidth, stringColor, stringOffsets, stringWidth);

  const frets = getFretElements({...propsWithDefaults, fretOffsets});

  const fretInlays = showFretInlay
    ? getFretInlayElements({...propsWithDefaults, fretOffsets})
    : null;

  const fretNumbers = showFretNumbers
    ? getFretNumbersElements({...propsWithDefaults, fretOffsets, stringOffsets})
    : null;

  // const positions = getPositions(
  //   {

  //   }
  // );

  const clickTest = (event: MouseEvent<SVGElement>) => {
    console.log(`Clicked at: (${event.nativeEvent.offsetX}, ${event.nativeEvent.offsetY})`);
    console.log(event);
  }

  return (
    <div className={'fretboard-svg-wrapper'}>
      <svg
        onClick={clickTest}
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
      >
        <g
          className={'fretboard-wrapper'}
          transform={`translate(${paddingLeft}, ${paddingTop}) scale(${width / totalWidth})`}
        >
          {fretInlays}
          {strings}
          {frets}
          {showFretNumbers ? fretNumbers : null}
        </g>
      </svg>
    </div>
  );
};
