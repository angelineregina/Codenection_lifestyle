'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, CalendarClock, Check, Clock3, MoveRight, TriangleAlert, X } from 'lucide-react';
import { riskAnalysis, type WhatIfTask, whatIfTasks } from '@/data/demoData';
import { Toast } from '@/components/Toast';

type Action = 'move' | 'shorten' | 'remove';
type MoveOption = 'tomorrow' | 'saturday' | 'custom';
type ShortenOption = 15 | 30 | 60;

type SimulationImpact = {
  workload: number;
  demand: string;
  recovery: string;
  risk: string;
  note: string;
};

const baseState = {
  workload: riskAnalysis.capacity.workloadPercent,
  demand: riskAnalysis.capacity.plannedDemand,
  recovery: riskAnalysis.capacity.recoveryPlanned,
  risk: 'High',
};

const previewSchedule = [
  { taskId: 'strategy-sync', time: '9:00', title: 'Strategy sync', status: 'Keep' },
  { taskId: 'fit3143-deep-work', time: '10:30', title: 'FIT3143 Deep Work', status: 'Keep' },
  { taskId: 'lunch', time: '12:30', title: 'Lunch', status: 'Keep' },
  { taskId: 'recovery-break', time: '1:30', title: 'Recovery break', status: 'Keep' },
  { taskId: 'group-project', time: '2:00', title: 'Group project', status: 'Keep' },
  { taskId: 'club-meeting-prep', time: '4:00', title: 'Club prep', status: 'Keep' },
  { taskId: 'assignment-polish', time: '6:00', title: 'Assignment polish', status: 'Keep' },
];

function getMoveImpact(task: WhatIfTask, option: MoveOption): SimulationImpact {
  const impacts: Record<string, Record<MoveOption, Omit<SimulationImpact, 'note'>>> = {
    'assignment-polish': {
      tomorrow: { workload: 82, demand: '7.1 h', recovery: '50 min', risk: 'Moderate' },
      saturday: { workload: 84, demand: '7.2 h', recovery: '45 min', risk: 'Moderate' },
      custom: { workload: 87, demand: '7.4 h', recovery: '40 min', risk: 'Moderate' },
    },
    'club-meeting-prep': {
      tomorrow: { workload: 90, demand: '7.7 h', recovery: '40 min', risk: 'Moderate' },
      saturday: { workload: 92, demand: '7.8 h', recovery: '35 min', risk: 'Moderate' },
      custom: { workload: 95, demand: '8.0 h', recovery: '30 min', risk: 'High' },
    },
    'fit3143-deep-work': {
      tomorrow: { workload: 86, demand: '7.2 h', recovery: '35 min', risk: 'Moderate' },
      saturday: { workload: 88, demand: '7.4 h', recovery: '30 min', risk: 'Moderate' },
      custom: { workload: 92, demand: '7.7 h', recovery: '25 min', risk: 'Moderate' },
    },
    'group-project': {
      tomorrow: { workload: 88, demand: '7.5 h', recovery: '35 min', risk: 'Moderate' },
      saturday: { workload: 90, demand: '7.7 h', recovery: '30 min', risk: 'Moderate' },
      custom: { workload: 94, demand: '7.9 h', recovery: '25 min', risk: 'High' },
    },
  };

  const result = impacts[task.id][option];
  return { ...result, note: task.priority === 'Lower priority' ? 'Moving this lower-priority task reduces deadline pressure today without affecting your essential commitments.' : 'Moving this task creates more breathing room today while keeping the change visible for later.' };
}

function getShortenImpact(task: WhatIfTask, option: ShortenOption): SimulationImpact {
  const taskFactor = task.id === 'fit3143-deep-work' ? 0.7 : task.id === 'assignment-polish' ? 1.15 : 1;
  const workload = Math.round(baseState.workload - option * taskFactor / 2.4);
  const demand = (8.6 - option * taskFactor / 60).toFixed(1);
  const recovery = `${20 + Math.round(option * taskFactor / 6)} min`;
  const risk = workload < 100 ? 'Moderate' : 'High';
  return { workload, demand: `${demand} h`, recovery, risk, note: `Shortening this task by ${option} minutes keeps it on your schedule while giving your day a little more room to recover.` };
}

function getRemoveImpact(task: WhatIfTask): SimulationImpact {
  const impacts: Record<string, Omit<SimulationImpact, 'note'>> = {
    'assignment-polish': { workload: 76, demand: '7.0 h', recovery: '50 min', risk: 'Moderate' },
    'club-meeting-prep': { workload: 90, demand: '7.6 h', recovery: '40 min', risk: 'Moderate' },
    'fit3143-deep-work': { workload: 84, demand: '7.3 h', recovery: '35 min', risk: 'Moderate' },
    'group-project': { workload: 88, demand: '7.5 h', recovery: '35 min', risk: 'Moderate' },
  };
  return { ...impacts[task.id], note: task.priority === 'Lower priority' ? 'Removing this lower-priority task leaves more capacity for your essential commitments today.' : 'Removing this task creates capacity, but it may shift an important commitment that still needs attention.' };
}

