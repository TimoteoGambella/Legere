import { useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../../components/Carousel/Carousel';
import { AnimatedDiv } from '../../components/AnimatedDiv/AnimatedDiv';

const Onboarding = () => {
    const [handleSwiper, setHandleSwiper] = useState();
    const [activeSlide, setActiveSlide] = useState();

    return (
        <AnimatedDiv>
            <div className="onboardingContainer d-flex-column">
                <div className="carouselContainer">
                    <Carousel setHandleSwiper={setHandleSwiper} setActiveSlide={setActiveSlide} />
                </div>
                <div className="onBoardingButtons d-flex-center d-flex-column">
                    {activeSlide !== 2 ? (
                        <>
                            <button
                                onClick={() => handleSwiper.slideNext()}
                                className="onboarding-next d-flex-center"
                            >
                                <p>Siguiente</p>
                            </button>
                            <Link to={'/login'}>
                                <div className="onboarding-skip">
                                    <p>Omitir</p>
                                </div>
                            </Link>
                        </>
                    ) : (
                        <button className="onboarding-redirect">
                            <Link to={'/login'}>
                                <p>Comenzar</p>
                            </Link>
                        </button>
                    )}
                </div>
            </div>
        </AnimatedDiv>
    );
};

export default Onboarding;
