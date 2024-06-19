'use client';
// --- style
import style from './FilterMenu.module.css';
// --- UI
import Input from '@/src/UI/Input Fields/Input/Input';
import Slider from '@/src/UI/Input Fields/Slider/Slider';
import Button from '@/src/UI/Button/Button';
import TagsSelect from '@/src/UI/Input Fields/Tags Selector/TagsSelect';
// --- components
import CategoriesList from './CategoriesList';
// --- custom hooks
import useStoreQueryParams from '@/src/hooks/useStoreQueryParams';
// --- react/nextjs api
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
// --- types
import { IStoreTag } from '@/src/hooks/useStoreQueryParams';
// --- next-internatinalization
import { useScopedI18n } from '@/src/lib/next-internationalization/client';


/**
 * Store filter options for Store (sets and gets store search params)
 */
const FilterMenu = () => {

  const t = useScopedI18n('/store')
  const { filter, setFilter, getQuery } = useStoreQueryParams();

  // copy SortButton component's updated params state
  const searchParams = useSearchParams();
  useEffect(() => {
    setFilter(getQuery())
  }, [searchParams])

  // change handlers
  const tagsChangeHandler = (selectedTags: IStoreTag[]) => {
    setFilter(getQuery())
    setFilter(prevState => ({
      ...prevState,
      tags: selectedTags
    }));
  };


  // options for tags menu
  const tagsOptions = [
    { value: 'sale', label: <span>{t('tags.0')}</span> },
    { value: 'small', label: <span>{t('tags.1')}</span> },
    { value: 'medium', label: <span>{t('tags.2')}</span> },
    { value: 'large', label: <span>{t('tags.3')}</span> },
    { value: 'slow', label: <span>{t('tags.4')}</span> },
    { value: 'fast', label: <span>{t('tags.5')}</span> },
    { value: 'seasonal flowering', label: <span>{t('tags.6')}</span> },
    { value: 'non-flowering', label: <span>{t('tags.7')}</span> },
    { value: 'pet friendly', label: <span>{t('tags.8')}</span> },
  ];

  return (
    <div className={style.wrapper}>

      {/* -=-=-=-=- Search Bar -=-=-=-=- */}
      <div className={style.sectionWrapper}>
        <span className={style.title}>{t('search')}</span>
        <Input
          type='text'
          value={filter.searchValue}
          onChange={(e) => {
            setFilter(getQuery())
            setFilter(prevState => ({ ...prevState, searchValue: e.target.value }))
          }}
          placeholder={t('enter name')}
        />
      </div>

      {/* -=-=-=-=- Filter -=-=-=-=- */}
      <div className={style.sectionWrapper}>
        <span className={style.title}>{t('filter')}</span>
        {/* -=-=-=-=- Tags -=-=-=-=- */}
        <TagsSelect
          placeholder={t('select tags')}
          value={filter.tags}
          onChange={tagsChangeHandler}
          options={tagsOptions}
        />
        {/* -=-=-=-=- Slider -=-=-=-=- */}
        <Slider
          onChangeComplete={(value) => {
            setFilter(getQuery())
            setFilter(prevState => ({ ...prevState, minPrice: value[0].toString(), maxPrice: value[1].toString() }))
          }}
          defaultValue={[0, 200]}
          max={200}
          value={[+filter.minPrice, +filter.maxPrice]}
        />
        <span className={style.priceIndicator}>{t('price')}: <b>${filter.minPrice} - ${filter.maxPrice}</b></span>
      </div>

      {/* -=-=-=-=- Categories -=-=-=-=- */}
      <div className={style.sectionWrapper}>
        <span className={style.title}>{t('categories')}</span>
        <CategoriesList
          filter={filter}
          setFilter={setFilter}
          getQuery={getQuery}
        />
      </div>

      {/* -=-=-=-=- Actions -=-=-=-=- */}
      <Button onClick={() => setFilter({ searchValue: '', category: '', minPrice: '0', maxPrice: '200', tags: [], sortBy: '' })}>{t('reset')}</Button>
    </div >
  );
};

export default FilterMenu;
