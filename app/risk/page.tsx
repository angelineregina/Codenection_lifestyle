import Link from 'next/link';
import { DetailPage } from '@/components/DetailPage';
import { workloadSustainability } from '@/data/demoData';

export default function RiskPage() {
  return <DetailPage title="Workload Sustainability" eyebrow="Transparent demo explanation"><p className="sheet-copy">You currently have approximately <strong>{workloadSustainability.estimatedWorkHours} hours</strong> of estimated work before Friday and around <strong>{workloadSustainability.availableHours} available hours</strong>.</p><div className="metric-list">{workloadSustainability.metrics.map((metric) => <div key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong></div>)}</div><p className="sheet-footnote">This is prototype data to make the reasoning visible — it is not a medical diagnosis.</p><div className="sheet-actions"><Link className="primary-button" href="/save-my-day">Save My Day</Link><Link className="secondary-button" href="/what-if">Explore a what-if</Link></div><Link className="sheet-close-button" href="/">Back to Home</Link></DetailPage>;
}