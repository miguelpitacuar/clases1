import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTrabajadores, deleteTrabajador } from '../../services/trabajadorService';
import TrabajadorItem from './TrabajadorItem';

const TrabajadoresList = () => {
  const [trabajadores, setTrabajadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Función para obtener los trabajadores
  const fetchTrabajadores = async () => {
    try {
      setLoading(true);
      const data = await getTrabajadores();
      setTrabajadores(data);
      setError('');
    } catch (err) {
      setError('Error al cargar trabajadores');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrabajadores();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  // Función para eliminar un trabajador
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este trabajador?')) {
      try {
        await deleteTrabajador(id);
        setTrabajadores(trabajadores.filter(t => t.id !== id));
      } catch (err) {
        setError('Error al eliminar el trabajador');
      }
    }
  };

  if (loading) return <div>Cargando trabajadores...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="trabajadores-list">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Listado de Trabajadores</h2>
        <Link to="/trabajadores/crear" className="btn btn-success">
          Agregar Trabajador
        </Link>
      </div>

      {trabajadores.length === 0 ? (
        <div className="alert alert-info">No hay trabajadores registrados</div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Cargo</th>
              <th>Departamento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {trabajadores.map((trabajador) => (
              <TrabajadorItem 
                key={trabajador.id} 
                trabajador={trabajador} 
                onDelete={handleDelete} 
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TrabajadoresList;
