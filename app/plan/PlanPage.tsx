'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Coffee,
  Ellipsis,
  FileText,
  Leaf,
  MoveRight,
  Plus,
  RotateCcw,
  Settings2,
  Sparkles,
  Users,
  Wind,
} from 'lucide-react';
import styles from './plan.module.css';

type Recommendation = {
  id: string;
  title: string;
  change: string;
  detail: string;
  action: string;
  icon: 'move' | 'shorten' | 'add' | 'keep';
  tone: 'violet' | 'orange' | 'mint' | 'blue';
  actionable: boolean;
  impact?: {
    workloadReduction: number;
    demandReductionHours: number;
    recoveryBenefitMinutes: number;
  };
};

const recommendations: Recommendation[] = [
  {
    id: 'assignment',
    title: 'Move assignment polish',
    change: 'Move to tomorrow',
    detail: 'Lower priority and no deadline today.',
    action: 'Move',
    icon: 'move',
    tone: 'violet',
    actionable: true,
    impact: { workloadReduction: 14, demandReductionHours: 1, recoveryBenefitMinutes: 20 },
  },
  {
    id: 'club',
    title: 'Shorten club meeting prep',
    change: '60 min → 30 min',
    detail: 'Still enough time to prepare.',
    action: 'Shorten',
    icon: 'shorten',
    tone: 'orange',
    actionable: true,
    impact: { workloadReduction: 8, demandReductionHours: 0.5, recoveryBenefitMinutes: 10 },
  },
  {
    id: 'recovery',
    title: 'Add recovery break',
    change: '1:30 PM · 20 min',
    detail: 'No meaningful break for 4 hours.',
    action: 'Add',
    icon: 'add',
    tone: 'mint',
    actionable: true,
    impact: { workloadReduction: 10, demandReductionHours: 0, recoveryBenefitMinutes: 20 },
  },
  {
    id: 'deep-work',
    title: 'Keep FIT3143 deep work',
    change: '10:30 AM · 2 hrs',
    detail: 'High priority deadline.',
    action: 'Keep',
    icon: 'keep',
    tone: 'blue',
    actionable: false,
  },
];

const actionableRecommendations = recommendations.filter((item) => item.actionable);
const initialSelected = new Set(actionableRecommendations.map((item) => item.id));

const baseSchedule = [
  { time: '9:00 AM', title: 'Strategy sync', meta: '30 min · Class', status: 'Keep', icon: FileText, tone: 'blue' },
  { time: '10:30 AM', title: 'FIT3143 Deep Work', meta: '2 hr · Focus', status: 'Keep', icon: FileText, tone: 'violet' },
  { time: '12:30 PM', title: 'Lunch', meta: '1 hr · Break', status: 'Keep', icon: Coffee, tone: 'mint' },
  { time: '1:30 PM', title: 'Recovery break', meta: '20 min · Recharge', status: 'Added', icon: Leaf, tone: 'mint' },
  { time: '2:00 PM', title: 'Group project', meta: '2 hr · Team work', status: 'Keep', icon: Users, tone: 'orange' },
  { time: '4:00 PM', title: 'Club prep', meta: '30 min · Reduced', status: 'Shortened', icon: Clock3, tone: 'orange' },
  { time: '6:00 PM', title: 'Assignment polish', meta: 'Moved to tomorrow', status: 'Moved', icon: MoveRight, tone: 'violet' },
];

function getAppliedSchedule(selected: Set<string>) {
  const schedule = baseSchedule.filter((item) => item.title !== 'Recovery break').map((item) => ({ ...item, status: 'Keep' }));
  const club = schedule.find((item) => item.title === 'Club prep');
  const assignment = schedule.find((item) => item.title === 'Assignment polish');

  if (club) club.meta = '60 min - Original';
  if (assignment) assignment.meta = '90 min - Today';

  if (selected.has('club') && club) {
    club.meta = '30 min - Reduced';
    club.status = 'Shortened';
  }
  if (selected.has('assignment') && assignment) {
    assignment.meta = 'Moved to tomorrow';
    assignment.status = 'Moved';
  }
  if (selected.has('recovery')) {
    schedule.splice(3, 0, { time: '1:30 PM', title: 'Recovery break', meta: '20 min - Recharge', status: 'Added', icon: Leaf, tone: 'mint' });
  }

  return schedule;
}

