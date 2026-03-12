'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import WuxiaButton from '@/components/ui/WuxiaButton';
import ParticleField from '@/components/animation/ParticleField';

export default function HeroSection() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden ink-vignette">
      {/* Ink wash background */}
      <div className="absolute inset-0 ink-wash-bg" />

      {/* Ink cloud blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-[rgba(201,168,76,0.03)] rounded-full blur-[80px]" />
        <div className="absolute top-2/3 right-1/3 w-[400px] h-[400px] bg-[rgba(42,37,32,0.4)] rounded-full blur-[60px]" />
        <div className="absolute top-1/4 right-1/5 w-[300px] h-[200px] bg-[rgba(42,37,32,0.3)] rounded-full blur-[70px]" />
      </div>

      {/* Particles */}
      <ParticleField count={15} />

      {/* Content */}
      <div className="relative z-10 text-center space-y-8 max-w-lg">
        {/* Subtitle */}
        <motion.p
          className="text-wuxia-gold/40 font-serif-kr text-sm tracking-[0.3em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          만사의 길흉을 비추는 점괘소
        </motion.p>

        {/* Title */}
        <motion.h1
          className="wuxia-title text-4xl md:text-6xl font-bold leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          천기보감
        </motion.h1>

        {/* Hanja subtitle */}
        <motion.p
          className="font-serif-kr text-wuxia-parchment/25 text-lg tracking-[0.2em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          天機寶鑑
        </motion.p>

        {/* Description */}
        <motion.p
          className="font-serif-kr text-wuxia-parchment/60 text-base leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          그대가 품은 뜻,<br />
          하늘의 기운으로 점쳐보겠는가?
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <WuxiaButton onClick={() => router.push('/divine')}>
            점괘를 보다
          </WuxiaButton>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-wuxia-dark to-transparent" />
    </div>
  );
}
