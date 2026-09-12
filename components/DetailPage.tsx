import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';

export function DetailPage({ title, eyebrow, children }: { title: string; eyebrow: string; children: ReactNode }) {
  return <main className="app-main"><header className="app-header"><Link className="back-link" href="/"><ArrowLeft size={15} />Return to dashboard</Link><p className="section-kicker">{eyebrow}</p><div className="greeting-row"><h1>{title}</h1></div></header><section className="dashboard-content"><div className="surface-card schedule-card"><div className="sheet-content">{children}</div></div></section></main>;
}