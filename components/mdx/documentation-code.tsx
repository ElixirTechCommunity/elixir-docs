import type { ComponentProps } from 'react';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';

export function DocumentationCode({ title, children, ...props }: ComponentProps<typeof CodeBlock>) {
  return (
    <div className="docs-code">
      {title ? <p className="docs-code-caption">{title}</p> : null}
      <CodeBlock {...props} title={undefined} icon={null} viewportProps={{ 'aria-label': typeof title === 'string' ? title : 'Code example' }}>
        <Pre>{children}</Pre>
      </CodeBlock>
    </div>
  );
}
