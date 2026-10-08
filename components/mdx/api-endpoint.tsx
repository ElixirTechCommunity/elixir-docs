import type { ReactNode } from 'react';

type ApiEndpointProps = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  auth?: 'None' | 'Required' | 'Role required' | 'Conditional';
  children?: ReactNode;
};

export function ApiEndpoint({ method, path, auth, children }: ApiEndpointProps) {
  const access = auth === 'None' ? 'Public' : auth === 'Role required' ? 'Authenticated · Role restricted' : auth === 'Conditional' ? 'Conditional authentication' : 'Authenticated';
  return (
    <section aria-label={`${method} ${path}`} className="api-endpoint not-prose" data-method={method}>
      <div className="api-endpoint-heading">
        <strong className="api-method">{method}</strong>
        <code className="api-path">{path}</code>
        {auth ? <span className="api-access">{access}</span> : null}
      </div>
      {children ? <div className="api-purpose">{children}</div> : null}
    </section>
  );
}
