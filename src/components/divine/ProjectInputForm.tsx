'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import WuxiaButton from '@/components/ui/WuxiaButton';
import QiMeter from './QiMeter';

const SECTS = [
  { value: '', label: '선택하시오' },
  { value: '화산파', label: '화산파(華山派) — 예리한 검술의 정파' },
  { value: '소림사', label: '소림사(少林寺) — 근본과 내공의 문파' },
  { value: '무당파', label: '무당파(武當派) — 유연한 도법의 문파' },
  { value: '개방', label: '개방(丐幇) — 자유로운 영혼의 무리' },
  { value: '사천당문', label: '사천당문(四川唐門) — 은밀한 기술의 가문' },
  { value: '마교', label: '마교(魔敎) — 파격과 혁신의 세력' },
  { value: '천잔궁', label: '천잔궁(天蠶宮) — 고고한 독행의 문파' },
];

const ELEMENTS = [
  { value: '', label: '선택하시오' },
  { value: '금', label: '금(金) — 결단, 날카로움, 정밀' },
  { value: '목', label: '목(木) — 성장, 창의, 유연' },
  { value: '수', label: '수(水) — 지혜, 적응, 흐름' },
  { value: '화', label: '화(火) — 열정, 추진, 대담' },
  { value: '토', label: '토(土) — 안정, 신뢰, 포용' },
];

export default function ProjectInputForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [sect, setSect] = useState('');
  const [element, setElement] = useState('');
  const [resolve, setResolve] = useState('');

  const qiValue = Math.min(100,
    name.length * 2
    + desc.length * 1
    + (sect ? 15 : 0)
    + (element ? 15 : 0)
    + resolve.length * 1
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const params = new URLSearchParams({ name: name.trim() });
    if (desc.trim()) params.set('desc', desc.trim());
    if (sect) params.set('sect', sect);
    if (element) params.set('element', element);
    if (resolve.trim()) params.set('resolve', resolve.trim());
    router.push(`/result?${params.toString()}`);
  };

  const inputClass = "w-full bg-wuxia-dark/80 border border-wuxia-gold/30 px-4 py-3 text-wuxia-parchment font-serif-kr placeholder:text-wuxia-parchment/20 focus:outline-none focus:border-wuxia-gold/60 focus:shadow-[0_0_10px_rgba(212,160,23,0.15)] transition-all";
  const selectClass = `${inputClass} appearance-none cursor-pointer`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* 대업 이름 */}
      <div className="space-y-2">
        <label className="block font-serif-kr text-wuxia-gold text-sm">
          대업의 이름을 알려주시오
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="예: 전국제패"
          className={inputClass}
          required
          maxLength={50}
        />
      </div>

      {/* 대업 설명 */}
      <div className="space-y-2">
        <label className="block font-serif-kr text-wuxia-gold/70 text-sm">
          어떤 대업을 이루고자 하는가? <span className="text-wuxia-parchment/30">(선택)</span>
        </label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="이루고자 하는 바를 간략히 서술하시오..."
          rows={2}
          className={`${inputClass} resize-none`}
          maxLength={200}
        />
      </div>

      {/* 문파 + 오행 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block font-serif-kr text-wuxia-gold/70 text-sm">
            소속 문파 <span className="text-wuxia-parchment/30">(선택)</span>
          </label>
          <select
            value={sect}
            onChange={(e) => setSect(e.target.value)}
            className={selectClass}
          >
            {SECTS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block font-serif-kr text-wuxia-gold/70 text-sm">
            오행 속성 <span className="text-wuxia-parchment/30">(선택)</span>
          </label>
          <select
            value={element}
            onChange={(e) => setElement(e.target.value)}
            className={selectClass}
          >
            {ELEMENTS.map((el) => (
              <option key={el.value} value={el.value}>{el.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 각오 한마디 */}
      <div className="space-y-2">
        <label className="block font-serif-kr text-wuxia-gold/70 text-sm">
          각오 한마디 <span className="text-wuxia-parchment/30">(선택)</span>
        </label>
        <input
          type="text"
          value={resolve}
          onChange={(e) => setResolve(e.target.value)}
          placeholder="반드시 해내리라..."
          className={inputClass}
          maxLength={50}
        />
      </div>

      <QiMeter value={qiValue} />

      <div className="flex justify-center pt-4">
        <WuxiaButton type="submit" disabled={!name.trim()}>
          운명을 읽다
        </WuxiaButton>
      </div>
    </form>
  );
}
