import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import { useAccountUser } from '../../middleware/AccountUserContext';
import { useNavigate } from 'react-router-dom';
import Config from '../../Config';

const Login = () => {
  const { saveUser } = useAccountUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Submitting login form...');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Remember Me:', rememberMe);

    try {
      const response = await fetch(Config.API_URL + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
        credentials: 'include', // Permitir el envío y recepción de cookies
      });

      console.log('Response Status:', response.status);
      console.log('Response Headers:', response.headers);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Login Successful:', data);
        // Guardar el usuario en el contexto y localStorage/sessionStorage
        saveUser({ ...data, username: email }, rememberMe);
        // Redirigir a la página principal o dashboard
        navigate('/');
      } else if (response.status === 401) {
        console.log('Login Failed: Incorrect credentials');
        // Manejar el error de autenticación
        setError('Credenciales incorrectas');
      } else {
        console.log('Login Failed: Other Error', response.status);
        // Manejar otros errores
        setError('Error en el inicio de sesión');
      }
    } catch (error) {
      console.error('Login Error:', error);
      setError('Error en el inicio de sesión');
    }
  };

  return (
    <>
      <Navbar title="Iniciar Sesion" isAuthenticated={false} />
      <div className="flex min-h-screen bg-gray-50">
        <div className="flex flex-1 flex-col justify-center px-4 py-2 sm:px-6 lg:px-8 xl:px-24 lg:items-center lg:justify-start lg:pt-20">
          <div className="w-full max-w-sm lg:w-96">
            <div className="mt-1">
              <form className="space-y-2" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Correo o CURP
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="text"
                      required
                      className="block h-12 w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Contraseña
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="block h-12 w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Recordar cuenta
                    </label>
                  </div>
                </div>

                {error && <div className="text-red-600 text-sm">{error}</div>}

                <div className='py-8'>
                  <button
                    type="submit"
                    className="flex w-1/3 justify-center rounded-sm border border-transparent bg-primary py-2 px-4 text-md font-semibold text-white shadow-sm transition duration-300 ease-in-out hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <img className="w-6 h-6 mr-2" src="https://img.icons8.com/?size=100&id=26218&format=png&color=ffffff" alt="Icono Acceder" />
                    Acceder
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;