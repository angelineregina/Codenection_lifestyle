'use client';

import { useRouter } from 'next/navigation';
import { FocusPage } from '@/components/FocusPage';

export default function Focus() {
  const router = useRouter();
  return (
    <FocusPage
      onSettingsClick={() => console.log('Focus Guard settings clicked')}
      onCompareClick={() => console.log('Compared with your Quick Vibe Check clicked')}
      onSaveMyDay={() => router.push('/plan')}
    />
  );
}
