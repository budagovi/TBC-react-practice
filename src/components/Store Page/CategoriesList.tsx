'use client'
import { FilterState } from '@/src/hooks/useStoreQueryParams';
// --- style
import style from './CategoriesList.module.css';
import { Dispatch, SetStateAction } from 'react';

interface IProps {
  filter: FilterState,
  setFilter: Dispatch<SetStateAction<FilterState>>,
  getQuery: () => FilterState
}
/**
 * Categories list for Filter menu
 */
const CategoriesList = ({ filter, setFilter, getQuery }: IProps) => {

  const setCategory = (value: string) => {
    setFilter(getQuery())
    setFilter(prevState => ({ ...prevState, category: isCurrentCategory(value) ? '' : value }))
  }

  const isCurrentCategory = (value: string) => {
    return filter.category === value;
  }

  return (
    <ul className={style.wrapper}>
      <li>
        <button
          onClick={() => setCategory('plant')}
          className={`${isCurrentCategory('plant') ? style.activeCategory : ''}`}
        >
          <span>Plant</span>
          <span>(5)</span>
        </button>
      </li>
      <li>
        <button
          onClick={() => setCategory('cactus')}
          className={`${isCurrentCategory('cactus') ? style.activeCategory : ''}`}
        >
          <span>Cactus</span>
          <span>(5)</span>
        </button>
      </li>
      <li>
        <button
          onClick={() => setCategory('bonsai')}
          className={`${isCurrentCategory('bonsai') ? style.activeCategory : ''}`}
        >
          <span>Bonsai</span>
          <span>(5)</span>
        </button>
      </li>
    </ul>
  )
}

export default CategoriesList;