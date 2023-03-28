import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ReactComponent as RatingStar } from '../../assets/star.svg';
import 'swiper/css';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Opinions = ({ bookOpinions }) => {
    const [showOpinions, setShowOpinions] = useState(false);

    useEffect(() => {
        bookOpinions && setShowOpinions(true);
    }, [bookOpinions]);

    const handleStars = (val) => {
        let stars = [...Array(5)].map((star, i) => {
            return (
                <RatingStar
                    key={i}
                    width={16}
                    height={16}
                    className={i < val ? 'yellowStar' : 'greyStar'}
                />
            );
        });
        return stars;
    };

    return (
        <div className="bookOpinions">
            <p className="opinionsTitle">Opiniones</p>
            {showOpinions && (
                <Swiper simulateTouch={true} freeMode={true} slidesPerView={1.5}>
                    {bookOpinions.map((slide) => (
                        <SwiperSlide key={slide.nombre}>
                            <>
                                <div className="opinionContainer">
                                    <div>
                                        <LazyLoadImage
                                            src={slide.foto}
                                            effect="blur"
                                            width="75px"
                                            height="72px"
                                        />
                                    </div>
                                    <div>
                                        <h3>{slide.nombre}</h3>
                                        <div className="opinionStars d-flex-centers">
                                            {handleStars(slide.valoracion)}
                                        </div>
                                    </div>
                                </div>
                                <div className="opinionText">
                                    <p>{slide.opinion}</p>
                                </div>
                            </>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default Opinions;
