'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Clock, Coffee, Flame, MoreVertical, Smile } from 'lucide-react';
import { FriendAvatar } from '@/components/social/FriendAvatar';
import { useDemoState } from '@/components/DemoStateProvider';
import { friendStatusLabels, friends } from '@/data/demoData';

export function FriendDetailPage({ friendId }: { friendId: string | null }) {
  const router = useRouter();
  const { showToast } = useDemoState();
  const friend = friends.find((entry) => entry.id === friendId) ?? friends[0];
  const isOnline = friend.status !== 'offline';

  return (
    <main className="app-main">
      <header className="app-header">
        <div className="greeting-row">
          <Link className="back-link friend-detail-back" href="/friends"><ArrowLeft size={15} />Friends</Link>
          <button className="icon-button" type="button" onClick={() => console.log('Friend detail menu clicked')} aria-label="More options">
            <MoreVertical size={17} />
          </button>
        </div>
      </header>

      <section className="dashboard-content">
        <section className="friend-hero">
          <FriendAvatar initials={friend.initials} tone={friend.tone} status={friend.status} size="lg" />
          <h1>{friend.name}</h1>
          <span className="friend-hero-status">{isOnline ? `${friendStatusLabels[friend.status]} · ${friend.statusDuration}` : friend.lastSeen}</span>
          <p className="friend-hero-quote">&quot;{friend.statusQuote}&quot;</p>
        </section>

        <div className="friend-stat-grid">
          <div><span className="friend-stat-icon"><Clock size={14} /></span><strong>{friend.focusMinutesToday} min</strong><small>Focus today</small></div>
          <div><span className="friend-stat-icon"><Flame size={14} /></span><strong>{friend.streakDays} days</strong><small>Streak</small></div>
          <div><span className="friend-stat-icon"><Smile size={14} /></span><strong>{friend.moodDelta}</strong><small>Mood</small></div>
        </div>

        <section className="surface-card currently-card" aria-labelledby="currently-title">
          <p className="section-kicker" id="currently-title">Currently</p>
          {friend.activity ? (
            <div className="currently-activity"><span className="currently-activity-icon"><Clock size={15} /></span><span><strong>{friend.activity.task}</strong><small>{friend.activity.timeRange}</small></span></div>
          ) : (
            <div className="currently-activity"><span className="currently-activity-icon"><Coffee size={15} /></span><span><strong>Not active right now</strong><small>{friend.lastSeen}</small></span></div>
          )}
        </section>

        <section className="surface-card update-section" aria-labelledby="recent-updates-title">
          <div className="section-heading"><div><h2 id="recent-updates-title">Recent Updates</h2></div><button className="text-button" type="button" onClick={() => console.log('See all updates clicked')}>See all</button></div>
          <div className="update-timeline">
            {friend.updates.map((update) => <div className="update-timeline-row" key={update.id}><span className="update-timeline-dot" aria-hidden="true" /><div className="update-timeline-copy"><span>{update.text}</span><small>{update.timeAgo}</small></div></div>)}
          </div>
        </section>

        <div className="friend-detail-actions">
          <button className="primary-button" type="button" onClick={() => router.push(`/send-support?id=${friend.id}`)}>Send Support</button>
          <button className="secondary-button" type="button" onClick={() => showToast(`Invite sent to ${friend.name}.`)}>Invite for a Break</button>
        </div>
      </section>
    </main>
  );
}
