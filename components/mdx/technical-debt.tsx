import type { ReactNode } from 'react';

export function TechnicalDebt({ children }: { children: ReactNode }) {
  return (
    <aside className="technical-debt not-prose" aria-label="Technical debt">
      <strong className="block font-medium">Technical Debt</strong>
      <div className="mt-1 text-fd-muted-foreground">{children}</div>
    </aside>
  );
}
