import React, { createContext, useState, useEffect } from 'react'; 
import { getCurrentUser } from '../services/authService'; 
export const AuthContext = createContext(); 
export const AuthProvider = ({ children }) => { 
const [currentUser, setCurrentUser] = useState(null); 
const [loading, setLoading] = useState(true); 
useEffect(() => { 
const user = getCurrentUser(); 
setCurrentUser(user); 
setLoading(false); 
}, []); 
return ( 
<AuthContext.Provider value={{ currentUser, setCurrentUser, loading }}> 
{children} 
</AuthContext.Provider> 
); 
};