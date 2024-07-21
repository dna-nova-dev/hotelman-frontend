import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Pagina no encontrada</p>
        <a href="/" className="px-4 py-2 bg-primary font-semibold text-white rounded hover:bg-secondary transition duration-300">Ir a Inicio</a>
      </div>
    </div>
  );
};

export default NotFoundPage;