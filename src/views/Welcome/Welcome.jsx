import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UseApiContext } from '../../context/ApiContext';
import loaderLogo from '../../assets/loader-logo.svg';
import { motion } from 'framer-motion';

const Welcome = () => {
    const [navigate, setNavigate] = useState(false);
    const { getLocalUser, setUserData } = useContext(UseApiContext);

    useEffect(() => {
        setTimeout(() => {
            const localUser = JSON.parse(localStorage.getItem('idUser'));
            if (localUser) {
                getLocalUser(localUser).then((data) =>
                    data ? (setNavigate('/home'), setUserData(data)) : setNavigate('/login')
                );
            } else {
                setNavigate('/onboarding');
            }
        }, 1500);
    }, []);

    return (
        <>
            {navigate ? (
                <Navigate to={navigate} />
            ) : (
                <div className="welcomeContainer d-flex-center">
                    <img src={loaderLogo} alt="flemish logo"></img>
                </div>
            )}
        </>
    );
};

export default Welcome;
