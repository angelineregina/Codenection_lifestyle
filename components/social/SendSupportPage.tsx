'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Coffee, Heart, HeartHandshake, Sparkles, Sun, ThumbsUp, Waves } from 'lucide-react';
import { useDemoState } from '@/components/DemoStateProvider';
import { friends, quickMessages, type QuickMessageIcon } from '@/data/demoData';

const quickMessageIconMap: Record<QuickMessageIcon, typeof Heart> = { heart: Heart, sparkles: Sparkles, coffee: Coffee, thumbsUp: ThumbsUp, wave: Waves, sun: Sun };

export function SendSupportPage({ friendId }: { friendId: string | null }) {
  const router = useRouter();
  const { showToast } = useDemoState();
  const friend = friends.find((entry) => entry.id === friendId) ?? friends[0];
  const [mode, setMode] = useState<'quick' | 'custom'>('quick');
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [customMessage, setCustomMessage] = useState('');

  const canSend = mode === 'quick' ? Boolean(selectedMessageId) : customMessage.trim().length > 0;

  function handleSend() {
    if (!canSend) return;
    showToast(`Support sent to ${friend.name}`);
    router.push(`/friend?id=${friend.id}`);
  }

  return (
    <main className="app-main">
      <header className="app-header">
        <Link className="back-link" href={`/friend?id=${friend.id}`}><ArrowLeft size={15} />{friend.name}</Link>
        <div className="greeting-row"><div><h1>Send Support</h1></div></div>
      </header>

      <section className="dashboard-content">
        <section className="support-intro">
          <span className="support-intro-icon" aria-hidden="true"><HeartHandshake size={26} /></span>
          <h2>Send a kind message to {friend.name}</h2>
          <p>A small note can make their day a little lighter.</p>
        </section>

        <div className="action-segmented-control action-segmented-control--two">
          <button type="button" className={mode === 'quick' ? 'is-active' : ''} onClick={() => setMode('quick')}>Quick Messages</button>
          <button type="button" className={mode === 'custom' ? 'is-active' : ''} onClick={() => setMode('custom')}>Custom</button>
        </div>

        {mode === 'quick' ? (
          <div className="quick-message-list">
            {quickMessages.map((message) => {
              const Icon = quickMessageIconMap[message.icon];
              const selected = selectedMessageId === message.id;
              return (
                <button className={`quick-message-row ${selected ? 'is-selected' : ''}`} type="button" key={message.id} onClick={() => setSelectedMessageId(message.id)} aria-pressed={selected}>
                  <span className="quick-message-icon"><Icon size={15} /></span>
                  <span>{message.text}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="surface-card custom-message-card">
            <textarea className="custom-message-input" placeholder={`Write something kind for ${friend.name}...`} value={customMessage} onChange={(event) => setCustomMessage(event.target.value)} rows={5} />
          </div>
        )}

        <button className="primary-button send-support-button" type="button" disabled={!canSend} onClick={handleSend}>Send</button>
      </section>
    </main>
  );
}
