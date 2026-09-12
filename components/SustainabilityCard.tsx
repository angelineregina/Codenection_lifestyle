'use client';

import { Check, ChevronRight, ShieldCheck } from 'lucide-react';
import { workloadSustainability as sustainabilityData } from '@/data/demoData';

type SustainabilityData = typeof sustainabilityData;

export function SustainabilityCard({ sustainability, onClick }: { sustainability: SustainabilityData; onClick: () => void }) {
  return (
    <button className="insight-card sustainability-card" type="button" onClick={onClick}>
      <span className="card-heading"><span>Workload Sustainability</span><ChevronRight size={16} aria-hidden="true" /></span>
      <span className="sustainability-status"><span className="shield-icon"><ShieldCheck size={18} /></span><span><strong>{sustainability.status}</strong><small>{sustainability.explanation}</small></span></span>
      <span className="factor-list">{sustainability.factors.map((factor) => <span key={factor}><Check size={11} strokeWidth={3} />{factor}</span>)}</span>
    </button>
  );
}
