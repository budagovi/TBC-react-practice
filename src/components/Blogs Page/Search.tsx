'use client'
import Input from '@/src/UI/Input Fields/Input/Input';
import style from './BlogsList.module.css';
import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useDebounce from '@/src/hooks/useDebounce'; // Adjust the path as needed

const Search = () => {

  const searchParams = useSearchParams();

  const searchValue = searchParams.get('q') ?? '';
  const [q, setQ] = useState(searchValue);
  const router = useRouter();

  useEffect(() => {
    setQ(searchValue);
  }, [searchValue]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQ(newQuery);
    debouncedRouterPush(newQuery);
  }

  const debouncedRouterPush = useDebounce((query) => {
    router.push(`/blogs?q=${query}`);
  }, 500);

  return (
    <div className={style.sectionWrapper}>
      <span className={style.title}>{'Search'}</span>
      <Input
        type='text'
        value={q}
        onChange={handleInputChange}
        placeholder={'Enter title'}
      />
    </div>
  )
}

export default Search;
