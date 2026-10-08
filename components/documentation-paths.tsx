import Link from 'next/link';

const paths = [
  { href: '/docs/getting-started/backend-quickstart', label: 'Run the backend', title: 'Quickstart', description: 'Set up Node.js, PostgreSQL, and Prisma locally.' },
  { href: '/docs/architecture/backend-architecture', label: 'Understand the system', title: 'Architecture', description: 'Follow requests, identity, and persisted data.' },
  { href: '/docs/api-reference/authentication', label: 'Integrate with the API', title: 'API Reference', description: 'Find HTTP contracts and access requirements.' },
];

export function DocumentationPaths() {
  return (
    <nav className="documentation-paths" aria-label="Start exploring the documentation">
      {paths.map(({ href, label, title, description }) => (
        <Link key={href} href={href} className="documentation-path">
          <span className="documentation-path-label">{label}</span>
          <span className="documentation-path-title">{title}<span aria-hidden="true">↗</span></span>
          <span className="documentation-path-description">{description}</span>
        </Link>
      ))}
    </nav>
  );
}
