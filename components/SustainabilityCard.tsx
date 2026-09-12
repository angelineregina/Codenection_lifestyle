'use client';

import { Check, ChevronRight, TriangleAlert } from 'lucide-react';
import { workloadSustainability as sustainabilityData } from '@/data/demoData';

type SustainabilityData = typeof sustainabilityData;

export function SustainabilityCard({ sustainability, onClick }: { sustainability: SustainabilityData; onClick: () => void }) {
  const isPressured = sustainability.status === 'High workload';

  return (
    <button className={`insight-card sustainability-card ${isPressured ? 'is-pressured' : ''}`} type="button" onClick={onClick}>
      <span className="card-heading"><span>Workload Sustainability</span><ChevronRight size={16} aria-hidden="true" /></span>
      <span className="sustainability-status"><span className="shield-icon"><TriangleAlert size={18} /></span><span><strong>{sustainability.status}</strong><small>{sustainability.explanation}</small></span></span>
      <span className="factor-list">{sustainability.factors.map((factor) => <span key={factor}><Check size={11} strokeWidth={3} />{factor}</span>)}</span>
      <span className="analysis-link">View analysis <ChevronRight size={12} /></span>
    </button>
  );
}
