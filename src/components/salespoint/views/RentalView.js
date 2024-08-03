import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import Config from '../../../Config';

const RentalView = () => {
  const activeTab = useSelector((state) => state.tab);
  const pagination = useSelector((state) => state.pagination['Inquilinos'][activeTab]);
  const [rentas, setRentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingImages, setLoadingImages] = useState({});
  const [selectedRenta, setSelectedRenta] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchRentas = async () => {
      try {
        const response = await fetch(`${Config.API_URL}/clients?type=rental&page=${pagination}&pageSize=10`);
        const data = await response.json();
        setRentas(data.clients);
        console.log('Rentas:', data.clients);

        if (data.clients && data.clients.length > 0) {
          setLoading(false);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRentas();
  }, [pagination]);

  const handleImageLoad = (id) => {
    setLoadingImages((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  };

  const handleCardClick = (renta) => {
    setSelectedRenta(renta);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRenta(null);
  };

  const downloadFile = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = objectURL;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(objectURL); // Limpiar el objeto URL después de la descarga
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-start justify-center min-h-screen bg-gray-50 mt-16">
        <ClipLoader size={100} color="bg-primary" loading={loading} />
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {rentas.map((renta) => (
          <div
            key={renta._id}
            className="bg-gray-100 rounded-lg cursor-pointer relative"
            onClick={() => handleCardClick(renta)}
          >
            <div className="relative">
              {loadingImages[renta._id] && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 opacity-75 rounded">
                  <ClipLoader size={30} color="gray" loading={loadingImages[renta._id]} />
                </div>
              )}
              {renta.ineUrl === "" ? (
                <img
                  src="./images/assets/profile.svg"
                  alt="Inquilino"
                  className="w-full h-48 object-cover mb-2 rounded"
                  onLoad={() => handleImageLoad(renta._id)}
                />
              ) : (
                <img
                  src={renta.ineUrl}
                  alt="Inquilino"
                  className="w-full h-48 object-cover mb-2 rounded"
                  onLoad={() => handleImageLoad(renta._id)}
                  onError={() => handleImageLoad(renta._id)}
                />
              )}
            </div>
            <div className="px-2 py-1">
              <h3 className="font-semibold text-lg mb-1">{`${renta.nombres} ${renta.apellidos}`}</h3>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Ingreso: {new Date(renta.createdAt).toLocaleDateString()}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  renta.estado === 'Al dia' ? 'bg-green-200 text-green-800' :
                  renta.estado === 'Deuda' ? 'bg-red-200 text-red-800' :
                  'bg-yellow-200 text-yellow-800'
                }`}>
                  {renta.estado || 'Pendiente'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedRenta && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-4">Detalles del Inquilino</h2>
            <div className="mb-4">
              <p className="font-bold">Nombre:</p>
              <p>{`${selectedRenta.nombres} ${selectedRenta.apellidos}`}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Ingreso:</p>
              <p>{new Date(selectedRenta.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Estado:</p>
              <p>{selectedRenta.estado || 'Pendiente'}</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => downloadFile(selectedRenta.ineUrl, 'INE.png')}
                className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-gray-200 hover:text-gray-800 transition-colors duration-300"
              >
                Descargar INE
              </button>
              <button
                onClick={() => downloadFile(selectedRenta.contratoUrl, 'Contrato.pdf')}
                className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-gray-200 hover:text-gray-800 transition-colors duration-300"
              >
                Descargar Contrato
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalView;
