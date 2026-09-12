'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, CalendarDays, Heart, Home, Users } from 'lucide-react';

const items = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/plan', label: 'Plan', icon: CalendarDays },
  { href: '/focus', label: 'Focus', icon: Heart },
  { href: '/insights', label: 'Insights', icon: BarChart3 },
  { href: '/social', label: 'Social', icon: Users },
];

const socialPaths = ['/friends', '/add-friends'];
const socialPrefixes = ['/friend', '/send-support'];

export function BottomNav() {
  const pathname = usePathname();
  const isSocialSubPage = socialPaths.includes(pathname) || socialPrefixes.some((prefix) => pathname.startsWith(prefix));
  const activePath = isSocialSubPage ? '/social' : pathname === '/risk' || pathname === '/assess' ? '/' : pathname === '/what-if' ? '/plan' : pathname;
  return <nav className="bottom-nav" aria-label="Primary navigation">{items.map(({ href, label, icon: Icon }) => {
    const active = activePath === href;
    return <Link className={`nav-item ${active ? 'is-active' : ''}`} href={href} key={href} aria-current={active ? 'page' : undefined}><Icon size={20} strokeWidth={active ? 2.5 : 1.9} /><span>{label}</span></Link>;
  })}</nav>;
}
