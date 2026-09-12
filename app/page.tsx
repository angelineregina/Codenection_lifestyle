'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDemoState } from '@/components/DemoStateProvider';
import { BottomSheet } from '@/components/BottomSheet';
import { HomePage } from '@/components/HomePage';
import { MoodStressLog } from '@/components/MoodStressLog';
import { weeklyCapacity } from '@/data/demoData';

type SheetKey = 'profile' | 'energy' | 'capacity' | 'mood' | null;

export default function Home() {
  const router = useRouter();
  const { expanded, setExpanded, suggestionApplied, completedIds, confirmedIds, handleToggleTask, scheduleItems, workloadSustainabilitySnapshot, energyToday, moodTrendToday, stressTrendToday, logMoodStress } = useDemoState();
  const [activeSheet, setActiveSheet] = useState<SheetKey>(null);
  const openSheet = useCallback((sheet: Exclude<SheetKey, null>) => setActiveSheet(sheet), []);
  const closeSheet = useCallback(() => setActiveSheet(null), []);

  const sheetContent = useMemo(() => {
    switch (activeSheet) {
      case 'profile':
        return { title: 'Your space', eyebrow: 'Profile', content: <><div className="profile-panel"><span className="large-avatar">SE</span><div><strong>See Eng</strong><small>Keeping your days sustainable</small></div></div><button className="setting-row" type="button"><span>Profile</span><span>›</span></button><button className="setting-row" type="button"><span>Preferences</span><span>›</span></button><button className="sheet-close-button" type="button" onClick={closeSheet}>Close</button></> };
      case 'energy':
        return { title: 'Energy today', eyebrow: 'Your check-in', content: <><div className="sheet-stat"><strong>{energyToday.score}</strong><span>/ 100</span><em>{energyToday.label}</em></div><p className="sheet-copy">{energyToday.caption} This value is self-reported, not automatically detected.</p><div className="info-callout"><span>Tip</span>Protect one small recovery window before your next high-focus block.</div><button className="sheet-close-button" type="button" onClick={closeSheet}>Close</button></> };
      case 'capacity':
        return { title: 'Weekly Capacity', eyebrow: 'A gentle view of your week', content: <><div className="capacity-summary"><strong>{weeklyCapacity.score}%</strong><span>of your ideal load</span></div><div className="capacity-detail-list">{weeklyCapacity.labels.map((day, index) => <div key={`${day}-${index}`}><span>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</span><span className="detail-meter"><i style={{ width: `${weeklyCapacity.values[index]}%` }} /></span><strong>{weeklyCapacity.values[index]}%</strong></div>)}</div><p className="capacity-history-note">{weeklyCapacity.historyLabel} · bars are illustrative; today&apos;s workload is assessed separately.</p><button className="sheet-close-button" type="button" onClick={closeSheet}>Close</button></> };
      case 'mood':
        return { title: 'Mood & Stress Trend', eyebrow: 'Last 7 days', content: <><div className="trend-detail-list">{moodTrendToday.map((item, index) => <div key={item.day}><span>{item.day}</span><span className="trend-detail-values"><strong>{item.value}<small>Mood</small></strong><strong>{stressTrendToday[index].value}<small>Stress</small></strong></span></div>)}</div><MoodStressLog initialMood={moodTrendToday[moodTrendToday.length - 1].value} initialStress={stressTrendToday[stressTrendToday.length - 1].value} onSave={logMoodStress} /><p className="sheet-copy">Your recent patterns are personal check-ins, not a medical assessment. Previous days are simulated prototype history.</p><button className="sheet-close-button" type="button" onClick={closeSheet}>Close</button></> };
      default:
        return null;
    }
  }, [activeSheet, closeSheet, energyToday, logMoodStress, moodTrendToday, stressTrendToday]);

  return (
    <>
      <HomePage scheduleItems={scheduleItems} sustainability={workloadSustainabilitySnapshot} energyToday={energyToday} moodTrendToday={moodTrendToday} completedIds={completedIds} confirmedIds={confirmedIds} expanded={expanded} suggestionApplied={suggestionApplied} onProfileClick={() => openSheet('profile')} onEnergyClick={() => openSheet('energy')} onCapacityClick={() => openSheet('capacity')} onMoodClick={() => openSheet('mood')} onSustainabilityClick={() => router.push('/risk')} onToggleTask={handleToggleTask} onToggleExpanded={() => setExpanded((value) => !value)} onSaveSuggestion={() => router.push('/plan')} />
      {sheetContent && <BottomSheet open={Boolean(activeSheet)} title={sheetContent.title} eyebrow={sheetContent.eyebrow} onClose={closeSheet}>{sheetContent.content}</BottomSheet>}
    </>
  );
}
