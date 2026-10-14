import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { ApiEndpoint } from './mdx/api-endpoint';
import { SourceReference } from './mdx/source-reference';
import { TechnicalDebt } from './mdx/technical-debt';
import { Mermaid } from './mdx/mermaid';
import { PlainCallout } from './mdx/plain-callout';
import { DocumentationCode } from './mdx/documentation-code';
import { LinkRows } from './link-rows';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Callout: PlainCallout,
    pre: DocumentationCode,
    LinkRows,
    table: (props) => <div className="docs-table" role="region" aria-label="Scrollable table" tabIndex={0}><table {...props} /></div>,
    li: (props) => props.className?.includes('task-list-item')
      ? <li {...props}><label>{props.children}</label></li>
      : <li {...props} />,
    ApiEndpoint,
    SourceReference,
    TechnicalDebt,
    Mermaid,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
