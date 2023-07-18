import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useProductCategory } from '../../contexts/product-category-context/ProductCategoryContext';
import { useProducts } from '../../contexts/products-context/ProductsContext';


import { BsFilterLeft } from 'react-icons/bs';
import { GrFormClose } from 'react-icons/gr';

import { FilterProducts, ProductCard } from '../../components';
import "./products.css";

  

const Products = () => {
  const {allProducts, filters} = useProducts()
  const [showFilter, setShowFilter] = useState(false)
  const {productCategory} = useProductCategory();


  const filteredProducts = [...allProducts]
                            .filter((product) => filters?.priceRange ? product?.originalPrice - product?.originalPrice/100* product?.percentageOff <=  filters?.priceRange  : true)
                            .filter((product) => {
                              const [{star}] = product?.rating;
                              return  filters?.productRating?.rating ? star >= Number(filters?.productRating?.rating)  : true 
                            }).filter(({categoryName}) => filters?.categoryFilter?.length === 0 ? true : filters?.categoryFilter?.includes(categoryName))

                            

 

  const handleScroll = (event) => {
    const scroll = event.currentTarget.scrollTop
    if(scroll > 5 && showFilter){
      setScrollTop(false);
    }
  };
  

  return (
    <div className='products'>

      <Toaster />
      
      <section className='products__filtering'>
        <button className="products__filterBtn" onClick={() => setShowFilter((prev) => !prev)}>
        {showFilter ?  <GrFormClose className='products__filterIcons' showFilter={showFilter} /> : 
          <BsFilterLeft className='products__filterIcons' showFilter={showFilter} />
        }
        </button>
        <p>showing ({filteredProducts?.length}) products</p>
      </section>
    
      <FilterProducts showFilter={showFilter}/>
  
      <section>

        <ul className='products__lists'>
          { filteredProducts?.length < 1 ? (
              <li className='products__notfound'>no products found!!</li>
          ) : (
            filteredProducts?.map((product) => {
            return <li className='product__card' key={product?._id}>
                <ProductCard product={product} />
            </li>
            })
          )}
        </ul>
      </section>
    </div>
  )
}


export default Products;