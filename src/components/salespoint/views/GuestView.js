import React from 'react';
import { DollarSign, Building, Ruler, User, Clock } from 'lucide-react';

const GuestView = () => {
  // Datos de ejemplo para los hospedados
  const hospedados = [
    { id: 'e4b18a2a-f832-48e2-bd3...', costo: '500$', habitacion: '101', altura: '1.80m', cabello: 'Castaño', duracion: '3H', ingreso: '12:30pm', estado: 'Retirada' },
    { id: 'e4b18a2a-f832-48e2-bd3...', costo: '300$', habitacion: '102', altura: '1.80m', cabello: 'Rubio', duracion: '1.5H', ingreso: '12:30pm', estado: 'Ocupando' },
    { id: 'e4b18a2a-f832-48e2-bd3...', costo: '300$', habitacion: '103', altura: '1.80m', cabello: 'Rubio', duracion: '1.5H', ingreso: '12:30pm', estado: 'Limpieza' },
    { id: 'e4b18a2a-f832-48e2-bd3...', costo: '300$', habitacion: '104', altura: '1.80m', cabello: 'Rubio', duracion: '1.5H', ingreso: '12:30pm', estado: 'Ocupando' },
    // ... más datos de ejemplo
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {hospedados.map((hospedado, index) => (
        <div key={index} className="bg-gray-200 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="flex items-center text-gray-600">
              <DollarSign size={16} className="mr-1" />
              {hospedado.costo}
            </span>
            <span className="flex items-center text-gray-600">
              <Building size={16} className="mr-1" />
              {hospedado.habitacion}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="flex items-center text-gray-600">
              <Ruler size={16} className="mr-1" />
              {hospedado.altura}
            </span>
            <span className="flex items-center text-gray-600">
              <User size={16} className="mr-1" />
              {hospedado.cabello}
            </span>
          </div>
          <div className="flex items-center text-gray-600 mb-2">
            <Clock size={16} className="mr-1" />
            {hospedado.duracion}
          </div>
          <div className="text-xs text-gray-500 truncate mb-2">{hospedado.id}</div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Ingreso: {hospedado.ingreso}</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              hospedado.estado === 'Retirada' ? 'bg-yellow-300 text-yellow-800' :
              hospedado.estado === 'Ocupando' ? 'bg-green-300 text-green-800' :
              'bg-blue-300 text-blue-800'
            }`}>
              {hospedado.estado}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GuestView;