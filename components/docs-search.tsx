'use client';

import { Fragment, useMemo, useSyncExternalStore } from 'react';
import { Search } from 'lucide-react';
import { Dialog } from '@base-ui/react/dialog';
import { useSearchContext, type SharedProps } from 'fumadocs-ui/contexts/search';
import { useDocsSearch } from 'fumadocs-core/search/client';
import { fetchClient } from 'fumadocs-core/search/client/fetch';
import type { SortedResult } from 'fumadocs-core/search';
import { createMarkdownRenderer } from 'fumadocs-core/content/md';
import rehypeRaw from 'rehype-raw';
import {
  SearchDialog, SearchDialogClose, SearchDialogContent, SearchDialogHeader,
  SearchDialogInput, SearchDialogList, SearchDialogListItem, SearchDialogOverlay,
} from 'fumadocs-ui/components/dialog/search';

const subscribe = () => () => {};
const markdown = createMarkdownRenderer({
  remarkRehypeOptions: { allowDangerousHtml: true },
  rehypePlugins: [rehypeRaw],
});

export function DocsSearchTrigger() {
  const { dialogHandle } = useSearchContext();
  const apple = useSyncExternalStore(subscribe, () => /Mac|iPhone|iPad|iPod/.test(navigator.platform), () => false);
  return (
    <Dialog.Trigger handle={dialogHandle} className="docs-search-trigger" aria-label="Search documentation">
      <Search size={14} strokeWidth={1.5} aria-hidden="true" />
      <span className="docs-search-label">Search</span>
      <span className="docs-search-shortcut" aria-hidden="true"><kbd>{apple ? '⌘' : 'Ctrl'}</kbd><kbd>K</kbd></span>
    </Dialog.Trigger>
  );
}

type PageGroup = SortedResult & { snippets: SortedResult[] };

function groupResults(results: SortedResult[]): PageGroup[] {
  const groups = new Map<string, PageGroup>();
  for (const result of results) {
    const url = result.url.split('#')[0];
    let group = groups.get(url);
    if (!group) {
      group = { ...result, id: url, url, type: 'page', snippets: [] };
      groups.set(url, group);
    }
    if (result.type === 'page') {
      group.content = result.content;
      group.breadcrumbs = result.breadcrumbs;
    } else {
      group.snippets.push(result);
    }
  }
  return Array.from(groups.values(), (group) => ({
    ...group,
    snippets: (group.snippets.some((item) => item.type === 'text')
      ? group.snippets.filter((item) => item.type === 'text') : group.snippets).slice(0, 3),
  }));
}

function ResultText({ content, highlight }: { content: string; highlight: boolean }) {
  return <markdown.Markdown components={{
    mark: ({ children }) => highlight ? <mark>{children}</mark> : <span>{children}</span>,
    a: ({ children }) => <span>{children}</span>,
    code: ({ children }) => <code>{typeof children === 'string' ? children.split(/(<mark>[\s\S]*?<\/mark>)/g).map((part, index) => {
      if (!part.startsWith('<mark>')) return part;
      const text = part.slice(6, -7);
      return highlight ? <mark key={index}>{text}</mark> : <span key={index}>{text}</span>;
    }) : children}</code>,
  }}>{content}</markdown.Markdown>;
}

export function DocsSearchDialog(props: SharedProps) {
  const { search, setSearch, query } = useDocsSearch({ client: fetchClient(), delayMs: 100 });
  const groups = useMemo(() => groupResults(Array.isArray(query.data) ? query.data : []), [query.data]);
  const empty = search.trim().length === 0;
  const highlight = search.trim().length >= 2;

  return (
    <SearchDialog {...props} search={search} onSearchChange={setSearch} isLoading={query.isLoading}>
      <SearchDialogOverlay className="docs-search-backdrop" />
      <SearchDialogContent className="docs-search-dialog" finalFocus={() => document.querySelector<HTMLButtonElement>('.docs-search-trigger')}>
        <SearchDialogHeader className="docs-search-input-row">
          <Search size={18} strokeWidth={1.5} aria-hidden="true" />
          <SearchDialogInput className="docs-search-input" placeholder="Search documentation" aria-label="Search documentation" />
          <SearchDialogClose className="docs-search-close"><kbd>Esc</kbd></SearchDialogClose>
        </SearchDialogHeader>
        {empty ? <p className="docs-search-message" role="status">Type to search the documentation.</p> : null}
        {!empty && query.error ? <p className="docs-search-message" role="status">Search is unavailable. Try again.</p> : null}
        <SearchDialogList
          className="docs-search-results"
          items={empty ? [] : groups}
          Empty={() => empty || query.error ? null : <p className="docs-search-message" role="status">{query.isLoading ? 'Searching…' : <>No results for &quot;{search}&quot;</>}</p>}
          Item={({ item, onClick }) => {
            const group = groups.find((entry) => entry.id === item.id);
            if (!group) return null;
            return (
              <SearchDialogListItem item={item} onClick={onClick} className="docs-search-result">
                <span className="docs-search-breadcrumb">{(group.breadcrumbs?.length ? group.breadcrumbs : ['Docs']).map((part, index) => <Fragment key={index}>{index > 0 ? ' / ' : ''}{part.replace(/<\/?mark>/g, '')}</Fragment>)}</span>
                <span className="docs-search-title"><ResultText content={group.content} highlight={highlight} /></span>
                {group.snippets.map((snippet) => <span className="docs-search-snippet" key={snippet.id}><ResultText content={snippet.content} highlight={highlight} /></span>)}
              </SearchDialogListItem>
            );
          }}
        />
      </SearchDialogContent>
    </SearchDialog>
  );
}
