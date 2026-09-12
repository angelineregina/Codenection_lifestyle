'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DetailPage } from '@/components/DetailPage';
import { useDemoState } from '@/components/DemoStateProvider';
import { smartSuggestion } from '@/data/demoData';

export default function SaveMyDayPage() {
  const router = useRouter();
  const { handleApplySuggestion, suggestionApplied } = useDemoState();
  function applySuggestion() {
    handleApplySuggestion();
    router.push('/');
  }
  return <DetailPage title="Save My Day" eyebrow="One small step for today"><div className="suggestion-sheet-intro"><span className="suggestion-icon"><span>✦</span></span><p>{smartSuggestion.subtitle}</p></div><ul className="suggestion-list">{smartSuggestion.details.map((detail) => <li key={detail}>{detail}</li>)}</ul><div className="sheet-actions"><button className="primary-button" type="button" disabled={suggestionApplied} onClick={applySuggestion}>{suggestionApplied ? 'Suggestion applied' : 'Apply suggestion'}</button><Link className="secondary-button" href="/">Not now</Link></div><Link className="sheet-close-button" href="/what-if">Explore a what-if</Link></DetailPage>;
}