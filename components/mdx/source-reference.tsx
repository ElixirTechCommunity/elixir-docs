type SourceReferenceProps = {
  href?: string;
  children: string;
};

export function SourceReference({ href, children }: SourceReferenceProps) {
  return (
    <p className="source-reference not-prose">
      <span className="source-reference-label">Source</span>
      {href ? <a href={href}><code>{children}</code></a> : <code>{children}</code>}
    </p>
  );
}
