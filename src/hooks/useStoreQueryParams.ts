// --- react/nextjs api
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
// --- hooks
import useDebounce from './useDebounce';

export type IStoreTag = 'medium' | 'large' | 'small' | 'pet friendly' | 'slow' | 'fast' | 'non-flowering' | 'seasonal flowering';

interface FilterState {
  searchValue: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  tags: IStoreTag[];
  sortBy: string;
}

const useStoreQueryParams = () => {

  // hooks
  const searchParams = useSearchParams();
  const router = useRouter();

  // get search params, when visiting route
  const getQuery = (): FilterState => {

    const searchValue = searchParams.get('q') ?? '';
    const category = searchParams.get('category') ?? '';
    const minPrice = searchParams.get('minPrice') ?? '0';
    const maxPrice = searchParams.get('maxPrice') ?? '200';
    const tags = (searchParams.get('tags') ?? '').split(',').filter(tag => tag) as IStoreTag[];
    const sortBy = searchParams.get('sortBy') ?? '';

    return {
      searchValue,
      category,
      minPrice,
      maxPrice,
      tags,
      sortBy
    }
  }

  // manage state
  const [filter, setFilter] = useState(getQuery())

  const query: Record<string, string> = {};
  const setQuery = (filter: FilterState) => {
    if (filter.category) query.category = filter.category;
    if (filter.searchValue) query.q = filter.searchValue;
    if (+filter.minPrice > 0) query.minPrice = filter.minPrice.toString();
    if (+filter.maxPrice < 200) query.maxPrice = filter.maxPrice.toString();
    if (filter.tags.length > 0) query.tags = filter.tags.join(',');
    if (filter.sortBy) query.sortBy = filter.sortBy

    const queryString = new URLSearchParams(query).toString();
    router.push(`/store?${queryString}`);

  };

  // update query (and navigate) every time filter changes
  useEffect(
    useDebounce(() => setQuery(filter), 700),
    [filter.searchValue, filter.category, filter.minPrice, filter.maxPrice, filter.tags, filter.sortBy, router]
  );

  return { filter, setFilter, getQuery };
};

export default useStoreQueryParams;
