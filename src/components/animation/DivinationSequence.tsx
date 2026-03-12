'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BrushStroke from './BrushStroke';
import DivinerAnimated from './DivinerAnimated';

interface DivinationSequenceProps {
  onComplete: () => void;
}

const flashChars = ['天', '命', '運', '氣', '道', '劍', '龍', '鳳'];

export default function DivinationSequence({ onComplete }: DivinationSequenceProps) {
  const [phase, setPhase] = useState<'brush' | 'chars' | 'seal' | 'done'>('brush');

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('chars'), 1800),
      setTimeout(() => setPhase('seal'), 3200),
      setTimeout(() => {
        setPhase('done');
        onComplete();
      }, 4500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-wuxia-dark overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Vignette overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(12,11,10,0.7) 100%)' }} />

          {/* Animated diviner with ink effects */}
          <DivinerAnimated phase={phase} />

          {/* Brush strokes */}
          {(phase === 'brush' || phase === 'chars') && <BrushStroke />}

          {/* Flashing characters — 2 at a time across all 8 */}
          {phase === 'chars' && (
            <div className="relative z-10 flex gap-5">
              {flashChars.map((char, i) => (
                <motion.span
                  key={char}
                  className="text-4xl md:text-6xl font-serif-kr text-wuxia-gold"
                  style={{
                    opacity: 0,
                    textShadow: '0 0 8px rgba(201,168,76,0.3)',
                  }}
                  animate={{
                    opacity: [0, 0.8 - (i % 4) * 0.1, 0],
                    y: [15, 0, -15],
                    filter: ['blur(0px)', 'blur(0px)', 'blur(1px)'],
                  }}
                  transition={{
                    duration: 0.7,
                    delay: Math.floor(i / 2) * 0.25,
                    ease: 'easeInOut',
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          )}

          {/* Seal stamp */}
          {phase === 'seal' && (
            <motion.div
              className="relative z-10 flex flex-col items-center gap-4"
              initial={{ scale: 3, opacity: 0, rotate: -15 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 12 }}
            >
              {/* Outer border */}
              <div className="p-1 border border-wuxia-crimson/25">
                <div
                  className="w-28 h-28 flex items-center justify-center border-[3px] border-wuxia-crimson font-serif-kr text-3xl font-bold text-wuxia-crimson backdrop-blur-sm"
                  style={{
                    background: 'linear-gradient(135deg, rgba(191,53,38,0.1), rgba(191,53,38,0.04))',
                    boxShadow: 'inset 0 0 10px rgba(191,53,38,0.12)',
                  }}
                >
                  點卦
                </div>
              </div>
              <motion.p
                className="text-wuxia-gold/60 font-serif-kr text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                운명을 읽는 중...
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
