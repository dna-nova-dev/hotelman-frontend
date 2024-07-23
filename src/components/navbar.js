import React from 'react';
import AuthenticatedActions from './authenticatedactions';
import UserWidget from './userwidget';
import { Link } from 'react-router-dom';

const Navbar = ({ title, onRegister, fromAdmin }) => {

  // Determina si el usuario está autenticado
  const isAuthenticated = true;

  return (
    <div className="w-full flex justify-between items-center px-10 py-4 bg-white shadow-md">
      <div className="flex items-center">
        <Link to="/dashboard">
          <img className="h-20 w-auto" src="/images/logo.svg" alt="Logo" />
        </Link>
        {fromAdmin && <h2 className="ml-6 font-semibold text-gray-900 text-lg">{title}</h2>}
        {isAuthenticated && !fromAdmin && <AuthenticatedActions className="ml-6" onPage={title} fromAdmin={fromAdmin}/>} {/* Mostrar acciones solo si está autenticado y no es admin */}
      </div>
      <div className="flex items-center ml-auto">
        <UserWidget isAuthenticated={isAuthenticated} onRegister={onRegister}/>
        <img className="h-16 w-16 ml-2" src="/images/guest.svg" alt="Guest" />
      </div>
    </div>
  );
};

export default Navbar;