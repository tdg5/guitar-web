import { useCallback, useState } from 'react';
import { KeyboardNoteSelector } from '@/components/KeyboardNoteSelector/KeyboardNoteSelector';
import { FretboardOptions, Position, SvgFretboard } from '@/components/SvgFretboard/SvgFretboard';
import { INote } from '@/types/INote';

const NoteSelectorInputCallback = (_: INote) => {};

export function SandboxPage() {
  const setDotText = ({ degree }: Position) => degree?.toString() ?? '';
  const fretboardOptions: FretboardOptions = {
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
      <SvgFretboard click={click} positions={positions} fretboardOptions={fretboardOptions} />
      <KeyboardNoteSelector inputCallback={NoteSelectorInputCallback} />
    </>
  );
}
