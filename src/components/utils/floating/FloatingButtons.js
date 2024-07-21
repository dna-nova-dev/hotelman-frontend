import React from 'react';
import { StoreIcon, BoxIcon, User2 } from 'lucide-react';

const FloatingButtons = () => {
  return (
    <div className="fixed left-10 z-50 font-semibold">
      {/* Botón Punto de venta */}
      <div className='relative bg-secondary text-white flex items-center p-2 rounded-xl my-2 group transition-all duration-300 w-14 hover:w-48'>
        <StoreIcon height={25} width={25} className='transition-transform duration-300'/>  
        <span className='absolute left-14 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'>Punto de venta</span>
      </div>

      {/* Botón Habitaciones */}
      <div className='relative bg-secondary text-white flex items-center p-2 rounded-xl my-2 group transition-all duration-300 w-14 hover:w-48'>
        <BoxIcon height={25} width={25} className='transition-transform duration-300'/>  
        <span className='absolute left-14 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'>Habitaciones</span>
      </div>

      {/* Botón Personas */}
      <div className='relative bg-secondary text-white flex items-center p-2 rounded-xl my-2 group transition-all duration-300 w-14 hover:w-48'>
        <User2 height={25} width={25} className='transition-transform duration-300'/>  
        <span className='absolute left-14 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'>Personas</span>
      </div>
    </div>
  );
};

export default FloatingButtons;