class Config {
  static API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
  
  // Agrega más variables de entorno según sea necesario
  // static OTHER_CONFIG = process.env.OTHER_CONFIG || 'default_value';
}

export default Config;