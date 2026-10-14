import { source } from '@/lib/source';
import { baseOptions } from '@/lib/layout.shared';
import { DocumentationLayout } from '@/components/docs-layout';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocumentationLayout tree={source.getPageTree()} {...baseOptions()} statuses={Object.fromEntries(source.getPages().map((page) => [page.url, page.data.status]))}>
      {children}
    </DocumentationLayout>
  );
}
