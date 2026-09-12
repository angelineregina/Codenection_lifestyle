'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Camera, Check, Clock3, LockKeyhole, RotateCcw, ScanFace, Sparkles, UserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDemoState } from '@/components/DemoStateProvider';
import type { FocusBaseline, VibeMood } from '@/data/demoData';

const moodOptions: VibeMood[] = ['Calm', 'Okay', 'Tired', 'Stressed', 'Busy'];

function formatTime(date: Date) {
  return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(date);
}

export function VibeCheckPage() {
  const router = useRouter();
  const { setBaseline, showToast } = useDemoState();
  const [mood, setMood] = useState<VibeMood>('Calm');
  const [energy, setEnergy] = useState(72);
  const [result, setResult] = useState<FocusBaseline | null>(null);

  const handleStartCheckIn = () => {
    setResult({ timestamp: formatTime(new Date()), mood, energy, blinkRateBaseline: 14, eyeClosureBaseline: 'Normal baseline', postureBaseline: 'Neutral baseline' });
  };

  const handleUseBaseline = () => {
    if (!result) return;
    setBaseline(result);
    showToast('Quick Vibe Check saved as your Focus Guard baseline.');
    router.push('/focus');
  };

  return (
    <main className="app-main vibe-check-page">
      <header className="vibe-check-header">
        <Link className="risk-back-link" href="/focus" aria-label="Back to Focus Guard"><ArrowLeft size={17} /><span>Back to Focus Guard</span></Link>
        <p className="section-kicker">Focus Guard · Personal reference</p>
        <h1>Quick Vibe Check</h1>
        <p>A short starting check-in before your focus session.</p>
      </header>

      <section className="vibe-check-content" aria-label="Quick Vibe Check">
        <section className="vibe-privacy-card" aria-labelledby="privacy-title"><span className="vibe-privacy-icon"><LockKeyhole size={16} /></span><div><h2 id="privacy-title">Private by design</h2><p>Your check-in is processed on your device in this prototype. Photos are not stored.</p><small>Visual analysis is simulated locally and no image is uploaded.</small></div></section>

        <section className={`vibe-camera-card ${result ? 'has-result' : ''}`} aria-labelledby="camera-title">
          <div className="vibe-camera-heading"><div><p className="section-kicker">Starting point</p><h2 id="camera-title">A quick personal reference</h2></div><span className="vibe-simulated-pill"><Sparkles size={11} /> Demo</span></div>
          <div className="vibe-camera-preview"><span className="vibe-camera-glow" aria-hidden="true" /><span className="vibe-camera-corner vibe-camera-corner--tl" aria-hidden="true" /><span className="vibe-camera-corner vibe-camera-corner--tr" aria-hidden="true" /><span className="vibe-camera-corner vibe-camera-corner--bl" aria-hidden="true" /><span className="vibe-camera-corner vibe-camera-corner--br" aria-hidden="true" /><span className="vibe-camera-avatar" aria-hidden="true">{result ? <Check size={35} /> : <UserRound size={35} />}</span><span className="vibe-camera-status"><span className="vibe-camera-dot" />{result ? 'Reference captured' : 'Ready for check-in'}</span><span className="vibe-camera-caption"><Camera size={12} /> No image is uploaded</span></div>
          {!result ? <button className="primary-button vibe-start-button" type="button" onClick={handleStartCheckIn}>Start Check-in <ScanFace size={15} /></button> : <button className="secondary-button vibe-start-button" type="button" onClick={() => setResult(null)}><RotateCcw size={14} />Retake / Reset</button>}
        </section>

        <section className="vibe-input-card" aria-labelledby="feeling-title">
          <div className="vibe-section-heading"><div><p className="section-kicker">Your input</p><h2 id="feeling-title">How are you feeling right now?</h2></div><Clock3 size={17} aria-hidden="true" /></div>
          <div className="vibe-mood-grid">{moodOptions.map((option) => <button className={`vibe-mood-option ${mood === option ? 'is-selected' : ''}`} key={option} type="button" onClick={() => setMood(option)} aria-pressed={mood === option}>{mood === option && <Check size={13} />}{option}</button>)}</div>
          <label className="vibe-energy-control"><span><strong>Energy</strong><small>Use a number that feels right for you.</small></span><output>{energy} / 100</output><input type="range" min="0" max="100" value={energy} onChange={(event) => setEnergy(Number(event.target.value))} aria-label="Energy" /></label>
        </section>

        {result && <section className="vibe-result-card" aria-labelledby="reference-title"><div className="vibe-result-heading"><div><p className="section-kicker">Your result</p><h2 id="reference-title">Starting Reference</h2></div><span className="vibe-result-time">{result.timestamp}</span></div><div className="vibe-result-list"><div><span>Mood</span><strong>{result.mood}</strong></div><div><span>Energy</span><strong>{result.energy} / 100</strong></div><div><span>Blink baseline</span><strong>{result.blinkRateBaseline} / min</strong></div><div><span>Eye closure</span><strong>{result.eyeClosureBaseline}</strong></div><div><span>Posture</span><strong>{result.postureBaseline}</strong></div></div><p className="vibe-result-note">This is your starting reference for this focus session.</p><button className="primary-button vibe-use-button" type="button" onClick={handleUseBaseline}>Use as Focus Guard Baseline <ArrowRight size={14} /></button></section>}

        {!result && <p className="vibe-disclaimer">Your answers create a personal reference for this session. They are not a health or performance judgment.</p>}
      </section>
    </main>
  );
}
