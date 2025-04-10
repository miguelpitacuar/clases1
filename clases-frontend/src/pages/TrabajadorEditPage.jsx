import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getTrabajador, updateTrabajador } from '../services/trabajadorService'; // Asegúrate de que la importación sea correcta

const TrabajadorEditPage = () => {
  const { id } = useParams();  // Obtener el id del trabajador desde la URL
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [id_departamento, setIdDepartamento] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [departamentos, setDepartamentos] = useState([]);

  useEffect(() => {
    loadTrabajador();
    loadDepartamentos(); // Cargar los departamentos cuando el componente se monta
  }, [id]);

  // Función para cargar los datos del trabajador
  const loadTrabajador = async () => {
    try {
      setLoading(true);
      const data = await getTrabajador(id);  // Suponiendo que 'getTrabajador' es una función que obtiene los datos del trabajador
      setNombre(data.nombre);
      setApellido(data.apellido);
      setCorreo(data.correo);
      setTelefono(data.telefono);
      setDireccion(data.direccion);
      setIdDepartamento(data.id_departamento);
    } catch (err) {
      setError('Error al cargar el trabajador');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Función para cargar los departamentos
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
      await updateTrabajador(id, trabajadorData); // Actualiza los datos del trabajador
      navigate('/trabajadores'); // Redirige al listado de trabajadores después de la edición
    } catch (err) {
      setError(err.message || 'Error al guardar los cambios');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h2>Editar Trabajador</h2>
              <Link to="/trabajadores" className="btn btn-secondary">
                Volver a la lista
              </Link>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                {/* Formulario para editar los datos del trabajador */}
                <div className="form-group mb-3">
                  <label>Nombre del Trabajador</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Apellido del Trabajador</label>
                  <input
                    type="text"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Correo</label>
                  <input
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Teléfono</label>
                  <input
                    type="text"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Dirección</label>
                  <input
                    type="text"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    className="form-control"
                  />
                </div>

                {/* Departamento */}
                <div className="form-group mb-3">
                  <label>Departamento</label>
                  <select
                    className="form-control"
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
                    {loading ? 'Guardando...' : 'Guardar Cambios'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrabajadorEditPage;
