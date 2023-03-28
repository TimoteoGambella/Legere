import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UseApiContext } from '../../context/ApiContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import TopNavigation from '../../components/TopNavigation/TopNavigation';
import TabBar from '../../components/TabBar/TabBar';
import { AnimatedDiv } from '../../components/AnimatedDiv/AnimatedDiv';
import biblioteca from '../../assets/biblioteca.svg';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuIcon from '@mui/icons-material/Menu';
import filter from '../../assets/filter.svg';
import { Ring } from '@uiball/loaders';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Library = () => {
    const { userData, setUserData, getLocalUser } = useContext(UseApiContext);
    const [library, setLibrary] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userData) {
            const localUser = JSON.parse(localStorage.getItem('idUser'));
            if (localUser) {
                getLocalUser(localUser).then((data) => {
                    setUserData(data);
                    data.biblioteca.length !== 0 && setLibrary(true);
                    setLoading(false);
                });
            } else {
                setLoading(false);
            }
        } else {
            setLoading(false);
            userData.biblioteca.length !== 0 && setLibrary(true);
        }
    }, []);

    return (
        <>
            <TopNavigation title={'Biblioteca'} search={true} />
            <AnimatedDiv>
                <div className="libraryContainer">
                    <nav>
                        <ul className="d-flex-center">
                            <li className="library-active">
                                Ebooks
                                <div className="underlineFigure"></div>
                            </li>
                            <li>Audiolibros</li>
                            <li>Wishlist</li>
                        </ul>
                    </nav>
                    <div className="librarySection">
                        <div className="d-flex-space">
                            <div className="filterBooks d-flex-center">
                                <img src={filter} alt=""></img>
                                <p>Ordenar por: Recientes</p>
                            </div>
                            <div className="viewSettings d-flex-center">
                                <p>Vista: Lista</p>
                                <MenuIcon />
                            </div>
                        </div>
                        {loading ? (
                            <div className="loader d-flex-center">
                                <Ring size={60} lineWeight={3} speed={2} color="#ff5678" />
                            </div>
                        ) : library ? (
                            userData.biblioteca.map((book) => {
                                return (
                                    <div key={book.title} className="libraryBook d-flex-space">
                                        <div className="d-flex-center">
                                            <div className="bookImg">
                                                <LazyLoadImage
                                                    src={book.foto}
                                                    alt={book.title}
                                                    effect="blur"
                                                    width="90px"
                                                    height="114px"
                                                />
                                            </div>
                                            <div className="bookInfo d-flex-column">
                                                <h2>{book.title}</h2>
                                                <p className="bookAuthor">{book.autor}</p>
                                                <p className="category">{book.categoria}</p>
                                                <p className="pages">{book.paginas} páginas</p>
                                            </div>
                                        </div>
                                        <div className="bookActions d-flex-center">
                                            <FileDownloadOutlinedIcon />
                                            <CheckOutlinedIcon />
                                            <MoreVertIcon />
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="libraryEmpty d-flex-center d-flex-column">
                                <img src={biblioteca} alt="library"></img>
                                <h3>Biblioteca vacía</h3>
                                <p>
                                    Aquí se mostrarán tus lecturas disponibles. Adquiere un título y
                                    comienza a leer.
                                </p>
                                <button>
                                    <Link to="/categories">
                                        <p>Explora el catálogo</p>
                                    </Link>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </AnimatedDiv>
            <TabBar />
        </>
    );
};

export default Library;
