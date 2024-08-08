import { ReactNode } from 'react';
import { cookieToInitialState } from '@alchemy/aa-alchemy/config';
import { config, queryClient } from '../../../utilities/alchemy-config';
import { headers } from 'next/headers';
import { AlchemyAccountProvider, AlchemyAccountsProviderProps } from '@alchemy/aa-alchemy/react';

interface Props {
  children: ReactNode;
}

// This is the place responsible for grouping all providers from the app
export const MainProvider = ({ children }: Props) => {
  const initialState = cookieToInitialState(config, headers().get('cookie') ?? undefined);
  return (
    <AlchemyAccountProvider config={config} queryClient={queryClient} initialState={initialState}>
      {children}
    </AlchemyAccountProvider>
  );
};
