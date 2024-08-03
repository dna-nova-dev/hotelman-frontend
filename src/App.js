import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SalesPoint from './views/SalesPoint';
import CreateView from './views/SalesPoint/create';
import Login from './views/Login';
import Signup from './views/Signup';
import Presence from './views/Presence';
import NotFoundPage from './views/NotFound';
import Dashboard from './views/Dashboard';
import ProtectedRoute from './middleware/ProtectedRoute';
import { AccountUserProvider } from './middleware/AccountUserContext';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; // Corrige la importación si es necesario
import HelloWorld from './views/HelloWorld';
import { ClipLoader } from 'react-spinners';
import React from 'react';
import { FileProvider } from './hooks/FileContext';

function App() {
  const token = Cookies.get('Authorize');
  const [initialRoute, setInitialRoute] = React.useState(null);
  React.useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const role = decoded.rol;
        if (role === 'Administracion') {
          setInitialRoute('/dashboard');
        } else if (role === 'Recepcionista') {
          setInitialRoute('/salespoint');
        }
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    } else {
      setInitialRoute('/login');
    }
  }, [token]);

  if (initialRoute === null) {
    // Mientras estamos determinando la ruta inicial, podemos mostrar un loading spinner o algo similar
    return <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <ClipLoader size={100} color="bg-primary" loading={true} />
  </div>;
  }

  return (
    <FileProvider>
      <AccountUserProvider>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path='/hello' element={<HelloWorld />} />
          <Route path="/login" element={initialRoute === '/login' ? <Login /> : <Navigate to={initialRoute} replace />} />
          <Route path="/signup" element={<Signup />} />

          {/* Rutas protegidas */}
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/salespoint" element={<ProtectedRoute element={<SalesPoint />} />} />
          <Route path="/presence" element={<ProtectedRoute element={<Presence />} />} />
          <Route path="/create" element={<ProtectedRoute element={<CreateView />} />} />

          {/* Ruta para la página no encontrada (debe ir al login si no hay autenticación) */}
          <Route path="*" element={<ProtectedRoute element={<NotFoundPage />} />} />
        </Routes>
      </Router>
    </AccountUserProvider>
    </FileProvider>
  );
}

export default App;