import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { motion } from 'framer-motion';
import cartIcon from '../../assets/cart.svg';
import sadIcon from '../../assets/sad-emoji.svg';
import happyIcon from '../../assets/happy-emoji.svg';
import cardIcon from '../../assets/card-logo.svg';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import visa1 from '../../assets/visa1.png';
import visa2 from '../../assets/visa2.png';
import master1 from '../../assets/master1.png';
import succesfulIcon from '../../assets/succesful.svg';
import rejectedIcon from '../../assets/rejectedCard.svg';
import { Ring } from '@uiball/loaders';
import 'react-lazy-load-image-component/src/effects/blur.css';

const CheckoutModals = ({ book, showModal, setShowModal, userData, updateUser }) => {
    const [cards, setCards] = useState(userData.mediosPago);
    const [cardSelected, setCardSelected] = useState(0);
    const [loading, setLoading] = useState(false);

    const checkBook = (title) => {
        const search = userData.biblioteca.find((book) => book.title === title);
        return search !== undefined ? true : false;
    };

    const handleCreditCard = (num) => {
        let hiddenNum = num.slice(-4);
        return '****-' + hiddenNum;
    };

    const handleCardClass = (name, index) => {
        if (name === 'Visa Clásica') {
            return 'cardExpired d-flex-space';
        } else if (index === cardSelected) {
            return 'cardSelected d-flex-space';
        } else {
            return 'card d-flex-space';
        }
    };

    const handleImg = (name) => {
        if (name === 'Visa Santander') {
            return visa1;
        } else if (name === 'Visa Clásica') {
            return visa2;
        } else if (name === 'Mastercard') {
            return master1;
        }
    };

    const handlePay = async () => {
        setLoading(true);
        if (cards[cardSelected].saldo >= book.precio) {
            cards[cardSelected].saldo = cards[cardSelected].saldo - book.precio;
            userData.biblioteca.unshift(book);
            const localUser = JSON.parse(localStorage.getItem('idUser'));
            const update = await updateUser(localUser, userData.biblioteca, cards);
            if (update) {
                setShowModal('succesful');
                setLoading(false);
            } else {
                setLoading(false);
            }
        } else {
            setShowModal('rejected');
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="bookModal d-flex-center"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.15 }}
            onClick={() => setShowModal(false)}
        >
            {loading && (
                <div className="pageLoader">
                    <Ring size={60} lineWeight={3} speed={2} color="#ff5678" />
                </div>
            )}
            <div
                className="checkoutModal d-flex-center d-flex-column"
                onClick={(e) => e.stopPropagation()}
            >
                {showModal === 'cart' && (
                    <>
                        <div className="modalIcon d-flex-center">
                            <img src={cartIcon} alt="cart"></img>
                        </div>
                        <div className="cartContainer d-flex-column">
                            <div className="cartTitle">
                                <h3>Mi compra</h3>
                            </div>
                            <div className="cartBook d-flex-center">
                                <div className="bookImg">
                                    <img src={book.foto} alt={book.title}></img>
                                </div>
                                <div className="bookInfo d-flex-column">
                                    <h2>{book.title}</h2>
                                    <p className="bookAuthor">{book.autor}</p>
                                    <p>Distribuido por {book.editorial}</p>
                                    <p>Se lanzó el {book.lanzamiento}</p>
                                    {checkBook(book.title) && (
                                        <p className="bookAdquired">
                                            ¡Este título ya forma parte de tu biblioteca!
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="paymentSelected d-flex-column">
                                <h3>Método de pago</h3>
                                <div
                                    className="cardSelected d-flex-space"
                                    onClick={() => setShowModal('paymentMethod')}
                                >
                                    <div className="d-flex-center">
                                        <LazyLoadImage
                                            src={cards[cardSelected].foto_Tarjeta}
                                            alt="credit card"
                                            effect="blur"
                                            width="70px"
                                            height="45px"
                                        />
                                        <div className="cardInfo">
                                            <p className="cardName">{cards[cardSelected].subTitulo}</p>
                                            <p className="cardNumber">
                                                {handleCreditCard(cards[cardSelected].numero)}
                                            </p>
                                        </div>
                                    </div>
                                    <PlayArrowIcon className="arrow-home" />
                                </div>
                                <div className="cupon d-flex-space">
                                    <p>Tengo un cupón.</p>
                                    <PlayArrowIcon className="arrow-home" />
                                </div>
                            </div>
                            <div className="purchaseSummary">
                                <h3>Resumen de compra</h3>
                                <div className="subtotal d-flex-space">
                                    <p>Subtotal</p>
                                    <p>${book.precio}</p>
                                </div>
                                <div className="discount d-flex-space">
                                    <p>Descuento</p>
                                    <p>${book.precio - book.precio_descuento} (-20%)</p>
                                </div>
                                <div className="total d-flex-space">
                                    <p>Total</p>
                                    <p>${book.precio_descuento}</p>
                                </div>
                            </div>
                            <div className="purchaseButton d-flex-center">
                                {checkBook(book.title) ? (
                                    <button className="disabled d-flex-center">
                                        <p>Pagar</p>
                                    </button>
                                ) : (
                                    <button onClick={() => handlePay()} className="d-flex-center">
                                        <p>Pagar</p>
                                    </button>
                                )}
                            </div>
                        </div>
                    </>
                )}
                {showModal === 'paymentMethod' && (
                    <>
                        <div className="modalIcon d-flex-center">
                            <img src={cardIcon} alt="card"></img>
                        </div>
                        <div className="paymentContainer d-flex-column">
                            <div className="paymentTitle">
                                <h3>Método de pago</h3>
                            </div>
                            <div className="savedCardsHeader">
                                <p>Tarjetas guardadas</p>
                                <p>Selecciona una opción de la lista o agrega un método de pago.</p>
                            </div>
                            <div className="savedCards d-flex-column">
                                {cards.map((card, index) => {
                                    return (
                                        <div
                                            key={index}
                                            onClick={() =>
                                                card.subTitulo !== 'Visa Clásica' &&
                                                (setShowModal('cart'), setCardSelected(index))
                                            }
                                            className={handleCardClass(card.subTitulo, index)}
                                        >
                                            <div className="cardData d-flex-center">
                                                <img
                                                    src={handleImg(card.subTitulo)}
                                                    alt="credit card"
                                                ></img>
                                                <div>
                                                    <p>
                                                        {card.subTitulo} {handleCreditCard(card.numero)}
                                                    </p>
                                                    <p>
                                                        {card.subTitulo === 'Visa Clásica'
                                                            ? 'Expiró'
                                                            : 'Expira'}{' '}
                                                        el {card.expira}
                                                    </p>
                                                </div>
                                            </div>
                                            {cardSelected === index && (
                                                <p className="selected">Seleccionada</p>
                                            )}
                                            {card.subTitulo === 'Visa Clásica' && (
                                                <p className="expired">Tarjeta expirada</p>
                                            )}
                                            <MoreVertIcon className="menuIcon" />
                                        </div>
                                    );
                                })}
                                <div className="addCard d-flex-center">
                                    <div className="d-flex-center">
                                        <AddRoundedIcon />
                                    </div>
                                    <p>Agregar nuevo método de pago</p>
                                </div>
                            </div>
                            <div className="backToCart d-flex-center">
                                <p onClick={() => setShowModal('cart')}>
                                    Pulsa para volver al resumen de compra
                                </p>
                            </div>
                        </div>
                    </>
                )}
                {showModal === 'succesful' && (
                    <>
                        <div className="modalIcon d-flex-center">
                            <img src={happyIcon} alt="happy face"></img>
                        </div>
                        <div className="succesfulContainer d-flex-center d-flex-column">
                            <img src={succesfulIcon} alt="succesful"></img>
                            <h3>¡Compra realizada!</h3>
                            <p>Este título ya forma parte de tu biblioteca. ¡Disfrútalo!</p>
                            <button>
                                <Link to="/library">
                                    <p>Ver en mi biblioteca</p>
                                </Link>
                            </button>
                        </div>
                    </>
                )}
                {showModal === 'rejected' && (
                    <>
                        <div className="modalIcon d-flex-center">
                            <img src={sadIcon} alt="sad face"></img>
                        </div>
                        <div className="rejectedContainer d-flex-center d-flex-column">
                            <img src={rejectedIcon} alt="rejected"></img>
                            <h3>Fondos Insuficientes</h3>
                            <p>Tu pago no pudo ser procesado debido a falta de fondos en tu tarjeta.</p>
                            <button
                                onClick={() => setShowModal('paymentMethod')}
                                className="d-flex-center"
                            >
                                <p>Cambiar método de pago</p>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    );
};

export default CheckoutModals;
