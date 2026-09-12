'use client';

import { ArrowUpRight, Check, Sun } from 'lucide-react';
import { smartSuggestion as suggestionData } from '@/data/demoData';

type SuggestionData = typeof suggestionData;

export function SmartSuggestionCard({ suggestion, applied, onSave }: { suggestion: SuggestionData; applied: boolean; onSave: () => void }) {
  return (
    <section className={`suggestion-card ${applied ? 'is-applied' : ''}`}>
      <span className="suggestion-icon" aria-hidden="true">{applied ? <Check size={22} /> : <Sun size={24} />}</span>
      <div className="suggestion-copy"><p className="section-kicker">{applied ? 'Day adjusted' : 'Smart Suggestion'}</p><h2>{applied ? 'Recovery break added to your day' : suggestion.title}</h2><p>{applied ? 'Your 1:00 PM break is confirmed and ready when you are.' : suggestion.subtitle}</p></div>
      <button className="primary-button" type="button" onClick={onSave} disabled={applied}>{applied ? 'Saved' : 'Save My Day'}{!applied && <ArrowUpRight size={15} />}</button>
    </section>
  );
}
