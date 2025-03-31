import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import QueryProviders from '../reactQuery/provider/providers';
import { ToastContainer } from 'react-toastify';
import { TokenProvider } from '@/context/token.context';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Token Console',
  description: 'Copilot app for token console',
};

const theme = 'light';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={theme}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] h-screen`}
      >
        <TokenProvider>
          <QueryProviders>{children}</QueryProviders>
        </TokenProvider>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={true}
          rtl={false}
          draggable
          theme={theme}
        />
      </body>
    </html>
  );
}
