'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { FortuneResult } from '@/lib/fortune-types';
import { FORTUNE_LEVEL_INFO } from '@/lib/fortune-types';
import FortuneMeter from './FortuneMeter';
import LuckyElements from './LuckyElements';
import SealStamp from '@/components/ui/SealStamp';
import WuxiaButton from '@/components/ui/WuxiaButton';

interface FortuneStepsProps {
  fortune: FortuneResult;
  projectName: string;
  onComplete: () => void;
}

interface StepData {
  title: string;
  titleHanja: string;
  content: React.ReactNode;
}

function BackgroundImage({ src, barColor }: { src: string; barColor: string }) {
  const [hasError, setHasError] = useState(false);
  if (hasError) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <Image
        src={src}
        alt=""
        fill
        className="object-cover object-top opacity-30 scale-105"
        style={{ filter: 'sepia(0.4) saturate(0.6) brightness(0.7) contrast(1.1)' }}
        onError={() => setHasError(true)}
        sizes="100vw"
      />
      {/* Bottom anchor gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/60 to-transparent" />
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(12,11,10,0.8) 100%)',
        }}
      />
      {/* Top fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)]/50 via-transparent to-transparent" />
      {/* Color accent */}
      <div
        className="absolute inset-0"
        style={{ boxShadow: `inset 0 0 150px 50px ${barColor}15` }}
      />
    </div>
  );
}

export default function FortuneSteps({ fortune, projectName, onComplete }: FortuneStepsProps) {
  const [step, setStep] = useState(0);
  const levelInfo = FORTUNE_LEVEL_INFO[fortune.level];

  const steps: StepData[] = [
    {
      title: '운세 등급',
      titleHanja: '運勢等級',
      content: (
        <div className="flex flex-col items-center gap-6">
          <SealStamp text={levelInfo.label} size="lg" delay={0.2} />
          <p className={`text-3xl md:text-4xl font-serif-kr font-bold ${levelInfo.colorClass}`}>
            {fortune.level}
          </p>
          <p className="text-wuxia-parchment/60 font-serif-kr text-sm">
            {levelInfo.description}
          </p>
          <div className="w-full max-w-xs">
            <FortuneMeter level={fortune.level} delay={0.5} />
          </div>
        </div>
      ),
    },
    {
      title: '총운',
      titleHanja: '總運',
      content: (
        <p className="wuxia-body text-sm md:text-base leading-loose">
          {fortune.overallFortune}
        </p>
      ),
    },
    {
      title: '기운 분석',
      titleHanja: '氣運分析',
      content: (
        <p className="wuxia-body text-sm md:text-base leading-loose">
          {fortune.qiAnalysis}
        </p>
      ),
    },
    {
      title: '경고',
      titleHanja: '警告',
      content: (
        <ul className="space-y-3">
          {fortune.warnings.map((w, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.2 }}
              className="flex gap-3 text-sm font-serif-kr text-wuxia-parchment/80 leading-relaxed"
            >
              <span className="text-wuxia-crimson shrink-0 text-lg">▸</span>
              {w}
            </motion.li>
          ))}
        </ul>
      ),
    },
    {
      title: '조언',
      titleHanja: '助言',
      content: (
        <ul className="space-y-3">
          {fortune.advice.map((a, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.2 }}
              className="flex gap-3 text-sm font-serif-kr text-wuxia-parchment/80 leading-relaxed"
            >
              <span className="text-wuxia-jade shrink-0 text-lg">▸</span>
              {a}
            </motion.li>
          ))}
        </ul>
      ),
    },
    {
      title: '길한 요소',
      titleHanja: '吉元素',
      content: <LuckyElements elements={fortune.luckyElements} delay={0.2} size="lg" />,
    },
    {
      title: '운명의 시',
      titleHanja: '運命詩',
      content: (
        <p className="wuxia-body text-center text-lg md:text-xl leading-loose py-4 animate-text-glow">
          {fortune.poem}
        </p>
      ),
    },
  ];

  const isLast = step === steps.length - 1;
  const current = steps[step];

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setStep((s) => s + 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-wuxia-dark">
      {/* Background character image */}
      <BackgroundImage src={levelInfo.image} barColor={levelInfo.barColor} />

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-20 h-0.5 bg-wuxia-ink">
        <motion.div
          className="h-full"
          style={{ backgroundColor: levelInfo.barColor }}
          animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Top info */}
      <div className="absolute top-4 left-0 right-0 z-20 text-center">
        <p className="text-wuxia-parchment/30 font-serif-kr text-xs">
          {projectName}
        </p>
      </div>

      {/* Step counter */}
      <div className="absolute top-4 right-4 z-20">
        <span className="text-wuxia-gold/30 font-serif-kr text-xs">
          {step + 1} / {steps.length}
        </span>
      </div>

      {/* Content area */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="flex-1 flex items-center justify-center px-6 py-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-lg"
            >
              {/* Step title */}
              <div className="text-center mb-8">
                <p className="text-wuxia-gold/40 font-serif-kr text-xs tracking-[0.3em] mb-2">
                  {current.titleHanja}
                </p>
                <h2 className="wuxia-title text-2xl md:text-3xl font-bold">
                  {current.title}
                </h2>
                <div className="mt-3 h-px w-16 mx-auto bg-gradient-to-r from-transparent via-wuxia-gold/30 to-transparent" />
              </div>

              {/* Step content */}
              <div className="ink-paper ink-shadow-md border border-wuxia-gold/15 p-6 md:p-8 backdrop-blur-sm">
                {current.content}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom navigation */}
        <div className="relative z-20 flex items-center justify-center gap-4 pb-8 px-6">
          {step > 0 && (
            <WuxiaButton variant="secondary" onClick={() => setStep((s) => s - 1)}>
              이전
            </WuxiaButton>
          )}
          <WuxiaButton onClick={handleNext}>
            {isLast ? '결과 전체 보기' : '다음'}
          </WuxiaButton>
        </div>
      </div>
    </div>
  );
}
