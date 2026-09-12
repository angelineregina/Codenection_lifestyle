'use client';

import { useRouter } from 'next/navigation';
import { FocusPage } from '@/components/FocusPage';

export default function Focus() {
  const router = useRouter();
  return (
    <FocusPage
      onSettingsClick={() => console.log('Focus Guard settings clicked')}
      onCompareClick={() => router.push('/vibe-check')}
      onSaveMyDay={() => router.push('/plan')}
    />
  );
}
