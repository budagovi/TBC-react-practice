'use client'
import ScrollUp from "../UI/ScrollUp";
import SliderSection from "../UI/Slider Section/SliderSection";
import { useState, useEffect } from "react";
import product from "../interfaces/product";
import StoreItem from "../components/store/StoreItem";
const App = () => {


  const [products, setProducts] = useState<product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://dummyjson.com/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products)
      }
      return [];
    }

    fetchData();
  }, [])


  return (
    <div className='gl-max-width'>
      <SliderSection
        intro="today's"
        title="flash sales"
        btnText="view all products"
        linkTo='/store'
      >
        {products.map(item =>
          <div key={item.id}>
            <StoreItem
              id={item.id}
              src={item.thumbnail}
              name={item.title}
              price={item.price}
              category={item.category}
              sale={item.discountPercentage} />
          </div>
        )}
      </SliderSection>
      <ScrollUp />
    </div>
  );
}

export default App;