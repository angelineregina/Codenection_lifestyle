'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDemoState } from '@/components/DemoStateProvider';
import { BottomSheet } from '@/components/BottomSheet';
import { HomePage } from '@/components/HomePage';
import { moodTrend, weeklyCapacity } from '@/data/demoData';

type SheetKey = 'profile' | 'energy' | 'capacity' | 'mood' | null;

export default function Home() {
  const router = useRouter();
  const { expanded, setExpanded, suggestionApplied, completedIds, confirmedIds, handleToggleTask } = useDemoState();
  const [activeSheet, setActiveSheet] = useState<SheetKey>(null);
  const openSheet = useCallback((sheet: Exclude<SheetKey, null>) => setActiveSheet(sheet), []);
  const closeSheet = useCallback(() => setActiveSheet(null), []);

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
      default:
        return null;
    }
  }, [activeSheet, closeSheet]);

  return (
    <>
      <HomePage completedIds={completedIds} confirmedIds={confirmedIds} expanded={expanded} suggestionApplied={suggestionApplied} onProfileClick={() => openSheet('profile')} onEnergyClick={() => openSheet('energy')} onCapacityClick={() => openSheet('capacity')} onMoodClick={() => openSheet('mood')} onSustainabilityClick={() => router.push('/risk')} onToggleTask={handleToggleTask} onToggleExpanded={() => setExpanded((value) => !value)} onSaveSuggestion={() => router.push('/save-my-day')} />
      {sheetContent && <BottomSheet open={Boolean(activeSheet)} title={sheetContent.title} eyebrow={sheetContent.eyebrow} onClose={closeSheet}>{sheetContent.content}</BottomSheet>}
    </>
  );
}
