import type { AppProps } from 'next/app';
import { ErrorProvider } from '~/contexts/errorContext';
import '~/styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ErrorProvider>
      <Component {...pageProps} />
    </ErrorProvider>
  );
};

export default MyApp;
