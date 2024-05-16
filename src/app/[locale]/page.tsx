'use client'
import ScrollUp from "@/src/UI/ScrollUp";
import SliderSection from "@/src/UI/Slider Section/SliderSection";
import { useState, useEffect } from "react";
import Product from "@/src/interfaces/product";
import StoreItem from "@/src/components/Store Page/StoreItem";

// // --- next-internationalization api
// import { Locale } from "@/i18n.config";
// import { setStaticParamsLocale } from "next-international/server";
// import { getStaticParams } from '@/src/locales/server';

// export function generateStaticParams() {
//   return getStaticParams()
// }

// interface Props {
//   params: {
//     locale: Locale
//   }
// }

// { params: { locale } }: Props

const App = () => {

  // // static rendering for both languages on build-time
  // setStaticParamsLocale(locale)


  const [products, setProducts] = useState<Product[]>([]);

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