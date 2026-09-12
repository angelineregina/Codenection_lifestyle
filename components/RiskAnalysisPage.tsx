'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, CalendarClock, Clock3, Sparkles, Users } from 'lucide-react';
import { useDemoState } from '@/components/DemoStateProvider';
import { riskAnalysis, type RiskFactorIcon, type RiskTier } from '@/data/demoData';

const factorIconMap: Record<RiskFactorIcon, typeof CalendarClock> = {
  deadline: CalendarClock,
  brain: Sparkles,
  sleep: Clock3,
  social: Users,
};

const tierLabelMap: Record<RiskTier, string> = {
  high: 'High',
  medium: 'Moderate',
  manageable: 'Manageable',
};

export function RiskAnalysisPage() {
  const { workloadSnapshot } = useDemoState();
  const { factors } = riskAnalysis;
  const { drivers } = workloadSnapshot;
  const capacity = { ...riskAnalysis.capacity, workloadPercent: workloadSnapshot.workloadPercent, plannedDemand: workloadSnapshot.plannedDemand, availableCapacity: workloadSnapshot.availableCapacity, recoveryPlanned: workloadSnapshot.recoveryPlanned, status: workloadSnapshot.status };
  const dimensions = workloadSnapshot.dimensions;

  return (
    <main className="app-main risk-analysis-page">
      <header className="risk-analysis-header">
        <Link className="risk-back-link" href="/" aria-label="Back to Home">
          <ArrowLeft size={17} />
          <span>Back</span>
        </Link>
        <div className="risk-title-row">
          <div>
            <p className="section-kicker">Home · Workload check</p>
            <h1>Workload Analysis</h1>
          </div>
        </div>
      </header>

      <section className="risk-analysis-content">
        <section className="risk-intro-block" aria-labelledby="risk-intro-title">
          <span className="risk-intro-label">A closer look at today</span>
          <h2 id="risk-intro-title">Your workload may be hard to sustain today.</h2>
          <p>Several factors are putting pressure on your available capacity.</p>
        </section>

        <section className="risk-capacity-card" aria-labelledby="capacity-title">
          <div className="risk-capacity-heading">
            <div>
              <p className="section-kicker">Capacity summary</p>
              <h2 id="capacity-title">{capacity.workloadPercent}% <span>of realistic capacity</span></h2>
            </div>
            <span className="pressure-pill">{capacity.status}</span>
          </div>
          <div className="capacity-meter" aria-hidden="true"><span style={{ width: `${Math.min(capacity.workloadPercent, 100)}%` }} /></div>
          <div className="risk-metric-grid">
            <div><span>Planned demand</span><strong>{capacity.plannedDemand}</strong></div>
            <div><span>Available capacity</span><strong>{capacity.availableCapacity}</strong></div>
            <div><span>Recovery planned</span><strong>{capacity.recoveryPlanned}</strong></div>
          </div>
        </section>

        <section className="risk-analysis-section" aria-labelledby="difficult-title">
          <div className="risk-section-heading"><div><p className="section-kicker">The pressure points</p><h2 id="difficult-title">Why today is difficult</h2></div></div>
          <div className="risk-factor-list">
            {factors.map((factor) => {
              const Icon = factorIconMap[factor.icon];
              return <article className="risk-factor-card" key={factor.id}><span className="risk-factor-icon" aria-hidden="true"><Icon size={16} /></span><div><h3>{factor.label}</h3><p>{factor.detail}</p></div></article>;
            })}
          </div>
        </section>

        <section className="risk-analysis-section" aria-labelledby="dimension-title">
          <div className="risk-section-heading"><div><p className="section-kicker">A balanced view</p><h2 id="dimension-title">Workload by Dimension</h2></div></div>
          <div className="dimension-row-list">
            {dimensions.map((dimension) => <div className="dimension-row" key={dimension.id}><div className="dimension-row-label"><span>{dimension.label}</span><strong>{dimension.value}%</strong></div><div className="dimension-progress" aria-hidden="true"><span className={`dimension-progress-fill dimension-progress-fill--${dimension.tier}`} style={{ width: `${dimension.value}%` }} /></div><small className={`dimension-row-status dimension-row-status--${dimension.tier}`}>{tierLabelMap[dimension.tier]}</small></div>)}
          </div>
        </section>

        <section className="risk-analysis-section driver-section" aria-labelledby="driver-title">
          <div className="risk-section-heading"><div><p className="section-kicker">Traceable inputs</p><h2 id="driver-title">What is driving today&apos;s workload</h2></div></div>
          <ul className="driver-list">{drivers.map((driver) => <li key={driver}>{driver}</li>)}</ul>
        </section>

        <section className="risk-next-step-card" aria-labelledby="next-step-title">
          <div className="next-step-copy"><p className="section-kicker">Next step</p><h2 id="next-step-title">Make today a little more manageable.</h2><p>Moving or shortening a few lower-priority tasks could make today more manageable.</p></div>
          <div className="risk-cta-actions"><Link className="primary-button" href="/plan">Save My Day <ArrowRight size={15} /></Link><Link className="secondary-button" href="/what-if">Try What-if</Link></div>
          <p className="risk-disclaimer">This is prototype planning guidance, not a medical diagnosis.</p>
        </section>
      </section>
    </main>
  );
}
