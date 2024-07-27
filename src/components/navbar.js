import React, { useState, useEffect } from 'react';
import AuthenticatedActions from './authenticatedactions';
import UserWidget from './userwidget';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Menu, X } from 'lucide-react';

const Navbar = ({ title, onRegister, fromAdmin }) => {
  const isAuthenticated = true;
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleImageLoad = () => {
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full flex justify-between items-center px-4 py-4 bg-white shadow-md relative z-50">
      <div className="flex items-center w-full">
        <div className="flex items-center md:mr-6">
        <Link to="/dashboard" className="flex items-center">
          {loading ? (
            <Skeleton className="h-20 w-auto" />
          ) : (
            <img
              className="h-20 w-auto"
              src="/images/logo.svg"
              alt="Logo"
              onLoad={handleImageLoad}
            />
          )}
          {loading ? (
            <Skeleton className="ml-6 h-8 w-48 items-center" />
          ) : (
            fromAdmin && <h2 className="ml-6 font-semibold text-gray-900 text-lg whitespace-nowrap">{title}</h2>
          )}
        </Link>
        </div>
        <div className="hidden md:flex items-center w-full">
        {isAuthenticated && !fromAdmin && (
          <div className="flex flex-grow">
            <AuthenticatedActions className="mr-6" onPage={title} fromAdmin={fromAdmin} />
          </div>
        )}
          <div className="flex ml-auto">
            <UserWidget isAuthenticated={isAuthenticated} onRegister={onRegister} />
          </div>
        </div>
        <button className="ml-auto md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden">
          <div className="flex flex-col items-center">
            {isAuthenticated && !fromAdmin && <AuthenticatedActions className="py-4" onPage={title} fromAdmin={fromAdmin} />}
            <div className="py-4 w-full flex justify-center">
              <UserWidget isAuthenticated={isAuthenticated} onRegister={onRegister} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;