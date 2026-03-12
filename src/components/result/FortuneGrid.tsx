'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { FortuneResult } from '@/lib/fortune-types';
import { FORTUNE_LEVEL_INFO } from '@/lib/fortune-types';
import FortuneScroll from './FortuneScroll';
import FortuneMeter from './FortuneMeter';
import LuckyElements from './LuckyElements';
import SealStamp from '@/components/ui/SealStamp';

interface FortuneGridProps {
  fortune: FortuneResult;
  projectName: string;
  sect?: string;
  element?: string;
  resolve?: string;
}

function CharacterImage({ level, label, barColor }: { level: string; label: string; barColor: string }) {
  const [hasError, setHasError] = useState(false);
  const info = FORTUNE_LEVEL_INFO[level as keyof typeof FORTUNE_LEVEL_INFO];

  if (hasError) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-40 h-40 md:w-56 md:h-56 flex items-center justify-center border border-wuxia-gold/10 ink-paper"
        style={{ boxShadow: `0 0 40px ${barColor}15` }}
      >
        <span className="font-serif-kr text-5xl md:text-7xl" style={{ color: barColor, opacity: 0.4 }}>
          {label}
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative w-40 h-40 md:w-56 md:h-56 overflow-hidden"
      style={{ boxShadow: `0 0 50px ${barColor}15, 0 0 100px ${barColor}08` }}
    >
      <Image
        src={info.image}
        alt={`${level} 인물`}
        fill
        className="object-cover"
        style={{ filter: 'sepia(0.25) saturate(0.7) contrast(1.1)' }}
        onError={() => setHasError(true)}
        sizes="(max-width: 768px) 160px, 224px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] to-transparent opacity-40" />
    </motion.div>
  );
}

export default function FortuneGrid({ fortune, projectName, sect, element, resolve }: FortuneGridProps) {
  const levelInfo = FORTUNE_LEVEL_INFO[fortune.level];
  const baseDelay = 0.2;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header: Project name + Fortune level */}
      <div className="text-center space-y-4">
        <p className="text-wuxia-parchment/50 font-serif-kr text-sm">대업(大業)</p>
        <h1 className="wuxia-title text-3xl md:text-4xl font-bold">{projectName}</h1>

        {/* 부가 정보 태그 */}
        {(sect || element || resolve) && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {sect && (
              <span className="px-3 py-1 text-xs font-serif-kr border border-wuxia-gold/15 text-wuxia-gold/60 ink-shadow-sm">
                {sect}
              </span>
            )}
            {element && (
              <span className="px-3 py-1 text-xs font-serif-kr border border-wuxia-gold/15 text-wuxia-gold/60 ink-shadow-sm">
                {element}행(行)
              </span>
            )}
            {resolve && (
              <span className="px-3 py-1 text-xs font-serif-kr border border-wuxia-parchment/10 text-wuxia-parchment/50 italic ink-shadow-sm">
                &ldquo;{resolve}&rdquo;
              </span>
            )}
          </div>
        )}

        {/* 등급별 인물 이미지 */}
        <div className="flex justify-center py-2">
          <CharacterImage
            level={fortune.level}
            label={levelInfo.label}
            barColor={levelInfo.barColor}
          />
        </div>

        <div className="flex items-center justify-center gap-6">
          <SealStamp text={levelInfo.label} size="lg" delay={baseDelay} />
          <div className="text-left space-y-1">
            <p className={`text-2xl font-serif-kr font-bold ${levelInfo.colorClass}`}>
              {fortune.level}
            </p>
            <p className="text-sm text-wuxia-parchment/60 font-serif-kr">
              {levelInfo.description}
            </p>
          </div>
        </div>

        <FortuneMeter level={fortune.level} delay={baseDelay + 0.3} />
      </div>

      {/* Fortune cards */}
      <FortuneScroll
        title="총운"
        titleHanja="總運"
        icon="龍"
        delay={baseDelay + 0.5}
      >
        <p className="wuxia-body text-sm md:text-base">{fortune.overallFortune}</p>
      </FortuneScroll>

      <FortuneScroll
        title="기운 분석"
        titleHanja="氣運分析"
        icon="氣"
        accentColor="var(--wuxia-jade)"
        delay={baseDelay + 0.7}
      >
        <p className="wuxia-body text-sm md:text-base">{fortune.qiAnalysis}</p>
      </FortuneScroll>

      <FortuneScroll
        title="경고"
        titleHanja="警告"
        icon="戒"
        accentColor="var(--wuxia-crimson)"
        delay={baseDelay + 0.9}
      >
        <ul className="space-y-2">
          {fortune.warnings.map((w, i) => (
            <li key={i} className="flex gap-2 text-sm font-serif-kr text-wuxia-parchment/80">
              <span className="text-wuxia-crimson shrink-0">▸</span>
              {w}
            </li>
          ))}
        </ul>
      </FortuneScroll>

      <FortuneScroll
        title="조언"
        titleHanja="助言"
        icon="道"
        accentColor="var(--wuxia-jade)"
        delay={baseDelay + 1.1}
      >
        <ul className="space-y-2">
          {fortune.advice.map((a, i) => (
            <li key={i} className="flex gap-2 text-sm font-serif-kr text-wuxia-parchment/80">
              <span className="text-wuxia-jade shrink-0">▸</span>
              {a}
            </li>
          ))}
        </ul>
      </FortuneScroll>

      <FortuneScroll
        title="길한 요소"
        titleHanja="吉元素"
        icon="福"
        delay={baseDelay + 1.3}
      >
        <LuckyElements elements={fortune.luckyElements} delay={baseDelay + 1.5} />
      </FortuneScroll>

      <FortuneScroll
        title="운명의 시"
        titleHanja="運命詩"
        icon="詩"
        accentColor="var(--wuxia-purple)"
        delay={baseDelay + 1.7}
      >
        <p className="wuxia-body text-center text-base md:text-lg py-4 animate-text-glow">
          {fortune.poem}
        </p>
      </FortuneScroll>
    </div>
  );
}
