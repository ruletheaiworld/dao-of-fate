'use client';

interface QiMeterProps {
  value: number; // 0-100
}

export default function QiMeter({ value }: QiMeterProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-serif-kr text-wuxia-gold/50">
        <span>기운</span>
        <span>{clampedValue > 0 ? `${clampedValue}%` : '—'}</span>
      </div>
      <div className="h-1.5 bg-wuxia-ink border border-wuxia-gold/10 overflow-hidden">
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{
            width: `${clampedValue}%`,
            background: `linear-gradient(90deg, var(--wuxia-gold) 0%, var(--wuxia-gold-light) 100%)`,
            boxShadow: clampedValue > 50 ? '0 0 8px var(--wuxia-gold)' : 'none',
          }}
        />
      </div>
    </div>
  );
}
