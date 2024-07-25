import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import Config from '../../Config';

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
      setProfilePicture(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('nombres', formData.nombres);
    formDataToSend.append('apellidos', formData.apellidos);
    formDataToSend.append('correo', formData.correo);
    formDataToSend.append('numeroCelular', formData.numeroCelular);
    formDataToSend.append('contrasena', formData.contrasena);
    formDataToSend.append('confirmarContrasena', formData.confirmarContrasena);
    formDataToSend.append('curp', formData.curp);
    if (profilePicture) {
      formDataToSend.append('profilePicture', profilePicture);
    }

    try {
      const response = await fetch(Config.API_URL + '/signup', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
      // Manejar el resultado de la respuesta aquí
    } catch (error) {
      console.error('Error:', error);
      // Manejar el error aquí
    }
  };

  const handleQuickStartChange = () => {
    setQuickStart(!quickStart);
  };

  return (
    <>
      <Navbar title="Registro" isAuthenticated={false} onRegister={true} />
      
      <div className="flex min-h-screen bg-gray-50 justify-center items-center px-8 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-5/6 max-w-7xl">
          <div className="md:col-span-2 lg:col-span-2 w-full">
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
          <div className="md:col-span-1 lg:col-span-1 w-full">
            <div
              className="flex flex-col h-3/5"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Foto de perfil
              </label>
              <div className="mt-1 flex flex-col justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                {profilePicture ? (
                  <>
                    <img
                      src={URL.createObjectURL(profilePicture)}
                      alt="Profile Preview"
                      className="h-40 w-40 object-cover mb-2"
                    />
                    <p className="text-xs text-gray-500">{profilePicture.name}</p>
                  </>
                ) : (
                  <>
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H20a2 2 0 00-2 2v8H8a2 2 0 00-2 2v8a2 2 0 002 2h8v8a2 2 0 002 2h8a2 2 0 002-2v-8h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8v-8a2 2 0 00-2-2z"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="mt-4 flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Sube una foto</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileUpload}
                        />
                      </label>
                      <p className="pl-1">o arrastra y suelta</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;