function getImpact(task: WhatIfTask, action: Action, moveOption: MoveOption, shortenOption: ShortenOption): SimulationImpact {
  if (action === 'move') return getMoveImpact(task, moveOption);
  if (action === 'shorten') return getShortenImpact(task, shortenOption);
  return getRemoveImpact(task);
}

export function WhatIfSimulator() {
  const actionSectionRef = useRef<HTMLElement | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [action, setAction] = useState<Action>('move');
  const [moveOption, setMoveOption] = useState<MoveOption>('tomorrow');
  const [shortenOption, setShortenOption] = useState<ShortenOption>(30);
  const [applied, setApplied] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const selectedTask = useMemo(() => whatIfTasks.find((task) => task.id === selectedTaskId) ?? null, [selectedTaskId]);
  const hasSelection = Boolean(selectedTask);
  const impact = useMemo(() => selectedTask ? getImpact(selectedTask, action, moveOption, shortenOption) : { ...baseState, note: '' }, [action, moveOption, selectedTask, shortenOption]);

  const updatedSchedule = useMemo(() => previewSchedule.map((item) => {
    if (!selectedTask || item.taskId !== selectedTask.id) return item;
    if (action === 'remove') return { ...item, status: 'Removed' };
    if (action === 'shorten') return { ...item, status: 'Shortened' };
    return { ...item, status: 'Moved' };
  }), [action, selectedTask]);

  useEffect(() => {
    if (!toastVisible) return undefined;
    const timeout = window.setTimeout(() => setToastVisible(false), 3200);
    return () => window.clearTimeout(timeout);
  }, [toastVisible]);

  function selectTask(id: string) {
    setSelectedTaskId(id);
    setAction('move');
    setMoveOption('tomorrow');
    setApplied(false);
    setToastVisible(false);
    window.requestAnimationFrame(() => actionSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }

  function chooseAction(nextAction: Action) {
    setAction(nextAction);
    setApplied(false);
    setToastVisible(false);
  }

  function resetSimulation() {
    setSelectedTaskId(null);
    setAction('move');
    setMoveOption('tomorrow');
    setShortenOption(30);
    setApplied(false);
    setToastVisible(false);
  }

  function applyChange() {
    if (!selectedTask) return;
    setApplied(true);
    setToastVisible(true);
  }

  return (
    <main className="app-main what-if-page">
      <header className="what-if-header">
        <Link className="what-if-back-link" href="/plan" aria-label="Back to Save My Day"><ArrowLeft size={17} /><span>Back</span></Link>
        <p className="section-kicker">Plan · Experiment first</p>
        <h1>What-if Simulator</h1>
        <p>See how one change could affect your day before you commit to it.</p>
      </header>

      <section className="what-if-content">
        <section className="what-if-state-card" aria-labelledby="current-state-title">
          <div className="what-if-card-heading"><div><p className="section-kicker">Current state</p><h2 id="current-state-title">Your day right now</h2></div><span className="what-if-status-pill">High workload</span></div>
          <div className="what-if-state-grid"><div><span>Current workload</span><strong>108%</strong></div><div><span>Available capacity</span><strong>7.0 h</strong></div><div><span>Recovery</span><strong>20 min</strong></div></div>
        </section>

        <section className="what-if-section" aria-labelledby="task-title">
          <div className="what-if-section-heading"><div><p className="section-kicker">Start with one thing</p><h2 id="task-title">What would you like to change?</h2></div></div>
          <div className="what-if-task-list">
            {whatIfTasks.map((task) => <button className={`what-if-task ${selectedTaskId === task.id ? 'is-selected' : ''}`} type="button" key={task.id} onClick={() => selectTask(task.id)} aria-pressed={selectedTaskId === task.id}><span className="what-if-task-icon" aria-hidden="true"><CalendarClock size={16} /></span><span className="what-if-task-copy"><strong>{task.title}</strong><small>{task.time} · {task.duration}</small></span><span className={`priority-pill priority-pill--${task.priority.split(' ')[0].toLowerCase()}`}>{task.priority}</span><span className="task-check" aria-hidden="true">{selectedTaskId === task.id && <Check size={12} strokeWidth={3} />}</span></button>)}
          </div>
        </section>

        <section ref={actionSectionRef} className={`what-if-section action-section ${hasSelection ? '' : 'is-locked'}`} aria-labelledby="action-title">
          <div className="what-if-section-heading"><div><p className="section-kicker">Then choose an experiment</p><h2 id="action-title">How should it change?</h2>{selectedTask && <p className="what-if-selection-context">Changing: <strong>{selectedTask.title}</strong></p>}</div></div>
          <fieldset className="action-segmented-control"><legend className="sr-only">Choose a change action</legend>{(['move', 'shorten', 'remove'] as Action[]).map((item) => <button type="button" key={item} className={action === item && hasSelection ? 'is-active' : ''} disabled={!hasSelection} onClick={() => chooseAction(item)}>{item[0].toUpperCase() + item.slice(1)}</button>)}</fieldset>
          {!hasSelection && <p className="what-if-selection-hint">Select one task above to unlock the change options.</p>}
          {hasSelection && action === 'move' && <div className="what-if-option-grid">{([['tomorrow', 'Tomorrow'], ['saturday', 'Saturday'], ['custom', 'Custom time']] as Array<[MoveOption, string]>).map(([value, label]) => <button type="button" key={value} className={moveOption === value ? 'is-selected' : ''} onClick={() => { setMoveOption(value); setApplied(false); }}><MoveRight size={14} />{label}</button>)}</div>}
          {hasSelection && action === 'shorten' && <div className="what-if-option-grid">{([15, 30, 60] as ShortenOption[]).map((value) => <button type="button" key={value} className={shortenOption === value ? 'is-selected' : ''} onClick={() => { setShortenOption(value); setApplied(false); }}><Clock3 size={14} />{value} min shorter</button>)}</div>}
          {hasSelection && action === 'remove' && <div className="remove-explanation"><TriangleAlert size={17} /><p><strong>Prototype simulation only.</strong> This would remove <b>{selectedTask?.title ?? 'this task'}</b> from today&apos;s workload. Nothing is deleted permanently.</p></div>}
        </section>

        <section className="what-if-impact-card" aria-labelledby="impact-title">
          <div className="what-if-card-heading"><div><p className="section-kicker">Live impact preview</p><h2 id="impact-title">Impact Preview</h2></div><span className="demo-chip">Demo projection</span></div>
          <div className="impact-comparison">
            <div className="impact-row"><span>Workload</span><strong>108%</strong><ArrowRight size={14} /><strong className={hasSelection ? 'is-improved' : ''}>{impact.workload}%</strong></div>
            <div className="impact-row"><span>Planned demand</span><strong>8.6 h</strong><ArrowRight size={14} /><strong className={hasSelection ? 'is-improved' : ''}>{impact.demand}</strong></div>
            <div className="impact-row"><span>Recovery</span><strong>20 min</strong><ArrowRight size={14} /><strong className={hasSelection ? 'is-improved' : ''}>{impact.recovery}</strong></div>
            <div className="impact-row"><span>Workload level</span><strong>High</strong><ArrowRight size={14} /><strong className={hasSelection && impact.risk !== 'High' ? 'is-improved' : ''}>{impact.risk}</strong></div>
          </div>
          <p className={`impact-note ${hasSelection ? 'has-selection' : ''}`}>{hasSelection ? impact.note : 'Select a task and action above to see an explainable before → after projection.'}</p>
        </section>

        <section className="what-if-section what-if-day-section" aria-labelledby="day-preview-title">
          <div className="what-if-section-heading"><div><p className="section-kicker">{hasSelection ? 'If applied' : 'Current schedule'}</p><h2 id="day-preview-title">{hasSelection ? 'Updated day preview' : "Today's schedule"}</h2></div><span className="projected-label">{hasSelection ? 'Projected' : 'Current'}</span></div>
          <div className="what-if-schedule-list">{updatedSchedule.map((item) => <div className={`what-if-schedule-row ${selectedTask && item.taskId === selectedTask.id ? 'is-changed' : ''} ${item.status === 'Removed' ? 'is-removed' : ''}`} key={item.taskId}><time>{item.time}</time><span>{item.title}</span><strong>{item.status}</strong></div>)}</div>
        </section>

        <section className="what-if-actions" aria-label="Simulation actions">
          <button className={`primary-button ${applied ? 'is-applied' : ''}`} type="button" onClick={applyChange} disabled={!hasSelection || applied}>{applied ? <><Check size={15} />Change applied</> : <>Apply This Change <ArrowRight size={15} /></>}</button>
          <button className="secondary-button" type="button" onClick={resetSimulation}><X size={14} />Reset Simulation</button>
          <Link className="what-if-plan-link" href="/plan"><ArrowLeft size={14} />Back to Save My Day</Link>
        </section>
      </section>
      <Toast visible={toastVisible} message="Change applied — your simulated plan is now more manageable." />
    </main>
  );
}
