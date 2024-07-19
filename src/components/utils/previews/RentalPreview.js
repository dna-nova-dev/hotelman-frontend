import React from 'react';
import { useSelector } from 'react-redux';

const RentalPreview = () => {
  const formData = useSelector(state => state.form.rental?.values || {});

  const isFormFilled = () => {
    const { contrato, ine } = formData;
    return contrato && ine;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="w-1/3 pl-4">
      <label className="block font-medium mb-1">Previsualización</label>
      <div className="bg-gray-100 p-4 rounded">
        {isFormFilled() ? (
          <>
            <h3 className="text-lg font-semibold mb-2">INE del inquilino</h3>
            {formData.ine ? (
              <img src={formData.ine.fileData} alt="INE del inquilino" className="w-full mb-4 rounded" />
            ) : (
              <div className="animate-pulse w-full h-48 bg-gray-200 rounded mb-4"></div>
            )}

            <h3 className="text-lg font-semibold mb-2">Contrato de arriendo</h3>
            {formData.contrato ? (
              <div className="bg-white p-4 rounded">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm">{formData.contrato.name}</p>
                  <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    PDF
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-2">Tamaño: {(formData.contrato.size / 1024).toFixed(2)} KB</p>
                <p className="text-xs text-gray-500 mb-2">Fecha de creación: {formatDate(formData.contrato.lastModified)}</p>
              </div>
            ) : (
              <div className="animate-pulse w-full h-64 bg-gray-200 rounded mb-4"></div>
            )}
          </>
        ) : (
          <div className="animate-pulse w-full h-64 bg-gray-200 rounded mb-4"></div>
        )}
      </div>
    </div>
  );
};

export default RentalPreview;