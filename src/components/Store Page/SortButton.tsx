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
// --- next-internationalization
import { useScopedI18n } from '@/src/lib/next-internationalization/client';

/**
 * Sorting button for store (sets and gets store search params)
 */
const SortButton = () => {

  const t = useScopedI18n('/store');

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
    <div className={style.wrapper}>
      <span>{t('sort by')}:</span>
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
            { label: t('default'), value: '' },
            { label: t('sort-price'), value: 'price' },
            { label: t('sort-price-desc'), value: 'price desc' }
          ]}
          className={style.sortButton}
          loading={false}
          value={filter.sortBy}
          onChange={changeHandler}
        />
      </ConfigProvider>
    </div>
  )
}

export default SortButton;