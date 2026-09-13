import type { Metadata } from 'next';
import './globals.css';
import { BottomNav } from '@/components/BottomNav';
import { DemoStateProvider } from '@/components/DemoStateProvider';

export const metadata: Metadata = {
  title: 'Rebalance · Home',
  description: 'A calmer way to plan your day and protect your energy.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="site-background">
          <div className="app-frame">
            <DemoStateProvider>
              {children}
              <BottomNav />
            </DemoStateProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
