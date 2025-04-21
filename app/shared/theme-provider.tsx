'use client';

import { Provider } from 'jotai';
// import hideRechartsConsoleError from '@core/utils/recharts-console-error';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

// hideRechartsConsoleError();

export function ThemeProvider({ children }: React.PropsWithChildren<{}>) {
  return (
    <NextThemeProvider
      enableSystem={false}
      themes={["light", "dark"]}
      defaultTheme={String("light")}
    >
      {children}
    </NextThemeProvider>
  );
}

export function JotaiProvider({ children }: React.PropsWithChildren<{}>) {
  return <Provider>{children}</Provider>;
}
