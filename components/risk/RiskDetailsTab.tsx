'use client';

import Link from 'next/link';
import { ArrowRight, CalendarClock, Moon, Sparkles, Users } from 'lucide-react';
import { riskAnalysis, type RiskFactorIcon, type SleepDay } from '@/data/demoData';

const factorIconMap: Record<RiskFactorIcon, typeof CalendarClock> = { deadline: CalendarClock, brain: Sparkles, sleep: Moon, social: Users };

function SleepMiniChart({ sleepByDay, recommendedHours }: { sleepByDay: SleepDay[]; recommendedHours: number }) {
  const maxHours = Math.max(recommendedHours, ...sleepByDay.map((entry) => entry.hours));
  const recommendedPct = (recommendedHours / maxHours) * 100;
  return (
    <div className="sleep-mini-chart" aria-label="Sleep hours this week compared with the recommended amount">
      <div className="sleep-mini-bars">
        <span className="sleep-mini-line" style={{ bottom: `${recommendedPct}%` }} aria-hidden="true" />
        {sleepByDay.map((entry) => (
          <div className="sleep-mini-bar-wrap" key={entry.day}>
            <span className="sleep-mini-bar" style={{ height: `${(entry.hours / maxHours) * 100}%` }} aria-hidden="true" />
            <small>{entry.day[0]}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RiskDetailsTab() {
  const { factors, deadlines, mentalWorkloadTags, sleepByDay, recommendedSleepHours, commitmentTags } = riskAnalysis;

  return (
    <>
      <section className="surface-card risk-details-intro">
        <p className="section-kicker">Details</p>
        <h2>Why Your Risk is High</h2>
        <p className="risk-details-caption">These factors together are increasing your overload risk.</p>
      </section>

      <div className="factor-expanded-list">
        {factors.map((factor) => {
          const Icon = factorIconMap[factor.icon];
          return (
            <section className="surface-card factor-expanded-card" key={factor.id}>
              <div className="factor-expanded-heading">
                <span className="factor-detail-icon" aria-hidden="true"><Icon size={15} /></span>
                <div><strong>{factor.label}</strong><p>{factor.detail}</p></div>
              </div>
              {factor.id === 'deadline-compression' && <div className="chip-row">{deadlines.map((deadline) => <span className="date-chip" key={deadline.id}>{deadline.date} · {deadline.label}</span>)}</div>}
              {factor.id === 'mental-workload' && <div className="chip-row">{mentalWorkloadTags.map((tag) => <span className="tag-chip" key={tag}>{tag}</span>)}</div>}
              {factor.id === 'insufficient-recovery' && <SleepMiniChart sleepByDay={sleepByDay} recommendedHours={recommendedSleepHours} />}
              {factor.id === 'increased-commitments' && <div className="chip-row">{commitmentTags.map((tag) => <span className="tag-chip" key={tag}>{tag}</span>)}</div>}
            </section>
          );
        })}
      </div>

      <section className="surface-card risk-closing-card">
        <p>Small changes can make a big difference. Let&apos;s create a balance plan.</p>
        <Link className="primary-button" href="/plan">Save My Day<ArrowRight size={14} /></Link>
      </section>
    </>
  );
}
