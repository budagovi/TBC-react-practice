'use client'
// --- style
import style from './SortButton.module.css';
// --- antd
import { ConfigProvider, Select } from 'antd';
// --- hooks
import useStoreQueryParams from '@/src/hooks/useStoreQueryParams';
// react/nextjs api
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * Button to choose with what to sort by
 */
const SortButton = () => {

  const { filter, setFilter, getQuery } = useStoreQueryParams();

  const changeHandler = (value: string) => {
    setFilter(getQuery())
    setFilter(prevState => ({ ...prevState, sortBy: value }))
  }

  // copy FilterMenu component's updated params state
  const searchParams = useSearchParams();
  useEffect(() => {
    setFilter(getQuery())
  }, [searchParams])

  return (
    <ConfigProvider theme={{
      components: {
        Select: {
          optionSelectedBg: '#dce1de'
        }
      }
    }}>
      <Select
        placeholder='Default'
        options={[
          { label: 'Default', value: '' },
          { label: 'Price', value: 'price' },
          { label: 'Price Desc', value: 'price desc' }
        ]}
        className={style.sortButton}
        loading={false}
        value={filter.sortBy}
        onChange={changeHandler}
      />
    </ConfigProvider>
  )
}

export default SortButton;