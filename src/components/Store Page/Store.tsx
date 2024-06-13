'use client'

import style from './Store.module.css';
import StoreItem from './StoreItem';
import Actions from './Actions';

import { useEffect, useState } from 'react';
import { IProduct } from '@/src/lib/types';


const Store = () => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/products', { cache: 'no-cache' });
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setFilteredList(data)
      }
      return [];
    }

    fetchData();
  }, [])

  const [filteredList, setFilteredList] = useState<IProduct[]>([]);
  const [sorted, setSorted] = useState(false);

  // filter by query
  // const searchItems = (searchText:string) => {
  //   setFilteredList(products
  //     .filter(product => product.name.toLowerCase().includes(searchText))
  //   )
  // }

  return (
    <section className={style.wrapper}>
      <div className={style.actions}>
        <h2>Products</h2>
        <Actions
          search={() => console.log('need to fix')}
          sort={(bool: boolean) => setSorted(bool)}
        />
      </div>
      <div className={style.storeWrapper}>
        {filteredList.length !== 0 && [...filteredList].sort((a, b) => {
          // const aPrice = a.sale ? a.sale : a.price
          // const bPrice = b.sale ? b.sale : b.price
          const aPrice = a.salePercentage ? a.price * (100 - a.salePercentage) / 100 : a.price
          const bPrice = b.salePercentage ? b.price * (100 - b.salePercentage) / 100 : b.price

          return sorted ? aPrice - bPrice : 0
        }).map((item) =>
          // <StoreItem
          //   key={item.id}
          //   src={item.src}
          //   name={item.name}
          //   price={item.price}
          //   category={item.category}
          //   sale={item.sale}/>
          <StoreItem
            key={item.id}
            id={item.id}
            src={item.imgUrl}
            name={item.name}
            price={item.price}
            category={item.category}
            sale={item.salePercentage} />
        )
        }
      </div>
    </section>
  )
}

export default Store;