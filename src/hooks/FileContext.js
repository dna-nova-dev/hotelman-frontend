import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
const FileContext = createContext();

// Crear un proveedor del contexto
export const FileProvider = ({ children }) => {
  const [ineFile, setIneFile] = useState(null);
  const [contratoFile, setContratoFile] = useState(null);

  return (
    <FileContext.Provider value={{ ineFile, setIneFile, contratoFile, setContratoFile }}>
      {children}
    </FileContext.Provider>
  );
};

// Hook para usar el contexto
export const useFileContext = () => useContext(FileContext);