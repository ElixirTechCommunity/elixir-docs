'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useSyncExternalStore } from 'react';
import { SidebarTrigger, useSidebar } from 'fumadocs-ui/layouts/docs/slots/sidebar';
import { Moon, Sun } from 'lucide-react';
import { DocsSearchTrigger } from './docs-search';

function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
}

const currentThemeIsDark = () => document.documentElement.classList.contains('dark');

export function DocsHeader() {
  const { setTheme } = useTheme();
  const isDark = useSyncExternalStore(subscribeTheme, currentThemeIsDark, () => false);
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
          <DocsSearchTrigger />
          <div className="docs-icon-actions">
            <a className="docs-icon-button" href="https://github.com/ElixirTechCommunity/elixir-docs" aria-label="GitHub repository">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z" /></svg>
            </a>
            <button className="docs-icon-button docs-theme-toggle" type="button" onClick={() => setTheme(isDark ? 'light' : 'dark')} aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}>
              <Sun className="docs-theme-sun" size={16} strokeWidth={1.5} aria-hidden="true" />
              <Moon className="docs-theme-moon" size={16} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
          <SidebarTrigger ref={menu} className="docs-menu">Menu</SidebarTrigger>
        </div>
      </div>
    </header>
  );
}
