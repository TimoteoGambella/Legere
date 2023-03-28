import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { UseApiContext } from '../../context/ApiContext';
import TabBar from '../../components/TabBar/TabBar';
import TopNavigation from '../../components/TopNavigation/TopNavigation';
import TeamModal from '../../components/TeamModal/TeamModal';
import { AnimatedDiv } from '../../components/AnimatedDiv/AnimatedDiv';
import star from '../../assets/star.svg';
import filter from '../../assets/filter.svg';
import medal from '../../assets/bestSeller.svg';
import discount from '../../assets/cat-descuentos.svg';
import { Ring } from '@uiball/loaders';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Category = () => {
    const { collectionByParam } = useContext(UseApiContext);
    const { idCategory } = useParams();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (idCategory === 'bestsellers') {
            collectionByParam('libros', 'bestSeller', true).then((res) => {
                setBooks(res);
                setLoading(false);
            });
        } else if (idCategory === 'descuentos') {
            collectionByParam('libros', 'descuento', true).then((res) => {
                setBooks(res);
                setLoading(false);
            });
        } else if (idCategory === 'ciencia-ficcion') {
            collectionByParam('libros', 'categoria', 'ciencia ficcion').then((res) => {
                setBooks(res);
                setLoading(false);
            });
        } else {
            collectionByParam('libros', 'categoria', idCategory).then((res) => {
                setBooks(res);
                setLoading(false);
            });
        }
    }, []);

    const handleTitles = (title) => {
        if (title === 'bestSellers') {
            return 'Bestsellers';
        } else if (title === 'ciencia-ficcion') {
            return 'Ciencia Ficción';
        } else {
            return title;
        }
    };
    return (
        <>
            <TopNavigation title={handleTitles(idCategory)} search={true} arrow={true} />
            <AnimatedDiv>
                <div className="categoryContainer d-flex-column">
                    <div className="categoryHeader d-flex-space">
                        <p>Explora los títulos</p>
                        <div className="filterBooks d-flex-center">
                            <p>Mejor valorados</p>
                            <img src={filter} alt="filter"></img>
                        </div>
                    </div>
                    {loading ? (
                        <div className="d-flex-center">
                            <Ring size={60} lineWeight={3} speed={2} color="#ff5678" />
                        </div>
                    ) : (
                        books.map((book) => {
                            return (
                                <Link key={book.id} to={`/book/${book.id}`}>
                                    <div className="categoryBook d-flex-center">
                                        <div className="bookImg">
                                            <LazyLoadImage
                                                src={book.foto}
                                                alt={book.title}
                                                effect="blur"
                                                width="100px"
                                                height="128px"
                                            />
                                            {(book.bestSeller || book.descuento) && (
                                                <div className="insignia">
                                                    {book.bestSeller && (
                                                        <img src={medal} alt="medal"></img>
                                                    )}
                                                    {book.descuento && (
                                                        <img src={discount} alt="discont"></img>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <div className="bookInfo d-flex-column">
                                            <h2>{book.title}</h2>
                                            <p className="bookAuthor">{book.autor}</p>
                                            <div className="rating">
                                                <p>Libro electrónico</p>
                                                <p>{book.valoracion}</p>
                                                <img src={star} alt="star"></img>
                                            </div>
                                            <p className="price">${book.precio} mxn</p>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })
                    )}
                </div>
            </AnimatedDiv>
            <TeamModal />
            <TabBar />
        </>
    );
};

export default Category;
