'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { schedule } from '@/data/demoData';
import { Toast } from '@/components/Toast';

function useDemoStateValue() {
  const [expanded, setExpanded] = useState(false);
  const [suggestionApplied, setSuggestionApplied] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [completedIds, setCompletedIds] = useState<Set<string>>(() => new Set(schedule.filter((item) => item.completed).map((item) => item.id)));
  const [confirmedIds, setConfirmedIds] = useState<Set<string>>(() => new Set());
  const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  return { expanded, setExpanded, suggestionApplied, completedIds, confirmedIds, handleToggleTask, handleApplySuggestion, toastVisible, toastMessage, showToast };
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