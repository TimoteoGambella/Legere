import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UseApiContext } from '../../context/ApiContext';
import RetrievePassword from '../RetrievePassword/RetrievePassword';
import ErrorIcon from '@mui/icons-material/Error';

const LoginForm = ({ setNavigate, registerForm, setRegisterForm, loading, setLoading, Ring }) => {
    const { getUser, setUserData } = useContext(UseApiContext);
    const [handleModal, setHandleModal] = useState(false);
    const [invalidData, setInvalidData] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ mode: 'onTouched' });

    const validateLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const user = await getUser(email, password);
            localStorage.setItem('idUser', JSON.stringify(`${user.id}`));
            setUserData(user);
            setNavigate(true);
        } catch {
            setInvalidData(true);
            setLoading(false);
        }
    };

    return (
        <>
            {loading && (
                <div className="pageLoader">
                    <Ring size={60} lineWeight={3} speed={2} color="#ff5678" />
                </div>
            )}
            {handleModal && (
                <RetrievePassword
                    loading={loading}
                    setLoading={setLoading}
                    Ring={Ring}
                    setHandleModal={setHandleModal}
                    invalidData={invalidData}
                    setInvalidData={setInvalidData}
                />
            )}
            <form
                onSubmit={handleSubmit(validateLogin)}
                className="loginForm d-flex-center d-flex-column"
            >
                <div className="form-input d-flex-center d-flex-column">
                    <label className={errors.email ? 'formErrorText' : ''}>Escribe tu email</label>
                    <input
                        type="text"
                        className={errors.email ? 'formErrorBorder formErrorText' : ''}
                        {...register('email', {
                            required: true,
                            pattern:
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        })}
                    />
                    {errors.email && (
                        <div className="formErrorIcon container">
                            <ErrorIcon />
                        </div>
                    )}
                    {errors.email?.type === 'required' && (
                        <div className="formErrorMessage container">
                            <small>Ingresá tu email</small>
                        </div>
                    )}
                    {errors.email?.type === 'pattern' && (
                        <div className="formErrorMessage container">
                            <small>El email ingresado no es válido</small>
                        </div>
                    )}
                    {invalidData && !errors.email && (
                        <div className="formErrorMessage container">
                            <small>Los datos ingresados no son válidos</small>
                        </div>
                    )}
                </div>
                <div className="form-input d-flex-center d-flex-column">
                    <label className={errors.password ? 'formErrorText' : ''}>
                        Escribe tu contraseña
                    </label>
                    <input
                        type="password"
                        className={errors.password ? 'formErrorBorder formErrorText' : ''}
                        {...register('password', {
                            required: true,
                            minLength: 10,
                        })}
                    />
                    {errors.password && (
                        <div className="formErrorIcon container">
                            <ErrorIcon />
                        </div>
                    )}

                    {errors.password?.type === 'required' && (
                        <div className="formErrorMessage container">
                            <small>Ingresá tu constraseña</small>
                        </div>
                    )}
                    {errors.password?.type === 'minLength' && (
                        <div className="formErrorMessage container">
                            <small>Tu contraseña debe tener al menos 10 caracteres.</small>
                        </div>
                    )}
                </div>
                <div className="d-flex-space container">
                    <div className="checkboxLogin d-flex-center">
                        <input type="checkbox" name="checkbox" />
                        <p>Recuérdame</p>
                    </div>
                    <div className="requestPassword">
                        <p onClick={() => setHandleModal(true)}>Olvidé mi contraseña</p>
                    </div>
                </div>
                <button type="submit" className="d-flex-center">
                    <p>Iniciar Sesión</p>
                </button>
                <div className="createAccount d-flex-center">
                    <p>¿No tienes cuenta?</p>
                    <p
                        onClick={() => {
                            setRegisterForm(!registerForm);
                            reset();
                        }}
                    >
                        Regístrate aquí.
                    </p>
                </div>
                <div className="skipLogin" onClick={()=>setNavigate(true)}>
                    <p>Omitir este paso</p>
                </div>
            </form>
        </>
    );
};

export default LoginForm;
