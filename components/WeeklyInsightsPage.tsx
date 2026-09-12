'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, BarChart3, Clock3, Lightbulb } from 'lucide-react';
import { useDemoState } from '@/components/DemoStateProvider';
import type { MoodStressPoint } from '@/data/demoData';

type ChartPoint = { label: string; value: number };

function TrendChart({ points, minValue, maxValue, ariaLabel, highlightWindow }: { points: ChartPoint[]; minValue: number; maxValue: number; ariaLabel: string; highlightWindow?: boolean }) {
  const coordinates = points.map((point, index) => ({
    ...point,
    x: 15 + (index / (points.length - 1)) * 290,
    y: 104 - ((point.value - minValue) / (maxValue - minValue)) * 78,
  }));
  const line = coordinates.map((point) => `${point.x},${point.y}`).join(' ');

  return (
    <div className="insight-trend-chart">
      <svg viewBox="0 0 320 132" aria-label={ariaLabel}>
        {highlightWindow && <rect className="insight-chart-highlight" x="98" y="15" width="105" height="96" rx="12" aria-hidden="true" />}
        {[26, 65, 104].map((y) => <line className="insight-chart-gridline" key={y} x1="15" x2="305" y1={y} y2={y} />)}
        <polyline className="insight-chart-line" points={line} />
        {coordinates.map((point) => <circle className="insight-chart-point" key={point.label} cx={point.x} cy={point.y} r="3.3" />)}
        {coordinates.map((point) => <text className="insight-chart-label" key={`${point.label}-label`} x={point.x} y="124" textAnchor="middle">{point.label}</text>)}
      </svg>
    </div>
  );
}

function MoodStressChart({ moodTrend, stressTrend }: { moodTrend: MoodStressPoint[]; stressTrend: MoodStressPoint[] }) {
  const moodPoints = moodTrend.map((point) => ({ label: point.day, value: point.value }));
  const stressPoints = stressTrend.map((point) => ({ label: point.day, value: point.value }));
  const getY = (value: number) => 104 - (value / 10) * 78;
  const getX = (index: number) => 15 + (index / (moodPoints.length - 1)) * 290;
  const moodLine = moodPoints.map((point, index) => `${getX(index)},${getY(point.value)}`).join(' ');
  const stressLine = stressPoints.map((point, index) => `${getX(index)},${getY(point.value)}`).join(' ');

  return (
    <div className="insight-trend-chart mood-stress-chart">
      <svg viewBox="0 0 320 132" aria-label="Mood and stress trends across the week">
        {[26, 65, 104].map((y) => <line className="insight-chart-gridline" key={y} x1="15" x2="305" y1={y} y2={y} />)}
        <polyline className="insight-chart-line insight-chart-line--mood" points={moodLine} />
        <polyline className="insight-chart-line insight-chart-line--stress" points={stressLine} />
        {moodPoints.map((point, index) => <circle className="insight-chart-point insight-chart-point--mood" key={`mood-${point.label}`} cx={getX(index)} cy={getY(point.value)} r="3" />)}
        {stressPoints.map((point, index) => <circle className="insight-chart-point insight-chart-point--stress" key={`stress-${point.label}`} cx={getX(index)} cy={getY(point.value)} r="3" />)}
        {moodPoints.map((point, index) => <text className="insight-chart-label" key={`${point.label}-mood-label`} x={getX(index)} y="124" textAnchor="middle">{point.label}</text>)}
      </svg>
    </div>
  );
}

export function WeeklyInsightsPage() {
  const { weeklyInsightsToday } = useDemoState();

  return (
    <main className="app-main insights-page">
      <header className="insights-header">
        <Link className="insights-back-link" href="/" aria-label="Back to Home"><ArrowLeft size={17} /><span>Back</span></Link>
        <div className="insights-title-row">
          <div><p className="section-kicker">Insights - Weekly view</p><h1>Weekly Insights</h1><p>See how your workload, recovery, and mood have changed over time.</p></div>
          <span className="insights-period-pill">This Week</span>
        </div>
        <span className="insights-period-label">{weeklyInsightsToday.period}</span>
      </header>

      <section className="insights-content">
        <section className="insights-card" aria-labelledby="weekly-workload-title">
          <div className="insights-section-heading"><div><p className="section-kicker">Section A</p><h2 id="weekly-workload-title">Weekly workload trend</h2></div><BarChart3 size={17} /></div>
          <TrendChart points={weeklyInsightsToday.workloadTrend} minValue={60} maxValue={115} ariaLabel="Weekly workload percentage trend" highlightWindow />
          <div className="insights-chart-legend"><span><i className="legend-dot legend-dot--blue" />Workload</span><span><i className="legend-dot legend-dot--orange" />High-load period</span></div>
          <p className="insights-takeaway"><Lightbulb size={14} />{weeklyInsightsToday.workloadTakeaway}</p>
        </section>

        <section className="insights-card" aria-labelledby="mood-stress-title">
          <div className="insights-section-heading"><div><p className="section-kicker">Section B</p><h2 id="mood-stress-title">Mood &amp; stress</h2></div><span className="insights-chart-legend-inline"><span><i className="legend-dot legend-dot--blue" />Mood</span><span><i className="legend-dot legend-dot--violet" />Stress</span></span></div>
          <MoodStressChart moodTrend={weeklyInsightsToday.moodTrend} stressTrend={weeklyInsightsToday.stressTrend} />
          <div className="insights-summary-grid"><div><span>Mood trend</span><strong>Relatively stable</strong></div><div><span>Stress</span><strong>Increased mid-week</strong></div></div>
        </section>

        <section className="insights-card" aria-labelledby="recovery-title">
          <div className="insights-section-heading"><div><p className="section-kicker">Section C</p><h2 id="recovery-title">Recovery trend</h2></div><Clock3 size={17} /></div>
          <div className="recovery-chart" aria-label="Daily recovery minutes across the week">
            {weeklyInsightsToday.recoveryTrend.map((point) => <div className="recovery-bar-wrap" key={point.label}><strong>{point.minutes}</strong><span className="recovery-bar" style={{ height: `${Math.max(12, (point.minutes / 90) * 68)}px` }} /><small>{point.label}</small></div>)}
          </div>
          <p className="insights-takeaway"><Lightbulb size={14} />{weeklyInsightsToday.recoveryTakeaway}</p>
        </section>

        <section className="insights-card" aria-labelledby="dimensions-title">
          <div className="insights-section-heading"><div><p className="section-kicker">Section D</p><h2 id="dimensions-title">Workload dimensions</h2></div></div>
          <div className="weekly-dimension-list">
            {weeklyInsightsToday.dimensions.map((dimension) => <div className="weekly-dimension-row" key={dimension.id}><div><span>{dimension.label}</span><strong>{dimension.value}%</strong></div><span className="weekly-dimension-track"><i style={{ width: `${dimension.value}%` }} /></span></div>)}
          </div>
        </section>

        <section className="weekly-takeaway-card" aria-labelledby="weekly-takeaway-title">
          <p className="section-kicker">Section E</p><h2 id="weekly-takeaway-title">Weekly Takeaway</h2><p>{weeklyInsightsToday.weeklyTakeaway}</p>
          <Link className="insights-analysis-link" href="/risk">View Today&apos;s Analysis <ArrowRight size={14} /></Link>
        </section>

        <p className="demo-note">Demo data · Weekly trends shown here are illustrative for this prototype.</p>
      </section>
    </main>
  );
}
