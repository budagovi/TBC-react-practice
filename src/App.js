import './App.css';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Store from './components/Store/Store';

function App() {
  return (
    <div className='wrapper'>
      <Header />
      <main>
        <Store/>
      </main>
      <Footer />
    </div>
  )
}

export default App;
