'use client'
import Loader from '@/UI/Loader/Loader';
import style from './Product.module.css'
import { useEffect, useState } from "react";

function Product({ id }) {

  const [product, setProduct] = useState({});

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


  if (Object.keys(product).length === 0)
    return <Loader />

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
            <span>price: <b>${(product.price-product.price*product.discountPercentage/100).toFixed(2)}</b></span>
            <span>in stock: <b>{product.stock}</b></span>
          </div>
          <span>pictures:</span>
          <aside className={style.productGallery}>
            {product.images.map(item => <div className={style.galleryItemWrapper}><img src={item}/></div>)}
          </aside>
        </div>
      </div>
    </section>
  )
}

export default Product;