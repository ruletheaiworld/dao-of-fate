'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

type Phase = 'brush' | 'chars' | 'seal' | 'done';

interface DivinerAnimatedProps {
  phase: Phase;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const imageVariants: Record<string, any> = {
  brush: {
    opacity: 0.4,
    scale: 1.0,
    y: [0, -8, 0],
    rotate: [0, -0.5, 0, 0.5, 0],
    filter: 'sepia(0.3) contrast(1.1) drop-shadow(0 0 12px rgba(201,168,76,0.2))',
    transition: {
      y: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
      rotate: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
      opacity: { duration: 1.5 },
      scale: { duration: 1.5 },
      filter: { duration: 1.5 },
    },
  },
  chars: {
    opacity: 0.55,
    scale: 1.02,
    y: [0, -10, 0],
    rotate: [0, -0.8, 0, 0.8, 0],
    filter: 'sepia(0.2) contrast(1.1) drop-shadow(0 0 25px rgba(201,168,76,0.35))',
    transition: {
      y: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
      rotate: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
      opacity: { duration: 0.5 },
      scale: { duration: 0.5 },
      filter: { duration: 0.5 },
    },
  },
  seal: {
    opacity: [0.6, 0.55, 0.15],
    scale: [1.02, 0.98, 0.96],
    y: 0,
    rotate: 0,
    filter: 'sepia(0.1) contrast(1.15) drop-shadow(0 0 35px rgba(194,58,46,0.35))',
    transition: { duration: 1.2, ease: 'easeOut' },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const glowVariants: Record<string, any> = {
  brush: {
    opacity: 0.06,
    scale: 1,
    transition: { duration: 1.5 },
  },
  chars: {
    opacity: 0.12,
    scale: 1.1,
    transition: { duration: 0.5 },
  },
  seal: {
    opacity: [0.18, 0.06],
    scale: [1.2, 1.4],
    transition: { duration: 1.2 },
  },
};

function QiRings({ phase }: { phase: Phase }) {
  const rings = [
    { delay: 0, size: 'w-80 h-80 md:w-[28rem] md:h-[28rem]' },
    { delay: 1, size: 'w-96 h-96 md:w-[34rem] md:h-[34rem]' },
    { delay: 2, size: 'w-[28rem] h-[28rem] md:w-[40rem] md:h-[40rem]' },
  ];

  const isActive = phase === 'chars' || phase === 'seal';
  const shadowColor = phase === 'seal' ? 'rgba(194,58,46,0.15)' : 'rgba(201,168,76,0.12)';

  return (
    <>
      {rings.map((ring, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${ring.size}`}
          style={{ filter: 'blur(3px)' }}
          animate={
            isActive
              ? {
                  boxShadow: [
                    `inset 0 0 20px ${shadowColor}, 0 0 40px ${shadowColor}`,
                    'inset 0 0 0px transparent, 0 0 0px transparent',
                  ],
                  scale: [1, 1.4],
                  opacity: [0.5, 0],
                }
              : { opacity: 0 }
          }
          transition={
            isActive
              ? { duration: 2.5, delay: ring.delay, repeat: Infinity, ease: 'easeOut' }
              : { duration: 0.3 }
          }
        />
      ))}
    </>
  );
}

function InkMist({ phase }: { phase: Phase }) {
  const isActive = phase !== 'done';
  const color = phase === 'seal' ? 'rgba(194,58,46,0.08)' : 'rgba(201,168,76,0.06)';

  const mists = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const angle = (i / 7) * Math.PI * 2;
        const radius = 100 + (i % 3) * 40;
        return {
          id: i,
          startX: Math.cos(angle) * radius,
          startY: Math.sin(angle) * radius,
          width: 50 + (i % 4) * 20,
          height: 15 + (i % 3) * 10,
          drift: 30 + (i % 5) * 15,
          duration: 5 + (i % 3) * 2,
          delay: (i % 4) * 0.8,
          rotation: (i % 2 === 0 ? 1 : -1) * (10 + (i % 3) * 15),
        };
      }),
    []
  );

  if (!isActive) return null;

  return (
    <>
      {mists.map((m) => (
        <motion.div
          key={m.id}
          className="absolute rounded-full"
          style={{
            width: m.width,
            height: m.height,
            backgroundColor: color,
            filter: `blur(${10 + (m.id % 4) * 4}px)`,
          }}
          animate={{
            x: [m.startX, m.startX + m.drift, m.startX - m.drift * 0.5],
            y: [m.startY, m.startY - 50, m.startY - 90],
            opacity: [0, 0.15, 0.08, 0],
            scaleX: [1, 1.5, 0.8],
            scaleY: [1, 0.7, 1.3],
            rotate: [0, m.rotation, -m.rotation * 0.6],
          }}
          transition={{
            duration: m.duration,
            delay: m.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  );
}

export default function DivinerAnimated({ phase }: DivinerAnimatedProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Radial glow backdrop */}
      <motion.div
        className="absolute w-[30rem] h-[30rem] md:w-[40rem] md:h-[40rem] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(201,168,76,0.5) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        variants={glowVariants}
        animate={phase}
      />

      {/* Qi energy rings */}
      <QiRings phase={phase} />

      {/* Ink mist effects */}
      <InkMist phase={phase} />

      {/* Character image */}
      {!hasError && (
        <motion.div
          className="relative w-72 h-72 md:w-96 md:h-96"
          style={{ willChange: 'transform, filter' }}
          variants={imageVariants}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={phase}
        >
          <Image
            src="/images/diviner.jpg"
            alt="점괘를 치는 도사"
            fill
            priority
            className="object-contain"
            onError={() => setHasError(true)}
            sizes="(max-width: 768px) 288px, 384px"
          />
        </motion.div>
      )}
    </div>
  );
}
