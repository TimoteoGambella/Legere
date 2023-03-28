import { Link } from 'react-router-dom';
import discounts from '../../assets/cat-descuentos.svg';
import bestseller from '../../assets/cat-best.svg';
import terror from '../../assets/cat-terror.svg';
import romance from '../../assets/cat-romance.svg';

const HomeLinks = () => {
    return (
        <ul className="homeLinks d-flex-center">
            <Link to="/categories/descuentos" className="d-flex-center">
                <li className="d-flex-center d-flex-column">
                    <img src={discounts} alt="descuentos"></img>
                    <p>Descuentos</p>
                </li>
            </Link>
            <Link to="/categories/bestsellers" className="d-flex-center">
                <li className="d-flex-center d-flex-column">
                    <img src={bestseller} alt="bestsellers"></img>
                    <p>Bestsellers</p>
                </li>
            </Link>
            <Link to="/categories/terror" className="d-flex-center">
                <li className="d-flex-center d-flex-column">
                    <img src={terror} alt="terror"></img>
                    <p>Terror</p>
                </li>
            </Link>
            <Link to="/categories/romance" className="d-flex-center">
                <li className="d-flex-center d-flex-column">
                    <img src={romance} alt="romance"></img>
                    <p>Romance</p>
                </li>
            </Link>
        </ul>
    );
};

export default HomeLinks;
