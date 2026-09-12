'use client';

import { Leaf, Settings, Sparkles } from 'lucide-react';

export function FocusHeader({ onSettingsClick }: { onSettingsClick: () => void }) {
  return (
    <header className="app-header focus-header">
      <div className="brand-row">
        <div className="brand-mark" aria-hidden="true"><Leaf size={17} strokeWidth={2.2} /></div>
        <span className="brand-name">BEATING THE BURNOUT</span>
        <span className="brand-dot" aria-hidden="true" />
        <span className="brand-status"><Sparkles size={11} />Focus session</span>
      </div>

      <div className="greeting-row">
        <div>
          <h1>Focus Guard</h1>
          <p className="supportive-copy">A supporting signal during study sessions.</p>
        </div>
        <button className="icon-button settings-button" type="button" onClick={onSettingsClick} aria-label="Open Focus Guard settings">
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
}
