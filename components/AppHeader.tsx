'use client';

import { Leaf, Sparkles } from 'lucide-react';
import { user as userData } from '@/data/demoData';

type UserData = typeof userData;

type AppHeaderProps = {
  user: UserData;
  onProfileClick: () => void;
};

export function AppHeader({ user, onProfileClick }: AppHeaderProps) {
  return (
    <header className="app-header">
      <div className="brand-row">
        <div className="brand-mark" aria-hidden="true"><Leaf size={17} strokeWidth={2.2} /></div>
        <span className="brand-name">REBALANCE</span>
        <span className="brand-dot" aria-hidden="true" />
        <span className="brand-status"><Sparkles size={11} />Daily check-in</span>
      </div>

      <div className="greeting-row">
        <div>
          <p className="eyebrow">{user.greeting}</p>
          <h1>{user.name}</h1>
          <p className="supportive-copy">{user.subtitle} <span aria-hidden="true">♥</span></p>
        </div>
        <button className="avatar-button" type="button" onClick={onProfileClick} aria-label="Open profile and preferences">
          <span>SE</span><span className="online-dot" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
