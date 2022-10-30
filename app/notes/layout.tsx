import { Sidebar } from './sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='flex'>
      <Sidebar />
      <div className='ml-4'>{children}</div>
    </main>
  );
}
