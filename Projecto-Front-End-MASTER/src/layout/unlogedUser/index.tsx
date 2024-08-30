// components/Layout2.tsx
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout2 = ({ children }: LayoutProps) => {
  return (
    <div style={{ border: '2px solid green', padding: '20px' }}>
      <h1>Layout 2</h1>
      <main>{children}</main>
    </div>
  );
};

export default Layout2;
