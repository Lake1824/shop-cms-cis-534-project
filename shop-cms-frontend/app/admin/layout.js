import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function AdminLayout({ children }) {
  return (
      <UserProvider>
        {children}
      </UserProvider>
  );
}
