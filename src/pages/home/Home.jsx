import { BiRightArrowAlt } from 'react-icons/bi';
import BooksCollage from '../../assets/book--home.png';
import { Footer } from '../../components';
import './home.css';


const Home = () => {
    return(
        <div className='home'>
            <section className='home__top'>
                <img className='home__images' src={BooksCollage} alt="image of collection of different books in a collage format" />
                <section className='home__shop'>
                    <h2 className='home__headline'>Unlock the World of Infinite Stories - Your Book Haven Awaits</h2>
                    <button className='home__cta'>shop now <BiRightArrowAlt /> </button>
                </section>
            </section>

            <section className='home__categories'>
                <h2 className='home__title'>featured book categories</h2>
                <section className='home__lists'>
                    <section className='home__category'>cat1</section>                    
                    <section className='home__category'>cat2</section>                    
                    <section className='home__category'>cat3</section>                    
                    <section className='home__category'>cat4</section>                    
                </section>
            </section>
        </div>
        
    )
}

export default Home;