import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DollarSign, Building, Ruler, User, Clock } from 'lucide-react';
import { ClipLoader } from 'react-spinners';
import Config from '../../../Config';
import jsPDF from 'jspdf';

const GuestView = () => {
  const activeTab = useSelector((state) => state.tab);
  const pagination = useSelector((state) => state.pagination['Inquilinos'][activeTab]);
  const [hospedados, setHospedados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHospedado, setSelectedHospedado] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchHospedados = async () => {
      try {
        const response = await fetch(`${Config.API_URL}/clients?type=guest&page=${pagination}&pageSize=10`);
        const data = await response.json();
        setHospedados(data.clients);
        console.log('Hospedados:', data.clients);

        if (data.clients && data.clients.length > 0) {
          setLoading(false);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHospedados();
  }, [pagination]);

  const handleCardClick = (hospedado) => {
    setSelectedHospedado(hospedado);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHospedado(null);
  };

  const generatePDF = () => {
    if (!selectedHospedado) return;

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Hospedaje Santa Elena', 10, 10);
    doc.setFontSize(12);
    doc.text(`Descripción: ${selectedHospedado.extraDescription}`, 10, 20);
    doc.text(`Número de habitación: ${selectedHospedado.roomNumber}`, 10, 30);
    doc.text(`Altura: ${selectedHospedado.height}`, 10, 40);
    doc.text(`Color de cabello: ${selectedHospedado.hair}`, 10, 50);
    doc.text(`Duración: ${selectedHospedado.duration} H`, 10, 60);
    doc.text(`ID: ${selectedHospedado.id}`, 10, 70);
    doc.text(`Fecha de ingreso: ${new Date(selectedHospedado.createdAt).toLocaleString()}`, 10, 80);
    doc.text(`Importe de la habitación: ${selectedHospedado.price}`, 10, 90);

    doc.save('Ticket.pdf');
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {hospedados.map((hospedado) => (
          <div
            key={hospedado.customID}
            className="bg-gray-200 p-4 rounded-lg cursor-pointer"
            onClick={() => handleCardClick(hospedado)}
          >
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
              {hospedado.duration} H
            </div>
            <div className="text-xs text-gray-500 truncate mb-2">{hospedado.id}</div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Ingreso: {new Date(hospedado.createdAt).toLocaleTimeString()}</span>
              <span className="px-2 py-1 rounded-full text-xs bg-blue-300 text-blue-800">
                Verificando
              </span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedHospedado && (
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
              <p className="font-bold">Descripción:</p>
              <p>{selectedHospedado.extraDescription}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Número de habitación:</p>
              <p>{selectedHospedado.roomNumber}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Altura:</p>
              <p>{selectedHospedado.height}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Color de cabello:</p>
              <p>{selectedHospedado.hair}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Duración:</p>
              <p>{selectedHospedado.duration} H</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">ID:</p>
              <p>{selectedHospedado.id}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Fecha de ingreso:</p>
              <p>{new Date(selectedHospedado.createdAt).toLocaleString()}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Importe de la habitación:</p>
              <p>{selectedHospedado.price}</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={generatePDF}
                className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-gray-200 hover:text-gray-800 transition-colors duration-300"
              >
                Descargar Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestView;
