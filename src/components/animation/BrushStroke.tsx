'use client';

import { motion } from 'framer-motion';

interface BrushStrokeProps {
  delay?: number;
}

export default function BrushStroke({ delay = 0 }: BrushStrokeProps) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 800 600"
      preserveAspectRatio="none"
    >
      {/* Main gold stroke */}
      <motion.path
        d="M 0 300 Q 200 100 400 300 Q 600 500 800 300"
        fill="none"
        stroke="rgba(201,168,76,0.35)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="1000"
        initial={{ strokeDashoffset: 1000, opacity: 0.5 }}
        animate={{ strokeDashoffset: 0, opacity: 0 }}
        transition={{ duration: 1.5, delay, ease: 'easeInOut' }}
      />
      {/* Crimson accent stroke */}
      <motion.path
        d="M 100 100 Q 400 400 700 150"
        fill="none"
        stroke="rgba(194,58,46,0.2)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1000"
        initial={{ strokeDashoffset: 1000, opacity: 0.35 }}
        animate={{ strokeDashoffset: 0, opacity: 0 }}
        transition={{ duration: 1.2, delay: delay + 0.3, ease: 'easeInOut' }}
      />
      {/* Ink splash — short, fast, faint */}
      <motion.path
        d="M 350 250 Q 420 200 500 280 Q 530 320 480 350"
        fill="none"
        stroke="rgba(42,37,32,0.25)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="500"
        initial={{ strokeDashoffset: 500, opacity: 0.3 }}
        animate={{ strokeDashoffset: 0, opacity: 0 }}
        transition={{ duration: 0.8, delay: delay + 0.6, ease: 'easeOut' }}
      />
    </svg>
  );
}
