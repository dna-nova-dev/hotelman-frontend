import React, { useState, useEffect } from 'react';
import AuthenticatedActions from './authenticatedactions';
import UserWidget from './userwidget';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Navbar = ({ title, onRegister, fromAdmin }) => {
  // Determina si el usuario está autenticado
  const isAuthenticated = true;

  // Estado para manejar la carga de la imagen y el estado de los skeletons
  const [loading, setLoading] = useState(true);

  // Función para manejar la carga de la imagen
  const handleImageLoad = () => {
    setLoading(false);
  };

  // Usar useEffect para establecer un tiempo de espera de 5 segundos antes de ocultar los skeletons
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 5 segundos

    // Limpiar el temporizador si el componente se desmonta antes de que el tiempo expire
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex justify-between items-center px-10 py-4 bg-white shadow-md">
      <div className="flex items-center">
        <Link to="/dashboard">
          {loading ? (
            <Skeleton className="h-20 w-auto" />
          ) : (
            <img
              className="h-20 w-auto"
              src="/images/logo.svg"
              alt="Logo"
              onLoad={handleImageLoad}
            />
          )}
        </Link>
        {loading ? (
          <Skeleton className="ml-6 h-8 w-48" />
        ) : (
          fromAdmin && <h2 className="ml-6 font-semibold text-gray-900 text-lg">{title}</h2>
        )}
        {loading ? (
          <Skeleton className="ml-6 h-8 w-32" />
        ) : (
          isAuthenticated && !fromAdmin && <AuthenticatedActions className="ml-6" onPage={title} fromAdmin={fromAdmin}/>
        )}
      </div>
      <div className="flex items-center ml-auto">
        {loading ? (
          <Skeleton circle={false} height={64} width={250} />
        ) : (
          <UserWidget isAuthenticated={isAuthenticated} onRegister={onRegister}/>
        )}
      </div>
    </div>
  );
};

export default Navbar;