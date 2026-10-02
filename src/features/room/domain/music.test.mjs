// Run with `npm test` (Node strips the TypeScript types natively).
import assert from 'node:assert/strict';
import test from 'node:test';
import { noteAt, noteFrequency, PENTATONIC } from './music.ts';

test('A4 is 440 Hz and C4 is middle C', () => {
  assert.equal(noteFrequency(69), 440);
  assert.ok(Math.abs(noteFrequency(60) - 261.63) < 0.01);
});

test('keyboard position spans the whole scale and clamps at the edges', () => {
  assert.equal(noteAt(0), PENTATONIC[0]);
  assert.equal(noteAt(0.5), PENTATONIC[5]);
  assert.equal(noteAt(0.999), PENTATONIC.at(-1));
  assert.equal(noteAt(-0.2), PENTATONIC[0]);
  assert.equal(noteAt(1.4), PENTATONIC.at(-1));
});
