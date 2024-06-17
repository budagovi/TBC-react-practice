'use client'
// --- style
import style from './Store.module.css';
// --- components
import StoreItem from './StoreItem';
import SortButton from './SortButton';
// --- react api
import { useEffect, useState } from 'react';
// --- tyoes
import { IProduct } from '@/src/lib/types/entities';
import useStoreFilterContext from '@/src/hooks/useStoreFilterContext';

/**
 * Store Component containing grid of Product cards
 */
const Store = () => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/products', { cache: 'no-cache' });
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setProducts(data)
      }
      return [];
    }

    fetchData();
  }, [])

  const [products, setProducts] = useState<IProduct[]>([]);
  const ctx = useStoreFilterContext();



  return (
    <section className={style.wrapper}>
      <div className={style.sortWrapper}>
        <span>Sort By:</span>
        <SortButton />
      </div>
      <div className={style.storeWrapper}>
        {products.length !== 0 && products.map((item) =>
          <StoreItem
            key={item.id}
            id={item.id}
            src={item.imgUrl}
            name={item.name}
            price={item.price}
            category={item.category}
            sale={item.salePercentage} />
        )}
      </div>
    </section>
  )
}

export default Store;