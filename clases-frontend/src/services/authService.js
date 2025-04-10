import api from './api'; 
 
export const login = async (email, password) => { 
  try { 
    const response = await api.post('/auth/login', { email, password }); 
    if (response.data.token) { 
      localStorage.setItem('token', response.data.token); 
      localStorage.setItem('user', JSON.stringify(response.data.user)); 
    } 
    return response.data; 
  } catch (error) { 
    throw error.response.data; 
  } 
}; 
export const logout = () => { 
localStorage.removeItem('token'); 
localStorage.removeItem('user'); 
}; 
export const getCurrentUser = () => { 
return JSON.parse(localStorage.getItem('user')); 
};