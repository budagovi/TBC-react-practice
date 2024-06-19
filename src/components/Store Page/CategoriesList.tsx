'use client'
import { FilterState } from '@/src/hooks/useStoreQueryParams';
// --- style
import style from './CategoriesList.module.css';
// --- react api
import { Dispatch, SetStateAction } from 'react';
// --- next-internatinalization
import { useScopedI18n } from '@/src/lib/next-internationalization/client';

interface IProps {
  filter: FilterState,
  setFilter: Dispatch<SetStateAction<FilterState>>,
  getQuery: () => FilterState
}

/**
 * Categories list for FilterMenu
 * @param state - destructured useStoreQueryParams to get and set store search params
 */
const CategoriesList = ({ filter, setFilter, getQuery }: IProps) => {

  const t = useScopedI18n('/store')
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
          <span>{t('plant')}</span>
          <span>(12)</span>
        </button>
      </li>
      <li>
        <button
          onClick={() => setCategory('cactus')}
          className={`${isCurrentCategory('cactus') ? style.activeCategory : ''}`}
        >
          <span>{t('cactus')}</span>
          <span>(7)</span>
        </button>
      </li>
      <li>
        <button
          onClick={() => setCategory('bonsai')}
          className={`${isCurrentCategory('bonsai') ? style.activeCategory : ''}`}
        >
          <span>{t('bonsai')}</span>
          <span>(3)</span>
        </button>
      </li>
    </ul>
  )
}

export default CategoriesList;