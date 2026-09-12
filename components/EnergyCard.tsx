'use client';

import { ChevronRight, Zap } from 'lucide-react';
import { energy as energyData } from '@/data/demoData';

type EnergyData = typeof energyData;

export function EnergyCard({ energy, onClick }: { energy: EnergyData; onClick: () => void }) {
  return (
    <button className="summary-card energy-card" type="button" onClick={onClick}>
      <span className="card-heading"><span>Energy Today</span><ChevronRight size={16} aria-hidden="true" /></span>
      <span className="energy-content">
        <span className="progress-ring" style={{ '--progress': `${energy.score}%` } as React.CSSProperties} aria-hidden="true">
          <span className="progress-ring-inner"><strong>{energy.score}</strong><small>/ 100</small></span>
        </span>
        <span className="energy-copy"><strong><Zap size={12} fill="currentColor" />{energy.label}</strong><small>{energy.caption}</small></span>
      </span>
    </button>
  );
}
