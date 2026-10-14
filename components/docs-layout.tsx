'use client';

import { createContext, use } from 'react';
import { usePathname } from 'next/navigation';
import { DocsLayout, type DocsLayoutProps } from 'fumadocs-ui/layouts/docs';
import { SidebarItem } from 'fumadocs-ui/components/sidebar/base';
import type { SidebarPageTreeComponents } from 'fumadocs-ui/components/sidebar/page-tree';
import { DocsHeader } from './docs-header';

type Status = 'complete' | 'draft' | 'stub';
const PageStatuses = createContext<Record<string, Status>>({});

const Item: SidebarPageTreeComponents['Item'] = ({ item }) => {
  const status = use(PageStatuses)[item.url] ?? 'complete';
  const pathname = usePathname();
  return (
    <SidebarItem href={item.url} active={pathname === item.url} external={item.external} className="docs-sidebar-item">
      {item.name}{status !== 'complete' ? <span className="docs-stub">stub</span> : null}
    </SidebarItem>
  );
};

export function DocumentationLayout({ statuses, ...props }: DocsLayoutProps & { statuses: Record<string, Status> }) {
  return (
    <PageStatuses value={statuses}>
      <DocsLayout {...props} tabs={false} slots={{ header: DocsHeader }} themeSwitch={{ enabled: false }} sidebar={{ collapsible: false, defaultOpenLevel: 10, components: { Item } }} />
    </PageStatuses>
  );
}
