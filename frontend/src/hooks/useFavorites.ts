import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    setFavorites(storage.getFavorites());
  }, []);

  const toggleFavorite = (characterId: number) => {
    const newFavorites = storage.toggleFavorite(characterId);
    setFavorites(newFavorites);
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
