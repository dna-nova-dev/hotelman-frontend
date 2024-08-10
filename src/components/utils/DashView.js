import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import useAnalytics from '../../hooks/useAnalytics';
import { ClipLoader } from 'react-spinners';

const SemiCircleChart = ({ data, title, colors }) => {
  return (
    <div className="w-full max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-3">
        <h3 className="text-lg font-semibold mr-auto text-center">{title}</h3>
      </div>
      <div className="text-center">
        <span className="text-4xl font-bold">
          {data.reduce((sum, item) => sum + item.value, 0)}
        </span>
      </div>
      <div className="p-2">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const InfoCard = ({ title, value, icon, onPeriodChange }) => {
  return (
    <div className="relative w-full max-w-sm bg-white shadow-lg rounded-lg overflow-hidden group">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="space-y-1">
          <h4 className="text-sm font-medium">{title}</h4>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        {icon}
      </div>
      {title === "Importe acumulado" && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300 p-4 space-y-4">
          <div className="flex space-x-4">
            <button 
              onClick={() => onPeriodChange('daily')} 
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-gray-600 transition-colors duration-300"
            >
              Diario
            </button>
            <button 
              onClick={() => onPeriodChange('weekly')} 
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-gray-600 transition-colors duration-300"
            >
              Semanal
            </button>
            <button 
              onClick={() => onPeriodChange('monthly')} 
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-gray-600 transition-colors duration-300"
            >
              Mensual
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const DashView = () => {
  const [period, setPeriod] = useState('daily'); // Estado para el periodo
  const { totalPriceGuest, guest, rental, totalClients, loading, error } = useAnalytics(period);

  // Muestra un mensaje de carga mientras se obtienen los datos
  if (loading) return <div className="flex items-center justify-center min-h-screen bg-gray-50">
  <ClipLoader size={100} color="bg-primary" loading={true} />
</div>;;

  // Muestra un mensaje de error si ocurre algún problema
  if (error) return <p>Error: {error.message}</p>;

  // Prepara los datos para los gráficos
  const rentasData = [
    { name: 'Rentado', value: rental.occupied },
    { name: 'Sin rentar', value: rental.total - rental.occupied },
  ];

  const cuartosData = [
    { name: 'Ocupados', value: guest.occupied },
    { name: 'Desocupados', value: guest.total - guest.occupied },
  ];

  return (
    <div className="px-4 lg:px-56 pt-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SemiCircleChart 
          data={rentasData}
          title="Rentas" 
          colors={['#FFD700', '#FFA500']} 
        />
        <SemiCircleChart 
          data={cuartosData}
          title="Cuartos Ocupados" 
          colors={['#1E90FF', '#00008B']} 
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoCard 
          title="Importe acumulado" 
          value={`$${totalPriceGuest} MXN`} 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>} 
          onPeriodChange={setPeriod}
        />
        <InfoCard 
          title="Clientes registrados" 
          value={totalClients} 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>} 
          onPeriodChange={setPeriod}
        />
      </div>
    </div>
  );
};

export default DashView;
