import { Header } from './_components/header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex-col md:flex w-full'>
      <Header />
      <div className='min-w-full w-full'>{children}</div>
    </div>
  );
}
