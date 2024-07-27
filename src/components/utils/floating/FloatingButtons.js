import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLastClickedButton } from '../../../features/floatingbuttons/floatingButtonsSlice';
import { StoreIcon, BoxIcon, User2, LayoutDashboard, PencilRulerIcon } from 'lucide-react';

const FloatingButtons = () => {
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleButtonClick = (buttonName) => {
    dispatch(setLastClickedButton(buttonName));
  };

  return (
    <div>
      <div className="fixed left-10 z-50 font-semibold hidden md:block">
        {/* Botón Informes */}
        <div
          className='relative bg-secondary text-white flex items-center p-2 rounded-xl my-2 group transition-all duration-300 w-11 hover:w-30'
          onClick={() => handleButtonClick('Informes')}
        >
          <LayoutDashboard height={25} width={25} className='transition-transform duration-300' />
          <span className='absolute left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'>Informes</span>
        </div>

        {/* Botón Punto de venta */}
        <div
          className='relative bg-secondary text-white flex items-center p-2 rounded-xl my-2 group transition-all duration-300 w-11 hover:w-40'
          onClick={() => handleButtonClick('Punto de venta')}
        >
          <StoreIcon height={25} width={25} className='transition-transform duration-300' />
          <span className='absolute left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'>Punto de venta</span>
        </div>

        {/* Botón Habitaciones */}
        <div
          className='relative bg-secondary text-white flex items-center p-2 rounded-xl my-2 group transition-all duration-300 w-11 hover:w-36'
          onClick={() => handleButtonClick('Habitaciones')}
        >
          <BoxIcon height={25} width={25} className='transition-transform duration-300' />
          <span className='absolute left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'>Habitaciones</span>
        </div>

        {/* Botón Personas */}
        <div
          className='relative bg-secondary text-white flex items-center p-2 rounded-xl my-2 group transition-all duration-300 w-11 hover:w-30'
          onClick={() => handleButtonClick('Personas')}
        >
          <User2 height={25} width={25} className='transition-transform duration-300' />
          <span className='absolute left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'>Personas</span>
        </div>
      </div>

      {/* Botón flotante para vista móvil */}
      <div className="fixed bottom-10 left-10 z-50 md:hidden">
        <div
          className="bg-secondary text-white flex items-center justify-center p-3 rounded-full shadow-lg cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <PencilRulerIcon height={25} width={25} className={`transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`} />
        </div>
        {isMobileMenuOpen && (
          <div className="flex flex-col items-start mt-4 space-y-2">
            <div
              className="bg-secondary text-white flex items-center p-2 rounded-xl group transition-all duration-300 w-11 hover:w-30"
              onClick={() => handleButtonClick('Informes')}
            >
              <LayoutDashboard height={25} width={25} className='transition-transform duration-300' />
              <span className='absolute left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'>Informes</span>
            </div>

            <div
              className="bg-secondary text-white flex items-center p-2 rounded-xl group transition-all duration-300 w-11 hover:w-40"
              onClick={() => handleButtonClick('Punto de venta')}
            >
              <StoreIcon height={25} width={25} className='transition-transform duration-300' />
              <span className='absolute left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'>Punto de venta</span>
            </div>

            <div
              className="bg-secondary text-white flex items-center p-2 rounded-xl group transition-all duration-300 w-11 hover:w-36"
              onClick={() => handleButtonClick('Habitaciones')}
            >
              <BoxIcon height={25} width={25} className='transition-transform duration-300' />
              <span className='absolute left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'>Habitaciones</span>
            </div>

            <div
              className="bg-secondary text-white flex items-center p-2 rounded-xl group transition-all duration-300 w-11 hover:w-30"
              onClick={() => handleButtonClick('Personas')}
            >
              <User2 height={25} width={25} className='transition-transform duration-300' />
              <span className='absolute left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'>Personas</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingButtons;