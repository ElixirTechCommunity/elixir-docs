import type { ReactNode } from 'react';

export function TechnicalDebt({ children }: { children: ReactNode }) {
  return (
    <aside className="not-prose my-6 border-s-4 border-amber-600 bg-amber-500/10 px-4 py-3 text-sm text-fd-foreground" aria-label="Technical debt">
      <strong className="block font-medium">Technical Debt</strong>
      <div className="mt-1 text-fd-muted-foreground">{children}</div>
    </aside>
  );
}
