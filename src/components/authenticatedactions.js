import React from 'react';
import { Link } from 'react-router-dom';

const AuthenticatedActions = ({ onPage, className }) => {
  return (
    <div className={`flex space-x-4 ${className}`}>
      {onPage === "inquilinos" ? 
        <>
          <Link to="/salespoint">
            <button className="bg-primary font-semibold text-white px-2 py-2 rounded-md">Inquilinos</button>
          </Link><Link to="/presence">
            <button className="font-semibold text-primary px-2 py-2 rounded-md">Presencia</button>
          </Link></> :
          <>
          <Link to="/salespoint">
            <button className="font-semibold text-primary px-2 py-2 rounded-md">Inquilinos</button>
          </Link>
          <Link to="/presence">
            <button className="bg-primary font-semibold text-white px-2 py-2 rounded-md">Presencia</button>
          </Link>
          </>}
    </div>
  );
};

export default AuthenticatedActions;