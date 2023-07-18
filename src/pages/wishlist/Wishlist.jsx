import { ProductCard } from "../../components";
import { useProducts } from "../../contexts/products-context/ProductsContext";

import toast, { Toaster } from 'react-hot-toast';
import './wishlist.css';

const Wishlist = () => {
    const {wishlist} = useProducts();
    console.log(wishlist)
    return(
        <div className="wishlist">
            <Toaster />
            {!wishlist.length && <h1 className="wishlist__empty">nothing in the wishlist</h1> }
            <section>
                <ul className='wishlist__lists'>
                    { !wishlist ? (
                    <li className="wishlist__noproductFound">no products found!!</li>
                    ) : (
                    wishlist?.map((product) => {
                    return <li className='product__card' key={product?._id}>
                    <ProductCard product={product} deleteButton />
                    </li>
                    })
                    )}
                </ul>
            </section>
        </div>
    )
}

export default Wishlist;