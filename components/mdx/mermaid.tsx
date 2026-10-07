'use client';

import { useEffect, useId, useState } from 'react';
import { useTheme } from 'next-themes';

export function Mermaid({ chart }: { chart: string }) {
  const id = useId().replaceAll(':', '');
  const { resolvedTheme } = useTheme();
  const key = `${resolvedTheme}:${chart}`;
  const [result, setResult] = useState<{ key: string; svg?: string; error?: boolean }>();

  useEffect(() => {
    if (!resolvedTheme) return;
    let active = true;

    async function render() {
      try {
        const { default: mermaid } = await import('mermaid');
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          fontFamily: 'inherit',
          theme: resolvedTheme === 'dark' ? 'dark' : 'default',
          flowchart: { useMaxWidth: false },
          sequence: { useMaxWidth: false },
          er: { useMaxWidth: false },
        });
        const { svg } = await mermaid.render(`diagram-${id}`, chart);
        if (active) setResult({ key, svg });
      } catch {
        if (active) setResult({ key, error: true });
      }
    }

    void render();
    return () => { active = false; };
  }, [chart, id, key, resolvedTheme]);

  return (
    <figure className="not-prose my-6 min-w-0 rounded-lg border border-fd-border bg-fd-card p-4">
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Scrollable architecture diagram">
        {result?.key === key && result.svg ? (
          <div className="[&_svg]:mx-auto" dangerouslySetInnerHTML={{ __html: result.svg }} />
        ) : (
          <p className="text-sm text-fd-muted-foreground" role="status">
            {result?.key === key && result.error ? 'Diagram could not be rendered. Its source is available below.' : 'Loading diagram…'}
          </p>
        )}
      </div>
      <details className="mt-3 text-sm text-fd-muted-foreground">
        <summary className="cursor-pointer">Diagram source</summary>
        <pre className="mt-2 overflow-x-auto"><code>{chart}</code></pre>
      </details>
    </figure>
  );
}
