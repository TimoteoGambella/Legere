import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { AnimatedDiv } from '../../components/AnimatedDiv/AnimatedDiv';
import loginImg from '../../assets/login.svg';
import registerImg from '../../assets/register.svg';
import { Ring } from '@uiball/loaders';

const Login = () => {
    const [navigate, setNavigate] = useState(false);
    const [registerForm, setRegisterForm] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <>
            {navigate ? (
                <Navigate to="/home" />
            ) : (
                <AnimatedDiv>
                <div className="loginContainer d-flex-center d-flex-column">
                    <div className="d-flex-column">
                        <div className="loginTitle d-flex-center">
                            <h3>{!registerForm ? 'Inicia Sesión' : 'Regístrate'}</h3>
                        </div>
                        <div>
                            <img src={!registerForm ? loginImg : registerImg} alt="dacing person"></img>
                        </div>
                    </div>
                    {!registerForm ? (
                        <LoginForm
                            setNavigate={setNavigate}
                            registerForm={registerForm}
                            setRegisterForm={setRegisterForm}
                            loading={loading}
                            setLoading={setLoading}
                            Ring={Ring}
                        />
                    ) : (
                        <RegisterForm
                            setNavigate={setNavigate}
                            registerForm={registerForm}
                            setRegisterForm={setRegisterForm}
                            loading={loading}
                            setLoading={setLoading}
                            Ring={Ring}
                        />
                    )}
                </div>
            </AnimatedDiv>
            )}
        </>
    );
};

export default Login;
