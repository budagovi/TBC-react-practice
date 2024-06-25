// --- style
import style from '@/src/app/layouts.module.css'
import "@/src/globals.css";
import "@/src/antd-override.css"
// --- nextjs api
import { Inter } from "next/font/google";
// --- components
import Header from '@/src/components/Main Navigation/Header'
import Footer from '@/src/components/Footer/Footer';
// --- context
import CartContextProvider from "@/src/context/cart";
// --- antd
import { App as AntdApp } from "antd";
// --- jose-auth api
import { getSession } from "@/src/lib/jose-auth/auth";
// --- next-internationalization
import { Locale } from "@/src/lib/next-internationalization/i18n.config";
import { I18nProviderClient } from '../../lib/next-internationalization/client'


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Aurora Plants",
  description: "Online Plants Shopping Platform",
};

interface IProps {
  params: {
    locale: Locale
  },
  children: React.ReactNode
}

const RootLayout = async ({ params: { locale }, children }: IProps) => {

  // check for authorized user
  const isLoggedIn = await getSession();

  return (
    <html lang={locale} data-theme='light'>
      <body className={inter.className} id="root">
        <I18nProviderClient locale={locale}>
            <AntdApp>
              <CartContextProvider>
                <div id="overlay"></div>
                <Header isLoggedIn={isLoggedIn} />
                <div className={`${style.root_layout} gl-max-width`} style={{display: 'none'}}>
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
