import React, { useEffect, useState, useRef } from 'react';
import { useAccountUser } from '../middleware/AccountUserContext';
import Cookies from 'js-cookie';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { LogOut } from 'lucide-react';
import Config from '../config';

const UserWidget = ({ onRegister }) => {
  const token = Cookies.get('Authorize');
  const { user, fetchUser, loading: userLoading } = useAccountUser();
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileImageAvailable, setProfileImageAvailable] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false); // Estado para evitar refrescos múltiples
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!hasLoaded && token) {
      fetchUser().finally(() => {
        setLoading(false);
        setHasLoaded(true); // Marca que la carga se ha realizado
      });
    } else {
      setLoading(false);
      setHasLoaded(true); // Marca que la carga se ha realizado
    }
  }, [token, fetchUser, user, hasLoaded]);

  useEffect(() => {
    if (user && hasLoaded) {
      const checkProfileImage = async () => {
        try {
          const response = await fetch(Config.API_URL + '/profile-picture', {
            method: 'GET',
            credentials: 'include',
          });

          console.log('Profile image fetch response:', response); // Log de la respuesta

          if (response.status === 200) {
            setProfileImageAvailable(true);
          } else if (response.status === 404) {
            setProfileImageAvailable(false);
          } else {
            console.error('Unexpected response status:', response.status);
            setProfileImageAvailable(false);
          }
        } catch (error) {
          console.error('Error fetching profile image:', error);
          setProfileImageAvailable(false);
        }
      };

      checkProfileImage();
    }
  }, [user, hasLoaded]);

  const handleLogout = async () => {
    try {
      const response = await fetch( Config.API_URL + '/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        Cookies.remove('Authorize');
        sessionStorage.removeItem('user');
        window.location.href = '/login';
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (token) {
    return (
      <div className="relative flex items-center leading-3" ref={dropdownRef}>
        <div className="flex items-center">
          <div onClick={toggleDropdown} className="cursor-pointer">
            {loading || userLoading ? (
              <>
                <Skeleton width={100} height={20} />
                <Skeleton width={80} height={16} />
              </>
            ) : (
              <div>
                <div className="text-md text-black font-semibold">{user.nombres + ' ' + user.apellidos}</div>
                <div className="text-sm text-black">{user?.rol || 'Cargando rol'}</div>
              </div>
            )}
          </div>
          {loading || userLoading ? (
            <Skeleton circle={true} height={64} width={64} className="ml-2" />
          ) : (
            <img
              className="h-16 w-16 ml-2 rounded-full"
              src={profileImageAvailable ? Config.API_URL+ '/profile-picture' : '/images/guest.svg'}
              alt="Profile"
            />
          )}
        </div>
        {dropdownOpen && (
          <div className="absolute left-0 top-full mt-2 w-48 bg-white border border-gray-200 shadow-md z-50">
            <div onClick={handleLogout} className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
              <LogOut className="mr-2" />
              Cerrar sesión
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-between leading-3">
        <div>
          <div className="text-md text-black font-semibold">Modo Invitado</div>
          {onRegister ? (
            <a href="/login" className="text-sm text-black">
              ¿Ya te registraste?, inicia sesión
            </a>
          ) : (
            <a href="/signup" className="text-sm text-black">
              ¿No tienes cuenta?, crea una
            </a>
          )}
        </div>
        <img className="h-16 w-16 ml-2 rounded-full" src="/images/guest.svg" alt="Guest" />
      </div>
    );
  }
};

export default UserWidget;