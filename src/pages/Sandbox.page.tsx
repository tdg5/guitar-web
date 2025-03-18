import { useCallback, useState } from 'react';
import { KeyboardNoteSelector } from '@/components/KeyboardNoteSelector/KeyboardNoteSelector';
import { FretboardJsOptions, Position, FretboardJsFretboard } from '@/components/FretboardJsFretboard/FretboardJsFretboard';
import { SvgFretboard } from '@/components/SvgFretboard/SvgFretboard';
import { INote } from '@/types/INote';

const NoteSelectorInputCallback = (_: INote) => {};

export function SandboxPage() {
  const setDotText = ({ degree }: Position) => degree?.toString() ?? '';
  const fretboardOptions: FretboardJsOptions = {
    dotText: useCallback(setDotText, []),
    fretCount: 12,
    middleFretColor: 'black',
    middleFretWidth: 1,
    nutWidth: 1,
    showFretMarkers: false,
    showFretNumbers: false,
  };

  const [positions, setPositions] = useState<Position[]>([]);

  const click = useCallback(
    (position: Position) => {
      if (
        positions.find(
          (existingPosition) =>
            existingPosition.fret === position.fret && existingPosition.string === position.string
        )
      ) {
        return;
      }

      setPositions([...positions, position]);
    },
    [positions]
  );

  return (
    <>
      <FretboardJsFretboard click={click} positions={positions} fretboardOptions={fretboardOptions} />
      <div style={{height: '350px'}} >
        <SvgFretboard
          nutWidth={1}
        />
      </div>
      <KeyboardNoteSelector inputCallback={NoteSelectorInputCallback} />
    </>
  );
}
