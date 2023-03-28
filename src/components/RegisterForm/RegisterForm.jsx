import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UseApiContext } from '../../context/ApiContext';
import ErrorIcon from '@mui/icons-material/Error';

const RegisterForm = ({ setNavigate, registerForm, setRegisterForm, loading, setLoading, Ring }) => {
    const { getUserRegister, addUser, setUserData } = useContext(UseApiContext);
    const [invalidData, setInvalidData] = useState(false);

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ mode: 'onTouched' });

    const validateRegister = async ({ email, password }) => {
        setLoading(true);
        const createUser = (email, password) => {
            return {
                nombreApellido: '',
                email: email,
                contrasena: password,
                mediosPago: [
                    {
                        foto_Tarjeta:
                            'https://firebasestorage.googleapis.com/v0/b/legere-ab3ce.appspot.com/o/tarjetas%2Fvisa.png?alt=media&token=919143e6-057f-4948-ac40-b445eda8f3a0',
                        titulo: 'VISA',
                        subTitulo: 'Visa Santander',
                        numero: '21902320',
                        expira: '11/25',
                        saldo: 9120,
                    },
                    {
                        foto_Tarjeta:
                            'https://firebasestorage.googleapis.com/v0/b/legere-ab3ce.appspot.com/o/tarjetas%2Fvisa.png?alt=media&token=919143e6-057f-4948-ac40-b445eda8f3a0',
                        titulo: 'VISA',
                        subTitulo: 'Visa Clásica',
                        numero: '90123921',
                        expira: '03/20',
                        saldo: 1200,
                    },
                    {
                        foto_Tarjeta:
                            'https://firebasestorage.googleapis.com/v0/b/legere-ab3ce.appspot.com/o/tarjetas%2Fmaster.png?alt=media&token=6a1dff04-3b4b-441d-bc2f-66da1a877da2',
                        titulo: 'MASTERCARD',
                        subTitulo: 'Mastercard',
                        numero: '38591230',
                        expira: '03/28',
                        saldo: 0,
                    },
                ],
                biblioteca: [],
            };
        };

        const userExists = await getUserRegister(email, password);
        if (userExists) {
            reset();
            setInvalidData(true);
            setLoading(false);
        } else {
            try {
                const userId = await addUser(createUser(email, password));
                localStorage.setItem('idUser', JSON.stringify(userId));
            } catch (err) {
                console.log(err);
                setLoading(false);
            } finally {
                setUserData(createUser(email, password));
                setNavigate(true);
            }
        }
    };

    return (
        <>
            {loading && (
                <div className="pageLoader">
                    <Ring size={60} lineWeight={3} speed={2} color="#ff5678" />
                </div>
            )}
            <form
                onSubmit={handleSubmit(validateRegister)}
                className="loginForm registerForm d-flex-center d-flex-column"
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
                            <small>El correo ingresado ya está registrado</small>
                        </div>
                    )}
                </div>
                <div className="form-input d-flex-center d-flex-column">
                    <label className={errors.password ? 'formErrorText' : ''}>Crea una contraseña</label>
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
                <div className="form-input d-flex-center d-flex-column">
                    <label className={errors.confirmPassword ? 'formErrorText' : ''}>
                        Repite tu contraseña
                    </label>
                    <input
                        type="password"
                        className={errors.confirmPassword ? 'formErrorBorder formErrorText' : ''}
                        {...register('confirmPassword', {
                            required: true,
                            validate: (val) => {
                                if (watch('password') !== val) {
                                    return false;
                                }
                            },
                        })}
                    />
                    {errors.confirmPassword && (
                        <div className="formErrorIcon container">
                            <ErrorIcon />
                        </div>
                    )}
                    {errors.confirmPassword?.type === 'required' && (
                        <div className="formErrorMessage container">
                            <small>Ingresá tu constraseña</small>
                        </div>
                    )}
                    {errors.confirmPassword?.type === 'validate' && (
                        <div className="formErrorMessage container">
                            <small>Ambas contraseñas deben coincidir.</small>
                        </div>
                    )}
                </div>
                <div className="d-flex-space container">
                    <div className="checkboxLogin d-flex-center">
                        <input type="checkbox" name="checkbox" />
                        <p className="d-flex-center checkboxLegals">
                            Acepto los <span className="colored">Términos y Condiciones</span>de la
                            <span className="colored">Política de Privacidad.</span>
                        </p>
                    </div>
                </div>
                <button type="submit" className="d-flex-center">
                    <p>Registrarme</p>
                </button>
                <div className="createAccount d-flex-center">
                    <p>¿Ya tienes cuenta?</p>
                    <p
                        onClick={() => {
                            setRegisterForm(!registerForm);
                            reset();
                        }}
                    >
                        Inicia sesión aquí.
                    </p>
                </div>
                <div className="skipLogin" onClick={() => setNavigate(true)}>
                    <p>Omitir este paso</p>
                </div>
            </form>
        </>
    );
};

export default RegisterForm;
