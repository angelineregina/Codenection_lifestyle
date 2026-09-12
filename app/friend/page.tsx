'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FriendDetailPage } from '@/components/social/FriendDetailPage';

function FriendRouteInner() {
  const searchParams = useSearchParams();
  return <FriendDetailPage friendId={searchParams.get('id')} />;
}

export default function FriendRoute() {
  return (
    <Suspense fallback={null}>
      <FriendRouteInner />
    </Suspense>
  );
}
