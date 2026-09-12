import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Beating the Burnout · Home',
  description: 'A calmer way to plan your day and protect your energy.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
