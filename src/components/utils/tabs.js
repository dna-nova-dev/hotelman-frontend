import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab } from '../../features/tab/tabSlice';
import { reset } from 'redux-form';
import { ArrowLeft, ArrowRight, PlusCircle, Save, Search, Trash2 } from 'lucide-react';

const TabNavigation = ({ onCreate, onlyPagination, tabs }) => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.tab); // Estado del tab activo desde Redux
  const rentalFormData = useSelector((state) => state.form.rental?.values); // Obtener datos del formulario de renta
  const guestFormData = useSelector((state) => state.form.guest?.values); // Obtener datos del formulario de huéspedes
  const [isFormComplete, setIsFormComplete] = useState(false);

  const getFormDataByTab = () => {
    switch (activeTab) {
      case 'Rentas':
        return rentalFormData;
      case 'Hospedados':
        return guestFormData;
      default:
        return null;
    }
  };

  const formData = getFormDataByTab();

  const isFormDataValid = (formData) => {
    if (!formData) return false; // Si no hay formData, retorna falso
    return Object.values(formData).every(value => value !== null && value !== '');
  };

  useEffect(() => {
    setIsFormComplete(isFormDataValid(formData) && formData !== undefined); // Asegurar que formData no sea undefined
  }, [formData]);

  // Nuevo useEffect para monitorear los datos del formulario rental en el reducer
  useEffect(() => {
    if (rentalFormData !== undefined) {
      setIsFormComplete(isFormDataValid(rentalFormData));
    } else {
      setIsFormComplete(false);
    }
  }, [rentalFormData]);

  const handleSaveClick = () => {
    if (isFormDataValid(formData)) {
      const dataToSave = getFormDataByTab(); // Obtener los datos del formulario actual
      sendDataToAPI(dataToSave); // Enviar datos a la API
    }
  };

  const handleDeleteClick = () => {
    if (activeTab === 'Rentas') {
      dispatch(reset('rental')); // Limpiar datos de renta en el estado de Redux
    } else if (activeTab === 'Hospedados') {
      dispatch(reset('guest')); // Limpiar datos de huéspedes en el estado de Redux
    }
    setIsFormComplete(false);
    console.log('Eliminando contenido del formulario...');
  };

  const sendDataToAPI = (formData) => {
    // Aquí deberías implementar la lógica para enviar formData a la API
    console.log('TAB: Enviando datos a la API:', formData);
    // Ejemplo de cómo podrías enviar datos a una API (esto es un mock)
    /*fetch('https://api.example.com/save-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Respuesta de la API:', data);
        // Aquí podrías manejar la respuesta de la API según sea necesario
      })
      .catch(error => {
        console.error('Error al enviar datos a la API:', error);
        // Aquí podrías manejar errores de envío a la API
      });*/
  };

  return (
    <div className="flex justify-between items-center mb-6 relative">
      <div className="flex border-t-1 border-primary">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`font-semibold px-4 py-2 rounded-b-lg ${activeTab === tab ? 'bg-primary text-white' : 'text-primary'}`}
            onClick={() => dispatch(setActiveTab(tab))} // Despachar la acción para cambiar el tab activo
          >
            {tab}
          </button>
        ))}
      </div>
      {onCreate === true ? (
        <div className="flex space-x-2">
          <div className="relative ml-auto">
            <button
              className="p-2 bg-primary text-white rounded-md relative"
              onClick={handleDeleteClick}
            >
              <Trash2 size={20} />
            </button>
          </div>
          <div className="relative">
            <button
              className={`p-2 ${isFormComplete ? 'bg-primary' : 'bg-gray-400'} text-white rounded-md relative`}
              onClick={handleSaveClick}
              disabled={!isFormComplete} // Deshabilitar el botón si el formulario no está completo
            >
              <Save size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex space-x-2">
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-2">
              {!onlyPagination ? <Link to="/create"><button className="bg-gray-900 text-white p-2 rounded-full"><PlusCircle size={24} /></button></Link>: <button className="bg-gray-900 text-white p-2 rounded-full"><Search size={24} /></button>}
              <button className="bg-gray-900 text-white p-2 rounded-full"><ArrowLeft size={24} /></button>
              <span className="bg-gray-900 text-white px-4 py-2 rounded-full flex items-center justify-center">1</span>
              <button className="bg-gray-900 text-white p-2 rounded-full"><ArrowRight size={24} /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabNavigation;