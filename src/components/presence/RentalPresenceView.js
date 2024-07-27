import React from 'react';

const RentalPresenceView = () => {
  // Datos de ejemplo para las rentas
  const rentas = [
    { id: 1, nombre: 'Miguel Angel Perez Diaz', hora: '12/07/2024', evento: 'Entrada', estado: 'En habitacion' },
    { id: 2, nombre: 'Juan Osorio Paredes', hora: '02/07/2024', evento: 'Salida', estado: 'Afuera' },
    { id: 3, nombre: 'Carlos Marquez', hora: '12/06/2024', evento: 'Entrada', estado: 'En habitacion' },
    { id: 4, nombre: 'Pedro Rivera', hora: '06/07/2024', evento: 'Salida', estado: 'Afuera' },
    // ... más datos de ejemplo
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {rentas.map((renta) => (
        <div key={renta.id} className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
          <img src="./images/assets/profile.svg" alt="Inquilino" className="w-full h-48 object-cover mb-2" />
          <div className="px-4 py-2">
            <h3 className="font-semibold text-lg mb-2">{renta.nombre}</h3>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">{renta.evento}: {renta.hora}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                renta.estado === 'En habitacion' ? 'bg-yellow-300 text-yellow-800' :
                renta.estado === 'Afuera' ? 'bg-green-300 text-green-800' :
                'bg-blue-300 text-blue-800'
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

export default RentalPresenceView;