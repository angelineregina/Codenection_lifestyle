'use client';

import { AlertTriangle, Info, Lightbulb } from 'lucide-react';
import { WorkloadDimensionChart } from '@/components/risk/WorkloadDimensionChart';
import { riskAnalysis } from '@/data/demoData';

const CHART_WIDTH = 240;
const CHART_HEIGHT = 84;
const TREND_MIN = 40;
const TREND_MAX = 100;

export function RiskTrendsTab() {
  const { weeklyTrend, dimensions, keyInsight, score, status } = riskAnalysis;

  const points = weeklyTrend.map((item, index) => ({
    x: (index / (weeklyTrend.length - 1)) * CHART_WIDTH,
    y: CHART_HEIGHT - ((item.value - TREND_MIN) / (TREND_MAX - TREND_MIN)) * CHART_HEIGHT,
  }));
  const linePoints = points.map((point) => `${point.x},${point.y}`).join(' ');
  const last = points[points.length - 1];

  return (
    <>
      <section className="surface-card trend-card">
        <div className="section-heading">
          <h2 className="trend-heading"><Info size={13} />Risk Trend</h2>
          <span className="trend-range-label">Last 4 weeks</span>
        </div>
        <div className="trend-chart-row">
          <div className="trend-axis-legend"><span>High</span><span>Moderate</span><span>Low</span></div>
          <div className="trend-chart-wrap">
            <svg className="trend-chart" viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} aria-label="Weekly workload risk trend, rising toward high risk">
              <path d={`M0 ${CHART_HEIGHT}H${CHART_WIDTH}`} className="chart-baseline" />
              <polyline points={linePoints} className="chart-line trend-line" />
              {points.map((point, index) => <circle key={weeklyTrend[index].id} cx={point.x} cy={point.y} r={index === points.length - 1 ? 4.4 : 3.2} className={index === points.length - 1 ? 'trend-dot-current' : 'chart-dot'} />)}
            </svg>
            <span className="trend-current-badge" style={{ left: `${(last.x / CHART_WIDTH) * 100}%`, top: `${(last.y / CHART_HEIGHT) * 100}%` }}>
              <AlertTriangle size={11} />{score}% · {status}
            </span>
          </div>
        </div>
        <div className="trend-labels">{weeklyTrend.map((item) => <small key={item.id}>{item.label}</small>)}</div>
      </section>

      <WorkloadDimensionChart dimensions={dimensions} />

      <section className="surface-card key-insight-card">
        <span className="key-insight-icon" aria-hidden="true"><Lightbulb size={16} /></span>
        <p>{keyInsight}</p>
      </section>
    </>
  );
}
