import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import Config from '../../Config';

const RentalPresenceView = () => {
  const [rentas, setRentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRentas = async () => {
      try {
        const response = await fetch(`${Config.API_URL}/clients?type=rental&page=1&pageSize=10`);
        const data = await response.json();
        setRentas(data.clients);
        console.log('Rentas:', data.clients); // Debugging output

        if (data.clients && data.clients.length > 0) {
          setLoading(false);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false); // Solo se deja de cargar si hay un error
      }
    };

    fetchRentas();
  }, []);

  if (loading) {
    return (
      <div className="flex items-start justify-center min-h-screen bg-gray-50 mt-16">
        <ClipLoader size={100} color="bg-primary" loading={loading} />
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  // Función para determinar la URL de la imagen
  const getImageSrc = (imageUrl) => {
    return imageUrl ? imageUrl : './images/assets/profile.svg';
  };

  // Función para obtener el evento más reciente del historial
  const getLatestEvent = (history) => {
    if (!history || history.length === 0) {
      return { action: 'Sin evento', dateTime: 'N/A' };
    }
    // Ordenar por fecha y hora, y tomar el más reciente
    const latestEvent = history.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))[0];
    return {
      action: latestEvent.action === 'checkIn' ? 'Entrada' : 'Salida',
      dateTime: new Date(latestEvent.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {rentas.map((renta) => {
        const { action, dateTime } = getLatestEvent(renta.history);
        return (
          <div key={renta.id} className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
            <img src={getImageSrc(renta.ineUrl)} alt="Inquilino" className="w-full h-48 object-cover mb-2" />
            <div className="px-4 py-2">
              <h3 className="font-semibold text-lg mb-2">{`${renta.nombres} ${renta.apellidos}`}</h3>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{action}: {dateTime}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  action === 'Entrada' ? 'bg-yellow-300 text-yellow-800' :
                  'bg-green-300 text-green-800'
                }`}>
                  {action === 'Entrada' ? 'En habitación' : 'Afuera'}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RentalPresenceView;