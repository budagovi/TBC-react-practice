import style from './Header.module.css';
import CartIcon from '../Icons/Cart';
import ProfileIcon from '../Icons/Profile';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className={style.wrapper}>
      <h1>Aurora Plants</h1>
      <nav className={style.links}>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/store'>Store</NavLink>
        <NavLink to='/about'>About Us</NavLink>
        <NavLink to='/contact'>Contact Us</NavLink>
        <NavLink to='/cart'>
          <CartIcon className={style.cartIcon} />
        </NavLink>
        <NavLink to='/profile'>
          <ProfileIcon className={style.profileIcon} />
        </NavLink>
      </nav>
    </header>
  )
}

export default Header;