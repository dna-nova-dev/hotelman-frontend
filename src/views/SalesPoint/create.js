import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../../components/navbar';
import RentalManagement from '../../components/salespoint/Rental';
import GuestManagement from '../../components/salespoint/Guest';
import TabNavigation from '../../components/utils/tabs';
import { setActiveTab } from '../../features/tab/tabSlice'; // Ajusta la ruta según tu estructura de archivos

const CreateView = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.tab); // Obtener el tab activo desde Redux

  const [rentalFormData, setRentalFormData] = useState(null);
  const [guestFormData, setGuestFormData] = useState(null);

  // Función para manejar el guardado de datos desde RentalManagement
  const handleRentalFormSave = (formData) => {
    setRentalFormData(formData);
    console.log('Guardando datos de RentalManagement en Home:', formData);
  };

  // Función para manejar el guardado de datos desde GuestManagement
  const handleGuestFormSave = (formData) => {
    setGuestFormData(formData);
    console.log('Guardando datos de GuestManagement en Home:', formData);
  };

  // Función para manejar el envío de datos a la API desde TabNavigation
  const handleFormSubmit = () => {
    if (activeTab === 'Rentas' && rentalFormData) {
      console.log('Enviando datos de RentalManagement a la API:', rentalFormData);
      setRentalFormData(null);
    } else if (activeTab === 'Hospedados' && guestFormData) {
      console.log('Enviando datos de GuestManagement a la API:', guestFormData);
      setGuestFormData(null);
    }
  };
  /*passtrought fromAdmin value pls*/
  return (
    <>
      <Navbar title="inquilinos" isAuthenticated={true} fromAdmin={false} />
      <div className="px-4 lg:px-33 bg-gray-50">
        <TabNavigation
          onCreate={true}
          tabs={['Hospedados', 'Rentas']}
          onFormSubmit={handleFormSubmit}
          rentalFormData={rentalFormData}
          guestFormData={guestFormData}
        />
        {activeTab === 'Rentas' ? (
          <RentalManagement onFormSubmit={handleRentalFormSave} />
        ) : (
          <GuestManagement onFormSubmit={handleGuestFormSave} />
        )}
      </div>
    </>
  );
};

export default CreateView;