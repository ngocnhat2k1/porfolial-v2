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
export function playPianoNote(ctx: AudioContext, frequency: number, delay = 0) {
  const now = ctx.currentTime + delay;
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

/** A rubber-duck squeak: a nasal square wave that drops in pitch. */
export function playQuack(ctx: AudioContext) {
  const now = ctx.currentTime;
  const voice = ctx.createOscillator();
  const volume = ctx.createGain();
  voice.type = 'square';
  voice.frequency.setValueAtTime(820, now);
  voice.frequency.exponentialRampToValueAtTime(420, now + 0.18);
  volume.gain.setValueAtTime(0.0001, now);
  volume.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
  volume.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
  voice.connect(volume).connect(ctx.destination);
  voice.start(now);
  voice.stop(now + 0.25);
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

/** A little hummed tune: a sine voice with vibrato, one note after another. */
export function playHum(ctx: AudioContext, frequencies: readonly number[], noteLength = 0.32) {
  const start = ctx.currentTime;
  const end = start + frequencies.length * noteLength;
  const voice = ctx.createOscillator();
  const vibrato = ctx.createOscillator();
  const depth = ctx.createGain();
  const volume = ctx.createGain();
  frequencies.forEach((frequency, i) => voice.frequency.setTargetAtTime(frequency, start + i * noteLength, 0.03));
  vibrato.frequency.value = 5.5;
  depth.gain.value = 6;
  vibrato.connect(depth).connect(voice.frequency);
  volume.gain.setValueAtTime(0.0001, start);
  volume.gain.exponentialRampToValueAtTime(0.16, start + 0.08);
  volume.gain.setValueAtTime(0.16, end - 0.15);
  volume.gain.exponentialRampToValueAtTime(0.0001, end);
  voice.connect(volume).connect(ctx.destination);
  for (const oscillator of [voice, vibrato]) {
    oscillator.start(start);
    oscillator.stop(end + 0.05);
  }
}

/** A cat's "mew": a nasal sawtooth through a vowel-like band-pass, pitch rising then falling. */
export function playMeow(ctx: AudioContext) {
  const now = ctx.currentTime;
  const voice = ctx.createOscillator();
  const vowel = ctx.createBiquadFilter();
  const volume = ctx.createGain();
  voice.type = 'sawtooth';
  voice.frequency.setValueAtTime(520, now);
  voice.frequency.exponentialRampToValueAtTime(820, now + 0.18);
  voice.frequency.exponentialRampToValueAtTime(480, now + 0.55);
  vowel.type = 'bandpass';
  vowel.Q.value = 4;
  vowel.frequency.setValueAtTime(900, now);
  vowel.frequency.exponentialRampToValueAtTime(1800, now + 0.2);
  vowel.frequency.exponentialRampToValueAtTime(700, now + 0.55);
  volume.gain.setValueAtTime(0.0001, now);
  volume.gain.exponentialRampToValueAtTime(0.25, now + 0.06);
  volume.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
  voice.connect(vowel).connect(volume).connect(ctx.destination);
  voice.start(now);
  voice.stop(now + 0.65);
}

/** A phone on vibrate: two short low buzzes. */
export function playBuzz(ctx: AudioContext) {
  const now = ctx.currentTime;
  const motor = ctx.createOscillator();
  const volume = ctx.createGain();
  motor.type = 'square';
  motor.frequency.value = 140;
  volume.gain.value = 0;
  for (const at of [0, 0.3]) {
    volume.gain.setValueAtTime(0.06, now + at);
    volume.gain.setValueAtTime(0, now + at + 0.18);
  }
  motor.connect(volume).connect(ctx.destination);
  motor.start(now);
  motor.stop(now + 0.5);
}
