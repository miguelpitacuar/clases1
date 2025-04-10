import api from './api';

// Obtener todos los trabajadores
export const getTrabajadores = async () => {
  try {
    const response = await api.get('/trabajadores');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Obtener un trabajador específico por ID
export const getTrabajador = async (id) => {
  try {
    const response = await api.get(`/trabajadores/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Crear un nuevo trabajador
export const createTrabajador = async (trabajadorData) => {
  try {
    const response = await api.post('/trabajadores', trabajadorData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Actualizar un trabajador
export const updateTrabajador = async (id, trabajadorData) => {
  try {
    const response = await api.put(`/trabajadores/${id}`, trabajadorData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Eliminar un trabajador
export const deleteTrabajador = async (id) => {
  try {
    const response = await api.delete(`/trabajadores/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
