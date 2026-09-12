'use client';

import { AppHeader } from '@/components/AppHeader';
import { CapacityCard } from '@/components/CapacityCard';
import { EnergyCard } from '@/components/EnergyCard';
import { MoodStressCard } from '@/components/MoodStressCard';
import { ScheduleCard } from '@/components/ScheduleCard';
import { SmartSuggestionCard } from '@/components/SmartSuggestionCard';
import { SustainabilityCard } from '@/components/SustainabilityCard';
import { energy, moodTrend, schedule, smartSuggestion, user, weeklyCapacity, workloadSustainability } from '@/data/demoData';

type HomePageProps = { completedIds: Set<string>; confirmedIds: Set<string>; expanded: boolean; suggestionApplied: boolean; onProfileClick: () => void; onEnergyClick: () => void; onCapacityClick: () => void; onMoodClick: () => void; onSustainabilityClick: () => void; onToggleTask: (id: string) => void; onToggleExpanded: () => void; onSaveSuggestion: () => void };

export function HomePage({ completedIds, confirmedIds, expanded, suggestionApplied, onProfileClick, onEnergyClick, onCapacityClick, onMoodClick, onSustainabilityClick, onToggleTask, onToggleExpanded, onSaveSuggestion }: HomePageProps) {
  return <main className="app-main"><AppHeader user={user} onProfileClick={onProfileClick} /><section className="dashboard-content" aria-label="Home dashboard"><div className="summary-grid"><EnergyCard energy={energy} onClick={onEnergyClick} /><CapacityCard capacity={weeklyCapacity} onClick={onCapacityClick} /></div><ScheduleCard items={schedule} completedIds={completedIds} confirmedIds={confirmedIds} expanded={expanded} onToggle={onToggleTask} onToggleExpanded={onToggleExpanded} /><div className="insight-grid"><MoodStressCard trend={moodTrend} onClick={onMoodClick} /><SustainabilityCard sustainability={workloadSustainability} onClick={onSustainabilityClick} /></div><SmartSuggestionCard suggestion={smartSuggestion} applied={suggestionApplied} onSave={onSaveSuggestion} /><p className="demo-note">Demo data · Your information stays on this device for now.</p></section></main>;
}
