import { createContext } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

const UserContext = createContext();
export default UserContext;

// eslint-disable-next-line react/prop-types
export function UserProvider({ children }) {
  const [userData, setUserData] = useLocalStorage('userData', {});
  
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}