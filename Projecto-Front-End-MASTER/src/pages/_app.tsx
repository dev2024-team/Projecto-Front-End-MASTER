import 'bootstrap/dist/css/bootstrap.min.css'; // Importando o Bootstrap CSS
import { AuthProvider } from '@/context/auth/AuthContext';
import { ReactNode } from 'react';

function MyApp({ Component, pageProps }: { Component: React.ElementType; pageProps: any }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
