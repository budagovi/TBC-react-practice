import style from './Header.module.css';
import Cart from '../Icons/Cart';

const Header = () => {
  return (
    <header className={style.wrapper}>
      <span className={style.title}>Aurora Plants</span>
      <nav className={style.links}>
        <a href='#'>Home</a>
        <a href='#'>Store</a>
        <a href='#'>About Us</a>
        <a href='#'>Contact Us</a>
        <a href='#'>My Account</a>
        <Cart className={style.cartIcon} />
      </nav>
    </header>
  )
}

export default Header;