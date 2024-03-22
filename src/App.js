import './App.css';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Store from './components/Store/Store';
import Contact from './components/Contact/Contact';

function App() {
  return (
    <div className='wrapper'>
      <Header />
      <main>
        <Contact/>
        {/* <Store/> */}
      </main>
      <Footer />
    </div>
  )
}

export default App;
