import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

// Crear el contexto
const AccountUserContext = createContext();

const SECRET_KEY = 'your_secret_key'; // Cambia esto por una clave secreta más segura y almacenada de forma segura

// Función para encriptar datos
const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Función para desencriptar datos
const decryptData = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

// Proveer el contexto
export const AccountUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const token = Cookies.get('Authorize');
    if (token) {
      try {
        const response = await fetch('http://localhost:8000/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Enviar las credenciales con la solicitud
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);

          // Encriptar y guardar datos del usuario en localStorage o sessionStorage según sea necesario
          const encryptedUserData = encryptData(userData);
          if (localStorage.getItem('rememberMe') === 'true') {
            localStorage.setItem('user', encryptedUserData);
          } else {
            sessionStorage.setItem('user', encryptedUserData);
          }
        } else {
          console.error('Error al obtener datos del usuario:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    } else {
      // Si no hay token, intentar cargar desde localStorage o sessionStorage
      const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
      if (storedUser) {
        setUser(decryptData(storedUser));
      }
    }
    setLoading(false);
  };

  // Guardar datos del usuario en localStorage o sessionStorage
  const saveUser = (userData, rememberMe) => {
    setUser(userData);
    const encryptedUserData = encryptData(userData);
    if (rememberMe) {
      localStorage.setItem('user', encryptedUserData);
      localStorage.setItem('rememberMe', 'true');
    } else {
      sessionStorage.setItem('user', encryptedUserData);
      localStorage.removeItem('rememberMe');
    }
  };

  // Limpiar datos del usuario
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    localStorage.removeItem('rememberMe');
  };

  return (
    <AccountUserContext.Provider value={{ user, fetchUser, saveUser, clearUser, loading }}>
      {children}
    </AccountUserContext.Provider>
  );
};

// Hook para usar el contexto
export const useAccountUser = () => useContext(AccountUserContext);