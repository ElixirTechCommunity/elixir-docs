import type { ReactNode } from 'react';

type ApiEndpointProps = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  auth?: 'None' | 'Required' | 'Role required';
  children?: ReactNode;
};

export function ApiEndpoint({ method, path, auth, children }: ApiEndpointProps) {
  return (
    <section aria-label={`${method} ${path}`} className="not-prose my-6 overflow-hidden rounded-md border border-fd-border bg-fd-card">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-fd-border px-4 py-3 font-mono text-sm">
        <strong className="text-fd-primary">{method}</strong>
        <code className="break-all text-fd-foreground">{path}</code>
        {auth ? <span className="ml-auto font-sans text-xs text-fd-muted-foreground">Authentication: {auth}</span> : null}
      </div>
      {children ? <div className="px-4 py-3 text-sm text-fd-muted-foreground">{children}</div> : null}
    </section>
  );
}
