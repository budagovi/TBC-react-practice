'use client'

import style from './Store.module.css';
import StoreItem from './StoreItem';
import Actions from './Actions';

import { useEffect, useState } from 'react';
import Loader from '@/src/UI/Loader/Loader';
import product from '@/src/interfaces/product';

const Store = ({ dict }: { dict: any }) => {

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://dummyjson.com/products');
      if (response.ok) {
        const data = await response.json();
        setFilteredList(data.products)
      }
      return [];
    }

    fetchData();
  }, [])

  const [filteredList, setFilteredList] = useState<product[]>([]);
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
        <h2>{dict.title}</h2>
        <Actions 
          search={() => console.log('need to fix')} 
          sort={(bool:boolean) => setSorted(bool)} 
          dict={dict}  
        />
      </div>
      {filteredList.length === 0 && <Loader />}
      <div className={style.storeWrapper}>
        {filteredList.length !== 0 && [...filteredList].sort((a, b) => {
          // const aPrice = a.sale ? a.sale : a.price
          // const bPrice = b.sale ? b.sale : b.price
          const aPrice= a.discountPercentage ? a.price * (100 - a.discountPercentage) / 100 : a.price
          const bPrice = b.discountPercentage ? b.price * (100 - b.discountPercentage) / 100 : b.price

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
            src={item.thumbnail}
            name={item.title}
            price={item.price}
            category={item.category}
            sale={item.discountPercentage} />
        )
        }
      </div>
    </section>
  )
}

export default Store;