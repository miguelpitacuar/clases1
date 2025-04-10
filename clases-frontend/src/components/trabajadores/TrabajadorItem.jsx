import React from 'react'; 
import { Link } from 'react-router-dom'; 

const TrabajadorItem = ({ trabajador, onDelete }) => { 
  return ( 
    <tr> 
      <td>{trabajador.id}</td> 
      <td>{trabajador.nombre}</td> 
      <td>{trabajador.correo}</td> {/* Cambié 'email' por 'correo' */}
      <td>{trabajador.departamento?.nombre || 'Sin asignar'}</td> 
      <td> 
        {/* Enlace para editar el trabajador */}
        <Link to={`/trabajadores/editar/${trabajador.id}`} className="btn btn-sm btn-primary me-2">
          Editar
        </Link>

        {/* Botón para eliminar al trabajador */}
        <button onClick={() => onDelete(trabajador.id)} className="btn btn-sm btn-danger"> 
          Eliminar 
        </button> 
      </td> 
    </tr> 
  ); 
}; 

export default TrabajadorItem;
