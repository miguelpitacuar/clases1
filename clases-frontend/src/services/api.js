import axios from 'axios'; 
 
const API_URL = 'http://localhost/clases/public/api/'; // Ajusta según la URL de tu API Laravel 
 
const api = axios.create({ 
  baseURL: API_URL, 
  headers: { 
    'Content-Type': 'application/json', 
  }, 
}); 
 
// Interceptor para añadir el token a las peticiones 
api.interceptors.request.use( 
  (config) => { 
    const token = localStorage.getItem('token'); 
    if (token) { 
      config.headers.Authorization = `Bearer ${token}`; 
    } 
    return config; 
  }, 
  (error) => { 
    return Promise.reject(error); 
  } 
); 
 
export default api