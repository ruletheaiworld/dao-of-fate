'use client';

import { useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { generateFortune } from '@/lib/fortune-engine';
import DivinationSequence from '@/components/animation/DivinationSequence';
import FortuneSteps from '@/components/result/FortuneSteps';
import FortuneGrid from '@/components/result/FortuneGrid';
import ShareButton from '@/components/result/ShareButton';
import WuxiaButton from '@/components/ui/WuxiaButton';
import ParticleField from '@/components/animation/ParticleField';

type Phase = 'animation' | 'steps' | 'summary';

export default function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('animation');

  const name = searchParams.get('name') || '';
  const desc = searchParams.get('desc') || '';
  const sect = searchParams.get('sect') || '';
  const element = searchParams.get('element') || '';
  const resolve = searchParams.get('resolve') || '';

  const extras = [desc, sect, element, resolve].filter(Boolean).join(' ');
  const fortune = name ? generateFortune(name, extras || undefined) : null;

  const handleAnimationComplete = useCallback(() => {
    setPhase('steps');
  }, []);

  const handleStepsComplete = useCallback(() => {
    setPhase('summary');
  }, []);

  if (!name) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <p className="font-serif-kr text-wuxia-parchment/60">
          점괘를 볼 대업이 지정되지 않았소.
        </p>
        <WuxiaButton onClick={() => router.push('/divine')}>
          대업을 입력하다
        </WuxiaButton>
      </div>
    );
  }

  return (
    <>
      {phase === 'animation' && (
        <DivinationSequence onComplete={handleAnimationComplete} />
      )}

      {phase === 'steps' && fortune && (
        <FortuneSteps
          fortune={fortune}
          projectName={name}
          onComplete={handleStepsComplete}
        />
      )}

      {phase === 'summary' && fortune && (
        <div className="relative min-h-screen px-4 py-16">
          <div className="absolute inset-0 bg-gradient-to-b from-wuxia-dark via-wuxia-ink/20 to-wuxia-dark" />
          <ParticleField count={20} />

          <div className="relative z-10 space-y-8">
            <FortuneGrid
              fortune={fortune}
              projectName={name}
              sect={sect}
              element={element}
              resolve={resolve}
            />

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 pb-16">
              <ShareButton />
              <WuxiaButton variant="secondary" onClick={() => router.push('/divine')}>
                다른 대업을 점치다
              </WuxiaButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
