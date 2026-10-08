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
          theme: 'base',
          themeVariables: resolvedTheme === 'dark' ? {
            darkMode: true, background: '#1b1821', primaryColor: '#30243f',
            primaryTextColor: '#eee8f5', primaryBorderColor: '#9478b3',
            lineColor: '#b5a4c8', secondaryColor: '#262330', tertiaryColor: '#201d28',
          } : {
            background: '#ffffff', primaryColor: '#f1eaf8', primaryTextColor: '#282032',
            primaryBorderColor: '#8a699e', lineColor: '#6f5b80',
            secondaryColor: '#f6f3f9', tertiaryColor: '#faf8fc',
          },
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
    <figure className="docs-diagram not-prose">
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Scrollable diagram">
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
