'use client';

import { useState } from 'react';
import { ArrowRight, Check, Lightbulb } from 'lucide-react';
import { focusSuggestion as suggestionData } from '@/data/demoData';

type FocusSuggestionData = typeof suggestionData;

export function FocusSmartSuggestionCard({ suggestion, onSaveMyDay }: { suggestion: FocusSuggestionData; onSaveMyDay: () => void }) {
  const [onBreak, setOnBreak] = useState(false);

  return (
    <section className={`suggestion-card suggestion-card--focus ${onBreak ? 'is-applied' : ''}`}>
      <span className="suggestion-icon" aria-hidden="true">{onBreak ? <Check size={22} /> : <Lightbulb size={22} />}</span>
      <div className="suggestion-copy">
        <p className="section-kicker">{onBreak ? 'On a break' : 'Smart Suggestion'}</p>
        <h2>{onBreak ? 'Break in progress' : suggestion.title}</h2>
        <p>{onBreak ? 'Step away for a few minutes, then come back and end your break.' : suggestion.subtitle}</p>
      </div>
      <div className="suggestion-actions">
        <button className="primary-button" type="button" onClick={() => setOnBreak((value) => !value)} aria-pressed={onBreak}>
          {onBreak ? 'On break' : 'Take a Break'}{!onBreak && <ArrowRight size={14} />}
        </button>
        <button className="text-button" type="button" onClick={onSaveMyDay}>Use Save My Day</button>
      </div>
    </section>
  );
}
