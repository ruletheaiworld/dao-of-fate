'use client';

import { motion } from 'framer-motion';
import ScrollContainer from '@/components/ui/ScrollContainer';
import ProjectInputForm from '@/components/divine/ProjectInputForm';
import ParticleField from '@/components/animation/ParticleField';

export default function DivinePage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-wuxia-dark via-wuxia-ink/20 to-wuxia-dark" />
      <ParticleField count={15} />

      <div className="relative z-10 w-full max-w-lg">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-wuxia-gold/40 font-serif-kr text-xs tracking-[0.2em] mb-2">
            STEP 1
          </p>
          <h2 className="wuxia-title text-2xl md:text-3xl font-bold">
            대업을 알려주시오
          </h2>
          <p className="text-wuxia-parchment/40 font-serif-kr text-sm mt-2">
            이름이 곧 운명이니라
          </p>
        </motion.div>

        <ScrollContainer delay={0.3}>
          <ProjectInputForm />
        </ScrollContainer>
      </div>
    </div>
  );
}
