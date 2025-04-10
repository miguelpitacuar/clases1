import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import DepartamentosPage from './pages/DepartamentosPage';
import DepartamentoCreatePage from './pages/DepartamentoCreatePage';
import DepartamentoEditPage from './pages/DepartamentoEditPage';
import TrabajadorCreatePage from './pages/TrabajadorCreatePage';
import TrabajadoresPage from './pages/TrabajadoresPage'; 
import TrabajadorEditPage from './pages/TrabajadorEditPage'; // Asegúrate de importar la página de edición de trabajador

// Componente para proteger rutas
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/departamentos" 
            element={
              <ProtectedRoute>
                <DepartamentosPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/departamentos/crear" 
            element={
              <ProtectedRoute>
                <DepartamentoCreatePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/departamentos/editar/:id" 
            element={
              <ProtectedRoute>
                <DepartamentoEditPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/trabajadores" 
            element={
              <ProtectedRoute>
                <TrabajadoresPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/trabajadores/crear" 
            element={
              <ProtectedRoute>
                <TrabajadorCreatePage />
              </ProtectedRoute>
            } 
          />
          <Route 
           
           path="/trabajadores/editar/:id" 
           element={
             <ProtectedRoute>
               <TrabajadorEditPage />
             </ProtectedRoute>
           }
         />
  
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
