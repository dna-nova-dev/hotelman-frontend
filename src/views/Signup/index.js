import React, { useState } from 'react';
import Navbar from '../../components/navbar';

const Signup = () => {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    correo: '',
    numeroCelular: '',
    contrasena: '',
    confirmarContrasena: '',
    curp: '',
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [quickStart, setQuickStart] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted', formData);
    // Handle form submission logic here
  };

  const handleQuickStartChange = () => {
    setQuickStart(!quickStart);
  };

  return (
    <>
      <Navbar title="Registro" isAuthenticated={false} onRegister={true}/>
      
      <div className="flex min-h-screen bg-gray-50 justify-center items-center px-8 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-5/6 max-w-7xl">
          <div className="md:col-span-2 lg:col-span-2 w-full"> {/* Columna izquierda (formulario) que ocupa 2/3 del espacio en pantallas medianas y grandes */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nombres" className="block text-sm font-medium text-gray-700">
                    Nombres *
                  </label>
                  <input
                    type="text"
                    name="nombres"
                    id="nombres"
                    required
                    className="mt-1 block h-14 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.nombres}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700">
                    Apellidos *
                  </label>
                  <input
                    type="text"
                    name="apellidos"
                    id="apellidos"
                    required
                    className="mt-1 block h-14 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.apellidos}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
                    Correo *
                  </label>
                  <input
                    type="email"
                    name="correo"
                    id="correo"
                    required
                    className="mt-1 block h-14 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.correo}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="numeroCelular" className="block text-sm font-medium text-gray-700">
                    Número de Celular
                  </label>
                  <input
                    type="tel"
                    name="numeroCelular"
                    id="numeroCelular"
                    className="mt-1 block h-14 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.numeroCelular}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">
                    Contraseña *
                  </label>
                  <input
                    type="password"
                    name="contrasena"
                    id="contrasena"
                    required
                    className="mt-1 block h-14 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.contrasena}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="confirmarContrasena" className="block text-sm font-medium text-gray-700">
                    Confirmar Contraseña *
                  </label>
                  <input
                    type="password"
                    name="confirmarContrasena"
                    id="confirmarContrasena"
                    required
                    className="mt-1 block h-14 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.confirmarContrasena}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <div className={`mr-4 flex-1 ${quickStart ? 'block' : 'hidden'}`}>
                  <div className="relative">
                    <label htmlFor="curp" className="block text-sm font-medium text-gray-700">
                      CURP *
                    </label>
                    <input
                      type="text"
                      name="curp"
                      id="curp"
                      className="mt-1 block h-14 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={formData.curp}
                      onChange={handleInputChange}
                    />
                    <span className="absolute right-0 top-0 text-xs text-gray-400 mt-1 mr-3">
                      * Solo agregar si la cuenta es de administrador
                    </span>
                  </div>
                </div>
                <div className="flex items-center h-12 mt-4">
                  <input
                    id="quick-start"
                    name="quick-start"
                    type="radio"
                    checked={quickStart}
                    onChange={handleQuickStartChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label htmlFor="quick-start" className="ml-2 block text-sm font-medium text-gray-700">
                    Inicio rápido
                  </label>
                </div>
              </div>
              <div className='py-8'>
                <button
                  type="submit"
                  className="flex w-1/3 justify-center rounded-sm border border-transparent bg-primary py-2 px-4 text-md font-semibold text-white shadow-sm transition duration-300 ease-in-out hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <img className="w-6 h-6 mr-2" src="./images/icons/signup.svg" alt="Icono Acceder" />
                  Registrar
                </button>
              </div>
            </form>
          </div>
          <div className="md:col-span-1 lg:col-span-1 w-full"> {/* Columna derecha (drag and drop) que ocupa 1/3 del espacio en pantallas medianas y grandes */}
            <div
              className="flex flex-col h-3/5"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Foto de perfil
              </label>
              <div className="mt-1 flex flex-col justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md h-full">
                <div className="space-y-1 text-center">
                  {profilePicture ? (
                    <img src={profilePicture} alt="Profile" className="mx-auto h-32 w-32 object-cover rounded-full" />
                  ) : (
                    <img src="./images/icons/dragzone.svg" className="mx-auto h-25 w-25 text-gray-400" />
                  )}
                  <div className="flex text-lg text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span className='font-semibold'> Arrastra y Suelta</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileUpload} />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;