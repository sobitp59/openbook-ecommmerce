import Logo from '../../components/logo-comp/Logo';
import "./footer.css";

const Footer = () => {
    return(
        <footer className="footer">
            <section className='footer__top'>
                <Logo />
                <p>the world of infinite stories</p>
            </section>

            <section className='footer__bottom'>
                <ul className='footer__info footer--card'>
                    <li>about us</li>
                    <li>contact us</li>
                    <li>privacy policy</li>
                    <li>terms & conditions</li>
                </ul>
                <ul className='footer__connect footer--card'>
                    <li>twitter</li>
                    <li>linkedin</li>
                    <li>github</li>
                </ul>
                <ul className='footer__navigation footer--card'>
                    <li>login</li>
                    <li>signup</li>
                    <li>shop</li>
                </ul>
            </section>
        </footer>
    )
}

export default Footer;