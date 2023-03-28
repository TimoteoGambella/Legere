import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import banner1 from '../../assets/banner-1.svg';
import banner2 from '../../assets/banner-2.svg';
import banner3 from '../../assets/banner-3.svg';
import 'swiper/css';
import 'swiper/css/pagination';

const Carousel = ({ setHandleSwiper, setActiveSlide }) => {
    const slides = [
        {
            id: '1',
            image: `${banner1}`,
            header: 'Una librería al alcance de tu mano.',
            text: (
                <>
                    Con nuestro {<b>lector digital</b>} tendrás acceso a tus lecturas en el momento que
                    lo necesites.
                </>
            ),
            bold: `<b>Test<b>`,
        },
        {
            id: '2',
            image: `${banner2}`,
            header: 'Una librería al alcance de tu mano.',
            text: (
                <>
                    Con autores comerciales e independientes, de más de 150 países y más de{' '}
                    {<b>300,000 títulos</b>}, tenemos el acervo literario digital más grande de
                    Latinoamérica.
                </>
            ),
        },
        {
            id: '3',
            image: `${banner3}`,
            header: 'Conviértete en lector Premium.',
            text: (
                <>
                    Descargas {<b>sin límite</b>}, 2GB de almacenamiento extra, {<b>descuentos </b>}
                    permanentes y más. ¿Qué esperas?
                </>
            ),
        },
    ];
    return (
        <>
            <Swiper
                onSwiper={(swiper) => setHandleSwiper(swiper)}
                onRealIndexChange={(index) => setActiveSlide(index.activeIndex)}
                pagination={true}
                simulateTouch={false}
                modules={[Pagination]}
                className="mySwiper"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className='slideContainer'>
                            <div className="slideImg d-flex-center">
                                <img src={slide.image} alt="illustration of person"></img>
                                
                            </div>
                            <div className="slideText">
                                <h3>{slide.header}</h3>
                                <p>{slide.text}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default Carousel;
