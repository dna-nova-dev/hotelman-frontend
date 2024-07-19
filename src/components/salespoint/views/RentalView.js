import React from 'react';
import { PlusCircle, ArrowLeft, ArrowRight } from 'lucide-react';

const RentalView = () => {
  // Datos de ejemplo para las rentas
  const rentas = [
    { id: 1, nombre: 'Miguel Angel Perez Diaz', ingreso: '12/07/2024', estado: 'Al dia' },
    { id: 2, nombre: 'Juan Osorio Paredes', ingreso: '02/07/2024', estado: 'Deuda' },
    { id: 3, nombre: 'Carlos Marquez', ingreso: '12/06/2024', estado: 'Cobrar' },
    { id: 4, nombre: 'Pedro Rivera', ingreso: '06/07/2024', estado: 'Al dia' },
    // ... más datos de ejemplo
  ];

  return (
      <div className="grid grid-cols-4 gap-4">
        {rentas.map((renta) => (
          <div key={renta.id} className="bg-gray-100 rounded-lg">
            <img src="./images/assets/profile.svg" alt="Inquilino" className="w-full h-48 object-cover mb-2 rounded" />
            <div className="px-2 py-1">
              <h3 className="font-semibold text-lg mb-1">{renta.nombre}</h3>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Ingreso: {renta.ingreso}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  renta.estado === 'Al dia' ? 'bg-green-200 text-green-800' :
                  renta.estado === 'Deuda' ? 'bg-red-200 text-red-800' :
                  'bg-yellow-200 text-yellow-800'
                }`}>
                  {renta.estado}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
  );
};

export default RentalView;