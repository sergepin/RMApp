import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    // Cargar favoritos iniciales
    setFavorites(storage.getFavorites());

    // Escuchar cambios en favoritos
    const handleFavoritesChange = () => {
      setFavorites(storage.getFavorites());
    };

    window.addEventListener('favoritesChanged', handleFavoritesChange);
    
    return () => {
      window.removeEventListener('favoritesChanged', handleFavoritesChange);
    };
  }, []);

  const toggleFavorite = (characterId: number) => {
    const newFavorites = storage.toggleFavorite(characterId);
    setFavorites(newFavorites);
    // Disparar evento para otros componentes
    window.dispatchEvent(new CustomEvent('favoritesChanged'));
  };

  const isFavorite = (characterId: number) => {
    return favorites.includes(characterId);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
};