function getSelectionImpact(selected: Set<string>) {
  const selectedItems = actionableRecommendations.filter((item) => selected.has(item.id));
  const workloadReduction = selectedItems.reduce((total, item) => total + (item.impact?.workloadReduction ?? 0), 0);
  const demandReductionHours = selectedItems.reduce((total, item) => total + (item.impact?.demandReductionHours ?? 0), 0);
  const recoveryBenefitMinutes = selectedItems.reduce((total, item) => total + (item.impact?.recoveryBenefitMinutes ?? 0), 0);
  const adjustedCount = selectedItems.filter((item) => item.action !== 'Add').length;
  const addedCount = selectedItems.filter((item) => item.action === 'Add').length;

  return {
    count: selectedItems.length,
    workloadAfter: 108 - workloadReduction,
    demandAfter: (8.6 - demandReductionHours).toFixed(1),
    recoveryAfter: 20 + recoveryBenefitMinutes,
    workloadReduction,
    summaryLabel: selectedItems.length === 0 ? 'No changes selected' : `${adjustedCount} adjusted${addedCount > 0 ? ` - ${addedCount} added` : ''}`,
  };
}

function PlanBrand() {
  return (
    <div className={styles.brand}>
      <span className={styles.brandMark}><Leaf size={15} /></span>
      <span>BEATING THE BURNOUT</span>
      <span className={styles.brandStatus}><span /> Save My Day</span>
    </div>
  );
}

function RecommendationIcon({ type }: { type: Recommendation['icon'] }) {
  if (type === 'move') return <MoveRight size={16} />;
  if (type === 'shorten') return <Clock3 size={16} />;
  if (type === 'add') return <Plus size={17} />;
  return <FileText size={16} />;
}

function SummaryCard({ selected, updated }: { selected: Set<string>; updated?: boolean }) {
  const impact = getSelectionImpact(selected);

  return (
    <section className={styles.summaryCard} aria-label={updated ? 'Impact summary' : 'Plan changes summary'}>
      <div className={styles.summaryMetric}>
        <span className={styles.summaryLabel}>Workload</span>
        <strong>108% → {impact.workloadAfter}%</strong>
        <em className={styles.down}>{impact.workloadReduction > 0 ? `↓ ${impact.workloadReduction}%` : 'No change'}</em>
      </div>
      <div className={styles.summaryMetric}>
        <span className={styles.summaryLabel}>Recovery time</span>
        <strong>20 → {impact.recoveryAfter} min</strong>
        <em className={styles.up}>{impact.recoveryAfter > 20 ? `↑ ${impact.recoveryAfter - 20} min` : 'No added recovery'}</em>
      </div>
      <div className={styles.summaryMetric}>
        <span className={styles.summaryLabel}>Changes</span>
        <strong>{impact.count} change{impact.count === 1 ? '' : 's'}</strong>
        <em>{impact.summaryLabel}</em>
      </div>
    </section>
  );
}

function RecommendationCard({ item, selected, onToggle }: { item: Recommendation; selected: boolean; onToggle: () => void }) {
  const content = <>
      <span className={`${styles.recommendationIcon} ${styles[item.tone]}`}><RecommendationIcon type={item.icon} /></span>
      <span className={styles.recommendationCopy}>
        <strong>{item.title}</strong>
        <b>{item.change}</b>
        <small>{item.detail}</small>
      </span>
      <span className={styles.recommendationAside}>
        {item.actionable ? <><span className={`${styles.checkbox} ${selected ? styles.checked : ''}`}>{selected && <Check size={12} strokeWidth={3} />}</span><span className={`${styles.actionPill} ${styles[item.tone]}`}>{item.action}</span></> : <span className={`${styles.actionPill} ${styles[item.tone]}`}>Protected</span>}
      </span>
    </>;

  if (!item.actionable) return <article className={`${styles.recommendation} ${styles.protectedRecommendation}`} aria-label="Protected commitment">{content}</article>;
  return <button className={`${styles.recommendation} ${selected ? styles.selected : ''}`} type="button" onClick={onToggle} aria-pressed={selected}>{content}</button>;
}

function ScheduleRow({ item }: { item: ReturnType<typeof getAppliedSchedule>[number] }) {
  const Icon = item.icon;
  return (
    <div className={styles.scheduleRow}>
      <time>{item.time}</time>
      <span className={`${styles.scheduleIcon} ${styles[item.tone]}`}><Icon size={14} /></span>
      <span className={styles.scheduleCopy}><strong>{item.title}</strong><small>{item.meta}</small></span>
      <span className={`${styles.statusPill} ${styles[item.status.toLowerCase()]}`}>{item.status}</span>
    </div>
  );
}

