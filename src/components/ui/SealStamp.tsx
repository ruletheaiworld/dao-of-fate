'use client';

import { motion } from 'framer-motion';

interface SealStampProps {
  text: string;
  size?: 'sm' | 'md' | 'lg';
  delay?: number;
}

const sizeClasses = {
  sm: 'w-16 h-16 text-sm',
  md: 'w-24 h-24 text-xl',
  lg: 'w-32 h-32 text-2xl',
};

export default function SealStamp({ text, size = 'md', delay = 0 }: SealStampProps) {
  const rotation = -(2 + (text.length % 4));

  return (
    <motion.div
      initial={{ scale: 3, opacity: 0, rotate: -15 }}
      animate={{ scale: 1, opacity: 1, rotate: rotation }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 15,
        delay,
      }}
      className={`${sizeClasses[size]} flex items-center justify-center rounded-sm border-[3px] border-wuxia-crimson font-serif-kr font-bold text-wuxia-crimson select-none`}
      style={{
        background: 'linear-gradient(135deg, rgba(191,53,38,0.12), rgba(191,53,38,0.04))',
        boxShadow: '0 0 0 2px rgba(191,53,38,0.12), inset 0 0 0 2px rgba(191,53,38,0.08)',
      }}
    >
      <span
        className="leading-tight text-center"
        style={{ textShadow: '1px 1px 2px rgba(191,53,38,0.25)' }}
      >
        {text}
      </span>
    </motion.div>
  );
}
