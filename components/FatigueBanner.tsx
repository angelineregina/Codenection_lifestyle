'use client';

import { Info } from 'lucide-react';

export function FatigueBanner({ note }: { note: string }) {
  return (
    <section className="fatigue-banner" aria-label="Session pattern note">
      <Info size={16} aria-hidden="true" />
      <p>{note}</p>
    </section>
  );
}
