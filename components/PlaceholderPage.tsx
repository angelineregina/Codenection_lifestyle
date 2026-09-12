'use client';

import { ArrowLeft, Construction, Home } from 'lucide-react';

export function PlaceholderPage({ onBack }: { onBack: () => void }) {
  return <main className="placeholder-page"><span className="placeholder-icon" aria-hidden="true"><Construction size={28} /></span><p className="section-kicker">Next prototype step</p><h1>Coming soon</h1><p>This section will be implemented in the next prototype step.</p><button className="primary-button placeholder-button" type="button" onClick={onBack}><Home size={16} />Back to Home</button><button className="back-link" type="button" onClick={onBack}><ArrowLeft size={15} />Return to dashboard</button></main>;
}
