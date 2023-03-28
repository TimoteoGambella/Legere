import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import star from '../../assets/star.svg';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import 'react-lazy-load-image-component/src/effects/blur.css';

const HomeLibrary = ({ books }) => {
    return (
        <div className="homeLibraryContainer d-flex-space">
            {books.map((book) => {
                return (
                    <Link key={book.title} to={`/library`}>
                        <div className="homeLibraryBook d-flex-column">
                            <LazyLoadImage
                                src={book.foto}
                                alt={book.title}
                                effect="blur"
                                width="170px"
                                height="216px"
                            />
                            <div className="bookInfo">
                                <h2>{book.title}</h2>
                                <div className="d-flex-space">
                                    <p className="bookAuthor">{book.autor}</p>
                                    <div className="miscellaneous d-flex-space">
                                        <p>{book.valoracion}</p>
                                        <img className="star" src={star} alt="star"></img>
                                        <FileDownloadOutlinedIcon />
                                        <CheckOutlinedIcon />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default HomeLibrary;
