import style from './Search.module.css';
import SearchIcon from '../Icons/Search';

const Search = () => {
  return (
    <form action="#" className={style.wrapper}>
      <input type="text" placeholder='Search for plants' />
      <button><SearchIcon className={style.searchIcon} />  </button>
    </form>
  )
}

export default Search;