import { createContext, useEffect, useState } from 'react';
import Auth from '../utils/auth';
import { useNavigate } from 'react-router-dom' 

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
      try {
        const decoded = Auth.getProfile()
        setUser(decoded.data);
      } catch (err) {
        console.error('Invalid token:', err);
        setUser(null);
        navigate('/login',{ replace: true })
      }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};