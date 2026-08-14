import { useRef, useCallback } from 'react';

export function useDiceSound() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseBufferRef = useRef<AudioBuffer | null>(null);

  const createNoiseBuffer = (ctx: AudioContext) => {
    // 0.1 seconds of white noise
    const bufferSize = ctx.sampleRate * 0.1; 
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  };

  const playSound = useCallback((amount: number = 3) => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        audioCtxRef.current = new AudioContext();
        noiseBufferRef.current = createNoiseBuffer(audioCtxRef.current);
      }
    }

    const ctx = audioCtxRef.current;
    const noiseBuffer = noiseBufferRef.current;
    if (!ctx || !noiseBuffer) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Amount of clacks is roughly proportional to dice amount + bounces
    const clacks = amount + 1 + Math.floor(Math.random() * 3);

    for (let i = 0; i < clacks; i++) {
      // Simulate rolling: hits get closer together as they settle
      const delay = (i * 0.08) + (Math.random() * 0.05);
      const time = ctx.currentTime + delay;

      // 1. Noise source (The broadband impact of physical collision)
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;

      // 2. Bandpass filter to shape the noise into a "plastic click"
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      
      // Randomize the resonant frequency to simulate different dice/angles (2000Hz - 4500Hz)
      filter.frequency.value = 2000 + Math.random() * 2500;
      filter.Q.value = 1.5; // Moderate Q for a sharp plastic sound

      // 3. Gain envelope for the sharp transient (ADSR: instantaneous Attack, very fast Decay)
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0, time);
      gainNode.gain.linearRampToValueAtTime(1.5, time + 0.002); // 2ms attack (very sharp)
      gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.05); // 50ms decay

      noiseSource.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      noiseSource.start(time);
      noiseSource.stop(time + 0.06);
    }
  }, []);

  return playSound;
}
