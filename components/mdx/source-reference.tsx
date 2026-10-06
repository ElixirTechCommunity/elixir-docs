type SourceReferenceProps = {
  href?: string;
  children: string;
};

export function SourceReference({ href, children }: SourceReferenceProps) {
  const label = <>Source: <code>{children}</code></>;
  return <p className="not-prose mt-6 text-sm text-fd-muted-foreground">{href ? <a className="underline underline-offset-4" href={href}>{label}</a> : label}</p>;
}
