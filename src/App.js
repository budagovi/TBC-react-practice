import './App.css';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ReviewsContent from './components/Reviews/ReviewsContent';

function App() {
  return (
    <div className='wrapper'>
      <Header />
      <main>
       <ReviewsContent />
      </main>
      <Footer />
    </div>
  )
}

export default App;
