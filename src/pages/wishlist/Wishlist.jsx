import { ProductCard } from "../../components";
import { useProducts } from "../../contexts/products-context/ProductsContext";

const Wishlist = () => {
    const {wishlist} = useProducts();
    console.log(wishlist)
    return(
        <div className="products">
            <section>
                <ul className='products__lists'>
                    { !wishlist ? (
                    <li>no products found!!</li>
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