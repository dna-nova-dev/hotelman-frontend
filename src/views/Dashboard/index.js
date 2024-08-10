import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/navbar';
import FloatingButtons from '../../components/utils/floating/FloatingButtons';
import DashView from '../../components/utils/DashView';
import SalesView from './salesview';
import Presence from '../Presence';
import CreateView from '../SalesPoint/create';
import RoomView from './RoomView';

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
    case 'Habitaciones':
      ViewComponent = RoomView;
      break;
    default:
      ViewComponent = DashView;
  }

  return (
    <>
      <Navbar title="Panel de Administracion" fromAdmin={true} />
      <div className="ml-4">
        <FloatingButtons />
        <ViewComponent />
      </div>
    </>
  );
};

export default Dashboard;