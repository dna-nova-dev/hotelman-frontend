import React from 'react';
import { useSelector } from 'react-redux';
import { DollarSign, User, Ruler, Building, Clock } from 'lucide-react';

const GuestPreview = () => {
  const formData = useSelector(state => state.form.guest?.values || {});

  const isFormFilled = () => {
    const { email, phone, name, height, roomNumber, price, duration } = formData;
    return email && phone && name && height && roomNumber && price && duration;
  };

  return (
    <div className="w-full md:w-1/3 pl-4">
      <label className="block font-medium text-gray-700 mb-4">Previsualización</label>
      <div className="bg-gray-100 p-4 rounded">
        {isFormFilled() ? (
          <>
            <h3 className="text-lg font-semibold mb-2">Tarjeta de datos de huésped</h3>
            <div className="flex flex-col md:flex-row items-center md:space-x-2 mb-2">
              <div className="flex items-center space-x-1 md:space-x-2 mb-1 md:mb-0">
                <DollarSign size={16} />
                <span>{formData.price}$</span>
              </div>
              <div className="flex items-center space-x-1 md:space-x-2">
                <Building size={16} />
                <span>{formData.roomNumber}</span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:space-x-2 mb-2">
              <div className="flex items-center space-x-1 md:space-x-2 mb-1 md:mb-0">
                <Ruler size={16} />
                <span>{formData.height}m</span>
              </div>
              <div className="flex items-center space-x-1 md:space-x-2">
                <User size={16} />
                <span>{formData.name}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={16} />
              <span>{formData.duration}H</span>
            </div>
          </>
        ) : (
          <div className="animate-pulse w-full h-32 bg-gray-200 rounded"></div>
        )}
      </div>
    </div>
  );
};

export default GuestPreview;