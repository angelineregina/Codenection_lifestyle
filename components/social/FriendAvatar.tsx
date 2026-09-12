'use client';

import type { AvatarTone, FriendStatus } from '@/data/demoData';

const toneClassMap: Record<AvatarTone, string> = { blue: 'friend-avatar--blue', violet: 'friend-avatar--violet', mint: 'friend-avatar--mint', orange: 'friend-avatar--orange' };
const statusDotClassMap: Record<FriendStatus, string> = { focused: 'status-dot--focused', 'on-a-break': 'status-dot--break', 'in-class': 'status-dot--class', offline: 'status-dot--offline' };

type FriendAvatarProps = {
  initials: string;
  tone: AvatarTone;
  status?: FriendStatus;
  size?: 'sm' | 'md' | 'lg';
};

export function FriendAvatar({ initials, tone, status, size = 'md' }: FriendAvatarProps) {
  return (
    <span className={`friend-avatar friend-avatar--${size} ${toneClassMap[tone]}`}>
      {initials}
      {status && <span className={`status-dot ${statusDotClassMap[status]}`} aria-hidden="true" />}
    </span>
  );
}
