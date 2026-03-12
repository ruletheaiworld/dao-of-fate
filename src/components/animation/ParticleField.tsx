'use client';

import { useMemo } from 'react';

interface Particle {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  shape: 'round' | 'soft';
}

interface ParticleFieldProps {
  count?: number;
  color?: string;
}

export default function ParticleField({ count = 15, color = 'var(--wuxia-gold)' }: ParticleFieldProps) {
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${(i * 37 + 13) % 100}%`,
      size: 2 + (i % 5),
      duration: 4 + (i % 5) * 1.3,
      delay: (i * 0.7) % 8,
      opacity: 0.15 + (i % 4) * 0.06,
      shape: (i % 3 === 0 ? 'soft' : 'round') as 'round' | 'soft',
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute bottom-0 animate-float ${p.shape === 'round' ? 'rounded-full' : 'rounded-sm'}`}
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: color,
            opacity: p.opacity,
            filter: 'blur(0.5px)',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
