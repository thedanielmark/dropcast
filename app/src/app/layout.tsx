import '@/styles/globals.css';

import { Metadata } from 'next';
import { ReactNode } from 'react';

import { MainProvider } from '@/components/providers/MainProvider';
import { MainLayout } from '@/components/templates/MainLayout';

export const metadata: Metadata = {
  title: 'dropify-app',
  description: 'Dropify is a web3 airdrop management platform.'
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white" suppressHydrationWarning>
        <MainProvider>
          <MainLayout>
            <main>{children}</main>
          </MainLayout>
        </MainProvider>
      </body>
    </html>
  );
};

export default RootLayout;
