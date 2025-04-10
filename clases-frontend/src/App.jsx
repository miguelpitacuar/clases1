import React from 'react'; 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import { AuthProvider } from './context/AuthContext'; 
import LoginPage from './pages/LoginPage'; 
import DashboardPage from './pages/DashboardPage'; 
import DepartamentosPage from './pages/DepartamentosPage'; 
import TrabajadoresPage from './pages/TrabajadoresPage'; 
 
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
            path="/trabajadores"  
            element={ 
              <ProtectedRoute> 
                <TrabajadoresPage /> 
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
  
