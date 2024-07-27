import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { User, Building, Upload } from 'lucide-react';
import Dropzone from 'react-dropzone';
import RentalPreview from '../utils/previews/RentalPreview';

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

const readFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        name: file.name,
        fileData: reader.result,
        lastModified: file.lastModified,
        size: file.size, // Agrega el tamaño del archivo
      });
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

const renderDropzoneInput = ({ input, meta, label, icon: Icon, accept }) => (
  <div className="relative mb-4">
    <Dropzone
      onDrop={async (acceptedFiles) => {
        const file = acceptedFiles[0];
        const { fileData, name, lastModified, size } = await readFile(file);
        input.onChange({ name, fileData, lastModified, size }); // Agrega el tamaño del archivo al onChange
      }}
      accept={accept}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className="w-full h-14 p-2 pl-10 border rounded bg-gray-100 cursor-pointer flex items-center"
        >
          <input {...getInputProps()} />
          <Icon className="absolute left-3 text-gray-400" size={20} />
          {input.value ? input.value.name : label}
        </div>
      )}
    </Dropzone>
    {meta.error && meta.touched && <span className="text-red-500 text-sm">{meta.error}</span>}
  </div>
);

const RentalManagement = ({ handleSubmit }) => {
  const onSubmit = (formData) => {
    console.log('Saved on Redux', formData);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-2/3 md:pr-4 mb-4 md:mb-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field name="nombres" component={renderInput} label="Nombres" type="text" required />
            <Field name="apellidos" component={renderInput} label="Apellidos" type="text" required />
            <Field name="correo" component={renderInput} label="Correo" type="email" required />
            <Field name="numeroCelular" component={renderInput} label="Número de Celular" type="tel" />
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Datos principales</label>
              <Field name="datosPrincipales1" component={renderInput} placeholder="INE" icon={User} />
              <Field name="datosPrincipales2" component={renderInput} placeholder="Número de habitación" icon={Building} />
            </div>

            <div>
              <label className="block mb-1">Datos oficiales *</label>
              <Field
                name="contrato"
                component={renderDropzoneInput}
                label="Adjunta el Contrato"
                icon={Upload}
                accept=".pdf,.doc,.docx"
              />
              <Field
                name="ine"
                component={renderDropzoneInput}
                label="Adjunta INE"
                icon={Upload}
                accept=".jpg,.png"
              />
            </div>
          </div>
        </form>

        <RentalPreview />
      </div>
    </div>
  );
};

export default reduxForm({
  form: 'rental',
})(RentalManagement);