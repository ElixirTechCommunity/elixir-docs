import type { ReactNode } from 'react';

export function TechnicalDebt({ children }: { children: ReactNode }) {
  return (
    <aside className="technical-debt plain-note not-prose" aria-label="Technical debt">
      <strong>Technical Debt.</strong>{' '}
      <div>{children}</div>
    </aside>
  );
}
