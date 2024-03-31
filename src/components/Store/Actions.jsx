import style from './Actions.module.css';
import SearchIcon from '../../Icons/Search';

const Actions = ({ search, sort }) => {

  // debounce
  let timer;
  const SearchChangeHandler = (e) => {
    const text = e.target.value;

    clearTimeout(timer)
    timer = setTimeout(() => {
      search(text.toLowerCase())
    }, 1000);
  }

  // sort handler
  const toggleSortHandler = (e) => {
    e.target.classList.toggle(`${ style.active}`)
    const bool = e.target.classList.contains(`${ style.active}`) 
    sort(bool)
  }

  return (
    <div className={style.wrapper}>
      <div className={style.inputWrapper}>
        <form action="">
          <input
            id='search'
            type="text"
            placeholder='Search for plants'
            onChange={SearchChangeHandler}
          />
        </form>
        <label htmlFor="search">
          <SearchIcon className={style.searchIcon} />
        </label>
      </div>

      <button
        className={style.sortBtn}
        onClick={toggleSortHandler}>
        Sort by price
      </button>
      {/* <button className={style.filterBtn}>Filter</button> */}
    </div>
  )
}

export default Actions;