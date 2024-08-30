// components/Layout1.tsx
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout1 = ({ children }: LayoutProps) => {
  return (
    <div style={{ border: '2px solid blue', padding: '20px' }}>
      <h1>Layout 1</h1>
      <main>{children}</main>
    </div>
  );
};

export default Layout1;
