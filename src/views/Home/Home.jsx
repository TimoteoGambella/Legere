import { useContext, useEffect, useState } from 'react';
import { UseApiContext } from '../../context/ApiContext';
import TopNavigation from '../../components/TopNavigation/TopNavigation';
import HomeLinks from '../../components/HomeLinks/HomeLinks';
import TabBar from '../../components/TabBar/TabBar';
import HomeLibrary from '../../components/HomeLibrary/HomeLibrary';
import HomeRecomendations from '../../components/HomeRecomendations/HomeRecomendations';
import TeamModal from '../../components/TeamModal/TeamModal';
import { AnimatedDiv } from '../../components/AnimatedDiv/AnimatedDiv';
import banner from '../../assets/banner-premium.svg';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Ring } from '@uiball/loaders';

const Home = () => {
    const { userData, setUserData, getLocalUser } = useContext(UseApiContext);
    const [showLibrary, setShowLibrary] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userData) {
            const localUser = JSON.parse(localStorage.getItem('idUser'));
            if (localUser) {
                getLocalUser(localUser).then((data) => {
                    if (data) {
                        setUserData(data);
                        data.biblioteca.length > 0 && setShowLibrary(true);
                        setLoading(false);
                    }
                });
            } else {
                setLoading(false);
            }
        } else {
            userData.biblioteca.length > 0 && setShowLibrary(true);
            setLoading(false);
        }
    }, []);

    return (
        <>
            <TopNavigation title={'¡Te damos la bienvenida!'} search={true} />
            <AnimatedDiv>
                <div className="homeContainer">
                    <div className="homeBanner">
                        <img src={banner} alt="banner"></img>
                        <div className="homeBanner-text">
                            <p>
                                Consigue <span style={{ fontWeight: 700 }}>Legere Prime</span> por tan
                                solo
                                <span style={{ fontWeight: 700 }}> $50 MXN</span> al mes.
                            </p>
                            <p className="banner-moreInfo">Pulsa para más información.</p>
                        </div>
                    </div>
                    <p className="homeTitle">¿Qué estás buscando?</p>
                    <HomeLinks />
                    {loading ? (
                        <div className="loader d-flex-center">
                            <Ring size={60} lineWeight={3} speed={2} color="#ff5678" />
                        </div>
                    ) : (
                        <>
                            {showLibrary && (
                                <>
                                    <div className="d-flex-space">
                                        <p className="homeTitle">Explora tu biblioteca</p>
                                        <PlayArrowIcon className="arrow-home" />
                                    </div>
                                    <HomeLibrary books={userData.biblioteca.slice(0, 3)} />
                                </>
                            )}
                            <p className="homeTitle">Recomendaciones de Legere</p>
                            <HomeRecomendations />
                        </>
                    )}
                </div>
            </AnimatedDiv>
            <TeamModal/>
            <TabBar />
        </>
    );
};

export default Home;
