'use client';

import { motion } from 'framer-motion';

interface WuxiaButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export default function WuxiaButton({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
}: WuxiaButtonProps) {
  const baseClasses =
    'relative px-8 py-3 font-serif-kr text-lg tracking-wider border-2 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses =
    variant === 'primary'
      ? 'border-wuxia-gold/80 text-wuxia-gold hover:border-wuxia-gold'
      : 'border-wuxia-parchment/40 text-wuxia-parchment/80 hover:border-wuxia-parchment/60 hover:text-wuxia-parchment';

  const variantStyle =
    variant === 'primary'
      ? {
          background: 'linear-gradient(180deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.04) 100%)',
          boxShadow: 'inset 0 0 0 1px rgba(201,168,76,0.15), 0 2px 8px rgba(0,0,0,0.4)',
        }
      : {
          background: 'transparent',
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
        };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses}`}
      style={variantStyle}
      whileHover={{
        scale: 1.03,
        boxShadow:
          variant === 'primary'
            ? 'inset 0 0 0 1px rgba(201,168,76,0.4), 0 0 20px rgba(201,168,76,0.12), 0 4px 12px rgba(0,0,0,0.5)'
            : '0 0 12px rgba(240,228,204,0.08), 0 4px 12px rgba(0,0,0,0.4)',
      }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
