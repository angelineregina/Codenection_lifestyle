'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Leaf, Quote, Sparkles, UserPlus } from 'lucide-react';
import { FriendAvatar } from '@/components/social/FriendAvatar';
import { friends, socialQuote } from '@/data/demoData';

const onlineFriends = friends.filter((friend) => friend.status !== 'offline');
const updateFeed = friends.filter((friend) => friend.updates.length > 0).slice(0, 4).map((friend) => ({ friend, update: friend.updates[0] }));

export function SocialHomePage() {
  const router = useRouter();
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  function toggleLike(id: string) {
    setLikedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <main className="app-main">
      <header className="app-header">
        <div className="brand-row">
          <div className="brand-mark" aria-hidden="true"><Leaf size={17} strokeWidth={2.2} /></div>
          <span className="brand-name">REBALANCE</span>
          <span className="brand-dot" aria-hidden="true" />
          <span className="brand-status"><Sparkles size={11} />Support circle</span>
        </div>
        <div className="greeting-row">
          <div>
            <h1>Your Support Circle</h1>
            <p className="supportive-copy">Study feels better together</p>
          </div>
          <button className="icon-button settings-button" type="button" onClick={() => router.push('/add-friends')} aria-label="Add a friend">
            <UserPlus size={18} />
          </button>
        </div>
      </header>

      <section className="dashboard-content">
        <button className="surface-card online-card" type="button" onClick={() => router.push('/friends')}>
          <span className="online-avatar-stack" aria-hidden="true">
            {onlineFriends.slice(0, 5).map((friend) => <FriendAvatar key={friend.id} initials={friend.initials} tone={friend.tone} size="sm" />)}
          </span>
          <span className="online-card-copy"><strong>{onlineFriends.length} friends are online</strong><small>Tap to see who&apos;s active right now</small></span>
        </button>

        <section className="support-banner">
          <span className="support-banner-icon" aria-hidden="true"><Heart size={18} /></span>
          <div className="support-banner-copy"><strong>Send a little support</strong><p>Someone in your circle could use encouragement today.</p></div>
          <button className="primary-button" type="button" onClick={() => router.push('/friends')}>Send</button>
        </section>

        <section className="surface-card update-section" aria-labelledby="friend-updates-title">
          <div className="section-heading"><div><p className="section-kicker">Your circle</p><h2 id="friend-updates-title">Friend Updates</h2></div><button className="text-button" type="button" onClick={() => router.push('/friends')}>See all</button></div>
          <div className="update-list">
            {updateFeed.map(({ friend, update }) => {
              const liked = likedIds.has(update.id);
              return (
                <div className="update-row" key={update.id}>
                  <FriendAvatar initials={friend.initials} tone={friend.tone} size="sm" />
                  <span className="update-row-copy"><strong>{friend.name}</strong><span>{update.text}</span><small>{update.timeAgo}</small></span>
                  <button className={`reaction-button ${liked ? 'is-liked' : ''}`} type="button" onClick={() => toggleLike(update.id)} aria-pressed={liked} aria-label={`React to ${friend.name}'s update`}>
                    <Heart size={14} fill={liked ? 'currentColor' : 'none'} />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        <section className="quote-card">
          <Quote size={18} aria-hidden="true" />
          <p>{socialQuote.text}</p>
          <span>{socialQuote.author}</span>
        </section>

        <p className="demo-note">Demo data · Your circle is simulated for this prototype.</p>
      </section>
    </main>
  );
}
