import localFont from 'next/font/local';
import './globals.css';
import AuthProvider from './components/AuthProvider';
import TokenContextProvider from '@/context/TokenContextProvider';

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
  title: 'Smoothify',
  description: 'Order Spotify playlists to minimise jarring transitions.',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <TokenContextProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <AuthProvider>{children}</AuthProvider>
        </body>
      </TokenContextProvider>
    </html>
  );
}
