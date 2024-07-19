import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { User, Ruler, Building, Clock, DollarSign, Check } from 'lucide-react';
import GuestPreview from '../utils/previews/GuestPreview';

const renderInput = ({ input, meta, label, type, placeholder, icon: Icon, required }) => (
  <div className="relative mb-4">
    {label && <label className="block mb-1">{label}{required && ' *'}</label>}
    <input
      {...input}
      type={type}
      placeholder={placeholder}
      className="w-full h-14 p-2 pl-10 border rounded"
      required={required}
    />
    {Icon && <Icon className="absolute left-3 top-2/4 transform -translate-y-1/2 text-gray-400" size={20} />}
    {meta.error && meta.touched && <span className="text-red-500 text-sm">{meta.error}</span>}
  </div>
);
const renderInputSelector = ({ input, meta, label, type, placeholder, icon: Icon, required }) => (
  <div className="relative mb-4">
    {label && <label className="block mb-1">{label}{required && ' *'}</label>}
    <input
      {...input}
      type={type}
      placeholder={placeholder}
      className="w-full h-14 p-2 pl-10 border rounded"
      required={required}
    />
    {Icon && <Icon className="absolute left-3 top-3/4 transform -translate-y-4 text-gray-400" size={20} />}
    {meta.error && meta.touched && <span className="text-red-500 text-sm">{meta.error}</span>}
  </div>
);

const renderTextarea = ({ input, meta, label, rows }) => (
  <div className="mb-4">
    {label && <label className="block mb-1">{label}</label>}
    <textarea
      {...input}
      className="w-full h-40 p-2 border rounded"
      rows={rows}
    />
    {meta.error && meta.touched && <span className="text-red-500 text-sm">{meta.error}</span>}
  </div>
);

const GuestManagement = ({ handleSubmit }) => {
  const onSubmit = (formData) => {
    // Aquí deberías implementar la lógica para enviar formData a la API
    console.log('Saved on Redux');
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex">
        <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 pr-4">
          <div className="grid grid-cols-2 gap-4">
            <Field name="email" component={renderInput} label="Correo" type="email" required />
            <Field name="phone" component={renderInput} label="Número de Celular" type="tel" required />
          </div>

          <div className="mt-4">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <Field name="extraDescription" component={renderTextarea} label="Descripción física extra" rows="3" />
              </div>
              <div className="w-1/2 space-y-2">
                <label className="block mb-1">Datos principales</label>
                <Field name="name" component={renderInput} placeholder="Cabello" icon={User} />
                <Field name="height" component={renderInput} placeholder="Altura" icon={Ruler} />
                <Field name="roomNumber" component={renderInput} placeholder="Número de habitación" icon={Building} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4 items-start">
            <Field name="price" component={renderInputSelector} label="Importe de habitación" type="number" required icon={DollarSign} />
            <div className="col-span-2 flex items-center justify-end gap-12">
              <Field name="duration" component={renderInputSelector} label="Horas de estadía" type="number" required icon={Clock} />
              
            </div>
          </div>
        </form>

        <GuestPreview />
      </div>
    </div>
  );
};

export default reduxForm({
  form: 'guest',
})(GuestManagement);