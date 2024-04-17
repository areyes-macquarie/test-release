import { TabSessionProvider } from '@/providers/tab-session-provider';

export default function TabsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <TabSessionProvider>{children}</TabSessionProvider>;
}
