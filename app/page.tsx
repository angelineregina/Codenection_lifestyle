'use client';

import { useCallback, useMemo, useState } from 'react';
import { BottomNav, type PageKey } from '@/components/BottomNav';
import { BottomSheet } from '@/components/BottomSheet';
import { HomePage } from '@/components/HomePage';
import { PlaceholderPage } from '@/components/PlaceholderPage';
import { Toast } from '@/components/Toast';
import { moodTrend, schedule, smartSuggestion, weeklyCapacity, workloadSustainability } from '@/data/demoData';

type SheetKey = 'profile' | 'energy' | 'capacity' | 'mood' | 'sustainability' | 'suggestion' | null;

export default function Home() {
  const [activePage, setActivePage] = useState<PageKey>('home');
  const [activeSheet, setActiveSheet] = useState<SheetKey>(null);
  const [expanded, setExpanded] = useState(false);
  const [suggestionApplied, setSuggestionApplied] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [completedIds, setCompletedIds] = useState<Set<string>>(() => new Set(schedule.filter((item) => item.completed).map((item) => item.id)));
  const [confirmedIds, setConfirmedIds] = useState<Set<string>>(() => new Set());

  const openSheet = useCallback((sheet: Exclude<SheetKey, null>) => setActiveSheet(sheet), []);
  const closeSheet = useCallback(() => setActiveSheet(null), []);

  const handleToggleTask = useCallback((id: string) => {
    setCompletedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleApplySuggestion = useCallback(() => {
    setSuggestionApplied(true);
    setCompletedIds((current) => new Set(current).add('recovery-break'));
    setConfirmedIds((current) => new Set(current).add('recovery-break'));
    setActiveSheet(null);
    setToastVisible(true);
    window.setTimeout(() => setToastVisible(false), 3200);
  }, []);

  const sheetContent = useMemo(() => {
    switch (activeSheet) {
      case 'profile':
        return { title: 'Your space', eyebrow: 'Profile', content: <><div className="profile-panel"><span className="large-avatar">SE</span><div><strong>See Eng</strong><small>Keeping your days sustainable</small></div></div><button className="setting-row" type="button"><span>Profile</span><span>›</span></button><button className="setting-row" type="button"><span>Preferences</span><span>›</span></button><button className="sheet-close-button" type="button" onClick={closeSheet}>Close</button></> };
      case 'energy':
        return { title: 'Energy today', eyebrow: 'Your check-in', content: <><div className="sheet-stat"><strong>78</strong><span>/ 100</span><em>Good energy</em></div><p className="sheet-copy">Energy today is based on your self-reported energy and recent recovery information.</p><div className="info-callout"><span>Tip</span>Protect one small recovery window before your next high-focus block.</div><button className="sheet-close-button" type="button" onClick={closeSheet}>Close</button></> };
      case 'capacity':
        return { title: 'Weekly Capacity', eyebrow: 'A gentle view of your week', content: <><div className="capacity-summary"><strong>{weeklyCapacity.score}%</strong><span>of your ideal load</span></div><div className="capacity-detail-list">{weeklyCapacity.labels.map((day, index) => <div key={`${day}-${index}`}><span>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</span><span className="detail-meter"><i style={{ width: `${weeklyCapacity.values[index]}%` }} /></span><strong>{weeklyCapacity.values[index]}%</strong></div>)}</div><button className="sheet-close-button" type="button" onClick={closeSheet}>Close</button></> };
      case 'mood':
        return { title: 'Mood & Stress Trend', eyebrow: 'Last 7 days', content: <><div className="trend-detail-list">{moodTrend.map((item) => <div key={item.day}><span>{item.day}</span><strong>{item.value}<small>/ 10</small></strong></div>)}</div><p className="sheet-copy">Your recent stress trend appears relatively stable. Keep noticing what helps you feel more like yourself.</p><button className="sheet-close-button" type="button" onClick={closeSheet}>Close</button></> };
      case 'sustainability':
        return { title: 'Why is my workload sustainable?', eyebrow: 'Transparent demo explanation', content: <><p className="sheet-copy">You currently have approximately <strong>{workloadSustainability.estimatedWorkHours} hours</strong> of estimated work before Friday and around <strong>{workloadSustainability.availableHours} available hours</strong>.</p><div className="metric-list">{workloadSustainability.metrics.map((metric) => <div key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong></div>)}</div><p className="sheet-footnote">This is prototype data to make the reasoning visible — it is not a medical diagnosis.</p><button className="sheet-close-button" type="button" onClick={closeSheet}>Close</button></> };
      case 'suggestion':
        return { title: 'Suggested adjustment', eyebrow: 'One small step for today', content: <><div className="suggestion-sheet-intro"><span className="suggestion-icon"><span>✦</span></span><p>{smartSuggestion.subtitle}</p></div><ul className="suggestion-list">{smartSuggestion.details.map((detail) => <li key={detail}>{detail}</li>)}</ul><div className="sheet-actions"><button className="primary-button" type="button" onClick={handleApplySuggestion}>Apply suggestion</button><button className="secondary-button" type="button" onClick={closeSheet}>Not now</button></div></> };
      default:
        return null;
    }
  }, [activeSheet, closeSheet, handleApplySuggestion]);

  return (
    <div className="site-background">
      <div className="app-frame">
        {activePage === 'home' ? <HomePage completedIds={completedIds} confirmedIds={confirmedIds} expanded={expanded} suggestionApplied={suggestionApplied} onProfileClick={() => openSheet('profile')} onEnergyClick={() => openSheet('energy')} onCapacityClick={() => openSheet('capacity')} onMoodClick={() => openSheet('mood')} onSustainabilityClick={() => openSheet('sustainability')} onToggleTask={handleToggleTask} onToggleExpanded={() => setExpanded((value) => !value)} onSaveSuggestion={() => openSheet('suggestion')} /> : <PlaceholderPage onBack={() => setActivePage('home')} />}
        <BottomNav activePage={activePage} onNavigate={setActivePage} />
        {sheetContent && <BottomSheet open={Boolean(activeSheet)} title={sheetContent.title} eyebrow={sheetContent.eyebrow} onClose={closeSheet}>{sheetContent.content}</BottomSheet>}
        <Toast visible={toastVisible} message="Your day has been adjusted." />
      </div>
    </div>
  );
}
