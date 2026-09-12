'use client';

import { FatigueBanner } from '@/components/FatigueBanner';
import { FocusHeader } from '@/components/FocusHeader';
import { FocusSmartSuggestionCard } from '@/components/FocusSmartSuggestionCard';
import { SessionCheckInCard } from '@/components/SessionCheckInCard';
import { SessionPreviewCard } from '@/components/SessionPreviewCard';
import { useDemoState } from '@/components/DemoStateProvider';
import { focusSession, focusSuggestion } from '@/data/demoData';

type FocusPageProps = {
  onSettingsClick: () => void;
  onCompareClick: () => void;
  onSaveMyDay: () => void;
};

export function FocusPage({ onSettingsClick, onCompareClick, onSaveMyDay }: FocusPageProps) {
  const { baseline } = useDemoState();
  const baselineLabel = baseline ? `Baseline: Quick Vibe Check · ${baseline.timestamp}` : focusSession.baselineLabel;

  return (
    <main className="app-main">
      <FocusHeader onSettingsClick={onSettingsClick} />
      <section className="focus-content" aria-label="Focus Guard session">
        <SessionPreviewCard durationMinutes={focusSession.durationMinutes} compareLabel={focusSession.compareLabel} baselineLabel={baselineLabel} onCompareClick={onCompareClick} />
        <SessionCheckInCard metrics={focusSession.metrics} />
        <FatigueBanner note={focusSession.sessionNote} disclaimer={focusSession.disclaimer} />
        <FocusSmartSuggestionCard suggestion={focusSuggestion} onSaveMyDay={onSaveMyDay} />
        <p className="demo-note">Demo data - Focus Guard shows supporting session cues only.</p>
      </section>
    </main>
  );
}
