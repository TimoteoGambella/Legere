import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UseApiContext } from '../../context/ApiContext';
import { motion } from 'framer-motion';
import forgetPass from '../../assets/forget-pass.svg';
import ErrorIcon from '@mui/icons-material/Error';

const RetrievePassword = ({ setHandleModal, loading, setLoading, Ring }) => {
    const { getUserPassword, emailJS } = useContext(UseApiContext);
    const [emailSent, setEmailSent] = useState(false);
    const [invalidData, setInvalidData] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onTouched' });

    const sendMail = async (mail) => {
        setLoading(true);
        setEmailSent(false);
        setInvalidData(false);
        try {
            const user = await getUserPassword(mail.email);
            const array = {
                nombre: user[0].email,
                contrasena: user[0].contrasena,
                toMail: user[0].email,
            };
            emailJS(array);
            setEmailSent(true);
        } catch {
            setInvalidData(true);
        } finally {
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
            <div className="blurBackground" onClick={() => setHandleModal(false)}>
                <motion.div
                    className="retrievePasswordModal d-flex-center d-flex-column"
                    initial={{ y: '-100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ duration: 0.15 }}
                    onClick={(e)=> e.stopPropagation()}
                    
                >
                    <span className="closeIcon" onClick={() => setHandleModal(false)}></span>
                    <h3>¿Olvidaste tu contraseña?</h3>
                    <img src={forgetPass} alt="human touching heart"></img>
                    <p>No te preocupes, ingresa tu email y te ayudaremos a recuperarla.</p>
                    <form
                        onSubmit={handleSubmit(sendMail)}
                        className="emailForm d-flex-center d-flex-column"
                    >
                        <div className="form-input d-flex-center d-flex-column">
                            <label className={errors.email ? 'formErrorText' : ''}>
                                Escribe tu email
                            </label>
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
                                <div className="formErrorIcon d-flex-center">
                                    <ErrorIcon />
                                </div>
                            )}
                            {errors.email?.type === 'required' && (
                                <div className="formErrorMessage d-flex-center">
                                    <small>Ingresá tu email</small>
                                </div>
                            )}
                            {errors.email?.type === 'pattern' && (
                                <div className="formErrorMessage d-flex-center">
                                    <small>El email ingresado no es válido</small>
                                </div>
                            )}
                            {invalidData && !errors.email && (
                                <div className="formErrorMessage d-flex-center">
                                    <small>El email ingresado no está registrado</small>
                                </div>
                            )}
                            {emailSent && !errors.email && (
                                <div className="formErrorMessage d-flex-center">
                                    <small>El email ha sido enviado a su correo</small>
                                </div>
                            )}
                        </div>
                        <button type="submit" className="d-flex-center">
                            <p>Recuperar contraseña</p>
                        </button>
                    </form>
                </motion.div>
            </div>
        </>
    );
};

export default RetrievePassword;
