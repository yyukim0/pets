import React, { createContext, useState, useEffect, useContext } from 'react';
import { loginUser } from '../services/api';

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('@PetAdopt:user');
    const storedToken = localStorage.getItem('@PetAdopt:token');
    const storedFavs = localStorage.getItem('@PetAdopt:favorites');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    if (storedFavs) {
      setFavorites(JSON.parse(storedFavs));
    }
    setLoadingSession(false);
  } , []);

  const signIn = async (email, password) => {
    const data = await loginUser(email, password);
    setUser(data.user);
    localStorage.setItem('@PetAdopt:token', data.token);
    localStorage.setItem('@PetAdopt:user', JSON.stringify(data.user));
  };

  const signOut = () => {
    localStorage.removeItem('@PetAdopt:token');
    localStorage.removeItem('@PetAdopt:user');
    setUser(null);
  };

  const toggleFavorite = (pet) => {
  // Encontra usando o ._id correto do MongoDB
  const exists = favorites.find(fav => fav._id === pet._id);
  
  if (exists) {
    setFavorites(favorites.filter(fav => fav._id !== pet._id));
  } else {
    setFavorites([...favorites, pet]);
  }
};

  return (
    <AppContext.Provider value={{ 
      signed: !!user, 
      user, 
      loadingSession, 
      signIn, 
      signOut, 
      favorites, 
      toggleFavorite 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);