'use client';

import type { RiskDimension, RiskTier } from '@/data/demoData';

const tierClassMap: Record<RiskTier, string> = { high: 'dimension-bar--high', medium: 'dimension-bar--medium', manageable: 'dimension-bar--manageable' };

type WorkloadDimensionChartProps = {
  dimensions: RiskDimension[];
  kicker?: string;
  title?: string;
};

export function WorkloadDimensionChart({ dimensions, kicker = 'This week', title = 'Workload by Dimension' }: WorkloadDimensionChartProps) {
  return (
    <section className="surface-card dimension-section" aria-label={`${kicker} ${title}`}>
      <div className="section-heading"><div><p className="section-kicker">{kicker}</p><h2>{title}</h2></div></div>
      <div className="dimension-bars" aria-hidden="true">
        {dimensions.map((dimension) => (
          <div className="dimension-bar-wrap" key={dimension.id}>
            <strong>{dimension.value}%</strong>
            <span className={`dimension-bar ${tierClassMap[dimension.tier]}`} style={{ height: `${dimension.value}%` }} />
            <small>{dimension.label}</small>
          </div>
        ))}
      </div>
      <div className="dimension-legend">
        <span><i className="is-high" aria-hidden="true" />High</span>
        <span><i className="is-medium" aria-hidden="true" />Medium</span>
        <span><i className="is-manageable" aria-hidden="true" />Manageable</span>
      </div>
    </section>
  );
}
