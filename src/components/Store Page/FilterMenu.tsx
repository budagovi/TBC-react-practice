'use client';
// --- style
import style from './FilterMenu.module.css';
// --- UI
import Input from '@/src/UI/Input Fields/Input/Input';
import Slider from '@/src/UI/Input Fields/Slider/Slider';
import Button from '@/src/UI/Button/Button';
import TagsSelect from '@/src/UI/Input Fields/Tags Selector/TagsSelect';
// --- custom hooks
import useStoreQueryParams from '@/src/hooks/useStoreQueryParams';
// --- react/nextjs api
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import CategoriesList from './CategoriesList';

type IStoreTag = 'medium' | 'large' | 'small' | 'pet friendly' | 'slow' | 'fast' | 'non-flowering' | 'seasonal flowering';

const FilterMenu = () => {

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
    { value: 'medium', label: <span>medium</span> },
    { value: 'large', label: <span>large</span> },
    { value: 'small', label: <span>small</span> },
    { value: 'pet friendly', label: <span>pet friendly</span> },
    { value: 'slow', label: <span>slow-growing</span> },
    { value: 'fast', label: <span>fast-growing</span> },
    { value: 'seasonal flowering', label: <span>flowering</span> },
    { value: 'non-flowering', label: <span>non-flowering</span> }
  ];

  return (
    <div className={style.wrapper}>
      {/* -=-=-=-=- Search Bar -=-=-=-=- */}
      <div className={style.sectionWrapper}>
        <span className={style.title}>Search</span>
        <Input
          type='text'
          value={filter.searchValue}
          onChange={(e) => {
            setFilter(getQuery())
            setFilter(prevState => ({ ...prevState, searchValue: e.target.value }))
          }}
          placeholder='Enter product name'
        />
      </div>

      {/* -=-=-=-=- Categories -=-=-=-=- */}
      <div className={style.sectionWrapper}>
        <span className={style.title}>Categories</span>
        <CategoriesList
          filter={filter}
          setFilter={setFilter}
          getQuery={getQuery}
        />
      </div>

      {/* -=-=-=-=- Filter -=-=-=-=- */}
      <div className={style.sectionWrapper}>
        <span className={style.title}>Filter</span>
        {/* -=-=-=-=- Tags -=-=-=-=- */}
        <TagsSelect
          placeholder='Select tags'
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
        <span className={style.priceIndicator}>Price: <b>${filter.minPrice} - ${filter.maxPrice}</b></span>
      </div>

      {/* -=-=-=-=- Actions -=-=-=-=- */}
      <Button onClick={() => setFilter({ searchValue: '', category: '', minPrice: '0', maxPrice: '200', tags: [], sortBy: '' })}>reset filter</Button>
    </div >
  );
};

export default FilterMenu;
