import style from './Actions.module.css';
import SearchIcon from '../../icons/Search';
import { ChangeEvent, MouseEvent } from 'react';

const Actions = ({ search, sort }: {
  search: Function,
  sort: Function
}) => {

  // debounce
  let timer: any;
  const SearchChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    clearTimeout(timer)
    timer = setTimeout(() => {
      search(text.toLowerCase())
    }, 1000);
  }

  // sort handler
  const toggleSortHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.classList.toggle(`${style.active}`)
    const bool = e.currentTarget.classList.contains(`${style.active}`)
    sort(bool)
  }

  return (
    <div className={style.wrapper}>
      <div className={style.inputWrapper}>
        <form action="">
          <input
            id='search'
            type="text"
            placeholder='search'
            onChange={SearchChangeHandler}
          />
        </form>
        <label htmlFor="search">
          <SearchIcon className={style.searchIcon} />
        </label>
      </div>

      <button
        className={style.sortBtn}
        onClick={toggleSortHandler}
      >
        sort
      </button>
      {/* <button className={style.filterBtn}>Filter</button> */}
    </div>
  )
}

export default Actions;