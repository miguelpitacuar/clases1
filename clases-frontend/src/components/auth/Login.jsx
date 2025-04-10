import React, { useState, useContext } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { login } from '../../services/authService'; 
import { AuthContext } from '../../context/AuthContext'; 
 
const Login = () => { 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false); 
   
  const { setCurrentUser } = useContext(AuthContext); 
  const navigate = useNavigate(); 
 
  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    setLoading(true); 
    setError(''); 
 
    try { 
      const data = await login(email, password); 
      setCurrentUser(data.user); 
      navigate('/dashboard'); 
    } catch (err) { 
      setError(err.message || 'Error al iniciar sesión'); 
    } finally { 
      setLoading(false); 
    } 
  }; 
 
  return ( 
    <div className="login-container"> 
      <div className="login-form"> 
        <h2>Iniciar Sesión</h2> 
        {error && <div className="alert alert-danger">{error}</div>} 
        <form onSubmit={handleSubmit}> 
          <div className="form-group"> 
            <label>Email</label> 
            <input 
              type="email" 
              className="form-control" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            /> 
          </div> 
          <div className="form-group"> 
            <label>Contraseña</label> 
            <input 
              type="password" 
              className="form-control" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            /> 
          </div> 
          <button  
            type="submit"  
            className="btn btn-primary"  
            disabled={loading} 
          > 
            {loading ? 'Cargando...' : 'Iniciar Sesión'} 
          </button> 
        </form> 
      </div> 
    </div> 
  ); 
}; 
 
export default Login;