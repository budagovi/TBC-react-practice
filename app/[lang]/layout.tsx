import { Inter } from "next/font/google";
import "../globals.css";
import style from './Layout.module.css'

import Header from '../../components/Header'
import Footer from '../../components/Footer';
import { ReactNode } from "react";
import { Locale } from "@/i18n.config";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Aurora Plants",
  description: "Online plants shopping platform",
};

const RootLayout = async ({ children, params: { lang } }: { children: ReactNode, params: { lang: Locale } }) => {

  return (
    <html lang={lang}>
      <body className={inter.className}>
        <Header lang={lang} />
        <div className={style.mainWrapper}>
          {children}
        </div>
        <Footer lang={lang} />
      </body>
    </html>
  );
}

export default RootLayout
