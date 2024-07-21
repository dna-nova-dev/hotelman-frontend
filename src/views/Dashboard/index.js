import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../../components/navbar';
import { setActiveTab } from '../../features/tab/tabSlice'; // Ajusta la ruta según tu estructura de archivos
import FloatingButtons from '../../components/utils/floating/FloatingButtons';
import DashView from '../../components/utils/DashView';

const Dashboard = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.tab); // Obtener el tab activo desde Redux

  // Función para manejar el cambio de tab
  const handleTabChange = (tab) => {
    dispatch(setActiveTab(tab)); // Despachar la acción para actualizar el tab activo en Redux
  };

  return (
    <>
      <Navbar title="informes" isAuthenticated={true} />
      <div className="flex">
        <FloatingButtons />
        <div className="flex-1 pl-52"> {/* Ajusta el margen para separación */}
          <DashView />
        </div>
      </div>
    </>
  );
};

export default Dashboard;