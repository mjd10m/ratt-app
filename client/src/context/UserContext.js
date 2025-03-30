import { createContext, useEffect, useState } from 'react';
import Auth from '../utils/auth';
import { useNavigate, useLocation } from 'react-router-dom' 

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
          console.log("Go to login")
          navigate('/login',{ replace: true })  
        } 
      } finally {
        setLoading(false);
      }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};