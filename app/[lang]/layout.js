import { Inter } from "next/font/google";
import "../globals.css";
import style from './Layout.module.css'

import Header from '../../components/Header'
import Footer from '../../components/Footer';

import { getDictionary } from './dictionaries'
import { cookies } from "next/headers";
import { LANG_COOKIE_KEY } from "@/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Aurora Plants",
  description: "Online plants shopping platform",
};

const RootLayout = async ({ children, params: {lang} }) => {

  // get dictionary and store language in cookies
  const dict = await getDictionary(lang)

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header lang={lang}/>
          <div className={style.mainWrapper}>
            {children}
          </div>
        <Footer lang={lang}/>
      </body>
    </html>
  );
}

export default RootLayout
