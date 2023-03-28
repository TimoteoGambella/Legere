import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { UseApiContext } from '../../context/ApiContext';
import star from '../../assets/star.svg';
import { Ring } from '@uiball/loaders';
import 'react-lazy-load-image-component/src/effects/blur.css';

const HomeRecomendations = () => {
    const { collectionByParam } = useContext(UseApiContext);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        collectionByParam('libros', 'bestSeller', true).then((res) => {
            setBooks(res);
            setLoading(false);
        });
    }, []);
    return (
        <div className="homeRecommendations d-flex-column">
            {loading ? (
                <div className="d-flex-center">
                    <Ring size={60} lineWeight={3} speed={2} color="#ff5678" />
                </div>
            ) : (
                books.map((book) => {
                    return (
                        <Link key={book.id} to={`/book/${book.id}`}>
                            <div className="recommendationsBook d-flex-center">
                                <LazyLoadImage
                                    src={book.foto}
                                    alt={book.title}
                                    effect="blur"
                                    width="62.5px"
                                    height="80px"
                                />
                                {/* <img src={book.foto} alt={book.title}></img> */}
                                <div className="bookInfo d-flex-column">
                                    <h2>{book.title}</h2>
                                    <p className="bookAuthor">{book.autor}</p>
                                    <p>Libro electrónico / Audiolibro</p>
                                    <div className="rating">
                                        <p>{book.valoracion}</p>
                                        <img src={star} alt="star"></img>
                                    </div>
                                </div>
                                <p className="price">
                                    <span>${book.precio}</span> mxn
                                </p>
                            </div>
                        </Link>
                    );
                })
            )}
        </div>
    );
};

export default HomeRecomendations;
