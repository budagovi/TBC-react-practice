import style from './App.module.css';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className={style.wrapper}>
      <Header />
      <main>
        <Outlet/>
      </main>
      <Footer />
    </div>
  )
}

export default App;
