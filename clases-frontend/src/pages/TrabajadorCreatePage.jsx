import React from 'react';
import TrabajadorForm from '../components/trabajadores/TrabajadorForm';

const TrabajadorCreatePage = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h2>Crear Trabajador</h2>
            </div>
            <div className="card-body">
              <TrabajadorForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrabajadorCreatePage;
