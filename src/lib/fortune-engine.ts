import { hashString, seededRandom } from './hash';
import { overallFortunes, qiAnalyses } from '@/data/fortunes';
import { warnings, advice } from '@/data/warnings';
import { luckyTools, luckyDays, luckyColors, poems } from '@/data/luckyElements';
import type { FortuneLevel, FortuneResult } from './fortune-types';

const FORTUNE_THRESHOLDS: [FortuneLevel, number][] = [
  ['대길', 10],
  ['길', 35],
  ['평', 65],
  ['흉', 85],
  ['대흉', 100],
];

function determineLevel(value: number): FortuneLevel {
  const pct = value % 100;
  for (const [level, threshold] of FORTUNE_THRESHOLDS) {
    if (pct < threshold) return level;
  }
  return '대흉';
}

function pickItems<T>(arr: T[], rng: () => number, count: number): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

function pickOne<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

export function generateFortune(projectName: string, projectDescription?: string): FortuneResult {
  const seed = hashString(projectName);
  const rng = seededRandom(seed);

  // Use description to slightly modify secondary selections (but not the level)
  const descSeed = projectDescription ? hashString(projectDescription) : 0;
  const descRng = seededRandom(seed ^ descSeed);

  const level = determineLevel(Math.floor(rng() * 10000));

  const overallPool = overallFortunes[level];
  const qiPool = qiAnalyses[level];

  const overallFortune = pickOne(overallPool, rng);
  const qiAnalysis = pickOne(qiPool, rng);

  const warningCount = level === '대흉' ? 3 : level === '흉' ? 2 : level === '평' ? 2 : 1;
  const adviceCount = level === '대길' ? 1 : level === '길' ? 2 : 2;

  const selectedWarnings = pickItems(warnings, descRng, warningCount);
  const selectedAdvice = pickItems(advice, descRng, adviceCount);

  const luckyElements = {
    tool: pickOne(luckyTools, rng),
    day: pickOne(luckyDays, rng),
    color: pickOne(luckyColors, rng),
    number: Math.floor(rng() * 99) + 1,
  };

  const poem = pickOne(poems, rng);

  return {
    level,
    overallFortune,
    qiAnalysis,
    warnings: selectedWarnings,
    advice: selectedAdvice,
    luckyElements,
    poem,
  };
}
