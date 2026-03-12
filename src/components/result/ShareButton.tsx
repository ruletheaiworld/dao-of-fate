'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const input = document.createElement('input');
      input.value = window.location.href;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative">
      <motion.button
        onClick={handleCopy}
        className="px-6 py-2 border border-wuxia-gold/30 text-wuxia-gold/70 font-serif-kr text-sm hover:bg-wuxia-gold/10 hover:text-wuxia-gold transition-colors cursor-pointer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        운명의 두루마리를 복사하다
      </motion.button>

      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-1/2 -translate-x-1/2 mt-2 px-4 py-1 bg-wuxia-gold text-wuxia-dark text-xs font-serif-kr whitespace-nowrap"
          >
            복사 완료!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
