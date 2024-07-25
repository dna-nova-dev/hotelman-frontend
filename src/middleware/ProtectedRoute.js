import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; // Corrige la importación si es necesario

const ProtectedRoute = ({ element }) => {
  const location = useLocation();

  // Obtener el token de las cookies
  const token = Cookies.get('Authorize');

  console.log('Token desde cookies:', token);

  if (!token) {
    // No hay token, redirigir a /login
    if (location.pathname !== '/login' && location.pathname !== '/signup') {
      console.log('Redirigiendo a /login, no hay token');
      return <Navigate to="/login" state={{ from: location }} />;
    }
    // Si ya estás en /login o /signup, simplemente muestra el elemento
    return element;
  }

  try {
    const decoded = jwtDecode(token);
    console.log('Token decodificado:', decoded);
    const role = decoded.rol;

    // Lista de rutas accesibles para Recepcionista
    const recepcionistaRoutes = ['/salespoint', '/create', '/presence'];

    if (role === 'Administracion') {
      // Permitir acceso a todas las rutas y redirigir al dashboard en /login o /
      if (location.pathname === '/login' || location.pathname === '/') {
        console.log('Redirigiendo a /dashboard');
        return <Navigate to="/dashboard" />;
      }
      return element;
    } else if (role === 'Recepcionista') {
      // Verificar si la ruta está en las permitidas para Recepcionista
      if (recepcionistaRoutes.includes(location.pathname)) {
        return element;
      } else {
        // Redirigir a /salespoint si la ruta no está permitida
        console.log('Redirigiendo a /salespoint, ruta no permitida');
        return <Navigate to="/salespoint" />;
      }
    } else {
      // En caso de rol desconocido
      console.log('Rol desconocido, redirigiendo a /login');
      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;