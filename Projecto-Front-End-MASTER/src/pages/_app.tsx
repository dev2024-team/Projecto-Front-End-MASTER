import 'bootstrap/dist/css/bootstrap.min.css'; // Importando o Bootstrap CSS
import { AuthProvider } from '@/context/auth/AuthContext';
import '../styles/globals.css';
import { ReactElement, ReactNode } from 'react';
import { AppProps } from 'next/app';

type NextPageWithLayout = AppProps['Component'] & {
  getLayout?: (page: ReactElement) => ReactNode;
};

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = (Component as NextPageWithLayout).getLayout || ((page) => page);

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
