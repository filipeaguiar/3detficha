import { useRef, useCallback } from 'react';

export function useDiceSound() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playSound = useCallback((amount: number = 3) => {
    // Inicializa o AudioContext apenas na primeira interação
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        audioCtxRef.current = new AudioContext();
      }
    }

    const ctx = audioCtxRef.current;
    if (!ctx) return;

    // Se o contexto estiver suspenso (política de autoplay), tenta retormar
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Gera de 3 a 5 "batidas" dependendo da quantidade de dados
    const clackCount = amount + Math.floor(Math.random() * 2);

    for (let i = 0; i < clackCount; i++) {
      // Pequeno atraso aleatório para simular dados quicando em momentos diferentes
      const delay = (i * 0.08) + (Math.random() * 0.1);
      const time = ctx.currentTime + delay;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Som percussivo e agudo (plástico batendo)
      osc.type = 'square';
      osc.frequency.setValueAtTime(800 + Math.random() * 600, time);
      osc.frequency.exponentialRampToValueAtTime(100, time + 0.05);

      // Envelope de volume muito rápido (impacto)
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.4, time + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + 0.06);
    }
  }, []);

  return playSound;
}
