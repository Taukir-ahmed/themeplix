import { createContext, useContext } from 'react';

export type GetAppReason = 'hd' | 'premium' | 'generic';

export interface GetAppApi {
  open: (reason?: GetAppReason) => void;
}

export const GetAppContext = createContext<GetAppApi | null>(null);

export function useGetApp(): GetAppApi {
  const api = useContext(GetAppContext);
  if (!api) throw new Error('useGetApp must be used inside <GetAppProvider>');
  return api;
}
