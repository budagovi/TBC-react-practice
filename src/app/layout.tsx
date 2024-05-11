import { Inter } from "next/font/google";
import "@/src/globals.css";
import style from './layout.module.css'

import Header from '../components/Main Navigation/Header'
import Footer from '../components/Footer';
import { ReactNode } from "react";
import { Locale } from "@/i18n.config";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Aurora Plants",
  description: "Online plants shopping platform",
};

const RootLayout = async ({ children }: { children: ReactNode, params: { lang: Locale } }) => {


  let lang = cookies().get('locale')

  return (
    <html lang={lang ? lang.value : 'en'}>
      <body className={inter.className} id="root">
        <div id="overlay"></div>
        <Header />
        <div className={`${style.mainWrapper} gl-max-width`}>
          {children}
        </div>
        <Footer lang={lang} />
      </body>
    </html>
  );
}

export default RootLayout;
