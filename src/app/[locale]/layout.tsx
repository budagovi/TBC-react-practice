import { Inter } from "next/font/google";
import "@/src/globals.css";
import style from './layout.module.css'

import Header from '@/src/components/Main Navigation/Header'
import Footer from '@/src/components/Footer';
import { ReactNode } from "react";
import { Locale } from "@/i18n.config";
import { I18nProviderClient } from '../../locales/client'
import CartContextProvider from "@/src/context/cart";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Aurora Plants",
  description: "Online plants shopping platform",
};

const RootLayout = async ({ params: { locale }, children }: { params: { locale: Locale }, children: ReactNode }) => {

  return (
    <html lang={locale}>
      <body className={inter.className} id="root">
        <I18nProviderClient locale={locale}>
          <CartContextProvider>
            <div id="overlay"></div>
            <Header />
            <div className={`${style.mainWrapper} gl-max-width`}>
              {children}
            </div>
            <Footer />
          </CartContextProvider>
        </I18nProviderClient>
      </body>
    </html>
  );
}

export default RootLayout;
