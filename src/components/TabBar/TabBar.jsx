import HomeIcon from '@mui/icons-material/Home';
import PublicIcon from '@mui/icons-material/Public';
import BookIcon from '@mui/icons-material/Book';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { NavLink } from 'react-router-dom';

const TabBar = () => {
    return (
        <nav className="tabBar">
            <ul className="d-flex-center">
                <li>
                    <NavLink
                        to="/home"
                        className={({ isActive }) =>
                            isActive ? 'activeTab d-flex-column' : 'd-flex-column'
                        }
                    >
                        <HomeIcon />
                        <p>Inicio</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/categories"
                        className={({ isActive }) =>
                            isActive ? 'activeTab d-flex-column' : 'd-flex-column'
                        }
                    >
                        <PublicIcon />
                        <p>Categorías</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/library"
                        className={({ isActive }) =>
                            isActive ? 'activeTab d-flex-column' : 'd-flex-column'
                        }
                    >
                        <BookIcon />
                        <p>Biblioteca</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            isActive ? 'activeTab d-flex-column' : 'd-flex-column'
                        }
                    >
                        <PermIdentityIcon />
                        <p>Perfil</p>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default TabBar;
