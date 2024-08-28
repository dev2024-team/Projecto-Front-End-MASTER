import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      {children}
    </div>
  );
}
