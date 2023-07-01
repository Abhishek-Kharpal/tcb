import { createContext, useState, type ReactNode } from 'react';
import { Snackbar } from '@mui/material';

export const ErrorContext = createContext<{
  setError: (error: string | null) => void;
}>({ setError: console.error });

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<string | null>(null);

  return (
    <ErrorContext.Provider value={{ setError }}>
      {children}
      {error && (
        <Snackbar
          open={Boolean(error)}
          autoHideDuration={5000}
          message={error}
          onClose={() => setError(null)}
        />
      )}
    </ErrorContext.Provider>
  );
};
