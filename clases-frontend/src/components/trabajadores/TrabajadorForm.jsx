import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTrabajador, createTrabajador, updateTrabajador } from '../../services/trabajadorService';

const TrabajadorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Establecer los estados
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [id_departamento, setIdDepartamento] = useState('');
  const [departamentos, setDepartamentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const isEditing = !!id;

  // Cargar departamentos disponibles y trabajador si estamos editando
  useEffect(() => {
    if (isEditing) {
      loadTrabajador();
    }
    loadDepartamentos(); // Cargar los departamentos cuando el componente se monta
  }, [id]);

  // Cargar los datos del trabajador para edición
  const loadTrabajador = async () => {
    try {
      setLoading(true);
      const data = await getTrabajador(id);
      setNombre(data.nombre || '');
      setApellido(data.apellido || '');
      setCorreo(data.correo || '');
      setTelefono(data.telefono || '');
      setDireccion(data.direccion || '');
      setIdDepartamento(data.id_departamento || '');
    } catch (err) {
      setError('Error al cargar el trabajador');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar los departamentos disponibles para el select
  const loadDepartamentos = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/departamentos');
      const data = await response.json();
      setDepartamentos(data); // Supongamos que 'data' contiene el listado de departamentos
    } catch (err) {
      setError('Error al cargar los departamentos');
      console.error(err);
    }
  };

  // Función para manejar el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const trabajadorData = {
      nombre,
      apellido,
      correo,
      telefono,
      direccion,
      id_departamento,
    };

    try {
      if (isEditing) {
        await updateTrabajador(id, trabajadorData);
      } else {
        await createTrabajador(trabajadorData);
      }
      navigate('/trabajadores');
    } catch (err) {
      // Mostrar errores detallados si existen
      setError(err.response?.data?.errors?.join(', ') || 'Error al guardar el trabajador');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) return <div>Cargando...</div>;

  return (
    <div className="card">
      <div className="card-header">
        <h3>{isEditing ? 'Editar' : 'Crear'} Trabajador</h3>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="form-group mb-3">
            <label htmlFor="nombre">Nombre del Trabajador</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          {/* Apellido */}
          <div className="form-group mb-3">
            <label htmlFor="apellido">Apellido del Trabajador</label>
            <input
              type="text"
              className="form-control"
              id="apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </div>

          {/* Correo */}
          <div className="form-group mb-3">
            <label htmlFor="correo">Correo</label>
            <input
              type="email"
              className="form-control"
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          {/* Teléfono */}
          <div className="form-group mb-3">
            <label htmlFor="telefono">Teléfono</label>
            <input
              type="text"
              className="form-control"
              id="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>

          {/* Dirección */}
          <div className="form-group mb-3">
            <label htmlFor="direccion">Dirección</label>
            <input
              type="text"
              className="form-control"
              id="direccion"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </div>

          {/* Departamento */}
          <div className="form-group mb-3">
            <label htmlFor="id_departamento">Departamento</label>
            <select
              className="form-control"
              id="id_departamento"
              value={id_departamento}
              onChange={(e) => setIdDepartamento(e.target.value)}
              required
            >
              <option value="">Seleccione un departamento</option>
              {/* Aquí deberías mapear los departamentos disponibles */}
              {departamentos.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Botones */}
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/trabajadores')}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrabajadorForm;
