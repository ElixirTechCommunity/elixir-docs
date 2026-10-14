import type { ReactNode } from 'react';

export function PlainCallout({ type, title, children }: { type?: string; title?: ReactNode; children?: ReactNode }) {
  const lead = type === 'warning' || type === 'warn' || type === 'error' ? 'Warning.' : type === 'important' ? 'Important.' : 'Note.';
  return <aside className="plain-note"><strong>{lead}</strong>{title ? <> <strong>{title}</strong></> : null}{' '}<div>{children}</div></aside>;
}
