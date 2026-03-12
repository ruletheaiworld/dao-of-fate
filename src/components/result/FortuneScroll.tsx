'use client';

import { motion } from 'framer-motion';

interface FortuneScrollProps {
  title: string;
  titleHanja?: string;
  children: React.ReactNode;
  icon?: string;
  accentColor?: string;
  delay?: number;
}

export default function FortuneScroll({
  title,
  titleHanja,
  children,
  icon,
  accentColor = 'var(--wuxia-gold)',
  delay = 0,
}: FortuneScrollProps) {
  return (
    <motion.div
      initial={{ opacity: 0, maxHeight: 0 }}
      animate={{ opacity: 1, maxHeight: 600 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className="overflow-hidden"
    >
      <div className="ink-silk ink-shadow-sm border border-wuxia-gold/10 backdrop-blur-sm">
        {/* Header */}
        <div
          className="flex items-center gap-3 px-5 py-3 border-b border-wuxia-gold/10"
          style={{
            borderLeftWidth: 4,
            borderLeftColor: accentColor,
            boxShadow: `2px 0 8px ${accentColor}20`,
          }}
        >
          {icon && <span className="text-xl">{icon}</span>}
          <h3 className="font-serif-kr text-lg" style={{ color: accentColor }}>
            {title}
          </h3>
          {titleHanja && (
            <span className="text-xs text-wuxia-parchment/40 font-serif-kr">{titleHanja}</span>
          )}
        </div>

        {/* Body */}
        <div className="px-5 py-4">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
