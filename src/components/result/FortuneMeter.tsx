'use client';

import { motion } from 'framer-motion';
import type { FortuneLevel } from '@/lib/fortune-types';
import { FORTUNE_LEVEL_INFO } from '@/lib/fortune-types';

interface FortuneMeterProps {
  level: FortuneLevel;
  delay?: number;
}

export default function FortuneMeter({ level, delay = 0 }: FortuneMeterProps) {
  const info = FORTUNE_LEVEL_INFO[level];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="font-serif-kr text-sm text-wuxia-parchment/60">기운 수치</span>
        <span className={`font-serif-kr text-sm ${info.colorClass}`}>{info.percentage}%</span>
      </div>
      <div className="relative h-4 bg-wuxia-ink border border-wuxia-gold/20 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0"
          style={{ backgroundColor: info.barColor }}
          initial={{ width: 0 }}
          animate={{ width: `${info.percentage}%` }}
          transition={{ duration: 1.2, delay, ease: 'easeOut' }}
        />
        {/* Scanline effect */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)]" />
      </div>
    </div>
  );
}
