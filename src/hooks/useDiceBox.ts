import { useEffect, useRef } from 'react';
import type { AppMode } from '../types/navigation';
// @ts-ignore
import DiceBox from '@3d-dice/dice-box';

export function useDiceBox(mode: AppMode, accentColor: string) {
  const diceBoxRef = useRef<any>(null);
  const clearDiceTimeoutRef = useRef<any>(null);

  useEffect(() => {
    if (mode !== 'play') return;

    const refreshDiceViewport = () => {
      requestAnimationFrame(() => {
        window.dispatchEvent(new Event('resize'));
        setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
      });
    };

    if (diceBoxRef.current && diceBoxRef.current !== 'initializing') {
      refreshDiceViewport();
      return;
    }

    if (diceBoxRef.current === 'initializing') return;
    diceBoxRef.current = 'initializing';

    const diceBox = new DiceBox('#dice-box', {
      assetPath: `${import.meta.env.BASE_URL}assets/`,
      theme: 'default',
      themeColor: accentColor,
      scale: 6,
      enableShadows: true,
      lightIntensity: 1
    });

    diceBox.init().then(() => {
      // Keep the initialized instance even when React StrictMode replays the effect.
      // Otherwise the ref can remain permanently stuck as "initializing".
      diceBoxRef.current = diceBox;
      refreshDiceViewport();
    }).catch((err: unknown) => {
      console.error('Falha ao inicializar WebGL dos Dados:', err);
      diceBoxRef.current = null;
    });
  }, [mode, accentColor]);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', accentColor);

    const hex = accentColor.replace('#', '');
    const r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.substring(0, 2), 16) || 255;
    const g = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.substring(2, 4), 16) || 0;
    const b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.substring(4, 6), 16) || 102;

    document.documentElement.style.setProperty('--accent-glow', `rgba(${r}, ${g}, ${b}, 0.3)`);
    document.documentElement.style.setProperty('--accent-transparent', `rgba(${r}, ${g}, ${b}, 0.1)`);
    document.documentElement.style.setProperty('--accent-hover', `rgb(${Math.min(255, r + 50)}, ${Math.min(255, g + 50)}, ${Math.min(255, b + 50)})`);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    const textColor = luminance > 0.5 ? '#000000' : '#ffffff';
    document.documentElement.style.setProperty('--accent-text-color', textColor);

    if (diceBoxRef.current && diceBoxRef.current !== 'initializing') {
      diceBoxRef.current.updateConfig({ themeColor: accentColor });
    }
  }, [accentColor]);

  const clearDice = () => {
    if (diceBoxRef.current && diceBoxRef.current !== 'initializing') diceBoxRef.current.clear();
    if (clearDiceTimeoutRef.current) clearTimeout(clearDiceTimeoutRef.current);
  };

  return { diceBoxRef, clearDiceTimeoutRef, clearDice };
}
