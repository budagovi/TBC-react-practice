'use client'

import style from './Product.module.css'
import { useEffect, useState } from "react";
import product from '@/src/interfaces/product';

function Product({ id }: { id: number }) {

  const [product, setProduct] = useState<product>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://dummyjson.com/products/' + id);
      if (response.ok) {
        const data = await response.json();
        setProduct(data)
      }
      return {};
    }

    fetchData();
  }, [])


  if (product)
    return (
      <section className={style.wrapper}>
        <div className={style.heading}>
          <div className={style.imgWrapper}>
            <img src={product.thumbnail} alt={product.title} />
          </div>
          <div className={style.description}>
            <span>{product.category}</span>
            <span>{product.title}</span>
            <span>{product.description}</span>
            <div className={style.details}>
              <span>brand: <b>{product.brand}</b></span>
              <span>price: <b>${(product.price - product.price * product.discountPercentage / 100).toFixed(2)}</b></span>
              <span>in stock: <b>{product.stock}</b></span>
            </div>
            <span>pictures:</span>
            <aside className={style.productGallery}>
              {product.images.map((item, idx) => <div className={style.galleryItemWrapper} key={idx}><img src={item} /></div>)}
            </aside>
          </div>
        </div>
      </section>
    )
    else return null
}

export default Product;