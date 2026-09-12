'use client';

import Link from 'next/link';
import { BriefcaseBusiness, Check, ChevronDown, ChevronRight, Circle, Coffee, Dumbbell, FileText, Laptop, Plus, Users } from 'lucide-react';
import type { ScheduleIcon, ScheduleItem } from '@/data/demoData';

const iconMap: Record<ScheduleIcon, typeof BriefcaseBusiness> = { strategy: FileText, focus: Laptop, recovery: Coffee, client: Users, health: Dumbbell, planning: BriefcaseBusiness, reset: Coffee };
const iconClassMap: Record<ScheduleIcon, string> = { strategy: 'schedule-icon--blue', focus: 'schedule-icon--violet', recovery: 'schedule-icon--mint', client: 'schedule-icon--orange', health: 'schedule-icon--sky', planning: 'schedule-icon--blue', reset: 'schedule-icon--mint' };

type ScheduleCardProps = {
  items: ScheduleItem[];
  completedIds: Set<string>;
  confirmedIds: Set<string>;
  expanded: boolean;
  onToggle: (id: string) => void;
  onToggleExpanded: () => void;
};

export function ScheduleCard({ items, completedIds, confirmedIds, expanded, onToggle, onToggleExpanded }: ScheduleCardProps) {
  const visibleItems = expanded ? items : items.slice(0, 5);

  return (
    <section className="surface-card schedule-card" aria-labelledby="schedule-title">
      <div className="section-heading"><div><p className="section-kicker">Today</p><h2 id="schedule-title">Your Schedule</h2></div><div className="schedule-heading-actions"><Link className="text-button" href="/assess"><Plus size={14} />Add</Link><button className="text-button" type="button" onClick={onToggleExpanded}>{expanded ? 'Show less' : 'View all'}{expanded ? <ChevronDown size={15} /> : <ChevronRight size={15} />}</button></div></div>
      <div className="schedule-list">
        {visibleItems.map((item) => {
          const Icon = iconMap[item.icon];
          const isCompleted = completedIds.has(item.id);
          const isConfirmed = confirmedIds.has(item.id);
          return (
            <div className={`schedule-row ${isCompleted ? 'is-completed' : ''} ${isConfirmed ? 'is-confirmed' : ''}`} key={item.id}>
              <time>{item.time}</time>
              <span className={`schedule-icon ${iconClassMap[item.icon]}`} aria-hidden="true"><Icon size={16} strokeWidth={2.1} /></span>
              <span className="schedule-details"><strong>{item.title}</strong><small>{item.duration}</small>{isConfirmed && <em>Scheduled</em>}</span>
              <button className={`completion-button ${isCompleted ? 'is-completed' : ''}`} type="button" onClick={() => onToggle(item.id)} aria-label={`${isCompleted ? 'Mark' : 'Complete'} ${item.title}`} aria-pressed={isCompleted}>{isCompleted ? <Check size={12} strokeWidth={3} /> : <Circle size={18} />}</button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
