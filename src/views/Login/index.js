import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import { useAccountUser } from '../../middleware/AccountUserContext';
import { useNavigate } from 'react-router-dom';
import Config from '../../Config';
import { ClipLoader } from 'react-spinners';
import Cookies from 'js-cookie';
import { Eye, EyeOff } from 'lucide-react'; // Asegúrate de instalar lucide-react

const Login = () => {
  const { saveUser } = useAccountUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  const navigate = useNavigate();

  // Check if the user is already authenticated
  useEffect(() => {
    const checkAuthorizeCookie = async () => {
      console.log('Checking for authorization cookie...');
      const token = Cookies.get('Authorize');
      console.log('Authorization cookie:', token);

      if (token) {
        console.log('Token found, navigating to /');
        navigate('/');
      } else {
        console.log('No token found, setting loading to false');
        setLoading(false);
      }
    };

    // Perform the initial check
    checkAuthorizeCookie();
  }, [navigate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Form submission started');

    try {
      const response = await fetch(Config.API_URL + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
        credentials: 'include',
      });

      console.log('Fetch response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful, response data:', data);

        // Assuming the token is in the response body
        if (data.token) {
          Cookies.set('Authorize', data.token, { expires: 7 }); // Set token in cookie for 7 days
        } else {
          console.error('Token not found in response data');
          setError('Token no recibido después del inicio de sesión');
        }

        saveUser({ ...data, username: email }, rememberMe);

        // Check for the token after login
        const token = Cookies.get('Authorize');
        console.log('Token after login:', token);

        if (token) {
          console.log('Token found, navigating to /');
          navigate('/');
        } else {
          console.error('Token not received after login');
          setError('Token no recibido después del inicio de sesión');
        }
      } else if (response.status === 401) {
        console.error('Credentials incorrect');
        setError('Credenciales incorrectas');
      } else {
        console.error('Login error, status code:', response.status);
        setError('Error en el inicio de sesión');
      }
    } catch (error) {
      console.error('Login Error:', error);
      setError('Error en el inicio de sesión');
    } finally {
      setLoading(false);
      console.log('Form submission finished');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <ClipLoader size={100} color="bg-primary" loading={loading} />
      </div>
    );
  }

  return (
    <>
      <Navbar title="Iniciar Sesion" fromAdmin={true} isAuthenticated={false} />
      <div className="flex min-h-screen bg-gray-50">
        <div className="flex flex-1 flex-col lg:justify-center px-4 py-2 sm:px-6 lg:px-8 xl:px-24 lg:items-center lg:justify-start lg:pt-20 lg:mt-[-124px]">
          <div className="w-full max-w-sm lg:w-96">
            <div className="mt-[2px]"> {/* Ajuste del margen superior */}
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
                  <div className="relative mt-1">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'} // Cambia el tipo según el estado
                      required
                      className="block h-12 w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)} // Alterna el estado de visibilidad
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {showPassword ? <EyeOff size={20} className="text-gray-500" /> : <Eye size={20} className="text-gray-500" />}
                    </button>
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