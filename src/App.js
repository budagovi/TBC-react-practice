import './App.css';
import React from 'react';

function App() {
  return (
    <div className='wrapper'>
      <header>
        <span className='title'>Hotel Aurora</span>
        <nav>
          <a href='#'>Home</a>
          <a href='#'>Rooms and Suites</a>
          <a href='#'>Facilities</a>
          <a href='#'>Contact Us</a>
          <button>Book Now</button>
        </nav>
      </header>
      <main>
        <article>
          <h1>About us</h1>
          <p>
            Welcome to Aurora Hotel, your exquisite haven of luxury and hospitality nestled in the heart of Sweden.
            Step into our grand lobby, adorned with contemporary art and plush furnishings, and feel the immediate embrace of
            enchantment, signaling the beginning of an unforgettable stay.
          </p>
          <p>
            Aurora Hotel is more than accommodation; it's a curated experience where modern luxury seamlessly blends with timeless charm.
            Our meticulously designed rooms offer sweeping views of the mountains, providing a tranquil sanctuary for relaxation.
            Whether you're here for business or leisure, our dedicated staff ensures that every need is met, fostering an atmosphere where
            genuine care and comfort thrive.
          </p>
          <p>
            At Aurora Hotel, we invite you to elevate your travel experience. Welcome to a world where every detail is crafted to make
            your journey extraordinary. Your time with us promises to be nothing short of exceptional—a perfect blend of luxury, comfort,
            and personalized service awaits you.
          </p>
        </article>
        <article>
          <h1>Our services</h1>
          <p>
            Discover the unparalleled services at Aurora Hotel, where your comfort is our priority. From the moment you arrive, our
            attentive staff is dedicated to ensuring your every need is met, creating an environment of genuine care and hospitality.
            Enjoy the convenience of our concierge services, where we cater to your requests, be it travel arrangements or local
            recommendations. Immerse yourself in relaxation with our rejuvenating spa treatments, designed to pamper and revitalize.
          </p>
          <p>
            Our commitment to excellence extends to our on-site dining, where culinary delights await. Whether it's a business meeting or a 
            special celebration, our event planning services ensure a seamless and memorable experience. At Aurora Hotel, we go beyond 
            accommodation, providing a range of services that enhance your stay, making it a distinctive blend of luxury and personalized 
            attention. Your journey with us is not just a stay; it's an experience crafted to exceed your expectations. Welcome to a world of 
            exceptional services at Aurora Hotel.
          </p>
        </article>
      </main>
      <footer>
        <div className='subscription'>
          <span>Subscribe to our newsletter</span>
          <div className='input-wrapper'>
            <input type='text' placeholder='Enter email' />
            <input type='submit' value="Subscribe" />
          </div>
        </div>
        <section className='links'>
          <a href='#'>Terms and Conditions</a>
          <a href='#'>Privacy Policy</a>
        </section>
      </footer>
    </div>
  )
}

export default App;
