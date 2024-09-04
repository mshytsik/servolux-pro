import Header from './ui/layout/Header/Header';
import Main from './ui/layout/Main/Main';
import Footer from './ui/layout/Footer/Footer';

import { manrope } from './ui/fonts';
import './globals.scss';

export const metadata = {
  title: {
    template: '%s | Servolux Professional',
    default: 'Servolux Professional',
  },
  description: 'Servolux Professional',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={manrope.className}>
        <Header />

        <Main>{children}</Main>

        <Footer />
      </body>
    </html>
  );
}
