import localFont from 'next/font/local';
import './globals.css';
import AuthProvider from './components/AuthProvider';
import TokenContextProvider from '@/context/TokenContextProvider';
import { description, title } from './constants';
import Navbar from './components/navbar';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata = {
  title: title,
  description: description,
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <TokenContextProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navbar></Navbar>
          <AuthProvider>{children}</AuthProvider>
        </body>
      </TokenContextProvider>
    </html>
  );
}
