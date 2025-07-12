import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ReduxProvider from './ReduxProvider';
import { Toaster } from '@/components/ui/sonner';
import LayoutClientWrapper from '@/components/LayoutClientWrapper';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'EduPortal',
  description: 'Book College Services',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        <ReduxProvider>
          <LayoutClientWrapper>{children}</LayoutClientWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
