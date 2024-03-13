import style from './Header.module.css';

const Header = () => {
  return (
    <header className={style.wrapper}>
      <span className={style.title}>Hotel Aurora</span>
      <nav className={style.links}>
        <a href='#'>Home</a>
        <a href='#'>Rooms and Suites</a>
        <a href='#'>Facilities</a>
        <a href='#'>Contact Us</a>
        <a href='#'>Reviews</a>
        <button>Book Now</button>
      </nav>
    </header>
  )
}

export default Header;