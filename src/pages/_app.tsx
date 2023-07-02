import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { ErrorProvider } from '~/contexts/errorContext';
import '~/styles/globals.css';
import { getFromStorage, setInStorage } from '~/utils/storageUtils';

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const openAI_API_Key = getFromStorage('openAI_API_Key');
    if (!openAI_API_Key) {
      let openAI_API_Key: string | null = null;
      while (openAI_API_Key === null || openAI_API_Key?.trim() === '')
        openAI_API_Key = prompt(
          'OpenAI API Key is required from https://platform.openai.com/account/api-keys',
        );
      setInStorage('openAI_API_Key', openAI_API_Key);
    }
  });

  return (
    <ErrorProvider>
      <Component {...pageProps} />
    </ErrorProvider>
  );
};

export default MyApp;
