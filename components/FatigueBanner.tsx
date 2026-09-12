'use client';

import { Info } from 'lucide-react';

export function FatigueBanner({ note, disclaimer }: { note: string; disclaimer: string }) {
  return (
    <section className="fatigue-banner" aria-label="Session pattern note">
      <Info size={16} aria-hidden="true" />
      <div><p>{note}</p><small>{disclaimer}</small></div>
    </section>
  );
}
