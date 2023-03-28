import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { motion } from 'framer-motion';
import { UseApiContext } from '../../context/ApiContext';
import TopNavigation from '../../components/TopNavigation/TopNavigation';
import TabBar from '../../components/TabBar/TabBar';
import Opinions from '../../components/Opinions/Opinions';
import CheckoutModals from '../../components/CheckoutModals/CheckoutModals';
import TeamModal from '../../components/TeamModal/TeamModal';
import { AnimatedDiv } from '../../components/AnimatedDiv/AnimatedDiv';
import star from '../../assets/star.svg';
import bookIcon from '../../assets/book.svg';
import medal from '../../assets/bestSeller.svg';
import discount from '../../assets/cat-descuentos.svg';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import infoIcon from '../../assets/info.svg';
import { Ring } from '@uiball/loaders';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Book = () => {
    const { getBook, userData, setUserData, getLocalUser, updateUser } = useContext(UseApiContext);
    const { idBook } = useParams();
    const [book, setBook] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getBook(idBook).then((res) => {
            setBook(res);
            setLoading(false);
        });
        if (!userData) {
            const localUser = JSON.parse(localStorage.getItem('idUser'));
            if (localUser) {
                getLocalUser(localUser).then((data) => {
                    if (data) {
                        setUserData(data);
                    }
                });
            }
        }
    }, []);

    return (
        <>
            {showModal === 'about' && (
                <motion.div
                    className="bookModal d-flex-center"
                    onClick={() => setShowModal(false)}
                    initial={{ y: '-100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ duration: 0.15 }}
                >
                    <div
                        className="aboutModal d-flex-center d-flex-column"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modalIcon d-flex-center">
                            <img src={infoIcon} alt="info"></img>
                        </div>
                        <h3>Acerca del título</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur. Malesuada velit odio sagittis sed id
                            dui gravida magna. Eu at non purus nunc ultrices euismod. Dui diam in laoreet
                            viverra. Arcu cursus consequat sed quis. Malesuada enim enim cursus tortor eu
                            varius elit ullamcorper in. Egestas vestibulum scelerisque augue id amet
                            magna ultrices laoreet in. Tortor tellus quisque ornare dignissim viverra
                            massa. A tempor vitae gravida condimentum ut augue at netus. Aliquam nisl non
                            risus odio sem nulla aenean in. Tempor aliquet elit hendrerit pretium nunc
                            tristique. In sed lectus pulvinar adipiscing.
                        </p>
                    </div>
                </motion.div>
            )}
            {['cart', 'paymentMethod', 'rejected', 'succesful'].includes(showModal) && (
                <CheckoutModals
                    book={book}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    userData={userData}
                    updateUser={updateUser}
                    idBook={idBook}
                />
            )}
            <TopNavigation arrow={true} bookmark={true} menu={true} style={{ padding: 20 }} />
            <AnimatedDiv>
                <div className="bookContainer">
                    {loading ? (
                        <div className="d-flex-center">
                            <Ring size={60} lineWeight={3} speed={2} color="#ff5678" />
                        </div>
                    ) : (
                        <>
                            <div className="bookPrincipalContainer">
                                <div className="bookImg">
                                    <LazyLoadImage
                                        src={book.foto}
                                        alt={book.title}
                                        effect="blur"
                                        width="157px"
                                        height="200px"
                                    />
                                    {(book.bestSeller || book.descuento) && (
                                        <div className="insignia">
                                            {book.bestSeller && <img src={medal} alt="medal"></img>}
                                            {book.descuento && <img src={discount} alt="discount"></img>}
                                        </div>
                                    )}
                                </div>
                                <div className="bookPrincipal d-flex-column">
                                    <h2>{book.title}</h2>
                                    <p className="bookAuthor">{book.autor}</p>
                                    <p>Distribuido por {book.editorial}</p>
                                    <p>Se lanzó el {book.lanzamiento}</p>
                                    {book.descuento && <p className="isOnSale">¡Título en descuento!</p>}
                                    {book.bestSeller && (
                                        <p className="isBestseller">¡Este título es un Bestseller!</p>
                                    )}
                                </div>
                            </div>
                            <div className="bookInfo d-flex-center">
                                <div className="d-flex-space d-flex-column container">
                                    <div className="d-flex-center">
                                        <h3>{book.valoracion}</h3>
                                        <img src={star} alt="star" className="starIcon"></img>
                                    </div>
                                    <p>{book.opiniones} opiniones</p>
                                </div>
                                <div className="ebookIcon d-flex-column container">
                                    <img src={bookIcon} alt={book.title}></img>
                                    <p>Libro electrónico</p>
                                </div>
                                <div className="d-flex-space d-flex-column container">
                                    <h3>{book.paginas}</h3>
                                    <p>Páginas</p>
                                </div>
                                <div className="d-flex-space d-flex-column container">
                                    <h3>{book.edadLectura}+</h3>
                                    <p>Edad de lectura</p>
                                </div>
                            </div>
                            <div className="buySection d-flex-column">
                                {book.descuento ? (
                                    <>
                                        <div>
                                            <button className="buyDisabled">
                                                Precio normal ${book.precio}
                                            </button>
                                            <button
                                                className="buyButton"
                                                onClick={() =>
                                                    userData
                                                        ? setShowModal('cart')
                                                        : (window.location.href = '/login')
                                                }
                                            >
                                                En descuento ${book.precio_descuento}
                                            </button>
                                        </div>
                                        <p className="saleText">
                                            ¡Este libro está en promoción! Al descargarlo obtienes
                                            automáticamente una giftcard para tí o alguno de tus amigos.
                                        </p>
                                    </>
                                ) : (
                                    <div>
                                        <button
                                            className="buyButtonFull"
                                            onClick={() =>
                                                userData
                                                    ? setShowModal('cart')
                                                    : (window.location.href = '/login')
                                            }
                                        >
                                            Comprar este título por ${book.precio}
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div
                                className="aboutBook d-flex-column"
                                onClick={() => setShowModal('about')}
                            >
                                <div className="d-flex-space">
                                    <p className="aboutTitle">Acerca de</p>
                                    <PlayArrowIcon className="arrow-home" />
                                </div>
                                <p className="aboutText">
                                    Lorem ipsum dolor sit amet consectetur. Eleifend quis cursus quis in
                                    nulla est venenatis. Nunc eu aliquet dolor morbi egestas lacus.
                                    Mauris lorem risus at tortor (...)
                                </p>
                            </div>
                            <Opinions bookOpinions={book.opiniones_usuarios} />
                        </>
                    )}
                </div>
            </AnimatedDiv>
            <TeamModal />
            <TabBar />
        </>
    );
};

export default Book;
