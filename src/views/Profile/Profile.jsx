import TopNavigation from '../../components/TopNavigation/TopNavigation';
import TabBar from '../../components/TabBar/TabBar';
import { AnimatedDiv } from '../../components/AnimatedDiv/AnimatedDiv';
import profileImg from '../../assets/perfil-photo.svg';
import CreateIcon from '@mui/icons-material/Create';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SettingsIcon from '@mui/icons-material/Settings';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ErrorIcon from '@mui/icons-material/Error';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const Profile = () => {
    const handleSignOut = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    return (
        <>
            <TopNavigation title={'Mi perfil'} menu={true} />
            <AnimatedDiv>
                <div className="profileContainer">
                    <div className="profileData d-flex-center d-flex-column">
                        <img src={profileImg} alt="profile"></img>
                        <h3>Nuevo Usuario</h3>
                        <p>@nuevousuario</p>
                    </div>
                    <div className="dividerLine d-flex-center"></div>
                    <ul className="listFunctions d-flex-column">
                        <li className="d-flex-center">
                            <CreateIcon className="icon-profile" />
                            <p>Editar mi perfil</p>
                            <PlayArrowIcon className="arrow-profile" />
                        </li>
                        <li className="d-flex-center">
                            <PermIdentityIcon className="icon-profile" />
                            <p>Mi cuenta</p>
                            <PlayArrowIcon className="arrow-profile" />
                        </li>
                        <li className="d-flex-center">
                            <CreditCardIcon className="icon-profile" />
                            <p>Métodos de pago</p>
                            <PlayArrowIcon className="arrow-profile" />
                        </li>
                        <li className="d-flex-center">
                            <SettingsIcon className="icon-profile" />
                            <p>Configuración</p>
                            <PlayArrowIcon className="arrow-profile" />
                        </li>
                    </ul>
                    <div className="dividerLine d-flex-center"></div>
                    <ul className="listFunctions d-flex-column">
                        <li className="d-flex-center">
                            <WhatsAppIcon className="icon-profile" />
                            <p>Contacta a soporte</p>
                            <PlayArrowIcon className="arrow-profile" />
                        </li>
                        <li className="d-flex-center">
                            <ErrorIcon className="icon-profile" />
                            <p>Preguntas Frecuentes</p>
                            <PlayArrowIcon className="arrow-profile" />
                        </li>
                        <li className="d-flex-center signOut" onClick={() => handleSignOut()}>
                            <NightsStayIcon className="icon-profile" />
                            <p>Cerrar sesión</p>
                            <PlayArrowIcon className="arrow-profile" />
                        </li>
                    </ul>
                </div>
            </AnimatedDiv>
            <TabBar />
        </>
    );
};

export default Profile;
