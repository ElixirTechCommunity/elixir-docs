import { LinkRows } from './link-rows';

const paths = [
  { href: '/docs/getting-started/backend-quickstart', label: 'Run the backend', title: 'Quickstart', description: 'Set up Node.js, PostgreSQL, and Prisma locally.' },
  { href: '/docs/architecture/backend-architecture', label: 'Understand the system', title: 'Architecture', description: 'Follow requests, identity, and persisted data.' },
  { href: '/docs/api-reference/authentication', label: 'Integrate with the API', title: 'API Reference', description: 'Find HTTP contracts and access requirements.' },
];

export function DocumentationPaths() {
  return (
    <LinkRows items={paths} label="Start exploring the documentation" />
  );
}
