'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Contact, Link2, QrCode, UserPlus, Users } from 'lucide-react';
import { useDemoState } from '@/components/DemoStateProvider';

export function AddFriendsPage() {
  const { showToast } = useDemoState();
  const [code, setCode] = useState('');

  function handleShareLink() {
    showToast('Invite link copied to clipboard');
  }

  function handleAddByCode() {
    const trimmed = code.trim();
    if (!trimmed) return;
    showToast(`No demo account found for code "${trimmed}"`);
    setCode('');
  }

  return (
    <main className="app-main">
      <header className="app-header">
        <Link className="back-link" href="/social"><ArrowLeft size={15} />Return to your circle</Link>
        <div className="greeting-row"><div><h1>Add Friends</h1></div></div>
      </header>

      <section className="dashboard-content">
        <section className="support-intro">
          <span className="support-intro-icon" aria-hidden="true"><UserPlus size={26} /></span>
          <h2>Grow your support circle</h2>
          <p>Add classmates and friends to check in on each other and share encouragement.</p>
        </section>

        <section className="surface-card invite-row">
          <span className="factor-detail-icon" aria-hidden="true"><Link2 size={15} /></span>
          <span className="invite-row-copy"><strong>Share your invite link</strong><small>Anyone with the link can join your circle</small></span>
          <button className="secondary-button" type="button" onClick={handleShareLink}>Share</button>
        </section>

        <section className="surface-card code-section" aria-labelledby="add-by-code-title">
          <p className="section-kicker" id="add-by-code-title">Have a code?</p>
          <div className="code-input-row">
            <input type="text" placeholder="Enter friend code" value={code} onChange={(event) => setCode(event.target.value)} aria-label="Friend code" />
            <button className="primary-button" type="button" onClick={handleAddByCode} disabled={!code.trim()}>Add</button>
          </div>
        </section>

        <section className="surface-card">
          <button className="setting-row" type="button" onClick={() => console.log('Scan QR Code clicked')}><span className="setting-row-label"><QrCode size={16} />Scan QR Code</span><span>›</span></button>
          <button className="setting-row" type="button" onClick={() => console.log('Find from Contacts clicked')}><span className="setting-row-label"><Contact size={16} />Find from Contacts</span><span>›</span></button>
          <button className="setting-row setting-row--last" type="button" onClick={() => console.log('Browse Suggestions clicked')}><span className="setting-row-label"><Users size={16} />Browse Suggestions</span><span>›</span></button>
        </section>

        <p className="demo-note">These actions are simulated for this prototype.</p>
      </section>
    </main>
  );
}
