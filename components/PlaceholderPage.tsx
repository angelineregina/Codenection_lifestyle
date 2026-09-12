import Link from 'next/link';
import { ArrowLeft, Construction, Home } from 'lucide-react';

export function PlaceholderPage({ title = 'Coming soon', description = 'This section will be implemented in the next prototype step.' }: { title?: string; description?: string }) {
  return <main className="placeholder-page"><span className="placeholder-icon" aria-hidden="true"><Construction size={28} /></span><p className="section-kicker">Next prototype step</p><h1>{title}</h1><p>{description}</p><Link className="primary-button placeholder-button" href="/"><Home size={16} />Back to Home</Link><Link className="back-link" href="/"><ArrowLeft size={15} />Return to dashboard</Link></main>;
}