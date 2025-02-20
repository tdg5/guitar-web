import { expect, test } from 'vitest';
import * as notes from '@/lib/notes';

test('getNoteByName returns expected note', () => {
  const cNatural = notes.getNoteByName('C');
  expect(cNatural.index).toBe(0);
  expect(cNatural.names).toStrictEqual(['C']);

  const cSharp = notes.getNoteByName('C#');
  expect(cSharp.index).toBe(1);
  expect(cSharp.names).toStrictEqual(['C#', 'Db']);

  const dFlat = notes.getNoteByName('Db');
  expect(dFlat.index).toBe(1);
  expect(dFlat.names).toStrictEqual(['C#', 'Db']);

  const dNatural = notes.getNoteByName('D');
  expect(dNatural.index).toBe(2);
  expect(dNatural.names).toStrictEqual(['D']);

  const dSharp = notes.getNoteByName('D#');
  expect(dSharp.index).toBe(3);
  expect(dSharp.names).toStrictEqual(['D#', 'Eb']);

  const eFlat = notes.getNoteByName('Eb');
  expect(eFlat.index).toBe(3);
  expect(eFlat.names).toStrictEqual(['D#', 'Eb']);

  const eNatural = notes.getNoteByName('E');
  expect(eNatural.index).toBe(4);
  expect(eNatural.names).toStrictEqual(['E']);

  const fNatural = notes.getNoteByName('F');
  expect(fNatural.index).toBe(5);
  expect(fNatural.names).toStrictEqual(['F']);

  const fSharp = notes.getNoteByName('F#');
  expect(fSharp.index).toBe(6);
  expect(fSharp.names).toStrictEqual(['F#', 'Gb']);

  const gFlat = notes.getNoteByName('Gb');
  expect(gFlat.index).toBe(6);
  expect(gFlat.names).toStrictEqual(['F#', 'Gb']);

  const gNatural = notes.getNoteByName('G');
  expect(gNatural.index).toBe(7);
  expect(gNatural.names).toStrictEqual(['G']);

  const gSharp = notes.getNoteByName('G#');
  expect(gSharp.index).toBe(8);
  expect(gSharp.names).toStrictEqual(['G#', 'Ab']);

  const aFlat = notes.getNoteByName('Ab');
  expect(aFlat.index).toBe(8);
  expect(aFlat.names).toStrictEqual(['G#', 'Ab']);

  const aNatural = notes.getNoteByName('A');
  expect(aNatural.index).toBe(9);
  expect(aNatural.names).toStrictEqual(['A']);

  const aSharp = notes.getNoteByName('A#');
  expect(aSharp.index).toBe(10);
  expect(aSharp.names).toStrictEqual(['A#', 'Bb']);

  const bFlat = notes.getNoteByName('Bb');
  expect(bFlat.index).toBe(10);
  expect(bFlat.names).toStrictEqual(['A#', 'Bb']);

  const bNatural = notes.getNoteByName('B');
  expect(bNatural.index).toBe(11);
  expect(bNatural.names).toStrictEqual(['B']);
});

test('getNoteByName returns expected note for lowercase note name', () => {
  const bFlat = notes.getNoteByName('Bb');
  expect(bFlat.index).toBe(10);
  expect(bFlat.names).toStrictEqual(['A#', 'Bb']);
});

test('getNoteByIndex returns expected note', () => {
  const cNatural = notes.getNoteByIndex(0);
  expect(cNatural.index).toBe(0);
  expect(cNatural.names).toStrictEqual(['C']);

  const bNatural = notes.getNoteByIndex(11);
  expect(bNatural.index).toBe(11);
  expect(bNatural.names).toStrictEqual(['B']);
});

test('getNoteByIndex throws for invalid note index', () => {
  expect(() => notes.getNoteByIndex(12)).toThrowError('Note index "12" not found');
  expect(() => notes.getNoteByIndex(-1)).toThrowError('Note index "-1" not found');
});
