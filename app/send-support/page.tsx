'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SendSupportPage } from '@/components/social/SendSupportPage';

function SendSupportRouteInner() {
  const searchParams = useSearchParams();
  return <SendSupportPage friendId={searchParams.get('id')} />;
}

export default function SendSupportRoute() {
  return (
    <Suspense fallback={null}>
      <SendSupportRouteInner />
    </Suspense>
  );
}
