import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Geist, Geist_Mono } from 'next/font/google';
import type { Metadata } from 'next';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap', fallback: ['system-ui', 'Arial'] });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap', fallback: ['ui-monospace', 'Menlo', 'monospace'] });

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'https://developer.elixircommunity.in';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ElixirV4 Developer Documentation',
    template: '%s | ElixirV4 Developer Documentation',
  },
  description: 'Technical documentation for ElixirV4 contributors and API consumers.',
  openGraph: {
    type: 'website',
    siteName: 'ElixirV4 Developer Documentation',
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen font-sans">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
