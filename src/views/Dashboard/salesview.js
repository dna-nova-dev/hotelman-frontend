import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TabNavigation from '../../components/utils/tabs';
import RentalView from '../../components/salespoint/views/RentalView';
import GuestView from '../../components/salespoint/views/GuestView';
import { setActiveTab } from '../../features/tab/tabSlice'; // Ajusta la ruta según tu estructura de archivos

const SalesView = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.tab); // Obtener el tab activo desde Redux

  // Función para manejar el cambio de tab
  const handleTabChange = (tab) => {
    dispatch(setActiveTab(tab)); // Despachar la acción para actualizar el tab activo en Redux
  };
  /*passtrought fromAdmin value pls*/
  return (
    <>
      <div className="px-4 lg:px-33 bg-gray-50">
        <TabNavigation
          onlyPagination={false}
          activeTab={activeTab}
          setActiveTab={handleTabChange} // Pasar la función para cambiar el tab activo
          tabs={['Hospedados', 'Rentas']}
        />
        {/* Renderizar el componente correspondiente según la pestaña activa */}
        {activeTab === 'Rentas' ? (
          <RentalView />
        ) : (
          <GuestView />
        )}
      </div>
    </>
  );
};

export default SalesView;