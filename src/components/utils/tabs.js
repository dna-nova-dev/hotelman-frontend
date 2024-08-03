import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab } from '../../features/tab/tabSlice';
import { setPaginationPage } from '../../features/pagination/paginationSlice';
import { reset } from 'redux-form';
import { ArrowLeft, ArrowRight, PlusCircle, Save, Trash2 } from 'lucide-react';
import Config from '../../Config';
import { useFileContext } from '../../hooks/FileContext';

const TabNavigation = ({ onCreate, onlyPagination, tabs, section }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Obtén la función de navegación
  const activeTab = useSelector((state) => state.tab);
  const pagination = useSelector((state) => state.pagination[section][activeTab]);
  const [totalPages, setTotalPages] = useState(1);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [formData, setFormData] = useState(null);
  const rentalFormData = useSelector((state) => state.form.rental?.values);
  const guestFormData = useSelector((state) => state.form.guest?.values);
  const { ineFile, contratoFile } = useFileContext();

  useEffect(() => {
    const fetchTotalPages = async () => {
      try {
        const response = await fetch(`${Config.API_URL}/clients?type=${activeTab === "Rentas" ? "rental" : "guest"}&page=${pagination}&pageSize=10`);
        const data = await response.json();
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching total pages:', error);
      }
    };

    fetchTotalPages();
  }, [section, pagination, activeTab]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      dispatch(setPaginationPage({ section, tab: activeTab, page: newPage }));
    }
  };

  const handleSaveClick = () => {
    if (isFormComplete && formData) {
      sendDataToAPI(formData);
    }
  };

  const handleDeleteClick = () => {
    if (activeTab === 'Rentas') {
      dispatch(reset('rental'));
    } else if (activeTab === 'Hospedados') {
      dispatch(reset('guest'));
    }
    setIsFormComplete(false);
    console.log('Eliminando contenido del formulario...');
  };

  const sendDataToAPI = async (data) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      console.log("INE File send to API: ", ineFile)
      formData.append("ineFile", ineFile)
      formData.append("contratoFile", contratoFile)

      const response = await fetch(`${Config.API_URL}/create-client`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log('Respuesta de la API:', result);

      if (response.ok) {
        console.log('Datos enviados correctamente:', result);
        navigate('/salespoint'); // Redirige a /salespoint
      } else {
        console.error('Error al enviar los datos:', result);
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  const getFormDataByTab = () => {
    let dataToSend;

    switch (activeTab) {
      case 'Rentas':
        dataToSend = { ...rentalFormData, type: 'rental' };
        break;
      case 'Hospedados':
        dataToSend = { ...guestFormData, type: 'guest' };
        break;
      default:
        return null;
    }

    return dataToSend;
  };

  const isFormDataComplete = (data) => {
    if (!data) return false;

    const requiredFields = {
      'Rentas': ['nombres', 'apellidos', 'correo', 'numeroCelular', 'curp', 'RoomNumber', 'ineFile'],
      'Hospedados': ['hair', 'height', 'roomNumber', 'price', 'duration'],
    };

    const fields = requiredFields[activeTab] || [];
    return fields.every(field => {
      const value = data[field];
      if (typeof value === 'string') {
        return value.trim() !== '';
      }
      return value !== undefined && value !== null && value !== '';
    });
  };

  useEffect(() => {
    const fetchFormData = async () => {
      const formData = getFormDataByTab();
      setFormData(formData);
      setIsFormComplete(isFormDataComplete(formData));
    };

    fetchFormData();
  }, [activeTab, rentalFormData, guestFormData]);


  useEffect(() => {
    if (ineFile || contratoFile) {
      console.log('Files available:', ineFile, contratoFile);
    }
  }, [ineFile, contratoFile]);

  return (
    <div className="bg-gray-50">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 mt-4 relative">
        <div className="flex border-t-1 border-primary mb-4 md:mb-0">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`font-semibold px-4 py-2 rounded-b-lg ${activeTab === tab ? 'bg-primary text-white' : 'text-primary'}`}
              onClick={() => dispatch(setActiveTab(tab))}
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
                disabled={!isFormComplete}
              >
                <Save size={20} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex space-x-2">
            <div className="flex justify-between items-center mb-2 md:mb-0">
              <div className="flex space-x-2">
                {!onlyPagination ? (
                  <Link to="/create">
                    <button className="bg-gray-900 text-white p-2 rounded-full">
                      <PlusCircle size={24} />
                    </button>
                  </Link>
                ) : null}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(pagination - 1)}
                disabled={pagination <= 1}
              >
                <ArrowLeft size={20} />
              </button>
              <span>{pagination} de {totalPages}</span>
              <button
                onClick={() => handlePageChange(pagination + 1)}
                disabled={pagination >= totalPages}
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabNavigation;
