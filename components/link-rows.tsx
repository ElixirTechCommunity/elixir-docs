import Link from 'next/link';

type LinkRow = { href: string; title: string; description: string; label?: string };

export function LinkRows({ items, label = 'Related documentation' }: { items: LinkRow[]; label?: string }) {
  return (
    <nav className="link-rows not-prose" aria-label={label}>
      {items.map((item) => (
        <Link key={item.href} href={item.href} aria-label={item.label ? `${item.title}: ${item.label}` : undefined}>
          <span className="link-row-title">{item.title}</span>
          <span className="link-row-description">{item.description}</span>
          <span className="link-row-arrow" aria-hidden="true">→</span>
        </Link>
      ))}
    </nav>
  );
}
