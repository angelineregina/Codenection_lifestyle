'use client';

import { Check } from 'lucide-react';

export function Toast({ visible, message }: { visible: boolean; message: string }) {
  return <output className={`toast ${visible ? 'is-visible' : ''}`} aria-live="polite"><span><Check size={14} strokeWidth={3} /></span>{message}</output>;
}
