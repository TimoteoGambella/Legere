import { useState } from 'react';
import { motion } from 'framer-motion';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import timoteo from '../../assets/timoteo.jpeg';
import erick from '../../assets/erick.jpeg';
import gaston from '../../assets/gaston.jpg';
import linkedinIcon from '../../assets/linkedin.svg';
import githubIcon from '../../assets/github.svg';
import behanceIcon from '../../assets/behance.svg';
import emailIcon from '../../assets/email.svg';

const TeamModal = () => {
    const [modal, setModal] = useState(false);
    const [personSelected, setPersonSelected] = useState(false);

    const handleSelectedStyle = (id) => {
        return personSelected === id
            ? 'selected collaborator d-flex-center d-flex-column'
            : 'collaborator d-flex-center d-flex-column';
    };

    const workTeam = [
        {
            id: '1',
            name: 'Timoteo Gambella',
            rol: 'Lead & Front End Developer',
            linkedin: 'https://www.linkedin.com/in/timoteo-gambella-4b6418210/',
            web: 'https://github.com/TimoteoGambella',
            email: 'timi.gambella@hotmail.com',
            img: `${timoteo}`,
        },
        {
            id: '2',
            name: 'Erick Magallan',
            rol: 'UX/UI Designer',
            linkedin: 'https://www.linkedin.com/in/erickmagallan/',
            web: 'https://www.behance.net/erickmagallan',
            email: 'arqeemg@gmail.com',
            img: `${erick}`,
        },
        {
            id: '3',
            name: 'Gaston Avogadro',
            rol: 'Front End Developer / React',
            linkedin: 'https://www.linkedin.com/in/gaston-avogadro/',
            web: 'https://github.com/GastonAvogadro',
            email: 'gaston.avogadro@gmail.com',
            img: `${gaston}`,
        },
    ];

    return (
        <>
            <div className="teamButtonContainer">
                <div className="teamButton d-flex-center" onClick={() => setModal(true)}>
                    <PeopleAltIcon fontSize="medium" />
                    <p>Team</p>
                </div>
            </div>
            {modal && (
                <div
                    className="teamModalContainer d-flex-center"
                    onClick={() => {
                        setModal(false);
                        setPersonSelected(false);
                    }}
                >
                    <motion.div
                        className="teamModal d-flex-center d-flex-column"
                        initial={{ y: '-100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ duration: 0.15 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modalIcon d-flex-center">
                            <PeopleAltIcon fontSize="large" />
                        </div>
                        <h3 className="modalTitle">¡Conoce al equipo!</h3>
                        <div className="workTeam d-flex-center d-flex-column">
                            {workTeam.map((person) => (
                                <div className={handleSelectedStyle(person.id)} key={person.id}>
                                    <div
                                        className="collaborator-img"
                                        onClick={() => setPersonSelected(person.id)}
                                    >
                                        <img src={person.img} alt={person.name}></img>
                                    </div>
                                    <div className="collaborator-info d-flex-center d-flex-column">
                                        <h2>{person.name}</h2>
                                        <p>{person.rol}</p>
                                    </div>
                                    <div className="collaborator-links d-flex-center">
                                        <a href={person.linkedin} className="d-flex-center">
                                            <img src={linkedinIcon} alt="linkedin" />
                                        </a>
                                        <a href={person.web} className="d-flex-center">
                                            <img
                                                src={
                                                    person.web.includes('github')
                                                        ? githubIcon
                                                        : behanceIcon
                                                }
                                                alt="github"
                                            />
                                        </a>
                                        <a
                                            href="mailto:gaston.avogado@gmail.com"
                                            className="d-flex-center"
                                        >
                                            <img src={emailIcon} alt="email" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            )}
        </>
    );
};

export default TeamModal;
