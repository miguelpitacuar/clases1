import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TrabajadoresPage = () => {
  const [trabajadores, setTrabajadores] = useState([]);
  const [error, setError] = useState(null);

  // Función para cargar los trabajadores desde la API
  useEffect(() => {
    const fetchTrabajadores = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/trabajadores');
        const responseText = await response.text();

        try {
          const responseData = JSON.parse(responseText);
          if (!response.ok) {
            throw new Error(responseData.message || 'Error en el servidor');
          }
          setTrabajadores(responseData.data || []); // Asumiendo que los datos vienen en 'data'
        } catch (jsonError) {
          throw new Error('Error al procesar la respuesta del servidor');
        }
      } catch (error) {
        console.error('Error:', error.message);
        setError(error.message);
      }
    };

    fetchTrabajadores();
  }, []);

  // Función para eliminar un trabajador
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este trabajador?')) {
      try {
        const response = await fetch(`http://localhost:8000/api/trabajadores/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Error al eliminar el trabajador');
        }

        // Filtramos el trabajador eliminado de la lista local
        setTrabajadores(trabajadores.filter(trabajador => trabajador.id !== id));
      } catch (error) {
        console.error('Error:', error.message);
        setError('Error al eliminar el trabajador');
      }
    }
  };

  return (
    <div className="container">
      <h1 className="title">Gestión de Trabajadores</h1>

      {/* Botón para volver al Dashboard alineado a la derecha */}
      <div className="d-flex justify-content-end mb-3">
        <Link to="/dashboard" className="btn btn-secondary">
          Volver al Dashboard
        </Link>
      </div>

      {/* Botón para agregar trabajador */}
      <div className="button-container">
        <Link to="/trabajadores/crear" className="btn btn-primary">+ Agregar Trabajador</Link>
      </div>

      {/* Mensaje de error */}
      {error && <p className="error-message">{error}</p>}

      {/* Tabla de trabajadores */}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Departamento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {trabajadores.length > 0 ? (
            trabajadores.map(trabajador => (
              <tr key={trabajador.id}>
                <td>{trabajador.id}</td>
                <td>{trabajador.nombre}</td>
                <td>{trabajador.apellido}</td>
                <td>{trabajador.correo}</td>
                <td>{trabajador.telefono || 'N/A'}</td>
                <td>{trabajador.direccion || 'Sin asignar'}</td>
                <td>{trabajador.departamento || 'Sin asignar'}</td>
                <td>
                  {/* Usamos el componente Link para navegar a la página de edición */}
                  <Link 
                    to={`/trabajadores/editar/${trabajador.id}`} 
                    className="btn btn-sm btn-warning me-2"
                  >
                    Editar
                  </Link>

                  {/* Botón para eliminar al trabajador */}
                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(trabajador.id)}  // Llamada a la función de eliminación
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No hay trabajadores registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TrabajadoresPage;
