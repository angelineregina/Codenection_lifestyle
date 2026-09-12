'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';

type BottomSheetProps = { open: boolean; title: string; eyebrow?: string; onClose: () => void; children: React.ReactNode };

export function BottomSheet({ open, title, eyebrow, onClose, children }: BottomSheetProps) {
  useEffect(() => { if (!open) return undefined; const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); }; document.addEventListener('keydown', handleKeyDown); return () => document.removeEventListener('keydown', handleKeyDown); }, [open, onClose]);
  if (!open) return null;
  return <div className="sheet-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><dialog open className="bottom-sheet" aria-modal="true" aria-labelledby="sheet-title"><div className="sheet-handle" aria-hidden="true" /><div className="sheet-heading"><div>{eyebrow && <p className="section-kicker">{eyebrow}</p>}<h2 id="sheet-title">{title}</h2></div><button className="icon-button" type="button" onClick={onClose} aria-label="Close"><X size={18} /></button></div><div className="sheet-content">{children}</div></dialog></div>;
}
