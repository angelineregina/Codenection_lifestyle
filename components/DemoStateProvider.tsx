'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { calculateWorkloadSnapshot, energy, moodTrend, schedule, stressTrend, type FocusBaseline, type NewCommitment, type TodayMoodStress, weeklyInsights, workloadSustainability } from '@/data/demoData';
import { Toast } from '@/components/Toast';

function useDemoStateValue() {
  const [expanded, setExpanded] = useState(false);
  const [suggestionApplied, setSuggestionApplied] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [addedCommitments, setAddedCommitments] = useState<NewCommitment[]>([]);
  const [baseline, setBaselineState] = useState<FocusBaseline | null>(null);
  const [todayMoodStress, setTodayMoodStress] = useState<TodayMoodStress | null>(null);
  const [completedIds, setCompletedIds] = useState<Set<string>>(() => new Set(schedule.filter((item) => item.completed).map((item) => item.id)));
  const [confirmedIds, setConfirmedIds] = useState<Set<string>>(() => new Set());
  const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const workloadSnapshot = useMemo(() => calculateWorkloadSnapshot(addedCommitments.map((commitment, index) => ({ ...commitment, id: `commitment-${index}` }))), [addedCommitments]);
  const scheduleItems = useMemo(() => [...addedCommitments.map((commitment, index) => ({ id: `commitment-${index}`, time: commitment.date, title: commitment.title, duration: `${commitment.durationLabel} - ${commitment.priority} priority`, category: 'Added', icon: 'planning' as const, completed: false })), ...schedule], [addedCommitments]);
  const workloadSustainabilitySnapshot = useMemo(() => ({ ...workloadSustainability, status: workloadSnapshot.status, explanation: workloadSnapshot.explanation, factors: workloadSnapshot.factors, metrics: [{ label: 'Time pressure', value: workloadSnapshot.status }, { label: 'Cognitive demand', value: workloadSnapshot.dimensions[0].value >= 75 ? 'High' : 'Moderate' }, { label: 'Recovery', value: 'Low' }] }), [workloadSnapshot]);
  const energyToday = useMemo(() => baseline ? { ...energy, score: baseline.energy, label: 'Self-reported energy', caption: 'From your Quick Vibe Check baseline.' } : energy, [baseline]);
  const moodTrendToday = useMemo(() => todayMoodStress ? moodTrend.map((point, index) => index === moodTrend.length - 1 ? { ...point, value: todayMoodStress.mood } : point) : moodTrend, [todayMoodStress]);
  const stressTrendToday = useMemo(() => todayMoodStress ? stressTrend.map((point, index) => index === stressTrend.length - 1 ? { ...point, value: todayMoodStress.stress } : point) : stressTrend, [todayMoodStress]);
  const weeklyInsightsToday = useMemo(() => ({ ...weeklyInsights, moodTrend: moodTrendToday, stressTrend: stressTrendToday }), [moodTrendToday, stressTrendToday]);

  useEffect(() => () => { if (toastTimeout.current) clearTimeout(toastTimeout.current); }, []);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => setToastVisible(false), 3200);
  }, []);

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
    showToast('Your day has been adjusted.');
  }, [showToast]);

  const addCommitment = useCallback((commitment: NewCommitment) => {
    setAddedCommitments((current) => [...current, commitment]);
  }, []);

  const setBaseline = useCallback((nextBaseline: FocusBaseline) => {
    setBaselineState(nextBaseline);
  }, []);

  const logMoodStress = useCallback((mood: number, stress: number) => {
    setTodayMoodStress({ mood, stress });
    showToast('Today mood and stress saved.');
  }, [showToast]);

  return { expanded, setExpanded, suggestionApplied, completedIds, confirmedIds, handleToggleTask, handleApplySuggestion, toastVisible, toastMessage, showToast, addCommitment, addedCommitments, scheduleItems, workloadSnapshot, workloadSustainabilitySnapshot, baseline, setBaseline, energyToday, moodTrendToday, stressTrendToday, weeklyInsightsToday, todayMoodStress, logMoodStress };
}

const DemoStateContext = createContext<ReturnType<typeof useDemoStateValue> | null>(null);

export function DemoStateProvider({ children }: { children: ReactNode }) {
  const state = useDemoStateValue();
  return <DemoStateContext.Provider value={state}>{children}<Toast visible={state.toastVisible} message={state.toastMessage} /></DemoStateContext.Provider>;
}

export function useDemoState() {
  const state = useContext(DemoStateContext);
  if (!state) throw new Error('useDemoState must be used within DemoStateProvider');
  return state;
}
