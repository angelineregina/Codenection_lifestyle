'use client';

import { ChevronRight, TrendingDown } from 'lucide-react';
import { moodTrend as trendData } from '@/data/demoData';

type TrendData = typeof trendData;

function makePoints(values: TrendData) {
  const min = 4;
  const width = 210;
  const height = 70;
  return values.map((item, index) => { const x = (index / (values.length - 1)) * width; const y = height - ((item.value - min) / 5) * 46 - 8; return `${x},${y}`; }).join(' ');
}

export function MoodStressCard({ trend, onClick }: { trend: TrendData; onClick: () => void }) {
  const points = makePoints(trend);
  return (
    <button className="insight-card mood-card" type="button" onClick={onClick}>
      <span className="card-heading"><span>Mood &amp; Stress</span><ChevronRight size={16} aria-hidden="true" /></span>
      <span className="mood-status"><TrendingDown size={13} />Calmer</span>
      <svg className="mood-chart" viewBox="0 0 210 74" aria-label="Mood trend improving through the week"><path d="M0 63H210" className="chart-baseline" /><polyline points={points} className="chart-line" />{points.split(' ').map((point) => { const [cx, cy] = point.split(','); return <circle key={point} cx={cx} cy={cy} r="3.6" className="chart-dot" />; })}</svg>
      <span className="chart-labels">{trend.map((item) => <small key={item.day}>{item.day[0]}</small>)}</span>
    </button>
  );
}
