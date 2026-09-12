'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RiskDetailsTab } from '@/components/risk/RiskDetailsTab';
import { RiskOverviewTab } from '@/components/risk/RiskOverviewTab';
import { RiskTrendsTab } from '@/components/risk/RiskTrendsTab';
import { riskAnalysis } from '@/data/demoData';

export default function RiskPage() {
  return (
    <main className="app-main">
      <header className="app-header">
        <Link className="back-link" href="/"><ArrowLeft size={15} />Return to dashboard</Link>
        <div className="greeting-row">
          <div>
            <h1>Workload &amp; Risk</h1>
            <p className="supportive-copy">You might be heading towards overload</p>
          </div>
        </div>
        <p className="risk-updated">{riskAnalysis.updatedLabel}</p>
      </header>
      <section className="dashboard-content">
        <Tabs defaultValue="overview">
          <TabsList className="risk-tabs-list">
            <TabsTrigger className="risk-tabs-trigger" value="overview">Overview</TabsTrigger>
            <TabsTrigger className="risk-tabs-trigger" value="details">Details</TabsTrigger>
            <TabsTrigger className="risk-tabs-trigger" value="trends">Trends</TabsTrigger>
          </TabsList>
          <TabsContent className="risk-tab-panel" value="overview"><RiskOverviewTab /></TabsContent>
          <TabsContent className="risk-tab-panel" value="details"><RiskDetailsTab /></TabsContent>
          <TabsContent className="risk-tab-panel" value="trends"><RiskTrendsTab /></TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
