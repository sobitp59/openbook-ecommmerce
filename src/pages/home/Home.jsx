import { BiRightArrowAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router';
import BooksCollage from '../../assets/book--home.png';
import { useProductCategory } from '../../contexts/product-category-context/ProductCategoryContext';
import './home.css';


const Home = () => {
    const navigate = useNavigate()
    const productCategories = useProductCategory();

    const navigateToHomeOage = () => navigate('/products') 

    return(
        <div className='home'>
            <section className='home__top'>
                <img className='home__images' src={BooksCollage} alt="image of collection of different books in a collage format" />
                <section className='home__shop'>
                    <h2 className='home__headline'>Unlock the World of Infinite Stories - Your Book Haven Awaits</h2>
                    <button onClick={navigateToHomeOage} className='home__cta'>shop now <BiRightArrowAlt /> </button>
                </section>
            </section>

            <section className='home__categories'>
                <h2 className='home__title'>featured book categories</h2>
                <ul className='home__lists'>
                    { productCategories?.map((category) => {
                        return <li key={category?._id} className='home__category'>
                            <h2 className='home__categoryName'>{category?.categoryName}</h2>
                            <p className='home__categoryDescription'>{category?.description}</p>
                        </li>
                    })}                 
                </ul>
            </section>
        </div>
        
    )
}

export default Home;