import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../../components/navbar';
import TabNavigation from '../../components/utils/tabs';
import { setActiveTab } from '../../features/tab/tabSlice'; // Ajusta la ruta según tu estructura de archivos
import GuestPresenceView from '../../components/presence/GuestPresenceView';
import RentalPresenceView from '../../components/presence/RentalPresenceView';

const Presence = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.tab); // Obtener el tab activo desde Redux

  // Función para manejar el cambio de tab
  const handleTabChange = (tab) => {
    dispatch(setActiveTab(tab)); // Despachar la acción para actualizar el tab activo en Redux
  };
  /*passtrought fromAdmin value pls*/
  return (
    <>
      <Navbar title="presencia" isAuthenticated={true} fromAdmin={false} /> 
      <div className="px-4 lg:px-33 bg-gray-50">
        <TabNavigation
          onlyPagination={true}
          activeTab={activeTab}
          setActiveTab={handleTabChange} // Pasar la función para cambiar el tab activo
          tabs={['Hospedados', 'Rentas']}
        />
        {/* Renderizar el componente correspondiente según la pestaña activa */}
        {activeTab === 'Rentas' ? (
          <RentalPresenceView />
        ) : (
          <GuestPresenceView />
        )}
      </div>
    </>
  );
};

export default Presence;