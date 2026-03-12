'use client';

import { Suspense } from 'react';
import ResultContent from './ResultContent';

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-wuxia-dark">
        <p className="font-serif-kr text-wuxia-gold/50 animate-pulse">운명을 읽는 중...</p>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}
