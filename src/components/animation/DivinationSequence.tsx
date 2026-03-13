'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BrushStroke from './BrushStroke';
import DivinerAnimated from './DivinerAnimated';

interface DivinationSequenceProps {
  onComplete: () => void;
  sect?: string;
  element?: string;
}

const flashChars = ['天', '命', '運', '氣', '道', '劍', '龍', '鳳'];

const SECT_LINES: Record<string, string> = {
  '화산파': '화산의 험준한 봉우리에서 검기가 일어서는구나...',
  '소림사': '천년 고찰의 목탁 소리가 울려퍼지는도다...',
  '무당파': '무당산의 안개 속에서 도의 기운이 흐르는구나...',
  '개방': '천하를 떠도는 자유로운 바람이 부는도다...',
  '사천당문': '은밀한 독안개 속에서 기관의 소리가 들리는구나...',
  '마교': '어둠 속에서 파격의 기운이 솟구치는도다...',
  '천잔궁': '높고 고고한 곳에서 홀로 빛나는 기운이로다...',
};

const ELEMENT_LINES: Record<string, string> = {
  '금': '금(金)의 기운이 날카롭게 내리꽂힌다...',
  '목': '목(木)의 기운이 힘차게 뻗어나가는도다...',
  '수': '수(水)의 기운이 고요히 흘러드는구나...',
  '화': '화(火)의 기운이 활활 타오르는도다...',
  '토': '토(土)의 기운이 묵직하게 감싸는구나...',
};

type Phase = 'brush' | 'narration' | 'chars' | 'seal' | 'done';

export default function DivinationSequence({ onComplete, sect, element }: DivinationSequenceProps) {
  const [phase, setPhase] = useState<Phase>('brush');

  const sectLine = sect ? SECT_LINES[sect] : null;
  const elementLine = element ? ELEMENT_LINES[element] : null;
  const hasNarration = !!(sectLine || elementLine);

  const narrationLines = useMemo(() => {
    const lines: string[] = [];
    if (sectLine) lines.push(sectLine);
    if (elementLine) lines.push(elementLine);
    return lines;
  }, [sectLine, elementLine]);

  const narrationDuration = narrationLines.length * 900;

  useEffect(() => {
    const brushEnd = 1200;
    const narrationEnd = brushEnd + (hasNarration ? narrationDuration + 400 : 0);
    const charsEnd = narrationEnd + 1400;
    const sealEnd = charsEnd + 1300;

    const timers = [
      ...(hasNarration
        ? [setTimeout(() => setPhase('narration'), brushEnd)]
        : []),
      setTimeout(() => setPhase('chars'), narrationEnd),
      setTimeout(() => setPhase('seal'), charsEnd),
      setTimeout(() => {
        setPhase('done');
        onComplete();
      }, sealEnd),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete, hasNarration, narrationDuration]);

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

          {/* Narration — sect/element lines */}
          {phase === 'narration' && (
            <div className="relative z-10 flex flex-col items-center gap-4 px-8 max-w-md">
              {narrationLines.map((line, i) => (
                <motion.p
                  key={line}
                  className="font-serif-kr text-wuxia-parchment/70 text-xl md:text-2xl text-center leading-relaxed"
                  style={{ textShadow: '0 0 15px rgba(201,168,76,0.2)' }}
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -5], filter: ['blur(4px)', 'blur(0px)', 'blur(0px)', 'blur(2px)'] }}
                  transition={{
                    duration: 0.9,
                    delay: i * 0.9,
                    times: [0, 0.2, 0.75, 1],
                    ease: 'easeInOut',
                  }}
                >
                  {line}
                </motion.p>
              ))}
            </div>
          )}

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
              <div className="p-1" style={{ borderColor: 'rgba(139,69,19,0.25)', borderWidth: 1, borderStyle: 'solid' }}>
                <div
                  className="w-28 h-28 flex items-center justify-center border-[3px] font-serif-kr text-3xl font-bold backdrop-blur-sm"
                  style={{
                    color: '#8b4513',
                    borderColor: '#8b4513',
                    background: 'linear-gradient(135deg, rgba(139,69,19,0.1), rgba(139,69,19,0.04))',
                    boxShadow: 'inset 0 0 10px rgba(139,69,19,0.12)',
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
