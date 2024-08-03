// hooks/useFileState.js
import { useState } from 'react';

const useFileState = () => {
  const [ineFile, setIneFile] = useState(null);
  const [contratoFile, setContratoFile] = useState(null);

  return {
    ineFile,
    setIneFile,
    contratoFile,
    setContratoFile
  };
};

export default useFileState;