'use client';

import { ChevronRight } from 'lucide-react';
import { weeklyCapacity as capacityData } from '@/data/demoData';

type CapacityData = typeof capacityData;

export function CapacityCard({ capacity, onClick }: { capacity: CapacityData; onClick: () => void }) {
  return (
    <button className="summary-card capacity-card" type="button" onClick={onClick}>
      <span className="card-heading"><span>Weekly Capacity</span><ChevronRight size={16} aria-hidden="true" /></span>
      <span className="capacity-number">{capacity.score}%</span>
      <span className="capacity-caption">of your ideal load</span>
      <span className="capacity-chart" aria-label="Weekly capacity bar chart">
        {capacity.values.map((value, index) => <span className="capacity-bar-wrap" key={`${capacity.labels[index]}-${index}`}><span className="capacity-bar" style={{ height: `${value}%` }} /><small>{capacity.labels[index]}</small></span>)}
      </span>
    </button>
  );
}
