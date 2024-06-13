import { Inter } from "next/font/google";
import "@/src/globals.css";
import style from './layout.module.css'

import Header from '@/src/components/Main Navigation/Header'
import Footer from '@/src/components/Footer';
import { ReactNode } from "react";
import { Locale } from "@/src/lib/next-internationalization/i18n.config";
import { I18nProviderClient } from '../../lib/next-internationalization/client'
import CartContextProvider from "@/src/context/cart";

import { App as AntdApp } from "antd";
import { getSession } from "@/src/lib/jose-auth/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Aurora Plants",
  description: "Online plants shopping platform",
};

const RootLayout = async ({ params: { locale }, children }: { params: { locale: Locale }, children: ReactNode }) => {

  // check for authorized user
  const isLoggedIn = await getSession();

  return (
    <html lang={locale}>
      <body className={inter.className} id="root">
        <I18nProviderClient locale={locale}>
          <AntdApp>
            <CartContextProvider>
              <div id="overlay"></div>
              <Header isLoggedIn={isLoggedIn} />
              <div className={`${style.mainWrapper} gl-max-width`}>
                {children}
              </div>
              <Footer />
            </CartContextProvider>
          </AntdApp>
        </I18nProviderClient>
      </body>
    </html>
  );
}

export default RootLayout;
