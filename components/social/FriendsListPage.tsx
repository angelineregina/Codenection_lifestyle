'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, UserPlus } from 'lucide-react';
import { FriendAvatar } from '@/components/social/FriendAvatar';
import { friendStatusLabels, friends, type Friend } from '@/data/demoData';

function FriendRow({ friend, onOpen, onMessage }: { friend: Friend; onOpen: () => void; onMessage: () => void }) {
  const isOnline = friend.status !== 'offline';
  return (
    <div className="friend-row">
      <button className="friend-row-main" type="button" onClick={onOpen}>
        <FriendAvatar initials={friend.initials} tone={friend.tone} status={friend.status} size="md" />
        <span className="friend-row-copy">
          <strong>{friend.name}</strong>
          <small>{isOnline ? `${friendStatusLabels[friend.status]} · ${friend.statusDuration}` : friend.lastSeen}</small>
        </span>
      </button>
      <button className="secondary-button friend-message-button" type="button" onClick={onMessage}>Message</button>
    </div>
  );
}

export function FriendsListPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return term ? friends.filter((friend) => friend.name.toLowerCase().includes(term)) : friends;
  }, [query]);

  const onlineFriends = filtered.filter((friend) => friend.status !== 'offline');
  const offlineFriends = filtered.filter((friend) => friend.status === 'offline');

  function openFriend(id: string) {
    router.push(`/friend?id=${id}`);
  }

  function messageFriend(id: string) {
    router.push(`/send-support?id=${id}`);
  }

  return (
    <main className="app-main">
      <header className="app-header">
        <Link className="back-link" href="/social"><ArrowLeft size={15} />Return to your circle</Link>
        <div className="greeting-row">
          <div><h1>Friends</h1></div>
          <button className="icon-button settings-button" type="button" onClick={() => router.push('/add-friends')} aria-label="Add a friend">
            <UserPlus size={18} />
          </button>
        </div>
        <div className="search-field">
          <Search size={15} aria-hidden="true" />
          <input type="text" placeholder="Search friends" value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search friends" />
        </div>
      </header>

      <section className="dashboard-content">
        {onlineFriends.length > 0 && (
          <section className="surface-card friend-list-section" aria-labelledby="online-now-title">
            <div className="section-heading"><div><h2 id="online-now-title">Online Now ({onlineFriends.length})</h2></div></div>
            <div className="friend-row-list">
              {onlineFriends.map((friend) => <FriendRow key={friend.id} friend={friend} onOpen={() => openFriend(friend.id)} onMessage={() => messageFriend(friend.id)} />)}
            </div>
          </section>
        )}

        {offlineFriends.length > 0 && (
          <section className="surface-card friend-list-section" aria-labelledby="all-friends-title">
            <div className="section-heading"><div><h2 id="all-friends-title">All Friends ({offlineFriends.length})</h2></div></div>
            <div className="friend-row-list">
              {offlineFriends.map((friend) => <FriendRow key={friend.id} friend={friend} onOpen={() => openFriend(friend.id)} onMessage={() => messageFriend(friend.id)} />)}
            </div>
          </section>
        )}

        {filtered.length === 0 && <p className="demo-note">No friends match &quot;{query}&quot;.</p>}
      </section>
    </main>
  );
}
