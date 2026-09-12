'use client';

import { AlertTriangle, CalendarClock, Info, Moon, Sparkles, Users } from 'lucide-react';
import { WorkloadDimensionChart } from '@/components/risk/WorkloadDimensionChart';
import { riskAnalysis, type RiskFactorIcon } from '@/data/demoData';

const factorIconMap: Record<RiskFactorIcon, typeof CalendarClock> = { deadline: CalendarClock, brain: Sparkles, sleep: Moon, social: Users };

export function RiskOverviewTab() {
  const { score, status, changeLabel, caption, dimensions, factors } = riskAnalysis;

  return (
    <>
      <section className="surface-card risk-summary-card">
        <div className="risk-ring-row">
          <span className="risk-ring" style={{ '--progress': `${score}%` } as React.CSSProperties} aria-hidden="true">
            <span className="risk-ring-inner"><strong>{score}%</strong><span><Info size={11} />{status}</span></span>
          </span>
          <span className="risk-badge"><AlertTriangle size={13} />{changeLabel}</span>
        </div>
        <p className="risk-caption">{caption}</p>
      </section>

      <WorkloadDimensionChart dimensions={dimensions} />

      <section className="surface-card factor-section" aria-labelledby="factor-title">
        <div className="section-heading"><div><p className="section-kicker">Why it&apos;s elevated</p><h2 id="factor-title">Key Contributing Factors</h2></div></div>
        <div className="factor-detail-list">
          {factors.map((factor) => {
            const Icon = factorIconMap[factor.icon];
            return (
              <div className="factor-detail-row" key={factor.id}>
                <span className="factor-detail-icon" aria-hidden="true"><Icon size={15} /></span>
                <div className="factor-detail-copy"><strong>{factor.label}</strong><p>{factor.detail}</p></div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
