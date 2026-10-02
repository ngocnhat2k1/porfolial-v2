// Tiny Web Audio instruments for the room. Pure functions of an AudioContext, no React.

/** MIDI note number → frequency in Hz (A4 = 69 = 440 Hz). */
export const noteFrequency = (midi: number) => 440 * 2 ** ((midi - 69) / 12);

/** C major pentatonic over two octaves: any sequence of these sounds pleasant. */
export const PENTATONIC = [60, 62, 64, 67, 69, 72, 74, 76, 79, 81, 84] as const;

/** Position across the keyboard (0 = left edge, 1 = right edge) → MIDI note. */
export const noteAt = (position: number) => {
  const index = Math.floor(position * PENTATONIC.length);
  return PENTATONIC[Math.min(PENTATONIC.length - 1, Math.max(0, index))];
};

/** Open G major, lowest string first. */
export const G_MAJOR = [43, 47, 50, 55, 59, 67] as const;

/** A soft electric-piano note: a triangle wave plus two quiet overtones, fading over 1.6 s. */
export function playPianoNote(ctx: AudioContext, frequency: number) {
  const now = ctx.currentTime;
  const envelope = ctx.createGain();
  envelope.gain.setValueAtTime(0.0001, now);
  envelope.gain.exponentialRampToValueAtTime(0.3, now + 0.01);
  envelope.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);
  envelope.connect(ctx.destination);

  const partials = [
    ['triangle', 1, 1],
    ['sine', 2, 0.35],
    ['sine', 3, 0.12],
  ] as const;
  for (const [type, multiple, level] of partials) {
    const oscillator = ctx.createOscillator();
    const volume = ctx.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequency * multiple;
    volume.gain.value = level;
    oscillator.connect(volume).connect(envelope);
    oscillator.start(now);
    oscillator.stop(now + 1.7);
  }
}

/** Karplus–Strong plucked string: a burst of noise fed through a slowly decaying delay line. */
export function pluckBuffer(ctx: BaseAudioContext, frequency: number, seconds = 2.2) {
  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * seconds), ctx.sampleRate);
  const samples = buffer.getChannelData(0);
  const period = Math.max(2, Math.round(ctx.sampleRate / frequency));
  for (let i = 0; i < samples.length; i++) {
    samples[i] = i < period ? Math.random() * 2 - 1 : 0.996 * 0.5 * (samples[i - period] + samples[i - period + 1]);
  }
  return buffer;
}

/** Strum the strings low to high, 30 ms apart, like a down-stroke. */
export function playStrum(ctx: AudioContext, frequencies: readonly number[]) {
  const volume = ctx.createGain();
  volume.gain.value = 0.22;
  volume.connect(ctx.destination);
  frequencies.forEach((frequency, i) => {
    const string = ctx.createBufferSource();
    string.buffer = pluckBuffer(ctx, frequency);
    string.connect(volume);
    string.start(ctx.currentTime + i * 0.03);
  });
}
