// UserWidget.js
import React from 'react';

const UserWidget = ({ isAuthenticated, onRegister }) => {
  if (isAuthenticated) {
    return (
      <div className="text-right leading-3">
        <div className="text-md text-black font-semibold">¡Hola, Usuario!</div>
        <div className="text-sm text-black">Administrador</div>
        {/* Aquí podrías agregar más opciones para usuarios autenticados */}
      </div>
    );
  } else {
    return (
      <div className="text-right leading-3">
        <div className="text-md text-black font-semibold">Modo Invitado</div>
        {
          onRegister ? <a href="/login" className="text-sm text-black">
          ¿Ya te registraste?, inicia sesion
        </a> :
          <a href="/signup" className="text-sm text-black">
          ¿No tienes cuenta?, crea una
        </a>
        }
      </div>
    );
  }
};

export default UserWidget;