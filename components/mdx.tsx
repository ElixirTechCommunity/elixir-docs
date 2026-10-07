import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { ApiEndpoint } from './mdx/api-endpoint';
import { SourceReference } from './mdx/source-reference';
import { TechnicalDebt } from './mdx/technical-debt';
import { Mermaid } from './mdx/mermaid';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
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
