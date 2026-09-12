'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, MoveRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, type SubmitEvent } from 'react';
import { useDemoState } from '@/components/DemoStateProvider';
import type { CommitmentDate, CommitmentPriority, NewCommitment } from '@/data/demoData';

const durationOptions = [
  { minutes: 30, label: '30 min' },
  { minutes: 60, label: '1 hr' },
  { minutes: 90, label: '1.5 hr' },
  { minutes: 120, label: '2 hr' },
];

const dateOptions: CommitmentDate[] = ['Today', 'Tomorrow', 'This week'];
const priorityOptions: CommitmentPriority[] = ['High', 'Medium', 'Low'];

const demandFields = [
  { key: 'mentalDemand', label: 'Mental demand', hint: 'How much concentration will it take?' },
  { key: 'physicalDemand', label: 'Physical demand', hint: 'How physically tiring might it be?' },
  { key: 'socialDemand', label: 'Social demand', hint: 'How much people energy will it use?' },
  { key: 'errandsDemand', label: 'Errand demand', hint: 'How much coordination or travel is involved?' },
] as const;

type DemandKey = (typeof demandFields)[number]['key'];

export function AssessmentPage() {
  const router = useRouter();
  const { addCommitment, showToast } = useDemoState();
  const [taskName, setTaskName] = useState('');
  const [date, setDate] = useState<CommitmentDate>('Today');
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [priority, setPriority] = useState<CommitmentPriority>('Medium');
  const [demands, setDemands] = useState<Record<DemandKey, number>>({ mentalDemand: 3, physicalDemand: 2, socialDemand: 2, errandsDemand: 2 });
  const [canMove, setCanMove] = useState(true);

  const selectedDuration = durationOptions.find((option) => option.minutes === durationMinutes) ?? durationOptions[1];

  const handleDemandChange = (key: DemandKey, value: number) => {
    setDemands((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = taskName.trim();
    if (!trimmedName) return;

    const commitment: NewCommitment = {
      title: trimmedName,
      date,
      durationMinutes: selectedDuration.minutes,
      durationLabel: selectedDuration.label,
      priority,
      ...demands,
      canMove,
    };
    addCommitment(commitment);
    showToast(`Commitment added. ${selectedDuration.label} of planned demand is now included.`);
    router.push('/');
  };

  return (
    <main className="app-main assessment-page">
      <header className="assessment-header">
        <Link className="risk-back-link" href="/" aria-label="Back to Home"><ArrowLeft size={17} /><span>Back</span></Link>
        <p className="section-kicker">Home · Workload check</p>
        <h1>Add a commitment</h1>
        <p>Give today&apos;s workload a little more context. This stays on your device and helps keep your plan realistic.</p>
      </header>

      <form className="assessment-form" onSubmit={handleSubmit}>
        <section className="assessment-card" aria-labelledby="commitment-details-title">
          <div className="assessment-card-heading"><div><p className="section-kicker">1 · The commitment</p><h2 id="commitment-details-title">What do you need to make room for?</h2></div><MoveRight size={18} aria-hidden="true" /></div>
          <label className="assessment-field"><span>Task or commitment</span><input type="text" value={taskName} onChange={(event) => setTaskName(event.target.value)} placeholder="e.g. Prepare presentation" required /></label>

          <fieldset className="assessment-fieldset"><legend>When is it due?</legend><div className="assessment-option-grid assessment-option-grid--three">{dateOptions.map((option) => <button className={`assessment-option ${date === option ? 'is-selected' : ''}`} key={option} type="button" onClick={() => setDate(option)} aria-pressed={date === option}>{date === option && <Check size={13} />}{option}</button>)}</div></fieldset>

          <fieldset className="assessment-fieldset"><legend>How long will it take?</legend><div className="assessment-option-grid">{durationOptions.map((option) => <button className={`assessment-option ${durationMinutes === option.minutes ? 'is-selected' : ''}`} key={option.minutes} type="button" onClick={() => setDurationMinutes(option.minutes)} aria-pressed={durationMinutes === option.minutes}>{durationMinutes === option.minutes && <Check size={13} />}{option.label}</button>)}</div></fieldset>

          <fieldset className="assessment-fieldset"><legend>How important is it?</legend><div className="assessment-option-grid assessment-option-grid--three">{priorityOptions.map((option) => <button className={`assessment-option ${priority === option ? 'is-selected' : ''}`} key={option} type="button" onClick={() => setPriority(option)} aria-pressed={priority === option}>{priority === option && <Check size={13} />}{option}</button>)}</div></fieldset>
        </section>

        <section className="assessment-card" aria-labelledby="demand-title">
          <div className="assessment-card-heading"><div><p className="section-kicker">2 · The load</p><h2 id="demand-title">How might it use your capacity?</h2></div><span className="assessment-info"><span aria-hidden="true">i</span> You can adjust this later</span></div>
          <div className="assessment-demand-list">{demandFields.map(({ key, label, hint }) => <label className="assessment-range-row" key={key}><span><strong>{label}</strong><small>{hint}</small></span><output>{demands[key]} / 5</output><input type="range" min="1" max="5" step="1" value={demands[key]} onChange={(event) => handleDemandChange(key, Number(event.target.value))} aria-label={label} /></label>)}</div>

          <fieldset className="assessment-fieldset assessment-move-fieldset"><legend>Could it move if today gets too full?</legend><div className="assessment-option-grid assessment-option-grid--two"><button className={`assessment-option ${canMove ? 'is-selected' : ''}`} type="button" onClick={() => setCanMove(true)} aria-pressed={canMove}>{canMove && <Check size={13} />}Yes, it can move</button><button className={`assessment-option ${!canMove ? 'is-selected' : ''}`} type="button" onClick={() => setCanMove(false)} aria-pressed={!canMove}>{!canMove && <Check size={13} />}No, it&apos;s fixed</button></div></fieldset>
        </section>

        <section className="assessment-preview" aria-label="Assessment preview"><span className="assessment-preview-icon"><Check size={16} /></span><div><strong>What this changes</strong><p>Your workload picture will include <b>{selectedDuration.label}</b> for <b>{date.toLowerCase()}</b>, with {priority.toLowerCase()} priority.</p></div></section>

        <div className="assessment-actions"><button className="primary-button" type="submit">Add to My Day <ArrowRight size={15} /></button><Link className="secondary-button" href="/">Cancel</Link></div>
      </form>
    </main>
  );
}
