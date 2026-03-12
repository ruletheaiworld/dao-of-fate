export type FortuneLevel = '대길' | '길' | '평' | '흉' | '대흉';

export interface LuckyElements {
  tool: string;
  day: string;
  color: { name: string; hex: string };
  number: number;
}

export interface FortuneResult {
  level: FortuneLevel;
  overallFortune: string;
  qiAnalysis: string;
  warnings: string[];
  advice: string[];
  luckyElements: LuckyElements;
  poem: string;
}

export interface FortuneLevelInfo {
  label: string;
  description: string;
  colorClass: string;
  barColor: string;
  percentage: number;
  image: string;
}

export const FORTUNE_LEVEL_INFO: Record<FortuneLevel, FortuneLevelInfo> = {
  '대길': {
    label: '大吉',
    description: '하늘이 돕는 운세',
    colorClass: 'fortune-great',
    barColor: '#ffd700',
    percentage: 100,
    image: '/images/fortune-great.jpg',
  },
  '길': {
    label: '吉',
    description: '순풍에 돛을 단 운세',
    colorClass: 'fortune-good',
    barColor: '#4ade80',
    percentage: 75,
    image: '/images/fortune-good.jpg',
  },
  '평': {
    label: '平',
    description: '고요한 물결의 운세',
    colorClass: 'fortune-neutral',
    barColor: '#94a3b8',
    percentage: 50,
    image: '/images/fortune-neutral.jpg',
  },
  '흉': {
    label: '凶',
    description: '험로를 걷는 운세',
    colorClass: 'fortune-bad',
    barColor: '#f87171',
    percentage: 25,
    image: '/images/fortune-bad.jpg',
  },
  '대흉': {
    label: '大凶',
    description: '마경에 빠진 운세',
    colorClass: 'fortune-terrible',
    barColor: '#dc2626',
    percentage: 10,
    image: '/images/fortune-terrible.jpg',
  },
};
