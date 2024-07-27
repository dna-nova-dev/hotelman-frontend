import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/navbar';
import FloatingButtons from '../../components/utils/floating/FloatingButtons';
import DashView from '../../components/utils/DashView';
import SalesView from './salesview';
import Presence from '../Presence';
import CreateView from '../SalesPoint/create';

const Dashboard = () => {
  const lastClickedButton = useSelector((state) => state.floatingbuttons.lastClickedButton);

  let ViewComponent;

  switch (lastClickedButton) {
    case 'Punto de venta':
      ViewComponent = SalesView;
      break;
    case 'Informes':
      ViewComponent = DashView;
      break;
    default:
      ViewComponent = DashView;
  }

  return (
    <>
      <Navbar title="Panel de Administracion" fromAdmin={true} />
      <div className="px-4 lg:px-33 bg-gray-50">
        <FloatingButtons />
        <div className="flex-1 pl-1"> {/* Ajusta el margen para separación */}
          <ViewComponent />
        </div>
      </div>
    </>
  );
};

export default Dashboard;