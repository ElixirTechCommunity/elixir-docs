import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      url: '/docs',
      title: (
        <span className="docs-brand">
          <span className="docs-brand-name">Elixir<span className="docs-brand-version">V4</span></span>
          <span className="docs-brand-caption">Developer documentation</span>
        </span>
      ),
    },
  };
}
