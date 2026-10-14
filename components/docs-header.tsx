'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';
import { SidebarTrigger, useSidebar } from 'fumadocs-ui/layouts/docs/slots/sidebar';
import { FullSearchTrigger } from 'fumadocs-ui/layouts/shared/slots/search-trigger';

export function DocsHeader() {
  const { resolvedTheme, setTheme } = useTheme();
  const { open, setOpen, mode } = useSidebar();
  const menu = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open || mode !== 'drawer') return;
    const drawer = document.getElementById('nd-sidebar-mobile');
    if (!drawer) return;
    const trigger = menu.current;
    const focusable = () => Array.from(drawer.querySelectorAll<HTMLElement>('a[href], button, [tabindex="0"]')).filter((item) => item.getClientRects().length > 0);
    const frame = requestAnimationFrame(() => focusable()[0]?.focus());
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
      }
      if (event.key !== 'Tab') return;
      const items = focusable();
      const target = event.shiftKey ? items.at(-1) : items[0];
      const edge = event.shiftKey ? items[0] : items.at(-1);
      if (document.activeElement === edge || !drawer?.contains(document.activeElement)) {
        event.preventDefault();
        target?.focus();
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('keydown', handleKey);
      trigger?.focus();
    };
  }, [open, mode, setOpen]);
  return (
    <header className="docs-header">
      <div className="docs-header-inner">
        <Link href="/docs" className="docs-brand" aria-label="ElixirV4 docs home">
          <Image src="/brand/elixir-mark-white.png" width={92} height={96} alt="" className="docs-mark" />
          <span>ElixirV4</span><span className="docs-brand-muted">docs</span>
        </Link>
        <nav className="docs-top-links" aria-label="Main navigation">
          <Link href="/docs/guides/add-or-change-an-api-endpoint">Guides</Link>
          <Link href="/docs/api-reference/authentication">API</Link>
          <Link href="/docs/contributing/contribute-to-elixir-v4">Contributing</Link>
        </nav>
        <div className="docs-header-actions">
          <FullSearchTrigger className="docs-search" />
          <a className="docs-github" href="https://github.com/ElixirTechCommunity/elixir-docs">GitHub</a>
          <button type="button" onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')} aria-label="Toggle color theme">Theme</button>
          <SidebarTrigger ref={menu} className="docs-menu">Menu</SidebarTrigger>
        </div>
      </div>
    </header>
  );
}
