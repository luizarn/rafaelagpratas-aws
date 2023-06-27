import { useContext } from 'react';

import UserContext from '../contexts/UserContext';

export default function useIsOwnerUser() {
  const { userData: user } = useContext(UserContext);

  return user?.user?.isOwner || false;
}
