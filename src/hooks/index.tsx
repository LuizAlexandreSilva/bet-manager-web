import React, { ReactElement } from 'react';
import { AuthProvider } from './auth';

function AppProvider({ children }: any): ReactElement {
  return <AuthProvider>{children}</AuthProvider>;
}

export default AppProvider;
