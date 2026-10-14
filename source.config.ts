import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { remarkMdxMermaid } from 'fumadocs-core/mdx-plugins/remark-mdx-mermaid';
import { pageSchema } from 'fumadocs-core/source/schema';
import { z } from 'zod';

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    lastModified: true,
    schema: pageSchema.extend({ status: z.enum(['complete', 'draft', 'stub']).default('complete') }),
    postprocess: { includeProcessedMarkdown: true },
  },
});

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: {
          name: 'elixir-light', type: 'light',
          colors: { 'editor.background': '#f3f1ed', 'editor.foreground': '#1c1b19' },
          tokenColors: [
            { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#6e6b65' } },
            { scope: ['keyword', 'storage', 'entity.name.function'], settings: { foreground: '#1a4fd1' } },
          ],
        },
        dark: {
          name: 'elixir-dark', type: 'dark',
          colors: { 'editor.background': '#1a1918', 'editor.foreground': '#ebe9e4' },
          tokenColors: [
            { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#8d8a83' } },
            { scope: ['keyword', 'storage', 'entity.name.function'], settings: { foreground: '#8db0ff' } },
          ],
        },
      },
    },
    remarkPlugins: [remarkMdxMermaid],
  },
});
