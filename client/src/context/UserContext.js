import { createContext, useEffect, useState } from 'react';
import Auth from '../utils/auth';
import { useNavigate, useLocation } from 'react-router-dom' 

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
      try {
        const decoded = Auth.getProfile()
        setUser(decoded.data);
      } catch (err) {
        console.error('Invalid token:', err);
        setUser(null);
        const isSignup = location.pathname.includes('signup');
        if(!isSignup){
          navigate('/login',{ replace: true })  
        } 
      }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};