'use client';

import { Clock, Coffee, Eye, Info, Smile, User } from 'lucide-react';
import type { FocusMetric, FocusMetricIcon } from '@/data/demoData';

const iconMap: Record<FocusMetricIcon, typeof Clock> = { clock: Clock, coffee: Coffee, eye: Eye, smile: Smile, user: User, info: Info };

export function SessionCheckInCard({ metrics }: { metrics: FocusMetric[] }) {
  return (
    <section className="surface-card checkin-card" aria-labelledby="checkin-title">
      <div className="checkin-heading"><h2 id="checkin-title">Session Check-in</h2><span className="live-badge">Live session</span></div>
      <div className="metric-grid">
        {metrics.map((metric) => {
          const Icon = iconMap[metric.icon];
          return (
            <div className={`metric-tile ${metric.span === 'full' ? 'metric-tile--full' : ''}`} key={metric.id}>
              <span className="metric-tile-icon" aria-hidden="true"><Icon size={13} /></span>
              <span className="metric-tile-label">{metric.label}</span>
              <span className="metric-tile-value">{metric.value}</span>
              <span className="metric-tile-caption">{metric.caption}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
