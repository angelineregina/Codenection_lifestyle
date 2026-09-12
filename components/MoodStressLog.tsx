'use client';

import { Check } from 'lucide-react';
import { useState } from 'react';

type MoodStressLogProps = {
  initialMood: number;
  initialStress: number;
  onSave: (mood: number, stress: number) => void;
};

export function MoodStressLog({ initialMood, initialStress, onSave }: MoodStressLogProps) {
  const [mood, setMood] = useState(initialMood);
  const [stress, setStress] = useState(initialStress);

  return (
    <section className="mood-log-panel" aria-labelledby="mood-log-title">
      <div className="mood-log-heading"><div><p className="section-kicker">Today</p><h3 id="mood-log-title">Log today</h3></div><span className="mood-log-scale">1 low · 10 high</span></div>
      <label className="mood-log-control"><span><strong>Mood</strong><small>How are you feeling?</small></span><output>{mood} / 10</output><input type="range" min="1" max="10" step="1" value={mood} onChange={(event) => setMood(Number(event.target.value))} aria-label="Mood from 1 to 10" /></label>
      <label className="mood-log-control"><span><strong>Stress</strong><small>How much pressure do you feel?</small></span><output>{stress} / 10</output><input type="range" min="1" max="10" step="1" value={stress} onChange={(event) => setStress(Number(event.target.value))} aria-label="Stress from 1 to 10" /></label>
      <button className="primary-button mood-log-button" type="button" onClick={() => onSave(mood, stress)}><Check size={14} />Log today</button>
      <p className="mood-log-note">This is a self-reported check-in saved on this device.</p>
    </section>
  );
}