export function PlanPage() {
  const router = useRouter();
  const [updated, setUpdated] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(() => new Set(initialSelected));
  const [menuOpen, setMenuOpen] = useState(false);
  const [planHint, setPlanHint] = useState('');
  const selectedCount = getSelectionImpact(selected).count;
  const allSelected = selectedCount === actionableRecommendations.length;
  const appliedSchedule = getAppliedSchedule(selected);

  function toggleRecommendation(id: string) {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setPlanHint('');
  }

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(actionableRecommendations.map((item) => item.id)));
    setPlanHint('');
  }

  function tryDifferentPlan() {
    router.push('/what-if');
    setUpdated(false);
    setSelected(new Set(['assignment', 'recovery']));
    setPlanHint('Here’s another balanced option to try.');
  }

  if (updated) {
    return (
      <main className={`${styles.planPage} ${styles.updatedPage}`}>
        <header className={styles.updatedHeader}>
          <button className={styles.headerIcon} type="button" aria-label="Back to recommended changes" onClick={() => setUpdated(false)}><ArrowLeft size={18} /></button>
          <div><PlanBrand /><h1>Save My Day</h1></div>
          <button className={styles.headerIcon} type="button" aria-label="Open plan menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><Ellipsis size={19} /></button>
          {menuOpen && <div className={styles.menu}><button type="button" onClick={() => setMenuOpen(false)}>Plan details</button><button type="button" onClick={() => setMenuOpen(false)}>Close menu</button></div>}
        </header>

        <section className={styles.successBanner}>
          <span className={styles.successIcon}><Check size={18} strokeWidth={3} /></span>
          <span><strong>Plan updated!</strong><small>Your day is now more balanced. 💙</small></span>
        </section>

        <section className={styles.sectionBlock}>
          <div className={styles.sectionHeading}><h2><CalendarDays size={16} /> Your New Schedule</h2><button type="button" className={styles.inlineAction}>View calendar <ChevronRight size={14} /></button></div>
          <div className={styles.scheduleCard}>{appliedSchedule.map((item) => <ScheduleRow key={`${item.time}-${item.title}`} item={item} />)}</div>
        </section>

        <section className={styles.sectionBlock}>
          <div className={styles.sectionHeading}><h2><Sparkles size={16} /> Impact Summary</h2></div>
          <SummaryCard selected={selected} updated />
        </section>

        <section className={styles.takeCareCard}>
          <span className={styles.takeCareIcon}><Leaf size={19} /></span>
          <span><strong>Take Care of You</strong><small>Your plan looks better! Consider starting with a short breathing exercise to ease into your next task.</small></span>
          <ChevronRight size={17} />
        </section>

        <div className={styles.pageActions}>
          <Link className={styles.primaryButton} href="/focus">View Focus Mode <ArrowRight size={15} /></Link>
          <Link className={styles.secondaryButton} href="/">Back to Home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.planPage}>
      <header className={styles.planHeader}>
        <PlanBrand />
        <div className={styles.headerTitleRow}><div><p className={styles.eyebrow}>A gentler plan for today</p><h1>Save My Day</h1></div><Settings2 size={18} className={styles.mutedIcon} /></div>
        <p className={styles.subtitle}>We’ve created a more balanced plan for your day, based on your workload and well-being.</p>
      </header>

      <SummaryCard selected={selected} />

      <section className={styles.sectionBlock}>
        <div className={styles.sectionHeading}><h2><Sparkles size={15} /> Recommended Changes</h2><button type="button" className={styles.selectAll} onClick={toggleAll}>{allSelected ? 'Clear all' : 'Select all'}</button></div>
        <div className={styles.recommendationList}>{recommendations.map((item) => <RecommendationCard key={item.id} item={item} selected={selected.has(item.id)} onToggle={() => toggleRecommendation(item.id)} />)}</div>
      </section>

      <div className={styles.supportiveStrip}><Leaf size={17} /><span>These changes help reduce overload, protect your energy, and keep you on track.</span></div>
      {planHint && <output className={styles.planHint}><RotateCcw size={13} />{planHint}</output>}

      <div className={styles.pageActions}>
        <button className={styles.primaryButton} type="button" disabled={selectedCount === 0} onClick={() => setUpdated(true)}>Apply {selectedCount} Change{selectedCount === 1 ? '' : 's'} <ArrowRight size={15} /></button>
        <button className={styles.secondaryButton} type="button" onClick={tryDifferentPlan}>Try a Different Plan</button>
      </div>
      <p className={styles.footerNote}><Wind size={12} /> A plan that works with you, not against you.</p>
    </main>
  );
}
