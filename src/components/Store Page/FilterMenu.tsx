'use client';
// --- style
import style from './FilterMenu.module.css';
// --- UI
import Input from '@/src/UI/Input Fields/Input/Input';
import Slider from '@/src/UI/Input Fields/Slider/Slider';
import Button from '@/src/UI/Button/Button';
import TagsSelect from '@/src/UI/Input Fields/Tags Selector/TagsSelect';
// --- react/nextjs api
import { ChangeEvent } from 'react';
import Link from 'next/link';
// --- store filter context
import useStoreFilterContext from '@/src/hooks/useStoreFilterContext';

const FilterMenu = () => {

  const ctx = useStoreFilterContext();

  const searchChangeHadler = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    ctx.setSearch(searchValue)
  }

  const priceRangeChangeHandler = (nums: number[]) => {
    const [min, max] = nums;
    ctx.setRange(min, max);
  }

  const tagsChangeHandler = (tags: string[]) => {
    ctx.setTags(tags)
  }

  const tags = [
    { value: 'medium', label: <span>medium</span> },
    { value: 'large', label: <span>large</span> },
    { value: 'small', label: <span>small</span> },
    { value: 'pet friendly', label: <span>pet friendly</span> },
    { value: 'slow', label: <span>slow-growing</span> },
    { value: 'fast', label: <span>fast-growing</span> },
    { value: 'seasonal flowering', label: <span>flowering</span> },
    { value: 'non-flowering', label: <span>non-flowering</span> }
  ]

  return (
    <div className={style.wrapper}>

      {/*   -=-=-=- Search Bar -=-=-=-   */}

      <div className={style.sectionWrapper}>
        <span className={style.title}>Search</span>
        <Input
          type='text'
          value={ctx.searchValue}
          onChange={searchChangeHadler}
          placeholder='Enter product name'
        />
      </div>

      {/*   -=-=-=- Categories -=-=-=-   */}
      <div className={style.sectionWrapper}>
        <span className={style.title}>Categories</span>
        <ul>
          <li>
            <Link href={'/store'}>
              <span>Plant</span>
              <span>(5)</span>
            </Link>
          </li>
          <li>
            <Link href={'/store'}>
              <span>Cactus</span>
              <span>(5)</span>
            </Link>
          </li>
          <li>
            <Link href={'/store'}>
              <span>Bonsai</span>
              <span>(5)</span>
            </Link>
          </li>
        </ul>
      </div>

      {/*   -=-=-=- Filter -=-=-=-   */}

      <div className={style.sectionWrapper}>
        <span className={style.title}>Filter</span>
        <TagsSelect
          placeholder='Select tags'
          value={ctx.tags}
          onChange={tagsChangeHandler}
          options={tags}
        />
        <Slider
          onChangeComplete={priceRangeChangeHandler}
          defaultValue={[0, 200]}
          max={200}
          value={[ctx.priceRange.min, ctx.priceRange.max]}
        />
        <span className={style.priceIndicator}>Price: <b>${ctx.priceRange.min} - ${ctx.priceRange.max}</b></span>
      </div>

      {/*   -=-=-=- Actions -=-=-=-   */}
      <Button onClick={() => ctx.clear()}>reset filter</Button>
    </div>
  )
}

export default FilterMenu;