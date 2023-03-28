import { createContext, useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    getDocs,
    query,
    collection,
    where,
    addDoc,
    doc,
    setDoc,
    getDoc,
    orderBy,
} from 'firebase/firestore';
import emailjs from '@emailjs/browser';

export const UseApiContext = createContext();

export const ApiContext = ({ children }) => {
    const [userData, setUserData] = useState();

    const firebaseConfig = {
        apiKey: '',
        authDomain: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: '',
        appId: '',
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const searchCollections = async (nameCollection) => {
        // LLAMADA SIMPLE PARA OBTENER TODOS LOS DATOS SOBRE CIERTOS OBJETOS DE LA BASE DE DATOS.
        const collectionsData = await getDocs(query(collection(db, nameCollection)));
        const collections = collectionsData.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
        });
        return collections;
    };

    const searchCollectionsOrder = async (nameCollection) => {
        // LLAMADA SIMPLE PARA OBTENER TODOS LOS DATOS SOBRE CIERTOS OBJETOS DE LA BASE DE DATOS.
        const collectionsData = await getDocs(query(collection(db, nameCollection), orderBy('orden')));
        const collections = collectionsData.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
        });
        return collections;
    };

    const collectionByParam = async (nameCollection, param, type) => {
        // REVISAR EN LA DOCUMENTACION DE FIREBASE COMO LLAMAR DOCUMENTOS CON PARAMETRO WHERE. USAR "param" Y "type".
        const collectionsData = await getDocs(
            query(collection(db, nameCollection), where(param, '==', type))
        );
        const collections = collectionsData.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
        });
        return collections;
    };

    const getBook = async (id) => {
        // OBTENER UN LIBRO POR ID
        const book = await getDoc(doc(db, 'libros', id));
        return book.data();
    };

    const getUser = async (email, password) => {
        // OBTENER UN USUARIO DE FIREBASE
        const users = await searchCollections('usuarios');
        const user = users.find((user) => user.email === email && user.contrasena === password);
        return user.length !== 0 ? user : false;
    };

    const getUserRegister = async (email) => {
        // CONSULTAR SI UN USUARIO ESTA REGISTRADO EN FIREBASE
        const users = await searchCollections('usuarios');
        const user = users.filter((user) => user.email === email);
        return user.length !== 0 ? true : false;
    };

    const getLocalUser = async (idUser) => {
        // OBTENER UN USUARIO DE FIREBASE CON ID DE LOCAL STORAGE
        const getUser = await getDoc(doc(db, 'usuarios', idUser));
        return getUser.data() ? getUser.data() : false;
    };

    const getUserPassword = async (email) => {
        // RECUPERAR CONTRASEÑA DEL USUARIO
        const users = await searchCollections('usuarios');
        const user = users.filter((user) => user.email === email);
        return user.length !== 0 ? user : false;
    };

    const addUser = async (newUser) => {
        // AGREGAR UN NUEVO USUARIO A LA COLECCION "usuarios" CON SU CORRESPONDIENTE ARRAY.
        const user = await addDoc(collection(db, 'usuarios'), newUser);
        return user.id;
        
    };

    const updateUser = async (idUser, library, balance) => {
        // AGREGAR UN LIBRO A LA BIBLIOTECA DE CIERTO USUARIO
        const user = doc(db, 'usuarios', idUser);
        await setDoc(user, { biblioteca: library, mediosPago: balance }, { merge: true });
        return true;
    };

    const emailJS = async (data) => {
        // API NECESARIA PARA ENVIAR UN CORREO ELECTRONICO A CIERTO MAIL.

        // ARRAY NECESARIO DE "data"
        // const array= {
        //     nombre:"",
        //     contrasena:"",
        //     toMail:""
        // }

        emailjs.send('service_rkbguuj', 'template_7y8c547', data, 'EtNdfQu1yjfSB4fDT').then(
            function (response) {
                //console.log(response);
                return true;
            },
            function (error) {
                console.log(error);
                return false;
            }
        );
    };

    return (
        <UseApiContext.Provider
            value={{
                userData,
                setUserData,
                searchCollections,
                searchCollectionsOrder,
                collectionByParam,
                getBook,
                getUser,
                getUserRegister,
                getLocalUser,
                getUserPassword,
                addUser,
                updateUser,
                emailJS,
            }}
        >
            {children}
        </UseApiContext.Provider>
    );
};
