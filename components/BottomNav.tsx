'use client';

import { BarChart3, CalendarDays, Heart, Home, MoreHorizontal } from 'lucide-react';

export type PageKey = 'home' | 'b' | 'c' | 'd' | 'e';
const items: Array<{ key: PageKey; label: string; icon: typeof Home }> = [
  { key: 'home', label: 'Home', icon: Home }, { key: 'b', label: 'B', icon: CalendarDays }, { key: 'c', label: 'C', icon: Heart }, { key: 'd', label: 'D', icon: BarChart3 }, { key: 'e', label: 'E', icon: MoreHorizontal },
];

export function BottomNav({ activePage, onNavigate }: { activePage: PageKey; onNavigate: (page: PageKey) => void }) {
  return <nav className="bottom-nav" aria-label="Primary navigation">{items.map(({ key, label, icon: Icon }) => { const active = key === activePage; return <button className={`nav-item ${active ? 'is-active' : ''}`} type="button" key={key} onClick={() => onNavigate(key)} aria-current={active ? 'page' : undefined}><Icon size={20} strokeWidth={active ? 2.5 : 1.9} /><span>{label}</span></button>; })}</nav>;
}
