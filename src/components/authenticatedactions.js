import React from 'react';
import { Link } from 'react-router-dom';

const AuthenticatedActions = ({ onPage, className, fromAdmin }) => {
  return (
    <div className={`flex space-x-4 ${className}`}>
      {onPage === "inquilinos" ? (
        <>
          { fromAdmin && (<Link to="/dashboard">
              <button className="font-semibold text-primary px-2 py-2 rounded-md">
                Informes
              </button>
            </Link>)
            }
          <Link to="/salespoint">
            <button className="bg-primary font-semibold text-white px-2 py-2 rounded-md">
              Inquilinos
            </button>
          </Link>
          <Link to="/presence">
            <button className="font-semibold text-primary px-2 py-2 rounded-md">
              Presencia
            </button>
          </Link>
        </>
      ) : onPage === "presencia" ? (
        <>
          { fromAdmin && (<Link to="/dashboard">
              <button className="font-semibold text-primary px-2 py-2 rounded-md">
                Informes
              </button>
            </Link>)
            }
          <Link to="/salespoint">
            <button className="font-semibold text-primary px-2 py-2 rounded-md">
              Inquilinos
            </button>
          </Link>
          <Link to="/presence">
            <button className="bg-primary font-semibold text-white px-2 py-2 rounded-md">
              Presencia
            </button>
          </Link>
        </>
      ) : (
        onPage === "informes" && (
          <>
            <Link to="/dashboard">
              <button className="bg-primary font-semibold text-white px-2 py-2 rounded-md">
                Informes
              </button>
            </Link>
            <Link to="/salespoint">
              <button className="font-semibold text-primary px-2 py-2 rounded-md">
                Inquilinos
              </button>
            </Link>
            <Link to="/presence">
              <button className="font-semibold text-primary px-2 py-2 rounded-md">
                Presencia
              </button>
            </Link>
          </>
        )
      )}
    </div>
  );
};

export default AuthenticatedActions;