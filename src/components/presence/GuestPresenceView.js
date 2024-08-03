import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import { DollarSign, Building, Ruler, User, Clock } from 'lucide-react';
import Config from '../../Config';

const GuestPresenceView = () => {
  const [hospedados, setHospedados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHospedados = async () => {
      try {
        const response = await fetch(`${Config.API_URL}/clients?type=guest&page=1&pageSize=10`);
        const data = await response.json();
        setHospedados(data.clients);
        console.log('Hospedados:', data.clients); // Debugging output

        if (data.clients && data.clients.length > 0) {
          setLoading(false);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false); // Solo se deja de cargar si hay un error
      }
    };

    fetchHospedados();
  }, []);

  if (loading) {
    return (
      <div className="flex items-start justify-center min-h-screen bg-gray-50 mt-16">
        <ClipLoader size={100} color="bg-primary" loading={loading} />
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  // Función para obtener el evento más reciente
  const getLatestEvent = (history) => {
    if (!history || history.length === 0) {
      return { hora: 'N/A', estado: 'Afuera', evento: 'Sin evento' };
    }
    // Ordenar por fecha y hora, y tomar el más reciente
    const latestEvent = history.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))[0];
    return {
      hora: new Date(latestEvent.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estado: latestEvent.action === 'Entrada' ? 'En habitación' : 'Afuera',
      evento: latestEvent.action
    };
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {hospedados.map((hospedado, index) => {
        const { hora, estado, evento } = getLatestEvent(hospedado.history);
        return (
          <div key={index} className="bg-gray-200 p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-2">
              <span className="flex items-center text-gray-600">
                <DollarSign size={16} className="mr-1" />
                {hospedado.price}
              </span>
              <span className="flex items-center text-gray-600">
                <Building size={16} className="mr-1" />
                {hospedado.roomNumber}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="flex items-center text-gray-600">
                <Ruler size={16} className="mr-1" />
                {hospedado.height}
              </span>
              <span className="flex items-center text-gray-600">
                <User size={16} className="mr-1" />
                {hospedado.hair}
              </span>
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <Clock size={16} className="mr-1" />
              {hospedado.duration}
            </div>
            <div className="text-xs text-gray-500 truncate mb-2">{hospedado.customID}</div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{evento}: {hora}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                estado === 'En habitación' ? 'bg-yellow-300 text-yellow-800' :
                estado === 'Afuera' ? 'bg-green-300 text-green-800' :
                'bg-blue-300 text-blue-800'
              }`}>
                {estado}
              </span>
            </div>
          </div>
        );
      })} 
    </div>
  );
};

export default GuestPresenceView;