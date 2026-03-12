'use client';

import { motion } from 'framer-motion';

interface ScrollContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollContainer({ children, className = '', delay = 0 }: ScrollContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={`relative ${className}`}
    >
      {/* Top ornament */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-wuxia-gold/25 to-transparent" />
        <div className="w-1.5 h-1.5 rounded-full bg-wuxia-gold/40" />
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-wuxia-gold/25 to-transparent" />
      </div>

      {/* Content */}
      <div className="ink-paper ink-shadow-sm border border-wuxia-gold/12 p-6 backdrop-blur-sm">
        {children}
      </div>

      {/* Bottom ornament */}
      <div className="flex items-center gap-3 mt-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-wuxia-gold/25 to-transparent" />
        <div className="w-1.5 h-1.5 rounded-full bg-wuxia-gold/40" />
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-wuxia-gold/25 to-transparent" />
      </div>
    </motion.div>
  );
}
