import { Inter } from "next/font/google";
import "./globals.css";

import Header from '../components/Header'
import Footer from '../components/Footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Aurora Plants",
  description: "Online plants shopping platform",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
          <main>
            <div className="main-wrapper">
              {children}
            </div>
          </main>
        <Footer />
      </body>
    </html>
  );
}

export default RootLayout
