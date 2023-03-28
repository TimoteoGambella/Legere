import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { UseApiContext } from '../../context/ApiContext';
import TabBar from '../../components/TabBar/TabBar';
import TopNavigation from '../../components/TopNavigation/TopNavigation';
import TeamModal from '../../components/TeamModal/TeamModal';
import { AnimatedDiv } from '../../components/AnimatedDiv/AnimatedDiv';
import medal from '../../assets/bestSeller.svg';
import discount from '../../assets/cat-descuentos.svg';
import { Ring } from '@uiball/loaders';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Categories = () => {
    const { searchCollectionsOrder } = useContext(UseApiContext);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        searchCollectionsOrder('categorias').then((res) => {
            setCategories(res);
            setLoading(false);
        });
    }, []);

    const handleNames = (name) => {
        if (name === 'ciencia ficcion') {
            return 'Ciencia Ficción';
        } else if (name === 'bestSellers') {
            return 'Bestsellers';
        } else {
            return name;
        }
    };

    const handleRoutes = (route) => {
        if (route === 'bestSellers') {
            return 'bestsellers';
        } else if (route === 'ciencia ficcion') {
            return 'ciencia-ficcion';
        } else {
            return route;
        }
    };

    return (
        <>
            <TopNavigation title={'Explora las categorías'} search={true} />
            <AnimatedDiv>
                <div className="categoriesContainer d-flex-center">
                    {loading ? (
                        <div className="d-flex-center">
                            <Ring size={60} lineWeight={3} speed={2} color="#ff5678" />
                        </div>
                    ) : (
                        categories.map((category) => {
                            return (
                                <div className="categoriesCard" key={category.id}>
                                    <Link to={handleRoutes(category.nombre)}>
                                        <p>{handleNames(category.nombre)}</p>
                                        <LazyLoadImage
                                            src={category.foto}
                                            alt={category.nombre}
                                            effect="blur"
                                            width="190px"
                                            height="184px"
                                        />
                                        {category.nombre === 'bestSellers' && (
                                            <img src={medal} alt="medal" className="insignia"></img>
                                        )}
                                        {category.nombre === 'descuentos' && (
                                            <img src={discount} alt="discont" className="insignia"></img>
                                        )}
                                    </Link>
                                </div>
                            );
                        })
                    )}
                </div>
            </AnimatedDiv>
            <TeamModal/>
            <TabBar />
        </>
    );
};

export default Categories;
