'use client';

import { motion } from 'framer-motion';
import type { LuckyElements as LuckyElementsType } from '@/lib/fortune-types';

interface LuckyElementsProps {
  elements: LuckyElementsType;
  delay?: number;
  size?: 'default' | 'lg';
}

interface ElementCardProps {
  label: string;
  value: string;
  icon: string;
  index: number;
  baseDelay: number;
  colorSwatch?: string;
  size: 'default' | 'lg';
}

function ElementCard({ label, value, icon, index, baseDelay, colorSwatch, size }: ElementCardProps) {
  const isLg = size === 'lg';
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: baseDelay + index * 0.1 }}
      className={`ink-paper ink-shadow-sm border border-wuxia-gold/10 flex flex-col gap-2 ${isLg ? 'p-5' : 'p-4'}`}
    >
      <div className="flex items-center gap-2">
        <span className={`font-serif-kr text-wuxia-crimson/70 ${isLg ? 'text-3xl' : 'text-xl'}`} style={{ textShadow: '1px 1px 3px rgba(191,53,38,0.2)' }}>{icon}</span>
        <span className={`text-wuxia-gold/60 font-serif-kr ${isLg ? 'text-sm' : 'text-xs'}`}>{label}</span>
      </div>
      <p className={`text-wuxia-parchment/90 font-serif-kr leading-relaxed ${isLg ? 'text-lg' : 'text-sm'}`}>{value}</p>
      {colorSwatch && (
        <div className="flex items-center gap-2 mt-1">
          <div
            className="w-5 h-5 rounded-sm border border-wuxia-gold/20 ink-shadow-sm"
            style={{ backgroundColor: colorSwatch }}
          />
          <span className="text-xs text-wuxia-parchment/50">{colorSwatch}</span>
        </div>
      )}
    </motion.div>
  );
}

export default function LuckyElements({ elements, delay = 0, size = 'default' }: LuckyElementsProps) {
  const items = [
    { label: '길한 도구', value: elements.tool, icon: '器' },
    { label: '길한 날', value: elements.day, icon: '日' },
    { label: '길한 색', value: elements.color.name, icon: '彩', colorSwatch: elements.color.hex },
    { label: '길한 수', value: `${elements.number}`, icon: '數' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((item, i) => (
        <ElementCard
          key={item.label}
          label={item.label}
          value={item.value}
          icon={item.icon}
          index={i}
          baseDelay={delay}
          colorSwatch={item.colorSwatch}
          size={size}
        />
      ))}
    </div>
  );
}
