'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { SessionProvider } from 'next-auth/react';

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <SessionProvider>{children}</SessionProvider>
    </Provider>
  );
}
